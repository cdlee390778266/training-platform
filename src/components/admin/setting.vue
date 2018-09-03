<template>
	<div class="setting">
		<div class="ql-wrapper">
			<h1>账号设置</h1>
			<div class="setting-body">
				<el-tabs v-model="activeName">
				    <!-- <el-tab-pane label="修改头像" name="face">
				    	<el-upload
						  class="avatar-uploader"
						  ref="face"
						  action="http://192.168.16.41/success.php"
						  :auto-upload="false"
						  :on-success="handleAvatarSuccess"
						  :before-upload="beforeAvatarUpload"
						  list-type="picture-card">
						  <el-button slot="trigger" size="small" type="primary">上传头像</el-button>
  						  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">保存</el-button>
						</el-upload>
				    </el-tab-pane> -->
				    <el-tab-pane label="个人信息" name="userinfo" class="userinfo">
				    	<ul>
							<li>
								<strong>学号:</strong>
								<span class="ellipsis">{{tabs.userinfo.data.studentid}}</span>
							</li>
							<li>
								<strong>真实姓名:</strong>
								<span class="ellipsis">{{tabs.userinfo.data.name}}</span>
							</li>
							<li>
								<strong>学院:</strong>
								<span class="ellipsis">{{tabs.userinfo.data.college}}</span>
							</li>
							<li>
								<strong>学系:</strong>
								<span class="ellipsis">{{tabs.userinfo.data.depart}}</span>
							</li>
							<li>
								<strong>年级:</strong>
								<span class="ellipsis">{{tabs.userinfo.data.grade}}</span>
							</li>
							<li>
								<strong>专业方向:</strong>
								<span class="ellipsis">{{tabs.userinfo.data.major}}</span>
							</li>
							<li>
								<strong>邮箱:</strong>
								<span class="ellipsis">{{tabs.userinfo.data.email}}</span>
							</li>
							<li>
								<strong>手机号码:</strong>
								<span class="ellipsis">{{tabs.userinfo.data.tel}}</span>
							</li>
						</ul>
				    </el-tab-pane>
				    <el-tab-pane label="修改密码" name="pwd">
				    	<el-form :model="tabs.pwd.pwdForm" status-icon :rules="tabs.pwd.pwdRules" ref="pwdForm" label-width="100px" class="demo-ruleForm">
				    	  <el-form-item label="原密码" prop="oldPass">
						    <el-input v-model="tabs.pwd.pwdForm.oldPass"></el-input>
						  </el-form-item>
						  <el-form-item label="新密码" prop="pass">
						    <el-input type="password" v-model="tabs.pwd.pwdForm.pass" auto-complete="off"></el-input>
						  </el-form-item>
						  <el-form-item label="确认新密码" prop="checkPass">
						    <el-input type="password" v-model="tabs.pwd.pwdForm.checkPass" auto-complete="off"></el-input>
						  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" @click="submitForm('pwdForm')">修改</el-button>
						  </el-form-item>
						</el-form>
				    </el-tab-pane>
				    <el-tab-pane label="修改邮箱" name="email">
				    	<el-form :model="tabs.email.emailForm" status-icon :rules="tabs.email.emailRules" ref="emailForm" label-width="100px" class="demo-ruleForm">
				    	  <el-form-item label="邮箱" prop="email">
						    <el-input v-model="tabs.email.emailForm.email" placeholder="请输入邮箱地址"></el-input>
						  </el-form-item>
						  <el-form-item label="验证码" prop="code" class="code">
				            <el-input v-model="tabs.email.emailForm.code" placeholder="请输入验证码"></el-input>
				            <el-button @click="getCode('emailForm')" :disabled="tabs.email.isShowCountDown" type="danger" size="small" class="codeBtn">
				              <template v-if="!tabs.email.isShowCountDown">
				                <span v-if="tabs.email.isCodeLoading"><i class="el-icon-loading"></i>加载中</span>
				                <span v-else>获取验证码</span>
				              </template>
				              <template v-else>
				                {{tabs.email.count}}s
				              </template>
				          </el-button>
				          </el-form-item>
						  <el-form-item>
						    <el-button type="primary" @click="submitForm('emailForm')">提交</el-button>
						  </el-form-item>
						</el-form>
				    </el-tab-pane>
				    <el-tab-pane label="修改手机号" name="phone">
						<el-form :model="tabs.phone.phoneForm" status-icon :rules="tabs.phone.phoneRules" ref="phoneForm" label-width="100px" class="demo-ruleForm">
				    	  <el-form-item label="手机号码" prop="phone">
						    <el-input v-model="tabs.phone.phoneForm.phone" placeholder="请输入手机号码"></el-input>
						  </el-form-item>
						  <el-form-item label="验证码" prop="code" class="code">
				            <el-input v-model="tabs.phone.phoneForm.code" placeholder="请输入验证码"></el-input>
				            <el-button @click="getCode('phoneForm')" :disabled="tabs.phone.isShowCountDown" type="danger" size="small" class="codeBtn">
				              <template v-if="!tabs.phone.isShowCountDown">
				                <span v-if="tabs.phone.isCodeLoading"><i class="el-icon-loading"></i>加载中</span>
				                <span v-else>获取验证码</span>
				              </template>
				              <template v-else>
				                {{tabs.phone.count}}s
				              </template>
				          </el-button>
				          </el-form-item>
						  <el-form-item>
						    <el-button type="primary" @click="submitForm('phoneForm')">提交</el-button>
						  </el-form-item>
						</el-form>
				    </el-tab-pane>
			  	</el-tabs>
		  	</div>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
		      var validatePass = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入密码'));
		        } else {
		          if (this.tabs.pwd.pwdForm.checkPass !== '') {
		            this.$refs.pwdForm.validateField('checkPass');
		          }
		          callback();
		        }
		      };
		      var validatePass2 = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请再次输入密码'));
		        } else if (value !== this.tabs.pwd.pwdForm.pass) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
		      };
		      var checkEmailCode = (rule, value, callback) => {
		        if (!value) {
		          return callback(new Error('请输入正确验证码'));
		        }
		        if(value != saveEmailCode){
				  callback(new Error('验证码不正确'));
				} else {
				  callback();
				}
		      };
		      var checkPhoneCode = (rule, value, callback) => {
		        if (!value) {
		          return callback(new Error('请输入正确验证码'));
		        }
		        if(value != savePhoneCode){
				  callback(new Error('验证码不正确'));
				} else {
				  callback();
				}
		      };
		      var checkEmail = (rule, value, callback) => {
	          	if (!value) {
		            return callback(new Error('请输入邮箱地址'));
		          }
		          if(!(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value))){
		            callback(new Error('邮箱地址错误'));
		          } else {
		            callback();
	          	}
	          };
		      var checkPhone = (rule, value, callback) => {
		        if (!value) {
		          return callback();
		        }
		        if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(value))){
				  callback(new Error('请输入正确的手机号码'));
				} else {
				  callback();
				}
		      };
			return {
				activeName: 'userinfo',
				tabs: {
					face: {
						faceUrl: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',

					},
					userinfo: {
						faceUrl: 'https://img.mukewang.com/user/5afe3d350001596a02430243-100-100.jpg',
						data: {
							studentid: '',
							name: '',
							college: '',
							depart: '',
							major: '',
							grade: '',
							class: '',
							tel: '',
							email: ''
						 }
					},
					pwd: {
						pwdForm: {
						  oldPass: '',
				          pass: '',
				          checkPass: ''
				        },
				        pwdRules: {
				          oldPass: [
				          	{ required: true, message: '请输入原密码', trigger: 'blur' },
            			  	{ min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
				          ],
				          pass: [
				            { required: true, message: '请输入新密码', trigger: 'blur' },
            			  	{ min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
				            { validator: validatePass, trigger: 'blur' }
				          ],
				          checkPass: [
				            { required: true, message: '请输入新密码', trigger: 'blur' },
            			  	{ min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
				            { validator: validatePass2, trigger: 'blur' }
				          ]
				        }
					},
					email: {
						isShowCountDown: false,
						isCodeLoading: false,
						count: '',
						timer: null,
						emailForm: {
				          email: '',
				          code: '',
				        },
				        emailRules: {
				          email: [
				            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
						    { validator: checkEmail, trigger: 'blur' }
						  ],
						  code: [
						    { required: true, message: '请输入验证码', trigger: 'blur' },
						    { min: 4, max: 4, message: '请输入4位验证码', trigger: 'blur' }
						  ]
				        }
					},
					phone: {
						isShowCountDown: false,
						isCodeLoading: false,
						count: '',
						timer: null,
						phoneForm: {
				          phone: '',
				          code: '',
				        },
				        phoneRules: {
				          phone: [
				            { required: true, message: '请输入手机号码', trigger: 'blur' },
						    { validator: checkPhone, trigger: 'blur' }
						  ],
						  code: [
						    { required: true, message: '请输入验证码', trigger: 'blur' },
						    { min: 4, max: 4, message: '请输入4位验证码', trigger: 'blur' }
						  ]
				        }
					}
				}
			}
		},
		methods: {
		  submitUpload() {
	        this.$refs.face.submit();
	      },
	      handleAvatarSuccess(res, file) {
	        this.imageUrl = URL.createObjectURL(file.raw);
	      },
	      beforeAvatarUpload(file) {
	        //const isJPG = file.type === 'image/jpeg';
	        const isLt2M = file.size / 1024 / 1024 < 2;

	        // if (!isJPG) {
	        //   this.$message.error('上传头像图片只能是 JPG 格式!');
	        // }
	        if (!isLt2M) {
	          this.$message.error('上传头像图片大小不能超过 2MB!');
	        }
	        return isLt2M;
	      },
	      getCode(formName) {
	      	var that = this;
			var timeCount = that.$utils.CONFIG.codeTime;
			var postData = {};
      		switch (formName) {
          		case 'emailForm':
          			// 邮箱
          			if (!that.tabs.email.emailForm.email) {
						that.$utils.showTip('error', 'error', '-1020');
						return;
					}
					if(!(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(that.tabs.email.emailForm.email))){
						that.$utils.showTip('error', 'error', '-1021');
						return;
					}
          			postData = {
          				objectid: that.tabs.email.emailForm.email, 
          				type: "2"
          			}
          			if(that.tabs.email.isCodeLoading) {
						return;
					}
					that.tabs.email.isCodeLoading = true;
					that.$utils.getJson(that.$utils.CONFIG.api.code, function(res){
						if(res.succflag == 0) {
							if (!that.tabs.email.timer) {
								that.tabs.email.count = timeCount;
								that.tabs.email.isShowCountDown = true;
								that.tabs.email.timer = setInterval(() => {
									if (that.tabs.email.count > 0 && that.tabs.email.count <= timeCount) {
									that.tabs.email.count--;
									} else {
										that.tabs.email.isShowCountDown = false;
										clearInterval(that.tabs.email.timer);
										that.tabs.email.timer = null;
									}
								}, 1000)
							}
						}else {
							that.$utils.showTip('error', 'error', '-1012');
						}
						that.tabs.email.isCodeLoading = false;
					}, function() {
						that.tabs.email.isCodeLoading = false;
					}, postData, false)
          			break;
          		case 'phoneForm':
          			// 手机号
          			if (!that.tabs.phone.phoneForm.phone) {
						that.$utils.showTip('error', 'error', '-1010');
						return;
					}
					if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(that.tabs.phone.phoneForm.phone))){
						that.$utils.showTip('error', 'error', '-1011');
						return;
					}
          			postData = {
          				objectid: that.tabs.phone.phoneForm.phone, 
          				type: "1"
          			}
          			if(that.tabs.phone.isCodeLoading) {
						return;
					}
					that.tabs.phone.isCodeLoading = true;
					that.$utils.getJson(that.$utils.CONFIG.api.code, function(res){
						if(res.succflag == 0) {
							if (!that.tabs.phone.timer) {
								that.tabs.phone.count = timeCount;
								that.tabs.phone.isShowCountDown = true;
								that.tabs.phone.timer = setInterval(() => {
									if (that.tabs.phone.count > 0 && that.tabs.phone.count <= timeCount) {
									that.tabs.phone.count--;
									} else {
										that.tabs.phone.isShowCountDown = false;
										clearInterval(that.tabs.phone.timer);
										that.tabs.phone.timer = null;
									}
								}, 1000)
							}
						}else {
							that.$utils.showTip('error', 'error', '-1012');
						}
						that.tabs.phone.isCodeLoading = false;
					}, function() {
						that.tabs.phone.isCodeLoading = false;
					}, postData, false)
          			break;
          		}
		  },
	      submitForm(formName) {
	      	var that = this;
	      	var modifyApi = '';
	      	var postData = {};
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	          	switch (formName) {
	          		case 'pwdForm':
	          			// 修改密码
	          			modifyApi = that.$utils.CONFIG.api.editPassword;
	          			postData = {
	          				universitycode: that.$utils.CONFIG.universitycode,
							oldpassword: that.$utils.sha1(that.tabs.pwd.pwdForm.oldPass),
							newpassword: that.$utils.sha1(that.tabs.pwd.pwdForm.pass)
	          			}
	          			break;
	          		case 'emailForm':
	          			// 修改邮箱
	          			modifyApi = that.$utils.CONFIG.api.editEmail;
	          			postData = {
	          				universitycode: that.$utils.CONFIG.universitycode,
							verifycode: that.tabs.email.emailForm.code,
 							email: that.tabs.email.emailForm.email
	          			}
	          			break;
	          		case 'phoneForm':
	          			// 修改手机号
	          			modifyApi = that.$utils.CONFIG.api.editTel;
	          			postData = {
	          				universitycode: that.$utils.CONFIG.universitycode,
							verifycode: that.tabs.phone.phoneForm.code,
 							tel: that.tabs.phone.phoneForm.phone
	          			}
	          			break;
	          		}

	          		that.$utils.getJson(modifyApi, function(res) {
						if(res.succflag == 0) {
							that.$utils.showTip('success', '', '', res.message);
							that.$refs[formName].resetFields();
						}else {
							that.$utils.showTip('error', '', '', res.message);
						}
					}, function() {}, postData, true, {token: that.$utils.CONFIG.token})
	          } else {
	            return false;
	          }
	        });
	      }
	    },
	    created() {
	    	var that = this;
	    	that.$utils.getJson(that.$utils.CONFIG.api.getUserInfo, function(res) {
				if(res.succflag == 0) {
					that.tabs.userinfo.data = res.data;
				}else {
					that.$utils.showTip('error', '', '', res.message);
				}
			}, function() {}, {}, true, {token: that.$utils.CONFIG.token})
	    }
	}
</script>
<style lang="scss">
	.setting {
		.ql-wrapper {
			margin-top: 60px;
			padding-bottom: 200px;
			padding-left: 25px;
			padding-right: 25px;
			background: #fff;
			h1 {
				color: #969595;
				font-size: 16px;
				padding: 30px 15px;
			}
			.el-tabs__nav-wrap {
				border: 1px solid #e1e5e8;
				padding-top: 10px;
				padding-bottom: 15px;
				padding-left: 160px;
				background: #fcfdfe;
			}
			.el-tabs__nav-wrap::after {
				background-color: transparent;
			}
			.el-tabs__item {
				color: #969595;
			}
			.el-tabs__active-bar {
				background-color: #e30129;
			}
			form {
				width: 600px;
				margin: 100px auto;
				.el-form-item {
					margin-bottom: 40px;
				}
				.codeBtn {
					position: absolute;
					top: 4px;
					right: 5px;
					background: #e30129;
				}
			}
		}
		.el-form .codeBtn {
		    width: 92px;
		    position: absolute;
		    top: 4px;
		    right: 5px;
		    background: #e30129;
		}
		.userinfo {
			width: 600px;
			margin: 100px auto;
			color: #969595;
			li {
				display: flex;
				line-height: 40px;
				margin-bottom: 40px;
				strong {
					display: inline-block;
					width: 100px;
					text-align: right;
				}
				span {
					display: inline-block;
					width: 480px;
					height: 40px;
					line-height: 40px;
					padding-left: 30px;
					padding-right: 30px;
					margin-left: 30px;
					border: 1px solid #e3e9ee;
					border-radius: 4px;
				}
			}
		}
	}
</style>
