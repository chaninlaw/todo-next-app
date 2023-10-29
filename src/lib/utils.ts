import { type ClassValue, clsx } from "clsx"
import { createHash } from "crypto"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hash(password: string) {
  return createHash("md5").update(password).digest("hex")
}
