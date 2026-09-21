import "server-only";
import { serviceDb } from "./server";
import { dashboardServiceConfigured } from "./config";
import { isContactEmail, type ContactInquiry } from "@/lib/contact-email";

export async function captureInquiry(inquiry: ContactInquiry) {
  if (!dashboardServiceConfigured()) return;
  try {
    const { error } = await serviceDb().rpc("crm_capture_inquiry", {
      p_owner: process.env.DASHBOARD_ADMIN_USER_ID!,
      p_name: inquiry.name,
      p_email: isContactEmail(inquiry.contact) ? inquiry.contact : "",
      p_phone: isContactEmail(inquiry.contact) ? "" : inquiry.contact,
      p_service: inquiry.service,
      p_message: inquiry.message,
    });
    if (error) throw error;
  } catch {
    // Email remains the independent fallback; never log personal data or provider responses.
    console.error(
      "CRM_CAPTURE_FAILED: inquiry delivered by email but not stored in dashboard.",
    );
  }
}
