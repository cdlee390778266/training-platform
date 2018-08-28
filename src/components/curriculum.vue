<template>
	<div class="curriculum">
		<div class="ql-wrapper">
			<div class="curriculum-body">
				<div class="search">
		    		<div class="search-l">
		    			<div class="search-item" v-for="(item, index) in list.search.condition">
		    				<div class="search-item-type">
		    					{{item.name}}
		    				</div>
		    				<div class="search-item-list">
		    					<span v-for="(data, index) in item.list" @click="changeCondition(data, item)" :class="{active: data.isActive}">{{data.typename}}</span>
		    				</div>
		    			</div>
						<div class="search-item">
		    				<div class="search-item-type"></div>
		    				<div class="search-item-list">
						        <el-form>
						          <el-form-item>
						            <el-input placeholder="输入课程名称" v-model="searchVal.racename"></el-input>
						            <el-button type="primary" size="small" class="codeBtn" @click="search">搜索</el-button>
						          </el-form-item>
						        </el-form>
		    				</div>
		    			</div>
		    		</div>
		    		<div class="search-r">
		    			<strong>{{list.data.page.responsetotal}}</strong>
		    			<span>课程总数</span>
		    		</div>
		    	</div>
		    	<div class="list">
		    		<div class="list-item" v-for="(item, index) in list.data.list" @click="jump(item, 'detail')">
		    			<div class="list-item-l" :style="'background-image: url(' + item.url + ');'" v-if="item.url"></div>
		    			<div class="list-item-l" :style="'background-image: url(' + list.data.defaultImg + ');'" v-else></div>
		    			<div class="list-item-c">
		    				<h2>{{item.racename}}</h2>
		    				<p><strong>课程老师：</strong>{{item.hostunit}}</p>
		    				<p><strong>课程内容：</strong>{{item.content}}</p>
		    				<p>
		    					<strong>课程时间：</strong>
		    					{{item.racestarttime}}-{{item.raceendtime}}
		    				</p>
		    				<p>
		    					<strong>课程状态：</strong>
								<template v-if="item.racestatus == 41">
		    						开课中
		    					</template>
		    					<template v-else-if="item.racestatus == 40">
		    						临时停课
		    					</template>
		    					<template v-else-if="item.racestatus == 4999">
		    						已结束
		    					</template>
		    				</p>
		    				<p v-if="item.stustatus != 4999">
		    					<strong>我的状态：</strong>
		    					<template v-if="item.stustatus == 0">
		    						未交易
		    					</template>
		    					<!-- <template v-else-if="item.stustatus == 1">
		    						已报名（未开课）
		    					</template> -->
		    					<template v-else-if="item.stustatus == 2">
		    						上课中
		    					</template>
		    					<!-- <template v-else>
		    						已结束
		    					</template> -->
		    				</p>
		    				<p v-if="item.ranking"><strong>当前排名：</strong>{{item.ranking}}</p>
		    			</div>
		    			<div class="list-item-r">
		    				<el-button class="bt2" @click.stop="jump(item, 'entry')">进入我的课程</el-button>
							<el-button class="bt3" @click.stop="jump(item, 'sort')">查看课程排名</el-button>
		    				<el-button type="danger" v-if="item.racestatus == 41" v-for="(acct, index) in item.fuacct" :key="index" @click.stop="trade(item, acct)">{{acct.fuaccttype == 1 ? '竞赛交易' : '期权交易'}}</el-button>
		    			</div>
		    		</div>
		    		<div class="pager-wrapper">
		    			<el-pagination
						  background
						  layout="prev, pager, next"
						  :total="list.data.page.responsetotal" @current-change="changePage" :page-size="searchVal.page.size" :current-page.sync="list.data.currentPage">
						</el-pagination>
		    		</div>
		    	</div>
			</div>
		</div>
	</div>
</template>
<script>
	//赛事列表
	var getList = function(that) {
		that.$utils.getJson(that.$utils.CONFIG.api.taskList, function(res) {
         	if(res.succflag == 0) {
            	that.list.data.list = res.data.list;
            	that.list.data.page = res.page;
          	}else {
          		that.$utils.showTip('error', '', '', res.message);
          	}
        }, function() {}, that.searchVal, true, {token: that.$utils.CONFIG.token})
	}
	export default {
		data() {
			return {
				timer: '',
				searchVal: {
					markettype: '',
					visitamount: '',
					status: '',
					racename: '',
					page: {
						start: "0",
						size: this.$utils.CONFIG.pageSize
					},
				},
				list: {
					search: {
						condition: [
							{
								name: '课程老师',
								keyName: 'hostunit',
								list: []
							},
							{
								name: '课程类型',
								keyName: 'markettype',
								list: []
							},
							{
								name: '课程状态',
								keyName: 'status',
								list: []
							}
						]
					},
					data: {
						defaultImg: require('../assets/images/img2.png'),
						list: [],
						currentPage: 1,
						page: {
							start: 0,
							size: 0,
							responsenum: 0,
							responsetotal: 0
						}
					}
				},
			}
		},
		methods: {
			trade(item, acct) {
				var json = {
	                method: 'startexe',
	                data: {
	                  	type:'quotes',
	                  	exeName: acct.fuaccttype == 1 ? 'shares' : 'option',
	                  	account: acct.fuacct
	                }
	            }
	            this.$utils.handleExe(json, function(){}, function(){})
			},
			changeCondition(data, item) {
				if(data.isActive) return;
				item.list.forEach(function(e, i) {
					if(data.type === e.type) {
						e.isActive = true;
					}else {
						e.isActive = false;
					}
				})
				var that = this;
				that.searchVal[item.keyName] = data.type;
				that.searchVal.page.start = 0;
				that.list.data.currentPage = 1;
				getList(that);
			},
			search() {
				if(!this.searchVal.racename) return;
				var that = this;
				that.searchVal.page.start = 0;
				that.list.data.currentPage = 1;
				getList(that);
			},
			jump(item, type) {
				switch (type) {
					case 'detail':  //比赛详情
						this.$router.push({ path: '/curriculum/detail/detail/', query: {data: JSON.stringify(item)}});
						break;
					case 'entry':  //进入我的赛事
						this.$router.push({ path: '/admin/home', query: {raceid: item.usagecode}});
						break;
					case 'sort':   //赛事排名
						this.$router.push({ path: '/curriculum/detail/sort', query: {data: JSON.stringify(item)}});
						break;
				}
			},
	        changePage(currentPage) {
	        	var that = this;
				that.searchVal.page.start = (currentPage - 1) * that.searchVal.page.size;
				getList(that);
	        }
		},
		created() {
			var that = this;
			//获取条件
			that.$utils.getJson(that.$utils.CONFIG.api.cumSetting, function(res) {
	         	if(res.succflag == 0) {
	            	that.list.search.condition[0].list = res.data.hostunit.list;
	            	that.list.search.condition[1].list = res.data.markettype.list;
	            	that.list.search.condition[2].list = res.data.status.list;
	          	}else {
	          		that.$utils.showTip('error', '', '', res.message);
	          	}
	        }, function() {}, that.searchVal, true, {token: that.$utils.CONFIG.token})
            //赛事列表
           	getList(that);
		}
	}
</script>
<style lang="scss">
	.curriculum {
		padding-top: 0;
		.swiper-container {
			width: 100%;
			min-width: 1200px;
		}
		.activity {
			margin-top: 10px;
			.el-col {
				position: relative;
				height: 196px;
				background-size: cover;
				span {
					position: absolute;
					left: 0;
					bottom: 0;
					right: 0;
					height: 50px;
					line-height: 50px;
					padding: 0 10px;
					color: #fff;
					font-size: 16px;
					background: rgba(27, 27, 27, .6);
				}
			}
		}
		.lattice {
			margin-top: 20px;
			.el-col {
				position: relative;
				height: 140px;
				div {
					height: 140px;
					padding: 30px;
					background: #fff;
					border: 1px solid #dde1e6;
					h2 {
						font-size: 18px;
						font-weight: normal;
						margin-bottom: 30px;
					}
					strong {
						font-size: 14px;
						color: #e20026;
					}
				}
			}
		}
		.curriculum-body {
			margin-bottom: 100px;
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
			.simulation-item {
				height: 450px;
				padding: 20px;
				margin-top: 20px;
				border: 1px solid #dde1e6;
				background-color: #fff;
				.simulation-bar {
					font-size: 16px;
					color: #4e4e4e;
					margin-top: 10px;
					a {
						font-size: 12px;
						color: #5091fa;
						float: right;
					}
				}
				.simulation-img {
					margin: 20px 0;
					height: 210px;
					background-size: cover;
				}
				.simulation-text {
					height: 53px;
					strong {
						display: block;
						padding: 0 15px;
						font-size: 18px;
						margin-bottom: 10px;
					}
					.simulation-text-type1 {
						color: #e20026;
					}
					.simulation-text-type2 {
						color: #6bca24;
					}
					.simulation-text-type3 {
						color: #e20026;
					}
					span {
						padding: 0 15px;
						font-size: 14px;
						color: #4e4e4e;
					}
				}
				.simulation-trade {
					height: 40px;
					line-height: 40px;
					margin-top: 30px;
					color: #4e4e4e;
					span {
						color: #e30129;
					}
					a {
						color: #5091fa;
						margin-left: 20px;
					}
					.el-button--danger {
						float: right;
						margin-left: 20px;
						background: #e30129;
						span {
							color: #fff;
						}
					}
				}
			}
			.search {
				display: flex;
				height: 350px;
				padding: 0 40px;
				margin-top: 20px;
				border: 1px solid #dde1e6;
				background: #fff;
				.search-l {
					flex: 1;
					padding: 40px 20px 0 40px;
					.search-item {
						display: flex;
						margin-bottom: 40px;
						.search-item-type {
							width: 88px;
							line-height: 30px;
							font-weight: bold;
							color: #4e4e4e;
						}
						.search-item-list {
							flex: 1;
							span {
								display: inline-block;
								width: 80px;
								height: 30px;
								line-height: 30px;
								margin-right: 10px;
								text-align: center;
								&.active {
									color: #fff;
									border-radius: 20px;
									background: #5091fa;
								}
							}
							form {
								.el-form-item {
									width: 430px;
									.el-button {
										position: absolute;
										top: 0;
										right: 0;
										bottom: 0;
										width: 100px;
										border-top-left-radius: 0;
										border-bottom-left-radius: 0;
										background: #5091fa;
										span {
											width: auto;
											line-height: 22px;
										}
									}
								}
							}
						}
					}
				}
				.search-r {
					width: 240px;
					text-align: center;
					border-left: 1px solid #dde1e6;
					strong {
						display: block;
						margin-top: 110px;
						text-align: center;
						font-size: 60px;
						color: #e30129;
					}
					span {
						font-size: 14px;
						font-weight: bold;
						color: #4e4e4e;
					}
				}
			}
			.list {
				margin-top: 20px;
				.list-item {
					display: flex;
					height: 296px;
					margin-top: 10px;
					padding: 20px;
					border: 1px solid #dde1e6;
					background: #fff;
					.list-item-l {
						width: 360px;
						background-size: cover;
					}
					.list-item-c {
						padding-left: 20px;
						line-height: 26px;
						color: #747474;
						flex: 1;
						strong {
							font-weight: normal;
						}
						h2 {
							font-size: 18px;
							color: #747474;
							margin-bottom: 10px;
						}
					}
					.list-item-r {
						width: 140px;
						padding-top: 40px;
						text-align: center;
						a, button {
							display: inline-block;
							width: 110px;
							height: 40px;
							line-height: 40px;
							text-align: center;
							padding: 0;
							margin-left: 0;
							margin-bottom: 10px;
							color: #fff;
							border-radius: 4px;
							font-size: 12px;
						}
						.bt1 {
							background: #6ea5ff;
						}
						.bt2 {
							background: #18ded2;
						}
						.bt3 {
							background: #5091fa;
						}
						.bt4 {
							background: #e30129;
						}
					}
				}
			}
		}
		.pager-wrapper {
			padding-top: 10px;
			padding-bottom: 10px;
			margin-top: 10px;
			background: #fff;
			border: 1px solid #dde1e6;
			.el-pagination {
				text-align: center;
				margin: 40px auto;
			}
		}
		.signUp {
	      .el-form {
	        width: 490px;
	        margin: 20px auto;
	        margin-bottom: 60px;
	        img {
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
