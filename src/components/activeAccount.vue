<template>
	<div class="activeAccount">
		<div class="activeAccount-box">
			<h1>激活账号</h1>
			<el-form :model="activeAccountForm" status-icon :rules="activeAccountRules" ref="activeAccountForm" label-width="120px" class="demo-ruleForm activeAccount-form">
			  <el-form-item label="学号" prop="ID">
			    <el-input v-model="activeAccountForm.ID" placeholder="请输入学号"></el-input>
			  </el-form-item>
			  <el-form-item label="手机号" prop="phone">
			    <el-input v-model="activeAccountForm.phone" placeholder="请输入手机号"></el-input>
			  </el-form-item>
			  <el-form-item label="验证码" prop="code" class="code">
			    <el-input v-model="activeAccountForm.code" placeholder="请输入验证码"></el-input>
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
			  <el-form-item class="activeAccount-submit">
			    <el-button @click="submitForm('activeAccountForm')">激活</el-button>
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
				if (this.activeAccountForm.checkPass !== '') {
					this.$refs.activeAccountForm.validateField('checkPass');
				}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.activeAccountForm.pass) {
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
				activeAccountForm: {
					ID: '',
					phone: '',
					code: ''
				},
				activeAccountRules: {
					ID: [
						{ required: true, message: '请输入学号', trigger: 'blur' }
					],
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
				if (!this.activeAccountForm.phone) {
					this.$utils.showTip('error', 'error', '-1010');
					return;
				}
				if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(this.activeAccountForm.phone))){
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
						this.$utils.showTip('error', 'error', '-1012');
					}
					that.isCodeLoading = false;
				}, function() {
					that.isCodeLoading = false;
				}, {objectid: that.activeAccountForm.phone, type: "1"}, false)
			},
			submitForm(formName) {
				var that = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						var activeAccountData = {
						 	universitycode: that.$utils.CONFIG.universitycode,
						 	userid: that.activeAccountForm.phone,
						 	verifycode: that.activeAccountForm.code,
						 	studentid: that.activeAccountForm.ID
						}
						that.$utils.getJson(that.$utils.CONFIG.api.activeAccount, function(res) {
							if(res.succflag == 0) {
								that.$utils.showTip('error', '', '', res.message);
								that.$refs['activeAccountForm'].resetFields();
							}else {
								that.$utils.showTip('error', '', '', res.message);
							}
						}, function() {}, activeAccountData)
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
	.activeAccount {
		.activeAccount-box {
			width: 1200px;
			padding: 40px 60px 100px 60px;
			margin: 100px auto;
			background: #fff;
			h1 {
				font-size: 18px;
				color: #7d858d;
			}
			.activeAccount-form {
				padding: 100px 0px;
				font-size: 16px;
				width: 430px;
				margin: 0 auto;
				.el-form-item__label {
					color: #999;
					font-size: 16px;
				}
				.el-form-item {
					margin-bottom: 18px;
				}
				.el-input {
					font-size: 16px;
					input {
						width: 300px;
					}
				}
				.el-input__inner {
					border: 1px solid #e3e3e3;
				}
				.el-input__suffix {
					right: 15px;
				}
				.code {
					.el-input {
						width: 180px;
    					margin-right: 10px;
    					input {
    						width: 100%;
    					}
					}
					.el-button {
						width: 106px;
						color: #999;
						font-size: 16px;
						padding-left: 0;
						padding-right: 0;
						text-align: center;
						border: 1px solid #e3e3e3;
						background: #f6f6f6;
					}
					.el-input__suffix {
						right: 5px;
					}
				}
				.activeAccount-submit {
					margin-top: 30px;
					.el-button {
						width: 100%;
						height: 56px;
						color: #fff;
						font-size: 16px;
						background: linear-gradient(to right, #dd0a36 , #ff6530);
					}
				}
				.el-form-item__error {
					position: absolute;
					left: 320px;
					top: 3px;
					height: 36px;
					line-height: 36px;
					word-break:keep-all;
					white-space:nowrap;
					padding: 0 25px;
					color: #999999;
					border-radius: 10px;
					box-shadow: 0 2px 12px 5px #e8edf2;
					&:before {
						content: '';
						position: absolute;
						left: 10px;
						top: 15px;
						display: block;
						width: 7px;
						height: 7px;
						background: url('../assets/images/icons/error-icon.png') no-repeat;
					}
					&:after {
						content: '';
						position: absolute;
						left: -3px;
    					top: 11px;
						display: block;
						width: 0px;
						height: 0px;
						border-right: 8px  solid transparent;
						border-top: 8px  solid transparent;
						border-left: 8px  solid #fff;
						border-bottom: 8px  solid #fff;
						transform: rotate(45deg);
					}
				}
				.el-form-item.is-error .el-input__validateIcon {
					color: #fb6333;
				}
				.el-form-item.is-success .el-input__validateIcon {
					color: #90c321;
				}
				.el-input__inner:focus {
					border: 1px solid #fb6333 !important;
				}
			}
		}
	}
</style>
