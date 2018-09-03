<template>
  <div id="app">
      <transition name="el-zoom-in-top">
          <router-view/>
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
    var that = this;
  	//test
    that.$utils.CONFIG.token = that.$utils.CONFIG.loginData.token;
    that.$utils.CONFIG.account = that.$utils.CONFIG.loginData.data.account;
    for(var i = 0; i < that.$utils.CONFIG.account.length; i++) {
        if(that.$utils.CONFIG.account[i].usage == 0) {
          for(var j = 0; j < that.$utils.CONFIG.account[i].accts.length; j++) {
            if(that.$utils.CONFIG.account[i].accts[j].type == 1) {
              that.$utils.CONFIG.mainAccount1 = that.$utils.CONFIG.account[i].accts[j];
            }else if(that.$utils.CONFIG.account[i].accts[j].type == 2) {
              that.$utils.CONFIG.mainAccount2 = that.$utils.CONFIG.account[i].accts[j];
            }
          }
          break;
        }
    }
    this.$utils.getLoginData(function(res) {
        var res = JSON.parse(res);
        that.$utils.CONFIG.loginData = res;
        that.$utils.CONFIG.token = that.$utils.CONFIG.loginData.token;
        that.$utils.CONFIG.account = that.$utils.CONFIG.loginData.data.account;
        for(var i = 0; i < that.$utils.CONFIG.account.length; i++) {
            if(that.$utils.CONFIG.account[i].usage == 0) {
              for(var j = 0; j < that.$utils.CONFIG.account[i].accts.length; j++) {
                if(that.$utils.CONFIG.account[i].accts[j].type == 1) {
                  that.$utils.CONFIG.mainAccount1 = that.$utils.CONFIG.account[i].accts[j];
                }else if(that.$utils.CONFIG.account[i].accts[j].type == 2) {
                  that.$utils.CONFIG.mainAccount2 = that.$utils.CONFIG.account[i].accts[j];
                }
              }
              break;
            }
        }
    }, function(error) {
        // alert(error);
    })

    this.$utils.getUniversityCode(function(res) {
        that.$utils.CONFIG.universitycode = res;
    }, function(error) {
        // alert(error);
    })

  }
}
</script>

<style lang="scss">
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
.img-responsive {
  display: block;
  width: 100%;
  height: auto;
}
.mt10 {
  margin-top: 10px;
}
.border {
  border: 1px solid #dde1e6;
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
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
  &.ql-wrapper-common {
    margin-top: 60px;
    margin-bottom: 60px;
    padding-bottom: 200px;
    background: #fff;
    border: 1px solid #dde1e6;
    h1 {
      color: #969595;
      font-size: 16px;
      padding: 30px 15px;
      margin-left: 20px;
    }
  }
}
.el-pagination {
  text-align: center;
  margin: 40px auto;
}

.el-button:hover {
  opacity: 0.8;
}

.el-table__empty-text {
  background: url('./assets/images/nodata.png') no-repeat center 30px;
  background-size: 80px 80px;
  height: 180px;
  padding-top: 120px;
  color: #999;
}
.rise {
  color: #e20026;
}
.fall {
  color: #6bca24;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
