<template>
	<div class="competitionDetail">
		<div class="ql-wrapper">
			<h1 class="border">
				<el-button size="small" @click="goBack">
				<i class="el-icon-arrow-left"></i></el-button>{{tabs.tabs.detail.data.racename}}
			</h1>
			<div>
				<img :src="ad.url" class="img-responsive">
			</div>
			<div class="competitionDetail-body">
				<el-tabs v-model="tabs.activeTab">
				    <el-tab-pane :label="tabs.tabs.detail.name" name="detail" class="detail">
				    	<div class="detail-body">
					    	<div class="detail-item">
					    		<h2>比赛介绍</h2>
					    		<div>{{tabs.tabs.detail.data.racedesc}}</div>
					    	</div>
					    	<div class="detail-item">
					    		<h2>赛程安排</h2>
					    		<div>
					    			<p>报名阶段：{{tabs.tabs.detail.data.entrystarttime}}~{{tabs.tabs.detail.data.entryendtime}}</p>
					    			<p>比赛阶段：{{tabs.tabs.detail.data.racestarttime}}~{{tabs.tabs.detail.data.raceendtime}}</p>
					    		</div>
					    	</div>
					    	<div class="detail-item">
					    		<h2>比赛规则</h2>
					    		<div>
					    			<p>起始资金：{{tabs.tabs.detail.data.initfund}}元</p>
					    			<p>交易品种：{{tabs.tabs.detail.data.tradekind}}</p>
					    		</div>
					    	</div>
					    	<div class="detail-item">
					    		<h2>主办方</h2>
					    		<div>{{tabs.tabs.detail.data.hostunit}}</div>
					    	</div>
					    	<div class="detail-item">
					    		<h2>当前状态</h2>
					    		<div>
					    			<template v-if="tabs.tabs.detail.data.status == -1">未开始报名</template>
					    			<template v-else-if="tabs.tabs.detail.data.status == 0">报名中</template>
					    			<template v-else-if="tabs.tabs.detail.data.status == 1">比赛中</template>
					    			<template v-else-if="tabs.tabs.detail.data.status == 2">比赛结束</template>
					    		</div>
					    	</div>
					    	<div class="detail-item">
					    		<h2>注意事项</h2>
					    		<div>{{tabs.tabs.detail.data.attention}}</div>
					    	</div>
					    	<div class="detail-item" v-if="tabs.tabs.detail.data.entryStatus == 0">
					    		<el-button type="primary" @click="openDialog">立即报名</el-button>
					    	</div>
					    </div>

					    <!-- 报名弹窗 -->
						<el-dialog title="赛事报名" :visible.sync="signUp.dialogFormVisible" class="signUp" width="600px" center>
							<el-form :model="signUp.signUpForm" :rules="signUp.signUpRules" ref="signUpForm">
								<el-form-item label="验证码" prop="code" class="code" :label-width="signUp.formLabelWidth">
									<el-input v-model="signUp.signUpForm.code" placeholder="请输入验证码"></el-input>
									<img :src="signUp.codeUrl" @click.stop="refreshCode">
								</el-form-item>
								<el-form-item :label-width="signUp.formLabelWidth">
									<el-button type="primary" @click="submitForm('signUpForm')">确定</el-button>
								</el-form-item>
							</el-form>
						</el-dialog>
				    </el-tab-pane>
				    <!-- v-if="tabs.tabs.detail.data.entryStatus == 1 && saveRace.fuacct && saveRace.fuacct.length" -->
				    <el-tab-pane :label="tabs.tabs.sort.name" name="sort" class="sort">
				    	<div class="sort-head">
				    		<el-form ref="form"  label-width="80px" :inline="true">
				    			<el-form-item label="市场类型">
								    <el-select v-model="tabs.tabs.sort.searchVal.mkttype" placeholder="请选择" @change="changeCondition">
									    <el-option
									      v-for="item in tabs.tabs.sort.form.type"
									      :key="item.fuacct"
									      :label="item.fuaccttype == 1 ? '股票市场' : '期权市场'"
									      :value="item.fuaccttype">
									    </el-option>
									</el-select>
								</el-form-item>
				    			<el-form-item label="指标排名">
								    <el-select v-model="tabs.tabs.sort.searchVal.orderby.field" placeholder="请选择" @change="changeCondition">
									    <el-option
									      v-for="item in tabs.tabs.sort.form.sort"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
									</el-select>
								</el-form-item>
							</el-form>
				    	</div>
				    	<div class="tab-body">
				    		<el-table
						    :data="tabs.tabs.sort.tableData"
						    style="width: 100%"
						    :default-sort = "{prop: 'date', order: 'descending'}"
						    >
							    <el-table-column
							      prop="ranking"
							      label="排名"
							    >
							    </el-table-column>
							    <el-table-column
							      prop="studentname"
							      label="用户名"
							  >
							    </el-table-column>
							    <el-table-column
							      prop="dailyincomerate"
							      label="日涨跌幅">
							    </el-table-column>
							    <el-table-column
							      prop="weeklyincomerate"
							      label="周收益率">
							    </el-table-column>
							    <el-table-column
							      prop="monthincomerate"
							      label="月收益率">
							    </el-table-column>
							    <el-table-column
							      prop="totalincomerate"
							      label="总收益率">
							    </el-table-column>
							    <el-table-column
							      prop="totalincome"
							      label="总收益(元)">
							    </el-table-column>
							    <el-table-column
							      prop="nativeassetvalue"
							      label="单位净值">
							    </el-table-column>
							    <el-table-column
							      prop="operatetimes"
							      label="操作次数">
							    </el-table-column>
							    <el-table-column
							      prop="positionmarketamount"
							      label="持仓市值">
							    </el-table-column>
						  	</el-table>
						  	<!-- <el-pagination
							  background
							  layout="prev, pager, next"
							  :total="1000">
							</el-pagination> -->
				    	</div>
				    </el-tab-pane>
				    <el-tab-pane :label="tabs.tabs.notice.name" name="notice" class="notice">
				    	<div class="notice-body">
				    		<el-table
						    :data="tabs.tabs.notice.tableData.list"
						    style="width: 100%" @row-click="handleMsg"
						    >
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
							  :total="tabs.tabs.notice.tableData.page.responsetotal"
							  :page-size="tabs.tabs.notice.tableData.page.size"
							  @current-change="pageChange">
							</el-pagination>
				    	</div>
				    </el-tab-pane>
				</el-tabs>
			</div>
		</div>
		<el-dialog
		title="消息详情"
		:visible.sync="tabs.tabs.notice.dialogVisible"
		width="30%"
		:before-close="handleClose" class="competition-msg-dialog">
		<div class="el-loading-mask" v-show="tabs.tabs.notice.currentMsgDetail.isLoading">
			<div class="el-loading-spinner">
				<svg viewBox="25 25 50 50" class="circular">
					<circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
				</svg>
			</div>
		</div>
			<h3>{{tabs.tabs.notice.currentMsgDetail.title | strLen(20)}}<span>{{tabs.tabs.notice.currentMsgDetail.publishtime}}</span></h3>
			<div class="msg-detail">
				{{tabs.tabs.notice.currentMsgDetail.content}}
			</div>
		</el-dialog>
	</div>
</template>
<script>
	//赛事排名
	var getSort = function(that) {
		that.$utils.getJson(that.$utils.CONFIG.api.competitionSort, function(res) {
          	if(res.succflag == 0) {
            	that.tabs.tabs.sort.tableData = res.data;
          	}else {
            	that.$utils.showTip('error', '', '', res.message);
          	}
        }, function() {}, that.tabs.tabs.sort.searchVal, true, {token: that.$utils.CONFIG.token})
	}
	//赛事公告
	var getNotice = function(that) {
		that.$utils.getJson(that.$utils.CONFIG.api.msglist, function(res) {
          	if(res.succflag == 0) {
            	that.tabs.tabs.notice.tableData.list = res.list;
            	that.tabs.tabs.notice.tableData.page = res.page;
          	}else {
            	that.$utils.showTip('error', '', '', res.message);
          	}
        }, function() {}, that.tabs.tabs.notice.searchVal, true, {token: that.$utils.CONFIG.token})
	}
	//生成11位随机数
	var saveRandom = ''
	var random = function() {
		saveRandom = Math.floor(Math.random() * 10000000000);
		return saveRandom;
	}
	//图片验证码
	var getPicCode = function(that) {
		that.$utils.getJson(that.$utils.CONFIG.api.code, function(res){
			if(res.succflag == 0) {
				that.signUp.codeUrl = res.data.image;
			}else {
				that.$utils.showTip('error', 'error', '-1022');
			}
			that.isCodeLoading = false;
		}, function() {
			that.isCodeLoading = false;
		}, {objectid: random(), type: "3"}, false)
	}
	export default {
		data() {
			return {
				swiperOption: {
			        centeredSlides: true
		        },
				ad: {
					id: 0,
					name: '',
					url: require('../assets/images/ad2.png'),
					link: ''
				},
				saveRace: {},
				isCodeLoading: false,
				saveSignData: {},
				signUp: {
					dialogFormVisible: false,
					formLabelWidth: '120px',
					codeUrl: '',
					signUpForm: {
						code: '',
					},
					signUpRules: {
						code: [
							{ required: true, message: '请输入验证码', trigger: 'blur' },
							{ min: 4, max: 4, message: '请输入4位验证码', trigger: 'blur' }
						]
					}
				},
				tabs: {
					activeTab: 'detail',
					tabs: {
						detail: {
							name: '赛事详情',
							data: {
								racename: '',
								racedesc: '',
								entrystarttime: '',
								entryendtime: '',
								racestarttime: '',
								raceendtime: '',
								initfund: '',
								tradekind: '',
								hostunit: '',
								status: '',
								attention: '',
								entrynum: ''
							}
						},
						sort: {
							name: '赛事排名',
							searchVal: {
								raceid: '',
								mkttype: 1,
								orderby: {
									field: 'DIR',
									sort: 'DESC'
								}
							},
							tableData: [],
			    			form: {
			    				type: [],
			    				sort: [
		    						{
							          value: 'DIR',
							          label: '日涨跌幅'
							        },
							        {
							          value: 'WIR',
							          label: '周收益率'
							        },
							        {
							          value: 'MIR',
							          label: '月收益率'
							        },
							        {
							          value: 'TIR',
							          label: '总收益率'
							        },
							        {
							          value: 'TI',
							          label: '总收益'
							        },
							        {
							          value: 'NAV',
							          label: '单位净值'
							        },
							        {
							          value: 'OT',
							          label: '操作次数'
							        },
							        {
							          value: 'PMA',
							          label: '持仓市值'
							        }
		    					]
			    			}
			    		},
			    		notice: {
							name: '赛事公告',
							searchVal: {
								page: {
									start: 0,
									size: this.$utils.CONFIG.pageSize
							 	},
								type: '1'
							},
					        tableData: {
					        	list: [
						        ],
						        page: {
									start: 0,
									size: this.$utils.CONFIG.pageSize,
									responsetotal: 0,
									responsenum: 0
								}
					        },
					        dialogVisible: false,
					        currentMsgDetail: {}
			    		}
					}
				}
			}
		},
		methods: {
			goBack() {
				window.history.go(-1);
			},
			refreshCode() {
				var that = this;
				getPicCode(that);
			},
			openDialog(item) {
				var that = this;
				that.signUp.dialogFormVisible = true;
				getPicCode(that);
			},
			submitForm(formName) {
	            var that = this;
	            that.$refs[formName].validate((valid) => {
	              if (valid) {
	                var signUpData = {
						raceid: that.saveRace.usagecode,
						verifycode: that.signUp.signUpForm.code,
						objectid: saveRandom
	                }
	                that.$utils.getJson(that.$utils.CONFIG.api.signUp, function(res) {
	                  if(res.succflag == 0) {
	                  	that.tabs.tabs.detail.data.entryStatus = 1;
	                  	that.signUp.dialogFormVisible = false;
	                  }else {
	                    that.$utils.showTip('error', '', '', res.message);
	                  }
	                }, function() {}, signUpData, false, {token: that.$utils.CONFIG.token})
	              } else {
	                return false;
	              }
	            });
	        },
	        changeCondition() {
	        	var that = this;
	        	getSort(that);
	        },
	        pageChange(currentPage) {
				var that = this;
				that.tabs.tabs.notice.searchVal.page.start = (currentPage - 1) * that.tabs.tabs.notice.searchVal.page.size;
				getNotice(that);
	      	},
	      	handleMsg(row, event, column) {
	      		var that = this;
	      		that.tabs.tabs.notice.dialogVisible = true;
	      		if(typeof row.id != 'undefined') {
	      			that.tabs.tabs.notice.currentMsgDetail.isLoading = true;
	      			that.$utils.getJson(that.$utils.CONFIG.api.msg, function(res) {
						if(res.succflag == 0) {
							that.tabs.tabs.notice.currentMsgDetail= res.data;
						}else {
							this.$utils.showTip('error', '', '', res.message);
						}
					}, function() {}, {msgid: row.id}, false, {token: that.$utils.CONFIG.token})
	      		}
	      	},
	      	handleClose(done) {
	      		this.tabs.tabs.notice.currentMsgDetail = {};
	      		done();
	      	}
		},
		created() {
			var that = this;
			if(that.$route.params.type) {
				that.tabs.activeTab = that.$route.params.type;
			}

			that.saveRace = that.$route.query.data ? JSON.parse(that.$route.query.data) : {};
			if(that.saveRace.usagecode == 'undefined') return;
			//赛事详情
			that.$utils.getJson(that.$utils.CONFIG.api.competitionDetail, function(res) {
              	if(res.succflag == 0) {
                	that.tabs.tabs.detail.data = res.data;
                	//赛事排名
		            if(that.tabs.tabs.detail.data.fuacct && that.tabs.tabs.detail.data.fuacct.length) {
		            	that.tabs.tabs.sort.form.type = that.tabs.tabs.detail.data.fuacct;
						that.tabs.tabs.sort.searchVal.mkttype = that.tabs.tabs.sort.form.type[0].fuaccttype;
						that.tabs.tabs.sort.searchVal.raceid = that.saveRace.usagecode;
						that.saveRace.fuacct = that.tabs.tabs.detail.data.fuacct;
		            	getSort(that);
		            }
              	}else {
                	that.$utils.showTip('error', '', '', res.message);
              	}
            }, function() {}, {raceid: that.saveRace.usagecode}, true, {token: that.$utils.CONFIG.token})

            //赛事公告
			getNotice(that);
		}
	}
</script>
<style lang="scss">
	.competitionDetail {
		padding-top: 0;
		h1 {
			height: 130px;
			line-height: 125px;
			padding: 0 40px;
			margin-top: 20px;
			font-size: 18px;
			color: #7d858d;
			background: #fff;
			.el-button {
				font-size: 20px;
				text-align: center;
				padding: 5px;
				font-weight: bold;
				color: #ccd0d5;
				background: #e8edf2;
				border: none;
				margin-right: 50px;
			}
		}
		.swiper-container {
			width: 100%;
			min-width: 1200px;
		}
		.competitionDetail-body {
			margin-bottom: 100px;
			.el-pagination {
				text-align: center;
				margin: 40px auto;
			}
			.el-tabs {
				margin: 20px 0;
				.el-tabs__nav {
					margin-left: 20px;
				}
				.el-tabs__item {
					font-size: 16px;
					color: #4e4e4e;
				}
				.el-tabs__nav-wrap::after {
					background-color: transparent;
				}
				.el-tabs__active-bar {
					background-color: #e30129;
				}
			}
			.detail-body {
				margin-top: 20px;
				padding-top: 30px;
				padding-bottom: 200px;
				background: #fff;
				border: 1px solid #dde1e6;
				.detail-item {
					padding: 25px 50px;
					color: #7d858d;
					line-height: 24px;
					font-size: 12px;
					border-bottom: 1px solid #dde1e6;
					&:last-child {
						border-bottom: none;
					}
					h2 {
						font-size: 12px;
						margin-bottom: 20px;
					}
					.el-button--primary {
						font-size: 12px;
						background-color: #6ea5ff;
					}
				}
			}
			.sort {
				margin-top: 20px;
				padding-top: 30px;
				padding-bottom: 200px;
				background: #fff;
				border: 1px solid #dde1e6;
				.sort-head {
					text-align: right;
					margin-top: 0px;
					margin-bottom: 20px;
					margin-right: 50px;
				}
				.el-table {
					text-align: center;
				}
				.has-gutter {
					tr, th {
						color: #5c5c5c;
						background: #f7f9fb;
						font-weight: normal;
						text-align: center;
					}
				}
			}
			.notice {
				text-align: center;
				.notice-body {
					margin-top: 20px;
					padding-bottom: 200px;
					background: #fff;
					border: 1px solid #dde1e6;
				}
				.el-table td, .el-table th {
					color: #969595;
					padding: 25px 0;
					font-weight: normal;
					text-align: center;
					font-size: 12px;
				}
				.el-table th {
					font-size: 16px;
				}
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
		}
		.signUp {
	      .el-form {
	        width: 490px;
	        margin: 20px auto;
	        margin-bottom: 60px;
	        img {
	          width: 92px;
	          height: 32px;
	          position: absolute;
	          top: 4px;
	          right: 5px;
	        }
	        .el-button--primary {
	          width: 100%;
	          margin-top: 20px;
	        }
	        .el-form-item {
	          margin-bottom: 25px;
	        }
	      }
	    }
	    .competition-msg-dialog {
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
