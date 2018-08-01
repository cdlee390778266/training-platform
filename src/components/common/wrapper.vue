<template>
	<div class="wrapper">
		<ql-head></ql-head>
		<div class="ql-container" :class="{ menuCollapse: isCollapse}">
	        <div class="ql-menu">
	        	<ul class="ql-menu-ul">
			        <li v-for="item in menu">
			        	<router-link :to="item.link">
			        		<i class="ql-menu-icon" :class="item.iconClass"></i>
			            	<span>{{item.text}}</span>
			        	</router-link>
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
  						link: '/competition'
  					},
		            {
		              id: '1',
		              text: '期权行情',
		              iconClass: 'menu-icon2',
		              link: '/optionsmarket'
		            },
		            {
		              id: '2',
		              text: '股票行情',
		              iconClass: 'menu-icon3',
		              link: '/stockmarket'
		            },
		            {
		              id: '3',
		              text: '策略选股',
		              iconClass: 'menu-icon4',
		              link: '/stockselection'
		            },
		            {
		              id: '4',
		              text: '云课堂',
		              iconClass: 'menu-icon5',
		              link: '/live'
		            }
  				],
          		isCollapse: false
  			}
  		},
      	methods: {
	        toggleMenu(key, keyPath) {
	          this.isCollapse = !this.isCollapse;
	          console.log(key, keyPath);
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
					a {
						display: block;
						padding-top: 10px;
						padding-bottom: 10px;
						transition: all .4s;
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
