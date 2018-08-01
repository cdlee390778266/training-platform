<template>
	<div class="home">
		<ql-head></ql-head>
		<div class="home-body">
			<ul id="home-wrapper">
				<li v-for="item in home" @click="startExe(item)"><img :src="item.icon" class="homeImg" width="64px">{{item.text}}</li>
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
  						link: '/'
  					},
  					{
  						text: '期权行情',
  						icon: require('../assets/images/icons/exe-icon2.png'),
  						link: '/'
  					},
  					{
  						text: '股票行情',
  						icon: require('../assets/images/icons/exe-icon3.png'),
  						link: '/'
  					},
  					{
  						text: '策略选股',
  						icon: require('../assets/images/icons/exe-icon4.png'),
  						link: '/'
  					},
  					{
  						text: '云课堂',
  						icon: require('../assets/images/icons/exe-icon5.png'),
  						link: '/'
  					}
  				]
			}
		},
		methods: {
			startExe(item) {
				console.log(item);
				window.cefQuery({
				    request: JSON.stringify({"v1":1,"v2":2,"v3":{"a":"ffffff"}}),
				    onSuccess: function(response) {
				      alert(response);
				    },
				    onFailure: function(error_code, error_message) {
				    	alert(error_code);
				    }
				})
			}
		},
		created() {
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
		            aimg[i].width=scale*128;
		       }
		   }
		}
	}
</script>

<style scoped lang="scss">
  .home {
  	.home-body {
		position: relative;
		padding-top: 412px;
		height: 260px;
  		ul {
  			text-align: center;
  			li {
  				display: inline-block;
  				margin: 0 20px;
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
