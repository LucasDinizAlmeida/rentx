import { addDays } from "date-fns";


export function ajustDate(date: Date) {
  return addDays(date, 1)
}