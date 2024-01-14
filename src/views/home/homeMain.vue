<template>
  <div>
    <el-carousel :interval="5000"  height="800px">
      <el-carousel-item v-for="item in imagesbox" :key="item.id">
        <img :src="item.idView" class="image">
      </el-carousel-item>
    </el-carousel>

<!--    <div >
      <el-row >
        <el-col :span="6">
          <el-card class="box-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span>图书资讯</span>
                <el-button class="button" text><i class="el-icon-more"></i></el-button>
              </div>
            </template>
            <div v-for="o in 4" :key="o" class="text item">{{ '《受命（终局版）》在北京举行新书发布会 ' + o }}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span>行业动态</span>
                <el-button class="button" text><i class="el-icon-more"></i></el-button>
              </div>
            </template>
            <div v-for="o in 4" :key="o" class="text item">{{ '《受命（终局版）》在北京举行新书发布会 ' + o }}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span>书人书事</span>
                <el-button class="button" text><i class="el-icon-more"></i></el-button>
              </div>
            </template>
            <div v-for="o in 4" :key="o" class="text item">{{ '张爱玲与鲁迅 ' + o }}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span>书情书话</span>
                <el-button class="button" text><i class="el-icon-more"></i></el-button>
              </div>
            </template>
            <div v-for="o in 4" :key="o" class="text item">{{ '张爱玲与鲁迅 ' + o }}</div>
          </el-card>
        </el-col>
      </el-row>
    </div>-->
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

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text {
  font-size: 10px;
}
.item {
  margin-bottom: 10px;
}
.box-card {
  width: 475px;
}
</style>
