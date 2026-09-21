"use server";
import { briefSchema, type ActionState } from "@/lib/dashboard/model";
import { validToken, hashToken } from "@/lib/dashboard/brief";
import { serviceDb } from "@/lib/dashboard/server";
import { dashboardServiceConfigured } from "@/lib/dashboard/config";
export async function submitBrief(
  _state: ActionState,
  form: FormData,
): Promise<ActionState> {
  const token = form.get("token");
  if (
    typeof token !== "string" ||
    !validToken(token) ||
    !dashboardServiceConfigured() ||
    form.get("website")
  )
    return { error: "Ten formularz jest niedostępny." };
  const parsed = briefSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success)
    return {
      error:
        "Opisz firmę i cel strony. Każda odpowiedź może mieć maksymalnie 3 000 znaków.",
    };
  try {
    const { data, error } = await serviceDb().rpc("crm_submit_brief", {
      p_hash: hashToken(token),
      p_answers: parsed.data,
    });
    if (error) throw error;
    if (!data)
      return {
        error:
          "Link wygasł, został unieważniony albo brief został już wysłany. Napisz na contact@dorlowski.dev.",
      };
    return {
      success:
        "Dziękuję! Brief został zapisany. Zapoznam się z odpowiedziami i wrócę z propozycją współpracy.",
    };
  } catch {
    return {
      error:
        "Nie udało się zapisać briefu. Zachowaj odpowiedzi i spróbuj ponownie później.",
    };
  }
}
