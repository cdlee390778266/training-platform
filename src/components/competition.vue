<template>
	<div class="competition">
		<swiper :options="swiperOption" ref="mySwiper">
		    <swiper-slide v-for="(item, index) in ads" :key="index">
		    	<img :src="item.url" class="img-responsive">
		    </swiper-slide>
		</swiper>
		<div class="ql-wrapper">
			<el-row class="activity">
				<el-col :span="6" v-for="(item, index) in activity" :key="index" :style="'background-image: url(' + item.url + ');'">
					<span>{{item.name}}</span>
				</el-col>
			</el-row>
			<el-row class="lattice" :gutter="20">
				<el-col :span="6" v-for="(item, index) in lattice" :key="index">
					<div>
						<h2>{{item.name}}</h2>
						<strong>{{item.value}}</strong>
					</div>
				</el-col>
			</el-row>
			<div class="competition-body">
				<el-tabs v-model="tabs.activeTab">
				    <el-tab-pane :label="tabs.tabs.simulation.name" name="simulation">
				    	<el-row :gutter="20">
							<el-col :span="12" v-for="(item, index) in tabs.tabs.simulation.dataList" :key="index">
								<div class="simulation-item">
									<div class="simulation-bar">{{item.name}} <router-link :to="'/competition/detail/detail/' + item.id">查看详情</router-link></div>
								
									<div class="simulation-img" :style="'background-image: url(' + item.url + ');'"></div>
									<el-row :gutter="20" class="simulation-text">
										<el-col :span="8">
											<strong class="simulation-text-type1">{{item.day}}</strong>
											<span>日涨跌幅</span>
										</el-col>
										<el-col :span="8" >
											<strong class="simulation-text-type2">{{item.yesterday}}</strong>
											<span>昨日收益</span>
										</el-col>
										<el-col :span="8">
											<strong class="simulation-text-type3">{{item.total}}</strong>
											<span>总收益</span>
										</el-col>
									</el-row>
									<div class="simulation-trade">
										当前排名： 
										<router-link :to="'f'">查看排行榜</router-link>
										<el-button type="danger">去交易</el-button>
									</div>
								</div>
							</el-col>
						</el-row>
				    </el-tab-pane>
				    <el-tab-pane :label="tabs.tabs.list.name" name="list">
				    	<div class="search">
				    		<div class="search-l">
				    			<div class="search-item" v-for="(item, index) in tabs.tabs.list.search.condition">
				    				<div class="search-item-type">
				    					{{item.name}}
				    				</div>
				    				<div class="search-item-list">
				    					<span v-for="(data, index) in item.list">{{data.name}}</span>
				    				</div>
				    			</div>
								<div class="search-item">
				    				<div class="search-item-type"></div>
				    				<div class="search-item-list">
								        <el-form>
								          <el-form-item>
								            <el-input placeholder="输入比赛名称"></el-input>
								            <el-button type="primary" size="small" class="codeBtn">搜索</el-button>
								          </el-form-item>
								        </el-form>
				    				</div>
				    			</div>
				    		</div>
				    		<div class="search-r">
				    			<strong>16</strong>
				    			<span>比赛总数</span>
				    		</div>
				    	</div>
				    	<div class="list">
				    		<div class="list-item" v-for="(item, index) in tabs.tabs.list.dataList">
				    			<div class="list-item-l" :style="'background-image: url(' + item.url + ');'"></div>
				    			<div class="list-item-c">
				    				<h2>{{item.name}}</h2>
				    				<p><strong>主办方：</strong>{{item.host}}</p>
				    				<p><strong>比赛性质：</strong>{{item.type}}</p>
				    				<p><strong>报名状态：</strong>{{item.signUpStatus}}</p>
				    				<p><strong>比赛状态：</strong>{{item.matchDateStatus}}</p>
				    				<p v-if="item.sort"><strong>当前排名：</strong>{{item.sort}}</p>
				    				<p class="mt10"><strong>报名时间：</strong>{{item.signUpDate}}</p>
				    				<p><strong>比赛时间：</strong>{{item.matchDate}}</p>
				    			</div>
				    			<div class="list-item-r">
				    				<router-link :to="'/competition/detail/detail/' + item.id" class="bt1">查看赛事详情</router-link>
				    				<router-link :to="'f'" class="bt2">进入我的比赛</router-link>
				    				<router-link :to="'/competition/detail/sort/' + item.id" class="bt3">查看赛事排名</router-link>
				    				<router-link :to="'f'" class="bt4">立即参加</router-link>
				    			</div>
				    		</div>
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
				activity: [
					{
						id: '0',
						name: '人脸识别迎重磅利好 2股望受益',
						url: require('../assets/images/img1.png'),
						link: ''
					},
					{
						id: '1',
						name: '人脸识别迎重磅利好 2股望受益',
						url: require('../assets/images/img1.png'),
						link: ''
					},
					{
						id: '2',
						name: '人脸识别迎重磅利好 2股望受益',
						url: require('../assets/images/img1.png'),
						link: ''
					},
					{
						id: '3',
						name: '人脸识别迎重磅利好 2股望受益',
						url: require('../assets/images/img1.png'),
						link: ''
					}
				],
				lattice: [
					{
						id: '0',
						name: '上证指数',
						value: '2773.62   -13.64   (-0.49%)'
					},
					{
						id: '1',
						name: '深证指数',
						value: '2773.62   -13.64   (-0.49%)'
					},
					{
						id: '2',
						name: '创业板指',
						value: '2773.62   -13.64   (-0.49%)'
					},
					{
						id: '3',
						name: '沪深300',
						value: '2773.62   -13.64   (-0.49%)'
					}
				],
				tabs: {
					activeTab: 'simulation',
					tabs: {
						simulation: {
							name: '我的模拟赛事',
							dataList: [
								{
									id: '0',
									name: '2018四川模拟炒股大赛',
									url: require('../assets/images/img3.png'),
									day: '-0.49%',
									yesterday: '-15.023%',
									total: '11.3125',
									level: 25
								},
								{
									id: '0',
									name: '2018四川模拟炒股大赛',
									url: require('../assets/images/img3.png'),
									day: '-0.49%',
									yesterday: '-15.023%',
									total: '11.3125',
									level: 25
								},
								{
									id: '0',
									name: '2018四川模拟炒股大赛',
									url: require('../assets/images/img3.png'),
									day: '-0.49%',
									yesterday: '-15.023%',
									total: '11.3125',
									level: 25
								}
							]
						},
						list: {
							name: '赛事列表',
							search: {
								searchVal: '',
								condition: [
									{
										name: '市场类型',
										value: 0,
										list: [
											{
												name: '全部',
												value: '00'
											},
											{
												name: '股票',
												value: '01'
											},
											{
												name: '期权',
												value: '02'
											}
										]
									},
									{
										name: '参赛人数',
										value: 1,
										list: [
											{
												name: '全部',
												value: '10'
											},
											{
												name: '100以内',
												value: '11'
											},
											{
												name: '100-500',
												value: '12'
											},
											{
												name: '1000以上',
												value: '13'
											}
										]
									},
									{
										name: '赛事状态',
										value: 2,
										list: [
											{
												name: '全部',
												value: '20'
											},
											{
												name: '报名中',
												value: '21'
											},
											{
												name: '比赛中',
												value: '22'
											},
											{
												name: '已结束',
												value: '23'
											}
										]
									}
								]
							},
							dataList: [
								{
									id: '0',
									url: require('../assets/images/img2.png'),
									name: '西南财经大学模拟炒股大赛',
									host: '西南财经大学',
									type: '公开赛',
									signUpStatus: '进行中',
									matchDateStatus: '报名中',
									signUpDate: '2018-06-28--2018-09-10',
									matchDate: '2018-06-28--2018-09-10'
								},
								{
									id: '0',
									url: require('../assets/images/img2.png'),
									name: '西南财经大学模拟炒股大赛',
									host: '西南财经大学',
									type: '公开赛',
									signUpStatus: '进行中',
									matchDateStatus: '报名中',
									signUpDate: '2018-06-28--2018-09-10',
									matchDate: '2018-06-28--2018-09-10'
								},
								{
									id: '0',
									url: require('../assets/images/img2.png'),
									name: '西南财经大学模拟炒股大赛',
									host: '西南财经大学',
									type: '公开赛',
									signUpStatus: '进行中',
									matchDateStatus: '报名中',
									sort: 100,
									signUpDate: '2018-06-28--2018-09-10',
									matchDate: '2018-06-28--2018-09-10'
								},
								{
									id: '0',
									url: require('../assets/images/img2.png'),
									name: '西南财经大学模拟炒股大赛',
									host: '西南财经大学',
									type: '公开赛',
									signUpStatus: '进行中',
									matchDateStatus: '报名中',
									signUpDate: '2018-06-28--2018-09-10',
									matchDate: '2018-06-28--2018-09-10'
								},
								{
									id: '0',
									url: require('../assets/images/img2.png'),
									name: '西南财经大学模拟炒股大赛',
									host: '西南财经大学',
									type: '公开赛',
									signUpStatus: '进行中',
									matchDateStatus: '报名中',
									signUpDate: '2018-06-28--2018-09-10',
									matchDate: '2018-06-28--2018-09-10'
								}
							]
						}
					}
				}
			}
		}
	}
</script>
<style lang="scss">
	.competition {
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
					}
				}
				.simulation-img {
					margin: 20px 0;
					height: 210px;
					background-size: cover;
				}
				.simulation-text {
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
					.el-button--danger {
						float: right;
						background: #e30129;
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
					height: 256px;
					margin-top: 10px;
					padding: 20px;
					border: 1px solid #dde1e6;
					background: #fff;
					.list-item-l {
						width: 320px;
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
						a {
							display: inline-block;
							width: 110px;
							height: 40px;
							line-height: 40px;
							text-align: center;
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
	}
</style>
