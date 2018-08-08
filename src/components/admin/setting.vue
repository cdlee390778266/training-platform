<template>
	<div class="setting">
		<div class="ql-wrapper">
			<h1>账号设置</h1>
			<div class="setting-body">
				<el-tabs v-model="activeName">
				    <el-tab-pane label="修改头像" name="face">
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
				    </el-tab-pane>
				    <el-tab-pane label="修改密码" name="pwd">
				    	<el-form :model="tabs.pwd.pwdForm" status-icon :rules="tabs.pwd.pwdRules" ref="pwdForm" label-width="100px" class="demo-ruleForm">
				    	  <el-form-item label="原密码" prop="oldPwd">
						    <el-input v-model.number="tabs.pwd.pwdForm.oldPwd"></el-input>
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
						    <el-button type="danger" size="small" class="codeBtn">获取验证码</el-button>
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
						    <el-button type="danger" size="small" class="codeBtn">获取验证码</el-button>
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
				activeName: 'face',
				tabs: {
					face: {
						faceUrl: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',

					},
					pwd: {
						pwdForm: {
						  oldPass: '',
				          pass: '',
				          checkPass: ''
				        },
				        pwdRules: {
				          oldPwd: [
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
					},
					phone: {
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
						    { validator: checkCode, trigger: 'blur' }
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
	      	console.log(file);
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
	    },
	    created() {
	    	console.log(this.$route.params);
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
	}
</style>
