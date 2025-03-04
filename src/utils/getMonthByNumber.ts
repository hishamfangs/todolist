export default function getMonthByNumber(monthNumber: number) {
  if (monthNumber < 0 || monthNumber > 11) {
    throw new Error('Month number must be between 0 and 11')
  }
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  return String(months[monthNumber]).substring(0, 3)
}
