<template>
	<div class="userinfo">
		<div class="ql-wrapper">
			<h1>个人信息</h1>
			<div class="userInfo-top">
				个人头像： <span><i :style="'background-image: url(' + userinfo.faceUrl + ');'"></i></span>
			</div>
			<div class="userInfo-body">
				<ul>
					<li v-for="(item, index) in userinfo.dataList" :key="index">
						<strong>{{item.key}}:</strong>
						<span>{{item.value}}</span>
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
					dataList: [
						{
							key: '学号',
							value: '0023'
						},
						{
							key: '真实姓名',
							value: '张三'
						},
						{
							key: '学校',
							value: '西南财经'
						},
						{
							key: '学院',
							value: '计算机系'
						},
						{
							key: '专业方向',
							value: '2015级'
						},
						{
							key: '邮箱',
							value: '000@qq.com'
						},
						{
							key: '手机号码',
							value: '12345678901'
						}
					]
				}
			}
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
					line-height: 50px;
					margin-bottom: 25px;
					strong {
						display: inline-block;
						width: 100px;
						text-align: right;
					}
					span {
						display: inline-block;
						width: 360px;
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
