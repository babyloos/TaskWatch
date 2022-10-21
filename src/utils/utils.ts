

/**
 * ミリ秒からHH時間MM分形式の文字列を取得する
 */
export const toDispTime = (time: number): string => {
  const hour = Math.floor(time / 1000 / 3600)
  const minute = Math.ceil(time / 1000 % 3600 / 60)
  return hour + '時間' + minute + '分'
}
