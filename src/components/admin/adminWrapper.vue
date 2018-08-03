<template>
	<div>
		<ql-head></ql-head>
		<div class="admin">
			<transition name="fade">
          		<router-view class="appWrapper"/>
      		</transition>
      	</div>
	</div>
</template>
<script>
	import qlHead from '../common/head.vue'
	export default {
		components: {
			qlHead
		},
		data() {
			return {
				
			}
		}
	}
</script>
<style scoped lang="scss">
	.admin {
		position: relative;
		margin-top: 37px;
	}
</style>
