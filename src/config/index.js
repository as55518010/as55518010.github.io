/**
 * @description 3個子配置，通用配置|主題配置|網絡配置導出
 */
const setting = require('./setting.config')
const network = require('./net.config')
module.exports = Object.assign({}, setting, network)

