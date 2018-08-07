<template>
  <div id="app">
      <transition name="fade">
          <router-view class="appWrapper"/>
      </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
  	return {
  		
  	}
  },
  created() {
  	this.$utils.getTaken(function(res) {
      alert(res);
    }, function(error) {
      alert(error);
    })
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
}
a {
  color: #4e4e4e;
  text-decoration: none;
}
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
body {
  color: #4e4e4e;
  font-size: 14px;
  background-color: #f2f6fa;
}
.appWrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.ql-wrapper {
  width: 1400px;
  margin-left: auto;
  margin-right: auto;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
