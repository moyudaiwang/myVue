<template>
  <div class="USER-app">
      <div>
           <!--	描述：新增、删除和运行按钮 -->
           <div class="filter-container">
           	 <div class="letf-items" style="float: left;" size="medium" >
                 <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handAddTo()">新  增</el-button>
                 <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-delete" >删  除</el-button>
                 <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-upload2" @click="uploadExcel()">导  入</el-button>
                 <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-download" @click="downloadExcel()">导  出</el-button>
           	 </div>
             <div class="right-items" style="float: right">
                 <el-input placeholder="用户名" v-model="param.userName" size="medium" style="width: 200px;" class="filter-item"/>
                 <el-input placeholder="昵称"   v-model="param.nickname" size="medium" style="width: 200px;" class="filter-item"/>
                 <el-input placeholder="邮箱" v-model="param.email" size="medium" style="width: 200px;" class="filter-item"/>
                 <el-button v-waves class="filter-item" size="medium" type="primary" icon="el-icon-search" @click="handSea()">查11询</el-button>
                 <el-button v-waves class="filter-item" size="medium" type="primary" icon="el-icon-search" @click="onSubmit()">onSubmit</el-button>
           	 </div>
           </div>
      </div>

      <div>
          <!--	描述：项目列表展示-->
           <el-table  :data="tableData" border fit height="470px"style="width: 100%" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" header-align="center">
            <el-table-column type="selection" fixed width="55"></el-table-column>
     <!--   <el-table-column prop="userId" label="用户ID" min-width="150px"></el-table-column> -->
            <el-table-column prop="userName" label="用户名" min-width="150px"></el-table-column>
            <el-table-column prop="nickname" label="昵称" min-width="150px"></el-table-column>
            <el-table-column prop="userForeignName" label="外文名" min-width="180px"></el-table-column>
            <el-table-column prop="sex" label="性别" min-width="50px"></el-table-column>
            <el-table-column prop="birthday" label="出生日期" min-width="130px"></el-table-column>
            <el-table-column prop="phoneNo" label="手机号" min-width="150px"></el-table-column>
            <el-table-column prop="email" label="电子邮箱" min-width="150px"></el-table-column>
            <el-table-column prop="address" label="住址" min-width="150px"></el-table-column>
            <el-table-column prop="avatar" label="头像" min-width="150px"></el-table-column>
            <el-table-column prop="userStatus" label="用户状态" min-width="100px" ></el-table-column>
            <el-table-column prop="remark" label="备注" min-width="150px"></el-table-column>
            <el-table-column prop="createBy" label="创建人" min-width="150px"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" min-width="150px"></el-table-column>
            <el-table-column prop="updateBy" label="修改人" min-width="150px"></el-table-column>
            <el-table-column prop="updateDate" label="修改时间" min-width="150px"></el-table-column>
   <!--     <el-table-column prop="donUserInfoId" label="主键" min-width="150px"></el-table-column>   -->

            <el-table-column label="操作" fixed="right" width="160">
      	      <template slot-scope="scope">
      	        <el-button size="mini"  type="success"  @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
      	        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      	      </template>
      	    </el-table-column>
           </el-table>
           <!--  	描述：分页 -->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
      </div>


      <div>
        	<!--	add 对话框 -->
          <el-dialog title="新增用户信息" :visible.sync="addVisible" width="65%">
      		  <el-form ref="tempData" :rules="rules" :model="tempForm" label-position="left" label-width="100px" style="width: 420px; margin-left:30px;">
      		    <el-form-item label="用户名" prop="projectName">
      		      <el-input v-model="tempForm.projectName" placeholder="用户名"/>
      		    </el-form-item>
      		    <el-form-item label="昵称" prop="projectManager">
      		      <el-input v-model="tempForm.projectManager" placeholder="昵称"/>
      		    </el-form-item>
      		    <el-form-item label="外文名" prop="projectMember">
      		      <el-input v-model="tempForm.projectMember" placeholder="外文名"/>
      		    </el-form-item>
      		  </el-form>
      		  <div slot="footer" class="dialog-footer">
      		    <el-button @click="addVisible = false">取 消</el-button>
      		    <el-button type="primary" @click="createData()">确 定</el-button>
      		  </div>
          </el-dialog>
      </div>


  </div>
</template>
import userInfo from '@/components/views/user/userInfo.vue'
<script>
export default {
  name: 'USER',
  data(){
    const item = {
          userName: '2016-05-02',
          nickname: '王小虎',
          userForeignName: '上海市普陀区金沙江路 1518 弄'
        };
    return{
      param:{
        userName:'',
        nickname:'',
        email:'hello@163.com.cn'
      },
      tempForm: {
         name: ''
      },
      userInfo: {
        userName: "",
        nickname: ""
      },
      tableData1: Array(15).fill(item),
      tableData:[],
      addVisible:false,
      rules: {},
      // 列表数据默认为空
      pageNum:1, //初始页
      pageSize:10, //每页的数据
      total:0
    };
  },
  mounted () {
        this.init()
  },
  methods: {
          // 初始页pageNum、初始每页数据数pageSize和数据data
          handleSizeChange: function (size) {
                  this.pageSize = size;
                  console.log(this.pageSize)  //每页下拉显示数据
                  this.init();
          },
          handleCurrentChange: function(pageNum){
                  this.pageNum = pageNum;
                  console.log(this.pageNum)  //点击第几页
                  this.init();
          },
          handleUserList() {
              this.$http.get('http://localhost:8000/userList').then(res => {  //这是从本地请求的数据接口，
                  this.userList = res.body
              })
          },
          //初始化
          init(){
         // debugger;
              var that  = this;
              let userInfoEntity ={
                userName:this.param.userName,
                nickname:this.param.nickname,
                email:this.param.email,
                pageNum:this.pageNum,
                pageSize:this.pageSize
              }
             var url = "/api/web/userInfo/queryUserInfoPage";
             console.log("url>>>>>",url);
             this.$axios.post(url, userInfoEntity).then(response => {
                     console.log(response.data.list.total)
                     this.tableData = response.data.list;
                     this.total = response.data.total
             }).catch(error => {
                 console.log(error)
             })
          },
          //初始化2
          init2(){
          //debugger;
              var that  = this;
              let userInfoEntity ={
                userName:this.param.userName,
                nickname:this.param.nickname,
                email:this.param.email,
                pageNum:this.pageNum,
                pageSize:this.pageSize
              }
             var url = "/web/userInfo/getUserInfo";
             console.log("url>>>>>",url);
             this.$axios.get('/web/userInfo/getUserInfo', {
                      // get传递的query参数（传递的参数应与后台人员协商，本次模拟不做限制，不做判断）
                      params: {
                        userName: '嬴政'
                      }
                    }).then((response) => {
                      // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
                      console.log(response);
                      console.log(response.data);
                      this.resData = response.data;
                    }).catch((error) => {
                      // catch 指请求出错的处理
                      console.log(error);
             })
          },

      onSubmit(){
          var that  = this;
          var names ='mars';
         // names= that.form.name;
          that.$axios.get('http://localhost:8000/web/userInfo/getUserInfo/ji',{headers: { 'Content-Type':'application/json;charset=UTF-8'}} ).then(function (response) {
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
      },
      handSea(){
          var that  = this;
          //this.init();
          this.init2();
      },
      //新增
      handAddTo(){
        this.addVisible=true;
      },
      //导入
      uploadExcel(){
      },
      //导出
      downloadExcel(){
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
</style>
