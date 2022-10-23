

/**
 * ミリ秒からHH時間MM分形式の文字列を取得する
 */
export const toDispTime = (time: number): string => {
  const hour = Math.floor(time / 1000 / 3600)
  const minute = Math.ceil(time / 1000 % 3600 / 60)
  return hour + '時間' + minute + '分'
}

/**
 * ミリ秒からHH形式の文字列を取得する
 */
export const toDispHour = (time: number): string => {
  const hour = Math.floor(time / 1000 / 3600)
  return hour.toString()
}

/**
 * ミリ秒からMM形式の文字列を取得する
 */
export const toDispMinute = (time: number): string => {
  const minute = Math.ceil(time / 1000 % 3600 / 60)
  return minute.toString()
}


/**
 * Dateから年月日の文字列を取得する
 */
export const getDateFormated = (date: Date): string => {
  if (!date) {
    return ''
  }
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDay()
  const hour = date.getHours()
  const minute = date.getMinutes()
  return year + '年' + month + '月' + day + '日' + ' ' + hour + '時' + minute + '分'
}

