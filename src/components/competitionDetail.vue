<template>
	<div class="competitionDetail">
		<swiper :options="swiperOption" ref="mySwiper">
		    <swiper-slide v-for="(item, index) in ads" :key="index">
		    	<img :src="item.url" class="img-responsive">
		    </swiper-slide>
		</swiper>
		<div class="ql-wrapper">
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
					    			<p>交易品种：{{tabs.tabs.detail.data.racestarttime}}~{{tabs.tabs.detail.data.tradekind}}</p>
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
					    	<div class="detail-item" v-if="saveRace.stustatus == 0">
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
				    <el-tab-pane :label="tabs.tabs.sort.name" name="sort" class="sort">
				    	<div class="sort-head">
						    <el-select v-model="tabs.tabs.sort.selectVal" placeholder="请选择">
							    <el-option
							      v-for="item in tabs.tabs.sort.selectOpts"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
				    	</div>
				    	<div class="tab-body">
				    		<el-table
						    :data="tabs.tabs.sort.tableData"
						    style="width: 100%"
						    :default-sort = "{prop: 'date', order: 'descending'}"
						    >
							    <el-table-column
							      prop="sort"
							      label="排名"
							    >
							    </el-table-column>
							    <el-table-column
							      prop="name"
							      label="用户名"
							  >
							    </el-table-column>
							    <el-table-column
							      prop="dayRate"
							      label="日涨跌幅">
							    </el-table-column>
							    <el-table-column
							      prop="weekRate"
							      label="周收益率">
							    </el-table-column>
							    <el-table-column
							      prop="monthRate"
							      label="月收益率">
							    </el-table-column>
							    <el-table-column
							      prop="totalRate"
							      label="总收益率">
							    </el-table-column>
							    <el-table-column
							      prop="total"
							      label="总收益">
							    </el-table-column>
							    <el-table-column
							      prop="marketValue"
							      label="单位净值">
							    </el-table-column>
							    <el-table-column
							      prop="marketValue"
							      label="操作次数">
							    </el-table-column>
							    <el-table-column
							      prop="marketValue"
							      label="持仓市值">
							    </el-table-column>
						  	</el-table>
						  	<el-pagination
							  background
							  layout="prev, pager, next"
							  :total="1000">
							</el-pagination>
				    	</div>
				    </el-tab-pane>
				    <el-tab-pane :label="tabs.tabs.notice.name" name="notice" class="notice">
				    	<div class="notice-body">
				    		<el-table
						    :data="tabs.tabs.notice.dataList"
						    style="width: 100%"
						    >
							    <el-table-column
							      prop="name"
							      label="公告名称">
							    </el-table-column>
							    <el-table-column
							      prop="type"
							      label="分类">
							    </el-table-column>
							    <el-table-column
							      prop="date"
							      label="发布时间">
							    </el-table-column>
						  	</el-table>
						  	<el-pagination
							  background
							  layout="prev, pager, next"
							  :total="1000">
							</el-pagination>
				    	</div>
				    </el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				swiperOption: {
			        centeredSlides: true,
			        loop: true,
			        autoplay: {
			            delay: 5000
			        }
		        },
				ads: [
					{
						id: 0,
						name: '',
						url: require('../assets/images/ad1.png'),
						link: ''
					},
					{
						id: 1,
						name: '',
						url: require('../assets/images/ad1.png'),
						link: ''
					},
					{
						id: 2,
						name: '',
						url: require('../assets/images/ad1.png'),
						link: ''
					}
				],
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
								raceid: 0,
								racedesc: '“四川省模拟炒股”第三届全国大学生金融挑战赛火热开赛悬赏百万，等你来战！',
								entrystarttime: '2018年06月30日',
								entryendtime: '2018年07月30日',
								racestarttime: '2018年06月30日',
								raceendtime: '2018年06月30日',
								initfund: '200,000.00',
								tradekind: '沪深A股市场的股票',
								hostunit: '四川省教育厅',
								status: -1,
								attention: '只能四川省高校学生才能参加，前十名会有奖励',
								entrynum: 1000
							}
						},
						sort: {
							name: '赛事排名',
			    			selectVal: [],
					        selectOpts: [
						      	{
						          value: '0',
						          label: '日涨跌幅'
						        },
						        {
						          value: '1',
						          label: '周收益率'
						        },
						        {
						          value: '2',
						          label: '月收益率'
						        },
						        {
						          value: '3',
						          label: '总收益率'
						        },
						        {
						          value: '4',
						          label: '总收益'
						        },
						        {
						          value: '5',
						          label: '单位净值'
						        },
						        {
						          value: '6',
						          label: '操作次数'
						        },
						        {
						          value: '7',
						          label: '持仓市值'
						        }
					        ],
					        tableData: [
						        {
						          sort: '1',
						          name: '豌豆荚',
						          dayRate: '+0.64%',
						          weekRate: '+0.64%',
						          monthRate: '0.00%',
						          totalRate: '-44.38%',
						          total: 25648.33,
						          marketValue: 32568799.33
						        },
						        {
						          sort: '2',
						          name: '豌豆荚',
						          dayRate: '+0.64%',
						          weekRate: '+0.64%',
						          monthRate: '0.00%',
						          totalRate: '-44.38%',
						          total: 25648.33,
						          marketValue: 32568799.33
						        },
						        {
						          sort: '3',
						          name: '豌豆荚',
						          dayRate: '+0.64%',
						          weekRate: '+0.64%',
						          monthRate: '0.00%',
						          totalRate: '-44.38%',
						          total: 25648.33,
						          marketValue: 32568799.33
						        },
						        {
						          sort: '4',
						          name: '豌豆荚',
						          dayRate: '+0.64%',
						          weekRate: '+0.64%',
						          monthRate: '0.00%',
						          totalRate: '-44.38%',
						          total: 25648.33,
						          marketValue: 32568799.33
						        },
						        {
						          sort: '5',
						          name: '豌豆荚',
						          dayRate: '+0.64%',
						          weekRate: '+0.64%',
						          monthRate: '0.00%',
						          totalRate: '-44.38%',
						          total: 25648.33,
						          marketValue: 32568799.33
						        }
					        ],
					        comment: [
					        	{
					        		id: '1',
					        		faceUrl: '',
					        		name: '张老师',
					        		date: '2018-07-02',
					        		content: '王同学的选股能力还是很不错的，加油!'
					        	},
					        	{
					        		id: '2',
					        		faceUrl: '',
					        		name: '张老师',
					        		date: '2018-07-02',
					        		content: '王同学的选股能力还是很不错的，加油王同学的选股能力还是很不错的，加油王同学的选股能力还是很不错的，加油王同学的选股能力还是很不错的，加油王同学的选股能力还是很不错的，加油!'
					        	},
					        	{
					        		id: '3',
					        		faceUrl: '',
					        		name: '张老师',
					        		date: '2018-07-02',
					        		content: '王同学的选股能力还是很不错的，加油!'
					        	},
					        	{
					        		id: '',
					        		faceUrl: '',
					        		name: '张老师',
					        		date: '2018-07-02',
					        		content: '王同学的选股能力还是很不错的，加油!'
					        	},
					        	{
					        		id: '4',
					        		faceUrl: '',
					        		name: '张老师',
					        		date: '2018-07-02',
					        		content: '王同学的选股能力还是很不错的，加油!'
					        	},
					        	{
					        		id: '5',
					        		faceUrl: '',
					        		name: '张老师',
					        		date: '2018-07-02',
					        		content: '王同学的选股能力还是很不错的，加油!'
					        	}
					        ]
			    		},
			    		notice: {
							name: '赛事公告',
					        dataList: [
						        {
						          id: 1,
						          name: '四川省模拟炒股大赛火热报名中',
						          type: '赛事信息',
						          date: '2018-06-07'
						        },
						        {
						          id: 1,
						          name: '四川省模拟炒股大赛火热报名中',
						          type: '赛事信息',
						          date: '2018-06-07'
						        },
						        {
						          id: 1,
						          name: '四川省模拟炒股大赛火热报名中',
						          type: '赛事信息',
						          date: '2018-06-07'
						        },
						        {
						          id: 1,
						          name: '四川省模拟炒股大赛火热报名中',
						          type: '赛事信息',
						          date: '2018-06-07'
						        },
						        {
						          id: 1,
						          name: '四川省模拟炒股大赛火热报名中',
						          type: '赛事信息',
						          date: '2018-06-07'
						        }
					        ]
			    		}
					}
				}
			}
		},
		methods: {
			refreshCode() {
				var that = this;
				that.$utils.getJson(that.$utils.CONFIG.api.code, function(res){
					if(res.succflag == 0) {
						that.signUp.codeUrl = res.data.image;
					}else {
						that.$utils.showTip('error', 'error', '-1022');
					}
					that.isCodeLoading = false;
				}, function() {
					that.isCodeLoading = false;
				}, {objectid: '', type: "3"}, false)
			},
			openDialog(item) {
				var that = this;
				that.signUp.dialogFormVisible = true;
				that.$utils.getJson(that.$utils.CONFIG.api.code, function(res){
					if(res.succflag == 0) {
						that.signUp.codeUrl = res.data.image;
					}else {
						that.$utils.showTip('error', 'error', '-1022');
					}
					that.isCodeLoading = false;
				}, function() {
					that.isCodeLoading = false;
				}, {objectid: '', type: "3"}, false)
			},
			submitForm(formName) {
	            var that = this;
	            that.$refs[formName].validate((valid) => {
	              if (valid) {
	                var signUpData = {
						raceid: that.saveRace.usagecode,
						vcode: that.signUp.signUpForm.code
	                }
	                that.$utils.getJson(that.$utils.CONFIG.api.signUp, function(res) {
	                  if(res.succflag == 0) {
	                  	that.saveRace.stustatus = 1;
	                  	that.signUp.dialogFormVisible = false;
	                  }else {
	                    that.$utils.showTip('error', '', '', '', res.message);
	                  }
	                }, function() {}, signUpData, false, {token: that.$utils.CONFIG.token})
	              } else {
	                return false;
	              }
	            });
	        },
		},
		created() {
			var that = this;
			if(that.$route.params.type) {
				that.tabs.activeTab = that.$route.params.type;
			}

			if(that.$route.query.usagecode == undefined) return;

			that.saveRace = that.$route.query;
			that.$utils.getJson(that.$utils.CONFIG.api.competitionDetail, function(res) {
              	if(res.succflag == 0) {
                	
              	}else {
                	that.$utils.showTip('error', '', '', '', res.message);
              	}
            }, function() {}, {raceid: that.saveRace.usagecode}, true, {token: that.$utils.CONFIG.token})
		}
	}
</script>
<style lang="scss">
	.competitionDetail {
		padding-top: 0;
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
	}
</style>
