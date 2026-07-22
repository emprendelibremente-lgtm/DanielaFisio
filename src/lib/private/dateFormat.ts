export function formatAppointmentDateLabel(date: string, time: string) {
  const [year, month, day] = date.split("-").map(Number);
  const appointmentDate = new Date(year, month - 1, day);
  const currentYear = new Date().getFullYear();
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: date.startsWith(String(currentYear)) ? undefined : "short",
    weekday: "long",
  };

  const dateLabel = new Intl.DateTimeFormat("es-ES", options).format(
    appointmentDate,
  );

  return `${dateLabel} a las ${time}`;
}

export function isAppointmentPastOrNow(date: string, time: string) {
  return new Date(`${date}T${time}`) <= new Date();
}
