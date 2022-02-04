<template>
  <el-container style="{ height: screenHeight + 'px' }; border: 1px">

    <el-container style="height: 890px; border: 1px">
      <el-header>
        <el-row>
          <el-col :span="3" style="background: #eef6f6;height: 60px;cursor: pointer">
            <h4  style="padding-top: 10px" class="menuTitle"  v-if="!isCollapse" @click="goTo('/user/userInfoMain')">DonQuixotey Book</h4>
          </el-col>
          <el-col :span="18">
            <div class="grid-content" style="background:#eef6f6;height: 60px">
              <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" >
                <el-menu-item index="3">首页</el-menu-item>
                <el-submenu index="2">
                  <template slot="title">图书查阅</template>
                  <el-menu-item index="2-1">新增图书</el-menu-item>
                </el-submenu>
              </el-menu>
            </div>
          </el-col>
          <el-col :span="3" style="background:#eef6f6;height: 60px">
            <div style="float:right">
              <el-badge is-dot class="item">
                <el-button class="share-button" icon="el-icon-message-solid" type="primary" @click="drawer = true"></el-button>
              </el-badge>
              <el-dropdown @command="handleCommand" style="padding-top: 10px;padding-right: 20px;">
                <div>
                  <el-avatar  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="/setting/personalMain">个人中心</el-dropdown-item>
                  <el-dropdown-item command="/">退 出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main style=" height: 1500px; ">
        <router-view></router-view>
      </el-main>
    </el-container>

    <el-footer  style=" height: 100%;padding-left: 0px;padding-right: 0px;">
      <div>豫公网安备 豫ICP备2020035146号    | Copyright ©2020-2021 www.donQuixotey.com All Rights Reserved</div>
    </el-footer>
  </el-container>

</template>
<script>
export default {
  data() {
    return {
    isCollapse: false,
    activeIndex: '1',
    activeIndex2: '1',
    };
    screenHeight: document.body.clientHeight
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
         window.screenHeight = document.body.clientHeight
         that.screenHeight = window.screenHeight
      })()
    }
  },
  methods: {
   handleSelect(key, keyPath) {
    console.log(key, keyPath);
   },

   handleOpen(key, keyPath) {
     console.log(key, keyPath);
   },
   handleClose(key, keyPath) {
     console.log(key, keyPath);
   },
   goTo(path){
      this.$router.replace(path);
   },
   handleCommand(path) {
      this.$router.replace(path);
   },
  },
  watch: {
    screenHeight (val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenHeight = val
        this.timer = true
        let that = this
        setTimeout(function () {
          // 打印screenWidth变化的值
          console.log(that.screenHeight)
          that.timer = false
        }, 400)
      }
    }
  },
  components: {
  }
 }
</script>
<style>
  .el-header {
    text-align: center;
    line-height: 20px;
    padding-left: 0px;
    padding-right: 0px;
  }
  .el-main {
    text-align: center;
    line-height: 60px;
  }

  .el-footer {
    text-align: center;
    line-height: 60px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) ,
  .el-container:nth-child(6) {
    line-height: 260px;
  }

  .el-container:nth-child(7) {
    line-height: 320px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 100%;
  }
  .el-menu--collapse {
    width: 64px;
    min-height: 100%;
  }

  .el-row {
    margin-bottom: 2px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
  }

  .el-radio-group {
    font-size: 20px;
    line-height: 20px;
    margin-top: 20px;
    margin-left: 20px;
    .shrinkBtn {
      position: fixed;
      left: -18px;
      top: 38px;
      margin-left: 10px;
      transform: rotate(180deg);
    }
  }

  .item {
    margin-top: -30px;
    margin-right: 10px;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
