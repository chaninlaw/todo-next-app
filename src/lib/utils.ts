import { type ClassValue, clsx } from "clsx"
import { createHash } from "crypto"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hash(password: string) {
  return createHash("md5").update(password).digest("hex")
}

export function compare(input: string, hashed: string) {
  return hash(input) === hashed
}

export const fromDate = (time: number, date = Date.now()) => {
  return new Date(date + time * 1000)
}
