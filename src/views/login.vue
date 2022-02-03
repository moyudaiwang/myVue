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
    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                responseResult: [],
                imgSrc:require('../assets/grild001.jpg')
            }
        },
        methods: {
            login() {
                var that  = this;
                let accountCodeEntity ={
                  account:this.loginForm.username,
                  pwd:this.loginForm.password
                }
                var url = "/api/web/login/check";
                this.$axios.post(url, accountCodeEntity).then(response => {
                     if(response.data.code=='100200'){
                          that.$message({message: response.data.msg,type: 'success'});
                          this.$router.replace('/user/userInfoMain');
                     }else{
                          that.$message({message: response.data.msg,type: 'warning'});
                     }
                }).catch(error => {
                   that.$message({message: response.data.msg,type: 'error'});
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
    //登录框光环
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
