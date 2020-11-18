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
          <!--	描述：项目列表展示-->
           <el-table  :data="tableData" border fit height="470px"style="width: 100%" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" header-align="center">
            <el-table-column type="selection" fixed width="55"></el-table-column>
            <el-table-column prop="bookId" label="图书ID" min-width="150px"></el-table-column>
            <el-table-column prop="isbn" label="ISBN" min-width="150px"></el-table-column>
            <el-table-column prop="isbnPid" label="ISBN_PID" min-width="150px"></el-table-column>
            <el-table-column prop="isbnSid" label="ISBN_SID" min-width="150px"></el-table-column>
            <el-table-column prop="bookName" label="中文书名" min-width="150px"></el-table-column>
            <el-table-column prop="bookForeignName" label="外文书名" min-width="150px"></el-table-column>
            <el-table-column prop="author" label="作者" min-width="150px"></el-table-column>
            <el-table-column prop="authorForeignName" label="作者外文名" min-width="150px"></el-table-column>
            <el-table-column prop="authorCountry" label="作者国籍" min-width="150px"></el-table-column>
            <el-table-column prop="translator" label="译者" min-width="150px"></el-table-column>
            <el-table-column prop="translatorForeignName" label="译者外文名" min-width="150px"></el-table-column>
            <el-table-column prop="editorCharge" label="责任编辑" min-width="150px"></el-table-column>
            <el-table-column prop="coverDesign" label="封面设计" min-width="150px"></el-table-column>
            <el-table-column prop="collection" label="丛书系列" min-width="150px"></el-table-column>
            <el-table-column prop="press" label="出版社" min-width="150px"></el-table-column>
            <el-table-column prop="issue" label="发行单位" min-width="150px"></el-table-column>
            <el-table-column prop="printHouse" label="印装厂" min-width="150px"></el-table-column>
            <el-table-column prop="price" label="定价" min-width="150px"></el-table-column>
            <el-table-column prop="currencyType" label="货币类型" min-width="150px"></el-table-column>
            <el-table-column prop="editionFirstDate" label="首版时间" min-width="150px"></el-table-column>
            <el-table-column prop="impressionFirstDate" label="首印时间" min-width="150px"></el-table-column>
            <el-table-column prop="editionDate" label="出版时间" min-width="150px"></el-table-column>
            <el-table-column prop="impressionDate" label="印刷时间" min-width="150px"></el-table-column>
            <el-table-column prop="edition" label="版次" min-width="150px"></el-table-column>
            <el-table-column prop="impression" label="印次" min-width="150px"></el-table-column>
            <el-table-column prop="sheetsNum" label="印张" min-width="150px"></el-table-column>
            <el-table-column prop="bookFormat" label="开本" min-width="150px"></el-table-column>
            <el-table-column prop="wordNum" label="字数" min-width="150px"></el-table-column>
            <el-table-column prop="pageNum" label="页数" min-width="150px"></el-table-column>
            <el-table-column prop="printNumStart" label="印量起始" min-width="150px"></el-table-column>
            <el-table-column prop="printNumEnd" label="印量终止" min-width="150px"></el-table-column>
            <el-table-column prop="printNum" label="印量" min-width="150px"></el-table-column>
            <el-table-column prop="language" label="语言" min-width="150px"></el-table-column>
            <el-table-column prop="clc" label="中图法分类" min-width="150px"></el-table-column>
            <el-table-column prop="flc" label="四库分类" min-width="150px"></el-table-column>
            <el-table-column prop="bindType" label="装帧类型" min-width="150px"></el-table-column>
            <el-table-column prop="lwh" label="长宽高" min-width="150px"></el-table-column>
            <el-table-column prop="volume" label="体积(cm^3)" min-width="150px"></el-table-column>
            <el-table-column prop="weight" label="重量(kg)" min-width="150px"></el-table-column>
            <el-table-column prop="signFlag" label="签名本" min-width="150px"></el-table-column>
            <el-table-column prop="signetFlag" label="铃印本" min-width="150px"></el-table-column>
            <el-table-column prop="bookAvatar" label="书像" min-width="150px"></el-table-column>
            <el-table-column prop="remark" label="备注" min-width="150px"></el-table-column>
            <el-table-column prop="createBy" label="创建人" min-width="150px"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" min-width="150px"></el-table-column>
            <el-table-column prop="updateBy" label="修改人" min-width="150px"></el-table-column>
            <el-table-column prop="updateDate" label="修改时间" min-width="150px"></el-table-column>
            <el-table-column prop="donBookInfoId" label="主键ID" min-width="150px"></el-table-column>

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
          <el-dialog title="新增图书信息" :visible.sync="addVisible" width="65%">
      		  <el-form ref="addRef" :model="addForm" :rules="addRules" :label-position="right" label-width="100px" style="width: 85%; margin-left:30px;">
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
      		    <el-button @click="addVisible = false">取 消</el-button>
      		    <el-button type="primary" @click="handAdd()">确 定</el-button>
      		  </div>
          </el-dialog>
      </div>
      <div>
        	<!--	upd 对话框 -->
          <el-dialog title="修改图书信息" :visible.sync="updVisible" width="65%">
      		  <el-form ref="updRef" :model="updForm" :rules="updRules" :label-position="right" label-width="100px" style="width: 85%; margin-left:30px;">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="图书ID" prop="bookId">
                            <el-input v-model="updForm.bookId" placeholder="图书ID"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="ISBN" prop="isbn">
                            <el-input v-model="updForm.isbn" placeholder="ISBN"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="ISBN_PID" prop="isbnPid">
                            <el-input v-model="updForm.isbnPid" placeholder="ISBN_PID"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="ISBN_SID" prop="isbnSid">
                            <el-input v-model="updForm.isbnSid" placeholder="ISBN_SID"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="中文书名" prop="bookName">
                            <el-input v-model="updForm.bookName" placeholder="中文书名"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="外文书名" prop="bookForeignName">
                            <el-input v-model="updForm.bookForeignName" placeholder="外文书名"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="作者" prop="author ">
                            <el-input v-model="updForm.author " placeholder="作者"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="作者外文名" prop="authorForeignName ">
                            <el-input v-model="updForm.authorForeignName " placeholder="作者外文名"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="作者国籍" prop="authorCountry">
                            <el-input v-model="updForm.authorCountry" placeholder="作者国籍"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="译者" prop="translator ">
                            <el-input v-model="updForm.translator " placeholder="译者"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="译者外文名" prop="translatorForeignName">
                            <el-input v-model="updForm.translatorForeignName" placeholder="译者外文名"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="责任编辑" prop="editorCharge ">
                            <el-input v-model="updForm.editorCharge " placeholder="责任编辑"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="封面设计" prop="coverDesign">
                            <el-input v-model="updForm.coverDesign" placeholder="封面设计"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="丛书系列" prop="collection ">
                            <el-input v-model="updForm.collection " placeholder="丛书系列"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="出版社" prop="press">
                            <el-input v-model="updForm.press" placeholder="出版社"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="发行单位" prop="issue">
                            <el-input v-model="updForm.issue" placeholder="发行单位"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="印装厂" prop="printHouse">
                            <el-input v-model="updForm.printHouse" placeholder="印装厂"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="定价" prop="price">
                            <el-input v-model="updForm.price" placeholder="定价"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="货币类型" prop="currencyType ">
                            <el-input v-model="updForm.currencyType " placeholder="货币类型"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="首版时间" prop="editionFirstDate">
                            <el-input v-model="updForm.editionFirstDate" placeholder="首版时间"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="首印时间" prop="impressionFirstDate">
                            <el-input v-model="updForm.impressionFirstDate" placeholder="首印时间"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="出版时间" prop="editionDate">
                            <el-input v-model="updForm.editionDate" placeholder="出版时间"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="印刷时间" prop="impressionDate">
                            <el-input v-model="updForm.impressionDate" placeholder="印刷时间"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="版次" prop="edition">
                            <el-input v-model="updForm.edition" placeholder="版次"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="印次" prop="impression ">
                            <el-input v-model="updForm.impression " placeholder="印次"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="印张" prop="sheetsNum ">
                            <el-input v-model="updForm.sheetsNum " placeholder="印张"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="开本" prop="bookFormat">
                            <el-input v-model="updForm.bookFormat" placeholder="开本"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="字数" prop="wordNum">
                            <el-input v-model="updForm.wordNum" placeholder="字数"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="页数" prop="pageNum">
                            <el-input v-model="updForm.pageNum" placeholder="页数"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="印量起始" prop="printNumStart">
                            <el-input v-model="updForm.printNumStart" placeholder="印量起始"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="印量终止" prop="printNumEnd ">
                            <el-input v-model="updForm.printNumEnd " placeholder="印量终止"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="印量" prop="printNum">
                            <el-input v-model="updForm.printNum" placeholder="印量"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="语言" prop="language">
                            <el-input v-model="updForm.language" placeholder="语言"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="中图法分类" prop="clc ">
                            <el-input v-model="updForm.clc " placeholder="中图法分类"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="四库分类" prop="flc ">
                            <el-input v-model="updForm.flc " placeholder="四库分类"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="装帧类型" prop="bindType">
                            <el-input v-model="updForm.bindType" placeholder="装帧类型"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="长宽高" prop="lwh ">
                            <el-input v-model="updForm.lwh " placeholder="长宽高"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="体积(cm^3)" prop="volume ">
                            <el-input v-model="updForm.volume " placeholder="体积(cm^3)"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="重量(kg)" prop="weight ">
                            <el-input v-model="updForm.weight " placeholder="重量(kg)"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="签名本" prop="signFlag">
                            <el-input v-model="updForm.signFlag" placeholder="签名本"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="铃印本" prop="signetFlag">
                            <el-input v-model="updForm.signetFlag" placeholder="铃印本"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="书像" prop="bookAvatar">
                            <el-input v-model="updForm.bookAvatar" placeholder="书像"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="备注" prop="remark ">
                            <el-input v-model="updForm.remark " placeholder="备注"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="创建人" prop="createBy">
                            <el-input v-model="updForm.createBy" placeholder="创建人"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="创建时间" prop="createDate">
                            <el-input v-model="updForm.createDate" placeholder="创建时间"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="修改人" prop="updateBy">
                            <el-input v-model="updForm.updateBy" placeholder="修改人"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="修改时间" prop="updateDate">
                            <el-input v-model="updForm.updateDate" placeholder="修改时间"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="主键ID" prop="donBookInfoId ">
                            <el-input v-model="updForm.donBookInfoId " placeholder="主键ID"/>
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
import bookInfo from '@/components/views/book/bookInfo.vue'
<script>
export default {
  name: 'USER',
  data(){
    return{
      param:{
        bookId:'',
        isbn:'',
        bookName:''
      },
      bookInfo: {
      },
      tableData:[],
      addVisible:false,
      addRules: {},
      addForm: {
          bookId : '',
          isbn : '',
          isbnPid : '',
          isbnSid : '',
          bookName : '',
          bookForeignName : '',
          author : '',
          authorForeignName  : '',
          authorCountry : '',
          translator : '',
          translatorForeignName : '',
          editorCharge : '',
          coverDesign : '',
          collection : '',
          press : '',
          issue : '',
          printHouse : '',
          price : '',
          currencyType : '',
          editionFirstDate : '',
          impressionFirstDate : '',
          editionDate : '',
          impressionDate : '',
          edition : '',
          impression  : '',
          sheetsNum  : '',
          bookFormat : '',
          wordNum : '',
          pageNum : '',
          printNumStart : '',
          printNumEnd  : '',
          printNum : '',
          language : '',
          clc  : '',
          flc  : '',
          bindType : '',
          lwh  : '',
          volume  : '',
          weight  : '',
          signFlag : '',
          signetFlag : '',
          bookAvatar : '',
          remark  : '',
          createBy : '',
          createDate : '',
          updateBy : '',
          updateDate : '',
          donBookInfoId : ''
      },
      updVisible:false,
      updRules: {},
      updForm: {
          bookId : '',
          isbn : '',
          isbnPid : '',
          isbnSid : '',
          bookName : '',
          bookForeignName : '',
          author  : '',
          authorForeignName  : '',
          authorCountry : '',
          translator  : '',
          translatorForeignName : '',
          editorCharge  : '',
          coverDesign : '',
          collection  : '',
          press : '',
          issue : '',
          printHouse : '',
          price : '',
          currencyType  : '',
          editionFirstDate : '',
          impressionFirstDate : '',
          editionDate : '',
          impressionDate : '',
          edition : '',
          impression  : '',
          sheetsNum  : '',
          bookFormat : '',
          wordNum : '',
          pageNum : '',
          printNumStart : '',
          printNumEnd  : '',
          printNum : '',
          language : '',
          clc  : '',
          flc  : '',
          bindType : '',
          lwh  : '',
          volume  : '',
          weight  : '',
          signFlag : '',
          signetFlag : '',
          bookAvatar : '',
          remark  : '',
          createBy : '',
          createDate : '',
          updateBy : '',
          updateDate : '',
          donBookInfoId : ''
      },
      bookStatusOptions: [
         {label: '正常', value: 'Y'},
         {label: '暂停', value: 'Z'},
         {label: '注销', value: 'N'}
      ],
      bookStatus:true,
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
      handBookList() {
          this.$http.get('http://localhost:8000/bookList').then(res => {  //这是从本地请求的数据接口，
              this.bookList = res.body
          })
      },
      //初始化&查询
      init(){
          var that  = this;
          let bookInfoEntity ={
            bookName:this.param.bookName,
            nickname:this.param.nickname,
            email:this.param.email,
            pageNum:this.pageNum,
            pageSize:this.pageSize
          }
          var url = "/api/web/bookInfo/queryBookInfoPage";
          console.log("url>>>>>",url);
          this.$axios.post(url, bookInfoEntity).then(response => {
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
      },
      handQue(){
          var _this = this;
          this.init();
      },
      //重置
      reset(){
         var _this = this;
         this.param.bookName='';
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
          let bookInfoEntity =this.addForm;
          var url = "/api/web/bookInfo/insertBookInfo";
          this.$axios.post(url, bookInfoEntity).then(res => {
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
          let bookInfoEntity =this.updForm;
          var url = "/api/web/bookInfo/updateBookInfo";
          this.$axios.post(url, bookInfoEntity).then(res => {
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
          let bookInfoEntity =row;
          console.log(bookInfoEntity)
          var url = "/api/web/bookInfo/deleteBookInfo";
          this.$axios.post(url, bookInfoEntity).then(res => {
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
