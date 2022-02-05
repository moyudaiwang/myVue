<template>
    <div class="USER-app">
        <div>
            <div class="filter-container">
                <div class="letf-items" style="float: left;" size="medium" >
                    <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handAddTo()">新  增</el-button>
                    <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-delete" @click="delBatch()">删  除</el-button>
                    <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-upload2" @click="uploadExcelTo()">导  入</el-button>
                    <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-download" @click="downloadExcel()">导  出</el-button>
                </div>
                <div class="right-items" style="float: right">
                    <el-input placeholder="图书ID/ISBN/图书名" v-model="param.queryName" size="medium" style="width: 200px;" class="filter-item"/>
                    <el-button v-waves class="filter-item" size="medium" type="primary" icon="el-icon-search" @click="handQue()">Search</el-button>
                    <el-button v-waves class="filter-item" size="medium" type="primary" icon="el-icon-refresh-left" @click="reset()">Reset</el-button>
                    <!-- <el-button v-waves class="filter-item" size="medium" type="primary" icon="el-icon-refresh-left" @click="onSubmit()">onSubmit</el-button>    -->
                </div>
            </div>
        </div>

        <div>
          <!--项目列表展示-->
           <el-table  :data="tableData" @selection-change="handleSelectionChange" border fit height="470px"style="width: 100%" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" header-align="center">
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
            <el-table-column label="操作" fixed="right" width="100">
         <template slot-scope="scope">
           <el-button size="mini"  type="success"  @click="handUpdTo(scope.row)">Edit</el-button>
          <!-- <el-button size="mini" type="danger" @click="handDel(scope.row)">Delete</el-button>   -->
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
        <!--add 对话框 -->
          <el-dialog title="新增图书信息" :visible.sync="addVisible" width="50%">
            <el-form ref="addRef" :model="addForm" :rules="addRules" label-position="right" label-width="100px" style="margin-left:40px;">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="图书ID" prop="bookId">
                            <el-input v-model="addForm.bookId" placeholder="图书ID"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="ISBN" prop="isbn">
                            <el-input v-model="addForm.isbn" placeholder="ISBN"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="ISBN_PID" prop="isbnPid">
                            <el-input v-model="addForm.isbnPid" placeholder="ISBN_PID"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="ISBN_SID" prop="isbnSid">
                            <el-input v-model="addForm.isbnSid" placeholder="ISBN_SID"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="中文书名" prop="bookName">
                            <el-input v-model="addForm.bookName" placeholder="中文书名"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="外文书名" prop="bookForeignName">
                            <el-input v-model="addForm.bookForeignName" placeholder="外文书名"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="作者" prop="author ">
                            <el-input v-model="addForm.author " placeholder="作者"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="作者外文名" prop="authorForeignName ">
                            <el-input v-model="addForm.authorForeignName " placeholder="作者外文名"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="作者国籍" prop="authorCountry">
                            <el-input v-model="addForm.authorCountry" placeholder="作者国籍"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="译者" prop="translator ">
                            <el-input v-model="addForm.translator " placeholder="译者"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="译者外文名" prop="translatorForeignName">
                            <el-input v-model="addForm.translatorForeignName" placeholder="译者外文名"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="责任编辑" prop="editorCharge ">
                            <el-input v-model="addForm.editorCharge " placeholder="责任编辑"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="封面设计" prop="coverDesign">
                            <el-input v-model="addForm.coverDesign" placeholder="封面设计"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="丛书系列" prop="collection ">
                            <el-input v-model="addForm.collection " placeholder="丛书系列"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="出版社" prop="press">
                            <el-input v-model="addForm.press" placeholder="出版社"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="发行单位" prop="issue">
                            <el-input v-model="addForm.issue" placeholder="发行单位"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="印装厂" prop="printHouse">
                            <el-input v-model="addForm.printHouse" placeholder="印装厂"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="定价" prop="price">
                            <el-input v-model="addForm.price" placeholder="定价"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="货币类型" prop="currencyType ">
                            <el-input v-model="addForm.currencyType " placeholder="货币类型"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="首版时间" prop="editionFirstDate">
                            <el-date-picker v-model="addForm.editionFirstDate" type="date" placeholder="首版时间" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="首印时间" prop="impressionFirstDate">
                            <el-date-picker v-model="addForm.impressionFirstDate" type="date" placeholder="首印时间" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="出版时间" prop="editionDate">
                            <el-date-picker v-model="addForm.editionDate" type="date" placeholder="出版时间" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="印刷时间" prop="impressionDate">
                            <el-date-picker v-model="addForm.impressionDate" type="date" placeholder="印刷时间" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="版次" prop="edition">
                            <el-input v-model="addForm.edition" placeholder="版次"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="印次" prop="impression ">
                            <el-input v-model="addForm.impression " placeholder="印次"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="印张" prop="sheetsNum ">
                            <el-input v-model="addForm.sheetsNum " placeholder="印张"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="开本" prop="bookFormat">
                            <el-input v-model="addForm.bookFormat" placeholder="开本"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="字数" prop="wordNum">
                            <el-input v-model="addForm.wordNum" placeholder="字数"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="页数" prop="pageNum">
                            <el-input v-model="addForm.pageNum" placeholder="页数"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="印量起始" prop="printNumStart">
                            <el-input v-model="addForm.printNumStart" placeholder="印量起始"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="印量终止" prop="printNumEnd ">
                            <el-input v-model="addForm.printNumEnd " placeholder="印量终止"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="印量" prop="printNum">
                            <el-input v-model="addForm.printNum" placeholder="印量"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="语言" prop="language">
                            <el-input v-model="addForm.language" placeholder="语言"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="中图法分类" prop="clc ">
                            <el-input v-model="addForm.clc " placeholder="中图法分类"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="四库分类" prop="flc ">
                            <el-input v-model="addForm.flc " placeholder="四库分类"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="装帧类型" prop="bindType">
                            <el-input v-model="addForm.bindType" placeholder="装帧类型"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="长宽高" prop="lwh ">
                            <el-input v-model="addForm.lwh " placeholder="长宽高"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="体积(cm^3)" prop="volume ">
                            <el-input v-model="addForm.volume " placeholder="体积(cm^3)"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="重量(kg)" prop="weight ">
                            <el-input v-model="addForm.weight " placeholder="重量(kg)"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="签名本" prop="signFlag">
                            <el-input v-model="addForm.signFlag" placeholder="签名本"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="铃印本" prop="signetFlag">
                            <el-input v-model="addForm.signetFlag" placeholder="铃印本"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="书像" prop="bookAvatar">
                            <el-input v-model="addForm.bookAvatar" placeholder="书像"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="备注" prop="remark ">
                            <el-input v-model="addForm.remark " placeholder="备注"/>
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

          <el-dialog title="修改图书信息" :visible.sync="updVisible" width="50%">
            <el-form ref="updRef" :model="updForm" :rules="updRules" label-position="right" label-width="100px" style="margin-left:40px;">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="图书ID" prop="bookId">
                            <el-input v-model="updForm.bookId" placeholder="图书ID"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="ISBN" prop="isbn">
                            <el-input v-model="updForm.isbn" placeholder="ISBN"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="ISBN_PID" prop="isbnPid">
                            <el-input v-model="updForm.isbnPid" placeholder="ISBN_PID"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="ISBN_SID" prop="isbnSid">
                            <el-input v-model="updForm.isbnSid" placeholder="ISBN_SID"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="中文书名" prop="bookName">
                            <el-input v-model="updForm.bookName" placeholder="中文书名"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="外文书名" prop="bookForeignName">
                            <el-input v-model="updForm.bookForeignName" placeholder="外文书名"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="作者" prop="author ">
                            <el-input v-model="updForm.author " placeholder="作者"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="作者外文名" prop="authorForeignName ">
                            <el-input v-model="updForm.authorForeignName " placeholder="作者外文名"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="作者国籍" prop="authorCountry">
                            <el-input v-model="updForm.authorCountry" placeholder="作者国籍"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="译者" prop="translator ">
                            <el-input v-model="updForm.translator " placeholder="译者"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="译者外文名" prop="translatorForeignName">
                            <el-input v-model="updForm.translatorForeignName" placeholder="译者外文名"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="责任编辑" prop="editorCharge ">
                            <el-input v-model="updForm.editorCharge " placeholder="责任编辑"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="封面设计" prop="coverDesign">
                            <el-input v-model="updForm.coverDesign" placeholder="封面设计"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="丛书系列" prop="collection ">
                            <el-input v-model="updForm.collection " placeholder="丛书系列"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="出版社" prop="press">
                            <el-input v-model="updForm.press" placeholder="出版社"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="发行单位" prop="issue">
                            <el-input v-model="updForm.issue" placeholder="发行单位"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="印装厂" prop="printHouse">
                            <el-input v-model="updForm.printHouse" placeholder="印装厂"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="定价" prop="price">
                            <el-input v-model="updForm.price" placeholder="定价"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="货币类型" prop="currencyType ">
                            <el-input v-model="updForm.currencyType " placeholder="货币类型"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="首版时间" prop="editionFirstDate">
                            <el-date-picker v-model="updForm.editionFirstDate" type="date" placeholder="首版时间" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="首印时间" prop="impressionFirstDate">
                            <el-date-picker v-model="updForm.impressionFirstDate" type="date" placeholder="首印时间" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="出版时间" prop="editionDate">
                            <el-date-picker v-model="updForm.editionDate" type="date" placeholder="出版时间" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="印刷时间" prop="impressionDate">
                            <el-date-picker v-model="updForm.impressionDate" type="date" placeholder="印刷时间" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="版次" prop="edition">
                            <el-input v-model="updForm.edition" placeholder="版次"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="印次" prop="impression ">
                            <el-input v-model="updForm.impression " placeholder="印次"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="印张" prop="sheetsNum ">
                            <el-input v-model="updForm.sheetsNum " placeholder="印张"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="开本" prop="bookFormat">
                            <el-input v-model="updForm.bookFormat" placeholder="开本"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="字数" prop="wordNum">
                            <el-input v-model="updForm.wordNum" placeholder="字数"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="页数" prop="pageNum">
                            <el-input v-model="updForm.pageNum" placeholder="页数"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="印量起始" prop="printNumStart">
                            <el-input v-model="updForm.printNumStart" placeholder="印量起始"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="印量终止" prop="printNumEnd ">
                            <el-input v-model="updForm.printNumEnd " placeholder="印量终止"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="印量" prop="printNum">
                            <el-input v-model="updForm.printNum" placeholder="印量"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="语言" prop="language">
                            <el-input v-model="updForm.language" placeholder="语言"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="中图法分类" prop="clc ">
                            <el-input v-model="updForm.clc " placeholder="中图法分类"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="四库分类" prop="flc ">
                            <el-input v-model="updForm.flc " placeholder="四库分类"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="装帧类型" prop="bindType">
                            <el-input v-model="updForm.bindType" placeholder="装帧类型"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="长宽高" prop="lwh ">
                            <el-input v-model="updForm.lwh " placeholder="长宽高"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="体积(cm^3)" prop="volume ">
                            <el-input v-model="updForm.volume " placeholder="体积(cm^3)"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="重量(kg)" prop="weight ">
                            <el-input v-model="updForm.weight " placeholder="重量(kg)"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="签名本" prop="signFlag">
                            <el-input v-model="updForm.signFlag" placeholder="签名本"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="铃印本" prop="signetFlag">
                            <el-input v-model="updForm.signetFlag" placeholder="铃印本"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="书像" prop="bookAvatar">
                            <el-input v-model="updForm.bookAvatar" placeholder="书像"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="备注" prop="remark ">
                            <el-input v-model="updForm.remark " placeholder="备注"/>
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

      <div>
      <el-dialog title="导入" :visible.sync="uplVisible" width="50%">
           <el-upload
                ref="upload"
                class="upload-demo"
                action
                accept=".xlsx"
                :limit=limitNum
                :auto-upload="false"
                :before-upload="beforeUpload"
                :on-change="handleChange"
                :on-remove="handleRemove"
                :on-exceed="handleExceed"
                :on-success="handleSuccess"
                :on-error="handleError"
                :file-list="fileList"
              >
                <el-button size="small" type="text">+点击上传</el-button>
              </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button size="small">取消</el-button>
          <el-button size="small" type="primary" @click="uploadExcel">上传</el-button>
        </span>
      </el-dialog>
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
        queryName: 'B00000000069',
        pageNum: 1, // 初始页
        pageSize: 10 // 每页的数据
      },
      total: 0,
      multipleSelection: [],
      tableData: [],
      addVisible: false,
      addRules: {},
      addForm: {
        bookId: '',
        isbn: '',
        isbnPid: '',
        isbnSid: '',
        bookName: '',
        bookForeignName: '',
        author: '',
        authorForeignName: '',
        authorCountry: '',
        translator: '',
        translatorForeignName: '',
        editorCharge: '',
        coverDesign: '',
        collection: '',
        press: '',
        issue: '',
        printHouse: '',
        price: '',
        currencyType: '',
        editionFirstDate: '',
        impressionFirstDate: '',
        editionDate: '',
        impressionDate: '',
        edition: '',
        impression: '',
        sheetsNum: '',
        bookFormat: '',
        wordNum: '',
        pageNum: '',
        printNumStart: '',
        printNumEnd: '',
        printNum: '',
        language: '',
        clc: '',
        flc: '',
        bindType: '',
        lwh: '',
        volume: '',
        weight: '',
        signFlag: '',
        signetFlag: '',
        bookAvatar: '',
        remark: '',
        createBy: '',
        createDate: '',
        updateBy: '',
        updateDate: '',
        donBookInfoId: ''
      },
      updVisible: false,
      updRules: {},
      updForm: {
        bookId: '',
        isbn: '',
        isbnPid: '',
        isbnSid: '',
        bookName: '',
        bookForeignName: '',
        author: '',
        authorForeignName: '',
        authorCountry: '',
        translator: '',
        translatorForeignName: '',
        editorCharge: '',
        coverDesign: '',
        collection: '',
        press: '',
        issue: '',
        printHouse: '',
        price: '',
        currencyType: '',
        editionFirstDate: '',
        impressionFirstDate: '',
        editionDate: '',
        impressionDate: '',
        edition: '',
        impression: '',
        sheetsNum: '',
        bookFormat: '',
        wordNum: '',
        pageNum: '',
        printNumStart: '',
        printNumEnd: '',
        printNum: '',
        language: '',
        clc: '',
        flc: '',
        bindType: '',
        lwh: '',
        volume: '',
        weight: '',
        signFlag: '',
        signetFlag: '',
        bookAvatar: '',
        remark: '',
        createBy: '',
        createDate: '',
        updateBy: '',
        updateDate: '',
        donBookInfoId: ''
      },
      bookStatusOptions: [
        {label: '正常', value: 'Y'},
        {label: '暂停', value: 'Z'},
        {label: '注销', value: 'N'}
      ],
      bookStatus: true,
      sel: [],
      uplVisible: false,
      limitNum: 1, // 上传excell时，同时允许上传的最大数
      fileList: [] // excel文件列表
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 初始页pageNum、初始每页数据数pageSize和数据data
    handSizeChange: function (size) {
      this.param.pageSize = size
      this.init()
    },
    handCurrentChange: function (pageNum) {
      this.param.pageNum = pageNum
      this.init()
    },
    handBookList () {
      this.$http.get('http://localhost:8000/bookList').then(res => { // 这是从本地请求的数据接口，
        this.bookList = res.body
      })
    },
    // 初始化&查询
    init () {
      let bookInfoEntity = {
        queryName: this.param.queryName,
        pageNum: this.param.pageNum,
        pageSize: this.param.pageSize
      }
      var url = '/api/web/bookInfo/query'
      this.$axios.post(url, bookInfoEntity).then(response => {
        this.tableData = response.data.object.list
        this.total = response.data.object.total
      }).catch(error => {
        console.log(error)
      })
    },
    onSubmit () {
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
        this.$message.error('请求失败！')
      })
    },
    handQue () {
      this.init()
    },
    // 重置
    reset () {
      this.param.queryName = ''
      this.init()
    },
    // 新增TO
    handAddTo () {
      this.addVisible = true
    },
    // 新增
    handAdd () {
      let bookInfoEntity = this.addForm
      var url = '/api/web/bookInfo/insert'
      this.$axios.post(url, bookInfoEntity).then(res => {
        if (res.data.code == '100200') {
          this.addVisible = false
          this.init()
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
      let bookInfoEntity = this.updForm
      var url = '/api/web/bookInfo/update'
      this.$axios.post(url, bookInfoEntity).then(res => {
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
          let donBookInfoEntityList = this.multipleSelection
          var url = '/api/web/bookInfo/delete'
          this.$axios.post(url, donBookInfoEntityList).then(res => {
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
        }).catch(() => {
        })
      } else {
        this.$message({message: '请选择要删除的数据', type: 'warning', center: true, duration: 2000})
      }
    },
    // 导入
    uploadExcelTo () {
      this.uplVisible = true
    },

    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUpload (file) {
      let extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      let size = file.size / 1024 / 1024
      if (extension !== 'xlsx') {
        this.$message.warning('只能上传后缀是.xlsx的文件')
      }
      if (size > 10) {
        this.$message.warning('文件大小不得超过10M')
      }
    },

    // 文件状态改变
    handleChange (file, fileList) {
      if (file) {
        this.fileList = fileList.slice(-3)
      }
    },

    // 删除文件
    handleRemove (file, fileList) {
      this.fileList = []
    },

    // 文件超出个数限制
    handleExceed (files, fileList) {
      this.$message.warning(`只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`)
    },

    // 文件上传成功
    handleSuccess (res, file, fileList) {
      this.$message.success('文件上传成功')
    },

    // 文件上传失败
    handleError (err, file, fileList) {
      this.$message.error('文件上传失败')
    },
    // 覆盖默认的上传行为，自定义上传的实现
    uploadExcel () {
      if (this.fileList.length === 0) {
        this.$message.warning('请上传文件')
      } else {
        const data = new FormData()
        console.log('ffffffff', this.fileList)
        data.append('multipartFiles', this.fileList)
        data.append('module', 'bookExcel')
        this.$axios({
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          url: '/api/web/excel/analyze',
          data: data,
          method: 'post'
        }).then(res => {
          console.log(res)
        }, err => {
          console.log(err)
        })
      }
    },

    // 导出
    downloadExcel () {
    }
  }

}
</script>

<style scoped>

.sysBox .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #FD7A3A;   /* 进行修改背景和字体*/
  color: #ff2f;
}

</style>
