export type PatientStatus = "active" | "paused" | "discharged" | "follow_up";

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export type PackageStatus = "active" | "exhausted" | "pending";
export type PaymentMethod =
  | "cash"
  | "bizum"
  | "card"
  | "split"
  | "transfer"
  | "other"
  | "pending";

export type Patient = {
  id: string;
  fullName: string;
  phone: string;
  age: number;
  mainInjury: string;
  status: PatientStatus;
  startDate: string;
  lastSessionDate: string;
  nextAppointmentDate: string;
  referredBy: string;
  notes: string;
};

export type Appointment = {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  durationMinutes: number;
  status: AppointmentStatus;
  reason: string;
  notes: string;
};

export type TreatmentSession = {
  id: string;
  patientId: string;
  appointmentId: string;
  patientName: string;
  date: string;
  reason: string;
  treatmentSummary: string;
  usedIndiba: boolean;
  painBefore: number;
  painAfter: number;
  exercisesGiven: string;
  evolutionNotes: string;
  nextRecommendation: string;
  durationMinutes: number;
  basePrice: number;
  discountAmount: number;
  amountPaid: number;
  cashAmount: number;
  cardAmount: number;
  paymentMethod: PaymentMethod | "";
  paymentNotes: string;
};

export type SessionPackage = {
  id: string;
  patientId: string;
  patientName: string;
  packageName: string;
  totalSessions: number;
  usedSessions: number;
  remainingSessions: number;
  status: PackageStatus;
};
