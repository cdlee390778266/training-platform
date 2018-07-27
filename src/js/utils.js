import Vue from 'vue'
import axios from 'axios'
import CONFIG from './config'
import store from '../store/vuex'

var Utils = {}

Utils.$http = axios;

Utils.$store = store;

/**
 * Gets the tip text 获取提示文字
 *
 * @param      {<string>}  type    提示类型
 * @param      {<string>}  code    提示代码
 * @return     {<string>}  提示文字
 */
Utils.getTipText = function(type, code) {
	if(!type || !code) return;
	return CONFIG[type][code] || '';
}

/**
 * Shows the tip. 显示提示
 *
 * @param      {<string>}  type    	   提示框类型
 * @param      {<string>}  code        提示代码
 */
Utils.showTip = function(type, code, showFn, hideFn) {
	if(!type || !code) return;
	// Vue.$vux.toast.show({
	// 	type: 'text',
	// 	text: Utils.getTipText(type, code),
	// 	position: 'middle',
	// 	width: 'auto',
	// 	isShowMask: false,
	// 	onShow () {
	//     	if(typeof showFn == 'function') showFn();
	//   	},
	//   	onHide () {
	//     	if(typeof hideFn == 'function') hideFn();
	//   	}
	// })
}

/**
 * Hides the tip. 关闭提示框
 */
Utils.hideTip = function() {
	Vue.$vux.toast.hide()
}

/**
 * Shows the alert.
 *
* @param      {<type>}  type      弹出框类型
 * @param      {<string>}  code   提示文字key
 * @param      {Function}  showFn  显示回调
 * @param      {Function}  hideFn  隐藏回调
 */
Utils.showAlert = function(type, code, showFn, hideFn) {
	if(!type || !code) return;
	// Vue.$vux.alert.show({
	//   	title: '提示',
	//   	content: Utils.getTipText(type, code),
	//   	onShow () {
	//     	if(typeof showFn == 'function') showFn();
	//   	},
	//   	onHide () {
	//     	if(typeof hideFn == 'function') hideFn();
	//   	}
	// })

}

/**
 * Shows the confirm.确认框
 *
 * @param      {<type>}    type       确认框类型
 * @param      {<type>}    code       提示文字key
 * @param      {Function}  confirmFn  确认回调
 * @param      {Function}  cancelFn   取消回调
 * @param      {<type>}    titleCode  标题key
 */
Utils.showConfirm = function(type, code, confirmFn, cancelFn, titleCode) {
	if(!type || !code) return;
	// Vue.$vux.confirm.show({
	//   	title: Utils.getTipText('title', titleCode) || '操作提示',
	//   	content: Utils.getTipText(type, code),
 //        onCancel () {
 //          if(typeof cancelFn == 'function') cancelFn();
 //        },
 //        onConfirm () {
 //          if(typeof confirmFn == 'function') confirmFn();
 //        }
	// })

}

/**
 * Gets the api 获取API接口地址
 *
 * @param      {<type>}  key     键名
 * @return     {string}  The api url.
 */
Utils.getApiUrl = function(key) {
	if(!key) return '';
	return CONFIG.api[key] || '';
}

/**
 * Gets the json. 获取json数据
 *
 * @param      {<type>}    url      url
 * @param      {Function}  success  成功回调
 * @param      {Function}  error    失败回调
 * @param      {string}    params   参数
 */
Utils.getJson = function(apiUrlKey, success, error, params = {}) {
	var url = Utils.getApiUrl(apiUrlKey);
	if(!url) return;
	Vue.$vux.loading.show();
	CONFIG.ajaxCount++;
	Utils.$http.get(url, {
		params: params,
		timeout: 3000
	})
		.then(function(res){
			--CONFIG.ajaxCount ? '' : Vue.$vux.loading.hide();
            if(typeof success == 'function') success(res)
        })
        .catch(function(err){
        	--CONFIG.ajaxCount ? '' : Vue.$vux.loading.hide();
        	Utils.showTip('success', '-1');
            if(typeof error == 'function') error(err)
        })
}

/**
 * Sets the user.设置登录用户
 *
 * @param      {<type>}  user    The user
 */
Utils.setUser = function(user) {
	store.dispatch('setUser', Object.assign({}, user))
}

/**
 * Gets the user.获取登录用户信息
 *
 * @return     {<type>}  The user.
 */
Utils.getUser = function() {
	return store.getters.getUser;
}

export default Utils