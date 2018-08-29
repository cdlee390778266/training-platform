<template>
	<div class="reply">
		<div class="ql-wrapper ql-wrapper-common">
			<h1>当前位置：<router-link to="/admin/home">个人中心</router-link><span class="gray">»</span><span>教师点评</span></h1>
			<div class="reply-body">
				<div class="reply-bar">
					<div>
						<i :style="'background-image: url(' + reply.comment.faceUrl + ')'" v-if="reply.comment.faceUrl"></i>
						<i :style="'background-image: url(' + defaultFaceUrl + ')'" v-else></i>
						{{reply.comment.observername}}
					</div>
					<div class="reply-tContent">
						{{reply.comment.comment}}
						<span>{{reply.comment.publishtime}}</span>
					</div>
				</div>
				<div class="reply-content">
					<div class="reply-item reply-item-student" v-for="(item, index) in reply.list">
						<div class="reply-item-left">
							<i :style="'background-image: url(' + item.faceUrl + ')'"></i>
							<i :style="'background-image: url(' + defaultFaceUrl + ')'"></i>
							<strong><span>{{item.observername}}</span>回复{{reply.comment.observername}}</strong></strong>
						</div>
						<div class="reply-item-right">
							{{item.comment}}<span>{{item.time}}</span>
						</div>
					</div>
					<el-form :model="commentForm" :rules="commentRules" ref="commentForm">
					  <el-form-item prop="desc">
					    <el-input type="textarea" v-model="commentForm.desc" placeholder="在此输入回复内容"></el-input>
					  </el-form-item>
					  <el-form-item>
					    <el-button type="primary" @click="submitForm('commentForm')" size="small">回复</el-button>
					  </el-form-item>
					</el-form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				defaultFaceUrl: this.$utils.CONFIG.defaultFaceUrl,
				reply: {
					comment: {},
					list: []
				},
				commentPostData: {},
				commentForm: {
		          desc: ''
		        },
		        commentRules: {
		        	desc: [
		        		{ required: true, message: '评论内容为空', trigger: 'blur' },
		        	]
		        }
			}
		},
		methods: {
			submitForm(formName) {
				var that = this;
		        this.$refs[formName].validate((valid) => {
		          	if (valid) {
		          		that.$utils.getJson(that.$utils.CONFIG.api.commentreply, function(res) {
				          	if(res.succflag == 0) {

				          		that.$utils.getJson(that.$utils.CONFIG.api.replyList, function(res) {
						          	if(res.succflag == 0) {
						            	that.reply.comment = res.data.comment;
	            						that.reply.list = res.data.list;
						          	}else {
						            	that.$utils.showTip('error', '', '', res.message);
						          	}
						        }, function() {}, {commentid: that.$route.params.id}, true, {token: that.$utils.CONFIG.token})
				          		that.$utils.showTip('success', '', '', res.message);
				            	that.$refs[formName].resetFields();
				          	}else {
				            	that.$utils.showTip('error', '', '', res.message);
				          	}
				        }, function() {}, {commentid: that.reply.comment.commentid, comment: that.commentForm.desc}, true, {token: that.$utils.CONFIG.token})
		          	} else {
		            	return false;
		          	}
		        });
		    }
		},
		created() {
			var that = this;
			that.commentPostData = {
				commentid: that.$route.params.id
	    	}
	    	that.$utils.getJson(that.$utils.CONFIG.api.replyList, function(res) {
	          	if(res.succflag == 0) {
	            	that.reply.comment = res.data.comment;
	            	that.reply.list = res.data.list;
	          	}else {
	            	that.$utils.showTip('error', '', '', res.message);
	          	}
	        }, function() {}, that.commentPostData, true, {token: that.$utils.CONFIG.token})
		}
	}
</script>
<style lang="scss">
	.reply {
		h1 {
			a {
				color: #666;
			}
			span {
				color: #666;
				margin-left: 5px;
			}
		}
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
							position: relative;
							top: -4px;
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
