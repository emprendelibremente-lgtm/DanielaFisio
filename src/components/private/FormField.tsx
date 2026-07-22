type FormFieldProps = {
  label: string;
  placeholder?: string;
  textarea?: boolean;
};

export function FormField({ label, placeholder, textarea }: FormFieldProps) {
  const shared =
    "mt-2 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4 py-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--soft)]";

  return (
    <label className="block text-sm font-medium text-[var(--text)]">
      {label}
      {textarea ? (
        <textarea className={`${shared} min-h-24 resize-none`} placeholder={placeholder} />
      ) : (
        <input className={shared} placeholder={placeholder} />
      )}
    </label>
  );
}
