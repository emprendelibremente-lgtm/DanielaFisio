import { requireUser } from "@/lib/auth/requireUser";

export const dynamic = "force-dynamic";

export default async function PrivateRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser();

  return children;
}
