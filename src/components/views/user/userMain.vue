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
                 <el-button v-waves class="filter-item" size="medium" type="primary" icon="el-icon-search" @click="handQue()">Search</el-button>
                 <el-button v-waves class="filter-item" size="medium" type="primary" icon="el-icon-refresh-left" @click="reset()">Reset</el-button>
       <!--      <el-button v-waves class="filter-item" size="medium" type="primary" icon="el-icon-refresh-left" @click="onSubmit()">onSubmit</el-button>    -->
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
      	        <el-button size="mini"  type="success"  @click="handUpdTo(scope.row)">Edit</el-button>
      	        <el-button size="mini" type="danger" @click="handDel(scope.row)">Delete</el-button>
      	      </template>
      	    </el-table-column>
           </el-table>
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


      <div>
        	<!--	add 对话框 -->
          <el-dialog title="新增用户信息" :visible.sync="addVisible" width="65%">
      		  <el-form ref="addRef" :model="addForm" :rules="addRules" :label-position="right" label-width="100px" style="width: 85%; margin-left:30px;">
                     <el-row>
                         <el-col :span="12">
                                <el-form-item label="用户名" prop="userName">
                                  <el-input v-model="addForm.userName" placeholder="用户名"/>
                                </el-form-item>
                         </el-col>
                         <el-col :span="12">
                                <el-form-item label="昵称" prop="nickname">
                                  <el-input v-model="addForm.nickname" placeholder="昵称"/>
                                </el-form-item>
                         </el-col>
                     </el-row>
                     <el-row>
                         <el-col :span="12">
                              <el-form-item label="外文名" prop="userForeignName">
                                <el-input v-model="addForm.userForeignName" placeholder="外文名"/>
                              </el-form-item>
                         </el-col>
                         <el-col :span="12">
                              <el-form-item label="性别" prop="sex">
                                <el-radio-group v-model="addForm.sex">
                                  <el-radio label="F">女</el-radio>
                                  <el-radio label="M">男</el-radio>
                                </el-radio-group>
                              </el-form-item>
                         </el-col>
                     </el-row>
                     <el-row>
                         <el-col :span="12">
                              <el-form-item label="出生日期" prop="birthday">
                                    <el-date-picker type="date" placeholder="出生日期" v-model="addForm.birthday" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                              </el-form-item>
                         </el-col>
                         <el-col :span="12">
                              <el-form-item label="手机号" prop="phoneNo">
                                <el-input v-model="addForm.phoneNo" placeholder="手机号"/>
                              </el-form-item>
                         </el-col>
                     </el-row>
                     <el-row>
                         <el-col :span="12">
                              <el-form-item label="电子邮箱" prop="email">
                                <el-input v-model="addForm.email" placeholder="电子邮箱"/>
                              </el-form-item>
                         </el-col>
                         <el-col :span="12">
                              <el-form-item label="地址" prop="address">
                                <el-input v-model="addForm.address" placeholder="地址"/>
                              </el-form-item>
                         </el-col>
                     </el-row>
                     <el-row>
                         <el-col :span="12">
                              <el-form-item label="用户状态" prop="userStatus">
                                  <el-select v-model="addForm.userStatus" placeholder="用户状态">
                                      <el-option v-for="item in userStatusOptions":key="item.value" :label="item.label" :value="item.value"></el-option>
                                  </el-select>
                              </el-form-item>
                         </el-col>
                         <el-col :span="12">
                              <el-form-item label="备注" prop="remark">
                                <el-input v-model="addForm.remark" placeholder="备注"/>
                              </el-form-item>
                         </el-col>
                     </el-row>
      		  </el-form>
      		  <div slot="footer" class="dialog-footer">
      		    <el-button @click="addVisible = false">取 消</el-button>
      		    <el-button type="primary" @click="handAdd()">确 定</el-button>
      		  </div>
          </el-dialog>
      </div>
      <div>
        	<!--	upd 对话框 -->
          <el-dialog title="修改用户信息" :visible.sync="updVisible" width="65%">
      		  <el-form ref="updRef" :model="updForm" :rules="updRules" :label-position="right" label-width="100px" style="width: 85%; margin-left:30px;">
<el-row>
    <el-col :span="12">
        <el-form-item label="图书ID" prop="bookId">
            <el-input v-model="addForm.bookId" placeholder="图书ID"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="ISBN" prop="isbn">
            <el-input v-model="addForm.isbn" placeholder="ISBN"/>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="ISBN_PID" prop="isbnPid">
            <el-input v-model="addForm.isbnPid" placeholder="ISBN_PID"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="ISBN_SID" prop="isbnSid">
            <el-input v-model="addForm.isbnSid" placeholder="ISBN_SID"/>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="中文书名" prop="bookName">
            <el-input v-model="addForm.bookName" placeholder="中文书名"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="外文书名" prop="bookForeignName">
            <el-input v-model="addForm.bookForeignName" placeholder="外文书名"/>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="作者" prop="author ">
            <el-input v-model="addForm.author " placeholder="作者"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="作者外文名" prop="authorForeignName ">
            <el-input v-model="addForm.authorForeignName " placeholder="作者外文名"/>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="作者国籍" prop="authorCountry">
            <el-input v-model="addForm.authorCountry" placeholder="作者国籍"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="译者" prop="translator ">
            <el-input v-model="addForm.translator " placeholder="译者"/>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="译者外文名" prop="translatorForeignName">
            <el-input v-model="addForm.translatorForeignName" placeholder="译者外文名"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="责任编辑" prop="editorCharge ">
            <el-input v-model="addForm.editorCharge " placeholder="责任编辑"/>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="封面设计" prop="coverDesign">
            <el-input v-model="addForm.coverDesign" placeholder="封面设计"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="丛书系列" prop="collection ">
            <el-input v-model="addForm.collection " placeholder="丛书系列"/>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="出版社" prop="press">
            <el-input v-model="addForm.press" placeholder="出版社"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="发行单位" prop="issue">
            <el-input v-model="addForm.issue" placeholder="发行单位"/>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="印装厂" prop="printHouse">
            <el-input v-model="addForm.printHouse" placeholder="印装厂"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="定价" prop="price">
            <el-input v-model="addForm.price" placeholder="定价"/>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="货币类型" prop="currencyType ">
            <el-input v-model="addForm.currencyType " placeholder="货币类型"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="首版时间" prop="editionFirstDate">
            <el-input v-model="addForm.editionFirstDate" placeholder="首版时间"/>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="首印时间" prop="impressionFirstDate">
            <el-input v-model="addForm.impressionFirstDate" placeholder="首印时间"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="出版时间" prop="editionDate">
            <el-input v-model="addForm.editionDate" placeholder="出版时间"/>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="印刷时间" prop="impressionDate">
            <el-input v-model="addForm.impressionDate" placeholder="印刷时间"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="版次" prop="edition">
            <el-input v-model="addForm.edition" placeholder="版次"/>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="印次" prop="impression ">
            <el-input v-model="addForm.impression " placeholder="印次"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="印张" prop="sheetsNum ">
            <el-input v-model="addForm.sheetsNum " placeholder="印张"/>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="开本" prop="bookFormat">
            <el-input v-model="addForm.bookFormat" placeholder="开本"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="字数" prop="wordNum">
            <el-input v-model="addForm.wordNum" placeholder="字数"/>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="页数" prop="pageNum">
            <el-input v-model="addForm.pageNum" placeholder="页数"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="印量起始" prop="printNumStart">
            <el-input v-model="addForm.printNumStart" placeholder="印量起始"/>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="印量终止" prop="printNumEnd ">
            <el-input v-model="addForm.printNumEnd " placeholder="印量终止"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="印量" prop="printNum">
            <el-input v-model="addForm.printNum" placeholder="印量"/>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="语言" prop="language">
            <el-input v-model="addForm.language" placeholder="语言"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="中图法分类" prop="clc ">
            <el-input v-model="addForm.clc " placeholder="中图法分类"/>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="四库分类" prop="flc ">
            <el-input v-model="addForm.flc " placeholder="四库分类"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="装帧类型" prop="bindType">
            <el-input v-model="addForm.bindType" placeholder="装帧类型"/>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="长宽高" prop="lwh ">
            <el-input v-model="addForm.lwh " placeholder="长宽高"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="体积(cm^3)" prop="volume ">
            <el-input v-model="addForm.volume " placeholder="体积(cm^3)"/>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="重量(kg)" prop="weight ">
            <el-input v-model="addForm.weight " placeholder="重量(kg)"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="签名本" prop="signFlag">
            <el-input v-model="addForm.signFlag" placeholder="签名本"/>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="铃印本" prop="signetFlag">
            <el-input v-model="addForm.signetFlag" placeholder="铃印本"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="书像" prop="bookAvatar">
            <el-input v-model="addForm.bookAvatar" placeholder="书像"/>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="备注" prop="remark ">
            <el-input v-model="addForm.remark " placeholder="备注"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="创建人" prop="createBy">
            <el-input v-model="addForm.createBy" placeholder="创建人"/>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="创建时间" prop="createDate">
            <el-input v-model="addForm.createDate" placeholder="创建时间"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="修改人" prop="updateBy">
            <el-input v-model="addForm.updateBy" placeholder="修改人"/>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="修改时间" prop="updateDate">
            <el-input v-model="addForm.updateDate" placeholder="修改时间"/>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="主键ID" prop="donBookInfoId ">
            <el-input v-model="addForm.donBookInfoId " placeholder="主键ID"/>
        </el-form-item>
    </el-col>
</el-row>
      		  </el-form>
      		  <div slot="footer" class="dialog-footer">
      		    <el-button @click="updVisible = false">取 消</el-button>
      		    <el-button type="primary" @click="handUpd()">确 定</el-button>
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
        email:''
      },
      userInfo: {
        userName: "",
        nickname: ""
      },
      tableData1: Array(15).fill(item),
      tableData:[],
      addVisible:false,
      addRules: {},
      addForm: {
        userName: '',
        nickname: '',
        userForeignName: '',
        sex: '',
        birthday: '',
        phoneNo: '',
        email: '',
        address: '',
        userStatus: '',
        remark: ''
      },
      updVisible:false,
      updRules: {},
      updForm: {
        userName: '',
        nickname: '',
        userForeignName: '',
        sex: '',
        birthday: '',
        phoneNo: '',
        email: '',
        updress: '',
        userStatus: '',
        remark: ''
      },
      userStatusOptions: [
         {label: '正常', value: 'Y'},
         {label: '暂停', value: 'Z'},
         {label: '注销', value: 'N'}
      ],
      userStatus:true,
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
      handUserList() {
          this.$http.get('http://localhost:8000/userList').then(res => {  //这是从本地请求的数据接口，
              this.userList = res.body
          })
      },
      //初始化&查询
      init(){
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
      onSubmit(){
          var that  = this;
          var names ='mars';
          //names= that.form.name;
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
      handQue(){
          var _this = this;
          this.init();
      },
      //重置
      reset(){
         var _this = this;
         this.param.userName='';
         this.param.nickname='';
         this.param.email='';
      },
      //新增TO
      handAddTo(){
        this.addVisible=true;
      },
      //新增
      handAdd(){
          var that  = this;
          let userInfoEntity =this.addForm;
          var url = "/api/web/userInfo/insertUserInfo";
          this.$axios.post(url, userInfoEntity).then(res => {
             if(res.data.code=='200'){
                this.addVisible=false;
                this.$message({message: res.data.message,type: 'success',center: true,duration:2000});
             }else {
                 this.addVisible=false;
                 this.$message({message: res.data.message,type: 'error',center: true,duration:2000});
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
          let userInfoEntity =this.updForm;
          var url = "/api/web/userInfo/updateUserInfo";
          this.$axios.post(url, userInfoEntity).then(res => {
             if(res.data.code=='200'){
                this.updVisible=false;
                this.$message({message: res.data.message,type: 'success',center: true,duration:2000});
             }else {
                 this.updVisible=false;
                 this.$message({message: res.data.message,type: 'error',center: true,duration:2000});
             }
          }).catch(error => {
             console.log(error)
          })
      },
      //删除
      handDel(row){
          var that  = this;
          let userInfoEntity =row;
          console.log(userInfoEntity)
          var url = "/api/web/userInfo/deleteUserInfo";
          this.$axios.post(url, userInfoEntity).then(res => {
             if(res.data.code=='200'){
                this.param = '';
                this.init();
                this.$message({message: res.data.message,type: 'success',center: true,duration:2000});
             }else {
                 this.param = '';
                 this.init();
                 this.$message({message: res.data.message,type: 'error',center: true,duration:2000});
             }
          }).catch(error => {
             console.log(error)
          })
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
