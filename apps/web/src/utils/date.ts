import dayjs from 'dayjs'

/**
 * その月の最終日を取得する
 * @param year
 * @param month
 */
export const getLastDay = (year: number, month: number): number => {
  const zeroPaddingMonth = `0${month}`.slice(-2)
  const yearMonth = new Date(`${year}-${zeroPaddingMonth}`)
  return dayjs(yearMonth).endOf('month').date() + 1
}

export const timeStringToMinutes = (time: string): number => {
  const [hour, minute] = time.split(':')
  return Number(hour) * 60 + Number(minute)
}
