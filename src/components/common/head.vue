<template>
  	<div class="header">
  		<ul>
  			<li v-for="item in header">
  				<router-link :to="item.link"><img :src="item.icon"/>{{item.text}}</router-link>
  			</li>
  		</ul>
  	</div>
</template>
<script>
  	export default {
  		data() {
  			return {
  				header: [
  					{
  						text: '个人中心',
  						icon: require('../../assets/images/icons/head-icon1.png'),
  						link: '/'
  					},
  					{
  						text: '我的消息',
  						icon: require('../../assets/images/icons/head-icon2.png'),
  						link: '/'
  					}
  				]
  			}
  		}
  	}
</script>
<style scoped lang="scss">
    .header {
      height: 36px;
      line-height: 36px;
      border-bottom: 1px solid #e1e4e8;
      text-align: right;
      background: #f7fbff;
      ul {
        li {
          display: inline-block;
          margin-right: 20px;
          font-size: 12px;
          font-weight: bold;
          a {
            color: #969595;
          }
          img {
            position: relative;
            top: 3px;
            margin-right: 5px;
          }
        }
      }
    }
</style>
