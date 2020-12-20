<template>
  <div class="USER-app">
      <div>
           <!--	描述：新增、删除和运行按钮 -->
           <div class="filter-container">
           	 <div class="letf-items" style="float: left;" size="medium" >
                 <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handAddTo()">新  增</el-button>
                 <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-delete" @click="delBatch(sel)">删  除</el-button>
                 <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-upload2" @click="uploadExcel()">导  入</el-button>
                 <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-download" @click="downloadExcel()">导  出</el-button>
           	 </div>
             <div class="right-items" style="float: right">
                 <el-input placeholder="图书ID" v-model="param.bookId" size="medium" style="width: 200px;" class="filter-item"/>
                 <el-input placeholder="ISBN" v-model="param.isbn" size="medium" style="width: 200px;" class="filter-item"/>
                 <el-input placeholder="图书名" v-model="param.bookName" size="medium" style="width: 200px;" class="filter-item"/>
                 <el-button v-waves class="filter-item" size="medium" type="primary" icon="el-icon-search" @click="handQue()">Search</el-button>
                 <el-button v-waves class="filter-item" size="medium" type="primary" icon="el-icon-refresh-left" @click="reset()">Reset</el-button>
       <!--      <el-button v-waves class="filter-item" size="medium" type="primary" icon="el-icon-refresh-left" @click="onSubmit()">onSubmit</el-button>    -->
           	 </div>
           </div>
      </div>
      <div>
            <div >
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>根据实体生成创建表语句</span>
                  </div>
                  <div>
                 <el-input placeholder="生成结果文件路径" v-model="param.path" size="medium" style="width: 200px;" class="filter-item"/>
                  <div style="margin-top: 5px;">
                    <el-input placeholder="请输入实体" v-model="param.type" class="input-with-select">
                      <el-select v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="ENTITY" value="entity"></el-option>
                        <el-option label="DTO" value="dto"></el-option>
                      </el-select>
                      <el-button slot="append" icon="el-icon-search" @click="createTable()"></el-button>
                    </el-input>
                  </div>
                  </div>
                </el-card>
            </div>
            <div >
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>卡片名称</span>
                    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                  </div>
                  <div v-for="o in 4" :key="o" class="text item">
                    {{'列表内容 ' + o }}
                  </div>
                </el-card>
            </div>
      </div>
  </div>
</template>
import bookInfo from '@/components/views/book/bookInfo.vue'
<script>
export default {
  name: 'USER',
  data(){
    return{
      param:{
        path:'',
        type:'UserEntity'
      },
      input1: '',
      input2: '',
      input3: '',
      select: '',
      bookStatus:true,
      pageNum:1, //初始页
      pageSize:10, //每页的数据
      total:0,
      sel:[]
    };
  },
  mounted () {
        //this.init()
  },
  methods: {
      //初始化&查询
      init(){
          var that  = this;
          let bookInfoEntity ={
            bookId:this.param.bookId,
            isbn:this.param.isbn,
            bookName:this.param.bookName,
            pageNum:this.pageNum,
            pageSize:this.pageSize
          }
          var url = "/api/web/bookIn";
          console.log("url>>>>>",url);
          this.$axios.post(url, bookInfoEntity).then(response => {
             console.log(response.data.list.total)
             this.tableData = response.data.list;
             this.total = response.data.total
          }).catch(error => {
             console.log(error)
          })
      },
      createTable(){
          var that  = this;
          var names ='mars';
          //names= that.form.name;
          that.$axios.get('http://localhost:8000/web/bookInfo/getBookInfo/ji',{headers: { 'Content-Type':'application/json;charset=UTF-8'}} ).then(function (response) {
               if(response.data=='M'){
                    that.$message({
                      message: '恭喜你，这是男孩'+response.data,
                      type: 'success'
                    });
               }else{
                    that.$message({
                      message: '恭喜你，这是女孩'+response.data,
                      type: 'success'
                    });
               }
               console.log(response)
          }).catch(function (error) {
              that.$message.error('请求失败！');
          });
      }
  }

}
</script>

<style>
/*表头高度 */

.el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 40px;
    line-height: 50px;
}
.el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 40px;
    line-height: 40px;
}
/*表格与表头线对齐 */
.el-table th.gutter{
	    display: table-cell!important;
}

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 700px;
  }

    .el-select .el-input {
      width: 130px;
    }
    .input-with-select .el-input-group__prepend {
      background-color: #fff;
    }
</style>
