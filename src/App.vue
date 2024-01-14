<template>
  <div class="app">

<router-view/>
  </div>
</template>

<script>
import Index from './views/index.vue'
import Login from './views/login.vue'
export default {
  data: function () {
    return {
      indexFlag: true,
      loginFlag: true
    }
  },

  methods: {
    check () {
      alert('Sdfsdfs')
      this.$router.push('/home')
      this.indexFlag = false
      this.loginFlag = true
    }
  },
  components: {
    Index,
    Login
  },
  created () {
    setTimeout(() => {
    }, 1000)
  }
}
</script>
<style>
    /* 整体布局样式，让整个视图都铺满 */
    html, body, #app {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
    }
</style>
