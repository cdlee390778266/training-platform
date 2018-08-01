<template>
  	<div class="ql-menu">
        
  	</div>
</template>
<script>
  	export default {
  		data() {
  			return {
  				menu: [
  					{
  						text: '投资竞赛',
  						iconClass: 'menu-icon1',
  						link: '/'
  					},
            {
              text: '期权行情',
              iconClass: 'menu-icon2',
              link: '/'
            },
            {
              text: '股票行情',
              iconClass: 'menu-icon3',
              link: '/'
            },
            {
              text: '策略选股',
              iconClass: 'menu-icon4',
              link: '/'
            },
            {
              text: '云课堂',
              iconClass: 'menu-icon5',
              link: '/'
            }
  				],
          isCollapse: true
  			}
  		},
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
  	}
</script>
<style scoped lang="scss">
    .ql-menu {
      
    }
</style>
