export const scheduleStartHour = 7;
export const scheduleEndHour = 21;

export const scheduleHours = Array.from(
  { length: scheduleEndHour - scheduleStartHour + 1 },
  (_, index) => `${index + scheduleStartHour}:00`,
);

export const controlledUseSafetyNote =
  "Uso controlado: no ingresar datos sensibles, informes médicos ni diagnósticos extensos hasta completar la revisión legal, privacidad y seguridad.";
