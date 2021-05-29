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
    data() {
      return {
        activities: [{
          content: '支持使用图标',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        }, {
          content: '新增时间线，头像',
          timestamp: '2020/08/21'
        }, {
          content: '支持自定义尺寸',
          timestamp: '2018-04-03 20:46'
        }, {
          content: '默认样式的节点',
          timestamp: '2018-04-03 20:46'
        }]
      };
    }
  };
</script>
