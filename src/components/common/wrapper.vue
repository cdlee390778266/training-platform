<template>
	<div class="wrapper">
		<ql-head></ql-head>
		<div class="ql-container" :class="{ menuCollapse: isCollapse}">
	        <div class="ql-menu">
	        	<ul class="ql-menu-ul">
			        <li v-for="item in menu">
			        	<template v-if="item.handle =='startExe'">
				        	<div @click="handle(item)">
				        		<i class="ql-menu-icon" :class="item.iconClass"></i>
				            	<span>{{item.text}}</span>
				            	<el-tooltip class="item" effect="dark" :content="item.text" placement="right">
							      <el-button></el-button>
							    </el-tooltip>
				        	</div>
			        	</template>
						<template v-if="item.handle =='jumpToUrl'">
							<router-link :to="item.handleData">
				        		<i class="ql-menu-icon" :class="item.iconClass"></i>
				            	<span>{{item.text}}</span>
				            	<el-tooltip class="item" effect="dark" :content="item.text" placement="right">
							      <el-button></el-button>
							    </el-tooltip>
				        	</router-link>
						</template>
			        </li>
		        </ul>
	          <div class="toggleMenu" @click="toggleMenu"><i class="el-icon-arrow-left"></i></div>
	        </div>
		  	<div class="ql-right-view">
		  		<router-view/>
		  	</div>
		</div>
	</div>
</template>
<script>
	import qlHead from './head.vue'
	export default {
		components: {
			qlHead
		},
  		data() {
  			return {
  				menu: [
  					{
  						id: '0',
  						text: '投资竞赛',
  						iconClass: 'menu-icon1',
  						handle: 'jumpToUrl',
  						handleData: '/competition'
  					},
		            {
		              id: '1',
		              text: '期权行情',
		              iconClass: 'menu-icon2',
		              handle: 'startExe',
  					  handleData: 'option'
		            },
		            {
		              id: '2',
		              text: '股票行情',
		              iconClass: 'menu-icon3',
		              handle: 'startExe',
  					  handleData: 'shares'
		            },
		            {
		              id: '3',
		              text: '策略选股',
		              iconClass: 'menu-icon4',
		              handle: 'jumpToUrl',
  					  handleData: '/stockselection'
		            },
		            {
		              id: '4',
		              text: '云课堂',
		              iconClass: 'menu-icon5',
		              handle: 'jumpToUrl',
  					  handleData: '/live'
		            }
  				],
          		isCollapse: false
  			}
  		},
      	methods: {
	        toggleMenu(key, keyPath) {
	          this.isCollapse = !this.isCollapse;
	          console.log(key, keyPath);
	        },
	        handle(item) {
				if(item.handle == 'jumpToUrl') {
					this.$router.push(item.handleData)
				}else if(item.handle == 'startExe') {
					var json = {
						method: 'startexe',
						data: {
							type:'quotes',
							exeName: item.handleData
						}
					}
					this.$utils.handleExe(json, function(){}, function(){})
				}
			}
      	}
  	}
</script>

<style scoped lang="scss">
	.ql-container {
		.ql-menu {
			position: absolute;
			top: 37px;
			left: 0;
			bottom: 0;
			width: 120px;
			padding-top: 30px;
			padding-bottom: 30px;
			text-align: center;
			background: #fff;
			transition: all .4s;
			.ql-menu-ul {
				li {
					position: relative;
					&> div, & > a {
						display: block;
						padding-top: 10px;
						padding-bottom: 10px;
						transition: all .4s;
						cursor: pointer;
						&:hover {
							background: #f1f1f1;
						}
						.ql-menu-icon {
							display: block;
							width: 30px;
							height: 30px;
							margin-left: auto;
							margin-right: auto;
							background-image: url(../../assets/images/icons/icons.png);
							transition: background .4s;

							&.menu-icon1 {
								background-position: -2px -3px;
							}
							&.menu-icon2 {
								background-position: -3px -69px;
							}
							&.menu-icon3 {
								background-position: -3px -139px;
							}
							&.menu-icon4 {
								background-position: -3px -208px;
							}
							&.menu-icon5 {
								background-position: -5px -273px;
							}
						}
						&.active {
							background: #f1f4f7;
							.menu-icon1 {
								background-position: -45px -3px;
							}
							.menu-icon2 {
								background-position: -45px -69px;
							}
							.menu-icon3 {
								background-position: -45px -139px;
							}
							.menu-icon4 {
								background-position: -47px -208px;
							}
							.menu-icon5 {
								background-position: -48px -273px;
							}
						}
					}
					.el-tooltip {
						display: none;
						position: absolute;
						top: 20px;
						right: 0;
						bottom: 0;
						left: 0;
						opacity: 0;
					}
				}
			}
			.toggleMenu {
				position: absolute;
				top: 50%;
				right: -30px;
				width: 30px;
				height: 150px;
				text-align: center;
				line-height: 150px;
				font-size: 20px;
				margin-top: -75px;
				border-top-right-radius: 12px;
				border-bottom-right-radius: 12px;
				background: #fff;
				cursor: pointer;
			}
		}
		.ql-right-view {
			padding-left: 160px;
		}
		&.menuCollapse {
			.ql-menu {
				width: 46px;
				.ql-menu-ul li {
					span {
						display: none;
					}
					.el-tooltip {
						display: block;
					}
				}
				.el-icon-arrow-left {
					transform:rotate(180deg);
					-ms-transform:rotate(180deg);
					-moz-transform:rotate(180deg);
					-webkit-transform:rotate(180deg);
					-o-transform:rotate(180deg);
				}
			}
			.ql-right-view {
				padding-left: 80px;
			}
		}
	}
</style>
