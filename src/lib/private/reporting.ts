import type { PaymentMethod, TreatmentSession } from "@/types/private";

export const paymentMethodLabels: Record<PaymentMethod | "", string> = {
  "": "Sin indicar",
  bizum: "Bizum",
  card: "Tarjeta",
  split: "Tarjeta + efectivo",
  cash: "Efectivo",
  other: "Otro",
  pending: "Pendiente",
  transfer: "Transferencia",
};

export function paymentReportSummary(sessions: TreatmentSession[]) {
  const cashTotal = roundMoney(
    sessions.reduce((sum, session) => sum + safeMoney(session.cashAmount), 0),
  );
  const cardTotal = roundMoney(
    sessions.reduce((sum, session) => sum + safeMoney(session.cardAmount), 0),
  );
  const otherTotal = roundMoney(
    sessions.reduce(
      (sum, session) =>
        sum +
        Math.max(
          safeMoney(session.amountPaid) -
            safeMoney(session.cashAmount) -
            safeMoney(session.cardAmount),
          0,
        ),
      0,
    ),
  );

  return {
    cashTotal,
    cardTotal,
    otherTotal,
    allocatedTotal: roundMoney(cashTotal + cardTotal + otherTotal),
    splitSessions: sessions.filter(
      (session) => session.paymentMethod === "split",
    ).length,
  };
}

export function currentMonthValue() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function monthRange(monthValue: string) {
  const [year, month] = monthValue.split("-").map(Number);
  const start = `${year}-${String(month).padStart(2, "0")}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const end = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

  return { end, month, start, year };
}

export function monthTitle(monthValue: string) {
  const { month, year } = monthRange(monthValue);

  return new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, 1));
}

export function filterSessionsByMonth(
  sessions: TreatmentSession[],
  monthValue: string,
) {
  const { end, start } = monthRange(monthValue);

  return sessions.filter((session) => session.date >= start && session.date <= end);
}

export function sessionReportSummary(sessions: TreatmentSession[]) {
  const totalPaid = roundMoney(
    sessions.reduce((sum, session) => sum + safeMoney(session.amountPaid), 0),
  );
  const totalDiscounts = sessions.reduce(
    (sum, session) => sum + safeMoney(session.discountAmount),
    0,
  );
  const patients = new Set(sessions.map((session) => session.patientId));

  return {
    customSessions: sessions.filter(
      (session) =>
        session.durationMinutes !== 30 && session.durationMinutes !== 60,
    ).length,
    patientsCount: patients.size,
    thirtyMinuteSessions: sessions.filter(
      (session) => session.durationMinutes === 30,
    ).length,
    sixtyMinuteSessions: sessions.filter(
      (session) => session.durationMinutes === 60,
    ).length,
    totalDiscounts: roundMoney(totalDiscounts),
    totalPaid,
    totalSessions: sessions.length,
  };
}

function roundMoney(value: number) {
  return Number(value.toFixed(2));
}

function safeMoney(value: number | null | undefined) {
  return Number.isFinite(value) ? Number(value) : 0;
}

function isSessionMatch(
  session: TreatmentSession,
  durationMinutes: number,
  amountPaid: number,
) {
  return (
    session.durationMinutes === durationMinutes &&
    roundMoney(session.amountPaid) === amountPaid
  );
}

export function therapyTotals(
  sessions: TreatmentSession[],
  options: { hideOptionalZero?: boolean } = {},
) {
  const categories = [
    {
      id: "60-60",
      label: "60 min — 60 €",
      priceUnit: 60,
      sessions: sessions.filter((session) => isSessionMatch(session, 60, 60)),
    },
    {
      id: "60-50",
      label: "60 min — 50 €",
      priceUnit: 50,
      sessions: sessions.filter((session) => isSessionMatch(session, 60, 50)),
    },
    {
      id: "30-30",
      label: "30 min — 30 €",
      priceUnit: 30,
      sessions: sessions.filter((session) => isSessionMatch(session, 30, 30)),
    },
    {
      id: "30-25",
      label: "30 min — 25 €",
      priceUnit: 25,
      sessions: sessions.filter((session) => isSessionMatch(session, 30, 25)),
    },
  ];
  const categorizedIds = new Set(
    categories.flatMap((category) => category.sessions.map((session) => session.id)),
  );
  const otherSessions = sessions.filter((session) => !categorizedIds.has(session.id));
  const rows = [
    ...categories,
    {
      id: "other",
      label: "Otras terapias / precios personalizados",
      priceUnit: null,
      sessions: otherSessions,
    },
  ];

  const totals = rows.map((row) => ({
    id: row.id,
    label: row.label,
    priceUnit: row.priceUnit,
    quantity: row.sessions.length,
    total: roundMoney(
      row.sessions.reduce((sum, session) => sum + safeMoney(session.amountPaid), 0),
    ),
  }));

  if (!options.hideOptionalZero) {
    return totals;
  }

  return totals.filter((row) => row.quantity > 0);
}

export function euro(value: number) {
  return new Intl.NumberFormat("es-ES", {
    currency: "EUR",
    style: "currency",
  }).format(value);
}
