<template>
<div>
  <body id="poster">
    <div class="background">
     <img :src="imgSrc" width="100%" height="100%" alt="" />
    </div>
  </body>
  </div>
</template>


<script>
    export default {
        name: "404",
        data() {
            return {
                responseResult: [],
               // imgSrc:require('../../assets/eva.jpg')
               // imgSrc:require('../../assets/cosmos008_404_vedio.jpg')
                //imgSrc:require('../../assets/loginBG001.jpg')
            }
        },
        methods: {

        }
    }
</script>

<style>
  #poster {
    background:;
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


.background{
    width:85%;
    height:93%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: absolute;
}

</style>
