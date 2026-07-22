import type { Metadata } from "next";
import { PatientsClient } from "@/components/private/PatientsClient";
import { PrivateLayout } from "@/components/private/PrivateLayout";
import { SuccessMessage } from "@/components/private/SuccessMessage";
import { getPatients } from "@/lib/private/patients";

export const metadata: Metadata = {
  title: "Pacientes privados",
};

export default async function PrivatePatientsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const [{ success }, patients] = await Promise.all([searchParams, getPatients()]);

  return (
    <PrivateLayout title="Pacientes">
      <SuccessMessage code={success} />
      <PatientsClient patients={patients} />
    </PrivateLayout>
  );
}
