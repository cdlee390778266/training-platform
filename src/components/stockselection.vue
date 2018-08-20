<template>
	<div class="stockselection">
		<div class="ql-wrapper ql-wrapper-common">
			<h1>策略选股</h1>
			<div class="stockselection-body">
				<div class="stockselection-bar">
					<el-select placeholder="请选择账号" v-model="account" class="account">
				      <el-option label="账号一" value="shanghai"></el-option>
				      <el-option label="账号二" value="beijing"></el-option>
				    </el-select>
				    <el-select placeholder="请选择自选股" v-model="diy" size="small" class="diy">
				      <el-option label="自选股1" value="shanghai"></el-option>
				      <el-option label="自选股2" value="beijing"></el-option>
				    </el-select>
				    <el-select v-model="pool" size="small" class="pool">
				      <el-option label="策略选股池" value="shanghai"></el-option>
				      <el-option label="已删除" value="beijing"></el-option>
				    </el-select>
				</div>
				<el-table
			    :data="tableData5"
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
</template>
<script>
	export default {
		data() {
			return {
				// accountList: [
				// 	{
				// 		account: '5',
				// 		type: '',
				// 		tabs: {
				// 			value: {
				// 				code: 1,
				// 				name: '自选股'
				// 			},
				// 			optList: [
				// 				{
				// 					code: 1,
				// 					name: '自选股',
				// 					tableData: [
				// 						{
				// 							code: '000651',
				// 							name: '格力空调',
				// 							range: '-0.64',
				// 							newest: 44.38,
				// 							riseAndFall: '1.38',
				// 							openPrice: '44.38',
				// 							total: '79064',
				// 							turnoverRate: '0.35',
				// 							marketValue: '2599.60亿',
				// 							totalValue: '2715.60亿'
				// 				        },
				// 				        {
				// 							code: '000651',
				// 							name: '格力空调',
				// 							range: '-0.64',
				// 							newest: 44.38,
				// 							riseAndFall: '1.38',
				// 							openPrice: '44.38',
				// 							total: '79064',
				// 							turnoverRate: '0.35',
				// 							marketValue: '2599.60亿',
				// 							totalValue: '2715.60亿'
				// 				        },
				// 				        {
				// 							code: '000651',
				// 							name: '格力空调',
				// 							range: '-0.64',
				// 							newest: 44.38,
				// 							riseAndFall: '1.38',
				// 							openPrice: '44.38',
				// 							total: '79064',
				// 							turnoverRate: '0.35',
				// 							marketValue: '2599.60亿',
				// 							totalValue: '2715.60亿'
				// 				        },
				// 				        {
				// 							code: '000651',
				// 							name: '格力空调',
				// 							range: '-0.64',
				// 							newest: 44.38,
				// 							riseAndFall: '1.38',
				// 							openPrice: '44.38',
				// 							total: '79064',
				// 							turnoverRate: '0.35',
				// 							marketValue: '2599.60亿',
				// 							totalValue: '2715.60亿'
				// 				        },
				// 				        {
				// 							code: '000651',
				// 							name: '格力空调',
				// 							range: '-0.64',
				// 							newest: 44.38,
				// 							riseAndFall: '1.38',
				// 							openPrice: '44.38',
				// 							total: '79064',
				// 							turnoverRate: '0.35',
				// 							marketValue: '2599.60亿',
				// 							totalValue: '2715.60亿'
				// 				        }
				// 			        ]
				// 				},
				// 				{
				// 					code: 1,
				// 					name: '自选股1'
				// 				},
				// 				{
				// 					code: 1,
				// 					name: '自选股2'
				// 				},
				// 				{
				// 					code: 1,
				// 					name: '自选股3'
				// 				},
				// 				{
				// 					code: 1,
				// 					name: '自选股4'
				// 				}
				// 			]
				// 		}
				// 	}
				// ],
				account: '',
				diy: '',
				pool: '',
				tableData5: [
					{
						code: '000651',
						name: '格力空调',
						range: '-0.64',
						newest: 44.38,
						riseAndFall: '1.38',
						openPrice: '44.38',
						total: '79064',
						turnoverRate: '0.35',
						marketValue: '2599.60亿',
						totalValue: '2715.60亿'
			        },
			        {
						code: '000651',
						name: '格力空调',
						range: '-0.64',
						newest: 44.38,
						riseAndFall: '1.38',
						openPrice: '44.38',
						total: '79064',
						turnoverRate: '0.35',
						marketValue: '2599.60亿',
						totalValue: '2715.60亿'
			        },
			        {
						code: '000651',
						name: '格力空调',
						range: '-0.64',
						newest: 44.38,
						riseAndFall: '1.38',
						openPrice: '44.38',
						total: '79064',
						turnoverRate: '0.35',
						marketValue: '2599.60亿',
						totalValue: '2715.60亿'
			        },
			        {
						code: '000651',
						name: '格力空调',
						range: '-0.64',
						newest: 44.38,
						riseAndFall: '1.38',
						openPrice: '44.38',
						total: '79064',
						turnoverRate: '0.35',
						marketValue: '2599.60亿',
						totalValue: '2715.60亿'
			        },
			        {
						code: '000651',
						name: '格力空调',
						range: '-0.64',
						newest: 44.38,
						riseAndFall: '1.38',
						openPrice: '44.38',
						total: '79064',
						turnoverRate: '0.35',
						marketValue: '2599.60亿',
						totalValue: '2715.60亿'
			        }
		        ]
			}
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
					width: 100px;
					margin-left: 140px;
					margin-right: 30px;
					.el-input__inner {
						border: none;
					}
				}
				.pool {
					position: relative;
					top: 5px;
					width: 120px;
					.el-input__inner {
						border: none;
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
