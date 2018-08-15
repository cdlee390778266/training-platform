<template>
	<div class="userinfo">
		<div class="ql-wrapper">
			<h1>个人信息</h1>
			<!-- <div class="userInfo-top">
				个人头像： <span><i :style="'background-image: url(' + userinfo.faceUrl + ');'"></i></span>
			</div> -->
			<div class="userInfo-body">
				<ul>
					<li>
						<strong>学号:</strong>
						<span class="ellipsis">{{userinfo.data.studentid}}</span>
					</li>
					<li>
						<strong>真实姓名:</strong>
						<span class="ellipsis">{{userinfo.data.name}}</span>
					</li>
					<li>
						<strong>学院:</strong>
						<span class="ellipsis">{{userinfo.data.college}}</span>
					</li>
					<li>
						<strong>学系:</strong>
						<span class="ellipsis">{{userinfo.data.depart}}</span>
					</li>
					<li>
						<strong>年级:</strong>
						<span class="ellipsis">{{userinfo.data.grade}}</span>
					</li>
					<li>
						<strong>专业方向:</strong>
						<span class="ellipsis">{{userinfo.data.major}}</span>
					</li>
					<li>
						<strong>邮箱:</strong>
						<span class="ellipsis">{{userinfo.data.email}}</span>
					</li>
					<li>
						<strong>手机号码:</strong>
						<span class="ellipsis">{{userinfo.data.tel}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
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
				}
			}
		},
		created() {
			var that = this;
			that.$utils.getJson(that.$utils.CONFIG.api.getUserInfo, function(res) {
				if(res.succflag == 0) {
					that.userinfo.data = res.data;
				}else {
					this.$utils.showTip('error', '', '', '', res.message);
				}
			}, function() {}, {}, true, {token: that.$utils.CONFIG.token})
		}
	}
</script>
<style scoped lang="scss">
	.userinfo {
		.ql-wrapper {
			margin-top: 60px;
			padding: 20px 20px 200px 40px;
			color: #969595;
			background: #fff;
			h1 {
				font-size: 18px;
				margin-bottom: 20px;
				color: #969595;
			}
			.userInfo-top {
				text-align: center;
				padding-left: 80px;
				padding-right: 80px;
				padding-top: 10px;
				border-bottom: 1px solid #eeeeee;
				height: 160px;
				span {
					display: inline-block;
					width: 80px;
					height: 80px;
					border: 1px solid #dfdfdf;
					border-radius: 100%;
					background: #eeeeee;
					position: relative;
					top: 30px;
					left: 10px;
					i {
						display: block;
						width: 70px;
						height: 70px;
						margin-left: 4px;
						margin-top: 4px;
						background-size: cover;
						border-radius: 100%;
					}
				}
			}
			.userInfo-body {
				width: 500px;
				margin: 60px auto;
				li {
					display: flex;
					line-height: 50px;
					margin-bottom: 40px;
					strong {
						display: inline-block;
						width: 100px;
						text-align: right;
					}
					span {
						display: inline-block;
						width: 360px;
						height: 52px;
						line-height: 52px;
						padding-left: 30px;
						padding-right: 30px;
						margin-left: 30px;
						border: 1px solid #e3e9ee;
						border-radius: 4px;
					}
				}
			}
		}
	}
</style>
