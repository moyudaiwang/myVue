<template>
<el-container style="{ height: screenHeight + 'px' }; border: 1px">

   <el-container style="height: 890px; border: 1px">
           <el-aside width="auto">
                 <el-menu default-active="1-4-1" class="el-menu-vertical-demo"   :unique-opened="true"router background-color="#545c64" text-color="#fff" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;" >
                    <h4 class="menuTitle"  v-show="!isCollapse" style="background:#545c64; color:#FFF;text-align: center">DonQuixotey Book</h4>
                    <h4 class="menuTitle"  v-show="isCollapse" style="background:#545c64; color:#FFF;text-align: center">Book</h4>
                  </el-radio-group>
                   <el-submenu index="1">
                      <template slot="title">
                          <i class="el-icon-s-custom"></i>
                          <span slot="title">用户管理</span>
                      </template>
                      <el-menu-item index="1-1" @click="goTo('/user/userMain')">
                          <i class="el-icon-user-solid"></i>
                          <span slot="title">用户列表</span>
                      </el-menu-item>
                   </el-submenu>
                   <el-submenu index="2">
                      <template slot="title">
                          <i class="el-icon-lock"></i>
                          <span slot="title">权限管理</span>
                      </template>
                      <el-menu-item index="2-1" @click="goTo('/auth/roleMain')">
                          <i class="el-icon-bank-card"></i>
                          <span slot="title">角色列表</span>
                      </el-menu-item>
                      <el-menu-item index="2-2">
                          <i class="el-icon-s-check"></i>
                          <span slot="title">用户授权</span>
                      </el-menu-item>
                   </el-submenu>
                   <el-submenu index="3">
                      <template slot="title">
                          <i class="el-icon-reading"></i>
                          <span slot="title">图书管理</span>
                      </template>
                      <el-menu-item index="3-1" @click="goTo('/book/bookMain')">
                          <i class="el-icon-notebook-2"></i>
                          <span slot="title">基本信息</span>
                      </el-menu-item>
                      <el-menu-item index="3-2" @click="goTo('/book/bookFlowMain')">
                          <i class="el-icon-odometer"></i>
                          <span slot="title">动态管理</span>
                      </el-menu-item>
                   </el-submenu>
                   <el-menu-item index="4" @click="goTo('/chart/chartMain')">
                      <i class="el-icon-s-data"></i>
                      <span slot="title">图表统计</span>
                   </el-menu-item>
                   <el-menu-item index="5" @click="goTo('/life/lifeMain')">
                      <i class="el-icon-bicycle"></i>
                      <span slot="title">生活服务</span>
                   </el-menu-item>
                   <el-submenu index="6">
                      <template slot="title">
                          <i class="el-icon-setting"></i>
                          <span slot="title">设置</span>
                      </template>
                      <el-menu-item index="6-1" @click="goTo('/setting/settingMain')">
                          <i class="el-icon-setting"></i>
                          <span slot="title">系统设置</span>
                      </el-menu-item>
                      <el-menu-item index="6-2" @click="goTo('/setting/toolMain')">
                          <i class="el-icon-setting"></i>
                          <span slot="title">研发工具</span>
                      </el-menu-item>
                      <el-menu-item index="6-3" @click="goTo('/setting/timeLineMain')">
                          <i class="el-icon-date"></i>
                          <span slot="title">时间线</span>
                      </el-menu-item>
                      <el-menu-item index="6-4" @click="goTo('/setting/contactMain')">
                          <i class="el-icon-date"></i>
                          <span slot="title">联系我们</span>
                      </el-menu-item>
                      <el-menu-item index="6-5" @click="goTo('/setting/aboutMain')">
                          <i class="el-icon-date"></i>
                          <span slot="title">关于</span>
                      </el-menu-item>
                   </el-submenu>
                 </el-menu>

           </el-aside>

     <el-container>
         <el-header>
         <el-row>
                <el-col :span="1" >
                  <div  style="background:#545c64; color:#FFF;height: 60px">
                     <el-radio-group v-model="isCollapse" style=""  >
                       <i v-if="!isCollapse" style="font-size:23px" class="el-icon-s-fold" @click="isCollapse=true"></i>
                       <i v-if="isCollapse" style="font-size:23px" class="el-icon-s-unfold" @click="isCollapse=false"></i>
                     </el-radio-group>
                  </div>
                </el-col>
                <el-col :span="20"><div class="grid-content bg-purple-light">
                       <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                            <el-submenu index="2">
                               <template slot="title">图书查阅</template>
                               <el-menu-item index="2-1">新增图书</el-menu-item>
                            </el-submenu>
                          <el-menu-item index="3"><a href="https://element.eleme.cn/#/zh-CN/component/layout" target="_blank">数据分析</a></el-menu-item>
                       </el-menu>
                </div></el-col>

                <el-col :span="3">
                  <div style="background:#545c64; color:#FFF;height: 60px">
                      <el-badge is-dot class="item" style="padding-top:0px">
                        <el-button class="share-button" icon="el-icon-message-solid" type="primary" @click="drawer = true"></el-button>
                      </el-badge>
                      <el-dropdown @command="handleCommand">
                        <div style="padding-top:10px;color:#FFF" >
                          <el-avatar  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="/setting/settingMain">个人中心</el-dropdown-item>
                          <el-dropdown-item command="/">退 出</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>

                </div></el-col>
              </el-row>


         </el-header>
         <el-main  hight="200px">
            <router-view></router-view>
                    <el-drawer  :visible.sync="drawer" direction="rtl" size="25%">
                                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                                  <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
                                  <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                                  <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                                  <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
                                </el-tabs>
                    </el-drawer>
         </el-main>
     </el-container>
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
    input: '',
    drawer: false,
     activeName: 'first'
   };
        screenHeight: document.body.clientHeight
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
         window.screenHeight = document.body.clientHeight
         that.screenHeight = window.screenHeight
         console.log('that.screenHeightthat.screenHeight---------',that.screenHeight);
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
   }

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
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 20px;
    padding-left: 0px;
    padding-right: 0px;

  }


  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-footer {
    background-color: #B3C0D1;
    color: #333;
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
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
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
      color: #151d41;
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
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

</style>
