import { CalendarDays } from "lucide-react";
import { DemoNotice } from "./DemoNotice";

function currentDateLabel() {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    timeZone: "Europe/Madrid",
    weekday: "long",
    year: "numeric",
  }).format(new Date());
}

export function PrivateHeader({ title }: { title: string }) {
  return (
    <header className="border-b border-[var(--line)]/55 bg-[#FAF8F4]/90 px-5 py-5 backdrop-blur-xl lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-[var(--muted)]">Hola, Daniela</p>
          <h1 className="mt-1 text-3xl font-semibold leading-tight text-[var(--text)]">
            {title}
          </h1>
        </div>
        <div className="flex w-fit items-center gap-2 rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm text-[var(--muted)]">
          <CalendarDays className="size-4 text-[var(--brand-hover)]" />
          {currentDateLabel()}
        </div>
      </div>
      <DemoNotice />
    </header>
  );
}
