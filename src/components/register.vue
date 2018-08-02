<template>
	<div class="register">
		<div class="register-box">
			<h1>注册账号</h1>
			<el-form :model="registerForm" status-icon :rules="registerRules" ref="registerForm" label-width="120px" class="demo-ruleForm register-form">
			  <el-form-item label="学号" prop="ID">
			    <el-input v-model="registerForm.ID" placeholder="请输入学号"></el-input>
			  </el-form-item>
			  <el-form-item label="姓名" prop="name">
			    <el-input v-model="registerForm.name" placeholder="请输入真实姓名"></el-input>
			  </el-form-item>
			  <el-form-item label="邮箱" prop="email">
			    <el-input v-model="registerForm.email" placeholder="请输入邮箱地址"></el-input>
			  </el-form-item>
			  <el-form-item label="手机号" prop="phone">
			    <el-input v-model="registerForm.phone" placeholder="请输入手机号"></el-input>
			  </el-form-item>
			  <el-form-item label="验证码" prop="code" class="code">
			    <el-input v-model="registerForm.code" placeholder="请输入验证码"></el-input>
			    <el-button>获取验证码</el-button>
			  </el-form-item>
			  <el-form-item label="设置密码" prop="pass">
			    <el-input type="password" v-model="registerForm.pass" auto-complete="off" placeholder="请设置密码"></el-input>
			  </el-form-item>
			  <el-form-item label="再次输入密码" prop="checkPass">
			    <el-input type="password" v-model="registerForm.checkPass" auto-complete="off" placeholder="请再次输入密码"></el-input>
			  </el-form-item>
			  <el-form-item class="register-submit">
			    <el-button @click="submitForm('registerForm')">注册</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	export default {
	    data() {
	      var checkID = (rule, value, callback) => {
	        this.$utils.getJson('/src/assets/data/home/banner.json', function() {

	        })
	      };
	      var checkPhone = (rule, value, callback) => {
	        if (!value) {
	          return callback();
	        }
	        if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(value))){
			  callback(new Error('请正确的手机号码'));
			} else {
			  callback();
			}
	      };
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
	      var validatePass = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请输入密码'));
	        } else {
	          if (this.registerForm.checkPass !== '') {
	            this.$refs.registerForm.validateField('checkPass');
	          }
	          callback();
	        }
	      };
	      var validatePass2 = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请再次输入密码'));
	        } else if (value !== this.registerForm.pass) {
	          callback(new Error('两次输入密码不一致!'));
	        } else {
	          callback();
	        }
	      };
	      return {
	        registerForm: {
	          ID: '',
	          name: '',
	          email: '',
	          phone: '',
	          code: '',
	          pass: '',
	          checkPass: ''
	        },
	        registerRules: {
	          ID: [
	          	{ required: true, message: '请输入学号', trigger: 'blur' },
	          	{ validator: checkID, trigger: 'blur' }
	          ],
	          name: [
	          	{ required: true, message: '请输入真实姓名', trigger: 'blur' }
	          ],
	          email: [
			    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
			  ],
			  phone: [
			    { validator: checkPhone, trigger: 'blur' }
			  ],
			  code: [
			    { validator: checkCode, trigger: 'blur' }
			  ],
	          pass: [
	            { validator: validatePass, trigger: 'blur' }
	          ],
	          checkPass: [
	            { validator: validatePass2, trigger: 'blur' }
	          ]
	        }
	      };
	    },
	    methods: {
	      submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            alert('submit!');
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      },
	      resetForm(formName) {
	        this.$refs[formName].resetFields();
	      }
	    }
	  }
</script>
<style lang="scss">
	.register {
		.register-box {
			width: 800px;
			padding: 40px 60px 100px 60px;
			margin: 100px auto;
			background: #fff;
			h1 {
				font-size: 18px;
				color: #7d858d;
			}
			.register-form {
				padding: 100px 85px;
				font-size: 16px;
				.el-form-item__label {
					color: #999;
					font-size: 16px;
				}
				.el-input {
					font-size: 16px;
				}
				.el-input__inner {
					border: 1px solid #e3e3e3;
				}
				.code {
					.el-input {
						width: 252px;
    					margin-right: 10px;
					}
					.el-button {
						background: #f6f6f6;
						color: #999;
						font-size: 16px;
						border: 1px solid #e3e3e3;
					}
				}
				.register-submit {
					margin-top: 30px;
					.el-button {
						width: 100%;
						height: 56px;
						color: #fff;
						font-size: 16px;
						background: linear-gradient(to right, #dd0a36 , #ff6530);
					}
				}
			}
		}
	}
</style>
