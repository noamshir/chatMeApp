import moment from 'moment'

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export const formatTime = (timestamp) => {
    if(!timestamp) return null
    const timeDiff = Date.now() - timestamp
    if (timeDiff < _MS_PER_DAY) {
        return getTime(timestamp)
    } else if (timeDiff < _MS_PER_DAY * 2) {
        return 'Yesterday'
    } else return _getFormatedDate(moment(timestamp).calendar())
}

export const getTime = (ts) => {
    const date = new Date(ts);
    let hour = date.getHours();
    if (hour < 10) hour = '0' + hour;
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;
    return hour + ':' + minutes;
}

// Returns formated date (0d/0m/yyyy) as (d.m.yyyy)
const _getFormatedDate = (dateStr) => {
    const [day,month,yearStr] = dateStr.split('/')
    const dayStr = (day[0]==0) ? day[1] : day
    const monthStr = (month[0]==0) ? month[1] : month
    return [dayStr,monthStr,yearStr].join('.')
}

