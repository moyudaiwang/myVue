<template>
  <div class="setting-app">
   {{msg}}
   </div>
</template>

<script>
export default {
  name: 'setting',
  data () {
    return {
      msg: 'hello,personalMain'
    }
  },
  mounted () {
    document.querySelector('body').setAttribute('style')
  },
  beforeDestroy () {
    document.querySelector('body').removeAttribute('style')
  }
}
</script>

<style>
</style>
