"use client";

import { useMemo, useState } from "react";

export function SessionFinancialFields() {
  const [durationPreset, setDurationPreset] = useState("60");
  const [customDuration, setCustomDuration] = useState("");
  const [basePrice, setBasePrice] = useState("60");
  const [discountAmount, setDiscountAmount] = useState("0");
  const [amountPaid, setAmountPaid] = useState("60");

  const durationMinutes = useMemo(
    () => (durationPreset === "custom" ? customDuration : durationPreset),
    [customDuration, durationPreset],
  );

  function updateTotal(baseValue: string, discountValue: string) {
    const base = Number(baseValue || 0);
    const discount = Number(discountValue || 0);
    const total = Math.max(base - discount, 0);
    setAmountPaid(String(total));
  }

  function selectDuration(value: string) {
    setDurationPreset(value);

    if (value === "30") {
      setBasePrice("30");
      updateTotal("30", discountAmount);
    }

    if (value === "60") {
      setBasePrice("60");
      updateTotal("60", discountAmount);
    }
  }

  return (
    <section className="rounded-lg border border-[var(--line)] bg-[#F5EFE6]/55 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-hover)]">
        Control económico
      </p>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
        Registro interno para control mensual. No genera factura ni pago online.
      </p>

      <div className="mt-5 grid gap-4">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["30", "30 min"],
            ["60", "60 min"],
            ["custom", "Personalizada"],
          ].map(([value, label]) => (
            <label
              className={`flex min-h-11 items-center justify-center rounded-full border px-4 text-sm font-semibold ${
                durationPreset === value
                  ? "border-[var(--brand)]/55 bg-white text-[#0F3D3A]"
                  : "border-[var(--line)] bg-white/65 text-[var(--muted)]"
              }`}
              key={value}
            >
              <input
                checked={durationPreset === value}
                className="sr-only"
                name="durationPreset"
                onChange={() => selectDuration(value)}
                type="radio"
                value={value}
              />
              {label}
            </label>
          ))}
        </div>

        <input name="durationMinutes" type="hidden" value={durationMinutes} />

        {durationPreset === "custom" ? (
          <label className="text-sm font-medium">
            Duración personalizada
            <input
              className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-white px-4"
              min={1}
              onChange={(event) => setCustomDuration(event.target.value)}
              placeholder="Ej. 75"
              required
              type="number"
              value={customDuration}
            />
          </label>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="text-sm font-medium">
            Precio base
            <input
              className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-white px-4"
              min={0}
              name="basePrice"
              onChange={(event) => {
                setBasePrice(event.target.value);
                updateTotal(event.target.value, discountAmount);
              }}
              step="0.01"
              type="number"
              value={basePrice}
            />
          </label>
          <label className="text-sm font-medium">
            Descuento
            <div className="mt-2 flex gap-2">
              <input
                className="min-h-12 min-w-0 flex-1 rounded-lg border border-[var(--line)] bg-white px-4"
                min={0}
                name="discountAmount"
                onChange={(event) => {
                  setDiscountAmount(event.target.value);
                  updateTotal(basePrice, event.target.value);
                }}
                step="0.01"
                type="number"
                value={discountAmount}
              />
              <button
                className="min-h-12 rounded-full border border-[var(--brand)]/45 bg-white px-3 text-xs font-semibold text-[#0F3D3A]"
                onClick={() => setDiscountAmount("10")}
                type="button"
              >
                -10 €
              </button>
            </div>
          </label>
          <label className="text-sm font-medium">
            Total pagado
            <input
              className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-white px-4"
              min={0}
              name="amountPaid"
              onChange={(event) => setAmountPaid(event.target.value)}
              step="0.01"
              type="number"
              value={amountPaid}
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Método de pago
            <select
              className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-white px-4"
              name="paymentMethod"
            >
              <option value="">Sin indicar</option>
              <option value="cash">Efectivo</option>
              <option value="bizum">Bizum</option>
              <option value="card">Tarjeta</option>
              <option value="transfer">Transferencia</option>
              <option value="pending">Pendiente</option>
              <option value="other">Otro</option>
            </select>
          </label>
          <label className="text-sm font-medium">
            Notas de pago
            <input
              className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-white px-4"
              name="paymentNotes"
              placeholder="Opcional"
            />
          </label>
        </div>
      </div>
    </section>
  );
}
