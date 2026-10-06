export type ContactIntent = {
  kind: "project" | "package" | "service";
  label: string;
  value: string;
};

export const CONTACT_INTENT_EVENT = "portfolio:contact-intent";
export const CONTACT_MESSAGE_LIMIT = 5000;
const STORAGE_KEY = "portfolio:contact-intent:v1";
const labels: Record<ContactIntent["kind"], string> = {
  project: "Wybrany projekt",
  package: "Wybrany pakiet",
  service: "Wybrana usługa",
};

let currentIntent: ContactIntent | null = null;
let loaded = false;

function parseIntent(value: unknown): ContactIntent | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Record<string, unknown>;
  if (
    candidate.kind !== "project" &&
    candidate.kind !== "package" &&
    candidate.kind !== "service"
  )
    return null;
  if (
    typeof candidate.label !== "string" ||
    typeof candidate.value !== "string"
  ) {
    return null;
  }

  const label = candidate.label.trim();
  const intentValue = candidate.value.trim();
  if (
    !label ||
    !intentValue ||
    label.length > 180 ||
    intentValue.length > 120 ||
    /[\u0000-\u001f\u007f]/.test(label + intentValue)
  )
    return null;

  // Only the public choice is persisted. Form fields never enter this store.
  return { kind: candidate.kind, label, value: intentValue };
}

export function getContactIntent(): ContactIntent | null {
  if (typeof window === "undefined") return null;
  if (!loaded) {
    loaded = true;
    try {
      const stored = window.sessionStorage.getItem(STORAGE_KEY);
      currentIntent = stored ? parseIntent(JSON.parse(stored)) : null;
    } catch {
      // Memory remains available when privacy settings block sessionStorage.
    }
  }
  return currentIntent;
}

export function getServerContactIntent(): null {
  return null;
}

export function setContactIntent(intent: ContactIntent): void {
  if (typeof window === "undefined") return;
  const validIntent = parseIntent(intent);
  if (!validIntent) return;
  currentIntent = validIntent;
  loaded = true;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(validIntent));
  } catch {
    // The same-tab event and memory fallback still work without storage.
  }
  window.dispatchEvent(
    new CustomEvent(CONTACT_INTENT_EVENT, { detail: validIntent }),
  );
}

export function clearContactIntent(): void {
  if (typeof window === "undefined") return;
  currentIntent = null;
  loaded = true;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Clearing memory also clears the visible context when storage is blocked.
  }
  window.dispatchEvent(new CustomEvent(CONTACT_INTENT_EVENT, { detail: null }));
}

export function subscribeContactIntent(onChange: () => void): () => void {
  window.addEventListener(CONTACT_INTENT_EVENT, onChange);
  return () => window.removeEventListener(CONTACT_INTENT_EVENT, onChange);
}

export function getContactIntentLabel(intent: ContactIntent): string {
  return labels[intent.kind];
}

export function getContactIntentPrefix(intent: ContactIntent | null): string {
  if (!intent) return "";
  const value = intent.value === intent.label ? "" : ` (${intent.value})`;
  return `${getContactIntentLabel(intent)}: ${intent.label}${value}\n\n`;
}

export function formatContactIntentMessage(
  message: string,
  intent: ContactIntent | null,
): string {
  return getContactIntentPrefix(intent) + message.trim();
}
