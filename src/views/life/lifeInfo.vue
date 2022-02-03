<template>
  <div class="USER-app">
     <!--	描述：新增、删除和运行按钮 -->
     <div class="filter-container">
       <div class="letf-items" style="float: left;" size="medium" >
           <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handAddTo()">新  增</el-button>
           <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-delete" @click="delBatch(sel)">删  除</el-button>
       </div>
       <div class="right-items" style="float: right">
           <el-input placeholder="图书ID" v-model="param.bookId" size="medium" style="width: 200px" class="filter-item"/>
           <el-input placeholder="ISBN" v-model="param.isbn" size="medium" style="width: 200px" class="filter-item"/>
           <el-input placeholder="图书名" v-model="param.bookName" size="medium" style="width: 200px" class="filter-item"/>
           <el-button v-waves class="filter-item" size="medium" type="primary" icon="el-icon-search" @click="handQue()">Search</el-button>
           <el-button v-waves class="filter-item" size="medium" type="primary" icon="el-icon-refresh-left" @click="reset()">Reset</el-button>
       </div>
     </div>

      <div >
            <el-row>
              <el-col :span="4" v-for="(o, index) in 30" :key="o" :offset="index > 0 ? 1 : 0" style="padding: 5px;">
                <el-card :body-style="{ padding: '10px' }" shadow="hover">
                  <el-image :src="url" :preview-src-list="srcList"></el-image>
                  <div style="padding: 15px;">
                    <span>好吃的汉堡</span>
                    <div class="bottom clearfix">
                      <time class="time">{{ currentDate }}</time>
                      <el-button type="text" class="button">操作按钮</el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <!--  	描述：分页 -->
            <el-pagination
                    @size-change="handSizeChange"
                    @current-change="handCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
      </div>

      </div>

  </div>
</template>
import bookInfo from '@/components/views/life/lifeInfo.vue'
<script>
export default {
  name: 'LIFE',
  data(){
    return{
      param:{
        bookId:'B00000000069',
        isbn:'',
        bookName:''
      },
      currentDate: new Date(),
      url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      bookInfo: {
      },
      tableData:[],
      addVisible:false,
      addRules: {},
      addForm: {

      },
      updVisible:false,
      updRules: {},
      updForm: {

      },
      bookStatusOptions: [
         {label: '正常', value: 'Y'},
         {label: '暂停', value: 'Z'},
         {label: '注销', value: 'N'}
      ],
      bookStatus:true,
      pageNum:1, //初始页
      pageSize:10, //每页的数据
      total:0,
      sel:[]
    };
  },
  mounted () {
        this.init()
  },
  methods: {
      // 初始页pageNum、初始每页数据数pageSize和数据data
      handSizeChange: function (size) {
          this.pageSize = size;
          console.log(this.pageSize)  //每页下拉显示数据
          this.init();
      },
      handCurrentChange: function(pageNum){
          this.pageNum = pageNum;
          console.log(this.pageNum)  //点击第几页
          this.init();
      },
      handBookList() {
          this.$http.get('http://localhost:8000/bookList').then(res => {  //这是从本地请求的数据接口，
              this.bookList = res.body
          })
      },
      selChange(sel) {
          this.sel = sel
      },
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
          var url = "/api/web/bookInfo";
          console.log("url>>>>>",url);
          this.$axios.post(url, bookInfoEntity).then(response => {
             console.log(response.data.list.total)
             this.tableData = response.data.list;
             this.total = response.data.total
          }).catch(error => {
             console.log(error)
          })
      },
      handQue(){
          var _this = this;
          this.init();
      },
      //重置
      reset(){
         var _this = this;
         this.param.bookId='';
         this.param.isbn='';
         this.param.bookName='';
         this.init();
      },
      //新增TO
      handAddTo(){
        this.addVisible=true;
      },
      //新增
      handAdd(){
          var that  = this;
          let bookInfoEntity =this.addForm;
          var url = "/api/web/bookInfo/insertBookInfo";
          this.$axios.post(url, bookInfoEntity).then(res => {
             if(res.data.code=='200'){
                this.addVisible=false;
                this.$message({message: res.data.msg,type: 'success',center: true,duration:2000});
             }else {
                 this.addVisible=false;
                 this.$message({message: res.data.msg,type: 'error',center: true,duration:2000});
             }
          }).catch(error => {
             console.log(error)
          })
      },
      //修改TO
      handUpdTo(row){
        this.updForm = row;
        this.updVisible=true;
      },
      //修改
      handUpd(){
          var that  = this;
          let bookInfoEntity =this.updForm;
          var url = "/api/web/bookInfo/updateBookInfo";
          this.$axios.post(url, bookInfoEntity).then(res => {
             if(res.data.code=='200'){
                this.updVisible=false;
                this.$message({message: res.data.msg,type: 'success',center: true,duration:2000});
             }else {
                 this.updVisible=false;
                 this.$message({message: res.data.msg,type: 'error',center: true,duration:2000});
             }
          }).catch(error => {
             console.log(error)
          })
      },
      //删除
      handDel(row){
          var that  = this;
          let bookInfoEntity =row;
          console.log(bookInfoEntity)
          var url = "/api/web/bookInfo/deleteBookInfo";
          this.$axios.post(url, bookInfoEntity).then(res => {
             if(res.data.code=='200'){
                this.param = '';
                this.init();
                this.$message({message: res.data.msg,type: 'success',center: true,duration:2000});
             }else {
                 this.param = '';
                 this.init();
                 this.$message({message: res.data.msg,type: 'error',center: true,duration:2000});
             }
          }).catch(error => {
             console.log(error)
          })
      },
      //批量删除
      delBatch() {
        var donBookInfoIds = this.sel.map(item => item.donBookInfoId).join();//获取所有选中行的id组成的字符串，以逗号分隔
        var params = new URLSearchParams();
        params.append('donBookInfoIds', donBookInfoIds);
        this.$confirm('此操作将永久删除该文件及其子文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           var url = "/api/web/bookInfo/deleteBatchBookInfo";
           this.$axios.post(url,params).then(res => {
              if(res.data.code=='200'){
                 this.init();
                 this.$message({message: res.data.msg,type: 'success',center: true,duration:2000});
              }else {
                  this.init();
                  this.$message({message: res.data.msg,type: 'error',center: true,duration:2000});
              }
           }).catch(error => {
              console.log(error)
           })
        }).catch(error => {
           console.log(error)
        })
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
},
 .time {
    font-size: 13px;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .button {
    padding: 0;
    float: right;
  }
  .image {
    width: 100%;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
</style>
