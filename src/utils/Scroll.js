/**
 * 滾動到錨點 監聽
 * @param  {NodeList} AnchorCell   錨點列表
 * @param  {int} topMenuHeight     上方菜單 scrollHeight 值
 * @return {int}
 */
export function onScrollAnchor(AnchorCell, topMenuHeight) {
  const offsetTopArr = []
  AnchorCell.forEach(item => {
    offsetTopArr.push(item.offsetTop - topMenuHeight)
  })
  const currentOffsetTop =
    document.documentElement.scrollTop || document.body.scrollTop // 獲取當前 OffsetTop
  let navIndex = 0 // 定義當前點亮的導航下標
  for (let n = 0; n < offsetTopArr.length; n++) {
    // 如果 scrollTop 大於等於第 n 個元素的 offsetTop 則說明 n-1 的內容已經完全不可見
    if (currentOffsetTop >= offsetTopArr[n]) {
      navIndex = n
    }
  }
  return navIndex
}
/**
 * 判斷是否已到達底部
 * @return {boolean}
 */
export function isBottom(dom) {
  const scrollTop =
  dom.scrollTop || document.documentElement.scrollTop || document.body.scrollTop
  const windowHeight =
  dom.clientHeight || document.documentElement.clientHeight || document.body.clientHeight
  const scrollHeight =
  dom.scrollHeight || document.documentElement.scrollHeight || document.body.scrollHeight
  if (scrollTop + windowHeight === scrollHeight) {
    return true
  }
  return false
}
/**
 * 跳轉到指定 目標
 * @param {NodeList} Target   目標對象
 * @param {int}      STEP     速度(預設 25 個像素)  px:像素  (每次走，數字越大跳得越快) s:毫秒 (幾毫秒內到達目標 ， 數字越大越慢)
 * @param {int}      Offset   偏移(預設 -30) ，可正可負
 */
//
export function scrollToTarget(dom, Target, STEP = '1500ms', Offset = 0) {
  const targetOffsetTop = Target.offsetTop + parseInt(Offset) // 獲取目標的 offsetTop
  let currentOffsetTop =
  dom.scrollTop || document.documentElement.scrollTop || document.body.scrollTop // 獲取當前 OffsetTop
  const Pixel = /px$/i
  const Second = /ms$/i
  if (!Pixel.test(STEP) && !Second.test(STEP)) return 'STEP 格式寫錯'
  const speed = Second.test(STEP)
    ? (Math.abs(targetOffsetTop - currentOffsetTop) / parseFloat(STEP) / 60) *
      1000
    : parseFloat(STEP)
  // 判斷是往下滑還是往上滑
  if (currentOffsetTop > targetOffsetTop) {
    smoothUp() // 往上滑
  } else {
    smoothDown() // 往下滑
  }
  // 定義往上滑函數
  function smoothUp() {
    if (currentOffsetTop > targetOffsetTop) {
      if (currentOffsetTop - targetOffsetTop >= speed) {
        currentOffsetTop -= speed
      } else {
        currentOffsetTop = targetOffsetTop
      }
      dom.scrollTop = document.body.scrollTop = document.documentElement.scrollTop = currentOffsetTop
      requestAnimationFrame(smoothUp)
    }
  }
  // 定義往下滑函數
  function smoothDown() {
    // 如果當前 scrollTop 小於 targetOffsetTop 說明視口還沒滑到指定位置
    if (currentOffsetTop < targetOffsetTop) {
      if (targetOffsetTop - currentOffsetTop >= speed) {
        currentOffsetTop += speed // 如果和目標相差距離大於等於 speed 就跳 speed
      } else {
        currentOffsetTop = targetOffsetTop // 否則直接跳到目標點，目標是為了防止跳過了
      }
      dom.scrollTop = document.body.scrollTop = document.documentElement.scrollTop = currentOffsetTop // 移動網頁
      requestAnimationFrame(smoothDown) // 屏幕在繪製下一幀時會回調傳給 requestAnimationFrame 的函數
    }
  }
}
