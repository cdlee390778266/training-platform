<template>
  	<div class="header">
  		<ul>
  			<li v-for="item in header">
          <template v-if="item.isLink">
  				    <router-link :to="item.data"><img :src="item.icon"/>{{item.text}}</router-link>
          </template>
          <template v-if="!item.isLink">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <img :src="item.icon"/>{{item.text}}
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="data in item.data">
                    <template v-if="data.isLink">
                      <router-link :to="data.data">{{data.text}}</router-link>
                    </template>
                    <template v-if="!data.isLink">
                      <span>{{data.text}}</span>
                    </template>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
          </template>
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
  						text: '我的消息',
  						icon: require('../../assets/images/icons/head-icon1.png'),
  						data: '/msgcenter',
              isLink: true
  					},
  					{
  						text: '个人中心',
  						icon: require('../../assets/images/icons/head-icon2.png'),
  						data: [
                {
                  text: '个人信息',
                  data:'/admin/user',
                  isLink: true
                },
                {
                  text: '账号设置',
                  data:'/admin/setting',
                  isLink: true
                },
                {
                  text: '退出',
                  data:'',
                  isLink: false
                }
              ],
              isLink: false
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
