<template>
  	<div class="header">
      <div class="ql-wrapper">
        <div class="ql-nav">
          <ul class="ql-nav-ul">
            <li v-for="item in nav">
              <template v-if="item.handle =='startExe'">
                <div @click="handle(item)">
                  <i class="ql-nav-icon" :class="item.iconClass"></i>
                    <span>{{item.text}}</span>
                </div>
              </template>
              <template v-if="item.handle =='jumpToUrl'">
                <router-link :to="item.handleData" v-if="!item.isExternalLink">
                  <i class="ql-nav-icon" :class="item.iconClass"></i>
                        <span>{{item.text}}</span>
                </router-link>
                <a :href="item.handleData" v-else>
                  <i class="ql-nav-icon" :class="item.iconClass"></i>
                    <span>{{item.text}}</span>
                </a>
              </template>
            </li>
          </ul>
        </div>
    		<ul>
    			<li v-for="(item, index) in header" :key="index">
            <template v-if="item.isLink">
    				    <router-link :to="item.data"><img :src="item.icon"/>{{item.text}}</router-link>
            </template>
            <template v-if="!item.isLink">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    <router-link :to="item.linkUrl"><img :src="item.icon"/>{{item.text}}</router-link>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(data, index) in item.data" :key="index">
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
              linkUrl: '/admin/home',
  						data: [
                {
                  text: '个人信息',
                  data:'/admin/user',
                  isLink: true
                },
                {
                  text: '绑定邮箱',
                  data:'/admin/email',
                  isLink: true
                },
                {
                  text: '个人设置',
                  data:'/admin/setting',
                  isLink: true
                }
              ],
              isLink: false
  					}
  				]
  			}
  		},
      props: ['nav'],
      methods: {
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
    .header {
      height: 36px;
      line-height: 36px;
      min-width: 1400px;
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
    .ql-nav {
      display: inline-block;
      float: left;
      margin-left: 10px;
      transition: all .4s;
      .ql-nav-ul {
        li {
          position: relative;
          height: 36px;
          overflow: hidden;
          &> div, & > a {
            display: block;
            transition: all .4s;
            cursor: pointer;
            &:hover {
              background: #f1f1f1;
            }
            .ql-nav-icon {
              display: inline-block;
              width: 30px;
              height: 30px;
              margin-left: auto;
              margin-right: auto;
              background-image: url(../../assets/images/icons/icons.png);
              transition: background .4s;
              transform: scale(0.8);
              position: relative;
              top: 3px;
              & + span {
                position: relative;
                top: -7px;
              }

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
        }
      }
    }
</style>
