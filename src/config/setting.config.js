/**
 * @description 導出默認通用配置
 */
const setting = {
  // 開發以及部署時的URL
  publicPath: process.env.VUE_APP_PUBLICPATH,
  // 生產環境構建文件的目錄名
  outputDir: 'dist',
  // 放置生成的靜態資源 (js、css、img、fonts) 的 (相對於 outputDir 的) 目錄。
  assetsDir: 'static',
  // 開發環境每次保存時是否輸出為eslint編譯警告
  lintOnSave: true,
  // 進行編譯的依賴
  transpileDependencies: [],
  // 標題 （包括初次加載雪花屏的標題 頁面的標題 瀏覽器的標題）
  title: 'Derrick Blog',
  // 簡寫
  abbreviation: 'vab',
  // 開發環境端口號
  devPort: '9528',
  // 版本號
  version: process.env.VUE_APP_VERSION,
  // 這一項非常重要！請務必保留MIT協議下package.json及copyright作者信息 即可免費商用，不遵守此項約定你將無法使用該框架，如需自定義版權信息請聯繫QQ1204505056
  copyright: 'vab',
  // 是否顯示頁面底部自定義版權信息
  footerCopyright: true,
  // 是否顯示頂部進度條
  progressBar: true,
  // 緩存路由的最大數量
  keepAliveMaxNum: 99,
  // 路由模式，可選值為 history 或 hash
  routerMode: 'hash',
  // 不經過token校驗的路由
  routesWhiteList: ['/login', '/register', '/404', '/401'],
  // 加載時顯示文字
  loadingText: '正在加載中...',
  // token在localStorage、sessionStorage存儲的key的名稱
  tokenTableName: 'token',
  // token在localStorage、sessionStorage存儲的key的名稱
  userInfoTableName: 'userInfo',
  // token存儲位置localStorage sessionStorage
  storage: 'localStorage',
  // token失效回退到登錄頁時是否記錄本次的路由
  recordRoute: true,
  // 是否顯示logo，不顯示時設置false，顯示時請填寫remixIcon圖標名稱，暫時只支持設置remixIcon
  logo: 'vuejs-fill',
  // 是否顯示在頁面高亮錯誤
  errorLog: ['development', 'production'],
  // 是否開啟登錄攔截
  loginInterception: true,
  // 是否開啟登錄RSA加密
  loginRSA: true,
  // intelligence 和 all 兩種方式，前者後端權限只控制permissions不控制view文件的import（前後端配合，減輕後端工作量），all方式完全交給後端前端只負責加載
  authentication: 'intelligence',
  // vertical布局時是否只保持一個子菜單的展開
  uniqueOpened: true,
  // vertical布局時默認展開的菜單path，使用逗號隔開建議只展開一個
  defaultOopeneds: ['/vab'],
  // 需要加loading層的請求，防止重複提交
  debounce: ['doEdit'],
  // 需要自動注入並加載的模塊
  providePlugin: { maptalks: 'maptalks', 'window.maptalks': 'maptalks' },
  // npm run build時是否自動生成7z壓縮包
  build7z: false,
  // 代碼生成機生成在view下的文件夾名稱
  templateFolder: 'project',
  // 是否顯示終端donation打印
  donation: true
}
module.exports = setting
