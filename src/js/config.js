var baseUrl = 'http://192.168.16.41/';

const CONFIG = {
	cookieKey: 'user',
	universitycode: '', //院校代码
	token: '99', //令牌
	codeTime: 60,	//验证码倒计时时间
	api: {
		code: baseUrl + 'jk.php', //验证码接口
		//code: baseUrl + 'comm/obtainVerifycode.do', //验证码
		register: baseUrl + 'comm/register.do', //注册
		getPwd: baseUrl + 'comm/passwordself.do', //找回密码
		activeAccount: baseUrl + 'comm/activeaccount.do', //找回密码
		getUserInfo: baseUrl + 'my/queryinfo.do', //个人信息
		editEmail: baseUrl + 'my/editemail.do', //修改邮箱
	},
	defaultFaceUrl: 'https://img.mukewang.com/user/5afe3d350001596a02430243-100-100.jpg',
	ajaxCount: 0,
	success: {
		"1": "加载数据成功",
		'101': "注册成功",
		'102': "",
	},
	error: {
		'-1': '加载数据失败，请检查网络！',
		'-1010': '手机号码不能为空！',
		'-1011': '手机号码不正确！',
		'-1012': '获取验证码失败！',
		'-1020': '邮箱不能为空！',
		'-1021': '邮箱不正确！',
		'-1022': '获取验证码失败！',
	}
}

export default CONFIG