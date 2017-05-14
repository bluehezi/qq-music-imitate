/**
 * Created by bluedoor on 2017/5/5.
 */
export function DateFormat (date, fmt) {
  if (/(y+)/g.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ('' + date.getFullYear()).substr(4 - RegExp.$1.length))
  }
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  for (var key in o) {
    if (new RegExp('(' + key + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, ('00' + o[key]).substring(('' + o[key]).length))
    }
  }
  return fmt
}
