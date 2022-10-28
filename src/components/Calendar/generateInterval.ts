import { DateData } from ".";
import { eachDayOfInterval } from 'date-fns'


export function generateInterval(start: DateData, end: DateData) {

  const test = eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp)
  })

  console.log(test)
}