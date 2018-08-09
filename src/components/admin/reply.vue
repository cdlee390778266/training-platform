<template>
	<div class="reply">
		<div class="ql-wrapper ql-wrapper-common">
			<h1>当前位置：教师点评</h1>
			<div class="reply-body">
				<div class="reply-bar">
					<div>
						<i :style="'background-image: url(' + reply.content.faceUrl + ')'" v-if="reply.content.faceUrl"></i>
						<i :style="'background-image: url(' + defaultFaceUrl + ')'" v-else></i>
						{{reply.content.name}}
					</div>
					<div class="reply-tContent">
						{{reply.content.content}}
						<span>2018-08-02</span>
					</div>
				</div>
				<div class="reply-content">
					<div class="reply-item" v-for="(item, index) in reply.replyList" :class="{'reply-item-student': item.type, 'reply-item-teacher': !item.type}">
						<div class="reply-item-left">
							<i v-if="!item.type && item.faceUrl" :style="'background-image: url(' + item.faceUrl + ')'"></i>
							<i v-if="!item.type && !item.faceUrl" :style="'background-image: url(' + defaultFaceUrl + ')'"></i>
							<strong><span>{{item.name}}</span>回复{{item.to}}</strong>
						</div>
						<div class="reply-item-right">
							{{item.content}}<span>{{item.date}}</span>
						</div>
					</div>
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
					  <el-form-item prop="desc">
					    <el-input type="textarea" v-model="ruleForm.desc" placeholder="在此输入回复内容"></el-input>
					  </el-form-item>
					  <el-form-item>
					    <el-button type="primary" @click="submitForm('ruleForm')" size="small">回复</el-button>
					  </el-form-item>
					</el-form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import CONFIG from '../../js/config'
	export default {
		data() {
			return {
				defaultFaceUrl: CONFIG.defaultFaceUrl,
				reply: {
					content: {
						type: 0,
						name: '张老师',
						faceUrl: '',
						to: '我',
						content: '小王的炒股能力不错！小王的炒股能力不错！小王的炒股能力不错！小王的炒股能力不错！小王的炒股能力不错！小王的炒股能力不错！小王的炒股能力不错！小王的炒股能力不错！小王的炒股能力不错！小王的炒股能力不错！小王的炒股能力不错！小王的炒股能力不错！小王的炒股能力不错！小王的炒股能力不错！小王的炒股能力不错！小王的炒股能力不错！小王的炒股能力不错！小王的炒股能力不错！小王的炒股能力不错！小王的炒股能力不错！小王的炒股能力不错！小王的炒股能力不错！小王的炒股能力不错！小王的炒股能力不错！',
						date: '2018-08-02'
					},
					replyList: [
						{
							type: 1,
							name: '我',
							faceUrl: '',
							to: '张老师',
							content: '谢谢老师！',
							date: '2018-08-02'
						},
						{
							type: 0,
							name: '张老师',
							faceUrl: '',
							to: '我',
							content: '小王继续加油！',
							date: '2018-08-02'
						},
						{
							type: 1,
							name: '我',
							faceUrl: '',
							to: '张老师',
							content: '好的',
							date: '2018-08-02'
						}
					]
				},
				ruleForm: {
		          desc: ''
		        },
		        rules: {
		        }
			}
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
	.reply {
		.reply-body {
			padding: 40px 100px 200px 100px;
			font-size: 14px;
			.reply-bar {
				color: #666;
				i {
					display: inline-block;
					width: 19px;
					height: 19px;
					margin-right: 10px;
					border-radius: 100%;
					background-size: cover;
					position: relative;
					top: 3px;
				}
				.reply-tContent {
					color: #e30129;
					margin: 10px 30px;
					span {
						display: inline-block;
						color: #a6abb0;
						font-size: 10px;
						margin-left: 10px;
					}
				}
			}
			.reply-content {
				margin: 0 30px;
				.reply-item {
					display: flex;
					margin-bottom: 10px;
					.reply-item-left {
						i {
							display: inline-block;
							width: 19px;
							height: 19px;
							margin-right: 10px;
							border-radius: 100%;
							background-size: cover;
						}
						strong {
							color: #a4a4a4;
							span {
								color: #666;
								margin-right: 10px;
							}
							font-weight: normal;
						}
					}
					.reply-item-right {
						flex: 1;
						margin-left: 10px;
						color: #5091fa;
						span {
							display: inline-block;
							color: #a6abb0;
							font-size: 10px;
							margin-left: 10px;
						}
					}
					&.reply-item-teacher {
						strong {
							position: relative;
							top: -4px;
						}
						.reply-item-right {
							color: #e30129;
						}
					}
				}
				form {
					margin-top: 30px;
					textarea {
						height: 120px !important;
						border-radius: 4px;
						resize: none;
					}
					.el-button--primary {
						float: right;
					}
				}
			}
		}
	}
</style>
