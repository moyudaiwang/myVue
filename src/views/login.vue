<template>
<div>
  <body id="poster">

    <div class="background">
     <img :src="imgSrc" width="100%" height="100%" alt="" />
    </div>
    <div class="login">
    <el-form class="login-container" label-position="left" label-width="0px">
      <h3 class="login_title">LOGIN</h3>
      <el-form-item>
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>

      <el-form-item>
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>

      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;border: none" @click="login()">登 录</el-button>
      </el-form-item>
    </el-form>
    </div>
  </body>
  </div>
</template>

<script>
import { setCookie,getCookie ,clearCookie } from '@/utils/login'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'C00000000001',
        password: '123456'
      },
      responseResult: [],
      imgSrc: require('../assets/grild001.jpg')
    }
  },
  mounted () {
    if(getCookie("pas")&&getCookie("name")){ //判断页面是否有对应Cookie
        this.loginForm.username=getCookie("name");             //有则写入
        this.loginForm.password=getCookie("pas");
    }else{
        this.loginForm.username="";                            //无则写空
        this.loginForm.password="";
    }
  },
  methods: {
    login () {
      let accountCodeEntity = {
        alien: this.loginForm.username,
        pwd: this.loginForm.password
      }
      var url = '/api/web/portal/login'
      this.$axios.post(url, accountCodeEntity).then(response => {
      //TODO 直接进入首页
      this.$router.replace('/home/homeMain')
        if (response.data.code == '100200') {
          this.$message({message: response.data.msg, type: 'success'})
          //setCookie("name",this.loginForm.username,1);
          //setCookie("pas",this.loginForm.password,1);
          getCookie("name")
          getCookie("pas")
          this.$router.replace('/home/homeMain')
        } else {
          removeCookie("name");   //如没选中，则删除掉对应的Cookie
          removeCookie("pas");   //如没选中，则删除掉对应的Cookie
          this.$message({message: response.data.msg, type: 'warning'})
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
  #poster {
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
    padding: 0;
  }

  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    /*登录框光环*/
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
  }

.background{
    width:100%;
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: absolute;
}

</style>
