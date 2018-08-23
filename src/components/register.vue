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
			  <el-form-item label="手机号" prop="phone">
			    <el-input v-model="registerForm.phone" placeholder="请输入手机号"></el-input>
			  </el-form-item>
			  <el-form-item label="验证码" prop="code" class="code">
			    <el-input v-model="registerForm.code" placeholder="请输入验证码"></el-input>
			    <el-button @click="getCode" :disabled="isShowCountDown">
			    	<template v-if="!isShowCountDown">
			    		<span v-if="isCodeLoading"><i class="el-icon-loading"></i>加载中</span>
			    		<span v-else>获取验证码</span>
			    	</template>
			    	<template v-else>
			    		{{count}}s
			    	</template>
				</el-button>
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
	var saveCode = '';
	export default {
		data() {
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
				if(value != saveCode){
					//callback(new Error('验证码不正确'));
					callback();
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
				univerCode: '',
				isShowCountDown: false,
				isCodeLoading: false,
				count: '',
				timer: null,
				registerForm: {
					ID: '',
					name: '',
					phone: '',
					code: '',
					pass: '',
					checkPass: ''
				},
				registerRules: {
					ID: [
						{ required: true, message: '请输入学号', trigger: 'blur' }
					],
					name: [
						{ required: true, message: '请输入真实姓名', trigger: 'blur' }
					],
					phone: [
						{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ validator: checkPhone, trigger: 'blur' }
					],
					code: [
						{ required: true, message: '请输入验证码', trigger: 'blur' },
						{ validator: checkCode, trigger: 'blur' }
					],
					pass: [
						{ required: true, message: '请设置密码', trigger: 'blur' },
						{ validator: validatePass, trigger: 'blur' }
					],
					checkPass: [
						{ required: true, message: '请再次输入密码', trigger: 'blur' },
						{ validator: validatePass2, trigger: 'blur' }
					]
				}
			};
		},
		methods: {
			getCode() {
				if (!this.registerForm.phone) {
					this.$utils.showTip('error', 'error', '-1010');
					return;
				}
				if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(this.registerForm.phone))){
					this.$utils.showTip('error', 'error', '-1011');
					return;
				}
				if(this.isCodeLoading) {
					return;
				}
				this.isCodeLoading = true;
				var that = this;
				var timeCount = this.$utils.CONFIG.codeTime;
				that.$utils.getJson(that.$utils.CONFIG.api.code, function(res){
					if(res.succflag == 0) {
						saveCode = res.data;
						if (!that.timer) {
							that.count = timeCount;
							that.isShowCountDown = true;
							that.timer = setInterval(() => {
								if (that.count > 0 && that.count <= timeCount) {
								that.count--;
								} else {
									that.isShowCountDown = false;
									clearInterval(that.timer);
									that.timer = null;
								}
							}, 1000)
						}
					}else {
						that.$utils.showTip('error', 'error', '-1012');
					}
					that.isCodeLoading = false;
				}, function() {
					that.isCodeLoading = false;
				}, {objectid: that.registerForm.phone, type: "1"}, false)
			},
			submitForm(formName) {
				var that = this;
				var universitycode;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						var registerData = {
						 	universitycode: that.univerCode,
						 	studentid: that.registerForm.ID,
						 	realname: that.registerForm.name,
						 	mobile: that.registerForm.phone,
						 	verifycode: that.registerForm.code,
						 	password: that.$utils.sha1(that.registerForm.pass)
						}
						that.$utils.getJson(that.$utils.CONFIG.api.register, function(res) {
							if(res.succflag == 0) {
								that.$utils.showTip('success', '', '', res.message);
								that.$refs['registerForm'].resetFields();
							}else {
								that.$utils.showTip('error', '', '', res.message);
							}
						}, function() {

						}, registerData)
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		},
		created() {
			var jqueryArr = location.href.split('?')[1].split('&');
			for(var i = 0; i < jqueryArr.length; i++) {
				var arr = jqueryArr[i].split('=');
				if(arr[0] == 'UniverCode') {
					this.univerCode = arr[1];
					break;
				}
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
						width: 122px;
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
