<template>
	<div class="curriculum">
		<div class="ql-wrapper">
			<div class="curriculum-body">
				<div class="list">
					<div class="search">
			    		<div class="search-l">
			    			<div class="search-item" v-for="(item, index) in curriculum.search.condition">
			    				<div class="search-item-type">
			    					{{item.name}}
			    				</div>
			    				<div class="search-item-list">
			    					<span v-for="(data, index) in item.list" :class="{active: data.isActive}">{{data.name}}</span>
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
			    		<div class="list-item" v-for="(item, index) in curriculum.dataList">
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
			    				<router-link :to="'/curriculum/detail/detail/' + item.id" class="bt1">查看赛事详情</router-link>
			    				<router-link :to="'f'" class="bt2">进入我的比赛</router-link>
			    				<router-link :to="'/curriculum/detail/sort/' + item.id" class="bt3">查看赛事排名</router-link>
			    				<router-link :to="'f'" class="bt4">立即参加</router-link>
			    			</div>
			    		</div>
			    		<div class="pager-wrapper">
			    			<el-pagination
							  background
							  layout="prev, pager, next"
							  :total="1000">
							</el-pagination>
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
				curriculum: {
					search: {
						searchVal: '',
						condition: [
							{
								name: '课程老师',
								value: 0,
								list: [
									{
										name: '全部',
										value: '00',
										isActive: true
									},
									{
										name: '张老师',
										value: '01'
									},
									{
										name: '王老师',
										value: '02'
									}
								]
							},
							{
								name: '课程类型',
								value: 1,
								list: [
									{
										name: '全部',
										value: '10'
									},
									{
										name: '沪深A股',
										value: '11'
									},
									{
										name: '期权',
										value: '12'
									}
								]
							},
							{
								name: '课程状态',
								value: 2,
								list: [
									{
										name: '全部',
										value: '20'
									},
									{
										name: '开课程',
										value: '21'
									},
									{
										name: '已结束',
										value: '22'
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
</script>
<style lang="scss">
	.curriculum {
		padding-top: 0;
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
						line-height: 30px;
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
	}
</style>
