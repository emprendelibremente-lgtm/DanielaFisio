import {
  Activity,
  Dumbbell,
  HandHeart,
  HeartPulse,
  RadioTower,
  RotateCcw,
  SearchCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
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
  { label: "Contacto", href: "/contacto" },
];

export const methodSteps = [
  {
    title: "Evaluar",
    text: "Entender el origen del problema, tu contexto y los objetivos que importan.",
    icon: SearchCheck,
  },
  {
    title: "Tratar",
    text: "Combinar terapia manual, tecnología y ejercicio con un criterio claro.",
    icon: HandHeart,
  },
  {
    title: "Progresar",
    text: "Ajustar el plan según tu evolución y avanzar con seguridad.",
    icon: TrendingUp,
  },
];

export const services = [
  {
    title: "Evaluación fisioterapéutica",
    text: "Valoración inicial para entender el problema y definir objetivos concretos.",
    icon: Stethoscope,
  },
  {
    title: "Rehabilitación funcional",
    text: "Recuperación progresiva de movilidad, fuerza y confianza en el movimiento.",
    icon: RotateCcw,
  },
  {
    title: "Lesiones deportivas",
    text: "Acompañamiento para volver al entrenamiento con control de carga.",
    icon: Activity,
  },
  {
    title: "Terapia manual",
    text: "Técnicas manuales integradas dentro de un proceso activo.",
    icon: Sparkles,
  },
  {
    title: "Ejercicio terapéutico",
    text: "Ejercicios adaptados para ganar capacidad y autonomía.",
    icon: UserRoundCheck,
  },
  {
    title: "INDIBA / radiofrecuencia",
    text: "Herramienta complementaria cuando aporta valor al tratamiento.",
    icon: RadioTower,
  },
  {
    title: "Readaptación al entrenamiento",
    text: "Progresión cuidada para volver a entrenar con más seguridad.",
    icon: Dumbbell,
  },
];

export const homeServices = [
  {
    title: "Fisioterapia y rehabilitación",
    text: "Tratamiento personalizado para recuperar función y seguridad.",
    icon: Stethoscope,
  },
  {
    title: "Lesiones deportivas",
    text: "Retorno progresivo al deporte con control de carga.",
    icon: Activity,
  },
  {
    title: "Terapia manual y ejercicio terapéutico",
    text: "Trabajo activo combinado con técnicas manuales.",
    icon: UserRoundCheck,
  },
  {
    title: "INDIBA / radiofrecuencia",
    text: "Apoyo tecnológico integrado dentro del tratamiento.",
    icon: RadioTower,
  },
  {
    title: "Readaptación al movimiento",
    text: "Progresión para volver a moverte con confianza.",
    icon: Dumbbell,
  },
];

export const injuries = [
  "Rodilla",
  "Tobillo",
  "Hombro",
  "Cadera",
  "Codo",
  "Lesiones musculares",
  "Tendinopatías",
  "Dolor lumbar",
];

export const faqs = [
  {
    question: "¿Cómo puedo solicitar cita?",
    answer:
      "Escríbeme por WhatsApp y te responderé personalmente para coordinar disponibilidad.",
  },
  {
    question: "¿Necesito diagnóstico médico previo?",
    answer:
      "No siempre. En la primera sesión se valora el caso y, si hace falta, se orienta una derivación médica.",
  },
  {
    question: "¿Cuántas sesiones necesito?",
    answer:
      "Depende del problema, los objetivos y la evolución. Después de valorar el caso se plantea un plan realista.",
  },
  {
    question: "¿Qué ocurre en la primera sesión?",
    answer:
      "Se realiza una evaluación, se define el objetivo principal y se inicia el tratamiento según lo que necesites.",
  },
  {
    question: "¿Trabajas con INDIBA?",
    answer:
      "Sí, cuando encaja con la valoración. INDIBA se usa como complemento, no como sustituto de la evaluación ni del ejercicio.",
  },
  {
    question: "¿Puedo continuar entrenando durante la recuperación?",
    answer:
      "En muchos casos sí, adaptando cargas y movimientos. La decisión depende de la fase y de la respuesta del cuerpo.",
  },
  {
    question: "¿Dónde atiendes?",
    answer:
      "Mi base profesional está en Barcelona. La atención se coordina según disponibilidad.",
  },
];

export const contactHighlights = [
  "Base profesional en Barcelona",
  "Atención según disponibilidad",
  "Coordinación directa y personal por WhatsApp",
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
