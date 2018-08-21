<template>
	<div class="getPwd">
		<div class="getPwd-box">
			<h1>找回密码</h1>
			<el-form :model="getPwdForm" status-icon :rules="getPwdRules" ref="getPwdForm" label-width="120px" class="demo-ruleForm getPwd-form">
			  <el-form-item label="手机号" prop="phone">
			    <el-input v-model="getPwdForm.phone" placeholder="请输入手机号"></el-input>
			  </el-form-item>
			  <el-form-item label="验证码" prop="code" class="code">
			    <el-input v-model="getPwdForm.code" placeholder="请输入验证码"></el-input>
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
			  <el-form-item label="新密码" prop="pass">
			    <el-input type="password" v-model="getPwdForm.pass" auto-complete="off" placeholder="请输入新密码"></el-input>
			  </el-form-item>
			  <el-form-item label="重复新密码" prop="checkPass">
			    <el-input type="password" v-model="getPwdForm.checkPass" auto-complete="off" placeholder="请再次输入新密码"></el-input>
			  </el-form-item>
			  <el-form-item class="getPwd-submit">
			    <el-button @click="submitForm('getPwdForm')">确定</el-button>
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
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
				if (this.getPwdForm.checkPass !== '') {
					this.$refs.getPwdForm.validateField('checkPass');
				}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.getPwdForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				isShowCountDown: false,
				isCodeLoading: false,
				count: '',
				timer: null,
				getPwdForm: {
					phone: '',
					code: '',
					pass: '',
					checkPass: ''
				},
				getPwdRules: {
					phone: [
						{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ validator: checkPhone, trigger: 'blur' }
					],
					code: [
						{ required: true, message: '请输入验证码', trigger: 'blur' },
						{ min: 4, max: 4, message: '请输入4位验证码', trigger: 'blur' }
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
				if (!this.getPwdForm.phone) {
					this.$utils.showTip('error', 'error', '-1010');
					return;
				}
				if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(this.getPwdForm.phone))){
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
				}, {objectid: that.getPwdForm.phone, type: "1"}, false)
			},
			submitForm(formName) {
				var that = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						var getPwdData = {
						 	universitycode: that.$utils.CONFIG.universitycode,
						 	userid: that.getPwdForm.phone,
						 	verifycode: that.getPwdForm.code,
						 	password: that.$utils.sha1(that.getPwdForm.pass)
						}
						that.$utils.getJson(that.$utils.CONFIG.api.getPwd, function(res) {
							if(res.succflag == 0) {
								that.$utils.showTip('error', '', '', res.message);
								that.$refs['getPwdForm'].resetFields();
							}else {
								that.$utils.showTip('error', '', '', res.message);
							}
						}, function() {}, getPwdData)
					} else {
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
	.getPwd {
		.getPwd-box {
			width: 800px;
			padding: 40px 60px 100px 60px;
			margin: 100px auto;
			background: #fff;
			h1 {
				font-size: 18px;
				color: #7d858d;
			}
			.getPwd-form {
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
				.getPwd-submit {
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
