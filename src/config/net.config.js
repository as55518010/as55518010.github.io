/**
 * @description 導出默認網路配置
 **/
const network = {
  // 默認的接口地址 如果是開發環境和生產環境走vab-mock-server，當然你也可以選擇自己配置成需要的接口地址
  baseURL: process.env.VUE_APP_BASE_API,
  // 配後端數據的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  contentType: 'application/json;charset=UTF-8',
  // 消息框消失時間
  messageDuration: 3000,
  // 最長請求時間
  requestTimeout: 5000,
  // 操作正常code，支持String、Array、int多種類型
  successCode: [200, 201],
  // 無權限code
  noPermissionCode: 401,
  // 登錄失效code
  invalidCode: 402,
  // 後端表單驗證錯誤
  unprocessableEntityCode: 422
}
module.exports = network
