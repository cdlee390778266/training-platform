<template>
	<div class="home">
		<ql-head></ql-head>
		<div class="home-body">
			<ul id="home-wrapper">
				<li v-for="item in home" @click="handle(item)"><img :src="item.icon" class="homeImg" width="80">{{item.text}}</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import qlHead from './common/head.vue'
	export default {
		components: {
			qlHead
		},
		data() {
			return {
				home: [
  					{
  						text: '投资竞赛',
  						icon: require('../assets/images/icons/exe-icon1.png'),
  						handle: 'jumpToUrl',
  						handleData: '/competition',
  						isExternalLink: false
  					},
  					{
  						text: '期权行情',
  						icon: require('../assets/images/icons/exe-icon2.png'),
  						handle: 'startExe',
  						handleData: 'option',
  						isExternalLink: false
  					},
  					{
  						text: '股票行情',
  						icon: require('../assets/images/icons/exe-icon3.png'),
  						handle: 'startExe',
  						handleData: 'shares',
  						isExternalLink: false
  					},
  					{
  						text: '策略选股',
  						icon: require('../assets/images/icons/exe-icon4.png'),
  						handle: 'jumpToUrl',
  						handleData: '/stockselection' ,
  						isExternalLink: false
  					},
  					{
  						text: '云课堂',
  						icon: require('../assets/images/icons/exe-icon5.png'),
  						handle: 'jumpToUrl',
  						handleData: '/live' ,
  						isExternalLink: false
  					},
  					{
  						text: '教学课程',
  						icon: require('../assets/images/icons/exe-icon6.png'),
  						handle: 'jumpToUrl',
  						handleData: '/curriculum' ,
  						isExternalLink: false
  					}
  				]
			}
		},
		methods: {
			handle(item) {
				if(item.handle == 'jumpToUrl') {
					if(item.isExternalLink) {
						window.location.href = item.handleData;
					}else {
						this.$router.push(item.handleData)
					}
				}else if(item.handle == 'startExe') {
					var json = {
						method: 'startexe',
						data: {
							type:'quotes',
							exeName: item.handleData,
							account: item.handleData == 'option' ? this.$utils.CONFIG.mainAccount2.acct : this.$utils.CONFIG.mainAccount1.acct
						}
					}
					this.$utils.handleExe(json, function(){}, function(){})
				}
			}
		},
		created() {
			this.$utils.refreshLoginData(this);
			document.onmousemove=function(ev){
		       var oevent= ev||event;
		       var aimg= document.getElementsByClassName('homeImg');
		       var odiv= document.getElementById('home-wrapper');
		       for(var i=0;i<aimg.length;i++){
		              var x=aimg[i].offsetLeft+aimg[i].offsetWidth/2;
		              var y=aimg[i].offsetTop+odiv.offsetTop+aimg[i].offsetHeight/2;
		              var a=x-oevent.clientX;
		              var b=y-oevent.clientY;
		              var dis=parseInt(Math.sqrt(a*a+b*b));
		              var scale=1-dis/200;
		            if(scale<0.5){
		                scale=0.5;
		            }
		            aimg[i].width=scale*160;
		       }
		   }
		}
	}
</script>

<style scoped lang="scss">
  .home {
  	min-height: 788px;
  	background: url(../assets/images/bg.png);
  	background-size: cover;
  	.home-body {
		position: relative;
		padding-top: 600px;
		height: 260px;
  		ul {
  			text-align: center;
  			li {
  				display: inline-block;
  				margin: 0 30px;
  				cursor: pointer;
  				img {
  					display: block;
  					margin-bottom: 26px;
  				}
  			}
  		}
  	}
  }
#home-wrapper{position: absolute;left: 0; right: 0;bottom: 100px;text-align: center;width: 100%;}
</style>
