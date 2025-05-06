import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function formatTime(timeString: string): string {
  // Format 24-hour time string (HH:MM) to 12-hour format with AM/PM
  const [hours, minutes] = timeString.split(":").map(Number)

  const period = hours >= 12 ? "PM" : "AM"
  const displayHours = hours % 12 || 12

  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`
}

export function getDatesBetween(startDate: string, endDate: string): Date[] {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const dates = []

  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date))
  }

  return dates
}

export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0

  const start = new Date(checkIn)
  const end = new Date(checkOut)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}
