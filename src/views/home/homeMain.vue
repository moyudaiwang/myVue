<template>
  <div>
    <el-carousel :interval="5000"  height="500px">
      <el-carousel-item v-for="item in imagesbox" :key="item.id">
        <img :src="item.idView" class="image">
      </el-carousel-item>
    </el-carousel>

    <div >
      </br>
      <span style="float:left;font-weight:bold">咨询</span>
      </br>
      <el-divider></el-divider>
      <span style="float:left;font-weight:bold">咨询</span>
      </br>
      <el-divider></el-divider>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      imagesbox: [
        {id: 0, idView: require('../../assets/home/banner1.jpg')},
        {id: 1, idView: require('../../assets/home/banner2.jpg')},
        {id: 2, idView: require('../../assets/home/banner3.jpg')}
      ]
    }
  },
  methods: {

  },
  mounted () {
  }
}

</script>
<style >
.el-carousel__item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
    .carousel-image {
      max-width: 100%;
      max-height: 100%;
    }
}

</style>
