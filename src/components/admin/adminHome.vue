<template>
	<div class="ahome">
		<div class="ql-wrapper">
			<div class="ahome-top">
				<div class="ahome-left">
					<ve-line
						:data="chartData"
					    :grid="grid"
					    :visual-map="visualMap">
					</ve-line>
				</div>
				<div class="ahome-right">
					<h1>账户信息</h1>
					<div class="info-body">
						<p><strong>资金账号</strong>39999</p>
						<p><strong>账号类型</strong>期权</p>
						<p><strong>当前排名</strong>145</p>
						<p><strong>加入时间</strong>2018-4-23</p>
						<p>
						  <el-button type="primary">赛事详情</el-button>
						  <el-button type="danger">去交易</el-button>
						</p>
					</div>
				</div>
			</div>
			<div class="ahome-body">
				<div class="ahome-left">
					<el-tabs v-model="activeName" @tab-click="handleClick" class="ahome-tabs">
					    <el-tab-pane label="我的资产" name="assets">
					    	<div class="tab-head">
					    		<el-form :inline="true" :model="formInline" class="demo-form-inline">
								  <el-form-item class="tabs-checkbox">
								    <el-checkbox label="成交历史" name="type"></el-checkbox>
								    <el-checkbox label="历史委托" name="type"></el-checkbox>
								  </el-form-item>
								  <el-form-item label="时间">
								    <el-date-picker
								      v-model="daterange"
								      type="daterange"
								      align="center"
								      unlink-panels
								      range-separator="至"
								      start-placeholder="起始时间"
								      end-placeholder="终止时间"
								      :picker-options="dateRangeOptions">
								    </el-date-picker>
								  </el-form-item>
								  <el-form-item>
								    <el-button type="primary" @click="onSubmit">查询</el-button>
								  </el-form-item>
								</el-form>
					    	</div>
					    	<div class="tab-body">
					    		<el-table
							    :data="tableData"
							    style="width: 100%"
							    :default-sort = "{prop: 'date', order: 'descending'}"
							    >
								    <el-table-column
								      prop="code"
								      label="股票代码"
								      sortable
								      width="180">
								    </el-table-column>
								    <el-table-column
								      prop="name"
								      label="股票名称"
								      sortable
								      width="180">
								    </el-table-column>
								    <el-table-column
								      prop="increase"
								      label="幅度%">
								    </el-table-column>
								    <el-table-column
								      prop="newest"
								      label="最新">
								    </el-table-column>
								    <el-table-column
								      prop="riseAndFall"
								      label="涨跌">
								    </el-table-column>
								    <el-table-column
								      prop="total"
								      label="总量">
								    </el-table-column>
								    <el-table-column
								      prop="turnoverRate"
								      label="换手率%">
								    </el-table-column>
								    <el-table-column
								      prop="marketValue"
								      label="流通市值">
								    </el-table-column>
							  	</el-table>
							  	<el-pagination
								  background
								  layout="prev, pager, next"
								  :total="1000">
								</el-pagination>
					    	</div>
					    </el-tab-pane>
					    <el-tab-pane label="我的持仓" name="holdPos">我的持仓</el-tab-pane>
					    <el-tab-pane label="我的交易记录" name="history">我的交易记录</el-tab-pane>
					    <el-tab-pane label="赛事排名" name="sort">赛事排名</el-tab-pane>
					</el-tabs>
				</div>
				<div class="ahome-right">
					<h1>教师点评</h1>
					<ul class="comment">
						<li v-for="(item, index) in comment">
							<div class="comment-head">
								<span :style="'background-image: url(' + item.faceUrl + ')'"></span>
								<strong>{{item.name}}</strong>
								{{item.date}}
							</div>
							<div class="comment-body">
								<span>{{item.content}}</span>
							</div>
							<div class="comment-foot">
								<router-link :to="'/amdin/reply/' + item.id">回复</router-link>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import 'echarts/lib/component/visualMap'
	export default {
    data () {
      this.visualMap = [
        {
          type: 'piecewise',
          splitNumber: 3,
          min: -0.4,
          max: 0.4,
          right: 0,
          top: 50
        }
      ]
      this.grid = {
        right: 60
      }
      return {
        chartData: {
          columns: ['日期', '我的收益', '沪深300', '沪深500'],
          rows: [
            { '日期': '1月1日', '我的收益': 0.1, '沪深300': 0.05, '沪深500': -0.05},
            { '日期': '1月2日', '我的收益': 0.2, '沪深300': 0.25, '沪深500': 0.2},
            { '日期': '1月3日', '我的收益': 0.3888, '沪深300': -0.1, '沪深500': -0.3},
            { '日期': '1月4日', '我的收益': -0.15, '沪深300': -0.32, '沪深500': -0.2},
            { '日期': '1月5日', '我的收益': -0.01, '沪深300': 0.3, '沪深500': -0.05},
            { '日期': '1月6日', '我的收益': -0.4, '沪深300': -0.55, '沪深500': -0.5}
          ]
        },
        activeName: 'assets',
        formInline: {
          user: '',
          region: ''
        },
        dateRangeOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        daterange: '',
        tableData: [
	        {
	          code: '000658',
	          name: '王小虎',
	          increase: -0.64,
	          newest: 44.38,
	          riseAndFall: 1.38,
	          total: 44.38,
	          turnoverRate: 75064,
	          marketValue: 0.35
	        },
	        {
	          code: '000621',
	          name: '王小虎',
	          increase: -0.64,
	          newest: 44.38,
	          riseAndFall: 1.38,
	          total: 44.38,
	          turnoverRate: 75064,
	          marketValue: 0.35
	        },
	        {
	          code: '000654',
	          name: '王小虎',
	          increase: -0.64,
	          newest: 44.38,
	          riseAndFall: 1.38,
	          total: 44.38,
	          turnoverRate: 75064,
	          marketValue: 0.35
	        },
	        {
	          code: '000654',
	          name: '王小虎',
	          increase: -0.64,
	          newest: 44.38,
	          riseAndFall: 1.38,
	          total: 44.38,
	          turnoverRate: 75064,
	          marketValue: 0.35
	        },
	        {
	          code: '000654',
	          name: '王小虎',
	          increase: -0.64,
	          newest: 44.38,
	          riseAndFall: 1.38,
	          total: 44.38,
	          turnoverRate: 75064,
	          marketValue: 0.35
	        },
        ],
        comment: [
        	{
        		id: '1',
        		faceUrl: 'https://img.mukewang.com/user/5afe3d350001596a02430243-100-100.jpg',
        		name: '张老师',
        		date: '2018-07-02',
        		content: '王同学的选股能力还是很不错的，加油!'
        	},
        	{
        		id: '2',
        		faceUrl: 'https://img.mukewang.com/user/5afe3d350001596a02430243-100-100.jpg',
        		name: '张老师',
        		date: '2018-07-02',
        		content: '王同学的选股能力还是很不错的，加油王同学的选股能力还是很不错的，加油王同学的选股能力还是很不错的，加油王同学的选股能力还是很不错的，加油王同学的选股能力还是很不错的，加油!'
        	},
        	{
        		id: '3',
        		faceUrl: 'https://img.mukewang.com/user/5afe3d350001596a02430243-100-100.jpg',
        		name: '张老师',
        		date: '2018-07-02',
        		content: '王同学的选股能力还是很不错的，加油!'
        	},
        	{
        		id: '',
        		faceUrl: 'https://img.mukewang.com/user/5afe3d350001596a02430243-100-100.jpg',
        		name: '张老师',
        		date: '2018-07-02',
        		content: '王同学的选股能力还是很不错的，加油!'
        	},
        	{
        		id: '4',
        		faceUrl: 'https://img.mukewang.com/user/5afe3d350001596a02430243-100-100.jpg',
        		name: '张老师',
        		date: '2018-07-02',
        		content: '王同学的选股能力还是很不错的，加油!'
        	},
        	{
        		id: '5',
        		faceUrl: 'https://img.mukewang.com/user/5afe3d350001596a02430243-100-100.jpg',
        		name: '张老师',
        		date: '2018-07-02',
        		content: '王同学的选股能力还是很不错的，加油!'
        	},
        ]
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style lang="scss">
	.ahome {
		.ahome-top {
			height: 374px;
			.ahome-right {
				.info-body {
					padding: 25px;
					p {
						line-height: 40px;
						font-size: 14px;
						color: #ff486f;
						strong {
							margin-right: 30px;
							color: #7d858d;
						}
						.el-button {
							width: 90px;
							margin-top: 35px;
							&.el-button--primary {
								background: #5091fa;
								margin-right: 20px;
							}
							&.el-button--danger {
								background: #e30129;
							}
						}
					}
				}
			}
		}
		.ahome-left {
			width: 1070px;
			height: 100%;
			background: #fff;
			float: left;
			border: 1px solid #dde1e6;
			margin-bottom: 10px;
		}
		.ahome-right {
			width: 320px;
			height: 100%;
			padding: 25px;
			background: #fff;
			float: right;
			border: 1px solid #dde1e6;
			margin-bottom: 10px;
			h1 {
				font-size: 16px;
				color: #7d858d;
			}
		}
		.ahome-body {
			.ahome-tabs {
				.el-tabs__nav-wrap::after {
					background-color: transparent;
				}
				.el-tabs__header {
					margin-top: 10px;
					margin-left: 40px;
				}
				.tab-head {
					text-align: center;
					form {
						display: inline-block;
					}
					.tabs-checkbox {
						margin-right: 40px;
						.el-checkbox+.el-checkbox {
							margin-left: 10px;
						}
					}
					.el-date-editor .el-range-separator {
						width: 7%;
					}
				}
				.el-pagination {
					text-align: center;
					margin: 40px auto;
				}
				.has-gutter {
					tr, th {
						background: #f7f9fb;
					}
				}
			}
			.comment {
				color: #666;
				font-size: 12px;
				line-height: 40px;
				margin-top: 36px;
				.comment-head {
					color: #a6abb0;
					span {
						display: inline-block;
						width: 19px;
						height: 19px;
						margin-right: 10px;
						border-radius: 100%;
						background-size: cover;
						position: relative;
						top: 3px;
					}
					strong {
						margin-right: 10px;
						color: #666;
					}
				}
				.comment-body {
					span {
						display: block;
						padding-left: 20px;
						padding-right: 20px;
						border: 1px solid #b6d1fd;
						border-radius: 20px;
						line-height: 28px;
						color: #7d7f82;
						position: relative;
						&:after {
							content: '';
							display: block;
							width: 14px;
							height: 10px;
					        position: absolute;
					        left: -3px;
					        bottom: 0;
					        background: url(../../assets/images/border-bg.png) #fff;
						}
					}
				}
				.comment-foot {
					text-align: right;
					a {
						color: #5091fa;
						margin-right: 20px;
					}
				}
			}
		}
	}
</style>
