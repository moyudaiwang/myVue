<template>
  <div class="setting-app">
    <baidu-map :center="center" class="bm-view" :zoom="zoom" style="height:700px" @click="getClickInfo" :scroll-wheel-zoom='true'></baidu-map>
  </div>
</template>

<script>
export default {
  name: 'BaiDuMap',
  data () {
    return {
      center: {lng: 118.860488, lat: 32.065631},
      zoom: 10
    }
  },
  methods: {
    handler ({BMap, map}) {
      var point = new BMap.Point(116.393345, 39.913385)
      map.setMapStyleV2({
        styleId: 'bc4a214961fd4c1dfaeda50453419828'
      })
      map.centerAndZoom(point, 13)
      var marker = new BMap.Marker(point) // 创建标注
      map.addOverlay(marker) // 将标注添加到地图中
      var circle = new BMap.Circle(point, 6, { strokeColor: 'Red', strokeWeight: 6, strokeOpacity: 1, Color: 'Red', fillColor: '#f03' })
      map.addOverlay(circle)
      map.setMapType(BMAP_EARTH_MAP)
    },
    getClickInfo (e) {
      console.log(e.point.lng)
      console.log(e.point.lat)
      this.center.lng = e.point.lng
      this.center.lat = e.point.lat
    }
  },

  mounted () {
    // document.querySelector('body').setAttribute('style')
  }
}
</script>

<style>
</style>
