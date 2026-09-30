"use client";

import type { TreatmentSession } from "@/types/private";
import {
  paymentMethodLabels,
  paymentReportSummary,
  sessionReportSummary,
  therapyTotals,
} from "@/lib/private/reporting";

type CellValue = number | string;
type StyledCell = CellValue | { style?: number; value: CellValue };
type WorksheetRow = { cells: StyledCell[]; height?: number };

const style = {
  centered: 9,
  coverSubtitle: 2,
  coverTitle: 1,
  date: 10,
  detailTotal: 11,
  euro: 8,
  sectionTitle: 3,
  summaryItem: 12,
  tableHeader: 4,
  totalLabel: 7,
  totalMoney: 14,
  totalQuantity: 13,
  warmRow: 5,
};

function crc32(bytes: number[]) {
  let crc = -1;

  for (let index = 0; index < bytes.length; index += 1) {
    crc ^= bytes[index];
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }

  return (crc ^ -1) >>> 0;
}

function dosDateTime(date = new Date()) {
  const time =
    (date.getHours() << 11) |
    (date.getMinutes() << 5) |
    Math.floor(date.getSeconds() / 2);
  const dosDate =
    ((date.getFullYear() - 1980) << 9) |
    ((date.getMonth() + 1) << 5) |
    date.getDate();

  return { date: dosDate, time };
}

function uint16(value: number) {
  return [value & 255, (value >>> 8) & 255];
}

function uint32(value: number) {
  return [
    value & 255,
    (value >>> 8) & 255,
    (value >>> 16) & 255,
    (value >>> 24) & 255,
  ];
}

function textBytes(text: string) {
  return Array.from(new TextEncoder().encode(text));
}

function createZip(files: { name: string; content: string }[]) {
  const localParts: number[] = [];
  const centralParts: number[] = [];
  const { date, time } = dosDateTime();
  let offset = 0;

  files.forEach((file) => {
    const name = textBytes(file.name);
    const content = textBytes(file.content);
    const crc = crc32(content);
    const localHeader = [
      ...uint32(0x04034b50),
      ...uint16(20),
      ...uint16(0),
      ...uint16(0),
      ...uint16(time),
      ...uint16(date),
      ...uint32(crc),
      ...uint32(content.length),
      ...uint32(content.length),
      ...uint16(name.length),
      ...uint16(0),
      ...name,
    ];

    localParts.push(...localHeader, ...content);
    centralParts.push(
      ...uint32(0x02014b50),
      ...uint16(20),
      ...uint16(20),
      ...uint16(0),
      ...uint16(0),
      ...uint16(time),
      ...uint16(date),
      ...uint32(crc),
      ...uint32(content.length),
      ...uint32(content.length),
      ...uint16(name.length),
      ...uint16(0),
      ...uint16(0),
      ...uint16(0),
      ...uint16(0),
      ...uint32(0),
      ...uint32(offset),
      ...name,
    );
    offset += localHeader.length + content.length;
  });

  const end = [
    ...uint32(0x06054b50),
    ...uint16(0),
    ...uint16(0),
    ...uint16(files.length),
    ...uint16(files.length),
    ...uint32(centralParts.length),
    ...uint32(localParts.length),
    ...uint16(0),
  ];

  return new Blob(
    [new Uint8Array([...localParts, ...centralParts, ...end])],
    {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  );
}

function escapeXml(value: string | number) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function columnName(index: number) {
  let name = "";
  let column = index + 1;

  while (column > 0) {
    const remainder = (column - 1) % 26;
    name = String.fromCharCode(65 + remainder) + name;
    column = Math.floor((column - remainder) / 26);
  }

  return name;
}

function normalizeCell(cell: StyledCell) {
  if (typeof cell === "object" && cell !== null && "value" in cell) {
    return cell;
  }

  return { value: cell };
}

function cell(value: CellValue, cellStyle?: number): StyledCell {
  return { style: cellStyle, value };
}

function cellXml(rawCell: StyledCell, cellIndex: number, rowIndex: number) {
  const normalized = normalizeCell(rawCell);
  const reference = `${columnName(cellIndex)}${rowIndex + 1}`;
  const styleAttribute =
    normalized.style === undefined ? "" : ` s="${normalized.style}"`;

  if (typeof normalized.value === "number") {
    return `<c r="${reference}"${styleAttribute}><v>${normalized.value}</v></c>`;
  }

  return `<c r="${reference}"${styleAttribute} t="inlineStr"><is><t>${escapeXml(
    normalized.value,
  )}</t></is></c>`;
}

function worksheetXml({
  autoFilterRef,
  columns,
  freezeTopRow = false,
  merges = [],
  rows,
}: {
  autoFilterRef?: string;
  columns: number[];
  freezeTopRow?: boolean;
  merges?: string[];
  rows: WorksheetRow[];
}) {
  const sheetViews = freezeTopRow
    ? `<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>`
    : "";
  const mergeCells = merges.length
    ? `<mergeCells count="${merges.length}">${merges
        .map((ref) => `<mergeCell ref="${ref}"/>`)
        .join("")}</mergeCells>`
    : "";
  const autoFilter = autoFilterRef ? `<autoFilter ref="${autoFilterRef}"/>` : "";

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  ${sheetViews}
  <cols>
    ${columns
      .map(
        (width, index) =>
          `<col min="${index + 1}" max="${index + 1}" width="${width}" customWidth="1"/>`,
      )
      .join("")}
  </cols>
  <sheetData>
    ${rows
      .map((row, rowIndex) => {
        const height = row.height ? ` ht="${row.height}" customHeight="1"` : "";

        return `<row r="${rowIndex + 1}"${height}>${row.cells
          .map((rowCell, cellIndex) => cellXml(rowCell, cellIndex, rowIndex))
          .join("")}</row>`;
      })
      .join("")}
  </sheetData>
  ${autoFilter}
  ${mergeCells}
</worksheet>`;
}

function stylesXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <numFmts count="1">
    <numFmt numFmtId="164" formatCode="&quot;€&quot; #,##0.00"/>
  </numFmts>
  <fonts count="5">
    <font><sz val="11"/><color rgb="FF232827"/><name val="Aptos"/></font>
    <font><b/><sz val="22"/><color rgb="FFFFFFFF"/><name val="Aptos"/></font>
    <font><b/><sz val="12"/><color rgb="FFFFFFFF"/><name val="Aptos"/></font>
    <font><b/><sz val="12"/><color rgb="FF0F3D3A"/><name val="Aptos"/></font>
    <font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Aptos"/></font>
  </fonts>
  <fills count="6">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF0F3D3A"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFAF8F4"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFF5EFE6"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF8DCDC4"/><bgColor indexed="64"/></patternFill></fill>
  </fills>
  <borders count="2">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    <border>
      <left style="thin"><color rgb="FFC8BEB0"/></left>
      <right style="thin"><color rgb="FFC8BEB0"/></right>
      <top style="thin"><color rgb="FFC8BEB0"/></top>
      <bottom style="thin"><color rgb="FFC8BEB0"/></bottom>
      <diagonal/>
    </border>
  </borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="15">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFill="1" applyFont="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="2" fillId="2" borderId="1" xfId="0" applyFill="1" applyFont="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="3" fillId="0" borderId="0" xfId="0" applyFont="1"/>
    <xf numFmtId="0" fontId="4" fillId="2" borderId="1" xfId="0" applyFill="1" applyFont="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="0" fillId="3" borderId="1" xfId="0" applyFill="1" applyBorder="1"/>
    <xf numFmtId="0" fontId="0" fillId="4" borderId="1" xfId="0" applyFill="1" applyBorder="1"/>
    <xf numFmtId="0" fontId="3" fillId="5" borderId="1" xfId="0" applyFill="1" applyFont="1" applyBorder="1"/>
    <xf numFmtId="164" fontId="0" fillId="3" borderId="1" xfId="0" applyNumberFormat="1" applyFill="1" applyBorder="1"><alignment horizontal="right"/></xf>
    <xf numFmtId="0" fontId="0" fillId="3" borderId="1" xfId="0" applyFill="1" applyBorder="1"><alignment horizontal="center"/></xf>
    <xf numFmtId="0" fontId="0" fillId="3" borderId="1" xfId="0" applyFill="1" applyBorder="1"/>
    <xf numFmtId="164" fontId="3" fillId="5" borderId="1" xfId="0" applyNumberFormat="1" applyFill="1" applyFont="1" applyBorder="1"><alignment horizontal="right"/></xf>
    <xf numFmtId="0" fontId="3" fillId="3" borderId="1" xfId="0" applyFill="1" applyFont="1" applyBorder="1"/>
    <xf numFmtId="0" fontId="3" fillId="5" borderId="1" xfId="0" applyFill="1" applyFont="1" applyBorder="1"><alignment horizontal="center"/></xf>
    <xf numFmtId="164" fontId="3" fillId="5" borderId="1" xfId="0" applyNumberFormat="1" applyFill="1" applyFont="1" applyBorder="1"><alignment horizontal="right"/></xf>
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`;
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-");

  if (!year || !month || !day) {
    return date;
  }

  return `${day}/${month}/${year}`;
}

function summaryRows(sessions: TreatmentSession[], monthLabel: string) {
  const summary = sessionReportSummary(sessions);
  const paymentSummary = paymentReportSummary(sessions);
  const totals = therapyTotals(sessions, { hideOptionalZero: true });
  const rows: WorksheetRow[] = [
    { cells: [cell("Daniela Ferreira", style.coverTitle)], height: 30 },
    { cells: [cell("Fisioterapia y Rehabilitación", style.coverSubtitle)], height: 22 },
    { cells: [cell("Reporte mensual de sesiones", style.coverSubtitle)], height: 22 },
    { cells: [cell(monthLabel, style.coverSubtitle)], height: 22 },
    { cells: [] },
    { cells: [cell("Totalización por tipo de terapia", style.sectionTitle)] },
    {
      cells: [
        cell("Tipo de terapia", style.tableHeader),
        cell("Cantidad", style.tableHeader),
        cell("Precio unitario", style.tableHeader),
        cell("Total generado", style.tableHeader),
      ],
    },
    ...totals.map((row) => ({
      cells: [
        cell(row.label, style.warmRow),
        cell(row.quantity, style.centered),
        cell(row.priceUnit ?? "Variable", row.priceUnit === null ? style.warmRow : style.euro),
        cell(row.total, style.euro),
      ],
    })),
    {
      cells: [
        cell("Total mensual generado", style.totalLabel),
        cell(summary.totalSessions, style.totalQuantity),
        cell("", style.totalLabel),
        cell(summary.totalPaid, style.totalMoney),
      ],
    },
    { cells: [] },
    { cells: [cell("Resumen mensual", style.sectionTitle)] },
    {
      cells: [
        cell("Total sesiones del mes", style.summaryItem),
        cell(summary.totalSessions, style.centered),
      ],
    },
    {
      cells: [
        cell("Total cobrado del mes", style.summaryItem),
        cell(summary.totalPaid, style.euro),
      ],
    },
    {
      cells: [
        cell("Total descuentos aplicados", style.summaryItem),
        cell(summary.totalDiscounts, style.euro),
      ],
    },
    {
      cells: [
        cell("Total cobrado en efectivo", style.summaryItem),
        cell(paymentSummary.cashTotal, style.euro),
      ],
    },
    {
      cells: [
        cell("Total cobrado con tarjeta", style.summaryItem),
        cell(paymentSummary.cardTotal, style.euro),
      ],
    },
    {
      cells: [
        cell("Total cobrado con otros métodos", style.summaryItem),
        cell(paymentSummary.otherTotal, style.euro),
      ],
    },
    {
      cells: [
        cell("Pacientes atendidos", style.summaryItem),
        cell(summary.patientsCount, style.centered),
      ],
    },
  ];

  return rows;
}

function detailRows(sessions: TreatmentSession[]) {
  return [
    {
      cells: [
        cell("Fecha", style.tableHeader),
        cell("Paciente", style.tableHeader),
        cell("Duración", style.tableHeader),
        cell("Motivo", style.tableHeader),
        cell("Precio base", style.tableHeader),
        cell("Descuento", style.tableHeader),
        cell("Total pagado", style.tableHeader),
        cell("Efectivo", style.tableHeader),
        cell("Tarjeta", style.tableHeader),
        cell("Método de pago", style.tableHeader),
      ],
    },
    ...sessions.map((session, index) => {
      const rowStyle = index % 2 === 0 ? style.warmRow : 6;

      return {
        cells: [
          cell(formatDate(session.date), style.date),
          cell(session.patientName, rowStyle),
          cell(`${session.durationMinutes} min`, style.centered),
          cell(session.reason || "Sesión", rowStyle),
          cell(session.basePrice, style.euro),
          cell(session.discountAmount, style.euro),
          cell(session.amountPaid, style.detailTotal),
          cell(session.cashAmount, style.euro),
          cell(session.cardAmount, style.euro),
          cell(paymentMethodLabels[session.paymentMethod], rowStyle),
        ],
      };
    }),
  ];
}

function createWorkbook(sessions: TreatmentSession[], monthLabel: string) {
  return createZip([
    {
      name: "[Content_Types].xml",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
</Types>`,
    },
    {
      name: "_rels/.rels",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`,
    },
    {
      name: "xl/workbook.xml",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="Resumen" sheetId="1" r:id="rId1"/>
    <sheet name="Detalle" sheetId="2" r:id="rId2"/>
  </sheets>
</workbook>`,
    },
    {
      name: "xl/_rels/workbook.xml.rels",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`,
    },
    { name: "xl/styles.xml", content: stylesXml() },
    {
      name: "xl/worksheets/sheet1.xml",
      content: worksheetXml({
        columns: [40, 14, 18, 20],
        merges: ["A1:D1", "A2:D2", "A3:D3", "A4:D4", "A6:D6"],
        rows: summaryRows(sessions, monthLabel),
      }),
    },
    {
      name: "xl/worksheets/sheet2.xml",
      content: worksheetXml({
        autoFilterRef: "A1:J1",
        columns: [14, 26, 12, 28, 14, 14, 16, 14, 14, 20],
        freezeTopRow: true,
        rows: detailRows(sessions),
      }),
    },
  ]);
}

export function ReportDownloadButton({
  fileName,
  monthLabel,
  sessions,
}: {
  fileName: string;
  monthLabel: string;
  sessions: TreatmentSession[];
}) {
  function handleDownload() {
    const workbook = createWorkbook(sessions, monthLabel);
    const url = URL.createObjectURL(workbook);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0F3D3A] px-5 text-sm font-semibold text-white transition hover:bg-[#101918]"
      onClick={handleDownload}
      type="button"
    >
      Descargar Excel
    </button>
  );
}
