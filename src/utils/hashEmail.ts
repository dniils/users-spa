import CryptoJS from "crypto-js";

export function hashEmail(email: string): string {
  return CryptoJS.SHA256(email.trim().toLowerCase()).toString();
}
