import {
  Activity,
  ClipboardCheck,
  Dumbbell,
  HeartPulse,
  ListChecks,
  RadioTower,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Stethoscope,
  Target,
  UserRoundCheck,
  Waves,
} from "lucide-react";

export const whatsappPhone = "34600942745";

export const whatsappMessage =
  "Hola Daniela, me gustaría solicitar una cita de fisioterapia.";

export const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
  whatsappMessage,
)}`;

export const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Sobre mí", href: "/sobre-mi" },
  { label: "Servicios", href: "/servicios" },
  { label: "Método", href: "/metodo-de-trabajo" },
  { label: "INDIBA", href: "/indiba-radiofrecuencia" },
  { label: "Lesiones", href: "/lesiones-frecuentes" },
  { label: "FAQ", href: "/preguntas-frecuentes" },
  { label: "Contacto", href: "/contacto" },
];

export const methodSteps = [
  {
    title: "Evaluación clínica",
    text: "Escucha, exploración funcional y análisis del contexto para entender qué limita el movimiento.",
    icon: ClipboardCheck,
  },
  {
    title: "Tratamiento personalizado",
    text: "Terapia manual, educación, ejercicio y tecnología cuando aportan valor al caso.",
    icon: HeartPulse,
  },
  {
    title: "Plan de rehabilitación",
    text: "Objetivos medibles, ejercicios progresivos y pautas claras para recuperar función.",
    icon: Target,
  },
  {
    title: "Seguimiento y progresión",
    text: "Ajustes según evolución, control de carga y retorno gradual a la actividad.",
    icon: RefreshCw,
  },
];

export const services = [
  {
    title: "Evaluación fisioterapéutica inicial",
    text: "Primera valoración para comprender el motivo de consulta, la historia clínica y los objetivos del proceso.",
    icon: Stethoscope,
  },
  {
    title: "Rehabilitación deportiva",
    text: "Planificación del retorno al entrenamiento con criterios clínicos, fuerza, movilidad y control de carga.",
    icon: Activity,
  },
  {
    title: "Recuperación funcional",
    text: "Trabajo progresivo para recuperar autonomía, tolerancia al movimiento y seguridad en la vida diaria.",
    icon: RotateCcw,
  },
  {
    title: "Terapia manual",
    text: "Técnicas manuales integradas dentro de un plan activo, no como solución aislada.",
    icon: Sparkles,
  },
  {
    title: "Ejercicio terapéutico",
    text: "Programas progresivos para ganar capacidad, autonomía y seguridad en el día a día.",
    icon: UserRoundCheck,
  },
  {
    title: "INDIBA / radiofrecuencia",
    text: "Herramienta complementaria dentro del proceso de recuperación, siempre según valoración.",
    icon: RadioTower,
  },
  {
    title: "Seguimiento de evolución",
    text: "Revisión de síntomas, función y carga para ajustar el plan con criterio y continuidad.",
    icon: ListChecks,
  },
  {
    title: "Readaptación al entrenamiento",
    text: "Progresión cuidadosa hacia la actividad deportiva o el entrenamiento habitual.",
    icon: Dumbbell,
  },
];

export const injuries = [
  "Tobillo",
  "Rodilla",
  "Lesiones musculares",
  "Tendinopatías",
  "Cadera",
  "Hombro",
  "Codo",
  "Dolor lumbar",
  "Recuperación post-lesión deportiva",
];

export const homeInjuries = [
  "Tobillo",
  "Rodilla",
  "Lesiones musculares",
  "Tendinopatías",
  "Dolor lumbar",
  "Post-lesión deportiva",
];

export const faqs = [
  {
    question: "¿Puedo reservar cita online?",
    answer:
      "Por ahora las citas se solicitan directamente por WhatsApp. Así Daniela puede orientar el caso y confirmar disponibilidad de forma cercana.",
  },
  {
    question: "¿Dónde atiende Daniela?",
    answer:
      "Barcelona es su base profesional y atiende pacientes derivados en una clínica ubicada en Passeig de Gràcia. La marca se centra en Daniela como profesional.",
  },
  {
    question: "¿El tratamiento siempre incluye INDIBA?",
    answer:
      "No necesariamente. INDIBA se utiliza cuando encaja con la evaluación clínica y puede aportar valor al proceso de recuperación.",
  },
  {
    question: "¿Trabaja con deportistas?",
    answer:
      "Sí. Daniela cuenta con máster en rehabilitación deportiva realizado en Barcelona y orienta el retorno al deporte con progresión y control de carga.",
  },
  {
    question: "¿Necesito diagnóstico médico previo?",
    answer:
      "No siempre. En la primera valoración se revisa el caso y, si aparecen señales que requieren derivación médica, se indicará con claridad.",
  },
];

export const contactHighlights = [
  "Fisioterapia individualizada con base profesional en Barcelona",
  "Solicita cita por WhatsApp",
  "Sin pagos online ni reservas automáticas",
];

export const indibaBenefits = [
  {
    title: "Herramienta complementaria",
    text: "Se valora como apoyo dentro del tratamiento, no como sustituto de la evaluación clínica.",
    icon: Waves,
  },
  {
    title: "Uso prudente",
    text: "Su aplicación depende de la fase, los objetivos y la respuesta individual del paciente.",
    icon: HeartPulse,
  },
  {
    title: "Integración activa",
    text: "Se combina con terapia manual, ejercicio terapéutico y seguimiento funcional.",
    icon: Activity,
  },
];
