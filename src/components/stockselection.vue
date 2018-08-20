<template>
	<div class="stockselection">
		<div class="ql-wrapper ql-wrapper-common">
			<h1>策略选股</h1>
			<div class="stockselection-body">
				<div class="stockselection-bar">
					<el-select placeholder="请选择账号" v-model="searchVal.account" class="account" @change="changeCondition('account')">
				      <el-option :label="item.text" :value="item.value" v-for="(item, index) in dropdown.accountList" :key="index"></el-option>
				    </el-select>
				    <el-dropdown class="diy" :class="activeTab == 'diy' ? 'active' : ''">
					  <span class="el-dropdown-link">
					    {{searchVal.diy.poolname}}<i class="el-icon-arrow-down el-icon--right"></i>
					  </span>
					  <el-dropdown-menu slot="dropdown">
					    <el-dropdown-item v-for="(item, index) in dropdown.diyList" :key="index">
					    	<div @click="changeCondition('diy', item)">{{item.poolname}}</div>
					    </el-dropdown-item>
					  </el-dropdown-menu>
					</el-dropdown>
					<el-dropdown class="pool" :class="activeTab == 'pool' ? 'active' : ''">
					  <span class="el-dropdown-link">
					    {{searchVal.pool.label}}<i class="el-icon-arrow-down el-icon--right"></i>
					  </span>
					  <el-dropdown-menu slot="dropdown" @click="changeCondition('pool')">
					    <el-dropdown-item v-for="(item, index) in dropdown.poolList" :key="index">
					    	<div @click="changeCondition('pool', item)">{{item.label}}</div>
					    </el-dropdown-item>
					  </el-dropdown-menu>
					</el-dropdown>
				</div>
				<div class="stockselection-table">
					<div class="table-item" v-show="activeTab == 'diy'">
						<el-table
					    :data="diyTable"
					    style="width: 100%"
					    ref="diyTable">
					    <el-table-column
					      type="selection"
					      width="55" v-if="isEdit">
					    </el-table-column>
					    <el-table-column
					      label="股票代码"
					      prop="code">
					    </el-table-column>
					    <el-table-column
					      label="股票名称"
					      prop="name">
					    </el-table-column>
					    <el-table-column
					      label="幅度%"
					      prop="range">
					    </el-table-column>
					    <el-table-column
					      label="最新"
					      prop="now">
					    </el-table-column>
					    <el-table-column
					      label="涨跌"
					      prop="riseAndFall">
					    </el-table-column>
					    <el-table-column
					      label="开盘"
					      prop="open">
					    </el-table-column>
					    <el-table-column
					      label="总成交量"
					      prop="volume">
					    </el-table-column>
					    <el-table-column
					      label="总金额"
					      prop="amount">
					    </el-table-column>
					    <!-- <el-table-column
					      label="流通市值"
					      prop="marketValue">
					    </el-table-column>
					    <el-table-column
					      label="总市值"
					      prop="totalValue">
					    </el-table-column> -->
					  </el-table>
					  <div class="handle">
					  	  <!-- <el-button class="btn-edit" @click="edit">{{edit ? '取消' : '编辑'}}</el-button> -->
					  	  <el-button class="btn-add" @click="add">添加</el-button>
					  	  <el-button class="btn-del" @click="del">删除</el-button>
					  	  <!-- <el-button class="btn-export">导入</el-button> -->
					   </div>

					   <!-- 绑定邮箱弹窗 -->
						<!-- <el-dialog title="绑定邮箱" :visible.sync="email.dialogFormVisible" class="bindEmail" width="600px">
						<el-form :model="email.emailForm" :rules="email.emailRules" ref="bindEmailForm">
						<el-form-item label="邮箱" :label-width="email.formLabelWidth" prop="email">
						<el-input v-model="email.emailForm.email" placeholder="请输入邮箱地址" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item :label-width="email.formLabelWidth">
						<el-button type="primary" @click="submitForm('bindEmailForm')">确定</el-button>
						</el-form-item>
						</el-form>
						</el-dialog> -->
					</div>
					<div class="table-item" v-show="activeTab == 'pool'">
						<el-table
					    :data="diyTable"
					    style="width: 100%">
					    <el-table-column type="expand">
					      <template slot-scope="props">
					        <div class="expand-item">
					        	<div class="expand-item-left">
					        		<div>
					        			<div class="expand-item-tag">
							        		<span>加入</span>
							        	</div>
							        	<div class="expand-item-content">
							        		人民币贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口
							        	</div>
							        	<div class="expand-item-date">2018-7-18</div>
					        		</div>
					        		<div>
					        			<div class="expand-item-tag">
							        		<span class="del">删除</span>
							        	</div>
							        	<div class="expand-item-content">
							        		人民币贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口。人民币贬值看好家电行业出口
							        	</div>
							        	<div class="expand-item-date">2018-7-18</div>
					        		</div>
					        	</div>
					        	<div class="expand-item-right">
					        		<i class="el-icon-edit-outline"></i>
					        	</div>
					        </div>
					      </template>
					    </el-table-column>
					    <el-table-column
					      type="selection"
					      width="55">
					    </el-table-column>
					    <el-table-column
					      label="股票代码"
					      prop="code">
					    </el-table-column>
					    <el-table-column
					      label="股票名称"
					      prop="name">
					    </el-table-column>
					    <el-table-column
					      label="幅度%"
					      prop="range">
					    </el-table-column>
					    <el-table-column
					      label="最新"
					      prop="newest">
					    </el-table-column>
					    <el-table-column
					      label="涨跌"
					      prop="range">
					    </el-table-column>
					    <el-table-column
					      label="openPrice"
					      prop="range">
					    </el-table-column>
					    <el-table-column
					      label="总量"
					      prop="total">
					    </el-table-column>
					    <el-table-column
					      label="换手率%"
					      prop="turnoverRate">
					    </el-table-column>
					    <el-table-column
					      label="流通市值"
					      prop="marketValue">
					    </el-table-column>
					    <el-table-column
					      label="总市值"
					      prop="totalValue">
					    </el-table-column>
					  </el-table>
					  <div class="handle">
					  	  <el-button class="btn-edit">编辑</el-button>
					  	  <el-button class="btn-add">添加</el-button>
					  	  <el-button class="btn-del">删除</el-button>
					  	  <el-button class="btn-export">导入</el-button>
					   </div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				activeTab: 'diy',
				searchVal: {
					account: '0001',
					diy: {
					},
					pool: {}
				},
				dropdown: {
					accountList: [
						{
							text: '账户1',
							value: '0001'
						},
						{
							text: '账户2',
							value: '0002'
						}
					],
					diyList: [],
					poolList: [
						{
							account: "1359000000",
							stid: "1",
							poolno: "1",
							status: '',
							label: '策略选股池'
						},
						{
							account: "1359000000",
							stid: "1",
							poolno: "1",
							status: 'DEL',
							label: '已删除'
						},
					],
				},
				isEdit: true,
				diyTable: []
			}
		},
		methods: {
			changeCondition(type, item) {
				var that = this;
				switch (type) {
					case 'account':
						that.activeTab = 'diy';
						that.diyTable = [];
						//自选股池列表
						that.$utils.getJson(that.$utils.CONFIG.api.poollist, function(res) {
			              	if(res.succflag == 0) {
			              		if(!res.data.length) return;
			                	that.dropdown.diyList = res.data;
			                	that.searchVal.diy = that.dropdown.diyList[0];
			                	//第一个自选股池列表查询
			                	that.$utils.getJson(that.$utils.CONFIG.api.stocklist, function(res) {
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
								                	that.diyTable = that.diyTable.concat(res.data);
								                	that.diyTable.forEach( function(e, i) {
								                		e.range = ((e.now-e.open)/e.open).toFixed(2);
								                		e.riseAndFall = (e.now-e.open).toFixed(2);
								                	});
								              	}
								            }, function() {}, shHqPostData, true)
					                	}
					                	if(szHqPostData.body.stockcode.length) {
						                	that.$utils.getJson(that.$utils.CONFIG.api.hq, function(res) {
								             	if(res.status == 0) {
								                	that.diyTable = that.diyTable.concat(res.data);
								                	that.diyTable.forEach( function(e, i) {
								                		e.range = ((e.now-e.open)/e.open).toFixed(2);
								                		e.riseAndFall = (e.now-e.open).toFixed(2);
								                	});
								              	}
								            }, function() {}, szHqPostData, true)
					                	}

					              	}else {
					                	that.$utils.showTip('error', '', '', res.message);
					              	}
					            }, function() {}, that.searchVal.diy, true, {token: that.$utils.CONFIG.token})
			              	}else {
			                	that.$utils.showTip('error', '', '', res.message);
			              	}
			            }, function() {}, {account: that.searchVal.account}, true, {token: that.$utils.CONFIG.token})
						break;
					case 'diy':
						that.activeTab = type;
						that.diyTable = [];
						that.$utils.getJson(that.$utils.CONFIG.api.stocklist, function(res) {
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
						                	that.diyTable = that.diyTable.concat(res.data);
						                	that.diyTable.forEach( function(e, i) {
						                		e.range = ((e.now-e.open)/e.open).toFixed(2);
						                		e.riseAndFall = (e.now-e.open).toFixed(2);
						                	});
						              	}
						            }, function() {}, shHqPostData, true)
			                	}
			                	if(szHqPostData.body.stockcode.length) {
				                	that.$utils.getJson(that.$utils.CONFIG.api.hq, function(res) {
						             	if(res.status == 0) {
						                	that.diyTable = that.diyTable.concat(res.data);
						                	that.diyTable.forEach( function(e, i) {
						                		e.range = ((e.now-e.open)/e.open).toFixed(2);
						                		e.riseAndFall = (e.now-e.open).toFixed(2);
						                	});
						              	}
						            }, function() {}, szHqPostData, true)
			                	}

			              	}else {
			                	that.$utils.showTip('error', '', '', res.message);
			              	}
			            }, function() {}, that.searchVal.diy, true, {token: that.$utils.CONFIG.token})
						break;
					case 'pool':
						that.activeTab = type;
						break;
					
				}
			},
			// edit() {
			// 	this.isEdit = !this.isEdit;
			// }
			add() {
				if(!this.$refs.diyTable.selection.length) {
					this.$utils.showTip('error', 'error', '-1030');
				}
			},
			del() {

			}
		},
		created() {
			var that = this;
			that.searchVal.pool = that.dropdown.poolList[0];
			//自选股池列表
			that.$utils.getJson(that.$utils.CONFIG.api.poollist, function(res) {
              	if(res.succflag == 0) {
              		if(!res.data.length) return;
                	that.dropdown.diyList = res.data;
                	that.searchVal.diy = that.dropdown.diyList[0];
                	//第一个自选股池列表查询
                	that.$utils.getJson(that.$utils.CONFIG.api.stocklist, function(res) {
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
					                	that.diyTable = that.diyTable.concat(res.data);
					                	that.diyTable.forEach( function(e, i) {
					                		e.range = ((e.now-e.open)/e.open).toFixed(2);
					                		e.riseAndFall = (e.now-e.open).toFixed(2);
					                	});
					              	}
					            }, function() {}, shHqPostData, true)
		                	}
		                	if(szHqPostData.body.stockcode.length) {
			                	that.$utils.getJson(that.$utils.CONFIG.api.hq, function(res) {
					             	if(res.status == 0) {
					                	that.diyTable = that.diyTable.concat(res.data);
					                	that.diyTable.forEach( function(e, i) {
					                		e.range = ((e.now-e.open)/e.open).toFixed(2);
					                		e.riseAndFall = (e.now-e.open).toFixed(2);
					                	});
					              	}
					            }, function() {}, szHqPostData, true)
		                	}

		              	}else {
		                	that.$utils.showTip('error', '', '', res.message);
		              	}
		            }, function() {}, that.searchVal.diy, true, {token: that.$utils.CONFIG.token})
              	}else {
                	that.$utils.showTip('error', '', '', res.message);
              	}
            }, function() {}, {account: that.searchVal.account}, true, {token: that.$utils.CONFIG.token})
		}
	}
</script>
<style lang="scss">
	.stockselection {
		.stockselection-body {
			.stockselection-bar {
				padding: 0 35px 10px 35px;
				border-bottom: 1px solid #d1d6da;
				.account {
					width: 160px;
				}
				.diy {
					position: relative;
					top: 5px;
					margin-left: 140px;
					margin-right: 30px;
					.el-input__inner {
						border: none;
					}
				}
				.pool {
					position: relative;
					top: 5px;
					.el-input__inner {
						border: none;
					}
				}
				.el-dropdown.active .el-dropdown-link{
					padding: 8px;
					border-radius: 4px;
					background: #f2f6fa;
					.el-icon--right {
						margin-right: 8px;
					}
				}
			}
			.el-table {
				td {
					text-align: center;
					padding-top: 20px;
					padding-bottom: 20px;
				}
				th {
					text-align: center;
					background: #fafbfc;
					padding-top: 20px;
					padding-bottom: 20px;
				}
				.expand-item {
					display: flex;
					text-align: left;
					font-size: 12px;
					line-height: 20px;
					color: #b4b4b4;
					margin-bottom: 20px;
					.expand-item-left {
						flex: 1;
						& > div {
							display: flex;
							.expand-item-tag {
								span {
									display: block;
									width: 50px;
									height: 20px;
									text-align: center;
									color: #fff;
									border-radius: 10px;
									background: #5091fa;
									margin-right: 10px;
									&.del {
										background: #e60012;
									}
								}
							}
							.expand-item-content {
								flex: 1;
							}
							.expand-item-date {
								padding-left: 50px;
								color: #b4cadf;
							}
						}
					}
					.expand-item-right {
						padding-left: 10px;
						color: #8e8e8e;
						font-size: 16px;
					}
				}
			}
			.handle {
				margin-top: 40px;
				margin-left: 20px;
				.btn-edit {
					background: #6ea5ff;
					color: #fff;
					border: none;
				}
				.btn-add {
					background: #4888f0;
					color: #fff;
					border: none;
				}
				.btn-del {
					background: #dcdcdc;
					color: #fff;
					border: none;
				}
				.btn-export {
					background: #18ded2;
					color: #fff;
					border: none;
				}
			}
		}
	}
</style>
