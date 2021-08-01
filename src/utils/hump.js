// 字符串的下劃線格式轉駝峰格式，eg：hello_world => helloWorld
function underline2Hump(s) {
  return s.replace(/_(\w)/g, function(all, letter) {
    return letter.toUpperCase()
  })
}
// 字符串的駝峰格式轉下劃線格式，eg：helloWorld => hello_world
function hump2Underline(s) {
  return s.replace(/([A-Z])/g, '_$1').toLowerCase()
}
// JSON對象的key值轉換為駝峰式，eg：hello_world => helloWorld
export function jsonToHump(obj) {
  if (obj instanceof Array) {
    obj.forEach((v, i) => {
      jsonToHump(v)
    })
  } else if (obj instanceof Object) {
    Object.keys(obj).forEach((key) => {
      var newKey = underline2Hump(key)
      if (newKey !== key) {
        obj[newKey] = obj[key]
        delete obj[key]
      }
      jsonToHump(obj[newKey])
    })
  }
  return obj
}
// JSON對象的key值轉換為下劃線格式，eg：helloWorld => hello_world
export function jsonToUnderline(obj) {
  if (obj instanceof Array) {
    obj.forEach((v, i) => {
      jsonToUnderline(v)
    })
  } else if (obj instanceof Object) {
    Object.keys(obj).forEach((key) => {
      var newKey = hump2Underline(key)
      if (newKey !== key) {
        obj[newKey] = obj[key]
        delete obj[key]
      }
      jsonToUnderline(obj[newKey])
    })
  }
  return obj
}
