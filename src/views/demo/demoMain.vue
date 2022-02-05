<template>
  <div class="USER-app">
      <div>
           <div class="filter-container">
          <div class="letf-items" style="float: left;" size="medium" >
                 <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handAddTo()">新  增</el-button>
                 <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-delete" >删  除</el-button>
                 <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-upload2" @click="uploadExcel()">导er  入</el-button>
                 <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-download" @click="downloadExcel()">导we  出</el-button>
                 <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-download" @click="testCookie()">TESTTESET</el-button>
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
          <!--项目列表展示-->
           <el-table  :data="tableData" border fit height="470px" style="width: 100%" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" header-align="center">
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
          <!--add 对话框 -->
          <el-dialog title="新增用户信息" :visible.sync="addVisible" width="50%">
            <el-form ref="addRef" :model="addForm" :rules="addRules" label-position="right" label-width="100px" style="margin-left:40px;">
                     <el-row>
                         <el-col :span="10">
                                <el-form-item label="用户名" prop="userName">
                                  <el-input v-model="addForm.userName" placeholder="用户名"/>
                                </el-form-item>
                         </el-col>
                         <el-col :span="10">
                                <el-form-item label="昵称" prop="nickname">
                                  <el-input v-model="addForm.nickname" placeholder="昵称"/>
                                </el-form-item>
                         </el-col>
                     </el-row>
                     <el-row>
                         <el-col :span="10">
                              <el-form-item label="外文名" prop="userForeignName">
                                <el-input v-model="addForm.userForeignName" placeholder="外文名"/>
                              </el-form-item>
                         </el-col>
                         <el-col :span="10">
                              <el-form-item label="性别" prop="sex">
                                <el-radio-group v-model="addForm.sex">
                                  <el-radio label="F">女</el-radio>
                                  <el-radio label="M">男</el-radio>
                                </el-radio-group>
                              </el-form-item>
                         </el-col>
                     </el-row>
                     <el-row>
                         <el-col :span="10">
                              <el-form-item label="出生日期" prop="birthday">
                                    <el-date-picker type="date" placeholder="出生日期" v-model="addForm.birthday" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                              </el-form-item>
                         </el-col>
                         <el-col :span="10">
                              <el-form-item label="手机号" prop="phoneNo">
                                <el-input v-model="addForm.phoneNo" placeholder="手机号"/>
                              </el-form-item>
                         </el-col>
                     </el-row>
                     <el-row>
                         <el-col :span="10">
                              <el-form-item label="电子邮箱" prop="email">
                                <el-input v-model="addForm.email" placeholder="电子邮箱"/>
                              </el-form-item>
                         </el-col>
                         <el-col :span="10">
                              <el-form-item label="地址" prop="address">
                                <el-input v-model="addForm.address" placeholder="地址"/>
                              </el-form-item>
                         </el-col>
                     </el-row>
                     <el-row>
                         <el-col :span="10">
                              <el-form-item label="用户状态" prop="userStatus">
                                  <el-select v-model="addForm.userStatus" placeholder="用户状态">
                                      <el-option v-for="item in userStatusOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                  </el-select>
                              </el-form-item>
                         </el-col>
                         <el-col :span="10">
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
          <!--upd 对话框 -->
          <el-dialog title="修改用户信息" :visible.sync="updVisible" width="50%">
            <el-form ref="updRef" :model="updForm" :rules="updRules" label-position="right" label-width="100px" style="margin-left:40px;">
                     <el-row>
                         <el-col :span="10">
                                <el-form-item label="用户名" prop="userName">
                                  <el-input v-model="updForm.userName" placeholder="用户名"/>
                                </el-form-item>
                         </el-col>
                         <el-col :span="10">
                                <el-form-item label="昵称" prop="nickname">
                                  <el-input v-model="updForm.nickname" placeholder="昵称"/>
                                </el-form-item>
                         </el-col>
                     </el-row>
                     <el-row>
                         <el-col :span="10">
                              <el-form-item label="外文名" prop="userForeignName">
                                <el-input v-model="updForm.userForeignName" placeholder="外文名"/>
                              </el-form-item>
                         </el-col>
                         <el-col :span="10">
                              <el-form-item label="性别" prop="sex">
                                <el-radio-group v-model="updForm.sex">
                                  <el-radio label="F">女</el-radio>
                                  <el-radio label="M">男</el-radio>
                                </el-radio-group>
                              </el-form-item>
                         </el-col>
                     </el-row>
                     <el-row>
                         <el-col :span="10">
                              <el-form-item label="出生日期" prop="birthday">
                                    <el-date-picker type="date" placeholder="出生日期" v-model="updForm.birthday" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                              </el-form-item>
                         </el-col>
                         <el-col :span="10">
                              <el-form-item label="手机号" prop="phoneNo">
                                <el-input v-model="updForm.phoneNo" placeholder="手机号"/>
                              </el-form-item>
                         </el-col>
                     </el-row>
                     <el-row>
                         <el-col :span="10">
                              <el-form-item label="电子邮箱" prop="email">
                                <el-input v-model="updForm.email" placeholder="电子邮箱"/>
                              </el-form-item>
                         </el-col>
                         <el-col :span="10">
                              <el-form-item label="地址" prop="address">
                                <el-input v-model="updForm.address" placeholder="地址"/>
                              </el-form-item>
                         </el-col>
                     </el-row>
                     <el-row>
                         <el-col :span="10">
                              <el-form-item label="用户状态" prop="userStatus">
                                  <el-select v-model="updForm.userStatus" placeholder="用户状态">
                                      <el-option v-for="item in userStatusOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                  </el-select>
                              </el-form-item>
                         </el-col>
                         <el-col :span="10">
                              <el-form-item label="备注" prop="remark">
                                <el-input v-model="updForm.remark" placeholder="备注"/>
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
  data () {
    const item = {
      userName: '2016-05-02',
      nickname: '王小虎',
      userForeignName: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      param: {
        userName: '',
        nickname: '',
        email: ''
      },
      userInfo: {
        userName: '',
        nickname: ''
      },
      tableData1: Array(15).fill(item),
      tableData: [],
      addVisible: false,
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
      updVisible: false,
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
      userStatusOpt: [
        {label: '正常', value: 'Y'},
        {label: '暂停', value: 'Z'},
        {label: '注销', value: 'N'}
      ],
      userStatus: true,
      pageNum: 1, // 初始页
      pageSize: 10, // 每页的数据
      total: 0
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 初始页pageNum、初始每页数据数pageSize和数据data
    handSizeChange: function (size) {
      this.pageSize = size
      console.log(this.pageSize) // 每页下拉显示数据
      this.init()
    },
    handCurrentChange: function (pageNum) {
      this.pageNum = pageNum
      console.log(this.pageNum) // 点击第几页
      this.init()
    },
    handUserList () {
      this.$http.get('http://localhost:8000/userList').then(res => { // 这是从本地请求的数据接口，
        this.userList = res.body
      })
    },
    // 初始化&查询
    init () {
      let userInfoEntity = {
        userName: this.param.userName,
        nickname: this.param.nickname,
        email: this.param.email,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      var url = '/api/web/userInfo/queryUserInfoPage'
      console.log('url>>>>>', url)
      this.$axios.post(url, userInfoEntity).then(response => {
        console.log(response.data.list.total)
        this.tableData = response.data.list
        this.total = response.data.total
      }).catch(error => {
        console.log(error)
      })
    },
    onSubmit () {
      this.$axios.get('http://localhost:8000/web/userInfo/getUserInfo/ji', {headers: { 'Content-Type': 'application/json;charset=UTF-8'}}).then(function (response) {
        if (response.data == 'M') {
          this.$message({
            message: '恭喜你，这是男孩' + response.data,
            type: 'success'
          })
        } else {
          this.$message({
            message: '恭喜你，这是女孩' + response.data,
            type: 'success'
          })
        }
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    handQue () {
      this.init()
    },

    testCookie () {
      this.setCookie('kkk', 'vvv', 'sssss')
    },
    setCookie (key, value, t) {
      var oDate = new Date()
      oDate.setDate(oDate.getDate() + t)
      document.cookie = key + '=' + value + '; expires=' + oDate.toDateString()
    },

    // 重置
    reset () {
      this.param.userName = ''
      this.param.nickname = ''
      this.param.email = ''
    },
    // 新增TO
    handAddTo () {
      this.addVisible = true
    },
    // 新增
    handAdd () {
      let userInfoEntity = this.addForm
      var url = '/api/web/userInfo/insertUserInfo'
      this.$axios.post(url, userInfoEntity).then(res => {
        if (res.data.code == '200') {
          this.addVisible = false
          this.$message({message: res.data.msg, type: 'success', center: true, duration: 2000})
        } else {
          this.addVisible = false
          this.$message({message: res.data.msg, type: 'error', center: true, duration: 2000})
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 修改TO
    handUpdTo (row) {
      this.updForm = row
      this.updVisible = true
    },
    // 修改
    handUpd () {
      let userInfoEntity = this.updForm
      var url = '/api/web/userInfo/updateUserInfo'
      this.$axios.post(url, userInfoEntity).then(res => {
        if (res.data.code == '200') {
          this.updVisible = false
          this.$message({message: res.data.msg, type: 'success', center: true, duration: 2000})
        } else {
          this.updVisible = false
          this.$message({message: res.data.msg, type: 'error', center: true, duration: 2000})
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 删除
    handDel (row) {
      let userInfoEntity = row
      console.log(userInfoEntity)
      var url = '/api/web/userInfo/deleteUserInfo'
      this.$axios.post(url, userInfoEntity).then(res => {
        if (res.data.code == '200') {
          this.param = ''
          this.init()
          this.$message({message: res.data.msg, type: 'success', center: true, duration: 2000})
        } else {
          this.param = ''
          this.init()
          this.$message({message: res.data.msg, type: 'error', center: true, duration: 2000})
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 导入
    uploadExcel () {
    },
    // 导出
    downloadExcel () {
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
