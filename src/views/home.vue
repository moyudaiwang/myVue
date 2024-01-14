<template>
  <el-container style="{ height: screenHeight + 'px' }; border: 1px">

    <el-container style="{ height: screenHeight + 'px' }; border: 1px">
      <el-header>
        <el-row>
          <el-col :span="24" style="background:#669999">
            <div style="float:left; cursor: pointer">
              <h4 style="padding-top: 10px" class="menuTitle radius" @click="goTo('/home/homeMain')">DonQuixotey</h4>
            </div>
            <div class="button-login-left">
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
            <div class="button-login-right">
              <el-badge is-dot >
                <el-button type="primary" @click="login()">test1</el-button>
                <el-button type="primary" @click="drawer = true" icon="el-icon-message-solid"></el-button>
              </el-badge>
              <el-badge class="button-login-right-badge" v-if="!logged">
                <el-button type="primary" @click="loginTo()">登录</el-button>
                <el-button type="primary" @click="registerTo()">注册</el-button>
              </el-badge>
              <el-badge class="button-login-right-photo" v-if="logged">
                <el-dropdown @command="handleCommand" style="padding-top: 0px;right: 10px;">
                  <div command="/setting/personalMain">
                    <el-avatar  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                  </div>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item >用户名:{{userInfo.userName}}</el-dropdown-item>
                    <el-dropdown-item command="/setting/personalMain">个人中心</el-dropdown-item>
                    <el-dropdown-item command="/home/homeMain" @click="loginOut()">退 出</el-dropdown-item> <!--command="/"-->
                  </el-dropdown-menu>
                </el-dropdown>
              </el-badge>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main style="padding-top: 0px; padding-left: 0px; padding-bottom: 0px; padding-right: 0px; ">
        <router-view></router-view>
        <el-drawer  :visible.sync="drawer" direction="rtl" size="25%">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
          </el-tabs>
        </el-drawer>

        <!--  登录弹出框 class="login-container" -->
        <el-dialog title="LOGIN" :visible.sync="loginVisible" width="20%" :before-close="loginClose" :show-close ="true">
            <el-form :model="loginForm" ref="loginForm" :rules="loginRules" label-position="left">
              <el-form-item prop="alien">
                <el-input type="text" v-model="loginForm.alien" auto-complete="off" placeholder="用户ID/手机号/邮箱"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" show-password v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
              </el-form-item>
<!--              <el-form-item prop="verifyCode">
                <el-input type="verifyCode" v-model="loginForm.verifyCode" auto-complete="off" placeholder="验证码" class="input-with-select">
                  <template slot="append">
                    <el-button size="mini" v-if="timerTf" @click="receiveCode()" style="cursor: pointer">发送验证码</el-button>
                    <span size="mini" v-if="!timerTf">{{ countDownNum }}秒后重新获取</span>
                  </template>
                </el-input>
              </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" style="width: 100%;border: none" @click="login()">登录</el-button>
            </div>
        </el-dialog>
        <!--  注册弹出框 -->
        <el-dialog title="REGISTER" :visible.sync="registerVisible" width="20%" :before-close="registerClose" :show-close ="true">
          <el-form :model="registerForm" ref="registerForm" :rules="registerRules" label-position="left">
            <el-form-item prop="alien">
              <el-input placeholder="请输入内容" v-model="registerForm.alien" class="input-with-select">
                <el-select v-model="alienType" slot="prepend" placeholder="请选择">
                  <el-option label="用户ID" value="1"></el-option>
                  <el-option label="手机号" value="2"></el-option>
                  <el-option label="邮箱" value="3"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item prop="userName">
              <el-input type="text" v-model="registerForm.userName" auto-complete="off" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" show-password v-model="registerForm.password" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="isPassword">
              <el-input type="password" show-password v-model="registerForm.isPassword" auto-complete="off" placeholder="请确认密码"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" >
              <el-button type="primary" style="width: 100%; border: none" @click="register()">注册</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>

    <el-footer style="height: 100%;background: #669999">
        <el-col :span="24" style="margin-top: 20px">
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
          <el-link :underline="false" href="http://www.guanfumuseum.org.cn/" target="_blank">观复博物馆</el-link>
          <el-link :underline="false" href="https://www.tianyige.com.cn/" target="_blank">天一阁博物院</el-link>
          <el-link :underline="false" href="https://www.britishmuseum.org/" target="_blank">大英博物馆</el-link>
          <el-link :underline="false" href="https://www.metmuseum.org/" target="_blank">大都会博物馆</el-link>
          <el-link :underline="false" href="https://www.narahaku.go.jp/" target="_blank">奈良国立博物馆</el-link>
          <el-link :underline="false" href="https://www.seikado.or.jp/" target="_blank">静嘉堂文库美术馆</el-link>
          <el-link :underline="false" href="https://www.louvre.fr/zh/" target="_blank">卢浮宫博物馆</el-link>
          <el-link :underline="false" href="https://www.loc.gov/" target="_blank">美国国会图书馆</el-link>
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
          <el-link :underline="false" href="https://www.gutenberg.org/" target="_blank">古腾堡计划</el-link>
          <el-link :underline="false" href="https://www.unesco.org/zh" target="_blank">教科文组织</el-link>
          <el-link :underline="false" href="http://zhongguose.com#tianlan" target="_blank">中国色</el-link>
          <el-link :underline="false" href="https://www.msdmanuals.cn" target="_blank">默沙东诊疗手册</el-link>
          <el-link :underline="false" href="https://www.geogebra.org" target="_blank">GeoGebra</el-link>
          <el-link :underline="false" href="https://neal.fun/who-was-alive/" target="_blank">WhoWasAlive</el-link>
          <el-link :underline="false" href="https://neal.fun/deep-sea/" target="_blank">DeepSea</el-link>
          <el-link :underline="false" href="https://element.eleme.cn/#/zh-CN/component/transfer" target="_blank">elementUI</el-link>
        </el-col>
        <el-col :span="24" style="margin-bottom: 20px">
          <span>豫公网安备 豫ICP备2020035146号    | Copyright ©2020-2022 www.donQuixotey.com All Rights Reserved</span>
          &ensp;&ensp;&ensp;&ensp;&ensp;
          <el-popover trigger="hover">
            <el-image class="home-el-image" :src="weChatCodeUrl"></el-image>
            <el-avatar style="cursor: pointer" size="small" :src="weChatUrl" slot="reference"></el-avatar>
          </el-popover>
<!--          <el-popover trigger="hover">
            <el-image style="width: 100px; height: 100px" :src="sinaCodeUrl"></el-image>
            <el-avatar style="cursor: pointer" size="small" :src="sinaUrl" slot="reference"></el-avatar>
          </el-popover>-->
          <el-popover  trigger="hover">
            <el-image class="home-el-image" :src="douBanCodeUrl"></el-image>
            <el-avatar style="cursor: pointer" size="small" :src="douBanUrl" slot="reference"></el-avatar>
          </el-popover>
        </el-col>
    </el-footer>
  </el-container>

</template>
<script>
import { setCookie,getCookie ,clearCookie } from '@/utils/login'
import {  isEmail,isPhone,isNum,replaceSpace } from '@/utils/validate'
import {login,register} from '@/api/common'
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
        alien: 'zhuyin@don.com',
        password: '123456',
        verifyCode: ''
      },
      loginRules:{
        alien: [
          { required: true, message: '请输入账号/手机号/邮箱', trigger: 'blur' },
          { min: 6, max: 32, message: '请输入[6~30]位字母或数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 32, message: '请输入[6~30]位字母或数字', trigger: 'blur' }
        ],
//        verifyCode: [
//          { required: true, message: '请输入验证码', trigger: 'blur' },
//          { min: 6, max: 6, message: '验证码错误', trigger: 'blur' }
//        ]
      },
      registerVisible:false,
      registerForm: {
        alien: '',
        password: '',
        isPassword: '',
        verifyCode: ''
      },
      registerRules:{
        alien: [
          { required: true, message: '请输入账号/手机号/邮箱', trigger: 'blur' },
          { min: 6, max: 32, message: '请输入[6~30]位字母或数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 32, message: '请输入[6~30]位字母或数字', trigger: 'blur' }
        ],
        isPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 32, message: '请输入[6~30]位字母或数字', trigger: 'blur' }
        ],
//        verifyCode: [
//          { required: true, message: '请输入验证码', trigger: 'blur' },
//          { min: 6, max: 6, message: '验证码错误', trigger: 'blur' }
//        ]
      },
      alienType:'1',
      timerTf: true,
      countDownNum: 3,
      timer: null,
      userInfo: {
        userName: '',
      }

    }
    screenHeight: document.body.clientHeight
  },
  mounted () {
    if(getCookie("DON_loginInfo")){
       this.logged = true;
    }
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
    loginClose (key, keyPath) {
      // this.loginVisible = false
      // this.$refs.loginForm.resetFields()
    },
    registerClose (key, keyPath) {
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
      if(getCookie("DON_loginInfo")){ //判断页面是否有对应Cookie
          clearCookie("DON_loginInfo");
          setCookie("DON_loginInfo",this.loginForm.alien,1);
          this.logged = !this.logged;
          this.loginVisible = false;
          this.$message({message: '已登录', type: 'success'})
      }else{
          console.log('2222222')
          //后台验证账号密码
          let param = {
            alien: this.loginForm.alien,
            pwd: this.loginForm.password
          }
          login(param).then(res => {
            if (res.data.code == '100200') {
              this.$message({message: res.data.msg, type: 'success'})
              setCookie("DON_loginInfo",this.loginForm.alien,1);
              this.logged = !this.logged;
              this.loginVisible = false;

              this.userInfo.userName = res.data.object.userName;
              console.log('2222222',this.userInfo.userName)
            } else {
              clearCookie("DON_loginInfo");   //如没选中，则删除掉对应的Cookie
              this.$message({message: res.data.msg, type: 'error'})
            }
          }).catch(error => {
            console.log(error)
          })
      }
    },
    //注册TO
    registerTo(){
      this.registerVisible = true;
    },
    //注册
    register(){
        let ali = this.registerForm.alien.replace(/\s/g,'');
        let um = this.registerForm.userName.replace(/\s/g,'');
        let pwd = this.registerForm.password.replace(/\s/g,'');
        let isPwd = this.registerForm.isPassword.replace(/\s/g,'');
        if(ali.length != this.registerForm.alien.length || um.length != this.registerForm.userName.length ||
          pwd.length != this.registerForm.password.length || isPwd.length != this.registerForm.isPassword.length){
            this.$message({message: '不能存在空格', type: 'error'})
            return
        }
        if(pwd == null || pwd =='' || isPwd == null || isPwd ==''){
            this.$message({message: '密码不能为空', type: 'error'})
            return
        }
        if(pwd != isPwd){
            this.$message({message: '二次确认密码有误', type: 'error'})
            return
        }
        //后台验证账号密码
        let param = {
          alien: this.registerForm.alien,
          alienType: this.alienType,
          userName: this.registerForm.userName,
          pwd: this.registerForm.password
        }
        register(param).then(res => {
          if (res.data.code == '100200') {
            this.$message({message: '注册成功，请登录', type: 'success'})
            this.registerVisible = false;
            this.loginVisible = true;
          } else {
            this.$message({message: res.data.msg, type: 'error'})
          }
        }).catch(error => {
          console.log(error)
        })
    },
    //退出
    loginOut(){
      clearCookie("DON_loginInfo");
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
    padding-left: 0px;
    padding-right: 0px;
  }
  .el-main {
    text-align: center;
    //line-height: 30px;
  }

  .el-footer {
    text-align: center;
    line-height: 25px;
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
    background-color: #eef6f6;
  }
  .button-login-left {
    float: left;
  }
  .button-login-right {
    float: right;
    text-align: center;
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .button-login-right-badge {
    margin-left: 10px;
  }
  .button-login-right-photo {
    margin-left: 20px;
  }
  .el-select .el-input {
    width: 100px;
  }
  .home-el-image {
    width: 100px;
    height: 100px
  }

</style>
