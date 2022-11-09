import { DateData } from "../../components/Calendar";
import { addDays, eachDayOfInterval, format } from 'date-fns'
import { MarkedDates } from './'
import theme from '../../styles/theme'
import { ajustDate } from '../../utils/ajustDate'




// export function ajustDate(date: Date) {
//   return addDays(date, 1)
// }

export function createInterval(start: DateData, end: DateData) {

  let interval: MarkedDates

  eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp)
  }).forEach(item => {
    const date = format(ajustDate(item), 'yyyy-MM-dd')

    interval = {
      ...interval,
      [date]: {
        textColor: theme.colors.main,
        timestamp: item
      }
    }
  })

  return interval

}