import { hashEmail } from "../utils/hashEmail";

const IMAGE_SIZE = 300;

export function getImageSrc(email: string): string {
  const hash = hashEmail(email);
  return `https://gravatar.com/avatar/${hash}?s=${IMAGE_SIZE}`;
}
