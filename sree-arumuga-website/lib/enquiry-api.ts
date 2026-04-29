export const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyHVpidd1noB4szB5hfYyp_QlyMmUI5M14Tv-wL_0lGSuORoQ9vluStzK_-yDTPaQnP/exec";

export const WHATSAPP_ENQUIRY_NUMBER = "919940119914";

export const PRODUCT_INTEREST_OPTIONS = [
  "HR Sheets",
  "CR Sheets",
  "GP Sheets",
  "GL Sheets",
  "MS Plates",
  "Steel Coils",
  "Other",
] as const;

export type ProductInterest = (typeof PRODUCT_INTEREST_OPTIONS)[number];

export type EnquiryPayload = {
  name: string;
  phone: string;
  email: string;
  message: string;
  productInterest: string;
  source: string;
};

export function buildWhatsAppQuoteUrl(name: string, phone: string, email: string, message: string): string {
  const text = `New Quote Enquiry:\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`;
  return `https://wa.me/${WHATSAPP_ENQUIRY_NUMBER}?text=${encodeURIComponent(text)}`;
}

export async function submitEnquiryToSheet(payload: EnquiryPayload): Promise<boolean> {
  try {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return false;
    const raw = await res.text();
    if (!raw.trim()) return true;
    try {
      const data = JSON.parse(raw) as { success?: boolean; result?: string };
      if (data.success === false || data.result === "error") return false;
    } catch {
      // Non-JSON body; treat 200 as success
    }
    return true;
  } catch {
    return false;
  }
}
