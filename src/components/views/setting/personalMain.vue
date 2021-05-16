<template>
  <div class="setting-app">
   {{msg}}
   </div>
</template>

<script>
export default {
  name: 'setting',
  data(){
    return{
      msg:"hello,personalMain"
    };
  },
  mounted() {
          document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
      },
      beforeDestroy() {
          document.querySelector('body').removeAttribute('style')
      }
}
</script>

<style>
</style>
