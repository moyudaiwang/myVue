<template>
  <div>
    <el-card style="height: 89vh">
      <el-select v-model="bookMod" placeholder="请选择">
        <el-option
          v-for="item in bookOpt"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input placeholder="请输入地址" v-model="input3" class="input-with-select" >
        <el-button slot="append" icon="el-icon-search" @click="inputfz" >搜索</el-button>
      </el-input>
      <!--
    scroll-wheel-zoom是是否可以缩放
    @ready是图加载完后触发事件
    center是位置定位
    zoom是缩放大小限制
    inertial-dragging是允许惯性拖拽
   -->
      <baidu-map class="bm-view" :zoom="11" :center="center" inertial-dragging @ready="mapReady" @click="clickEvent" :scroll-wheel-zoom="true">
        <!-- 比例尺   anchor="BMAP_ANCHOR_BOTTOM_RIGHT"代表放在右下角 -->
        <bm-scale anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-scale>
        <!-- 定位控件   anchor="BMAP_ANCHOR_BOTTOM_RIGHT"代表放在右下角 -->
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
        <!-- 地区检索  keyword：关键字搜索   @searchcomplete：检索完成后的回调函数   auto-viewport：检索结束后是否自动调整地图事业  -->
        <bm-local-search :keyword="keyword" @searchcomplete="search" :auto-viewport="true" class="search"></bm-local-search>
        <!-- 缩放控件   anchor代表控件停靠位置   anchor="BMAP_ANCHOR_TOP_RIGHT"代表放在右上角-->
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        <!-- 起点终点 dragging：是否能够拖拽 -->
        <bm-marker :position="startPoint" :dragging="true" @click="markerCli">
          <!--展示点的文字说明-->
          <!--  <bm-label content="起点" :labelStyle="{ color: 'black', fontSize: '16px' }" :offset="{ width: -35, height: 25 }" /> -->
        </bm-marker>
        <!--点聚合-->
        <bml-marker-clusterer :averageCenter="true">
          <bm-marker v-for="(item, index) of markers" :key = "index" :position="{ lng: item.lng, lat: item.lat }" :title="item.name" @click="markerCli"></bm-marker>
        </bml-marker-clusterer>
        <!--信息窗体-->
        <bm-info-window :position="infoPoint" :show="infoWindow.show" @close="infoWindowClose" @open="infoWindowOpen">
          <p v-text="infoWindow.contents"></p>
          <el-descriptions class="margin-top" title="李白墓" :column="3" :size="size" border>
            <template slot="extra">
              <el-button type="primary" size="small">更多</el-button>
            </template>
            <el-descriptions-item>
              <template slot="label"> <i class="el-icon-reading"></i> 书名 </template> 觅经记
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> <i class="el-icon-user"></i> 人物 </template> 李白
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> <i class="el-icon-sunrise"></i> 年代 </template> 唐代
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> <i class="el-icon-files"></i> 相关图书 </template> 《李太白全集》
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> <i class="el-icon-s-custom"></i> 陪访人 </template> 卜若愚
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> <i class="el-icon-date"></i> 寻访时间 </template> 2018.12.05
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> <i class="el-icon-s-ticket"></i> 门票 </template> 40
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> <i class="el-icon-magic-stick"></i> 轶事 </template> 中午没吃饭
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> <i class="el-icon-location-outline"></i> 地址 </template> 江苏省苏州市吴中区吴中大道 1188 号
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> <i class="el-icon-location-outline"></i> 备注 </template> 备注
            </el-descriptions-item>
          </el-descriptions>
        </bm-info-window>
        <!--海量点-->
<!--
        <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_STAR" color="red" size="BMAP_POINT_SIZE_SMALL" @click="clickPoint"></bm-point-collection>
-->
        <!--全景地图控件-->
        <!--<bm-panorama></bm-panorama>-->


      </baidu-map>
    </el-card>
  </div>
</template>

<script>
//引入组件
import {
  BaiduMap,
  BmControl,
  BmView,
  BmAutoComplete,
  BmLocalSearch,
  BmMarker,
  BmGeolocation,
  BmlMarkerClusterer
} from "vue-baidu-map";
export default {
  data() {
    return {
      //定位位置信息
      center: {lng: 126.404, lat: 39.915 },
      //检索关键字
      keyword: "",
      //输入框input值
      input3: "",
      startPoint: { lng: 126.404, lat: 39.915 },
      bookMod:"",
      bookOpt:[{ value: '觅经记', label: '觅经记' },
        { value: '觅理记', label: '觅理记' },
        { value: '觅曲记', label: '觅曲记' },
        { value: '觅圣记', label: '觅圣记' },
        { value: '觅诗记', label: '觅诗记' },
      ],
      points: [],
      markers:[],
      infoWindow: { show: true, contents: '' },
      infoPoint: { lng: 126.404, lat: 39.915 },


    };
  },
  //需要引入的组件
  components: {
    BaiduMap,
    BmControl,
    BmView,
    BmAutoComplete,
    BmLocalSearch,
    BmMarker,
    BmGeolocation,
    BmlMarkerClusterer
  },
  mounted () {
    this.addPoints();
    this.initMarkers();
  },
  methods: {
    initMarkers(){
      const markers = []
      for (let i = 0; i < 10; i++) {
        const position = {lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21}
        this.markers.push(position)
      }
    },
    //输入框
    inputfz() {
      this.keyword = this.input3;
    },
    clickEvent(){
    },
    search(){
    },
    //地图加载后的回调
    mapReady({ BMap, map }) {
      //保存this指向，因为在百度的回调中this不指向vue
      const _this = this;
      // 获取自动定位方法
      var geolocation = new BMap.Geolocation();
      // 获取自动定位获取的坐标信息
      geolocation.getCurrentPosition(
        function (r) {
          //可以console.log看一下这个r，他里面包含了检索到的位置信息。下面就把两个维度信息赋值给center来定位
          //_this.center = {
          //  lng: r.point.lng,
          //  lat: r.point.lat,
          //};
        },
        //启用高精度
        { enableHighAccuracy: true }
      );
    },
    markerCli(e){
        console.log('sssssssssssssss')
        this.infoPoint.lng = e.point.lng
        this.infoPoint.lat = e.point.lat
        this.infoWindow.show = true
        // alert(`单击点的坐标为ssss：${e.point.lng}, ${e.point.lat}, ${e.point.tx}`);
    },

    infoWindowClose (e) {
      this.infoWindow.show = false
    },
    infoWindowOpen (e) {
      this.infoWindow.show = true
    },
    clear () {
      this.infoWindow.contents = ''
    },

    clickPoint (e) {
      console.log('sssssssssssssss')
      alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}, ${e.point.tx}`);
    },
    addPoints () {
      const points = [];
      for (var i = 0; i < 1000; i++) {
        const position = {lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21, tx:Math.random() * 2}
        points.push(position)
      }
      this.points = points
    },


  }
};
</script>

<style scoped>
/* 给个宽高 */
.bm-view {
  height: 700px;
  width: auto;
}
.input-with-select {
  width: 400px;
  margin-bottom: 5px;
}
.search {
  height: 300px;
  overflow: auto;
}
</style>
