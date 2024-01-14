<template>
  <div class="main-app">
    <div>
      <div class="filter-container">
        <div class="left-items" style="float: left;">
          <el-button type="primary" icon="el-icon-edit" @click="addTo()">新增</el-button>
          <el-button type="primary" icon="el-icon-delete" @click="delBatch()">删除</el-button>
          <el-button type="primary" icon="el-icon-upload2" @click="uploadTo()">导入</el-button>
          <el-button type="primary" icon="el-icon-download" @click="download()">导出</el-button>
        </div>
        <div class="right-items" style="float: right">
          <el-input placeholder="用户ID/用户名/手机号" v-model="param.queryName" style="width: 200px;margin-right: 10px;" />
          <el-button type="primary" icon="el-icon-search" @click="query()">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh-left" @click="reset()">重置</el-button>
        </div>
      </div>
    </div>

    <div>
      <!--项目列表展示-->
      <el-table ref="table" :data="tableData" @selection-change="handleSelectionChange" border fit :max-height="tableHeight" :header-cell-style="{'text-align':'center','background':'#eef6f6'}" :cell-style="{'text-align':'center'}" header-align="center" >
        <el-table-column type="selection" fixed ></el-table-column>
<!--         <el-table-column prop="userId" label="用户ID" min-width="150px"></el-table-column>-->
         <el-table-column prop="userName" label="用户名" min-width="150px" show-overflow-tooltip></el-table-column>
         <el-table-column prop="nickname" label="昵称" min-width="150px" show-overflow-tooltip></el-table-column>
         <el-table-column prop="userForeignName" label="外文名" min-width="150px" show-overflow-tooltip></el-table-column>
         <el-table-column prop="sex" label="性别" min-width="150px" show-overflow-tooltip></el-table-column>
         <el-table-column prop="birthday" label="出生日期" min-width="150px" show-overflow-tooltip></el-table-column>
         <el-table-column prop="phoneNo" label="手机号" min-width="150px" show-overflow-tooltip></el-table-column>
         <el-table-column prop="email" label="电子邮箱" min-width="150px" show-overflow-tooltip></el-table-column>
         <el-table-column prop="address" label="地址" min-width="150px" show-overflow-tooltip></el-table-column>
         <el-table-column prop="avatar" label="头像" min-width="150px" show-overflow-tooltip></el-table-column>
         <el-table-column prop="userStatus" label="用户状态" min-width="150px" show-overflow-tooltip></el-table-column>
         <el-table-column prop="remark" label="备注" min-width="150px" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" fixed="right" width="100px">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="updTo(scope.row)">编辑</el-button>
            <!--<el-button size="mini" type="danger" @click="handDel(scope.row)">Delete</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handSizeChange"
        @current-change="handCurrentChange"
        :current-page="param.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="param.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <div>
      <el-dialog :title="'新增'+titleName" :visible.sync="insVisible" width="55%">
        <el-form ref="insRef" :model="insForm" :rules="insRules" label-position="right" label-width="100px">
            <el-row>
                <el-col :span="10">
                    <el-form-item label="用户ID" prop="userId">
                        <el-input v-model="insForm.userId" placeholder="用户ID"/>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="insForm.userName" placeholder="用户名"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="昵称" prop="nickname">
                        <el-input v-model="insForm.nickname" placeholder="昵称"/>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="外文名" prop="userForeignName">
                        <el-input v-model="insForm.userForeignName" placeholder="外文名"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="性别" prop="sex">
                      <el-select v-model="insForm.sex" clearable placeholder="性别">
                        <el-option
                          v-for="item in sexOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="出生日期" prop="birthday">
                      <div class="block">
                        <el-date-picker
                          v-model="insForm.birthday"
                          type="date"
                          placeholder="选择日期">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="手机号" prop="phoneNo">
                        <el-input v-model="insForm.phoneNo" placeholder="手机号"/>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="电子邮箱" prop="email">
                        <el-input v-model="insForm.email" placeholder="电子邮箱"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="insForm.address" placeholder="地址"/>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="头像" prop="avatar">
                        <el-input v-model="insForm.avatar" placeholder="头像"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="用户状态" prop="userStatus">
                      <el-select v-model="insForm.userStatus" clearable placeholder="用户状态">
                        <el-option
                          v-for="item in userStatusOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="insForm.remark" placeholder="备注"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="insVisible = false">取消</el-button>
          <el-button type="primary" @click="add()">确定</el-button>
        </div>
      </el-dialog>
    </div>

    <div>
      <el-dialog :title="'修改'+titleName" :visible.sync="updVisible" width="55%">
        <el-form ref="updRef" :model="updForm" :rules="updRules" label-position="right" label-width="100px">
            <el-row>
                <el-col :span="10">
                    <el-form-item label="用户ID" prop="userId">
                        <el-input v-model="updForm.userId" placeholder="用户ID"/>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="updForm.userName" placeholder="用户名"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="昵称" prop="nickname">
                        <el-input v-model="updForm.nickname" placeholder="昵称"/>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="外文名" prop="userForeignName">
                        <el-input v-model="updForm.userForeignName" placeholder="外文名"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="性别" prop="sex">
                        <el-input v-model="updForm.sex" placeholder="性别"/>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="出生日期" prop="birthday">
                        <el-input v-model="updForm.birthday" placeholder="出生日期"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="手机号" prop="phoneNo">
                        <el-input v-model="updForm.phoneNo" placeholder="手机号"/>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="电子邮箱" prop="email">
                        <el-input v-model="updForm.email" placeholder="电子邮箱"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="updForm.address" placeholder="地址"/>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="头像" prop="avatar">
                        <el-input v-model="updForm.avatar" placeholder="头像"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="用户状态" prop="userStatus">
                        <el-input v-model="updForm.userStatus" placeholder="用户状态"/>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="updForm.remark" placeholder="备注"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updVisible = false">取消</el-button>
          <el-button type="primary" @click="upd()">确定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
export default {
  name: 'logMain',
  data () {
    return {
      titleName: '用户信息',
      param: {
        queryName: '',
        pageNum: 1, // 初始页
        pageSize: 10 // 每页的数据
      },
      total: 0,
      multipleSelection: [],
      tableData: [],
      insVisible: false,
      insRules: {},
      insForm: {},
      updVisible: false,
      updRules: {},
      updForm: {},
      userStatusOptions: [
        {label: '正常', value: 'Y'},{label: '锁定', value: 'S'},{label: '其他', value: 'N'}
      ],
      userStatus: true,
      sexOptions: [
        {label: '男', value: 'M'},{label: '女', value: 'F'},{label: '保密', value: 'N'}
      ],
      tableHeight:0,
    }
  },
  mounted () {
    this.$nextTick(()=>{
        	this.tableHeight = window.innerHeight-100
		})
    this.init()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handSizeChange: function (size) {
      this.param.pageSize = size
      this.init()
    },
    handCurrentChange: function (pageNum) {
      this.param.pageNum = pageNum
      this.init()
    },
    // 初始化
    init () {
      let donUserInfoEntity = {
        queryName: this.param.queryName,
        pageNum: this.param.pageNum,
        pageSize: this.param.pageSize
      }
      var url = '/api/web/userInfo/query'
      this.$axios.post(url, donUserInfoEntity).then(res => {
        if (res.data.code == '100200') {
          this.tableData = res.data.object.list
          this.total = res.data.object.total
        } else {
          this.$message({message: res.data.msg, type: 'error'})
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 查询
    query () {
      this.init()
    },
    // 重置
    reset () {
      this.param.queryName = ''
      this.init()
    },
    // 新增TO
    addTo () {
      this.insVisible = true
    },
    // 新增
    add () {
      let donUserInfoEntity = this.insForm
      var url = '/api/web/userInfo/insert'
      this.$axios.post(url, donUserInfoEntity).then(res => {
        if (res.data.code == '100200') {
          this.insVisible = false
          this.insForm = {}
          this.init()
          this.$message({message: res.data.msg, type: 'success', center: true, duration: 2000})
        } else {
          this.insVisible = false
          this.$message({message: res.data.msg, type: 'error', center: true, duration: 2000})
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 修改TO
    updTo (row) {
      this.updForm = row
      this.updVisible = true
    },
    // 修改
    upd () {
      let donUserInfoEntity = this.updForm
      var url = '/api/web/userInfo/update'
      this.$axios.post(url, donUserInfoEntity).then(res => {
        if (res.data.code == '100200') {
          this.updVisible = false
          this.init()
          this.$message({message: res.data.msg, type: 'success', center: true, duration: 2000})
        } else {
          this.updVisible = false
          this.$message({message: res.data.msg, type: 'error', center: true, duration: 2000})
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 批量删除
    delBatch () {
      if (this.multipleSelection.length != 0) {
        this.$confirm('请确认是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let donUserInfoEntityList = this.multipleSelection
          var url = '/api/web/userInfo/delete'
          this.$axios.post(url, donUserInfoEntityList).then(res => {
            if (res.data.code == '100200') {
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
        }).catch(error => {
          console.log(error)
        })
      } else {
        this.$message({message: '请选择要删除的数据', type: 'warning', center: true, duration: 2000})
      }
    },
    // 导入
    uploadTo () {
    },
    // 导出
    download () {
    }
  }

}
</script>

<style>
  /*表头高度 */
  .el-table__header tr, .el-table__header th {
    padding: 0;
  }
  .el-table__body tr, .el-table__body td {
    padding: 0;
  }
  /*表格与表头线对齐 */
  .el-table th.gutter{
    display: table-cell!important;
  }

  /*输入框*/
  .el-input{
    width: 300px;
  }
  /*单选*/
  .radioCss {
    margin: 5px 0px 0px 0px;
    float: left;
  }
  /*按钮靠左对齐*/
  .left-items {
    float: left;
  }
  /*搜索栏、按钮靠右对齐*/
  .right-items {
    float: right;
  }
  /*列表*/
  .el-table {
    width: 100%;
  }
  /*表单*/
  .el-form {
    margin-left:20px;
  }
/* elementui中table超出隐藏提示框宽度 */
.el-tooltip__popper {
  max-width: 200px;
}
</style>
