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
					    		<div v-html="tabs.tabs.detail.data.desc"></div>
					    	</div>
					    	<div class="detail-item">
					    		<h2>赛程安排</h2>
					    		<div v-html="tabs.tabs.detail.data.arrange"></div>
					    	</div>
					    	<div class="detail-item">
					    		<h2>比赛规则</h2>
					    		<div v-html="tabs.tabs.detail.data.rule"></div>
					    	</div>
					    	<div class="detail-item">
					    		<h2>主办方</h2>
					    		<div v-html="tabs.tabs.detail.data.host"></div>
					    	</div>
					    	<div class="detail-item">
					    		<h2>当前状态</h2>
					    		<div v-html="tabs.tabs.detail.data.status"></div>
					    	</div>
					    	<div class="detail-item">
					    		<h2>注意事项</h2>
					    		<div v-html="tabs.tabs.detail.data.care"></div>
					    	</div>
					    	<div class="detail-item">
					    		<el-button type="primary">立即报名</el-button>
					    	</div>
					    </div>
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
				tabs: {
					activeTab: 'detail',
					tabs: {
						detail: {
							name: '赛事详情',
							data: {
								id: 0,
								desc: '实盘大赛：<br/>钱坤杯·凤凰实盘炒股大赛是由凤凰网财经频道主办、钱坤投资赞助、东方证券提供交易服务的A股投资比赛。参赛选手需是凤凰网注册用户，且在东方证券开立证券账户方可完成报名。大赛旨在挖掘民间“草',
								arrange: '实盘大赛：<br/>钱坤杯·凤凰实盘炒股大赛是由凤凰网财经频道主办、钱坤投资赞助、东方证券提供交易服务的A股投资比赛。参赛选手需是凤凰网注册用户，且在东方证券开立证券账户方可完成报名。大赛旨在挖掘民间“草参赛选手需是凤凰网注册用户，且在东方证券开立证券账户方可完成报名。大赛旨在挖掘民间“草',
								rule: '起始资金： 200,000.00元 <br/>起始资金： 200,000.00元',
								host: '四川省教育厅',
								status: '比赛中',
								care: '只能四川省高校学生才能参加，前十名会有奖励'
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

		},
		created() {
			if(this.$route.params.type) {
				this.tabs.activeTab = this.$route.params.type;
			}

			if(this.$route.params.id == undefined) return;

			var that = this;
			that.$utils.getJson(that.$utils.CONFIG.api.competitionDetail, function(res) {
              	if(res.succflag == 0) {
                	
              	}else {
                	that.$utils.showTip('error', '', '', '', res.message);
              	}
            }, function() {}, {raceid: that.$route.params.id}, true, {token: that.$utils.CONFIG.token})
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
	}
</style>
