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
                        <template v-if="data.isBindEmail">
                          <span @click="email.dialogFormVisible = true">{{data.text}}</span>
                        </template>
                        <template v-else>
                          <span>{{data.text}}</span>
                        </template>
                      </template>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </template>
    			</li>
    		</ul>
      </div>
      <!-- 绑定邮箱弹窗 -->
      <el-dialog title="绑定邮箱" :visible.sync="email.dialogFormVisible" class="bindEmail" width="600px">
        <el-form :model="email.emailForm" :rules="email.emailRules" ref="bindEmailForm">
          <el-form-item label="邮箱" :label-width="email.formLabelWidth" prop="email">
            <el-input v-model="email.emailForm.email" placeholder="请输入邮箱地址" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code" class="code" :label-width="email.formLabelWidth">
            <el-input v-model="email.emailForm.code" placeholder="请输入验证码"></el-input>
            <el-button type="danger" size="small" class="codeBtn">获取验证码</el-button>
          </el-form-item>
          <el-form-item :label-width="email.formLabelWidth">
            <el-button type="primary" @click="submitForm('bindEmailForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
  	</div>
</template>
<script>
  	export default {
  		data() {
        var checkCode = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入正确验证码'));
          }
          if(value != '10000'){
            callback(new Error('验证码不正确'));
          } else {
            callback();
          }
        };
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
                  data:'/admin/userinfo',
                  isLink: true
                },
                {
                  text: '绑定邮箱',
                  data:'/admin/setting/email',
                  isBindEmail: true,
                  isLink: false
                },
                {
                  text: '账号设置',
                  data:'/admin/setting',
                  isLink: true
                }
              ],
              isLink: false
  					}
  				],
          email: {
            dialogFormVisible: false,
            formLabelWidth: '120px',
            emailForm: {
              email: '',
              code: '',
            },
            emailRules: {
              email: [
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
              ],
              code: [
                { required: true, message: '请输入验证码', trigger: 'blur' },
                { validator: checkCode, trigger: 'blur' }
              ]
            }
          }
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
          },
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                alert('submit!');
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          }
      }
  	}
</script>
<style lang="scss">
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
                color: #969595;
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
    .bindEmail {
      .el-dialog__header {
        text-align: left;
      }
      .el-form {
        width: 490px;
        margin: 20px auto;
        margin-bottom: 60px;
        .codeBtn {
          position: absolute;
          top: 4px;
          right: 5px;
          background: #e30129;
        }
        .el-button--primary {
          width: 100%;
          margin-top: 20px;
        }
        .el-form-item {
          margin-bottom: 25px;
        }
      }
    }
</style>
