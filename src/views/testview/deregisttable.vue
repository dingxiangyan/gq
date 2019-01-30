<template>
  <div class="structure">
    <el-container>
      <el-header height="auto">
        <el-form  ref="queryForm" :model="queryForm" label-width="110px">
          <el-row :gutter="5">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="所属区域集团" prop="value1">
                  <el-select v-model="queryForm.value1" placeholder="请选择所属区域集团" @change="selectLinkage(queryForm.value1)" clearable>
                    <el-option
                      v-for="item in queryForm.options1"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="所属区域公司" porp="value2">
                  <el-select v-model="queryForm.value2" placeholder="请选择所属区域公司" clearable>
                    <el-option
                      v-for="item in queryForm.options2"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="公司名称" prop="gsmc">
                  <el-input v-model="queryForm.gsmc" placeholder="请输入关键字" clearable></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple" >
                <el-form-item label="单据状态" prop="value3">
                  <el-select v-model="queryForm.value3" placeholder="请选择单据状态" clearable>
                    <el-option
                      v-for="item in queryForm.options3"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="注销类型" prop="value4">
                  <el-select v-model="queryForm.value4" placeholder="请选择注销类型" clearable>
                    <el-option
                      v-for="item in queryForm.options4"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="查询开始日期" prop="beginTime" clearable>
                  <!--:picker-options="queryForm.pickerOptions1"-->
                  <el-date-picker
                    v-model="queryForm.beginTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <!--:picker-options="queryForm.pickerOptions2"-->
                <el-form-item label="查询结束日期" prop="endTime" clearable>
                  <el-date-picker
                    v-model="queryForm.endTime"
                    type="date"
                    placeholder="选择日期"
                     value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label-width="30" class="ml-20"> 
                  <el-button type="primary" @click="Addapplay" v-show="queryForm.flag">新增注销申请</el-button>
                 <!--  <el-button type="primary" @click="Addapplay" v-show="$store.state.user.btnShowlist.indexOf('deregisttable_add')>-1">新增注销申请</el-button> -->
                  <el-button type="primary" @click="onQuery('queryForm',2)">查询</el-button>
                  <!-- <el-button type="warning" v-if="queryForm.flag" @click="Addapplay">新增注销</el-button> -->
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-header>
      <el-main>
      <div class="table-col">
        <el-table
        :data="tableData"
        :header-cell-style="{textAlign:'center',background:'#409eff',color:'#fff'}"
        :cell-style="{textAlign:'center'}"
        border
        align="center"
        style="width: 100%">
        <el-table-column
          type="index"
          width="60"
          label="序号"
        >
        </el-table-column>
        <el-table-column
          prop="val0"
          label="单据状态"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="val1"
          label="所属区域集团"
          width="160"
        >
        </el-table-column>
        <el-table-column
          prop="val2"
          label="所属区域公司"
          width="160"
        >
        </el-table-column>
        <el-table-column
          prop="val3"
          label="公司名称"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="val4"
          label="注销类型"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="val5"
          label="工商注销备案完成时间"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="val6"
          label="注销登记完成时间"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="val7"
          label="注销人"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="onEdit(scope.$index, scope.row,1)" v-show="scope.row.button==1">编辑</el-button>
            <el-button
              size="mini"
              @click="onEdit(scope.$index, scope.row,2)" v-show="scope.row.button==2">查看</el-button>
            <el-button
              size="mini" v-show="scope.row.flowurl" @click="goOut(scope.row.flowurl)">
             查看流程</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)" v-show="scope.row.del==1">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
         <div class="page-col">
           <el-pagination
              @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="prev, pager, next, jumper"
                :total="pageTotal"
                :page-size="size">
           </el-pagination>
        </div>
     </div>
    </el-main>
  </el-container>
    <!--弹窗层 start-->
    <el-dialog title="公司注销备案表"
               :visible.sync="dialogFormVisible"
               width="95%"
               top="8vh"
    >
      <div class="dialog_content" v-loading='loading'>
        <div class="applicant-col">
          <el-form  ref="applicantform"  :model="applicantform"  label-width="110px">
            <el-row :gutter="10">
              <el-col :span="6">
                <el-form-item label="填写人" prop="name">
                  <el-input v-model="applicantform.name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="填写日期" prop="date">
                  <!-- :picker-options="applicantform.pickerOptions"-->
                  <el-date-picker
                    v-model="applicantform.date"
                    type="date"
                    :disabled="true"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="公司名称" prop="company" v-show="applicantform.companyshow">
                  <el-select v-model="applicantform.company" placeholder="请选择" @change="showBase(applicantform.company)"  remote filterable clearable>
                    <el-option
                      v-for="(item,index) in applicantform.options"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dia_content">
          <el-main>
            <!--申请人 第一个form end-->
            <div class="col" v-show="companyNameSelection">
              <h3 class="col-tit">备案申请信息</h3>
              <div class="col-main">
                <el-form  ref="form2" :model="form2" label-width="110px" :disabled="ifedit1">
                  <el-row :gutter="10">
                    <el-col :span="6">
                      <el-form-item label="公司名称" prop="val0">
                        <el-input v-model="form2.val0" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="注册资本(万元)"  prop="val1">
                        <el-input v-model="form2.val1" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="币种"  prop="val2">
                        <el-input v-model="form2.val2" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="是否境外公司"  prop="val3">
                        <el-input v-model="form2.val3" :disabled="true"></el-input>
                        <!-- <el-select v-model="form2.val3" :disabled="true">
                          <el-option
                            v-for="(item,index) in form2.options3"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                          >
                         </el-option > -->
                        <!-- </el-select> -->
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-show="form2.show4">
                      <el-form-item label="是否外资企业"  prop="val4">
                        <el-input v-model="form2.val4" :disabled="true" ></el-input>
                      <!--   <el-select v-model="form2.val4" :disabled="true">
                          <el-option
                            v-for="(item,index) in form2.options4"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option > -->
                        <!-- </el-select> -->
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-show="form2.show5">
                      <el-form-item label="内资企业类型"  prop="val5">
                        <el-input v-model="form2.val5" :disabled="true"></el-input>
                      <!--   <el-select v-model="form2.val5" :disabled="true">
                          <el-option
                            v-for="(item,index) in form2.options5"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option >
                        </el-select> -->
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-show="form2.show51">
                      <el-form-item label="外资企业类型"  prop="val51">
                        <el-input v-model="form2.val51" :disabled="true"></el-input>
                       <!--  <el-select v-model="form2.val51" :disabled="true">
                          <el-option
                            v-for="(item,index) in form2.options51"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option >
                        </el-select> -->
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-show="form2.show6">
                      <el-form-item label="法人代表"  prop="val6">
                        <el-input v-model="form2.val6" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-show="form2.show61">
                      <el-form-item label="执行事务合伙人"  prop="val61">
                        <el-input v-model="form2.val61" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="经营/合伙期限"  prop="val7">
                        <el-input v-model="form2.val7" :disabled="true"></el-input>
                        <!--<el-date-picker
                          v-model="form2.val7"
                          type="daterange"
                          range-separator="-"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
                        </el-date-picker>-->
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="投资方式"  prop="val8">
                        <el-input v-model="form2.val8" :disabled="true"></el-input>
                        <!--<el-select v-model="form2.val8" placeholder="请选择">
                          <el-option
                            v-for="(item,index) in form2.options8"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option >
                        </el-select>-->
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="所属区域集团"  prop="val9">
                        <el-input v-model="form2.val9" :disabled="true"></el-input>
                        <!--<el-select v-model="form2.val9" placeholder="请选择">
                          <el-option
                            v-for="(item,index) in form2.options9"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option >
                        </el-select>-->
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="所属区域公司"  prop="val10">
                        <el-input v-model="form2.val10" :disabled="true"></el-input>
                       <!-- <el-select v-model="form2.val10" placeholder="请选择">
                          <el-option
                            v-for="(item,index) in form2.options10"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option >
                        </el-select>-->
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="所属事业部"  prop="val12">
                        <el-input v-model="form2.val12" :disabled="true"></el-input>
                       <!-- <el-select v-model="form2.val12" placeholder="请选择">
                          <el-option
                            v-for="(item,index) in form2.options12"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option >
                        </el-select>-->
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="公司类型"  prop="val13">
                        <el-input v-model="form2.val13" :disabled="true"></el-input>
                        <!--<el-select v-model="form2.val13" placeholder="请选择">
                          <el-option
                            v-for="(item,index) in form2.options13"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option >
                        </el-select>-->
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="一级公司性质"  prop="val14">
                        <el-input v-model="form2.val14" :disabled="true"></el-input>
                        <!--<el-select v-model="form2.val14" placeholder="请选择">
                          <el-option
                            v-for="(item,index) in form2.options14"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option >
                        </el-select>-->
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="二级公司性质"  prop="val15">
                        <el-input v-model="form2.val15" :disabled="true"></el-input>
                        <!--<el-select v-model="form2.val15" placeholder="请选择">
                          <el-option
                            v-for="(item,index) in form2.options15"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option >
                        </el-select>-->
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="资质情况"  prop="val16">
                        <el-input v-model="form2.val16" :disabled="true"></el-input>
                        <!--<el-select v-model="form2.val16" placeholder="请选择">
                          <el-option
                            v-for="(item,index) in form2.options16"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option >
                        </el-select>-->
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="社会信用代码"  prop="val17">
                        <el-input v-model="form2.val17" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="成立日期"  prop="val18">
                        <el-input v-model="form2.val18" :disabled="true"></el-input>
                       <!-- <el-date-picker
                          v-model="form2.val18"
                          type="date"
                          :picker-options="form2.pickerOptions"
                          placeholder="选择日期"
                        >
                        </el-date-picker>-->
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="印章保管人"  prop="val19">
                        <el-input v-model="form2.val19" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="证照保管人"  prop="val20">
                        <el-input v-model="form2.val20" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6"> 
                      <el-form-item label="注销类型" prop="val21" :rules="[{ required: true, message: '请选择注销类型', trigger: 'change'}]" >
                        <el-select v-model="form2.val21" placeholder="请选择" :disabled="typedisabled" @click.native="getdellist($event)">
                          <el-option
                            v-for="(item,index) in form2.options21"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option >
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="24">
                      <el-form-item label="经营范围"  prop="val22">
                        <el-input v-model="form2.val22" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="24">
                      <el-form-item label="公司住所"  prop="val23">
                        <el-input v-model="form2.val23" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="24">
                      <el-form-item label="注销说明"  prop="val24">
                        <el-input v-model="form2.val24" :disabled="false"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!-- 新增印章管理员 -->
                  <!-- <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="印章管理员"  prop="val25" :rules="[{ required: true, message: '请填写印章管理员', trigger: 'blur'}]">
                        <el-input v-model="form2.val25"></el-input>
                      </el-form-item>
                    </el-col>
                     <el-col :span="6" class="mytips">
                      (人员之间请以英文格式的分号做隔离)
                    </el-col>
                  </el-row> -->
                </el-form>
                <!--form2-->
              </div>
              <!--<h5 class="col-small-tit">附件管理</h5>
              <div class="col-main">
                  <el-upload
                    :disabled="ifedit1"
                    class="upload-demo"
                    :action="url"
                    :on-change="OnChange"
                    :on-remove="OnRemove"
                    :on-preview="handlePreview"
                    :before-remove="beforeRemove"
                    multiple
                    ref="upload"
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                    :file-list="fileList2">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  </el-upload>
                  <el-table
                  :data="fileData2"
                  border
                  style="width: 100%"
                  :cell-style="isCenter"
                  :header-cell-style="istabtop"
                  >
                    <el-table-column
                      prop="FFILENAME"
                      label="文件名"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="FCREATETIME"
                      label="时间"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="FNAME"
                      label="创建人"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      width="200">
                      <template slot-scope="scope">
                        <el-button @click="download(scope.row)" type="text" size="small">下载</el-button>
                        <el-button @click="dels(scope.row,fileData2)" type="text" size="small">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
              </div> -->
            </div>
            <!--基本信息end-->
            <!-- 2,3,4,5可以看业务信息 -->
            <!--业务start-->
            <div class="col" v-show="role=='node2'||role=='node3'||role=='node4'||role=='node5'">
              <h3 class="col-tit">备案登记信息</h3>
              <h5 class="col-small-tit">业务信息<i class="el-icon-remove-outline icon-zx"></i></h5>
              <div class="col-main">
                <el-form  ref="form3" :model="form3" :disabled="ifEdit2" label-width="150px">
                  <el-form-item label="工商注销完成时间" prop="val0" :rules="[{ required: true, message: '请选择工商注销完成时间', trigger: 'change'}]">
                    <el-date-picker
                      v-model="form3.val0"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-form>
              </div>
              <!--<h5 class="col-small-tit">附件管理 <i class="el-icon-remove-outline icon-zx"></i></h5>
              <div class="col-main">
                <el-upload
                  :disabled="ifEdit2"
                  class="upload-demo"
                  :action="url"
                  :on-change="OnChange"
                  :on-remove="OnRemove"
                  :on-preview="handlePreview"
                  :before-remove="beforeRemove"
                  multiple
                  ref="upload2"
                  accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                  :file-list="fileList3">
                  <el-button size="small" type="primary">上传文件</el-button>
                </el-upload>
                 <el-table
                  :data="fileData3"
                  border
                  style="width: 100%"
                  :cell-style="isCenter"
                  :header-cell-style="istabtop"
                  >
                  <el-table-column
                    prop="FFILENAME"
                    label="文件名"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="FCREATETIME"
                    label="时间"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="FNAME"
                    label="创建人"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="200">
                    <template slot-scope="scope">
                      <el-button @click="download(scope.row)" type="text" size="small">下载</el-button>
                      <el-button @click="dels(scope.row,fileData3)" type="text" size="small">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div> -->

            </div>
            <!--财务start可以看业务界面-->
            <!-- 2,5可以看业务信息 -->
            <div class="col"  v-show="role=='node3'||role=='node5'">
              <h5 class="col-small-tit">财务信息<i class="el-icon-remove-outline icon-zx"></i></h5>
              <div class="col-main">
                <el-form  ref="form4" :model="form4" :inline="true" :disabled="ifEdit3"  label-width="150px">
                  <el-form-item label="银行账户注销完成时间" prop="val0" :rules="[{ required: true, message: '请选择银行账户注销完成时间', trigger: 'change'}]"  label-width="170">
                    <el-date-picker
                      v-model="form4.val0"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="税务注销完成时间" prop="val1" :rules="[{ required: true, message: '请选择税务注销完成时间', trigger: 'change'}]">
                    <el-date-picker
                      v-model="form4.val1"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-form>
              </div>
              <!--form7 end-->
              <!--<h5 class="col-small-tit">附件管理<i class="el-icon-remove-outline icon-zx"></i></h5>
              <div class="col-main">
                <el-upload
                  :disabled="ifEdit3"
                  class="upload-demo"
                  :action="url"
                  :on-change="OnChange"
                  :on-remove="OnRemove"
                  :on-preview="handlePreview"
                  :before-remove="beforeRemove"
                    multiple
                    ref="upload3"
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                  :file-list="fileList4">
                  <el-button size="small" type="primary">上传文件</el-button>
                </el-upload>
                 <el-table
                  :data="fileData4"
                  border
                  style="width: 100%"
                  :cell-style="isCenter"
                  :header-cell-style="istabtop"
                  >
                  <el-table-column
                    prop="FFILENAME"
                    label="文件名"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="FCREATETIME"
                    label="时间"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="FNAME"
                    label="创建人"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="200">
                    <template slot-scope="scope">
                      <el-button @click="download(scope.row)" type="text" size="small">下载</el-button>
                      <el-button @click="dels(scope.row,fileData4)" type="text" size="small">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div> -->
            </div>
            <!--人事start-->
            <!-- <div class="col"  v-show="role=='node4'||role=='node5'"> -->
            <div class="col"  v-show="false">
              <h5 class="col-small-tit">人事信息<i class="el-icon-remove-outline icon-zx"></i></h5>
              <div class="col-main">
                <el-form  ref="form5" :model="form5" :disabled="ifEdit4" label-width="190px">
                  <el-form-item label="社保公积金账号注销时间" prop="val0" :rules="[{ required: true, message: '请选择社保公积金账号注销完成时间', trigger: 'change'}]">
                    <el-date-picker
                      v-model="form5.val0"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-form>
              </div>
              <!--form9 end-->
             <!--  <h5 class="col-small-tit">附件管理<i class="el-icon-remove-outline icon-zx"></i></h5>
              <div class="col-main">
                <el-upload
                  :disabled="ifEdit4"
                   class="upload-demo"
                    :action="url"
                    :on-change="OnChange"
                    :on-remove="OnRemove"
                    :on-preview="handlePreview"
                    :before-remove="beforeRemove"
                    multiple
                    ref="upload4"
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                  :file-list="fileList5">
                  <el-button size="small" type="primary">上传文件</el-button>
                </el-upload>
                 <el-table
                  :data="fileData5"
                  border
                  style="width: 100%"
                  :cell-style="isCenter"
                  :header-cell-style="istabtop"
                  >
                  <el-table-column
                    prop="FFILENAME"
                    label="文件名"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="FCREATETIME"
                    label="时间"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="FNAME"
                    label="创建人"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="200">
                    <template slot-scope="scope">
                      <el-button @click="download(scope.row)" type="text" size="small">下载</el-button>
                      <el-button @click="dels(scope.row,fileData5)" type="text" size="small">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div> -->
            </div>
            <!--行政start-->
            <div class="col"  v-show="role=='node5'">
              <!--<h3 class="col-tit">备案登记信息</h3>-->
              <h5 class="col-small-tit">行政信息<i class="el-icon-remove-outline icon-zx"></i></h5>
              <div class="col-main">
                <el-form  ref="form6" :model="form6" :disabled="ifEdit5" label-width="150px">
                  <el-form-item label="印章销毁完成时间" prop="val0" :rules="[{ required: true, message: '请选择印章销毁完成时间', trigger: 'change'}]">
                    <el-date-picker
                      v-model="form6.val0"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-form>
              </div>
              <!--form9 end-->
              <!-- <h5 class="col-small-tit">附件管理<i class="el-icon-remove-outline icon-zx"></i></h5>
              <div class="col-main">
                <el-upload
                  :disabled="fileEdit"
                  class="upload-demo"
                    :action="url"
                    :on-change="OnChange"
                    :on-remove="OnRemove"
                    :on-preview="handlePreview"
                    :before-remove="beforeRemove"
                    multiple
                    ref="upload5"
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                  :file-list="fileList2" v-show='type!=2'>
                  <el-button size="small" type="primary">上传文件</el-button>
                </el-upload>
                 <el-table
                  :data="fileData2"
                  border
                  style="width: 100%"
                  :cell-style="isCenter"
                  :header-cell-style="istabtop"
                  >
                  <el-table-column
                    prop="FFILENAME"
                    label="文件名"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="FCREATETIME"
                    label="时间"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="FNAME"
                    label="创建人"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="200">
                    <template slot-scope="scope">
                      <el-button @click="download(scope.row)" type="text" size="small">下载</el-button>
                      <el-button @click="dels(scope.row,fileData2)" type="text" size="small" v-show='type!=2'>删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div> -->
            </div>
            <!-- 附件管理 -->
            <div class="col" v-show="companyNameSelection">
              <h5 class="col-small-tit">附件管理<i class="el-icon-remove-outline icon-zx"></i></h5>
              <div class="col-main">
                <el-upload
                    class="upload-demo"
                    :action="url"
                    :on-change="OnChange"
                    :on-remove="OnRemove"
                    :on-preview="handlePreview"
                    :before-remove="beforeRemove"
                    multiple
                    ref="upload"
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                  :file-list="fileList2" v-show='type!=2'>
                  <el-button size="small" type="primary">上传文件</el-button>
                </el-upload>
                 <el-table
                  :data="fileData2"
                  border
                  style="width: 100%"
                  :cell-style="isCenter"
                  :header-cell-style="istabtop"
                  >
                  <el-table-column
                    prop="FFILENAME"
                    label="文件名"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="FCREATETIME"
                    label="时间"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="FNAME"
                    label="创建人"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="200">
                    <template slot-scope="scope">
                      <el-button @click="download(scope.row)" type="text" size="small">下载</el-button>
                      <el-button @click="dels(scope.row)" type="text" size="small" v-show='type!=2&&scope.row.FNAME==$store.state.user.name '>删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-main>
          <div class="btn2-col">
          <el-button type="danger" @click="onRefuse('')" v-show="role=='node3'&&type==1">驳回</el-button>
            <!-- <el-button type="danger" @click="onRefuse('')" v-show="role=='node3'&&type==1||role=='node4'&&type==1">驳回</el-button> -->
           <!--  <el-button type="danger" @click="onRefuse('finance')" v-show="role=='node5'&&type==1">驳回到财务</el-button> -->
            <el-button type="danger" @click="onRefuse('finance')" v-show="role=='node5'&&type==1">驳回</el-button>
         <!--    <el-button type="danger" @click="onRefuse('personnel')" v-show="role=='node5'&&type==1">驳回到人事</el-button> -->
            <el-button type="primary" @click="onSaves(fileList2,2)" v-show="type!=2">保存</el-button>
            <el-button type="primary" @click="onSaves(fileList2,3)" v-show="type!=2">提交</el-button>
            <el-button type="primary" @click="onCancel">取消</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
   import Vue from "vue";
  import { showPost,LinkagePost,queryPost,addApplayPost,showBasePost,savePost,editPost,del,showDialog,reject} from "@/api/deregisttable"
  export default {
    name: "deregisttable",
    data() {
      return {
        // 保存角色
        role:'node1',
        type:1,//提交查看的type
        //控制注销类型
        typedisabled:false,
        //控制公司信息显示
        companyNameSelection:false,
        //控制下拉是否赋值下拉
        canchange:1,
        //查询
        queryForm:{
          //所属区域集团
            value1:'',
            options1:[],
          //所属区域公司
            value2:'',
            options2:[],
           gsmc:'',
          //单据状态
           value3:'',
           options3:[],
          //注销类型
            value4:'',
            options4:[],
          //开始查找时间
            beginTime:'',
            endTime:'',
       /*     pickerOptions1:{
              disabledDate:(time)=>{
                //console.log(this.queryForm.endTime);
                if(this.queryForm.endTime){
                  return time.getTime() >this.queryForm.endTime.getTime()
                }else{
                  return time.getTime() >Date.now();
                }

              }
            },
            pickerOptions2:{
              disabledDate:(time)=> {
                if(this.queryForm.beginTime){
                  return time.getTime() < this.queryForm.beginTime.getTime() || time.getTime() > Date.now();
                }else{
                  return time.getTime() > Date.now();
                }
              },
            },*/
          flag:false,//增加按钮显示状态
        },
        //查询显示数据
        tableData: [],
        currentPage:1,//当前页
        pageTotal:1,//总页数size
        size:10,
        //弹出层数据
        roleType:'',//保存用户类型
        dialogFormVisible: false,//显示弹出层
        btnSFlag:'',//保存状态按钮
        btnTFlag:'',//提交状态按钮
        ifedit0:false,//申请是否可以编辑
        ifedit1:false,//基础信息否可以编辑
        ifEdit2:false,//业务是否可编辑
        ifEdit3:false,//财务是否可编辑
        ifEdit4:false,//人事是否可编辑
        ifEdit5:false,//行政是否可编辑
      // 填写人信息
        applicantform:{
          id:'',
          name:'',//填写人
          date:'',//填写时间
          company:'',//填写公司
          options:[],
          //设置公司选择是否出现
           companyshow:true,
          /*pickerOptions:{
            disabledDate:(time)=>{
                return time.getTime() >Date.now();
            }
          },*/
        },
      //基础信息
        delId:'',//保存注销的附件id
        listId:'',//保存列表id用于提交判断
        companyid:'',//companyList的FID
        form2:{
          FISOVERSEASCOMPANY:'',
          FISFOREIGNENTERPRISE:'',
          val0:'',//公司名称
          val1:'',//注册资本
          val2:'',//币种
          val3:'',//是否境外公司
          showVal3:'',
          options3:[
            // {label:'是',value:'1'},
            // {label:'否',value:'0'}
          ],
          val4:'',//是否外资企业
          show4:true,
          showVal4:'',
          options4:[
            // {label:'是',value:'1'},
            // {label:'否',value:'0'}
          ],
          val5:'',// 内资企业类型
          show5:false,
          // options5:[
          // ],
          val51:'',//外资企业类型
          show51:false,
          // options51:[
          // ],
          val6:'',//法人代表
          val61:'',//执行事务合伙人
          show6:false,
          show61:false,
          // options6:[
          // ],
          // options61:[
          // ],
          val7:'',//经营和合期限
          val8:'',//投资方式
          val9:'', //所属区域集团
          val10:'',//所属区域公司
          val12:'',//所属事业部
          val13:'',//公司类型
          val14:'',//一级公司性质
          val15:'',//二级公司性质
          val16:'',//资质情况
          val17:'',//统一社会信用代码
          val18:'',//成立日期
          val19:'',//印章保管人
          val20:'',//证照保管人
          val21:'',//注销类型
          options21:[],
          //接收注销类型
          dellist:[],
          val22:'',//经营范围
          val23:'',//公司住所
          val24:'',//注销说明
          // val25:''//印章管理员
        },
        //基础信息附件上传
      fileList2:[],
      fileData2:[],
      url :'/dst/fileController/upload',
      files:'',
       //文件名
       fileName:'',
       filelist:'',
      //业务信息
        form3:{
          val0:'',//工商注销完成时间
        },
        //业务附件上传
        // fileList3:[],
        // fileData3:[],
      //财务信息
        form4:{
          val0:'',//银行账户注销完成时间
          val1:'',//税务注销完成时间
        },
        //财务附件上传
        // fileList4:[],
        // fileData4:[],
      //人事信息
        form5:{
          val0:'',//社保公积金账户注销完成时间
        },
        //人事附件上传
        // fileList5:[],
        // fileData5:[],
      //行政信息
        form6:{
          val0:'',//印章销毁完成时间

        },
        //人事附件上传
        // fileList6:[],
        // fileData6:[],
        loading:false,
        count:1,
      };
    },
    methods: {
         //为表格设置样式
      isCenter({ row, column, rowIndex, columnIndex }) {
        return "text-align:center";
      },
      //为表头设置样式
      istabtop({ row, column, rowIndex, columnIndex }) {
        return "text-align:center;background-color:#409eff;color:#fff;";
      },
      onSaves(obj,savetype){
        // console.log(savetype)
        //提交需要新进行验证规则验证->确认保存/提交弹窗->附件上传->保存/提交
        var that=this;
        let formName='';
        that.$nextTick(()=>{
          //清除验证结构
            that.$refs['form2'].clearValidate();
            that.$refs['form3'].clearValidate();
            that.$refs['form4'].clearValidate();
            that.$refs['form5'].clearValidate();
            that.$refs['form6'].clearValidate();
           if(savetype==3){
            switch (this.role) {
              case 'node1':
                formName='form2';
              break;
              //业务角色验证
              case 'node2':
                formName='form3';
              break;
              case 'node3':
                formName='form4';
              break;
              case 'node4':
                formName='form5';
              break;
              case 'node5':
               formName='form6';
              break;
            }
            console.log(formName)
            if(that.$refs[formName]) {
              that.$refs[formName].validate((valid) => {
                if(valid){
                  //验证通过提交表单和附件
                  that.onSubmit1(obj,savetype)
                }else{
                  switch (this.role) {
                    case 'node1':
                     that.$message.error('注销类型为必选项');
                    break;
                    //业务角色验证
                    case 'node2':
                       that.$message.error('工商注销完成时间为必选项');
                    break;
                    case 'node3':
                       that.$message.error('银行账号注销时间和税务注销时间为必选项');
                    break;
                    case 'node4':
                      that.$message.error('社会公积金账户注销时间为必选项');
                    break;
                    case 'node5':
                     that.$message.error('印章销毁时间为必选项');
                    break;
                  }
                }
              })
            }
          }else if(savetype==2){
            that.onSubmit1(obj,savetype)
          }
        });
      },
      //附件上傳
      onSubmit1(obj,savetype){
        // console.log(this.listId)
        let msg=''
        let delmsg=''
        if(savetype==2){
          msg="此操作将保存该条数据, 是否继续?"
          delmsg="已取消保存"
         
        }else if(savetype==3){
          msg="此操作将提交该条数据, 是否继续?"
          delmsg="已取消提交"
        }
         //弹出信息自定义
        this.$msgbox({
          title:'提示',
          message:msg,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
         }).then(() => {
            const parmaData = new FormData()
            let form={
              fid:this.listId,
              y:1
            }
            let file=''
            let uid=''
            for(let x in form){
              parmaData.append(x,form[x])
            }
            // console.log(parmaData.get('a'))
            console.log(obj)
            if(obj!=null){
              for(let i=0;i<obj.length;i++){
              file='file'+this.count
              this.count++
              parmaData.append(file,obj[i].raw)
              parmaData.append(uid,obj[i].uid)
            } 
            Vue.http.post("fileController/upload",parmaData,{
              headers: {
                'Content-Type': 'Multipart/form-data'
              }
            }).then((res) => {
              console.log(res)
              if(res.body.info=='成功'){
                 this.listId=res.body.data.fid;
                 console.log(savetype)
                 this.onSave(savetype)
              }
             
            }) 
            }else{
              console.log('没有新文件')
            }
        }).catch(() => {
          this.$message({
            type: 'info',
            message:delmsg
          });          
        })
      },
        //文件列表下载
      download(row) {
        // console.log(row);
        window.open("/dst/fileController/downloads?fid=" + row.FID);
      },
        // 附件删除
      dels(row){
        Vue.http.get("fileController/delet?fid="+row.FID)
        .then((res) => {
          console.log(res)
          this.Filelist()
        }) 
      },
      //附件列表展示
      Filelist(){
          Vue.http.get("fileController/list?fid=" + this.listId).then(res => {
          console.log(res);
           this.fileData2= res.body.data.list;
          for (let i = 0; i <   this.fileData2.length; i++) {
              this.fileData2[i].FCREATETIME = this.timeStamp(
               this.fileData2[i].FCREATETIME
            );
          }
        });
      },
      //时间格式更改
      timeStamp(cellValue){
        if(cellValue){
          var date = new Date(cellValue);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          var D =  date.getDate() < 10 ? '0'+date.getDate() : date.getDate()
          // var D = date.getDate();
          // var h = date.getHours() + ':';
          // var m = date.getMinutes() + ':';
          // var s = date.getSeconds();
          return Y+M+D;
        }else{
          return cellValue;
        }
      },
      //经营合伙期限合适更改
      changetype(val){
        if(val){
          let a=JSON.parse(val);
          return a[0]+'-'+a[1];
        }
      },
      //联动集团公司
      selectLinkage:function(val){
        //console.log(val);
        this.queryForm.value2='';
        let param={'areagroupid':val};
        LinkagePost(param).then((res)=>{
          let options=[];
          if(res.body.code==="999"){
            let arr1=res.body.data;
            if(arr1){
              for(var i=0;i<arr1.length;i++){
                options.push({label:arr1[i].NAME,value:arr1[i].ID});
              }
              this.queryForm.options2=options;//所属区域公司
            }else{
              this.queryForm.options2=[];
            }
          }
        })
      },
      //是否境外公司
      showcompany(){
          if(this.form2.FISOVERSEASCOMPANY=='0'||this.form2.FISOVERSEASCOMPANY==''||this.form2.FISOVERSEASCOMPANY==null){
            this.form2.show4=true;
            this.form2.show6=false;
            this.form2.show5=false;
            this.form2.show51=false;
            this.form2.show61=false;
          }else if(this.form2.FISOVERSEASCOMPANY=="1"){
             //是境外公司
            this.form2.show6=true;
            this.form2.show4=false;
            this.form2.show5=false;
            this.form2.show51=false;
            this.form2.show61=false;
          }
          if(this.form2.FISFOREIGNENTERPRISE!=''&&this.form2.FISFOREIGNENTERPRISE!=null){

            if(this.form2.FISFOREIGNENTERPRISE=='0'){
              //是内资企业
              this.form2.show5=true;
              this.form2.show51=false;
              console.log(this.form2.FOUTENTERPRISETYPE)
              if(this.form2.FOUTENTERPRISETYPE=='1'||this.form2.FOUTENTERPRISETYPE=='2'){
                //法人代表显示
                this.form2.show6=true;
                this.form2.show61=false;
              }else{
                //执行事务合伙人显示
                this.form2.show61=true;
                this.form2.show6=false;
              }
            }else if(this.form2.FISFOREIGNENTERPRISE=="1"){
              this.form2.show51=true;
              this.form2.show5=false;
              if(this.form2.FOUTENTERPRISETYPE=='1'||this.form2.FOUTENTERPRISETYPE=='2'||this.form2.FOUTENTERPRISETYPE=='3'||this.form2.FOUTENTERPRISETYPE=='4'){
                //法人代表显示
                this.form2.show6=true;
                this.form2.show61=false;
              }else{
                //执行事务合伙人显示
                this.form2.show61=true;
                this.form2.show6=false;
              }
            }
          }else{
            this.form2.show5=false;
            this.form2.show51=false;
            this.form2.show61=false;
          }
      },
      //主页查询table表格数据
      onQuery(formName,type) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(type==2){
              //状态为2是查询page初始化以及刷新显示
              this.currentPage=1;
              this.pageTotal=1;
            }
             let target=this.$refs[formName].model;
             let param={
               districtGroup:target.value1,//集团
               districtCompany:target.value2,//公司
               companyName:target.gsmc,//公司名称
               billstatus:target.value3,//单据状态
               loginouttype:target.value4,//注销类型
               starttime:target.beginTime,//开始时间
               endtime:target.endTime,//结束时间
               pageNo:this.currentPage//当前页数
             };
              queryPost(param).then((res)=>{
                console.log('加载表格')
                console.log(res)
                if(res.body.code==="999"){
                  let arr2=res.body.data.delList;//tables;
                  let total=res.body.data.count;
                  let tables=[];
                  if(arr2.length){
                    for(var j=0;j<arr2.length;j++){
                      tables.push({
                        id:arr2[j].FID,
                        statev:arr2[j].FSTATE,//单据状态码
                        val0:arr2[j].FSTATENAME,//单据状态
                        val1:arr2[j].FAREAGROUP,//区域集团
                        val2:arr2[j].FAREACOMPANY,//区域公司
                        val3:arr2[j].FCOMPANY,//公司名称
                        val4:arr2[j].FTYPENAME,//注销类型
                        val5:arr2[j].FAAUMTIME,//工商注销完成时间
                        val6:arr2[j].FREGISTER,//注销登记完成时间
                        val7:arr2[j].FPERSONNAME,//注销人
                        button:arr2[j].BUTTON,//1显示编辑2表示新增
                        del:arr2[j].DEL,//1显示删除2不显示
                        flowurl:arr2[j].FLOWURL
                      });
                    }
                    this.tableData=tables;//返回tabbel数据
                    this.pageTotal=total;
                  }else{
                    this.tableData=[];
                  }
                }
              });
          }else {
              alert('error submit!!');
              return false;
            }
        });
      },
      //提交表单
      resetForm(formName){
        if (this.$refs[formName]!==undefined) {
          this.$refs[formName].resetFields();
        }
      },
      //编辑查看整合（1为编辑2为查看）
      onEdit(index,row,num){
        //首先清空信息
        let fid=row.id;
        console.log(row)
        this.listId=row.id;
        //判断是否触发getdellist
        this.canchange=0;
        for(let key in this.form2){
         this.form2[key]  = ''
        }
        this.form3.val0='';
        this.form4.val0='';
        this.form4.val1='';
        this.form5.val0='';
        this.form6.val0='';
        //添加附件管理进入清空
        this.fileList2=[];
        this.fileData2=[];
       //获取上方数据
        this.showCompanyBase(fid,num)
      },
      //查看审批流程
      goOut(val){
        // console.log(val)
        // window.open('http://baidu.com');
        if(val){
          window.open(val);
        }
      },
      //翻页
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
         //根据页数更改信息
        this.currentPage = val;
        this.onQuery('queryForm',1);
      },
      //表格删除
      handleDelete(index,row){
        //请求数据删除表中数据
        // this.tableData.splice(index,1);
        let that=this;
        let fid=row.id;
        let param={delcompanyid:fid};
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          del(param).then((res)=>{
            console.log(res)
           if(res.body.code==='999'){
              that.$message({
                message: '删除成功',
                type: 'success'
              });
              //刷新列表
              that.onQuery('queryForm',2);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      //编辑时注销备案表的注销类型选择
      getdellist(e){
        // console.log(this.typedisabled)
        // console.log(this.canchange)
        //先进行清空
        if(this.typedisabled!=true){
           if(this.canchange==0){
            var dellist=this.dellist;
            console.log(this.dellist)
            this.form2.options21=[];
            this.form2.val21=null;
            if(this.dellist){
              for(var i=0;i<dellist.length;i++){
                this.form2.options21.push({label:dellist[i].FNAME,value:dellist[i].FNUMBER});
              } 
            }else{
               this.form2.options21=[];
            }
          }
        }
      },
      //编辑和查看时根据id的展示
      showCompanyBase:function(id,type){
        this.loading=true;
        this.resetForm('applicantform');
        this.resetForm('form2');
        this.resetForm('form3');
        this.resetForm('form4');
        this.resetForm('form5');
        this.resetForm('form6');
        this.dialogFormVisible=true;//弹出层显示
        this.companyNameSelection=true;
        var type=type;
        if(type==1){
          //为编辑操作时
          this.applicantform.companyshow=false;
          this.ifedit1=false;
          this.typedisabled=false;
          this.type=1;
        }else if(type==2){
          //为查看操作时
          //公司选择不显示
          this.applicantform.companyshow=false;
          this.ifedit1=true;
          this.typedisabled=true;
          this.type=2;
        }
        console.log('根据公司id找接口')
        console.log(id)
        //附件的显示
        this.Filelist()
        let param={delcompanyid:id};
        var option =[];
        this.form2.options21=[];
        showBasePost(param).then((res)=>{
           console.log(res);
           if(res.body.code==='999'){ 
              this.applicantform.name=res.body.data.personname;
              this.applicantform.date=res.body.data.writetime;
              if(res.body.data.companyList.length>0){
                let base=res.body.data.companyList[0];
                 // console.log(base);
                 //获取总后端数据
                this.form2.FISOVERSEASCOMPANY=base.FISOVERSEASCOMPANY;
                this.form2.FISFOREIGNENTERPRISE=base.FISFOREIGNENTERPRISE;
                this.form2.FOUTENTERPRISETYPE=base.FOUTENTERPRISETYPE;
                this.companyid=base.FID;//companyList的FID
                this.form2.val0=base.FCOMPANY;
                this.form2.val1=base.FREGISTEREDCAPITAL;
                this.form2.val2=base.FMONEYTYPENAME;//币种
                this.form2.val3=base.FISOVERSEASCOMPANYNAME;//
                this.showcompany()
                  //FISFOREIGNENTERPRISE是否为外资企业类型的id
                this.form2.val4=base.FISFOREIGNENTERPRISENAME;
                 //这里是idFOUTENTERPRISETYPE外资内资企业类型
                this.form2.val5=base.FOUTENTERPRISETYPENAME;//内资企业类型
                this.form2.val51=base.FOUTENTERPRISETYPENAME;//外资企业类型
                this.form2.val6=base.FLEGALPERSON;//法人代表
                this.form2.val61=base.FFZZAFFAIRWITHPERSON;//执行事务合伙人
                this.form2.val7=this.changetype(base.FPARTNERSHIP);//经营合伙期限
                this.form2.val8=base.FINVESTMENTMODENAME;//投资放式
                ;
                this.form2.val9=base.FAREAGROUPNAME;//区域集团
                this.form2.val10=base.FAREACOMPANYNAME
                ;
                this.form2.val12=base.FBUSINESSDEPARTMENTNAME
                ;
                this.form2.val13=base.FCOMPANYTYPENAME//公司类型
                ;
                this.form2.val14=base.FYJGSXZ
                ;
                this.form2.val15=base.FEJGSXZ
                ;
                this.form2.val16=base.FAPTITUDESITUATIONNAME//资质情况
                ;
                this.form2.val17=base.FUNIFYREDITCODE;
                this.form2.val18=base.FSETUPTIME;
                this.form2.val19=base.FSEALPERSON;
                this.form2.val20=base.FZZPERSON;
                this.form2.val22=base.FSCOPEOFOPERATION;
                this.form2.val23=base.FCOMPANYADDRESS;
              }
              //公司注销类型
              let loginoutList=res.body.data.loginoutList;
              //根据角色判断上方是否可以重新提交
              let delcompanyList=res.body.data.delcompanyList[0];
              console.log(delcompanyList,loginoutList)
                //ifedit1//基础信息否可以编辑ifEdit2//业务是否可编辑ifEdit3//财务是否可编辑fEdit4//人事是否可编辑ifEdit5//行政是否可编辑
               this.dellist=loginoutList;
               if(res.body.data.delcompanyList.length>0){
                this.form2.val24=delcompanyList.FCONTENT;
                this.form2.options21.push({label:delcompanyList.FTYPENAME,value:delcompanyList.FTYPE});
                this.form2.val21=this.form2.options21[0].value;
                // this.form2.val25=delcompanyList.FYZADMIN;
               }
               
               this.role=res.body.data.page;//获取角色
              // console.log(res.body.data.page)
              switch (this.role) {
                 case 'node1':
                 //申请人
                 if(type==1){
                      this.ifedit1=false;
                      this.typedisabled=false;
                  }else{
                    this.ifedit1=true;
                    this.typedisabled=true;
                  }
                 break;
                 case 'node2':
                 //业务,申请人的disabled
                  this.ifedit1=true;
                  this.typedisabled=true;
                  if(type==1){
                     this.ifEdit2=false;
                   }else{
                     this.ifEdit2=true;
                   }
                   if(delcompanyList.FAAUMTIME){
                    this.form3.val0=delcompanyList.FAAUMTIME;
                   }
                 break;
                 case 'node3':
                  this.ifedit1=true;
                  this.typedisabled=true;
                  this.ifEdit2=true;
                  if(type==1){
                     this.ifEdit3=false;
                   }else{
                     this.ifEdit3=true;
                   }
                  //赋值工商注销完成时间
                  this.form3.val0=delcompanyList.FAAUMTIME;
                  if(delcompanyList.FBANKTIME){
                     this.form4.val0=delcompanyList.FBANKTIME;
                  }
                  if(delcompanyList.FTAXTIME){
                    this.form4.val1=delcompanyList.FTAXTIME;
                  }
                 break;
                 case 'node4':
                  this.ifedit1=true;
                  this.typedisabled=true;
                  this.ifEdit2=true;
                  this.ifEdit3=true;
                   if(type==1){
                     this.ifEdit4=false;
                   }else{
                     this.ifEdit4=true;
                   }
                  this.form3.val0=delcompanyList.FAAUMTIME;
                  this.form4.val0=delcompanyList.FBANKTIME;
                  this.form4.val1=delcompanyList.FTAXTIME;
                  if(delcompanyList.FSOCIALTIME){
                    this.form5.val0=delcompanyList.FSOCIALTIME;
                  }
                 break;
                 case 'node5':
                  this.ifedit1=true;
                  this.typedisabled=true;
                  this.ifEdit2=true;
                  this.ifEdit4=true;
                  this.ifEdit3=true;
                   if(type==1){
                     this.ifEdit5=false;
                   }else{
                     this.ifEdit5=true;
                   }
                  this.form3.val0=delcompanyList.FAAUMTIME;
                  this.form4.val0=delcompanyList.FBANKTIME;
                  this.form4.val1=delcompanyList.FTAXTIME;
                  this.form5.val0=delcompanyList.FSOCIALTIME;
                  if(delcompanyList.FSEALTIME){
                     this.form6.val0=delcompanyList.FSEALTIME;
                  }
                 break;
              }
              this.loading=false;
            }
        });
      },
      //判断人员信息及编辑权限
      //新增申请
      Addapplay:function(){
        this.canchange=1;
        this.type=0;
        this.companyNameSelection=false;
        this.typedisabled=false;
        //点击新增时提交接口的  delcompanyid清空
        this.listId='';
        this.role='';
        // showDialog().then((res)=>{
          // console.log(res)
          // if(res.body.data.code=='10'){
          //  // 没有权限
          //   this.$message({
          //     message: res.body.info,
          //     type: 'warning'
          //   });
          // }else{
            //有权限弹出弹窗
           this.resetForm('applicantform');
           this.applicantform.companyshow=true;//选择公司下拉出现
           this.dialogFormVisible=true;//弹出层显示
           this.ifedit1=false;//申請表可填寫
           this.form2.options21=[];
            //添加附件管理进入清空
            this.fileList2=[];
            this.fileData2=[];
            let option=[];
            let param={};
           addApplayPost(param).then((res)=>{
             console.log('获取公司id')
             console.log(res)
             if(res.body.code==="999"){
                this.applicantform.name=res.body.data.personname;
                this.applicantform.date=res.body.data.writetime;
                let arr1=res.body.data.companyList;
                if(arr1.length){
                 for(var t=0;t<arr1.length;t++){
                   option.push({label:arr1[t].FCOMPANY,value:arr1[t].FID});
                 }
                 this.applicantform.options=option;
               }else{
                 this.applicantform.options=[];
               }//公司名称 
             }
           });
        //   }
        // })
      }, 
      //弹出层按钮
      //根据公司名称基础信息显示(新增)
      showBase:function(val){
        //这里的fid为选中公司的FID
        for(let key in this.form2){
            this.form2[key]  = ''
        } 
        //这里清空表单无效需要添加this.$nextTick
        this.$nextTick(()=>{
          this.resetForm('form2');
        });
        if(val){
          this.companyNameSelection=true;

        }else{
          this.companyNameSelection=false;
        }
        let param={companyid:val};
        var option =[];
        // this.form2.options21.push({label:'',value:''});
        showBasePost(param).then((res)=>{
           console.log('根据公司名称基础信息显示');
           console.log(res);
           console.log(this.form2.options21)
           if(res.body.code==='999'){ 
              if(res.body.data.companyList.length>0){
                let base=res.body.data.companyList[0];
                  // console.log(base);
                 //获取总后端数据
                this.form2=base;
                //获取角色
                this.role=res.body.data.page;
                // this.role="node5"
                this.form2.FISOVERSEASCOMPANY=base.FISOVERSEASCOMPANY;
                this.form2.FISFOREIGNENTERPRISE=base.FISFOREIGNENTERPRISE;
                this.form2.FOUTENTERPRISETYPE=base.FOUTENTERPRISETYPE;
                this.showcompany()
                this.companyid=base.FID;//companyList的FID
                this.form2.val0=base.FCOMPANY;
                this.form2.val1=base.FREGISTEREDCAPITAL;
                this.form2.val2=base.FMONEYTYPENAME;//币种
                this.form2.val3=base.FISOVERSEASCOMPANYNAME;//
                  //FISFOREIGNENTERPRISE是否为外资企业类型的id
                this.form2.val4=base.FISFOREIGNENTERPRISENAME;
                 //这里是idFOUTENTERPRISETYPE外资内资企业类型
                this.form2.val5=base.FOUTENTERPRISETYPENAME;//内资企业类型
                this.form2.val51=base.FOUTENTERPRISETYPENAME;//外资企业类型
                this.form2.val6=base.FLEGALPERSON;//法人代表
                this.form2.val61=base.FFZZAFFAIRWITHPERSON;//执行事务合伙人
                this.form2.val7=this.changetype(base.FPARTNERSHIP);
                this.form2.val8=base.FINVESTMENTMODENAME;//投资放式
                ;
                this.form2.val9=base.FAREAGROUPNAME;//区域集团
                this.form2.val10=base.FAREACOMPANYNAME
                ;
                this.form2.val12=base.FBUSINESSDEPARTMENTNAME
                ;
                this.form2.val13=base.FCOMPANYTYPENAME//公司类型
                ;
                this.form2.val14=base.FYJGSXZ
                ;
                this.form2.val15=base.FEJGSXZ
                ;
                this.form2.val16=base.FAPTITUDESITUATIONNAME//资质情况
                ;
                this.form2.val17=base.FUNIFYREDITCODE;
                this.form2.val18=base.FSETUPTIME;
                this.form2.val19=base.FSEALPERSON;
                this.form2.val20=base.FZZPERSON;
                this.form2.val22=base.FSCOPEOFOPERATION;
                this.form2.val23=base.FCOMPANYADDRESS;
              }
              //公司注销类型
              let loginoutList=res.body.data.loginoutList;
              if(loginoutList&&val!=''){
                for(var i=0;i<loginoutList.length;i++){
                  option.push({label:loginoutList[i].FNAME,value:loginoutList[i].FNUMBER});
                  this.form2.options21=option;
                } 
              }else{
                 this.form2.options21=[];
              }
            }
        });
      },
      //驳回时判断name相同的附件进行手动删除
      refuseDel(){
       // console.log(this.fileDate2);
       var name=this.$store.state.user.name;
       console.log(this.fileData2);
       for(var i=0;i<this.fileData2.length;i++){
        if(this.fileData2[i].FNAME==name){
          //删除对应列表
          Vue.http.get("fileController/delet?fid="+this.fileData2[i].FID)
          .then((res) => {
            // console.log(res)
            this.Filelist()
          }) 
        }
       }
      },
      //1.驳回
      onRefuse(roletype){
        let that=this;
        let param={
          type:roletype,
          page:this.role,
          delcompanyid: this.listId//delcompanyList的FID
        }
        this.$confirm('此操作将永久驳回该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          reject(param).then((res)=>{
            console.log(res)
           if(res.body.code==='999'){
              that.$message({
                message: '驳回成功',
                type: 'success'
              });
              //刷新列表
              that.onQuery('queryForm',2);
              //驳回对应的附件
              this.refuseDel()
              that.dialogFormVisible=false;
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消驳回'
          });          
        });
      },
      //2.保存与提交,根据传入的type区分
      onSave(savetype){
        let that=this; 
        let param={
          page:this.role,
          delcompanyid: this.listId,//delcompanyList的FID
          companyid:this.companyid,//companyList的FID
          typeid:this.form2.val21,//注销类型id
          content:this.form2.val24,//注销状态
          // fyzadmin:this.form2.val25,
          statebtu:savetype,//按钮状态（2为保存，3为提交）
          aaumtime:this.form3.val0,//工商注销完成时间
          banktime:this.form4.val0,//银行账号注销时间
          taxtime:this.form4.val1,//税务注销时间
          socialtime:this.form5.val0,//社会公积金账户注销时间
          sealtime:this.form6.val0//印章销毁时间
        }
        // console.log(param);
        savePost(param).then((res)=>{
          console.log(res,'0000000000000');
          if(res.body.code==='999'){
            // this.delId=res.body.data.filecompanyid;
            if (savetype==2) {
               that.$message({
                message: '保存成功',
                type: 'success'
              });
            }else if(savetype==3){
               that.$message({
                message: '提交成功',
                type: 'success'
              });
            }
            //刷新列表
            that.onQuery('queryForm',2);
            that.dialogFormVisible=false;
            //调用上传附件不是查看状态时上传附件
            // if(this.type!=2&&this.fileList2.length != 0){
            //    that.onSubmit1(this.fileList2)
            // }
          }
        });
      },
      //4.取消
      onCancel(){
         this.dialogFormVisible=false;
         this.resetForm('applicantform');
         this.resetForm('form2');
         this.resetForm('form3');
         this.resetForm('form4');
         this.resetForm('form5');
         this.resetForm('form6');
      },
       //第一个上传附件
      OnChange(file,fileList){
        this.fileList2=fileList;
      },
      OnRemove(file,fileList){
        this.fileList2=fileList;
      },
      beforeUpload(file,filelist){
        // console.log(file)
        this.files = file;
        this.fileName = file.name;
      },
      handlePreview(file) {
      },
      beforeRemove(file) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex % 2 === 0) {
          if (columnIndex === 0) {
            return [1, 2];
          } else if (columnIndex === 1) {
            return [0, 0];
          }
        }
      }
    },
    computed: {
      //  //返回否为境外公司
      // overseasCompany(){
      //   return this.form2.FISOVERSEASCOMPANY;
      // },
      //  //返回否为外资企业
      // foreign(){
      //   return this.form2.FISFOREIGNENTERPRISE;
      // }
    },
    watch: {
      // 'this.form2.FISOVERSEASCOMPANY':{
      //   handler(curVal,oldVal) {
      //     console.log(curVal)
      //     // if(oldVal!=''){
      //     //   this.form2.FISOVERSEASCOMPANY=''
      //     // }
      //     if(curVal=='0'){
      //       this.form2.show4=true;
      //       this.form2.show6=false;
      //       this.form2.show5=false;
      //       this.form2.show51=false;
      //       this.form2.show61=false;
      //     }else if(curVal=="1"){
      //        //是境外公司
      //       this.form2.show6=true;
      //       this.form2.show4=false;
      //       this.form2.show5=false;
      //       this.form2.show51=false;
      //       this.form2.show61=false;
      //     }
      //   },
      //   deep:true,
      //   immediate:true
      // },
      // 'this.form2.FISFOREIGNENTERPRISE':{
      //   immediate:true,
      //   handler(curVal, oldVal) {
      //      //判断是否为外资企业
      //     console.log(curVal, '999999999999999999999')
      //     if(curVal=='0'){
      //       //是内资企业
      //       this.form2.show5=true;
      //       this.form2.show51=false;
      //       if(this.form2.FOUTENTERPRISETYPE=='1'||this.form2.FOUTENTERPRISETYPE=='2'){
      //         //法人代表显示
      //         this.form2.show6=true;
      //         this.form2.show61=false;
      //       }else{
      //         //执行事务合伙人显示
      //         this.form2.show61=true;
      //         this.form2.show6=false;
      //       }
      //     }else if(curVal=="1"){
      //       this.form2.show51=true;
      //       this.form2.show5=false;
      //       if(this.form2.FOUTENTERPRISETYPE=='1'||this.form2.FOUTENTERPRISETYPE=='2'||this.form2.FOUTENTERPRISETYPE=='3'||this.form2.FOUTENTERPRISETYPE=='4'){
      //         //法人代表显示
      //         this.form2.show6=true;
      //         this.form2.show61=false;
      //       }else{
      //         //执行事务合伙人显示
      //         this.form2.show61=true;
      //         this.form2.show6=false;
      //       }
      //     }
      //   },
      //   deep:true,
      //   immediate:true
      // }
    },
    mounted() {
      // console.log(this.$store.state.user.btnShowlist)
      // 初始加载显示数据上方
      showPost().then((res)=>{
        let options=[];
        let tabels=[];
        let options3=[];
        let options4=[];
        console.log(res);
        if(res.body.code==="999"){
          let arr1=res.body.data.districtGroupList;//集团
          let arr3=res.body.data.delstatetypeList;//单据状态
          let arr4=res.body.data.loginoutList;//注销类型
          this.queryForm.flag=res.body.data.flag;
          for(var i=0;i<arr1.length;i++){
            options.push({label:arr1[i].NAME,value:arr1[i].ID});
          }
          this.queryForm.options1=options;//初始所属区域集团
          if(arr3){
              for(var t=0;t<arr3.length;t++){
                options3.push({label:arr3[t].FNAME,value:arr3[t].FNUMBER});
              }
              this.queryForm.options3=options3;
          }else{
             this.queryForm.options3=[];
          }//单据状态
          if(arr4){
            for(var n=0;n<arr4.length;n++){
                options4.push({label:arr4[n].FNAME,value:arr4[n].FNUMBER});
            }
            this.queryForm.options4=options4;
          }else{
            this.queryForm.options4=[];
          }//注销类型
        }
      });
      //初始化加载表格
      this.onQuery('queryForm',1);
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .structure{
      .el-header{
        background: #fff;
        padding:20px;
        margin:20px;
      }
      .dia_content{
        .el-main{
          height:480px;
        }
      }
      .mytips{
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(245, 108, 108, 1);
        line-height: 37px;
        padding-left: 5px;
      }
      .ml-20{margin-left:55px;}
      .el-main{
         padding:0px;
         margin:0 20px ;
        .btn-col{
          padding-bottom:10px;
          margin-bottom:10px;
          text-align: right;
          border-bottom:1px solid #fff;
        }
      }
    .el-date-editor.el-input, .el-date-editor.el-input__inner{width:auto}
  .table-col{
    min-height: 400px;

    .page-col{
      margin-top:10px;
    }
  }
  /*弹出层样式*/
  .applicant-col{
    padding:20px;
  }
  .col{
    h3,h5{
      margin:0;
      font-weight:normal;

    }
    .col-tit{
      height:48px;
      padding:0 20px;
      background:#F5F7FA;
      color:#409EFF;
      line-height:48px;
      font-size:18px;
      position:relative;
      .p2{
        position: absolute;
        left:170px;
        top:-11px;
        height:40px;
        vertical-align: middle;
        form{display: inline-block}
      }
    }
    .col-small-tit{
      height:48px;
      background: #E4E7ED;
      line-height: 48px;
      padding:0 20px;
      position: relative;
      font-size:16px;
      .icon-zx{
        position:absolute;
        top:14px;
        right:20px;
        font-size:24px;
      }
    }
    .col-main{
      padding:20px;
      .p1{
        margin:0 0 20px 0 ;
        .span1{
          display:inline-block;
        }
      }
      .addFile{
        //text-align: center;
        padding:20px 20px 10px;
        border:1px solid #dcdfe6;
        //border-top:none;

      }
    }
    .col-tit{
      span{
        margin: 0 10px;
        font-size:14px;
      }
    }
  }

  .btn2-col{
    background:#e9eef3;
    padding:20px;
    text-align: center;
  }
  }
</style>

