import { NextResponse } from "next/server";
import canapes from "../data.json";

const packages = {
  classic: { label: "Classic", traditional: 5, premium: 0 },
  gourmet: { label: "Gourmet", traditional: 3, premium: 2 },
  lusso: { label: "Lusso", traditional: 0, premium: 0 },
} as const;

type PackageId = keyof typeof packages;

type Enquiry = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  date?: unknown;
  time?: unknown;
  address?: unknown;
  guestCount?: unknown;
  packageId?: unknown;
  canapeIds?: unknown;
  message?: unknown;
  terms?: unknown;
};

const asText = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

export async function POST(request: Request) {
  let enquiry: Enquiry;

  try {
    enquiry = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = asText(enquiry.name);
  const email = asText(enquiry.email);
  const phone = asText(enquiry.phone);
  const date = asText(enquiry.date);
  const time = asText(enquiry.time);
  const address = asText(enquiry.address);
  const message = asText(enquiry.message);
  const guestCount = Number(enquiry.guestCount);
  const packageId = asText(enquiry.packageId);
  const canapeIds = enquiry.canapeIds;

  if (
    !name ||
    name.length > 120 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    phone.length < 6 ||
    phone.length > 40 ||
    !date ||
    !address ||
    address.length > 300 ||
    !Number.isInteger(guestCount) ||
    guestCount < 1 ||
    !Object.prototype.hasOwnProperty.call(packages, packageId) ||
    !Array.isArray(canapeIds) ||
    canapeIds.length !== 5 ||
    !canapeIds.every((id) => typeof id === "string") ||
    new Set(canapeIds).size !== canapeIds.length ||
    typeof enquiry.terms !== "boolean" ||
    !enquiry.terms ||
    message.length > 3000
  ) {
    return NextResponse.json({ error: "Please check the enquiry details." }, { status: 400 });
  }

  const selectedCanapes = canapeIds.map((id) => canapes.find((canape) => canape.id === id));
  if (selectedCanapes.some((canape) => !canape)) {
    return NextResponse.json({ error: "The selected canapés are not valid." }, { status: 400 });
  }

  const selectedPackage = packages[packageId as PackageId];
  const traditionalCount = selectedCanapes.filter(
    (canape) => canape?.category === "Traditional",
  ).length;
  const premiumCount = selectedCanapes.filter(
    (canape) => canape?.category === "Premium",
  ).length;
  const validSelection =
    packageId === "lusso" ||
    (traditionalCount === selectedPackage.traditional &&
      premiumCount === selectedPackage.premium);

  if (!validSelection) {
    return NextResponse.json(
      { error: "The selected canapés do not match this package." },
      { status: 400 },
    );
  }

  const accessKey =
    process.env.WEB3FORMS_ACCESS_KEY ??
    process.env.NEXT_PUBLIC_WEB3FORMS_KEY ??
    process.env.NEXT_PUBLIC_WEB;

  if (!accessKey) {
    return NextResponse.json(
      { error: "Canapé enquiries are not configured. Please contact us by phone." },
      { status: 503 },
    );
  }

  const canapeNames = selectedCanapes.map((canape) => canape?.name).join(", ");
  const formData = new URLSearchParams({
    access_key: accessKey,
    subject: `Canapé catering enquiry - ${selectedPackage.label}`,
    from_name: name,
    name,
    email,
    phone,
    date,
    time,
    address,
    guestCount: String(guestCount),
    package: selectedPackage.label,
    canapes: canapeNames,
    message,
    terms: "I have read and I consent",
  });

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    });

    const result = (await response.json()) as { success?: boolean };
    if (!response.ok || !result.success) {
      return NextResponse.json(
        { error: "We could not send your enquiry. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "We could not connect to the enquiry service. Please try again." },
      { status: 502 },
    );
  }
}
