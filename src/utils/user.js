import { storage, tokenTableName, userInfoTableName } from '@/config'

/**
 * @description 獲取accessToken
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getAccessToken() {
  if (storage) {
    if (storage === 'localStorage') {
      return localStorage.getItem(tokenTableName)
    } else if (storage === 'sessionStorage') {
      return sessionStorage.getItem(tokenTableName)
    } else {
      return localStorage.getItem(tokenTableName)
    }
  } else {
    return localStorage.getItem(tokenTableName)
  }
}

/**
 * @description 存儲accessToken
 * @param accessToken
 * @returns {void|*}
 */
export function setAccessToken(accessToken) {
  if (storage) {
    if (storage === 'localStorage') {
      return localStorage.setItem(tokenTableName, accessToken)
    } else if (storage === 'sessionStorage') {
      return sessionStorage.setItem(tokenTableName, accessToken)
    } else {
      return localStorage.setItem(tokenTableName, accessToken)
    }
  } else {
    return localStorage.setItem(tokenTableName, accessToken)
  }
}

/**
 * @description 移除accessToken
 * @returns {void|Promise<void>}
 */
export function removeAccessToken() {
  if (storage) {
    if (storage === 'localStorage') {
      return localStorage.removeItem(tokenTableName)
    } else if (storage === 'sessionStorage') {
      return sessionStorage.clear()
    } else {
      return localStorage.removeItem(tokenTableName)
    }
  } else {
    return localStorage.removeItem(tokenTableName)
  }
}
/**
 * @description 獲取userInfo
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getUserInfo() {
  if (storage) {
    if (storage === 'localStorage') {
      return JSON.parse(localStorage.getItem(userInfoTableName))
    } else if (storage === 'sessionStorage') {
      return sessionStorage.getItem(userInfoTableName)
    } else {
      return JSON.parse(localStorage.getItem(userInfoTableName))
    }
  } else {
    return JSON.parse(localStorage.getItem(userInfoTableName))
  }
}

/**
 * @description 存儲userInfo
 * @param userInfo
 * @returns {void|*}
 */
export function setUserInfo(userInfo) {
  if (storage) {
    if (storage === 'localStorage') {
      return localStorage.setItem(userInfoTableName, JSON.stringify(userInfo))
    } else if (storage === 'sessionStorage') {
      return sessionStorage.setItem(userInfoTableName, JSON.stringify(userInfo))
    } else {
      return localStorage.setItem(userInfoTableName, JSON.stringify(userInfo))
    }
  } else {
    return localStorage.setItem(userInfoTableName, JSON.stringify(userInfo))
  }
}

/**
 * @description 移除accessToken
 * @returns {void|Promise<void>}
 */
export function removeUserInfo() {
  if (storage) {
    if (storage === 'localStorage') {
      return localStorage.removeItem(userInfoTableName)
    } else if (storage === 'sessionStorage') {
      return sessionStorage.clear()
    } else {
      return localStorage.removeItem(userInfoTableName)
    }
  } else {
    return localStorage.removeItem(userInfoTableName)
  }
}
