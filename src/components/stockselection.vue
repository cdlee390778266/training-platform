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
					  	  <el-button class="btn-add" @click="showAddDialog">添加</el-button>
					   </div>

					   <!-- 加入策略交易池弹窗 -->
						<el-dialog title="加入策略交易池" :visible.sync="addPool.dialogVisible" class="addPool" width="600px">
							<el-table
							:data="addPool.table"
							style="width: 100%">
								<el-table-column
								prop="commcode"
								label="代码"
								width="100">
								</el-table-column>
								<el-table-column
								prop="name"
								label="简称"
								width="100">
								</el-table-column>
								<el-table-column
								prop="remark"
								label="添加理由">
									<template slot-scope="scope">
										<el-input v-model="scope.row.remark" placeholder="请输入内容"></el-input>
									</template>
								</el-table-column>
							</el-table>
							<span slot="footer" class="dialog-footer">
						    <el-button type="primary" @click="addToPool">确 定</el-button>
						    <el-button @click="addPool.dialogVisible = false">取 消</el-button>
						  </span>
						</el-dialog>
					</div>
					<div class="table-item" v-show="activeTab == 'pool'">
						<el-table
					    :data="clTable"
					    @cell-click="expand"
					    ref="clTable"
					    style="width: 100%">
					    <el-table-column type="expand" prop="handleList">
					      <template slot-scope="scope">
					        <div class="expand-item" v-if="scope.row.handleList.length">
					        	<div class="expand-item-left">
					        		<div v-for="(item, index) in scope.row.handleList" :key="index" >
					        			<div class="expand-item-tag">
							        		<span :class="{'': item.opertype == 'I', 'del': item.opertype == 'D', 'update': item.opertype == 'U'}">{{ item.opertype == 'I' ? '加入' : item.opertype == 'D' ? '删除' : '更新'}}</span>
							        	</div>
							        	<div class="expand-item-content">{{item.remark}}</div>
							        	<div class="expand-item-date">{{item.opertime}}</div>
					        		</div>
					        	</div>
					        	<div class="expand-item-right">
					        		<i class="el-icon-edit-outline" @click="showModifyDialog(scope.row.handleList[0], scope.row)"></i>
					        	</div>
					        </div>
					        <div class="expand-item" v-else>
					        	<div class="expand-item-left">无操作记录</div>
					        	<div class="expand-item-right"></div>
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
					  	  <!-- <el-button class="btn-add">添加</el-button> -->
					  	  <el-button class="btn-del" @click="showDelDialog">删除</el-button>
					  	  <!-- <el-button class="btn-export">导入</el-button> -->
					   </div>

					   <!-- 编辑弹窗 -->
						<el-dialog title="编辑选股理由" :visible.sync="modify.dialogVisible" class="modify" width="600px">
							<el-form :model="modify.modifyForm.stock" :rules="modify.modifyRules" ref="modify">
					          <el-form-item prop="remark">
					            <el-input type="textarea" v-model="modify.modifyForm.stock.remark" placeholder="请输入选股理由"></el-input>
					          </el-form-item>
					        </el-form>
							<span slot="footer" class="dialog-footer">
						    <el-button type="primary" @click="modifySubmit('modify')">确 定</el-button>
						    <el-button @click="modify.dialogVisible = false">取 消</el-button>
						  </span>
						</el-dialog>
						<!-- 删除弹窗 -->
						<el-dialog title="删除股票" :visible.sync="del.dialogVisible" class="del" width="600px">
							<el-table
							:data="del.table"
							style="width: 100%">
								<el-table-column
								prop="commcode"
								label="代码"
								width="100">
								</el-table-column>
								<el-table-column
								prop="name"
								label="简称"
								width="100">
								</el-table-column>
								<el-table-column
								prop="remark"
								label="删除理由">
									<template slot-scope="scope">
										<el-input v-model="scope.row.remark" placeholder="请输入内容"></el-input>
									</template>
								</el-table-column>
							</el-table>
							<span slot="footer" class="dialog-footer">
						    <el-button type="danger" @click="delSubmit">删 除</el-button>
						    <el-button @click="del.dialogVisible = false">取 消</el-button>
						  </span>
						</el-dialog>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	var getDiyTable = function(that) {
		that.$utils.getJson(that.$utils.CONFIG.api.stockList, function(res) {
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
	var getClTable = function(that) {
		that.$utils.getJson(that.$utils.CONFIG.api.clStockList, function(res) {
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
					if(e.marketcode == 0) {
						shHqPostData.body.stockcode.push(e.commcode);
					}
					if(e.marketcode == 1) {
						szHqPostData.body.stockcode.push(e.commcode);
					}
				});

            	//根据列表数据查询行情
            	if(shHqPostData.body.stockcode.length) {
                	that.$utils.getJson(that.$utils.CONFIG.api.hq, function(res) {
		             	if(res.status == 0) {
		                	res.data.forEach( function(e, i) {
		                		e.range = ((e.now-e.open)/e.open).toFixed(2);
		                		e.riseAndFall = (e.now-e.open).toFixed(2);
		                		e.marketcode = 0;
		                		e.handleList = [];
		                		e.hadLoading = false;
		                	});
		                	that.clTable = that.clTable.concat(res.data);
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
		                		e.handleList = [];
		                		e.hadLoading = false;
		                	});
		                	that.clTable = that.clTable.concat(res.data);
		              	}else {
		              		that.$utils.showTip('error', '', '', res.message);
		              	}
		            }, function() {}, szHqPostData, true)
            	}

          	}else {
            	that.$utils.showTip('error', '', '', res.message);
          	}
        }, function() {}, that.searchVal.pool, true, {token: that.$utils.CONFIG.token})
	}
	export default {
		data() {
			return {
				activeTab: 'diy',
				searchVal: {
					account: '0001',
					diy: {},
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
							account: "",
							stid: "1",
							poolno: "1",
							status: '',
							label: '策略选股池'
						},
						{
							account: "",
							stid: "1",
							poolno: "1",
							status: 'DEL',
							label: '已删除'
						},
					],
				},
				isEdit: true,
				diyTable: [],
				clTable: [],
				addPool: {
					dialogVisible: false,
					table: [],
				},
				modify: {
					dialogVisible: false,
					modifyForm: {
						currentHandleList: [],
						stock: {
							account: "",
							poolno: "1",
							remark: "",
							stid: "1",
							marketcode: "",
							commcode: ""
						}
					},
					modifyRules: {
						remark: [
			                { required: true, message: '请输入选股理由', trigger: 'blur' }
			            ]
					}
				},
				del: {
					dialogVisible: false,
					table: []
				},
			}
		},
		methods: {
			changeCondition(type, item) {
				var that = this;
				switch (type) {
					case 'account':
						that.diyTable = [];
						that.clTable = [];
						that.dropdown.poolList.forEach(function(e, i) {
							e.account = that.searchVal.account;
						})

						if(that.activeTab == 'diy') {
							//自选股池列表
							that.$utils.getJson(that.$utils.CONFIG.api.poollist, function(res) {
				              	if(res.succflag == 0) {
				                	that.dropdown.diyList = res.data;
				                	console.log(that.dropdown.diyList);
				              		if(!res.data.length) return;
				                	that.searchVal.diy = that.dropdown.diyList[0];
				                	//第一个自选股池列表查询
				                	getDiyTable(that);
				              	}else {
				                	that.$utils.showTip('error', '', '', res.message);
				              	}
				            }, function() {}, {account: that.searchVal.account}, true, {token: that.$utils.CONFIG.token})
						}else if(that.activeTab == 'pool') {
							//自选股池列表
							that.$utils.getJson(that.$utils.CONFIG.api.poollist, function(res) {
				              	if(res.succflag == 0) {
				                	that.dropdown.diyList = res.data;
				                	console.log(that.dropdown.diyList);
				              		if(!res.data.length) return;
				                	that.searchVal.diy = that.dropdown.diyList[0];
				              	}else {
				                	that.$utils.showTip('error', '', '', res.message);
				              	}
				            }, function() {}, {account: that.searchVal.account}, true, {token: that.$utils.CONFIG.token})
							getClTable(that);
						}
						break;
					case 'diy':
						that.activeTab = type;
						that.diyTable = [];
						getDiyTable(that);
						break;
					case 'pool':
						that.activeTab = type;
						that.clTable = [];
						that.searchVal.pool = item;
						getClTable(that);
						break;
					
				}
			},
			showAddDialog() {
				var that = this;
				if(!that.$refs.diyTable.selection.length) {
					that.$utils.showTip('error', 'error', '-1030');
					return;
				}
				that.addPool.table = [];
				that.$refs.diyTable.selection.forEach(function(e, i) {
					var obj = {}
					obj.account = that.searchVal.account;
					obj.stid = 1;
					obj.poolno = 1;
					obj.marketcode = e.marketcode;
					obj.commcode = e.code;
					obj.name = e.name;
					obj.remark = '';
					that.addPool.table.push(obj);
				})
				that.addPool.dialogVisible = true;
			},
			addToPool() {
				var that = this;
				that.$utils.getJson(that.$utils.CONFIG.api.addPool, function(res) {
	              	if(res.succflag == 0) {
	                	that.$utils.showTip('success', '', '', res.message);
	              	}else {
	                	that.$utils.showTip('error', '', '', res.message);
	              	}
	            }, function() {}, {commodity: that.addPool.table}, true, {token: that.$utils.CONFIG.token})
			},
			expand(row) {
				var that = this;
				var postData = {
					account: that.searchVal.account,
					stid: "1",
					poolno: "1",
					marketcode: row.marketcode,
					commcode: row.code
				}
				that.$refs.clTable.toggleRowExpansion(row);
				if(row.hadLoading) return;
				row.hadLoading = true;
				that.$utils.getJson(that.$utils.CONFIG.api.stoprecList, function(res) {
	              	if(res.succflag == 0) {
	                	row.handleList = res.data;
	                	console.log(row.handleList);
	              	}else {
	                	that.$utils.showTip('error', '', '', res.message);
	              	}
	            }, function() {}, postData, true, {token: that.$utils.CONFIG.token})
			},
			showModifyDialog(reason, row) {
				this.modify.dialogVisible = true;
				this.modify.modifyForm.currentHandleList = row.handleList;
				this.modify.modifyForm.stock.account = this.searchVal.account;
				this.modify.modifyForm.stock.remark = reason.remark;
				this.modify.modifyForm.stock.marketcode = row.marketcode;
				this.modify.modifyForm.stock.commcode = row.code;
			},
			modifySubmit(formName) {
	            var that = this;
	            this.$refs[formName].validate((valid) => {
	              if (valid) {
	                that.$utils.getJson(that.$utils.CONFIG.api.stockUpd, function(res) {
		              	if(res.succflag == 0) {
		              		that.modify.modifyForm.currentHandleList[0].remark =  that.modify.modifyForm.stock.remark;
		              	}else {
		                	that.$utils.showTip('error', '', '', res.message);
		              	}
		              	that.modify.dialogVisible = false;
		            }, function() {
		            	that.modify.dialogVisible = false;
		            }, that.modify.modifyForm.stock, true, {token: that.$utils.CONFIG.token})
	              } else {
	                return false;
	              }
	            });
			},
			showDelDialog() {
				var that = this;
				if(!that.$refs.clTable.selection.length) {
					that.$utils.showTip('error', 'error', '-1030');
					return;
				}
				that.del.table = [];
				that.$refs.clTable.selection.forEach(function(e, i) {
					var obj = {}
					obj.account = that.searchVal.account;
					obj.stid = 1;
					obj.poolno = 1;
					obj.marketcode = e.marketcode;
					obj.commcode = e.code;
					obj.name = e.name;
					obj.remark = '';
					that.del.table.push(obj);
				})
				that.del.dialogVisible = true;
			},
			delSubmit() {
				var that = this;
				that.$utils.getJson(that.$utils.CONFIG.api.stockDel, function(res) {
	              	if(res.succflag == 0) {
	                	that.$utils.showTip('success', '', '', res.message);
	                	that.del.table.forEach(function(e) {
	                		for(var i = 0; i < that.clTable.length; i++) {
	                			if(e.commcode == that.clTable[i].code) {
	                				that.clTable.splice(i, 1);
	                				break;
	                			}
	                		}
	                	})
	              	}else {
	                	that.$utils.showTip('error', '', '', res.message);
	              	}
	              	that.del.dialogVisible = false;
	            }, function() {
	            	that.del.dialogVisible = false;
	            }, {commodity: that.del.table}, true, {token: that.$utils.CONFIG.token})
			}
		},
		created() {
			var that = this;
			that.searchVal.pool = that.dropdown.poolList[0];
			that.dropdown.poolList.forEach(function(e, i) {
				e.account = that.searchVal.account;
			})
			//自选股池列表
			that.$utils.getJson(that.$utils.CONFIG.api.poollist, function(res) {
              	if(res.succflag == 0) {
              		if(!res.data.length) return;
                	that.dropdown.diyList = res.data;
                	that.searchVal.diy = that.dropdown.diyList[0];
                	//第一个自选股池列表查询
                	getDiyTable(that);
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
							margin-bottom: 10px;
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
									&.update {
										background: #18ded2;
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
		.addPool {
			.el-table th {
				padding-top: 20px;
				padding-bottom: 20px;
			}
			.el-table td {
				padding-top: 5px;
				padding-bottom: 5px;
			}
		}
		.modify {
			textarea {
				height: 160px;
			}
		}
	}
</style>
