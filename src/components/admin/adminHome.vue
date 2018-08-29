<template>
	<div class="ahome">
		<ql-head :nav="nav"></ql-head>
		<div class="ql-wrapper">
			<div v-if="hadRace">
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
							    :tooltip="chartOpts.tooltip"
							    :settings="chartOpts.chartSettings"
							    >
							</ve-line>
							<div class="changeLine">
								<el-radio v-model="lineType" label="one" @change="changeLine">近一个月</el-radio>
  								<el-radio v-model="lineType" label="two"  @change="changeLine">近两个月</el-radio>
  								<el-radio v-model="lineType" label="three"  @change="changeLine">近三个月</el-radio>
							</div>
						</div>
					</div>
					<div class="ahome-right">
						<h1>账户信息</h1>
						<div class="info-body">
							<p><strong>资金账号</strong>{{account.name | strLen(8)}}</p>
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
						    	<!-- 当日账户 -->
						    	<table class="assetsTable" cellspacing="0">
						    		<tr>
						    			<td rowspan="2" class="assets-title" width="180">当日账户</td>
						    			<td>当日盈利率</td>
						    			<td>当日盈亏</td>
						    			<td>当日资产</td>
						    		</tr>
						    		<tr>
						    			<td>{{(tabs.assets.data.toDay.rate*100).toFixed(2) + '%'}}</td>
						    			<td>{{tabs.assets.data.toDay.profit}}</td>
						    			<td>{{tabs.assets.data.toDay.asset}}</td>
						    		</tr>
						    	</table>
						    	<!-- 本周账户 -->
						    	<table class="assetsTable" cellspacing="0">
						    		<tr>
						    			<td rowspan="2" class="assets-title" width="180">本周账户</td>
						    			<td>本周盈利率</td>
						    			<td>本周盈亏</td>
						    			<td>本周排名</td>
						    			<td>交易次数</td>
						    		</tr>
						    		<tr>
						    			<td>{{(tabs.assets.data.week.rate*100).toFixed(2) + '%'}}</td>
						    			<td>{{tabs.assets.data.week.profit}}</td>
						    			<td>{{tabs.assets.data.week.index}}</td>
						    			<td>{{tabs.assets.data.week.tradetimes}}</td>
						    		</tr>
						    	</table>
						    	<!-- 本月账户 -->
						    	<table class="assetsTable" cellspacing="0">
						    		<tr>
						    			<td rowspan="2" class="assets-title" width="180">本月账户</td>
						    			<td>本月盈利率</td>
						    			<td>本月盈亏</td>
						    			<td>本月排名</td>
						    			<td>交易次数</td>
						    		</tr>
						    		<tr>
						    			<td>{{(tabs.assets.data.month.rate*100).toFixed(2) + '%'}}</td>
						    			<td>{{tabs.assets.data.month.profit}}</td>
						    			<td>{{tabs.assets.data.month.index}}</td>
						    			<td>{{tabs.assets.data.month.tradetimes}}</td>
						    		</tr>
						    	</table>
						    	<!-- 资产状况 -->
						    	<table class="assetsTable" cellspacing="0">
						    		<tr>
						    			<td rowspan="2" class="assets-title" width="180">资产状况</td>
						    			<td>总盈利率</td>
						    			<td>总盈亏</td>
						    			<td>起始资产</td>
						    		</tr>
						    		<tr>
						    			<td>{{(tabs.assets.data.history.rate*100).toFixed(2) + '%'}}</td>
						    			<td>{{tabs.assets.data.history.profit}}</td>
						    			<td>{{tabs.assets.data.history.startasset}}</td>
						    		</tr>
						    	</table>
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
						    		<ve-ring :data="tabs.holdPos.chart.chartData"  ref="veRing" :legend="tabs.holdPos.chart.options.legend" v-show="tabs.holdPos.chart.chartData.rows && tabs.holdPos.chart.chartData.rows.length"></ve-ring>
						    		<div class="emptyRing" v-show="!(tabs.holdPos.chart.chartData.rows && tabs.holdPos.chart.chartData.rows.length)">
						    			<img :src="tabs.holdPos.defaultRingImage">
						    		</div>
						    	</div>
						    	<div class="holdPos-bar">
						    		持仓明细
						    		<a><el-button type="danger" @click="trade(tabs.holdPos.account)">去交易</el-button></a>
						    	</div>
						    	<div class="tab-body">
						    		<el-table
								    :data="tabs.holdPos.tableData"
								    style="width: 100%">
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
									      prop="holdtype"
									      label="持仓类别"
									      sortable
									      v-if="tabs.holdPos.tableData[0] && tabs.holdPos.tableData[0].holdtype">
									    </el-table-column>
									    <el-table-column
									      prop="type"
									      label="合约类型"
									      sortable
									      v-if="tabs.holdPos.tableData[0] && tabs.holdPos.tableData[0].type">
									    </el-table-column>
									    <el-table-column
									      prop="hold"
									      sortable
									      label="持仓量">
									    </el-table-column>
									    <el-table-column
									      prop="cost"
									      sortable
									      label="成本价">
									    </el-table-column>
									    <el-table-column
									      prop="marketvalue"
									      sortable
									      label="证券市值">
									    </el-table-column>
									    <el-table-column
									      prop="now"
									      sortable
									      label="现价">
									    </el-table-column>
									    <el-table-column
									      prop="costbalance"
									      sortable
									      label="持仓成本">
									    </el-table-column>
									    <el-table-column
									      prop="incomebalance"
									      sortable
									      label="盈亏金额">
									    </el-table-column>
									    <el-table-column
									      sortable
									      label="盈亏比率"
									      v-if="tabs.holdPos.tableData[0] && tabs.holdPos.tableData[0].incomerate">
									      	<template slot-scope="props">
									      		{{ props.row.incomerate }}%
									      	</template>
									    </el-table-column>
									    <el-table-column
									      prop="exerciseincome"
									      label="行权盈亏"
									      sortable
									      v-if="tabs.holdPos.tableData[0] && tabs.holdPos.tableData[0].exerciseincome">
									    </el-table-column>
									    <el-table-column
									      prop="dutyusedbail"
									      label="保证金占用"
									      sortable
									      v-if="tabs.holdPos.tableData[0] && tabs.holdPos.tableData[0].dutyusedbail">
									    </el-table-column>
								  	</el-table>
								  	<el-pagination
									background
									layout="prev, pager, next"
									:total="tabs.holdPos.page.responsetotal"
									:page-size="tabs.holdPos.page.size"
									:current-page.sync="tabs.holdPos.currentPage"
									@current-change="changePage">
									</el-pagination>
						    	</div>
						    </el-tab-pane>
						    <el-tab-pane label="我的交易记录" name="history">
						    	<div class="tab-head">
						    		<el-form :inline="true" :model="tabs.history.form" class="demo-form-inline">
						    			<el-form-item label="市场类型">
							    			<el-select v-model="tabs.history.accountAcct" placeholder="请选择" @change="changeHistoryAccount" >
												<el-option
												v-for="(item, index) in account.accts"
												:key="index"
												:label="item.type == 1 ? '股票市场' : '期权市场'"
												:value="item.acct">
												</el-option>
											</el-select>
										</el-form-item>
									  <el-form-item class="tabs-checkbox history-radio">
									  	<el-radio v-model="tabs.history.form.tableType" label="0">历史成交</el-radio>
	  									<el-radio v-model="tabs.history.form.tableType" label="1">历史委托</el-radio>
									  </el-form-item>
									  <el-form-item label="时间">
									    <el-date-picker
									      v-model="tabs.history.form.daterange"
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
									    <el-button type="primary" @click="searchHistory">查询</el-button>
									  </el-form-item>
									</el-form>
						    	</div>
						    	<div class="tab-body">
						    		<el-table
								    :data="tabs.history.tableData"
								    style="width: 100%"
								    >
								    	<el-table-column
									      prop="time"
									      sortable
									      label="成交时间"
									      width="200">
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
									      prop="bsflag"
									      sortable
									      label="操作">
									    </el-table-column>
									    <el-table-column
									      prop="num"
									      sortable
									      label="成交数量">
									    </el-table-column>
									    <el-table-column
									      prop="price"
									      sortable
									      label="成交价">
									    </el-table-column>
									    <el-table-column
									      prop="amount"
									      sortable
									      label="成交金额" v-if="tabs.history.tableData[0] && tabs.history.tableData[0].amount">
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
									:total="tabs.history.page.responsetotal"
									:page-size="tabs.history.page.size"
									:current-page.sync="tabs.history.currentPage"
									@current-change="changePage">
									</el-pagination>
						    	</div>
						    </el-tab-pane>
						    <el-tab-pane label="赛事排名" name="sort" class="sort" v-if="!isMainAccount">
						    	<div class="sort-head">
						    		<el-form :inline="true">
						    		<el-form-item label="市场类型">
						    			<el-select v-model="tabs.sort.accountAcct" placeholder="请选择" @change="changeSortAccount" >
											<el-option
											v-for="(item, index) in account.accts"
											:key="index"
											:label="item.type == 1 ? '股票市场' : '期权市场'"
											:value="item.acct">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="指标排名">
									    <el-select v-model="tabs.sort.selectVal" placeholder="请选择" @change="changeSort">
										    <el-option
										      v-for="item in tabs.sort.selectOpts"
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
								    :data="tabs.sort.tableData"
								    style="width: 100%">
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
						    	</div>
						    </el-tab-pane>
						</el-tabs>
					</div>
					<div class="ahome-right" v-if="comment && comment.length">
						<h1>教师点评</h1>
						<ul class="comment">
							<li v-for="(item, index) in comment">
								<div class="comment-head">
									<span :style="'background-image: url(' + item.faceUrl + ')'" v-if="item.faceUrl"></span>
									<span :style="'background-image: url(' + defaultFaceUrl + ')'" v-else></span>
									<strong>{{item.observername}}</strong>
									{{item.publishtime}}
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
			<div v-else class="noRace">
				<h1>没有相关的赛事或课程</h1>
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
	//重置页码起始
	var reset = function(that) {
		that.tabs.assets.data = that.tabs.assets.defaultData;

		that.tabs.holdPos.page.start = 0;
		that.tabs.holdPos.currentPage = 0;
		that.tabs.holdPos.chart.chartData = [];
		that.tabs.holdPos.tableData = that.tabs.holdPos.defaultTableData;

		that.tabs.history.page.start = 0;
		that.tabs.history.currentPage = 0;
		that.tabs.history.tableData = [];

		that.tabs.sort.page.start = 0;
		that.tabs.sort.currentPage = 0;
		that.tabs.sort.tableData = [];
	}
	// 格式化走势图时间范围
	var formateLineDate = function(type) {	// one two three
		var date = new Date();
		var year   = date.getFullYear();
		var month  = date.getMonth()+1 < 10 ? 0  + '' + (date.getMonth()+1) : date.getMonth()+1;
		var day    = date.getDate() < 10 ? 0  + '' + date.getDate() : date.getDate();

		var enddate = year+""+month+""+day;
		var startdate = '';
		switch (type) {
			case 'one': //近一个月
				month = month - 1;
				break;
			case 'two': //近两个月
				month = month - 2;
				break;
			case 'three': 
				month = month - 3;
				break;
		}

		if(month <= 0) {
			month = 12 + month;
			year = year - 1;
		}
		month = month < 10 ? 0  + '' + (month) : month;
		startdate = year+""+month+""+day;

		return {
			startdate: startdate,
			enddate: enddate
		};
	}
	//设置走势图时间范围列表选项
	var setRangeList = function(that) {
		that.rangeList.one = formateLineDate('one');
		that.rangeList.two = formateLineDate('two');
		that.rangeList.three = formateLineDate('three');
	}
	//我的评论
	var getComment = function(that) {
		var commentPostData = {
    		page: {
				start: "0",
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
		switch (that.lineType) {
			case 'one': //近一个月
				that.postLineData.startdate = that.rangeList.one.startdate;
				that.postLineData.enddate = that.rangeList.one.enddate;
				break;
			case 'two': //近两个月
				that.postLineData.startdate = that.rangeList.two.startdate;
				that.postLineData.enddate = that.rangeList.two.enddate;
				break;
			case 'three': 
				that.postLineData.startdate = that.rangeList.three.startdate;
				that.postLineData.enddate = that.rangeList.three.enddate;
				break;
		}
		that.postLineData.raceid = that.account.raceid;
		if(that.postLineData.columns.length) {
			//走势图
        	that.$utils.getJson(that.$utils.CONFIG.api.profit, function(res) {
	          	if(res.succflag == 0) {
	            	that.chartOpts.data = res.data;
	            	that.chartOpts.title.text = res.data.title;
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
	//行情
	var getHq = function(that) {
		that.$utils.getJson(that.$utils.CONFIG.api.holdHqList, function(res) {
          	if(res.succflag == 0) {
            	//上海行情
            	var shHqPostData = {
				 	serviceid: "snapshot",
					body: {
					  	marketid: "0",
					  	stockcode: []
				 	}
				}
				//深圳行情
				var szHqPostData = {
				 	serviceid: "snapshot",
					 	body: {
					  	marketid: "1",
					  	stockcode: []
				 	}
				}
				res.data.forEach( function(e, i) {
					if(e.marketid == 0) {
						shHqPostData.body.stockcode.push(e.code);
					}
					if(e.marketid == 1) {
						szHqPostData.body.stockcode.push(e.code);
					}
				});

            	//根据列表数据查询行情
            	if(shHqPostData.body.stockcode.length) {
                	that.$utils.getJson(that.$utils.CONFIG.api.hq, function(res) {
		             	if(res.status == 0) {
		                	res.data.forEach( function(e, i) {
		                		e.range = ((e.now-e.open)/e.open).toFixed(2);
		                		e.riseAndFall = (e.now-e.open).toFixed(2);
		                		e.marketcode = 0
		                	});
		                	that.diyTable = that.diyTable.concat(res.data);
		              	}else {
		              		that.$utils.showTip('error', '', '', res.message);
		              	}
		            }, function() {}, shHqPostData, true)
            	}
            	if(szHqPostData.body.stockcode.length) {
                	that.$utils.getJson(that.$utils.CONFIG.api.hq, function(res) {
		             	if(res.status == 0) {
		                	res.data.forEach( function(e, i) {
		                		e.range = ((e.now-e.open)/e.open).toFixed(2);
		                		e.riseAndFall = (e.now-e.open).toFixed(2);
		                		e.marketcode = 1;
		                	});
		                	that.diyTable = that.diyTable.concat(res.data);
		              	}else {
		              		that.$utils.showTip('error', '', '', res.message);
		              	}
		            }, function() {}, szHqPostData, true)
            	}

          	}else {
            	that.$utils.showTip('error', '', '', res.message);
          	}
        }, function() {}, that.searchVal.diy, true, {token: that.$utils.CONFIG.token})
	}
	//我的资产
	var getAssets = function(that) {
		var postData = {
			raceid: that.account.raceid
		}
		that.$utils.getJson(that.$utils.CONFIG.api.mySummary, function(res) {
          	if(res.succflag == 0) {
          		if(res.today) {
            		that.tabs.assets.data.toDay = res.today;
          		}
          		if(res.week) {
          			that.tabs.assets.data.week = res.week;
          		}
            	if(res.month) {
            		that.tabs.assets.data.month = res.month;
            	}
            	if(res.history) {
            		that.tabs.assets.data.history = res.history;
            	}
          	}else {
            	that.$utils.showTip('error', '', '', res.message);
          	}
        }, function() {}, postData, true, {token: that.$utils.CONFIG.token})
	}
	//我的持仓
	var getHold = function(that) {
		//饼状图
		var postData = {
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
        }, function() {}, postData, true, {token: that.$utils.CONFIG.token})

        //行情数据
        getHoldPos(that);
	}
	//我的持仓行情
	var getHoldPos = function(that) {
		var postData = {
			acct: that.tabs.holdPos.account.acct,
			type: that.tabs.holdPos.account.type,
			page: {
				start: that.tabs.holdPos.page.start,
				size: that.$utils.CONFIG.pageSize
			}
		}
		//获取持仓行情列表
		that.$utils.getJson(that.$utils.CONFIG.api.myHold, function(res) {
          	if(res.succflag == 0) {
          		that.tabs.holdPos.tableData = res.data.list;
            	that.tabs.holdPos.page = res.data.page;
          	}else {
            	that.$utils.showTip('error', '', '', res.message);
          	}
        }, function() {}, postData, true, {token: that.$utils.CONFIG.token})
	}
	//格式化时间
	var formate = function(dataStr) {
		if(!dataStr) return '';
		var date = new Date(dataStr);
		var year   = date.getFullYear();
		var month  = date.getMonth()+1 < 10 ? 0  + '' + (date.getMonth()+1) : date.getMonth()+1;
		var day    = date.getDate() < 10 ? 0  + '' + date.getDate() : date.getDate();
		return year+""+month+""+day;
	}
	//我的交易记录
	var getHistory = function(that) {
		var postData = {
			acct: that.tabs.history.account.acct,
			type: that.tabs.history.account.type,
			starttime: that.tabs.history.form.daterange ? formate(that.tabs.history.form.daterange[0]) : '',
			endtime: that.tabs.history.form.daterange ? formate(that.tabs.history.form.daterange[1]) : '',
			page: {
				start: that.tabs.history.page.start,
				size: that.$utils.CONFIG.pageSize
			}
		}
		var api = that.tabs.history.form.tableType == 1 ? that.$utils.CONFIG.api.myApply : that.$utils.CONFIG.api.myTrade;
		that.$utils.getJson(api, function(res) {
          	if(res.succflag == 0) {
            	that.tabs.history.tableData = res.data.list;
            	that.tabs.history.page = res.page;
          	}else {
            	that.$utils.showTip('error', '', '', res.message);
          	}
        }, function() {}, postData, true, {token: that.$utils.CONFIG.token})
	}
	//排名
	var getSort = function(that) {
		var postData = {
			raceid: that.account.raceid,
			mkttype: that.tabs.sort.account.type,
			orderby: {
				field: that.tabs.sort.selectVal,
				sort: 'DESC'
			}
		}
		that.$utils.getJson(that.$utils.CONFIG.api.competitionSort, function(res) {
          	if(res.succflag == 0) {
            	that.tabs.sort.tableData = res.data;
          	}else {
            	that.$utils.showTip('error', '', '', res.message);
          	}
        }, function() {}, postData, true, {token: that.$utils.CONFIG.token})
	}
	//刷新数据
	var refreshData = function(that) {
		//走势图
 		getLine(that);
 		//我的评论
 		getComment(that);

 		if(that.isMainAccount && that.activeTab == 'sort') {
 			that.activeTab = 'holdPos';
 		}
 		switch(that.activeTab) {
 			case 'assets': 	//我的资产
 				getAssets(that);
 				break;
 			case 'holdPos': //我的持仓
 				getHold(that);
 				break;
 			case 'history': //我的交易记录
 				if(!that.isMainAccount) getHistory(that);
 				break;
 			case 'sort': //赛事排名
 				getSort(that);
 				break;
 		}
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
			  		handleData: '/base',
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
		hadRace: false,
		isMainAccount: false,
		accountRaceId: '',
      	account: {},
      	defaultFaceUrl: CONFIG.defaultFaceUrl,
      	accountList: [],
      	rangeList: {
      		one: {
      			startdate: "",
		 		enddate: ""
      		},
      		two: {
      			startdate: "",
		 		enddate: ""
      		},
      		three: {
      			startdate: "",
		 		enddate: ""
      		},
      	},
      	lineType: 'one',
      	postLineData: {		//走势图请求参数
			raceid: "0",
		 	columns: [],
		 	startdate: "",
		 	enddate: ""
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
	                	return parseInt(value*100) + '%';
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
    			defaultData: {
    				toDay:{
						rate: '--',
						profit: '--',
						asset: '--'
			        },
			        week: {
						rate: '--',
						profit: '--',
						index: '--',
						tradetimes: '--'
		        	}
			        ,
			        month:{
						rate: '--',
						profit: '--',
						index: '--',
						tradetimes: '--'
		        	},
			        history: {
						rate: '--',
						profit: '--',
						startasset: '--'
			    	}
    			},
    			data: {}
    		},
    		holdPos: {
    			account: {},
    			accountAcct: '',
    			defaultRingImage: require('../../assets/images/ring.png'),
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
		        defaultTableData: [
			        {
			          code: '--',
			          name: '--',
			          hold: '--',
			          cost: '--',
			          marketvalue: '--',
			          now: '--',
			          costbalance: '--',
			          incomebalance: '--',
			          incomerate: '--',
			          holdtype: '--',
			          type: '--',
			          exerciseincome: '--',
			          dutyusedbail: '--'
			        }
		        ],
    			tableData: [],
    			currentPage: 0,
		        page: {
					start: 0,
					size: this.$utils.CONFIG.pageSize,
					responsetotal: 100,
					responsenum: 0
				}
    		},
    		history: {
    			account: {},
    			accountAcct: {},
		        form: {
		          tableType: '0',
		          daterange: ''
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
		        tableData: [],
		        currentPage: 0,
		        page: {
					start: 0,
					size: this.$utils.CONFIG.pageSize,
					responsetotal: 50,
					responsenum: 0
				}
    		},
    		sort: {
    			account: {},
    			accountAcct: {},
		        selectOpts: [
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
		        ],
		        tableData: [],
		        currentPage: 0,
		        page: {
					start: 0,
					size: this.$utils.CONFIG.pageSize,
					responsetotal: 0,
					responsenum: 0
				}
    		}
    	},
        comment: []
      }
    },
    methods: {
    	changeLine() {
    		getLine(this);
    	},
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
    		this.$router.push({ path: '/competition/detail/detail', query: {data: JSON.stringify({usagecode: raceid})}});
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
			var that = this;
	 		switch(that.activeTab) {
	 			case 'assets': 	//我的资产
	 				if(!that.tabs.assets.data.toDay.rate || that.tabs.assets.data.toDay.rate == '--' ) {
	 					getAssets(that);
	 				}
	 				break;
	 			case 'holdPos': //我的持仓
	 				if(!that.tabs.holdPos.tableData[0] || that.tabs.holdPos.tableData[0].code == '--') {
	 					getHold(that);
	 				}
	 				break;
	 			case 'history': //我的交易记录
	 				if(!that.tabs.history.tableData[0]) {
	 					getHistory(that);
	 				}
	 				break;
	 			case 'sort': //赛事排名
	 				if(!that.tabs.sort.tableData[0]) {
	 					getSort(that);
	 				}
	 				break;
	 		}
		},
		changePage(currentPage) {	//翻页
			var that = this;
			switch(that.activeTab) {
	 			case 'holdPos': //我的持仓
	 				that.tabs.holdPos.page.start = (currentPage - 1) * that.$utils.CONFIG.pageSize;
	 				getHoldPos(that);
	 				break;
	 			case 'history': //我的交易记录
	 				that.tabs.history.page.start = (currentPage - 1) * that.$utils.CONFIG.pageSize;
	 				getHistory(that);
	 				break;
	 			case 'sort': //赛事排名
	 				that.tabs.sort.page.start = (currentPage - 1) * that.$utils.CONFIG.pageSize;
	 				getSort(that);
	 				break;
	 		}
    	},
    	searchHistory() {
    		var that = this;
    		that.tabs.history.page.start = 0;
    		that.tabs.history.currentPage = 0;
    		getHistory(that);
    	},
    	changeSort() {
    		getSort(this);
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
    		that.tabs.holdPos.account = that.tabs.history.account =  that.tabs.sort.account = that.account.accts[0];
    		that.tabs.holdPos.accountAcct = that.tabs.history.accountAcct = that.tabs.sort.accountAcct = that.tabs.holdPos.account.acct;
    		that.isMainAccount = that.account.usage == 0 ? true : false;
    		reset(that);
    		refreshData(that);
    	},
    	changeHoldAccount(val) {	//我的持仓切换账号
    		var that = this;
    		for(var i = 0; i < that.account.accts.length; i++) {
	    		if(val == that.account.accts[i].acct) {
	    			this.tabs.holdPos.account = that.account.accts[i];
	    			break;
	    		}
	    	}
	    	that.tabs.holdPos.page.start = 0;
	    	that.tabs.holdPos.currentPage = 0;
	    	that.tabs.holdPos.chart.chartData = [];
	 		//我的持仓
	 		getHold(that);
    	},
    	changeHistoryAccount(val) {	//历史交易切换账号
    		var that = this;
    		for(var i = 0; i < that.account.accts.length; i++) {
	    		if(val == that.account.accts[i].acct) {
	    			this.tabs.history.account = that.account.accts[i];
	    			break;
	    		}
	    	}
	    	that.tabs.holdPos.page.start = 0;
	    	that.tabs.holdPos.currentPage = 0;
	 		//我的持仓
	 		getHistory(that);
    	},
    	changeSortAccount(val) {	//排序切换账号
    		var that = this;
    		for(var i = 0; i < that.account.accts.length; i++) {
	    		if(val == that.account.accts[i].acct) {
	    			this.tabs.sort.account = that.account.accts[i];
	    			break;
	    		}
	    	}

	    	that.tabs.sort.page.start = 0;
	    	that.tabs.sort.currentPage = 0;
	 		//赛事排名
	 		getSort(that);
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
    	//设置走势图时间列表
    	setRangeList(that);
    	//获取账号
    	that.$utils.getJson(that.$utils.CONFIG.api.acctList, function(res) {
          	if(res.succflag == 0) {
		    	//设置账号
		    	that.$utils.CONFIG.account = res.data.account;
		    	that.accountList = that.$utils.CONFIG.account;
		    	that.hadRace = false;
		    	if(typeof raceid == 'undefined') {
		    		that.account = that.accountList[0];
		    		that.hadRace = true;
		    	}else {
			    	for(var i = 0; i < that.accountList.length; i++) {
			    		if(raceid == that.accountList[i].raceid) {
			    			that.account = that.accountList[i];
			    			that.hadRace = true;
			    			break;
			    		}
			    	}
			    	if(!that.hadRace) {
			    		that.account = that.accountList[0];
			    	}
		    	}
		    	that.accountRaceId = that.account.raceid;
		    	that.tabs.holdPos.account = that.tabs.history.account =  that.tabs.sort.account = that.account.accts[0];
		    	that.tabs.holdPos.accountAcct = that.tabs.history.accountAcct = that.tabs.sort.accountAcct = that.tabs.holdPos.account.acct;
		    	that.tabs.sort.selectVal = that.tabs.sort.selectOpts[0].value;
		    	that.isMainAccount = that.account.usage == 0 ? true : false;

		    	reset(that);
		    	refreshData(that);
          	}else {
            	that.$utils.showTip('error', '', '', res.message);
          	}
        }, function() {}, {}, true, {token: that.$utils.CONFIG.token})
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
			.chart-wrapper {
				position: relative;
				.changeLine {
					position: absolute;
					left: 0;
					right: 15px;
					bottom: 10px;
					text-align: right;
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
					margin-top: 20px;
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
						height: 40px;
						line-height: 40px;
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
				.emptyRing {
					text-align: center;
					margin: 40px auto;
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
		.noRace {
			padding: 100px 20px;
			height: 400px;
			margin-top: 20px;
			text-align: center;
			background: #fff;
			h1 {
				font-size: 20px;
				font-weight: normal;
				color: #999;
			}
		}
		.assetsTable {
			width: 100%;
			line-height: 48px;
			margin-bottom: 40px;
			text-align: center;
			td {
				border-top: 1px solid #ebeef5;
				border-right: 1px solid #ebeef5;
			}
			tr:last-child td {
				border-bottom: 1px solid #ebeef5;
			}
		}
		.history-radio {
			margin-left: 10px;
			margin-right: 20px !important;
			.el-radio+.el-radio {
				margin-left: 10px;
			}
		}
	}
</style>
