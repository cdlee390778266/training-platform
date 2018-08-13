<template>
	<div>
		<ql-head :nav="nav"></ql-head>
		<div class="admin">
			<transition name="fade">
          		<router-view class="appWrapper"/>
      		</transition>
      	</div>
	</div>
</template>
<script>
	import qlHead from '../common/head.vue'
	export default {
		components: {
			qlHead
		},
		data() {
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
					  		handleData: 'http://yanggang112.51vip.biz:40001/',
					  		isExternalLink: true
					  	},
					  	{
					  		text: '知识库',
					  		handleData: '',
					  		isExternalLink: false
					  	}
					  ],
					  isExternalLink: false
		            },
		            {
		              id: '5',
		              text: '教学课程',
		              iconClass: 'menu-icon5',
		              handle: 'jumpToUrl',
					  handleData: '/curriculum',
					  isExternalLink: false
		            },
  				],
				adminNav: [
					{
	                  text: '个人信息',
	                  data:'/admin/user',
	                  isLink: true
	                },
	                {
	                  text: '绑定邮箱',
	                  data:'/admin/setting',
	                  isLink: true
	                },
	                {
	                  text: '账号设置',
	                  data:'/admin/setting',
	                  isLink: true
	                }
				]
			}
		}
	}
</script>
<style lang="scss">
	.admin {
		position: relative;
	}
</style>
