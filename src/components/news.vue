<template>
	<div class="live">
		<iframe :src="link" width="100%" height="100%"></iframe>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				link: ''
			}
		},
		created() {
			if(this.$route.query.link) {
				this.link = this.$route.query.link;
			}
		}
	}
</script>
<style scoped lang="scss">
  body {
  	overflow-y: hidden;
  }
  .live {
  	iframe {
		border: none;
		position: fixed;
	  	top: 36px;
	  	left: 0;
	  	right: 0;
	  	bottom: 0;
  	}
  }
</style>
