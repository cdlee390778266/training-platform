var baseUrl = 'http://192.168.1.213:9080/fests/';

const CONFIG = {
	cookieKey: 'user',
	universitycode: '10001', //院校代码
	token: '', //令牌
	account: [],
	loginData: {
		data: {
			student: {
				studentid: "",
				name: "",
				college: null,
				depart: "",
				major: "",
				grade: "",
				class: ""
			},
			account: [
				{
					usage: '1',
					raceid: "1",
					name: "测试排行榜赛事账户",
					accts: [
						{
							type: 1,
							acct: "10001689211",
							acctname: "沪深A股交易资金账户"
						}
					]
				},
				{
					usage: 0,
					raceid: 2,
					name: "模拟主账户",
					accts: [
						{
							type: 1,
							acct: "1000168921",
							acctname: "沪深A股交易资金账户"
						},
						{
							type: 2,
							acct: "1000124622",
							acctname: "沪深期权交易资产账户"
						}
					]
				}
			],
			base: {
				clientname: "",
				certno: "",
				tel: "",
				address: "成都市"
			}
		},
		message: "",
		succflag: 0,
		token: "ff40a568e186e87ffc26e84621ae20bf96ddb023abb7701d304cf62635985195"
	},
	codeTime: 60,	//验证码倒计时时间
	pageSize: 20,
	api: {
		code: baseUrl + 'comm/obtainVerifycode.do', //验证码
		register: baseUrl + 'comm/register.do', //注册
		getPwd: baseUrl + 'comm/passwordself.do', //找回密码
		activeAccount: baseUrl + 'comm/activeaccount.do', //找回密码
		getUserInfo: baseUrl + 'my/queryinfo.do', //个人信息
		editPassword: baseUrl + 'my/editpassword.do', //修改密码
		editEmail: baseUrl + 'my/editemail.do', //修改邮箱
		editTel: baseUrl + 'my/edittel.do', //修改手机号

		hq: 'http://192.168.1.213:9080/quotescenter/service', //行情
		myRacelist: baseUrl + 'competition/myracelist.do', //模拟赛列表
		competitionList: baseUrl + 'competition/list.do', //赛事列表
		signUp: baseUrl + 'competition/signup.do', //赛事报名
		competitionDetail: baseUrl + 'competition/racedetail.do', //赛事详情
		competitionSort: baseUrl + 'competition/raceranking.do', //赛事详情

		msgTypeList: baseUrl + 'msgcenter/typelist.do', //消息类型列表
		msglist: baseUrl + 'msgcenter/list.do', //消息列表
		msg: baseUrl + 'msgcenter/message.do', //消息详情

		poollist: baseUrl + 'selfstock/poollist.do', //自选股池列表查询
		stockList: baseUrl + 'selfstock/stocklist.do', //自选股池数据列表查询
		addPool: baseUrl + 'ststock/stockAdd.do', //加入策略选股池
		clStockList: baseUrl + 'ststock/stocklist.do', //策略信息商品列表查询
		stoprecList: baseUrl + 'ststock/stopreclist.do', //查看操作记录
		stockUpd: baseUrl + 'ststock/stockUpd.do', //修改“选股理由”
		stockDel: baseUrl + 'ststock/stockDel.do', //策略信息删除商品

		comment: baseUrl + 'comcenter/mycomment.do', //我的评论
		commentreply: baseUrl + 'comcenter/commentreply.do', //回复评论
		
	},
	defaultFaceUrl: 'https://img.mukewang.com/user/5afe3d350001596a02430243-100-100.jpg',
	ajaxCount: 0,
	success: {
		"1": "加载数据成功",
		'101': "注册成功",
		'102': "",
		'103': "",
	},
	error: {
		'-1': '加载数据失败，请检查网络！',
		'-1010': '手机号码不能为空！',
		'-1011': '手机号码不正确！',
		'-1012': '获取验证码失败！',
		'-1020': '邮箱不能为空！',
		'-1021': '邮箱不正确！',
		'-1022': '获取验证码失败！',
		'-1030': '至少选中一条数据！',
	}
}

export default CONFIG