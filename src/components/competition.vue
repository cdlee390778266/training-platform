<template>
	<div class="competition">
		<swiper :options="swiperOption" ref="mySwiper">
		    <swiper-slide v-for="(item, index) in ads" :key="index">
		    	<div style="background: #3972f1" class="ad">
			    	<div class="ql-wrapper">
			    		<img :src="item.url" width="800px">
			    	</div>
			    </div>
		    </swiper-slide>
		</swiper>
		<div class="ql-wrapper">
			<el-row class="activity">
				<el-col :span="6" v-for="(item, index) in activity" :key="index" :style="'background-image: url(' + item.url + ');'"  @click.native="goLink(item)">
					<span>{{item.name}}</span>
				</el-col>
			</el-row>
			<el-row class="lattice" :gutter="20">
				<el-col :span="6" v-for="(item, index) in lattice" :key="index">
					<div>
						<h2>{{item.name}}</h2>
						<strong :class="{'fall': item.isFall}">{{item.value}}</strong>
					</div>
				</el-col>
			</el-row>
			<div class="competition-body">
				<el-tabs v-model="tabs.activeTab">
				    <el-tab-pane :label="tabs.tabs.simulation.name" name="simulation">
				    	<el-row :gutter="20" v-if="tabs.tabs.simulation.dataList && tabs.tabs.simulation.dataList.length">
							<el-col :span="12" v-for="(item, index) in tabs.tabs.simulation.dataList" :key="index">
								<div class="simulation-item" @click="jump(item, 'entry')">
									<div class="simulation-bar">{{item.racename  | strLen(32)}} <a @click.stop="jump(item, 'detail')">查看详情</a></div>
									<div class="simulation-img" :style="'background-image: url(' + item.url + ');'" v-if="item.url"></div>
									<div class="simulation-img" :style="'background-image: url(' + tabs.tabs.simulation.defaultImg + ');'" v-else></div>
									<el-row :gutter="20" class="simulation-text">
										<template v-if="item.racestatus != 41">
											<el-col :span="8">
												<strong class="simulation-text-type1">{{item.dayupdown}}</strong>
												<span>日涨跌幅</span>
											</el-col>
											<el-col :span="8" >
												<strong class="simulation-text-type2">{{item.dayincome}}</strong>
												<span>昨日收益</span>
											</el-col>
											<el-col :span="8">
												<strong class="simulation-text-type3">{{item.totalincomerate}}</strong>
												<span>总收益</span>
											</el-col>
										</template>
										<template v-else>
											<el-col :span="24">
												<p>{{item.raceDesc | strLen(115)}}</p>
											</el-col>
										</template>
									</el-row>
									<div class="simulation-trade">
										当前排名：<span>{{item.ranking}}</span>
										<a @click.stop="jump(item, 'sort')">查看排行榜</a>

										<el-button type="danger" v-for="(acct, index) in item.fuacct" :key="index" @click.stop="trade(item, acct)">{{acct.fuaccttype == 1 ? '竞赛交易' : '期权交易'}}</el-button>
									</div>
								</div>
							</el-col>
						</el-row>
						<div class="empty" v-else>
							未参加任何赛事
						</div>
				    </el-tab-pane>
				    <el-tab-pane :label="tabs.tabs.list.name" name="list">
				    	<div class="search">
				    		<div class="search-l">
				    			<div class="search-item" v-for="(item, index) in tabs.tabs.list.search.condition">
				    				<div class="search-item-type">
				    					{{item.name}}
				    				</div>
				    				<div class="search-item-list">
				    					<span v-for="(data, index) in item.list" @click="changeCondition(data, item.list)" :class="{active: data.isActive}">{{data.name}}</span>
				    				</div>
				    			</div>
								<div class="search-item">
				    				<div class="search-item-type"></div>
				    				<div class="search-item-list">
								        <el-form>
								          <el-form-item>
								            <el-input placeholder="输入比赛名称" v-model="searchVal.racename"></el-input>
								            <el-button type="primary" size="small" class="codeBtn" @click="search">搜索</el-button>
								          </el-form-item>
								        </el-form>
				    				</div>
				    			</div>
				    		</div>
				    		<div class="search-r">
				    			<strong>{{tabs.tabs.list.data.page.responsetotal}}</strong>
				    			<span>比赛总数</span>
				    		</div>
				    	</div>

				    	<div class="list" v-if="tabs.tabs.list.data.list && tabs.tabs.list.data.list.length">
				    		<div class="list-item" v-for="(item, index) in tabs.tabs.list.data.list" @click="jump(item, 'detail')">
				    			<div class="list-item-l" :style="'background-image: url(' + item.url + ');'" v-if="item.url"></div>
				    			<div class="list-item-l" :style="'background-image: url(' + tabs.tabs.list.data.defaultImg + ');'" v-else></div>
				    			<div class="list-item-c">
				    				<h2>{{item.racename}}</h2>
				    				<p><strong>主办方：</strong>{{item.hostunit}}</p>
				    				<p><strong>比赛性质：</strong>{{item.type}}</p>
				    				<p>
				    					<strong>报名状态：</strong>
				    					<template v-if="item.entrystatus == 41">
				    						报名中
				    					</template>
				    					<template v-else-if="item.entrystatus == 40">
				    						临时禁止报名
				    					</template>
				    					<template v-else-if="item.entrystatus == 4999">
				    						报名结束
				    					</template>
				    					<template v-else>
				    						其他状态
				    					</template>
				    				</p>
				    				<p>
				    					<strong>比赛状态：</strong>
										<template v-if="item.racestatus == 41">
				    						比赛中
				    					</template>
				    					<template v-else-if="item.racestatus == 40">
				    						临时闭赛
				    					</template>
				    					<template v-else-if="item.racestatus == 4999">
				    						比赛结束
				    					</template>
				    					<template v-else>
				    						其他状态（等待开赛）
				    					</template>
				    				</p>
				    				<p v-if="item.stustatus != 10">
				    					<strong>我的状态：</strong>
				    					<template v-if="item.stustatus == 0">
				    						未报名
				    					</template>
				    					<template v-else-if="item.stustatus == 1">
				    						已报名（未开赛）
				    					</template>
				    					<template v-else-if="item.stustatus == 2">
				    						比赛中
				    					</template>
				    					<template v-else>
				    						比赛结束
				    					</template>
				    				</p>
				    				<p v-if="item.ranking"><strong>当前排名：</strong>{{item.ranking}}</p>
				    				<p class="mt10"><strong>报名时间：</strong>{{item.entrystarttime}}--{{item.entryendtime}}</p>
				    				<p><strong>比赛时间：</strong>{{item.racestarttime}}--{{item.raceendtime}}</p>
				    			</div>
				    			<div class="list-item-r">
				    				<div>
					    				<el-button class="bt2" @click.stop="jump(item, 'entry')" v-if="item.stustatus != 0">进入我的比赛</el-button>
										<el-button class="bt3" @click.stop="jump(item, 'sort')" v-if="item.stustatus == 2 || item.stustatus == 10">查看赛事排名</el-button>
					    				<el-button class="bt4" @click.stop="openDialog(item)" v-if="item.stustatus == 0">立即参加</el-button>
					    				<el-button type="danger" v-if="item.stustatus == 2" v-for="(acct, index) in item.fuacct" :key="index" @click.stop="trade(item, acct)">{{acct.fuaccttype == 1 ? '竞赛交易' : '期权交易'}}</el-button>
					    			</div>
				    			</div>
				    		</div>
				    		<div class="pager-wrapper">
				    			<el-pagination
								  background
								  layout="prev, pager, next"
								  :total="tabs.tabs.list.data.page.responsetotal" @current-change="changePage" :page-size="searchVal.page.size">
								</el-pagination>
				    		</div>
				    	</div>

				    	<div class="empty" v-else>
							没有符合条件的赛事
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
				</el-tabs>
			</div>
		</div>
	</div>
</template>
<script>
	//行情
	var getHq = function(that) {
		//上证指数、沪深300 行情 
		var shHqPostData = {
		 	serviceid: "snapshot",
			body: {
			  	marketid: "0",
			  	stockcode: ["000001","000300"]
		 	}
		}
		that.$utils.getJson(that.$utils.CONFIG.api.hq, function(res) {
         	if(res.status == 0) {
            	res.data.forEach( function(e, i) {
            		if(shHqPostData.body.stockcode[0] === e.code) {
            			that.lattice[0].value = e.now + '(' + ((e.now-e.close)/e.close*100).toFixed(2) + '%)';
            			that.lattice[0].isFall = e.now-e.close < 0 ? true : false;
            		}
            		if(shHqPostData.body.stockcode[1] === e.code) {
            			that.lattice[3].value = e.now + '(' + ((e.now-e.close)/e.close*100).toFixed(2) + '%)';
            			that.lattice[3].isFall = e.now-e.close < 0 ? true : false;
            		}
            	});
          	}
        }, function() {}, shHqPostData, false)

        //深证指数、创业板指 行情
		var scHqPostData = {
		 	serviceid: "snapshot",
			 	body: {
			  	marketid: "1",
			  	stockcode: ["399001","399006"]
		 	}
		}
		that.$utils.getJson(that.$utils.CONFIG.api.hq, function(res) {
         	if(res.status == 0) {
            	res.data.forEach( function(e, i) {
            		if(scHqPostData.body.stockcode[0] === e.code) {
            			that.lattice[1].value = e.now + '(' + ((e.now-e.close)/e.close*100).toFixed(2) + '%)';
            			that.lattice[1].isFall = e.now-e.close < 0 ? true : false;
            		}
            		if(scHqPostData.body.stockcode[1] === e.code) {
            			that.lattice[2].value = e.now + '(' + ((e.now-e.close)/e.close*100).toFixed(2) + '%)';
            			that.lattice[2].isFall = e.now-e.close < 0 ? true : false;
            		}
            	});
          	}
        }, function() {}, scHqPostData, false)
	}
	//我的模拟赛事
	var getRacelist = function(that) {
		 that.$utils.getJson(that.$utils.CONFIG.api.myRacelist, function(res) {
         	if(res.succflag == 0) {
            	that.tabs.tabs.simulation.dataList = res.data;
          	}else {
          		that.$utils.showTip('error', '', '', res.message);
          	}
        }, function() {}, {}, true, {token: that.$utils.CONFIG.token})
	}
	//赛事列表
	var getList = function(that) {
		 that.$utils.getJson(that.$utils.CONFIG.api.competitionList, function(res) {
         	if(res.succflag == 0) {
            	that.tabs.tabs.list.data.list = res.data.list;
            	that.tabs.tabs.list.data.page = res.page;
          	}else {
          		that.$utils.showTip('error', '', '', res.message);
          	}
        }, function() {}, that.searchVal, true, {token: that.$utils.CONFIG.token})
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
				timer: '',
				swiperOption: {
			        centeredSlides: true,
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
					}
				],
				activity: [
					{
						id: '0',
						name: '深圳稳租金大招：限价租赁房“一年一调”，年租金涨幅不超5％',
						url: require('../assets/images/ac1.png'),
						link: 'https://wallstreetcn.com/articles/3396949'
					},
					{
						id: '1',
						name: '中弘股份上演地天板走势 昨夜称与加多宝协议真实有效',
						url: require('../assets/images/ac2.png'),
						link: 'https://wallstreetcn.com/articles/3396868'
					},
					{
						id: '2',
						name: '腾讯、中国人寿业绩不达预期 内地投资者史上最快速度出逃港股',
						url: require('../assets/images/ac3.png'),
						link: 'https://awtmt.com/articles/3396900?from=wscn'
					},
					{
						id: '3',
						name: '不仅是中国 全球汽车销售都在放缓',
						url: require('../assets/images/ac4.png'),
						link: 'https://wallstreetcn.com/articles/3396840'
					}
				],
				lattice: [
					{
						id: '0',
						name: '上证指数',
						value: '--   --   (--)'
					},
					{
						id: '1',
						name: '深证指数',
						value: '--   --   (--)'
					},
					{
						id: '2',
						name: '创业板指',
						value: '--   --   (--)'
					},
					{
						id: '3',
						name: '沪深300',
						value: '--   --   (--)'
					}
				],
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
				tabs: {
					activeTab: 'simulation',
					tabs: {
						simulation: {
							name: '我的模拟赛事',
							defaultImg: require('../assets/images/img3.png'),
							dataList: []
						},
						list: {
							name: '赛事列表',
							search: {
								condition: [
									{
										name: '市场类型',
										value: 0,
										list: [
											{
												name: '全部',
												value: '',
												type: 'markettype',
												isActive: false
											},
											{
												name: '股票',
												value: '0',
												type: 'markettype',
												isActive: false
											},
											{
												name: '期权',
												value: '1',
												type: 'markettype',
												isActive: false
											}
										]
									},
									{
										name: '参赛人数',
										value: 1,
										list: [
											{
												name: '全部',
												value: '',
												type: 'visitamount',
												isActive: false
											},
											{
												name: '100以内',
												value: '-100',
												type: 'visitamount',
												isActive: false
											},
											{
												name: '100-500',
												value: '100-500',
												type: 'visitamount',
												isActive: false
											},
											{
												name: '500-1000',
												value: '500-1000',
												type: 'visitamount',
												isActive: false
											},
											{
												name: '1000以上',
												value: '1000-',
												type: 'visitamount',
												isActive: false
											}
										]
									},
									{
										name: '赛事状态',
										value: 2,
										list: [
											{
												name: '全部',
												value: '',
												type: 'status',
												isActive: false
											},
											{
												name: '报名中',
												value: '0',
												type: 'status',
												isActive: false
											},
											{
												name: '比赛中',
												value: '1',
												type: 'status',
												isActive: false
											},
											{
												name: '已结束',
												value: '2',
												type: 'status',
												isActive: false
											}
										]
									}
								]
							},
							data: {
								defaultImg: require('../assets/images/img2.png'),
								list: [],
								page: {
									start: 0,
									size: 0,
									responsenum: 0,
									responsetotal: 0
								}
							}
						}
					}
				},
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
				}
			}
		},
		methods: {
			goLink(item) {
				if(!item.link) return;
				this.$router.push({path: '/news', query: {link: item.link}});
			},
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
				var that = this;
				if(!data.isActive) {
					item.forEach(function(e, i) {
						if(data.value == e.value) {
							e.isActive = true;
						}else {
							e.isActive = false;
						}
					})
					that.searchVal[data.type] = data.value;
				}else {
					data.isActive = false;
					that.searchVal[data.type] = '';
				}
				//that.searchVal.racename = '';
				that.searchVal.page.start = 0;
				getList(that);
			},
			search() {
				//if(!this.searchVal.racename) return;
				var that = this;
				that.searchVal.page.start = 0;
				getList(that);
			},
			jump(item, type) {
				switch (type) {
					case 'detail':  //比赛详情
						this.$router.push({ path: '/competition/detail/detail/', query: {data: JSON.stringify(item)}});
						break;
					case 'entry':  //进入我的赛事
						this.$router.push({ path: '/admin/home', query: {raceid: item.usagecode}});
						break;
					case 'sort':   //赛事排名
						this.$router.push({ path: '/competition/detail/sort', query: {data: JSON.stringify(item)}});
						break;
				}
			},
			refreshCode() {
				var that = this;
				getPicCode(that);
			},
			openDialog(item) {
				var that = this;
				that.signUp.dialogFormVisible = true;
				that.signUp.usagecode = item.usagecode;
				that.saveSignData = item;
				getPicCode(that);
			},
			submitForm(formName) {
	            var that = this;
	            that.$refs[formName].validate((valid) => {
	              if (valid) {
	                var signUpData = {
						raceid: that.saveSignData.usagecode,
						verifycode: that.signUp.signUpForm.code,
						objectid: saveRandom
	                }
	                that.$utils.getJson(that.$utils.CONFIG.api.signUp, function(res) {
	                  if(res.succflag == 0) {
	                  	that.$utils.showTip('success', '', '', res.message);
	                  	that.signUp.dialogFormVisible = false;
	                  	getList(that);
	                  }else {
	                    that.$utils.showTip('error', '', '', res.message);
	                  }
	                }, function() {}, signUpData, false, {token: that.$utils.CONFIG.token})
	              } else {
	                return false;
	              }
	            });
	        },
	        changePage(currentPage) {
	        	var that = this;
				that.searchVal.page.start = (currentPage - 1) * that.searchVal.page.size;
				getList(that);
	        }
		},
		created() {
			var that = this;
			//行情
			getHq(that);
            that.timer = setInterval(function() {
            	getHq(that);
            }, 3000)

            //模拟赛
           	getRacelist(that);
            //赛事列表
           	getList(that);
		},
		destroyed: function () {
			clearInterval(this.timer)
		}
	}
</script>
<style lang="scss">
	.competition {
		padding-top: 0;
		.swiper-container {
			width: 100%;
			min-width: 1200px;
			.ad {
				padding-top: 20px;
				padding-bottom: 20px;
				text-align: center;
			}
		}
		.activity {
			margin-top: 10px;
			.el-col {
				position: relative;
				height: 196px;
				background-size: cover;
				cursor: pointer;
				overflow: hidden;
				span {
					position: absolute;
					left: 0;
					bottom: -50px;
					right: 0;
					height: 50px;
					line-height: 50px;
					padding: 0 10px;
					color: #fff;
					font-size: 16px;
					background: rgba(27, 27, 27, .6);
					opacity: 0;
					transition: all .4s;
				}
				&:hover {
					span {
						bottom: 0;
						opacity: 1;
					}
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
					.fall {
						color: #6bca24;
					}
				}
			}
		}
		.competition-body {
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
						cursor: pointer;
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
						cursor: pointer;
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
								cursor: pointer;
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
					//box-shadow: 0 0 2px 2px #ddd;
					background: #fff;
					transition: all .4s;

					&:hover {
						box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
					}

					.list-item-l {
						position: relative;
						width: 360px;
						overflow: hidden;
						background-size: cover;
						&:after {
							content: "";
						    width: 150%;
						    height: 150%;
						    position: absolute;
						    top: 50%;
						    left: 50%;
						    background: radial-gradient(rgba(255,255,255,0.1) 15%, transparent 15%) 0 0, radial-gradient(rgba(255,255,255,0.1) 15%, transparent 15%) 16px 16px, radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px, radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 16px 17px;
						    background-size: 32px 32px;
						    background-color: rgba(0,0,0,0.5);
						    opacity: 0;
						    z-index: 1;
						    transform: translate(-50%, -50%) scale(0);
						    transition: all 0.4s ease 0s;
						    cursor: pointer;
						}
						&:hover:after {
							opacity: 1;
    						transform: translate(-50%, -50%) scale(1);
						}
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
						display: table;
						width: 140px;
						height: 254px;
						text-align: center;
						& > div {
							display: table-cell;
							vertical-align: middle;
						}
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
	    .empty {
	    	text-align: center;
	    	line-height: 200px;
	    	margin-top: 10px;
	    	font-size: 16px;
	    	color: #999;
	    	border: 1px solid #dde1e6;
	    	background: #fff;
	    }
	}
</style>
