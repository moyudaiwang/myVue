<template>
  <el-container style="{ height: screenHeight + 'px' }; border: 1px">

    <el-container style="height: 890px; border: 1px">
      <el-header>
        <el-row>
          <el-col :span="24" style="background:#669999;height: 60px">
            <div style="float:left; cursor: pointer">
              <h4 style="padding-top: 10px" class="menuTitle radius" @click="goTo('/home/homeMain')">DonQuixotey Book</h4>
            </div>
            <div style="float:left">
              <el-menu :default-active="activeIndex2" class="el-menu-demo" style="background:#669999" mode="horizontal" @select="handleSelect" >
                <el-menu-item index="1" @click="goTo('/book/bookMain')">图书管理</el-menu-item>
                <el-submenu index="1">
                  <template slot="title" @click="goTo('/book/bookMain')">图书交流</template>
                  <el-menu-item index="3-1">购书</el-menu-item>
                  <el-menu-item index="3-2">出售</el-menu-item>
                </el-submenu>
                <el-menu-item index="1" @click="goTo('/article/articleMain')">论坛</el-menu-item>
              </el-menu>
            </div>
            <div style="float:right">
              <el-badge is-dot class="item">
                <el-button class="share-button" icon="el-icon-message-solid" type="primary" @click="drawer = true"></el-button>
              </el-badge>
              <el-dropdown @command="handleCommand" style="padding-top: 10px;padding-right: 20px;">
                <div>
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
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
      <el-main style="height: 100px;padding-left: 0px;padding-right: 0px;padding-top: 0px;">
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

    <el-footer  style=" height: 100%;padding-left: 0px;padding-right: 0px;background: #669999">
      <el-row>
        <el-col :span="24">
          <el-link :underline="false" href="https://www.nppa.gov.cn" target="_blank">国家新闻出版署</el-link>
          <el-link :underline="false" href="http://www.nlc.cn" target="_blank">中国国家图书馆</el-link>
          <el-link :underline="false" href="http://www.ncpssd.org" target="_blank">国家哲学社会科学文献中心</el-link>
          <el-link :underline="false" href="https://data.stats.gov.cn" target="_blank">国家数据</el-link>
          <el-link :underline="false" href="https://www.dha.ac.cn" target="_blank">敦煌研究院</el-link>
          <el-link :underline="false" href="https://www.dpm.org.cn" target="_blank">故宫博物院</el-link>
          <el-link :underline="false" href="http://www.njmuseum.comzh" target="_blank">南京博物院</el-link>
          <el-link :underline="false" href="http://www.sxhm.com" target="_blank">陕西历史博物馆</el-link>
          <el-link :underline="false" href="https://book.douban.com" target="_blank">豆瓣读书</el-link>
          <el-link :underline="false" href="https://culture.ifeng.com" target="_blank">凤凰读书</el-link>
          <el-link :underline="false" href="https://www.kongfz.com" target="_blank">孔夫子旧书网</el-link>
          <el-link :underline="false" href="http://www.aisixiang.com" target="_blank">爱思想网</el-link>
          <el-link :underline="false" href="https://new.shuge.org" target="_blank">书格</el-link>
          <el-link :underline="false" href="https://www.ageeye.cn" target="_blank">观沧海</el-link>
          <el-link :underline="false" href="https://ctext.org" target="_blank">中国哲学书电子化计划</el-link>
          <el-link :underline="false" href="http://www.xn--5rtnx620bw5s.tw/index.php" target="_blank">漢川草廬</el-link>
          <el-link :underline="false" href="http://zhongguose.com#tianlan" target="_blank">中国色</el-link>
          <el-link :underline="false" href="https://www.msdmanuals.cn" target="_blank">默沙东诊疗手册</el-link>
          <el-link :underline="false" href="https://www.geogebra.org" target="_blank">GeoGebra</el-link>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span>豫公网安备 豫ICP备2020035146号    | Copyright ©2020-2022 www.donQuixotey.com All Rights Reserved</span>
          &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
          <el-popover trigger="hover">
            <el-image style="width: 100px; height: 100px" :src="weChatCodeUrl"></el-image>
            <el-avatar style="cursor: pointer" size="small" :src="weChatUrl" slot="reference"></el-avatar>
          </el-popover>
          <el-popover trigger="hover">
            <el-image style="width: 100px; height: 100px" :src="sinaCodeUrl"></el-image>
            <el-avatar style="cursor: pointer" size="small" :src="sinaUrl" slot="reference"></el-avatar>
          </el-popover>
          <el-popover trigger="hover">
            <el-image style="width: 100px; height: 100px" :src="douBanCodeUrl"></el-image>
            <el-avatar style="cursor: pointer" size="small" :src="douBanUrl" slot="reference"></el-avatar>
          </el-popover>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>

</template>
<script>
export default {
  data () {
    return {
      isCollapse: false,
      activeIndex: '1',
      activeIndex2: '1',
      weChatUrl: require('../assets/image/icon/weChat.png'),
      weChatCodeUrl: require('../assets/image/code/weChatCode.jpg'),
      sinaUrl: require('../assets/image/icon/sina.png'),
      sinaCodeUrl: require('../assets/image/code/weChatCode.jpg'),
      douBanUrl: require('../assets/image/icon/douBan.png'),
      douBanCodeUrl: require('../assets/image/code/weChatCode.jpg'),
      activeName:'',
      drawer: false,
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
    handleClick(){
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
