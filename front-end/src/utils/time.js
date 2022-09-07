import moment from 'moment'

const _MS_PER_DAY = 1000 * 60 * 60 * 24

export const formatTime = (timestamp) => {
  if (!timestamp) return null
  const timeDiff = Date.now() - timestamp
  if (timeDiff < _MS_PER_DAY) {
    return getTime(timestamp)
  } else if (timeDiff < _MS_PER_DAY * 2) {
    return 'Yesterday'
  } else {
    const date = moment().format('l')
    return _getFormattedDate(date)
  }
}

export const getTime = (ts) => {
  const date = new Date(ts)
  let hour = date.getHours()
  if (hour < 10) hour = '0' + hour
  let minutes = date.getMinutes()
  if (minutes < 10) minutes = '0' + minutes
  return hour + ':' + minutes
}

// Returns formatted date (0d/0m/yyyy) as (d.m.yyyy)
const _getFormattedDate = (dateStr) => {
  const [day, month, yearStr] = dateStr.split('/')
  return [day, month, yearStr].join('.')
}
