/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
export const BASE_URL = '/api'

export const ERR_OK = 0

// 1、根据经纬度获取位置详情
export const getAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`) // return ajax xxx
// 2、获取食品分类列表
export const getFoodCategorys = () => ajax(BASE_URL + '/index_category')
// 3、根据经纬度获取商铺列表
export const getShops = (latitude, longitude) => ajax(BASE_URL + '/shops', {latitude, longitude})
// 4、根据经纬度和关键字搜索商铺列表
export const getSearchShop = (geohash, keyword) => ajax(BASE_URL + '/search_shops', {geohash, keyword})
// 6、用户名密码登陆
export const reqPwdLogin = (name, pwd, captcha) => ajax(BASE_URL + '/login_pwd', {name, pwd, captcha}, 'POST')
// 7、发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL + '/sendcode', {phone})
// 8、手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(BASE_URL + '/login_sms', {phone, code}, 'POST')
// 9、根据会话获取用户信息
export const getUserInfo = () => ajax(BASE_URL + '/userinfo')
// 10、用户登出
export const reqLogout = () => ajax(BASE_URL + '/logout')

/**
 * 获取商家信息
 */
// export const getShopInfo = () => ajax('/info')

/**
 * 获取商家评价数组
 */
// export const getShopRatings = () => ajax('/ratings')

/**
 * 获取商家商品数组
 */
// export const getShopGoods = () => ajax('/goods')
