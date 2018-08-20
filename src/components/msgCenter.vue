<template>
	<div class="msgCenter">
		<div class="ql-wrapper ql-wrapper-common">
			<div class="msgCenter-body">
				<div class="msgCenter-top">
					<div class="msgCenter-left">
						消息中心
					</div>
					<div class="msgCenter-right">
						<div class="el-table el-table--fit el-table--enable-row-hover" style="width: 100%;">
							<div class="el-table__header-wrapper">
								<table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 978px;">
									<colgroup><col name="el-table_6_column_16" width="618"><col name="el-table_6_column_17" width="180"><col name="el-table_6_column_18" width="180"><col name="gutter" width="0"></colgroup>
									<thead class="has-gutter">
										<tr class="">
											<th colspan="1" rowspan="1" class="el-table_6_column_16 is-leaf"><div class="cell">公告名称</div></th><th colspan="1" rowspan="1" class="el-table_6_column_17 is-leaf"><div class="cell">分类</div></th>
											<th colspan="1" rowspan="1" class="el-table_6_column_18 is-leaf"><div class="cell">发布时间</div></th>
										</tr>
									</thead>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div class="msgCenter-bottom">
					<el-tabs tab-position="left" @tab-click="changeTab" v-model="activeTab">
				    	<el-tab-pane :label="item.name" v-for="(item, index) in msg" :key="index" :name="item.id">
							<el-table
							v-loading="item.isLoading"
							:data="item.data.list"
							:show-header="false"
							@row-click="handleMsg"
							style="width: 100%">
								<el-table-column
								label="公告名称">
									<template slot-scope="scope">
										<span class="tag" v-if="scope.row.topflag">顶</span>
										{{scope.row.title}}
									</template>
								</el-table-column>
								<el-table-column
								prop="typename"
								label="分类"
								width="180">
								</el-table-column>
								<el-table-column
								prop="publishtime"
								label="发布时间"
								width="180">
								</el-table-column>
							</el-table>
							<el-pagination
							background
							layout="prev, pager, next"
							:total="item.data.page.responsetotal"
							@current-change="pageChange">
							</el-pagination>
				    	</el-tab-pane>
				  	</el-tabs>
				</div>
			</div>
		</div>

		<el-dialog
		title="消息详情"
		:visible.sync="dialogVisible"
		width="30%"
		:before-close="handleClose" class="msg-dialog">
		<div class="el-loading-mask" v-show="currentMsgDetail.isLoading">
			<div class="el-loading-spinner">
				<svg viewBox="25 25 50 50" class="circular">
					<circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
				</svg>
			</div>
		</div>
			<h3>{{currentMsgDetail.title | strLen(20)}}<span>{{currentMsgDetail.publishtime}}</span></h3>
			<div class="msg-detail">
				{{currentMsgDetail.content}}
			</div>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				test1: [
					{
						id: '0',
						name: '全部消息',
					},
					{
						id: '1',
						name: '系统消息'
					},
					{
						id: '2',
						name: '课程消息'
					},
					{
						id: '3',
						name: '直播消息'
					},
					{
						id: '4',
						name: '文章消息'
					},
					{
						id: '5',
						name: '赛事消息'
					}
				],
				test2: {
					list: [
						{
							id: 1,
							title: "站内测试消息",
							typeid: 1,
							typename: "系统消息",
							publishtime: "2018-08-10 12:32:21",
							nexusid: "111111",
							readflag: 1,
							topflag: 0
						},
						{
							id: 1,
							title: "站内测试消息",
							typeid: 1,
							typename: "系统消息",
							publishtime: "2018-08-10 12:32:21",
							nexusid: "111111",
							readflag: 1,
							topflag: 1
						},
						{
							id: 1,
							title: "站内测试消息",
							typeid: 1,
							typename: "系统消息",
							publishtime: "2018-08-10 12:32:21",
							nexusid: "111111",
							readflag: 1,
							topflag: 0
						},
						{
							id: 1,
							title: "站内测试消息",
							typeid: 1,
							typename: "系统消息",
							publishtime: "2018-08-10 12:32:21",
							nexusid: "111111",
							readflag: 1,
							topflag: 0
						}
					],
					page: {
						start: 0,
						size: 20,
						responsetotal: 105,
						responsenum: 20
					}
				},
				pageSize: 20,
				activeTab: '',
				currentMsg: {},
				msg: [],
				dialogVisible: false,
				defaultMsgDetail: {
					msgid: 1,
					typeid: 1,
					typename: "系统消息",
					title: "委托系统维护中",
					publishtime: "2018-08-10 12:32:21",
					publisher: "张三",
					nexusid: "111111",
					readflag: 1,
					topflag: 0,
					content: "给你带来不便请谅解。10月10日到10月13日股票行情系统维护中，给你带来不便请谅解。"
				},
				currentMsgDetail: {}
			}
		},
		methods: {
			changeTab() {
				var that = this;
				if(that.activeTab == that.currentMsg.id) return;

				for(var i = 0; i < that.msg.length; i++) {
					if(that.msg[i].id == that.activeTab) {
						that.currentMsg = that.msg[i];
						break;
					}
				}
				//如果没有数据获取数据
				if(!that.currentMsg.data.list.length) {
					var postData = {
						page: {
							start: "1",
							size: that.pageSize
					 	},
						type: that.currentMsg.id
					}
					that.currentMsg.isLoading = true;
					that.$utils.getJson(that.$utils.CONFIG.api.msglist, function(res) {
						if(res.succflag == 0) {
							that.currentMsg.data.list = res.data.list;
							that.currentMsg.data.page = res.data.page;
						}else {
							this.$utils.showTip('error', '', '', '', res.message);
						}
						that.currentMsg.isLoading = false;
					}, function() {
						that.currentMsg.isLoading = false;
					}, postData, false, {token: that.$utils.CONFIG.token})
				}
			},
			pageChange(currentPage) {
				var that = this;
	        	var postData = {
					page: {
						start: (currentPage - 1) * that.pageSize,
						size: that.pageSize
				 	},
					type: that.currentMsg.id
				}
				that.currentMsg.isLoading = true;
				that.$utils.getJson(that.$utils.CONFIG.api.msglist, function(res) {
					if(res.succflag == 0) {
						that.currentMsg.data.list = res.data.list;
						that.currentMsg.data.page = res.data.page;
					}else {
						this.$utils.showTip('error', '', '', '', res.message);
					}
					that.currentMsg.isLoading = false;
				}, function() {
					that.currentMsg.isLoading = false;
				}, postData, false, {token: that.$utils.CONFIG.token})
	      	},
	      	handleMsg(row, event, column) {
	      		var that = this;
	      		that.currentMsgDetail = row.detail;
	      		that.dialogVisible = true;
	      		if(!row.detail.msgid) {
	      			that.currentMsgDetail.isLoading = true;
	      			that.$utils.getJson(that.$utils.CONFIG.api.msg, function(res) {
						if(res.succflag == 0) {
							that.currentMsgDetail= row.detail = that.defaultMsgDetail;
						}else {
							this.$utils.showTip('error', '', '', '', res.message);
						}
					}, function() {}, {msgid: row.id}, false, {token: that.$utils.CONFIG.token})
	      		}
	      	},
	      	handleClose(done) {
	      		this.currentMsgDetail = {};
	      		done();
	      	}
		},
		created() {
			var that = this;
			//test
			that.test1.forEach(function(item, index) {
				item.isLoading = false;
				item.data = {};
				item.data.list = [];
				item.data.page = {}
				item.data.page.responsetotal = 1;
			})
			that.msg = that.test1;
			that.currentMsg = that.msg[0];
			that.test2.list.forEach(function(item, index) {
				item.detail = {};
				item.detail.isLoading = false;
			})
			that.currentMsg.data.list = that.test2.list;
			that.currentMsg.data.page = that.test2.page;
			that.activeTab = that.currentMsg.id;

			//获取消息类型列表
			that.$utils.getJson(that.$utils.CONFIG.api.msgTypeList, function(res) {
				if(res.succflag == 0) {
					res.data.list.forEach(function(item, index) {
						item.isLoading = false;
						item.data = {};
						item.data.list = [];
						item.data.page = {}
						item.data.page.responsetotal = 1;
					})
					that.msg = res.data.list;
					that.currentMsg = that.msg[0];
					that.activeTab = that.currentMsg.id;
					//获取第一类型消息
					if(that.msg.length) {
						var postData = {
							page: {
								start: "1",
								size: that.pageSize
						 	},
							type: that.currentMsg.id
						}
						that.currentMsg.isLoading = true;
						that.$utils.getJson(that.$utils.CONFIG.api.msglist, function(res) {
							if(res.succflag == 0) {
								res.data.list.forEach(function(item, index) {
									item.detail = {};
									item.detail.isLoading = false;
								})
								that.currentMsg.data.list = res.data.list;
								that.currentMsg.data.page = res.data.page;
							}else {
								this.$utils.showTip('error', '', '', '', res.message);
							}
							that.currentMsg.isLoading = false;
						}, function() {
							that.currentMsg.isLoading = false;
						}, postData, false, {token: that.$utils.CONFIG.token})
					}

				}else {
					this.$utils.showTip('error', '', '', '', res.message);
				}
			}, function() {}, {}, true, {token: that.$utils.CONFIG.token})
		}
	}
</script>
<style lang="scss">
	.msgCenter {
		.ql-wrapper {
			padding-bottom: 0;
		}
		.msgCenter-top {
			display: flex;
			.msgCenter-left {
				width: 220px;
				height: 64px;
				line-height: 64px;
				border-right: 1px solid #dde1e6;
				border-bottom: 1px solid #dde1e6;
				text-align: center;
				color: #959595;
			}
			.msgCenter-right {
				flex: 1;
			}
		}
		.msgCenter-bottom {
			.el-tabs.el-tabs--left {
				display: flex;
			}
			.el-tabs__header.is-left {
				width: 220px;
				margin-right: 0px;
				padding-bottom: 200px;
				border-right: 1px solid #dde1e6;
				background: #fff;
			}
			.el-tabs--left .el-tabs__item.is-left {
				position: relative;
				text-align: center;
				height: 60px;
				line-height: 60px;
				color: #959595;
				&.is-active:before {
					content: '';
					position: absolute;
					top: 26px;
					left: 66px;
					display: block;
					width: 8px;
					height: 8px;
					background: #f45e63;
					border-radius: 100%;
				}
			}
			.el-tabs__nav-wrap::after {
				display: none;
			}
			.el-tabs__active-bar {
				background: transparent;
			}
			.el-tabs__content {
				flex: 1;
			}
		}
		.el-table th {
			text-align: center;
			padding-top: 20px;
			padding-bottom: 20px;
		}
		.el-table td {
			text-align: center;
			padding-top: 20px;
			padding-bottom: 20px;
			.tag {
				display: inline-block;
				width: 26px;
				height: 26px;
				text-align: center;
				line-height: 26px;
				font-size: 12px;
				color: #fff;
				margin-right: 5px;
				background: #f45e63;
				border-radius: 8px;
			}
		}
		.msg-dialog {
			.el-dialog__body {
				height: 400px;
				overflow-y: auto;
			}
			h3 {
				color: #4e4e4e;
				font-weight: normal;
				text-align: center;
				padding-bottom: 10px;
				margin-bottom: 20px;
				border-bottom: 1px dashed #ddd;
				span {
					display: block;
					font-size: 12px;
					color: #999;
				}
			}
			.msg-detail {
				text-indent: 2em;
			}
		}
	}
</style>
