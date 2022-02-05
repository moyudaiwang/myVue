<template>
<el-collapse v-model="activeName" accordion>
  <el-collapse-item title="系统" name="1">
    <div>唐吉诃德</div>
  </el-collapse-item>
  <el-collapse-item title="网站名称" name="2">
    <div>缓存鱼</div>
  </el-collapse-item>
  <el-collapse-item title="网站首页地址" name="3">
    <div>www.cachefish.cc</div>
  </el-collapse-item>
  <el-collapse-item title="备案/许可证号" name="4">
    <div>豫ICP备2020035146号</div>
  </el-collapse-item>
  <el-collapse-item title="网站域名" name="5">
    <div>cachefish.cc</div>
  </el-collapse-item>
  <el-collapse-item title="备案/许可证号" name="6">
    <div>豫ICP备2020035146号</div>
  </el-collapse-item>
</el-collapse>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      activeName: '1'
    }
  }
}
</script>

<style>
</style>
