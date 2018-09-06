import axios from 'axios'
import CONFIG from './config'
import { Loading, Message, MessageBox } from 'element-ui';
import store from '../store/vuex'
import sha1 from 'sha1'

var Utils = {}

Utils.$http = axios;

Utils.$store = store;

Utils.sha1 = function(val) {
	return sha1(val.toString());
}

Utils.CONFIG = CONFIG;

Utils.ajaxCount = 0;

/**
 * Gets the tip text 获取提示文字
 *
 * @param      {<string>}  type    提示类型
 * @param      {<string>}  code    提示代码
 * @return     {<string>}  提示文字
 */
Utils.getTipText = function(type , code) {
	if(!type || !code) return;
	return CONFIG[type][code] || '';
}

/**
 * Shows the tip. 显示提示
 *
 * @param      {<string>}  type    	   提示框类型
 * @param      {<string>}  textType    提示文字类型
 * @param      {<string>}  code        提示代码
 */
Utils.showTip = function(type, textType, code, text) {
	MessageBox({
		title: '消息',
		showClose: true,
		message: text ? text : Utils.getTipText(textType, code),
		type: type ? type: 'success'
    })
}
// Utils.showTip = function(type, textType, code, text) {
// 	Message({
//       showClose: true,
//       message: text ? text : Utils.getTipText(textType, code),
//       type: type ? type: 'success'
//     })
// }

/**
 * Hides the tip. 关闭提示框
 */
Utils.hideTip = function() {
	Message.close();
}

/**
 * Shows the modal dialog.	弹出框
 *
 * @param      {<type>}  type      弹出框类型
 * @param      {<type>}  textType  弹出文字类型
 * @param      {<type>}  code      弹出文字代码
 */
Utils.showModalDialog = function(type, textType, code) {
	MessageBox.alert(Utils.getTipText(textType, code), '提示', {
    	confirmButtonText: '确定',
    	type: type ? type: 'success'
    })
}

/**
 * { 调用EXE }
 *
 * @param      {<type>}  data     数据
 * @param      {<type>}  success  成功回调
 * @param      {<type>}  error    失败回调
 */
Utils.handleExe = function(data, success, error) {
	if(!data) return;
	var json = JSON.stringify(data);
	console.log(json);
	if(window.cefQuery) {
		window.cefQuery({
		    request: json,
		    onSuccess: function(response) {
		      if(typeof success == 'function')  success(response);
		    },
		    onFailure: function(error_code, error_message) {
		      if(typeof error == 'function')  error(response);
		    }
		})
	}
}

/**
 * Gets the taken.获取令牌
 *
 * @param      {Function}  success  The success
 * @param      {Function}  error    The error
 */
Utils.getTaken = function(success, error) {
	console.log("taken");
	if(window.cefQuery) {
		window.cefQuery({
		    request: 'getCurrentToken',
		    onSuccess: function(response) {
		      if(typeof success == 'function')  success(response);
		    },
		    onFailure: function(error_code, error_message) {
		      if(typeof error == 'function')  error(response);
		    }
		})
	}
}

/**
 * Gets the university code.获取院校代码
 *
 * @param      {Function}  success  The success
 * @param      {Function}  error    The error
 */
Utils.getUniversityCode = function(success, error) {
	if(window.cefQuery) {
		window.cefQuery({
		    request: 'universitycode',
		    onSuccess: function(response) {
		      if(typeof success == 'function')  success(response);
		    },
		    onFailure: function(error_code, error_message) {
		      if(typeof error == 'function')  error(response);
		    }
		})
	}
}

/**
 * Gets the login data.获取登录信息
 *
 * @param      {Function}  success  The success
 * @param      {Function}  error    The error
 */
Utils.getLoginData = function(success, error) {
	console.log("login");
	if(window.cefQuery) {
		window.cefQuery({
		    request: 'getLoginData',
		    onSuccess: function(response) {
		      if(typeof success == 'function')  success(response);
		    },
		    onFailure: function(error_code, error_message) {
		      if(typeof error == 'function')  error(response);
		    }
		})
	}
}

/**
 * { function_description 更新登录信息}
 *
 * @param      {<type>}  that    The that
 */
Utils.refreshLoginData = function(that) {
	that.$utils.getLoginData(function(res) {
        var res = JSON.parse(res);
        that.$utils.CONFIG.loginData = res;
        that.$utils.CONFIG.token = that.$utils.CONFIG.loginData.token;
        that.$utils.CONFIG.account = that.$utils.CONFIG.loginData.data.account;
        for(var i = 0; i < that.$utils.CONFIG.account.length; i++) {
            if(that.$utils.CONFIG.account[i].usage == 0) {
              for(var j = 0; j < that.$utils.CONFIG.account[i].accts.length; j++) {
                if(that.$utils.CONFIG.account[i].accts[j].type == 1) {
                  that.$utils.CONFIG.mainAccount1 = that.$utils.CONFIG.account[i].accts[j];
                }else if(that.$utils.CONFIG.account[i].accts[j].type == 2) {
                  that.$utils.CONFIG.mainAccount2 = that.$utils.CONFIG.account[i].accts[j];
                }
              }
              break;
            }
        }
    }, function(error) {
        // alert(error);
    })

    that.$utils.getUniversityCode(function(res) {
        that.$utils.CONFIG.universitycode = res;
    }, function(error) {
        // alert(error);
    })
}

/**
 * Gets the json. 获取json数据
 *
 * @param      {<type>}    url      url
 * @param      {Function}  success  成功回调
 * @param      {Function}  error    失败回调
 * @param      {string}    params   参数
 */
Utils.getJson = function(url, success, error, params = {}, isShowPop=true, urlParams) {
	if(!url) return;
	var loadingInstance;
	if(isShowPop) {
		loadingInstance = Loading.service({
			fullscreen: true,
			customClass: 'loading page-loading'
		});
	}
	Utils.ajaxCount++;
	Utils.$http({
			method: 'post',
			url: url,
			timeout: 5000,
			data: params,
			params: urlParams
		})
		.then(function(res){
			// if(!(--Utils.ajaxCount) && isShowPop) {
			// 	loadingInstance.close()
			// }
			if(isShowPop) {
				loadingInstance.close()
			}
            if(typeof success == 'function') success(res.data)
        }, function(err){
        	if(isShowPop) {
        		loadingInstance.close();
        	}
        	Utils.showTip('error', 'error', '-1');
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

/**
 * Sets the login.设置是否登录
 *
 * @param      {boolean}  isLogin  Indicates if login
 */
Utils.setLogin = function(isLogin) {
	store.dispatch('setLogin', isLogin)
}

/**
 * Gets the login.获取是否登录
 *
 * @return     {<type>}  The login.
 */
Utils.getLogin = function() {
	return store.getters.getLogin;
}

export default Utils