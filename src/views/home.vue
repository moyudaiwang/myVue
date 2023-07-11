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
                <el-button class="share-button" type="primary" @click="login()">test</el-button>
                <el-button class="share-button" icon="el-icon-message-solid" type="primary" @click="drawer = true"></el-button>
              </el-badge>
              <el-badge class="item" v-if="!logged">
                <el-button class="share-button" type="primary" @click="loginTo()">登 录</el-button>
                <el-button class="share-button" type="primary" @click="register()">注 册</el-button>
              </el-badge>
              <el-badge  v-if="logged">
                <el-dropdown @command="handleCommand" style="padding-top: 0px;right: 10px;">
                  <div>
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                  </div>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="/setting/personalMain">个人中心</el-dropdown-item>
                    <el-dropdown-item command="/" @click="loginOut()">退 出</el-dropdown-item> <!--command="/"-->
                  </el-dropdown-menu>
                </el-dropdown>
              </el-badge>
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

        <!--  注册登录弹出框 class="login-container" -->
        <el-dialog title="" :visible.sync="loginVisible" width="20%" :before-close="handleClose" :show-close ="true">
            <el-form :model="loginForm" ref="loginForm" :rules="loginRules" label-position="left" label-width="0px">
              <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号/手机号/邮箱"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" show-password v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
              </el-form-item>
              <el-form-item prop="verifyCode">
                <el-input type="verifyCode" v-model="loginForm.verifyCode" auto-complete="off" placeholder="验证码" class="input-with-select">
                  <template slot="append">
                    <el-button size="mini" v-if="timerTf" @click="receiveCode()" style="cursor: pointer">发送验证码</el-button>
                    <span size="mini" v-if="!timerTf">{{ countDownNum }}秒后重新获取</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" style="width: 100%;border: none" @click="login()">登录</el-button>
            </div>
        </el-dialog>
      </el-main>
    </el-container>

    <el-footer  style=" height: 100%;padding-left: 0px;padding-right: 0px;background: #669999">
      <el-row>
        <el-col :span="24">
          <el-link :underline="false" href="http://www.nlc.cn" target="_blank">中国国家图书馆</el-link>
          <el-link :underline="false" href="http://www.nlc.cn/nmcb/" target="_blank">国家典籍博物馆</el-link>
          <el-link :underline="false" href="http://www.ncpssd.org" target="_blank">国家哲学社会科学文献中心</el-link>
          <el-link :underline="false" href="https://data.stats.gov.cn" target="_blank">国家数据</el-link>
          <el-link :underline="false" href="https://www.chnmuseum.cn/" target="_blank">国家博物馆</el-link>
          <el-link :underline="false" href="https://www.printingmuseum.cn/Home/Index" target="_blank">中国印刷博物馆</el-link>
          <el-link :underline="false" href="https://www.dha.ac.cn" target="_blank">敦煌研究院</el-link>
          <el-link :underline="false" href="https://www.dpm.org.cn" target="_blank">故宫博物院</el-link>
          <el-link :underline="false" href="http://www.njmuseum.com/zh" target="_blank">南京博物院</el-link>
          <el-link :underline="false" href="http://www.sxhm.com" target="_blank">陕西历史博物馆</el-link>
          <el-link :underline="false" href="https://www.jc-museum.cn/" target="_blank">建川博物馆聚落</el-link>
          <el-link :underline="false" href="https://www.tianyige.com.cn/" target="_blank">天一阁博物院</el-link>
          <el-link :underline="false" href="https://www.britishmuseum.org/" target="_blank">大英博物馆</el-link>
          <el-link :underline="false" href="https://www.metmuseum.org/" target="_blank">大都会博物馆</el-link>
          <el-link :underline="false" href="https://www.narahaku.go.jp/" target="_blank">奈良国立博物馆</el-link>
          <el-link :underline="false" href="https://www.seikado.or.jp/" target="_blank">静嘉堂文库美术馆</el-link>
          <el-link :underline="false" href="https://www.louvre.fr/zh/" target="_blank">卢浮宫博物馆</el-link>
          <el-link :underline="false" href="http://www.guanfumuseum.org.cn/" target="_blank">观复博物馆</el-link>
          <el-link :underline="false" href="http://www.rongbaozhai.cn/" target="_blank">荣宝斋</el-link>
          <el-link :underline="false" href="http://www.xlys.org.cn/" target="_blank">西泠印社</el-link>
        </el-col>
        <el-col :span="24">
          <el-link :underline="false" href="https://book.douban.com" target="_blank">豆瓣读书</el-link>
          <el-link :underline="false" href="https://culture.ifeng.com" target="_blank">凤凰读书</el-link>
          <el-link :underline="false" href="https://www.kongfz.com" target="_blank">孔夫子旧书网</el-link>
          <el-link :underline="false" href="http://www.aisixiang.com" target="_blank">爱思想网</el-link>
          <el-link :underline="false" href="https://new.shuge.org" target="_blank">书格</el-link>
          <el-link :underline="false" href="https://www.ageeye.cn" target="_blank">观沧海</el-link>
          <el-link :underline="false" href="https://www.ditushu.com/" target="_blank">地图书</el-link>
          <el-link :underline="false" href="http://amap.zju.edu.cn/" target="_blank">学术地图发布平台</el-link>
          <el-link :underline="false" href="https://ctext.org" target="_blank">中国哲学书电子化计划</el-link>
          <el-link :underline="false" href="http://hgis.fudan.edu.cn/" target="_blank">数字禹贡</el-link>
          <el-link :underline="false" href="http://www.xn--5rtnx620bw5s.tw/index.php" target="_blank">漢川草廬</el-link>
          <el-link :underline="false" href="https://www.wenxianxue.cn/" target="_blank">中国古典文献资源导航系统</el-link>
          <el-link :underline="false" href="http://zhongguose.com#tianlan" target="_blank">中国色</el-link>
          <el-link :underline="false" href="https://www.msdmanuals.cn" target="_blank">默沙东诊疗手册</el-link>
          <el-link :underline="false" href="https://www.nasa.gov/" target="_blank">NASA</el-link>
          <el-link :underline="false" href="https://www.spacex.com/" target="_blank">SpaceX</el-link>
          <el-link :underline="false" href="https://www.uci.org/" target="_blank">UCI</el-link>
          <el-link :underline="false" href="https://www.geogebra.org" target="_blank">GeoGebra</el-link>
          <el-link :underline="false" href="https://neal.fun/who-was-alive/" target="_blank">WhoWasAlive</el-link>
          <el-link :underline="false" href="https://neal.fun/deep-sea/" target="_blank">DeepSea</el-link>
          <el-link :underline="false" href="https://element.eleme.cn/#/zh-CN/component/transfer" target="_blank">elementUI</el-link>
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
<!--          <el-popover trigger="hover">
            <el-image style="width: 100px; height: 100px" :src="sinaCodeUrl"></el-image>
            <el-avatar style="cursor: pointer" size="small" :src="sinaUrl" slot="reference"></el-avatar>
          </el-popover>-->
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
import { setCookie,getCookie ,clearCookie } from '@/utils/login'
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
      logged: false, //是否已登录
      loginVisible:false,
      loginForm: {
        username: '',
        password: '',
        verifyCode: ''
      },
      loginRules:{
        username: [
          { required: true, message: '请输入账号/手机号/邮箱', trigger: 'blur' },
          { min: 5, max: 25, message: '账号错误', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 32, message: '密码错误', trigger: 'blur' }
        ],
        verifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '验证码错误', trigger: 'blur' }
        ]
      },
      timerTf: true,
      countDownNum: 3,
      timer: null,

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

    //发送验证码
    receiveCode() {
      this.timerTf = false
      this.countDownNum = 5
      this.timer = setInterval(() => {
        this.countDownNum--
        if (this.countDownNum <= 0) {
          this.timerTf = true
          clearInterval(this.timer)
        }
      }, 1000)
      this.$emit('receiveCode')
    },

    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },

    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      this.loginVisible = false
    },
    goTo (path) {
      this.$router.replace(path)
    },
    handleCommand (path) {
      this.$router.replace(path)
    },
    handleClick(){
    },
    //登录TO
    loginTo(){
      this.loginVisible = true;
    },
    //登录
    login(){
      //TODO 账号密码及验证码简单验证
        var usernameReg= /^(\w){6,32}$/;
        var passwordReg= /^(\w){6,32}$/;
        var verifyCodeReg= /^(\w){6,32}$/;
        if (!passwordReg.exec(this.loginForm.password)) {
          this.$message({ message: '密码格式6-32位字母数字', type: 'warning' })
        }

      if(getCookie("donQuixotey_loginInfo")){ //判断页面是否有对应Cookie
          clearCookie("donQuixotey_loginInfo");
          setCookie("donQuixotey_loginInfo",this.loginForm.username,1);
          this.logged = !this.logged;
          this.loginVisible = false;
          this.$message({message: '登录成功', type: 'success'})
      }else{
          console.log('2222222')
          //后台验证账号密码
          let accountCodeEntity = {
            account: this.loginForm.username,
            pwd: this.loginForm.password
          }
          var url = '/api/web/login/check'
          this.$axios.post(url, accountCodeEntity).then(response => {
            if (response.data.code == '100200') {
              this.$message({message: response.data.msg, type: 'success'})
              setCookie("donQuixotey_loginInfo",this.loginForm.username,1);
              this.logged = !this.logged;
              this.loginVisible = false;
            } else {
              clearCookie("donQuixotey_loginInfo");   //如没选中，则删除掉对应的Cookie
              this.$message({message: response.data.msg, type: 'warning'})
            }
          }).catch(error => {
            console.log(error)
          })
      }
    },

    //退出
    loginOut(){
      clearCookie("donQuixotey_loginInfo");
      this.logged = !this.logged;
      this.$message({message: '退出成功', type: 'success'})
      this.reload();
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
    margin-top: 10px;
    margin-right: 20px;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 170px auto;
    width: 450px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    /*登录框光环*/
    box-shadow: 0 0 25px #cac6c6;
  }
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
