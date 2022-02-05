<template>
  <div class="main-app">
    <div>
      <div class="filter-container">
        <div class="letf-items">
          <el-button type="primary" icon="el-icon-edit" @click="insTo()">新增</el-button>
          <el-button type="primary" icon="el-icon-delete" @click="delBatch()">删除</el-button>
          <el-button type="primary" icon="el-icon-upload2" @click="uploadExcel()">导入</el-button>
          <el-button type="primary" icon="el-icon-download" @click="downloadExcel()">导出</el-button>
        </div>
        <div class="right-items">
          <el-input placeholder="请输入内容" v-model="param.queryName" class="input-with-select"></el-input>
          <el-button  type="primary" icon="el-icon-search" @click="query()">查询</el-button>
          <el-button  type="primary" icon="el-icon-refresh-left" @click="reset()">重置</el-button>
        </div>
      </div>
    </div>

    <div>
      <!-- 项目列表展示 -->
      <el-table  :data="tableData" @selection-change="handleSelectionChange" border fit height="520px" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" header-align="center">
        <el-table-column type="selection" fixed ></el-table-column>
         <el-table-column prop="roleId" label="角色ID" min-width="150px"></el-table-column>
         <el-table-column prop="roleType" label="角色类型" min-width="150px"></el-table-column>
         <el-table-column prop="roleName" label="角色名" min-width="150px"></el-table-column>
         <el-table-column prop="roleStatus" label="角色状态" min-width="150px"></el-table-column>
         <el-table-column prop="remark" label="备注" min-width="150px"></el-table-column>
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
                    <el-form-item label="角色ID" prop="roleId">
                        <el-input v-model="insForm.roleId" placeholder="角色ID"/>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="角色类型" prop="roleType">
                        <el-input v-model="insForm.roleType" placeholder="角色类型"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="角色名" prop="roleName">
                        <el-input v-model="insForm.roleName" placeholder="角色名"/>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="角色状态" prop="roleStatus">
                        <el-input v-model="insForm.roleStatus" placeholder="角色状态"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="insForm.remark" placeholder="备注"/>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="insVisible = false">取消</el-button>
          <el-button type="primary" @click="ins()">确定</el-button>
        </div>
      </el-dialog>
    </div>

    <div>
      <el-dialog :title="'修改'+titleName" :visible.sync="updVisible" width="55%">
        <el-form ref="updRef" :model="updForm" :rules="updRules" label-position="right" label-width="100px">
            <el-row>
                <el-col :span="10">
                    <el-form-item label="角色ID" prop="roleId">
                        <el-input v-model="updForm.roleId" placeholder="角色ID"/>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="角色类型" prop="roleType">
                        <el-input v-model="updForm.roleType" placeholder="角色类型"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="角色名" prop="roleName">
                        <el-input v-model="updForm.roleName" placeholder="角色名"/>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="角色状态" prop="roleStatus">
                        <el-input v-model="updForm.roleStatus" placeholder="角色状态"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="updForm.remark" placeholder="备注"/>
                    </el-form-item>
                </el-col>
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
      titleName: '角色信息',
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
        {label: '正常', value: 'Y'}
      ],
      userStatus: true
    }
  },
  mounted () {
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
      let donRoleInfoEntity = {
        queryName: this.param.queryName,
        pageNum: this.param.pageNum,
        pageSize: this.param.pageSize
      }
      var url = '/api/web/roleInfo/query'
      this.$axios.post(url, donRoleInfoEntity).then(res => {
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
    insTo () {
      this.insVisible = true
    },
    // 新增
    ins () {
      let donRoleInfoEntity = this.insForm
      var url = '/api/web/roleInfo/insert'
      this.$axios.post(url, donRoleInfoEntity).then(res => {
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
      let donRoleInfoEntity = this.updForm
      var url = '/api/web/roleInfo/update'
      this.$axios.post(url, donRoleInfoEntity).then(res => {
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
          var url = '/api/web/roleInfo/delete'
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
  .el-table__header tr, .el-table__header th {
    padding: 0;
    height: 40px;
    line-height: 50px;
  }
  .el-table__body tr, .el-table__body td {
    padding: 0;
    height: 40px;
    line-height: 40px;
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
  .letf-items {
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
    margin-left:40px;
  }

</style>
