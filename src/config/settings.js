/**
 * @description 3個子配置，通用配置|主題配置|網絡配置
 */
// 默認配置
const { setting, theme, network } = require('./')
module.exports = Object.assign({}, setting, theme, network)
