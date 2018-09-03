var baseUrl = 'http://192.168.1.213:9080/fests/';
//var baseUrl = 'http://qlcdyf.vicp.net:8080/fests/';
//var baseUrl = 'http://192.168.1.21:8080/fests/'; //发布
//var baseUrl = 'http://192.168.16.42:8080/';
//var baseUrl = 'http://192.168.16.31:8080/fests/';
//var baseUrl = 'http://192.168.16.40:8080/';

const CONFIG = {
	cookieKey: 'user',
	universitycode: '10001', //院校代码
	token: '', //令牌
	account: [],	//账户列表
	mainAccount1: {},	//竞赛主账户
	mainAccount2: {},	//期权主账户
	loginData: {
		data: {
			student: {
				studentid: "",
				name: "今晚打老虎",
				college: null,
				depart: "",
				major: "",
				grade: "",
				class: "",
				email: ''
			},
			account: [
				{
					usage: '1',
					raceid: "1",
					name: "测试排行榜赛事账户",
					accts: [
						{
							type: 1,
							acct: "1000103600",
							acctname: "沪深A股交易资金账户"
						},
						{
							type: 2,
							acct: "10001201803534",
							acctname: "沪深期权交易资产账户"
						}
					]
				},
				{
					usage: 0,
					raceid: 20,
					name: "模拟主账户",
					accts: [
						{
							type: 1,
							acct: "10001201876175",
							acctname: "沪深A股交易资金账户"
						},
						{
							type: 2,
							acct: "10001201803534",
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
		token: "bce8a68fd57f6aabd071a053f0b0be922ae39baeb871522ee98ed82062e5fdac"
	},
	codeTime: 60,	//验证码倒计时时间
	pageSize: 10,
	api: {
		code: baseUrl + 'comm/obtainVerifycode.do', //验证码
		register: baseUrl + 'comm/register.do', //注册
		getPwd: baseUrl + 'comm/passwordself.do', //找回密码
		activeAccount: baseUrl + 'comm/activeaccount.do', //找回密码
		getUserInfo: baseUrl + 'my/queryinfo.do', //个人信息
		editPassword: baseUrl + 'my/editpassword.do', //修改密码
		editEmail: baseUrl + 'my/editemail.do', //修改邮箱
		editTel: baseUrl + 'my/edittel.do', //修改手机号
		loginOut: baseUrl + 'my/logout.do', //退出

		hq: 'http://192.168.1.213:9080/quotescenter/service', //行情
		myRacelist: baseUrl + 'competition/myracelist.do', //模拟赛列表
		competitionList: baseUrl + 'competition/list.do', //赛事列表
		signUp: baseUrl + 'competition/signup.do', //赛事报名
		competitionDetail: baseUrl + 'competition/racedetail.do', //赛事详情
		competitionSort: baseUrl + 'competition/raceranking.do', //赛事详情

		cumSetting: baseUrl + 'task/cumsetting.do', //条件
		taskList: baseUrl + 'task/list.do', //教学课程列表
		taskDetail: baseUrl + 'task/racedetail.do', //教学课程详情
		taskRanking: baseUrl + 'task/raceranking.do', //教学课程排名

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

		acctList: baseUrl + 'my/acctlist.do', //账户列表
		lineList: baseUrl + 'chart/indexlist.do', //指数列表
		profit: baseUrl + 'chart/profit.do', //走势图
		mySummary: baseUrl + 'query/mysummary.do', //我的资产
		hold: baseUrl + 'chart/hold.do', //持仓饼图
		myHold: baseUrl + 'query/myhold.do', //持仓行情列表
		myTrade: baseUrl + 'query/mytrade.do', //历史成交单
		myApply: baseUrl + 'query/myapply.do', //历史委托单
		comment: baseUrl + 'comcenter/mycomment.do', //我的评论
		replyList: baseUrl + 'comcenter/replylist.do', //回复评论列表
		commentreply: baseUrl + 'comcenter/commentreply.do', //回复评论
	},
	defaultFaceUrl: require('../assets/images/comment-face.png'),
	ajaxCount: 0,
	success: {
		"1": "加载数据成功",
		'101': "注册成功",
		'102': "",
		'103': "",
		'104': "已退出",
		'105': "",
		'106': "注册成功"
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
		'-1040': '',
		'-1050': '非法操作！',
		'-1060': '注册失败'
	}
}

export default CONFIG