<template>
<el-container style="{ height: screenHeight + 'px' }; border: 10px; background: #eef6f6">
       <el-aside  style=" { height: screenHeight + 'px' } " width="auto">
         <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :unique-opened="true" router  @open="handleOpen" @close="handleClose" :collapse="isCollapse">
           <el-radio-group v-model="isCollapse" style="cursor: pointer">
             <i v-if="!isCollapse" style=" font-size:20px" class="el-icon-s-fold" @click="isCollapse=true"></i>
             <i v-if="isCollapse" style=" font-size:20px" class="el-icon-s-unfold" @click="isCollapse=false"></i>
           </el-radio-group>
           <el-submenu index="1">
             <template slot="title">
               <i class="el-icon-s-custom"></i>
               <span slot="title">用户管理</span>
             </template>
             <el-menu-item index="1-1" @click="goTo('/user/userInfoMain')">
               <i class="el-icon-user-solid"></i>
               <span slot="title">用户列表</span>
             </el-menu-item>
           </el-submenu>
           <el-submenu index="2">
             <template slot="title">
               <i class="el-icon-lock"></i>
               <span slot="title">权限管理</span>
             </template>
             <el-menu-item index="2-1" @click="goTo('/auth/accountInfoMain')">
               <i class="el-icon-bank-card"></i>
               <span slot="title">账号列表</span>
             </el-menu-item>
             <el-menu-item index="2-2" @click="goTo('/auth/roleInfoMain')">
               <i class="el-icon-bank-card"></i>
               <span slot="title">角色列表</span>
             </el-menu-item>
             <el-menu-item index="2-3" @click="goTo('/auth/menuInfoMain')">
               <i class="el-icon-bank-card"></i>
               <span slot="title">菜单列表</span>
             </el-menu-item>
             <el-menu-item index="2-4">
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
               <span slot="title">图书列表</span>
             </el-menu-item>
             <el-menu-item index="3-2" @click="goTo('/book/bookFlowMain')">
               <i class="el-icon-odometer"></i>
               <span slot="title">图书动态列表</span>
             </el-menu-item>
           </el-submenu>
           <el-menu-item index="4" @click="goTo('/chart/chartMain')">
             <i class="el-icon-s-data"></i>
             <span slot="title">图表统计</span>
           </el-menu-item>
           <el-submenu index="5">
             <template slot="title">
               <i class="el-icon-bicycle"></i>
               <span slot="title">生活服务</span>
             </template>
             <el-menu-item index="5-1" @click="goTo('/life/lifeInfo')">
               <i class="el-icon-notebook-2"></i>
               <span slot="title">信息查询</span>
             </el-menu-item>
             <el-menu-item index="5-2" @click="goTo('/life/lifeMain')">
               <i class="el-icon-odometer"></i>
               <span slot="title">其他管理</span>
             </el-menu-item>
           </el-submenu>
           <el-submenu index="6">
             <template slot="title">
               <i class="el-icon-setting"></i>
               <span slot="title">设置</span>
             </template>
             <el-menu-item index="6-1" @click="goTo('/setting/settingMain')">
               <i class="el-icon-setting"></i>
               <span slot="title">系统设置</span>
             </el-menu-item>
             <el-menu-item index="6-2" @click="goTo('/setting/personalMain')">
               <i class="el-icon-setting"></i>
               <span slot="title">个人中心</span>
             </el-menu-item>
             <el-menu-item index="6-3" @click="goTo('/setting/toolMain')">
               <i class="el-icon-setting"></i>
               <span slot="title">研发工具</span>
             </el-menu-item>
             <el-menu-item index="6-4" @click="goTo('/setting/timeLineMain')">
               <i class="el-icon-date"></i>
               <span slot="title">时间线</span>
             </el-menu-item>
             <el-menu-item index="6-5" @click="goTo('/setting/contactMain')">
               <i class="el-icon-date"></i>
               <span slot="title">联系我们</span>
             </el-menu-item>
             <el-menu-item index="6-6" @click="goTo('/setting/aboutMain')">
               <i class="el-icon-date"></i>
               <span slot="title">关于</span>
             </el-menu-item>
           </el-submenu>
           <el-submenu index="7">
             <template slot="title">
               <i class="el-icon-bicycle"></i>
               <span slot="title">监控中心</span>
             </template>
             <el-menu-item index="5-1" @click="goTo('/monitor/logMain')">
               <i class="el-icon-notebook-2"></i>
               <span slot="title">日志列表</span>
             </el-menu-item>
           </el-submenu>
           <el-submenu index="8">
             <template slot="title">
               <i class="el-icon-bicycle"></i>
               <span slot="title">书式地图</span>
             </template>
             <el-submenu index="8-1">
               <template slot="title">
                 <i class="el-icon-bicycle"></i>
                 <span slot="title">图谱</span>
               </template>
               <el-menu-item index="8-1-1" @click="goTo('/graph/literature/hlmMain')">
                 <i class="el-icon-notebook-2"></i>
                 <span slot="title">红楼梦人物关系图谱</span>
               </el-menu-item>
               <el-menu-item index="8-1-2" @click="goTo('/graph/literature/xyjMain')">
                 <i class="el-icon-notebook-2"></i>
                 <span slot="title">西游记人物关系图谱</span>
               </el-menu-item>
               <el-menu-item index="8-1-3" @click="goTo('/graph/literature/shzMain')">
                 <i class="el-icon-notebook-2"></i>
                 <span slot="title">水浒传人物关系图谱</span>
               </el-menu-item>
               <el-menu-item index="8-1-4" @click="goTo('/graph/literature/sgyyMain')">
                 <i class="el-icon-notebook-2"></i>
                 <span slot="title">三国演义人物关系图谱</span>
               </el-menu-item>
             </el-submenu>
             <el-menu-item index="8-2" @click="goTo('/map/mapMain')">
               <i class="el-icon-s-data"></i>
               <span slot="title">书式地图</span>
             </el-menu-item>
           </el-submenu>
         </el-menu>
       </el-aside>
       <el-main hight="600px">
          <router-view></router-view>
       </el-main>
</el-container>

</template>
<script>

export default {
  data () {
    return {
      isCollapse: false,
      activeIndex: '1',
      activeIndex2: '1',
      input: '',
      drawer: false,
      activeName: 'first'
    }
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
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },

    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    goTo (path) {
      this.$router.replace(path)
    },
    handleCommand (path) {
      this.$router.replace(path)
    },
    handleClick () {
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
  .el-main {
    text-align: center;
    line-height: 20px;
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
    width: 60px;
    min-height: 100%;
  }

  .el-row {
    margin-bottom: 0px;
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
    margin-top: 20px;
    margin-left: 5px;
    .shrinkBtn {
      position: fixed;
      left: -18px;
      top: 38px;
      margin-left: 10px;
      transform: rotate(180deg);
    }
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

</style>
