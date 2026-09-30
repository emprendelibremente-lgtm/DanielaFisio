"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { PaymentMethod } from "@/types/private";
import { initialActionState } from "@/lib/private/actionState";
import { updateSessionPaymentMethod } from "@/lib/private/actions";
import { paymentMethodLabels } from "@/lib/private/reporting";
import { SubmitButton } from "./SubmitButton";

const methods: Array<PaymentMethod | ""> = [
  "",
  "cash",
  "bizum",
  "card",
  "transfer",
  "pending",
  "other",
];

export function SessionPaymentMethodForm({
  sessionId,
  currentMethod,
}: {
  sessionId: string;
  currentMethod: PaymentMethod | "";
}) {
  const [state, action] = useActionState(
    updateSessionPaymentMethod.bind(null, sessionId),
    initialActionState,
  );

  if (currentMethod === "split") {
    return (
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold text-[var(--muted)]">
            Método de pago
          </p>
          <p className="mt-1 text-sm font-semibold text-[#0F3D3A]">
            {paymentMethodLabels.split}
          </p>
        </div>
        <Link
          className="text-xs font-semibold text-[#0F3D3A] underline underline-offset-4"
          href={`/private/sesiones/${sessionId}/editar`}
        >
          Editar importes
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-end">
      <label className="text-xs font-semibold text-[var(--muted)]">
        Método de pago
        <select
          className="mt-2 min-h-10 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-3 text-sm font-normal text-[var(--text)]"
          defaultValue={currentMethod}
          key={currentMethod}
          name="paymentMethod"
        >
          {methods.map((method) => (
            <option key={method} value={method}>
              {paymentMethodLabels[method]}
            </option>
          ))}
        </select>
      </label>
      <SubmitButton className="min-h-10 rounded-full bg-[#0F3D3A] px-4 text-xs font-semibold text-white disabled:opacity-60">
        Guardar método
      </SubmitButton>
      {state.message ? (
        <p
          aria-live="polite"
          className={`text-xs sm:col-span-2 ${state.success ? "text-[#0F3D3A]" : "text-rose-700"}`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
