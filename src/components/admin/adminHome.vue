<template>
	<div class="ahome">
		<ql-head :nav="nav"></ql-head>
		<div class="ql-wrapper">
			<div class="ahome-top">
				<div class="ahome-left">
					<el-select v-model="accountRaceId" placeholder="请选择" size="small" @change="changeMainAccount">
					    <el-option
					      v-for="(item, index) in accountList"
					      :key="index"
					      :label="item.name"
					      :value="item.raceid">
					    </el-option>
					</el-select>
					<div class="chart-wrapper">
						<ve-line
							height="300px"
							:title="chartOpts.title"
							:yAxis="chartOpts.yAxis"
							:legend="chartOpts.legend"
							:data="chartOpts.data"
						    :colors="chartOpts.colors"
						    :data-zoom="chartOpts.dataZoom"
						    :tooltip="chartOpts.tooltip"
						    :settings="chartOpts.chartSettings"
						    >
						</ve-line>
					</div>
				</div>
				<div class="ahome-right">
					<h1>账户信息</h1>
					<div class="info-body">
						<p><strong>资金账号</strong>{{account.name}}</p>
						<p><strong>账号类型</strong>{{account.usage == 0 ? '常规账户' : '竞赛账户'}}</p>
						<p><strong>加入时间</strong>2018-4-23</p>
						<div class="handle">
						  	<span class="link" @click="jumpToDetail(account.raceid)">赛事详情</span>
						  	<span v-for="item in account.accts" @click="trade(item)">{{item.type == 1 ? '股票市场' : '期权市场'}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="ahome-body">
				<div class="ahome-left">
					<el-tabs v-model="activeTab" @tab-click="handleClick" class="ahome-tabs">
					    <el-tab-pane label="我的资产" name="assets" class="assets">
					    	<el-table
						      :data="table"
						      :span-method="objectSpanMethod"
						      :show-header="false"
						      border
						      style="width: 100%; margin-top: 20px" v-for="(table, index) in tabs.assets.data" :key="index">
						      <el-table-column
						        prop="text"
						        label=""
						        class-name="assets-title"
						        width="180">
						      </el-table-column>
						      <el-table-column
						        prop="profit"
						        label="当日盈利率">
						      </el-table-column>
						      <el-table-column
						        prop="loss"
						        label="当日盈亏">
						      </el-table-column>
						      <el-table-column
						        prop="assets"
						        label="昨日资产">
						      </el-table-column>
						      <el-table-column
						        prop="increase"
						        label="当日上证涨幅">
						      </el-table-column>
						    </el-table>
					    </el-tab-pane>
					    <el-tab-pane label="我的持仓" name="holdPos">
					    	<div class="tab-head holdPos-changeAccount">
					    		<div class="tab-head-text">持仓分布</div>
					    		<el-form :inline="true">
									<el-form-item class="tabs-checkbox" label="市场类型">
										<el-select v-model="tabs.holdPos.accountAcct" placeholder="请选择" @change="changeHoldAccount">
											<el-option
											v-for="(item, index) in account.accts"
											:key="index"
											:label="item.type == 1 ? '股票市场' : '期权市场'"
											:value="item.acct">
											</el-option>
										</el-select>
									</el-form-item>
								</el-form>
					    	</div>
					    	<div class="tab-chart">
					    		<ve-ring :data="tabs.holdPos.chart.chartData"  ref="veRing" :legend="tabs.holdPos.chart.options.legend" ></ve-ring>
					    	</div>
					    	<div class="holdPos-bar">
					    		持仓明细
					    		<router-link to="/home"><el-button type="danger">去交易</el-button></router-link>
					    	</div>
					    	<div class="tab-body">
					    		<el-table
							    :data="tabs.holdPos.tableData"
							    style="width: 100%"
							    :default-sort = "{prop: 'date', order: 'descending'}"
							    >
								    <el-table-column
								      prop="code"
								      label="股票代码"
								      sortable>
								    </el-table-column>
								    <el-table-column
								      prop="name"
								      label="股票名称"
								      sortable>
								    </el-table-column>
								    <el-table-column
								      prop="holdPos"
								      sortable
								      label="持仓量">
								    </el-table-column>
								    <el-table-column
								      prop="date"
								      sortable
								      label="建仓时间">
								    </el-table-column>
								    <el-table-column
								      prop="cost"
								      sortable
								      label="盈亏成本">
								    </el-table-column>
								    <el-table-column
								      prop="price"
								      sortable
								      label="现价">
								    </el-table-column>
								    <el-table-column
								      prop="increase"
								      sortable
								      label="今日涨幅">
								    </el-table-column>
								    <el-table-column
								      prop="marketValue"
								      sortable
								      label="股票市值">
								    </el-table-column>
								    <el-table-column
								      prop="profitAndLoss"
								      sortable
								      label="盈亏率">
								    </el-table-column>
								    <el-table-column
								      prop="float"
								      sortable
								      label="浮动盈亏">
								    </el-table-column>
							  	</el-table>
							  	<el-pagination
								  background
								  layout="prev, pager, next"
								  :total="1000">
								</el-pagination>
					    	</div>
					    </el-tab-pane>
					    <el-tab-pane label="我的交易记录" name="history">
					    	<div class="tab-head">
					    		<el-form :inline="true" :model="tabs.history.formInline" class="demo-form-inline">
								  <el-form-item class="tabs-checkbox">
								    <el-checkbox label="成交历史" name="type"></el-checkbox>
								    <el-checkbox label="历史委托" name="type"></el-checkbox>
								  </el-form-item>
								  <el-form-item label="时间">
								    <el-date-picker
								      v-model="tabs.history.daterange"
								      type="daterange"
								      align="center"
								      unlink-panels
								      range-separator="至"
								      start-placeholder="起始时间"
								      end-placeholder="终止时间"
								      :picker-options="tabs.history.dateRangeOptions">
								    </el-date-picker>
								  </el-form-item>
								  <el-form-item>
								    <el-button type="primary" @click="onSubmit">查询</el-button>
								  </el-form-item>
								</el-form>
					    	</div>
					    	<div class="tab-body">
					    		<el-table
							    :data="tabs.history.tableData"
							    style="width: 100%"
							    :default-sort = "{prop: 'date', order: 'descending'}"
							    >
							    	<el-table-column
								      prop="date"
								      sortable
								      label="成交时间">
								    </el-table-column>
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
								      prop="handle"
								      sortable
								      label="操作">
								    </el-table-column>
								    <el-table-column
								      prop="nums"
								      sortable
								      label="成交数量">
								    </el-table-column>
								    <el-table-column
								      prop="price"
								      sortable
								      label="成交价">
								    </el-table-column>
								    <el-table-column
								      prop="total"
								      sortable
								      label="成交金额">
								    </el-table-column>
								    <el-table-column
								      prop="status"
								      sortable
								      label="交易状态">
								    </el-table-column>
							  	</el-table>
							  	<el-pagination
								  background
								  layout="prev, pager, next"
								  :total="1000">
								</el-pagination>
					    	</div>
					    </el-tab-pane>
					    <el-tab-pane label="赛事排名" name="sort" class="sort">
					    	<div class="sort-head">
							    <el-select v-model="tabs.sort.selectVal" placeholder="请选择">
								    <el-option
								      v-for="item in tabs.sort.selectOpts"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								</el-select>
					    	</div>
					    	<div class="tab-body">
					    		<el-table
							    :data="tabs.sort.tableData"
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
					</el-tabs>
				</div>
				<div class="ahome-right">
					<h1>教师点评</h1>
					<ul class="comment">
						<li v-for="(item, index) in comment">
							<div class="comment-head">
								<span :style="'background-image: url(' + item.faceUrl + ')'" v-if="item.faceUrl"></span>
								<span :style="'background-image: url(' + defaultFaceUrl + ')'" v-else></span>
								<strong>{{item.observerName}}</strong>
								{{item.publishTime | date}}
							</div>
							<div class="comment-body">
								<span>{{item.comment | strLen(36)}}</span>
							</div>
							<div class="comment-foot">
								<router-link :to="'/admin/reply/' + item.id">回复</router-link>
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
	import 'echarts/lib/component/dataZoom'
	import 'echarts/lib/component/title'
	import 'echarts/lib/component/tooltip'
	import CONFIG from '../../js/config'
	import qlHead from '../common/head.vue'
	//我的评论
	var getComment = function(that) {
		var commentPostData = {
    		page: {
				start: "1",
				size: "5"
			},
			nexusid: that.account.raceid
    	}
    	that.$utils.getJson(that.$utils.CONFIG.api.comment, function(res) {
          	if(res.succflag == 0) {
            	that.comment = res.list;
          	}else {
            	that.$utils.showTip('error', '', '', res.message);
          	}
        }, function() {}, commentPostData, true, {token: that.$utils.CONFIG.token})
	}

	//走势图
	var getLine = function(that) {
		that.postLineData.raceid = that.account.raceid;
		if(that.postLineData.columns.length) {
			//走势图
        	that.$utils.getJson(that.$utils.CONFIG.api.profit, function(res) {
	          	if(res.succflag == 0) {
	            	that.chartOpts.data = res.data;
	          	}else {
	            	that.$utils.showTip('error', '', '', res.message);
	          	}
	        }, function() {}, that.postLineData, true, {token: that.$utils.CONFIG.token})
		}else {
			//指数列表
			that.$utils.getJson(that.$utils.CONFIG.api.lineList, function(res) {
	          	if(res.succflag == 0) {
	            	that.lineList = res.data;
	            	that.chartOpts.chartSettings.labelMap = {};
	            	that.lineList.forEach(function(item, index) {
	            		that.postLineData.columns.push(item.code);
	            		that.chartOpts.chartSettings.labelMap[item.code] = item.name;
	            	})
	            	//走势图
	            	that.$utils.getJson(that.$utils.CONFIG.api.profit, function(res) {
			          	if(res.succflag == 0) {
			            	that.chartOpts.data = res.data;
			            	that.chartOpts.title.text = that.chartOpts.data.title;
			          	}else {
			            	that.$utils.showTip('error', '', '', res.message);
			          	}
			        }, function() {}, that.postLineData, true, {token: that.$utils.CONFIG.token})
	          	}else {
	            	that.$utils.showTip('error', '', '', res.message);
	          	}
	        }, function() {}, {}, true, {token: that.$utils.CONFIG.token})
		}
	}

	//我的持仓
	var getHold = function(that) {
		//饼状图
		var postHoldData = {
			raceid: that.account.raceid,
			acct: that.tabs.holdPos.account.acct,
			type: that.tabs.holdPos.account.type
		}
		//饼状图
    	that.$utils.getJson(that.$utils.CONFIG.api.hold, function(res) {
          	if(res.succflag == 0) {
            	that.tabs.holdPos.chart.chartData = res.data;
          	}else {
            	that.$utils.showTip('error', '', '', res.message);
          	}
        }, function() {}, postHoldData, true, {token: that.$utils.CONFIG.token})
	}
	export default {
	components: {
		qlHead
	},
    data () {
      return {
      	nav: [
			{
				id: '0',
				text: '投资竞赛',
				iconClass: 'menu-icon1',
				handle: 'jumpToUrl',
				handleData: '/competition',
				isExternalLink: false
			},
            {
              id: '1',
              text: '期权行情',
              iconClass: 'menu-icon2',
              handle: 'startExe',
			  handleData: 'option',
			  isExternalLink: false
            },
            {
              id: '2',
              text: '股票行情',
              iconClass: 'menu-icon3',
              handle: 'startExe',
			  handleData: 'shares',
			  isExternalLink: false
            },
            {
              id: '3',
              text: '策略选股',
              iconClass: 'menu-icon4',
              handle: 'jumpToUrl',
			  handleData: '/stockselection',
			  isExternalLink: false
            },
            {
              id: '4',
              text: '云课堂',
              iconClass: 'menu-icon5',
              handle: 'dropdown',
			  handleData: [
			  	{
			  		text: '财经直播',
			  		handleData: '/live',
			  		isExternalLink: false
			  	},
			  	{
			  		text: '知识库',
			  		handleData: '',
			  		isExternalLink: false
			  	}
			  ],
			  isExternalLink: false
            },
            {
              id: '5',
              text: '教学课程',
              iconClass: 'menu-icon6',
              handle: 'jumpToUrl',
			  handleData: '/curriculum',
			  isExternalLink: false
            }
		],
		accountRaceId: '',
      	account: {},
      	defaultFaceUrl: CONFIG.defaultFaceUrl,
      	accountList: [],
      	postLineData: {		//走势图请求参数
			raceid: "0",
		 	columns: [],
		 	startdate: "2018-07-01",
		 	enddate: "2018-08-01"
		},
        chartOpts: {
    		title: {
			  	text: '--',
			  	left: 40,
			  	textStyle: {
			  		color: '#7d858d',
			  		fontWeight: 'normal',
			  		fontSize: '16'
			  	}
		    },
		    yAxis : [{ 
	            axisLabel: {
	                formatter: function(value) {
	                	return value*100 + '%';
	                }
	            }
	        }],
		    legend: {
		    	right: 50
		    },
		    colors: ['#ff486f', '#5091fa', '#f0b310'],
		    dataZoom: [
		        {
		          type: 'slider',
		          start: 0,
		          end: 50
		        }
		    ],
		    tooltip: {
		    	formatter: function(params) {
		    		console.log(params);
                	return params.name + '<br/>' + params.marker + params.seriesName + ': ' + (params.data[1]*100).toFixed(2) + '%' ;
                }
		    },
		    chartSettings: {
			    labelMap: {}
		    },
		    data: {}
    	},
    	activeTab: 'holdPos',
    	tabs: {
    		assets: {
    			data: {
    				day: [
	    				{
	    				  text: '当日账户',
				          profit: '当日盈利率',
				          loss: '当日盈亏',
				          assets: '昨日资产',
				          increase: '当日上证涨幅'
				        },
				        {
				          profit: '-1.10%',
				          loss: '-2.22%',
				          assets: '10000',
				          increase: '10%'
				        }
			        ],
			        week: [
	    				{
	    				  text: '当日账户',
				          profit: '当日盈利率',
				          loss: '当日盈亏',
				          assets: '昨日资产',
				          increase: '当日上证涨幅'
				        },
				        {
				          profit: '-1.10%',
				          loss: '-2.22%',
				          assets: '10000',
				          increase: '10%'
				        }
			        ],
			        month: [
	    				{
	    				  text: '当日账户',
				          profit: '当日盈利率',
				          loss: '当日盈亏',
				          assets: '昨日资产',
				          increase: '当日上证涨幅'
				        },
				        {
				          profit: '-1.10%',
				          loss: '-2.22%',
				          assets: '10000',
				          increase: '10%'
				        }
			        ],
			        assets: [
	    				{
	    				  text: '当日账户',
				          profit: '当日盈利率',
				          loss: '当日盈亏',
				          assets: '昨日资产',
				          increase: '当日上证涨幅'
				        },
				        {
				          profit: '-1.10%',
				          loss: '-2.22%',
				          assets: '10000',
				          increase: '10%'
				        }
			        ]
    			}
    		},
    		holdPos: {
    			account: {},
    			accountAcct: '',
    			chart: {
    				options: {
    					legend: {
							orient: 'vertical',
							right: 200,
							top: '35%',
							textStyle: {
								color: '#666'
							}
						}
    				},
    				chartData: {}
    			},
		        tableData: [
			        {
			          code: '000651',
			          name: '格力空调',
			          holdPos: 500,
			          date: '2018-04-23',
			          cost: 49.66,
			          price: 44.38,
			          marketValue: 23010.00,
			          increase: '1.61%',
			          profitAndLoss: '-7.33%',
			          float: '-1819.81'
			        },
			        {
			          code: '000651',
			          name: '格力空调',
			          holdPos: 500,
			          date: '2018-04-23',
			          cost: 49.66,
			          price: 44.38,
			          marketValue: 23010.00,
			          increase: '1.61%',
			          profitAndLoss: '-7.33%',
			          float: '-1819.81'
			        },
			        {
			          code: '000651',
			          name: '格力空调',
			          holdPos: 500,
			          date: '2018-04-23',
			          cost: 49.66,
			          price: 44.38,
			          marketValue: 23010.00,
			          increase: '1.61%',
			          profitAndLoss: '-7.33%',
			          float: '-1819.81'
			        },
			        {
			          code: '000651',
			          name: '格力空调',
			          holdPos: 500,
			          date: '2018-04-23',
			          cost: 49.66,
			          price: 44.38,
			          marketValue: 23010.00,
			          increase: '1.61%',
			          profitAndLoss: '-7.33%',
			          float: '-1819.81'
			        },
			        {
			          code: '000651',
			          name: '格力空调',
			          holdPos: 500,
			          date: '2018-04-23',
			          cost: 49.66,
			          price: 44.38,
			          marketValue: 23010.00,
			          increase: '1.61%',
			          profitAndLoss: '-7.33%',
			          float: '-1819.81'
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
    		history: {
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
			          date: '2018-07-03',
			          code: '000658',
			          name: '蓝海华腾',
			          handle: '卖出',
			          nums: 10900,
			          price: 17.08,
			          total: 186172.33,
			          status: '已成交'
			        },
			        {
			          date: '2018-07-03',
			          code: '000658',
			          name: '蓝海华腾',
			          handle: '卖出',
			          nums: 10900,
			          price: 17.08,
			          total: 186172.33,
			          status: '已成交'
			        },
			        {
			          date: '2018-07-03',
			          code: '000658',
			          name: '蓝海华腾',
			          handle: '卖出',
			          nums: 10900,
			          price: 17.08,
			          total: 186172.33,
			          status: '已成交'
			        },
			        {
			          date: '2018-07-03',
			          code: '000658',
			          name: '蓝海华腾',
			          handle: '卖出',
			          nums: 10900,
			          price: 17.08,
			          total: 186172.33,
			          status: '已成交'
			        },
			        {
			          date: '2018-07-03',
			          code: '000658',
			          name: '蓝海华腾',
			          handle: '卖出',
			          nums: 10900,
			          price: 17.08,
			          total: 186172.33,
			          status: '已成交'
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
    		sort: {
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
						id: 1,
						observerid: "1",
						observername: "1",
						publishtime: "2018-08-10 12:32:21",
						nexusid: "111111",
						comment: "今晚打老虎",
						extranum: 10
					}
		        ]
    		}
    	},
        comment: []
      }
    },
    methods: {
    	trade(item) {
    		var json = {
                method: 'startexe',
                data: {
                  	type:'quotes',
                  	exeName: item.type == 1 ? 'shares' : 'option',
                  	account: item.acct
                }
            }
	        this.$utils.handleExe(json, function(){}, function(){})
    	},
    	jumpToDetail(raceid) {
    		this.$router.push({ path: '/competition/detail/detail/', query: {usagecode: raceid}});
    	},
    	changeMainAccount(val) {	//切换账号
    		var that = this;
    		//设置账号
    		for(var i = 0; i < that.accountList.length; i++) {
	    		if(val == that.accountList[i].raceid) {
	    			that.account = that.accountList[i];
	    			break;
	    		}
	    	}
	    	that.accountRaceId = that.account.raceid;
	    	that.tabs.holdPos.account = that.account.accts[0];
	    	that.tabs.holdPos.accountAcct = that.tabs.holdPos.account.acct;
    		//走势图
	 		getLine(that);
	 		//我的持仓
	 		getHold(that);
	 		//我的评论
 			getComment(that);
    	},
    	changeHoldAccount(val) {	//我的持仓切换账号
    		var that = this;
    		for(var i = 0; i < that.account.accts.length; i++) {
	    		if(val == that.account.accts[i].acct) {
	    			this.tabs.holdPos.account = that.account.accts[i];
	    			break;
	    		}
	    	}
	 		//我的持仓
	 		getHold(that);
    	},
    	objectSpanMethod({ row, column, rowIndex, columnIndex }) {
	        if (columnIndex === 0) {
	          if (rowIndex % 2 === 0) {
	            return {
	              rowspan: 2,
	              colspan: 1
	            };
	          } else {
	            return {
	              rowspan: 0,
	              colspan: 0
	            };
	          }
	        }
	    },
		handleClick(tab, event) {
			console.log(tab, event);
		},
		onSubmit() {
			console.log('submit!');
		},
		refresh() {
			console.log('refresh')
		}
    },
	watch: {
      activeTab (v) {
        this.$nextTick(_ => {
          this.$refs['veRing'].echarts.resize()
        })
      }
    },
    filters:{
      date(time){
          let oldDate = new Date(time)
          let newDate = new Date()
          var dayNum = "";
          var getTime = (newDate.getTime() - oldDate.getTime())/1000;

          let year   = oldDate.getFullYear();
          let month  = oldDate.getMonth()+1;
          let day    = oldDate.getDate();
          let hour   = oldDate.getHours(); 
          let minute = oldDate.getMinutes(); 
          let second = oldDate.getSeconds(); 
          return dayNum+" "+year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
      }
  	},
    created() {
    	var that = this;
    	var raceid = that.$route.query.raceid;
    	//设置账号
    	that.accountList = that.$utils.CONFIG.account;
    	if(typeof raceid == 'undefined') {
    		that.account = that.accountList[0];
    	}else {
	    	for(var i = 0; i < that.accountList.length; i++) {
	    		if(raceid == that.accountList[i].raceid) {
	    			that.account = that.accountList[i];
	    			break;
	    		}
	    	}
    	}
    	that.accountRaceId = that.account.raceid;
    	that.tabs.holdPos.account = that.account.accts[0];
    	that.tabs.holdPos.accountAcct = that.tabs.holdPos.account.acct;

 		//走势图
 		getLine(that);
 		//我的持仓
 		getHold(that);
    	//我的评论
 		getComment(that);
    }
  }
</script>
<style lang="scss">
	.ahome {
		.header {
			min-width: 1400px;
		}
		.ql-wrapper {
			width: 1400px;
		}
		.ahome-top {
			height: 374px;
			margin-top: 20px;
			.ahome-left {
				padding: 15px 5px;
				.el-select {
					margin-top: 5px;
					margin-bottom: 20px;
					margin-left: 30px;
				}
			}
			.ahome-right {
				position: relative;
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
					.handle {
						position: absolute;
						left: 0;
						right: 0;
						bottom: 0;
						display: flex;
						height: 80px;
						line-height: 80px;
						text-align: center;
						span {
							flex: 1;
							color: #ff486f;
							border-top: 1px solid #dde1e6;
							border-right: 1px solid #dde1e6;
							cursor: pointer;
							&:last-child {
								border-right: none;
							}
							&.link {
								color: #5091fa;
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
			color: #7d858d;
			.ahome-tabs {
				.el-tabs__nav-wrap::after {
					background-color: transparent;
				}
				.el-tabs__header {
					margin-top: 20px;
					margin-left: 40px;
				}
				.el-tabs__active-bar {
					background-color: #e30129;
				}
				.el-tabs__item.is-active {
					color: #7d858d;
				}
				.el-tabs__item {
					font-weight: bold;
					color: #7d858d;
				}
				.tab-head {
					margin-top: 10px;
					margin-bottom: 10px;
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
					.el-form-item__label, .el-checkbox {
						color: #7d858d;
					}
					.el-date-editor .el-range-separator {
						width: 7%;
					}
					.el-button--primary {
						margin-left: 20px;
						padding-top: 10px;
						padding-bottom: 10px;
						background: #5091fa;
					}
					.el-range-separator {
						color: #7d858d;
					}
					.tab-head-text {
						float: left;
						padding-left: 35px;
					}
					&.holdPos-changeAccount {
						padding-left: 35px;
						margin-top: 20px;
						.el-form {
							float: right;
						}
					}
				}
				.el-table {
					text-align: center;
					color: #5c5c5c;
				}
				.el-pagination {
					text-align: center;
					margin: 40px auto;
				}
				.has-gutter {
					tr, th {
						color: #5c5c5c;
						background: #f7f9fb;
						font-weight: normal;
						text-align: center;
					}
				}
				.assets {
					padding: 20px 20px 100px 20px;
					td {
						background: #f8f8f8;
					}
					.assets-title {
						background: #ff486f;
						color: #fff;
						font-size: 18px;
						font-weight: bold;
					}
				}
				.holdPos-bar {
					padding: 20px;
					line-height: 40px;
					overflow: hidden;
					a {
						float: right;
					}
					.el-button--danger {
						background-color: #e30129;
    					border-color: #e30129;
					}
				}
				.sort-head {
					text-align: right;
					margin-top: 0px;
					margin-bottom: 20px;
					margin-right: 50px;
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
						padding: 10px 20px;
						border: 1px solid #b6d1fd;
						border-radius: 20px;
						line-height: 20px;
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
