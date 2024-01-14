<template>
  <div class="USER-app">
      <div>
            <div class="filter-container">
              <div class="letf-items" style="float: left;" size="medium" >
                 <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handAddTo()">新  增</el-button>
                 <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-delete" @click="delBatch(sel)">删  除</el-button>
                 <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-upload2" @click="createTableVisibleTo()">Create Table(ORACLE)</el-button>
                 <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-upload2" @click="createTableVisibleTo()">Create Table(MYSQL)</el-button>
                 <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-download" @click="downloadExcel()">导  出</el-button>
              </div>
              <div class="right-items" style="float: right">
                 <el-input placeholder="图书ID" v-model="param.bookId" size="medium" style="width: 200px;" class="filter-item"/>
                 <el-input placeholder="ISBN" v-model="param.isbn" size="medium" style="width: 200px;" class="filter-item"/>
                 <el-input placeholder="图书名" v-model="param.bookName" size="medium" style="width: 200px;" class="filter-item"/>
                 <el-button v-waves class="filter-item" size="medium" type="primary" icon="el-icon-search" @click="handQue()">搜  索</el-button>
                 <el-button v-waves class="filter-item" size="medium" type="primary" icon="el-icon-refresh-left" @click="reset()">刷  新</el-button>
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
                      <el-button slot="append" icon="el-icon-search" @click="createTableTest()"></el-button>
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
            <div >
              <el-dialog title="提示" :visible.sync="createTableVisible" width="30%">
                <el-upload drag
                         :limit=limitNum
                         :auto-upload="false"
                         accept=".xlsx"
                         :action="uploadUrl()"
                         :before-upload="beforeUploadFile"
                         :on-change="fileChange"
                         :on-exceed="exceedFile"
                         :on-success="handleSuccess"
                         :on-error="handleError"
                         :file-list="fileList">
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">只能上传xlsx文件，且不超过10M</div>
                    </el-upload>
                <span slot="footer" class="dialog-footer">
                  <el-button size="small" @click="createTableVisible = false">取 消</el-button>
                  <el-button size="small" type="primary" @click="createTable()">确 定</el-button>
                </span>
              </el-dialog>
            </div>
      </div>
  </div>
</template>
import bookInfo from '@/components/views/book/bookInfo.vue'
<script>
export default {
  name: 'USER',
  data () {
    return {
      param: {
        path: '',
        type: 'UserEntity'
      },
      input1: '',
      input2: '',
      input3: '',
      select: '',
      bookStatus: true,
      pageNum: 1, // 初始页
      pageSize: 10, // 每页的数据
      total: 0,
      sel: [],
      createTableVisible: false,
      limitNum: 10, // 上传excell时，同时允许上传的最大数
      fileList: [] // excel文件列表
    }
  },
  mounted () {
    // this.init()
  },
  methods: {
    // 初始化&查询
    init () {
      let bookInfoEntity = {
        bookId: this.param.bookId,
        isbn: this.param.isbn,
        bookName: this.param.bookName,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      var url = '/api/web/bookIn'
      console.log('url>>>>>', url)
      this.$axios.post(url, bookInfoEntity).then(response => {
        console.log(response.data.list.total)
        this.tableData = response.data.list
        this.total = response.data.total
      }).catch(error => {
        console.log(error)
      })
    },
    createTableTest () {
      this.$axios.get('http://localhost:8000/web/bookInfo/getBookInfo/ji', {headers: { 'Content-Type': 'application/json;charset=UTF-8'}}).then(function (response) {
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
    // 建表导入
    createTblIm () {
      this.$message.info('建表ing！！')
    },

    // 文件超出个数限制时的钩子
    exceedFile (files, fileList) {
      this.$message.warning(`只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`)
    },
    // 文件状态改变时的钩子
    fileChange (file, fileList) {
      console.log(file.raw)
      this.fileList.push(file.raw)
      console.log(this.fileList)
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile (file) {
      console.log('before upload')
      console.log(file)
      let extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      let size = file.size / 1024 / 1024
      if (extension !== 'xlsx') {
        this.$message.warning('只能上传后缀是.xlsx的文件')
      }
      if (size > 10) {
        this.$message.warning('文件大小不得超过10M')
      }
    },
    // 文件上传成功时的钩子
    handleSuccess (res, file, fileList) {
      this.$message.success('文件上传成功')
    },
    // 文件上传失败时的钩子
    handleError (err, file, fileList) {
      this.$message.error('文件上传失败')
    },
    uploadUrl: function () {
      // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
      return ''
    },
    createTable () {
      if (this.fileList.length === 0) {
        this.$message.warning('请上传文件')
      } else {
        let form = new FormData()
        for (var i = 0; i < this.fileList.length; i++) {
          form.append('excelFiles', this.fileList[i])
        }
        form.append('module', 'okok')
        this.$axios({
          method: 'post',
          url: '/api/web/data/createTable',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: form
        }).then(res => {
          if (res.data.code == '200') {
            this.createTableVisible = false
            this.fileList = []
            this.$message.success(res.data.msg)
          } else {
            this.$message.success(res.data.msg)
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },

    createTableVisibleTo () {
      this.fileList = []
      this.createTableVisible = true
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
    }
</style>
