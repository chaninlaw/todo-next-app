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

export function fromDate(time: number, date = Date.now()) {
  return new Date(date + time * 1000)
}

export function nameToColor(name: string): string {
  const hash = name
    .split("")
    .reduce(
      (acc: number, char: string) => char.charCodeAt(0) + ((acc << 5) - acc),
      0
    )

  return [16, 8, 0].reduce((color: string, shift: number) => {
    const value = (hash >> shift) & 0xff
    return color + ("00" + value.toString(16)).slice(-2)
  }, "#")
}

export function isColorLight(color: string): boolean {
  // Check if the input color is in the hex format (#RRGGBB)
  const hex = color.slice(1)
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 2), 16)
  const b = parseInt(hex.slice(4, 2), 16)

  // Calculate relative luminance (perceived brightness)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Check if the luminance suggests the color is light (WCAG threshold is 0.5)
  return luminance > 0.5
}

export const HTTP_RESPONSE_CODE = {
  GET: 200,
  POST: 200,
  PUT: 200,
  PATCH: 200,
  DELETE: 204,
}
