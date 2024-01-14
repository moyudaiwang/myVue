<template>
  <div>
    <el-card style="height: 89vh">
      <el-select v-model="bookMod" placeholder="请选择" @change="queryMapPoints">
        <el-option
          v-for="(item,index) in bookOpt"
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
<!--        <bm-marker :position="startPoint" :dragging="true" @click="markerCli">
          &lt;!&ndash;展示点的文字说明&ndash;&gt;
            <bm-label content="起点" :labelStyle="{ color: 'black', fontSize: '16px' }" :offset="{ width: -35, height: 25 }" />
        </bm-marker>-->
        <!--点聚合-->

        <bml-marker-clusterer :averageCenter="true">
          <div v-for="(item, index) of markers">
              <bm-marker :position="{ lng: item.lng, lat: item.lat }" :title="item.name" @click="markerCli($event)">
                <!--
                              <bm-label :content="item.landmark" :labelStyle="{ color: 'black', fontSize: '12px' }" :offset="{ width: -35, height: 25 }" />
                -->
              </bm-marker>
          </div>
        </bml-marker-clusterer>
        <!--信息窗体-->
        <bm-info-window :position="infoPoint" :show="infoWindow.show" @close="infoWindowClose" @open="infoWindowOpen">
          <el-descriptions class="margin-top" :title="pointInfo.landmark" :column="3" border>
            <el-descriptions-item>
              <template slot="label"> <i class="el-icon-reading"></i> 书名 </template> {{pointInfo.bookName}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> <i class="el-icon-user"></i> 人物 </template> {{pointInfo.hero}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> <i class="el-icon-sunrise"></i> 年代 </template> {{pointInfo.times}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> <i class="el-icon-files"></i> 相关图书 </template> {{pointInfo.relBook}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> <i class="el-icon-s-custom"></i> 陪访人 </template> {{pointInfo.companion}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> <i class="el-icon-date"></i> 寻访时间 </template> {{pointInfo.searchTime}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> <i class="el-icon-s-ticket"></i> 门票 </template> {{pointInfo.tickets}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> <i class="el-icon-magic-stick"></i> 轶事 </template> {{pointInfo.anecdote}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> <i class="el-icon-location-outline"></i> 地址 </template> {{pointInfo.address}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> <i class="el-icon-location-outline"></i> 备注 </template> {{pointInfo.remark}}
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
import { initMapMenu, queryMapPoints } from '@/api/map'
export default {
  data() {
    return {
      //定位位置信息
      center: {lng: 116.404, lat: 39.915 },
      //检索关键字
      keyword: "",
      //输入框input值
      input3: "",
      startPoint: { lng: 126.404, lat: 39.915 },
      bookMod:"",
      bookOpt:[],
      points: [],
      markers:[],
      infoWindow: { show: false },
      infoPoint: {},
      pointList:[],
      pointInfo: {},


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
    // this.addPoints();
    // this.initMarkers();
    this.initMapMenu();
    this.queryMapPoints();
  },
  methods: {
    initMapMenu(){
      let param = {}
      initMapMenu(param).then(res => {
        this.bookOpt = res.data.object
      })

    },
    queryMapPoints(value){
      const markers = []
      console.log('ssssssssss',this.bookMod)
      console.log('sssssss2342sss',value)
      let param = {
        table: '韦力寻访',
        module: this.bookMod
      }
      queryMapPoints(param).then(res => {
        if (res.data.code == '200') {
          var list = res.data.object;
          this.pointList = [];
          for (let i = 0; i < list.length; i++) {
            if(list[i].x != '' && list[i].x != null){
              const position = list[i]
              position.lng = list[i].x
              position.lat = list[i].y
              this.markers.push(position);
              this.pointList.push(list[i]);
            }
          }
        } else {
          this.$message({message: res.data.msg, type: 'error'})
        }
      }).catch(error => {
        console.log(error)
      })
    },
    //输入框
    inputfz() {
      this.keyword = this.input3;
      this.queryMapPoints();
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
      if(this.infoWindow.show != true ){
        this.infoPoint.lng = e.lng;
        this.infoPoint.lat = e.lat;
        this.pointInfo = e;
        this.infoWindow.show = true
      }else {
        this.infoWindow.show = false;
      }
    },

    infoWindowClose (e) {
      this.infoWindow.show = false
    },
    infoWindowOpen (e) {
      this.infoWindow.show = true
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
    initMarkers(){
      const markers = []
      for (let i = 0; i < 10; i++) {
        const position = {lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21}
        // this.markers.push(position)
      }
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
