<template>
	<div class="msgCenter">
		<div class="ql-wrapper ql-wrapper-common">
			<div class="msgCenter-body">
				<div class="msgCenter-tabs">
					<div class="msgCenter-head">
						消息中心
					</div>
					<div class="msgCenter-screen">
						<ul>
							<li v-for="(item, index) in conditions" :key="index" :class="{active: item.isActive}" @click="changeCondition(item)"><i></i>{{item.text}}</li>
						</ul>
					</div>
				</div>
				<div class="msgCenter-right">
					<el-table
				      :data="msgList"
				      style="width: 100%">
				      <el-table-column
				        label="公告名称">
				        <template slot-scope="scope">
					        <span class="tag">顶</span>
					        {{scope.row.name}}
					    </template>
				      </el-table-column>
				      <el-table-column
				        prop="category"
				        label="分类"
				        width="180">
				      </el-table-column>
				      <el-table-column
				        prop="date"
				        label="发布时间"
				        width="180">
				      </el-table-column>
				    </el-table>
				    <el-pagination
					  background
					  layout="prev, pager, next"
					  :total="1000">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				conditions: [
					{
						text: '全部消息',
						code: '',
						isActive: true
					},
					{
						text: '系统消息',
						code: '',
						isActive: false
					},
					{
						text: '课程消息',
						code: '',
						isActive: false
					},
					{
						text: '直播消息',
						code: '',
						isActive: false
					},
					{
						text: '文章消息',
						code: '',
						isActive: false
					},
					{
						text: '赛事消息',
						code: '',
						isActive: false
					}
				],
				msgList: [
					{
						id: 1,
						name: '张老师的直播马上开始了',
						category: '直播消息',
						date: '2018-06-18'
					},
					{
						id: 1,
						name: '张老师的直播马上开始了',
						category: '直播消息',
						date: '2018-06-18'
					},
					{
						id: 1,
						name: '张老师的直播马上开始了',
						category: '直播消息',
						date: '2018-06-18'
					},
					{
						id: 1,
						name: '张老师的直播马上开始了',
						category: '直播消息',
						date: '2018-06-18'
					},
					{
						id: 1,
						name: '张老师的直播马上开始了',
						category: '直播消息',
						date: '2018-06-18'
					},
					{
						id: 1,
						name: '张老师的直播马上开始了',
						category: '直播消息',
						date: '2018-06-18'
					},
					{
						id: 1,
						name: '张老师的直播马上开始了',
						category: '直播消息',
						date: '2018-06-18'
					}
				]
			}
		},
		methods: {
			changeCondition(item) {
				if(item.isActive) return;
				this.conditions.forEach( function(element, index) {
					element.isActive = false;
				});
				item.isActive = true;
			}
		}
	}
</script>
<style lang="scss">

	.msgCenter {
		.ql-wrapper {
			padding-bottom: 0;
		}
		.msgCenter-body {
			display: flex;
			.msgCenter-tabs {
				width: 220px;
				line-height: 63px;
				border-right: 1px solid #dde1e6;
				min-height: 888px;
				text-align: center;
				color: #959595;
				.msgCenter-head {
					color: #969595;
					font-size: 16px;
					border-bottom: 1px solid #dde1e6;
				}
				li {
					position: relative;
					cursor: pointer;
					transition: all .4s;
					&:hover {
						background: #f1f1f1;
					}
					i {
						position: absolute;
						top: 28px;
						left: 66px;
						display: none;
						width: 8px;
						height: 8px;
						background: #f45e63;
						border-radius: 100%;
					}
					&.active i {
						display: block;
					}
				}
			}
			.msgCenter-right {
				flex: 1;
			}
			.el-table th {
				text-align: center;
				padding-top: 20px;
				padding-bottom: 20px;
			}
			.el-table td {
				text-align: center;
				padding-top: 20px;
				padding-bottom: 20px;
				.tag {
					display: inline-block;
					width: 26px;
					height: 26px;
					text-align: center;
					line-height: 26px;
					font-size: 12px;
					color: #fff;
					margin-right: 5px;
					background: #f45e63;
					border-radius: 8px;
				}
			}
		}
	}
</style>
