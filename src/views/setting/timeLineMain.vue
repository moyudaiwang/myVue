<template>
  <div class="block" >
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :timestamp="activity.timestamp">
        {{activity.content}}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activities: [
        {
          content: '新增时间线，头像',
          timestamp: '2020-08-21 01:01',
          type: 'success'
        },
        {
          content: '系统前后台发布1.1.0版本',
          timestamp: '2022-02-03 01:01',
          type: 'success'
        }
      ]
    }
  }
}
</script>
<style scoped>
::v-deep .el-timeline-item__timestamp.is-top {
    position: absolute;
    left: -117px;
    top: -3px;
    color: #333333;
}
::v-deep .el-timeline {
    padding-left: 150px;
}
/deep/.el-timeline-item__timestamp.is-top {
    position: absolute;
    left: -117px;
    top: -3px;
    color: #333333;
}
/deep/.el-timeline {
    padding-left: 150px;
}
</style>
