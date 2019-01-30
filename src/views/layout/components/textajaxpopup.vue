<!--必要的组件说明-->
<!-- 这里是公司设立备案表页面-->
<!-- author:duanhaowei. date:2018/10/24 9:10-->

<template>
  <el-container class="testajax">
    <!-- 这里是点击编辑弹出部分 -->
    <el-dialog title="公司设立备案表" :visible.sync="dialogFormVisible" width="95%" top="8vh" :close-on-click-modal=false
      custom-class="doloadcl"
      >
        <el-container>
          <el-main  class="main">
            <!-- 表单数据 -->
            <el-form :model="form">
              <el-row   class="row">
                <el-col :span="6">
                  <el-form-item label="填写人" :label-width="formLabelWidth">
                    <el-input v-model="form.name" :disabled="true" style="width:100%;" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="填写时间" :label-width="formLabelWidth">
                    <el-input
                    style="width:100%;"
                      placeholder="请选择日期"
                      clearable
                      v-model="form.time"
                      :disabled="true">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
               <div class="information">基本信息情况</div>
            </el-form>
            <el-form :model="form1" :disabled="flagg">
              <div class="bainformation">备案申请信息</div>
              <el-row class="row1">
                <el-col :span="item.span" v-for="(item,index) in form1.arr" >
                  <el-form-item :label="item.label" :label-width="formLabelWidth">
                    <el-select v-model="item.value"  v-if="item.type=='select'" :placeholder="item.placeholder"
                    :disabled="item.disabled" style="width:100%;" clearable>
                      <el-option
                        v-for="items in item.optionsgd"
                        :key="items.value"
                        :label="items.label"
                        :value="items.value">
                      </el-option>
                    </el-select>
                    <el-date-picker
                    clearable
                    v-if="item.type=='prickk'"
                      v-model="item.value"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      
                      value-format="yyyy-MM-dd"
                      style="width:100%;"
                      :disabled="item.disabled"
                      unlink-panels>
                    </el-date-picker>
                    <el-input v-model="item.value" v-if="item.type=='input'" autocomplete="off" :placeholder="item.pleaceholder"
                    :disabled="item.disabled" style="width:100%;" clearable></el-input>
                    </el-form-item> 
                </el-col >
              </el-row>
            </el-form>
            
            <!-- 备案登记信息 -->
            <div>
              <!-- <div class="information">备案登记信息</div> -->
              <!-- 这里是业务信息，要根据权限判断显示隐藏 -->
              <!-- v-show="flag!='node'" -->
              <div v-show="this.roule=='node2' || this.roule=='node3'">  
                <div class="bainformation">业务信息</div>
                <el-form :model="ywform" class="ywinformation" :disabled="ywform.flag">
                  <el-row>
                    <el-col :span="item.span" v-for="(item,index) in ywform.arr">
                      <el-form-item :label="item.label" :label-width="item.labelwidth" >
                        <el-select v-model="item.value" :placeholder="item.pleaceholder" v-if="item.type=='select'">
                          <el-option
                            v-for="items in item.optionsgd"
                            :key="items.value"
                            :label="items.label"
                            :value="items.value">
                          </el-option>
                        </el-select>
                        <el-input v-model="item.value" v-if="item.type=='input'" autocomplete="off" :placeholder="item.pleaceholder"
                        :suffix-icon="item.icon"></el-input>
                        <el-date-picker
                          v-model="item.value"
                          type="date"
                          placeholder="选择日期"
                          v-if="item.type==='datetime'"
                          style="width:100%;"
                          :picker-options="item.pickerOptions"
                          value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" class="zdcle">
                      新营业执照/工商登记备案（国家企业信息系统公示）
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <!-- 这里是财务信息 只有权限判断为财务才可以看到 -->
              <el-form :model="cwform" v-show="roule=='node3'">
                <div class="bainformation">财务信息</div>
                <el-row class="row">
                  <el-col :span=6 v-for="(item,index) in cwform.arr" >
                    <el-form-item :label="item.label" :label-width="formLabelWidth">
                      <el-select v-model="item.value"  v-if="item.type=='select'" :placeholder="item.value">
                        <el-option
                          v-for="items in item.optionsgd"
                          :key="items.value"
                          :label="items.label"
                          :value="items.value">
                        </el-option>
                      </el-select>
                      </el-form-item> 
                  </el-col >
                </el-row>
              </el-form>
              <!-- 认缴明细 -->
                <div class="rjmx">
                  <div class="bainformation">认缴明细(股权明细)</div>
                    <el-form :model="rjmxform" :disabled="flagg">
                      <el-row class="row">
                        <el-col :span=6 v-for="(item,index) in rjmxform.arr" >
                          <el-form-item :label="item.label" :label-width="formLabelWidth">
                            <el-input v-model="search"  autocomplete="off" :disabled="true"
                        type="number"></el-input> 
                          </el-form-item> 
                        </el-col >
                      </el-row>
                    </el-form>
                    <!-- 认缴明细表格 -->
                    <div class="table">
                      <el-table
                        :data="rtableData"
                        style="width: 100%"
                        :cell-style="isCenter"
                        :header-cell-style="istabtop"
                        border
                        >
                        <el-table-column
                            type="index"
                            label="序号"
                            width="50"
                            >
                          </el-table-column>
                        <el-table-column
                            prop="name"
                            label="股东名称"
                            width="200">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.value" :placeholder="scope.row.pleaceholder">
                                  <el-option
                                    v-for="items in scope.row.options"
                                    :key="items.value"
                                    :label="items.label"
                                    :value="items.value">
                                  </el-option>
                                </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="xz"
                            label="股东公司性质"
                            width="200">
                          </el-table-column>
                          <el-table-column
                            prop="price"
                            label="认缴金额(万元)"
                            width="150"
                            >
                            <template slot-scope="scope">
                              <el-input
                                  placeholder="请输入金额"
                                  v-model="scope.row.price"
                                  min="0"
                                  type="number"
                                  @blur="min(scope.row.price,scope.$index)">
                                </el-input>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="time"
                            label="认缴时间"
                            width="200"
                            >
                            <template slot-scope="scope">
                              <el-date-picker
                                v-model="scope.row.time"
                                type="date"
                                placeholder="选择日期"
                                style="width:100%;"
                                value-format="yyyy-MM-dd">
                              </el-date-picker>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="czbl"
                            label="出资比例(%)"
                            width="200"
                            >
                            <template slot-scope="scope">
                              <el-input
                                  placeholder=""
                                  v-model="scope.row.czbl"
                                   :disabled="true">
                                </el-input>
                            </template>
                          </el-table-column>
                          <el-table-column label="操作" >
                            <template slot-scope="scope">
                              <el-button
                                size="mini"
                                type="danger"
                                @click="remove2(scope.$index,rtableData)"
                                >删除行</el-button>
                            </template>
                          </el-table-column>
                      </el-table>
                      <div class="ttt" @click="addrjtable">+</div>
                      <!-- <el-button type="success" @click="addrjtable">添加一行</el-button> -->
                    </div>
                    
                </div>
                  <!-- 实缴明细表格需要权限判断 财务可见 -->
                  <div v-show="roule=='node3'">
                    <div class="bainformation">实缴明细</div>
                     <div class="table">
                      <el-table
                        :data="stableData"
                        style="width: 100%"
                        :cell-style="isCenter"
                        :header-cell-style="istabtop"
                        border
                        >
                        <el-table-column
                            type="index"
                            label="序号"
                            width="50"
                            >
                          </el-table-column>
                        <el-table-column
                            prop="name"
                            label="股东名称"
                            width="200">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.value" :placeholder="scope.row.pleaceholder">
                                  <el-option
                                    v-for="items in scope.row.options"
                                    :key="items.value"
                                    :label="items.label"
                                    :value="items.value">
                                  </el-option>
                                </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="xz"
                            label="股东公司性质"
                            width="200">
                          </el-table-column>
                          <el-table-column
                            prop="price"
                            label="认缴金额(万元)"
                            width="150"
                            >
                            <template slot-scope="scope">
                              <el-input
                                  placeholder="请输入金额"
                                  v-model="scope.row.price">
                                </el-input>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="time"
                            label="认缴时间"
                            width="200"
                            >
                            <template slot-scope="scope">
                              <el-date-picker
                                v-model="scope.row.time"
                                type="date"
                                placeholder="选择日期"
                                style="width:100%;"
                                value-format="yyyy-MM-dd">
                              </el-date-picker>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="czbl"
                            label="出资比例(%)"
                            >
                            <template slot-scope="scope">
                              <el-input
                                  placeholder=""
                                  v-model="scope.row.czbl"
                                  type="number"   
                                  :disabled="true">
                                </el-input>
                            </template>
                          </el-table-column>
                          <el-table-column label="操作" width=200>
                            <template slot-scope="scope">
                              <el-button
                                size="mini"
                                type="danger"
                                @click="remove3(scope.$index,stableData)"
                                >删除行</el-button>
                            </template>
                          </el-table-column>
                      </el-table>
                      <div class="ttt" @click="addsjtable">+</div>
                      <!-- <el-button type="success" @click="addsjtable">添加一行</el-button> -->
                    </div>
                  </div>
                  <!-- 股东信息情况 -->
                  <div v-show="roule=='node3'">
                    <div class="bainformation">股东信息情况</div>
                    <div class="table">
                      <el-table
                        :data="gtableData"
                        style="width: 100%"
                        :cell-style="isCenter"
                        :header-cell-style="istabtop">
                        <el-table-column
                            label="工商股比"
                          >
                          <el-table-column
                            prop="name"
                            label="股东名称"
                            >
                          </el-table-column>
                          <el-table-column
                            prop="gdxz"
                            label="股东公司性质"
                            >
                          </el-table-column>
                          <el-table-column
                            prop="gb"
                            label="股比(%)"
                            >
                          </el-table-column>
                        </el-table-column>
                      </el-table>
                    </div>
                     <div class="table">
                      <el-table
                        :data="cwgbtableData"
                        style="width: 100%"
                        :cell-style="isCenter"
                        :header-cell-style="istabtop">
                        <el-table-column
                            label="财务股比"
                          >
                          <el-table-column
                            prop="name"
                            label="股东名称"
                            >
                          </el-table-column>
                          <el-table-column
                            prop="gdxz"
                            label="股东公司性质"
                            >
                          </el-table-column>
                          <el-table-column
                            prop="gb"
                            label="股比(%)"
                            >
                          </el-table-column>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
             </div>
            <!-- 董监高任职情况 -->
            <div>
              <div class="temp">董、监、高任职情况</div>
              <!-- 内部 -->
             
              <div>
                <div class="bainformation">内部董、监、高任职</div>
                <div class="table">
                  <el-table
                    :data="dtableData"
                    style="width: 100%"
                    :cell-style="isCenter"
                    :header-cell-style="istabtop"
                    border>
                    <el-table-column
                        type="index"
                        label="序号"
                        width="50"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="work"
                        label="本公司职位"
                        width="200">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.value" :placeholder="scope.row.pleaceholder"
                            :disabled="flagg">
                              <el-option
                                v-for="items in scope.row.options"
                                :key="items.value"
                                :label="items.label"
                                :value="items.value">
                              </el-option>
                            </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="姓名"
                        width="150">
                            <template slot-scope="scope">
                              <el-input
                                  placeholder="请输入姓名"
                                  v-model="scope.row.name"
                                  :disabled="flagg">
                                </el-input>
                            </template>
                      </el-table-column>
                      <el-table-column
                        prop="zlzw"
                        label="中梁职位"
                        width="150">
                        <template slot-scope="scope">
                              <el-input
                                  placeholder="请输入职位"
                                  v-model="scope.row.zlzw"
                                  :disabled="flagg">
                                </el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="qyjt"
                        label="区域集团"
                        width="250">
                        <template slot-scope="scope">
                              <el-input
                                  placeholder="请输入区域集团"
                                  v-model="scope.row.qyjt"
                                  :disabled="flagg">
                                </el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="qygs"
                        label="区域公司"
                        width="250">
                        <template slot-scope="scope">
                              <el-input
                                  placeholder="请输入区域公司"
                                  v-model="scope.row.qygs"
                                  :disabled="flagg">
                                </el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" >
                        <template slot-scope="scope">
                          <el-button
                            size="mini"
                            type="danger"
                            @click="remove4(scope.$index,dtableData)"
                            :disabled="flagg">删除行</el-button>
                        </template>
                      </el-table-column>
                  </el-table>
                  <div class="ttt" @click="adddjgtable">+</div>
                  <!-- <el-button type="success" @click="adddjgtable">添加一行</el-button> -->
                </div>
              </div>
              <!-- 外部董监高任职 -->
              <div>
                <div class=" bainformation">外部董、监、高任职</div>
                <div class="table">
                  <el-table
                    :data="wtableData"
                    style="width: 100%"
                    :cell-style="isCenter"
                    :header-cell-style="istabtop"
                    border>
                    <el-table-column
                        type="index"
                        label="序号"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        prop="work"
                        label="本公司职位"
                        width="250">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.value" :placeholder="scope.row.pleaceholder"
                            style="width:100%;" :disabled="flagg">
                              <el-option
                                v-for="items in scope.row.options"
                                :key="items.value"
                                :label="items.label"
                                :value="items.value">
                              </el-option>
                            </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="姓名"
                        width="300">
                        <template slot-scope="scope">
                              <el-input
                                  placeholder="请输入姓名"
                                  v-model="scope.row.name"
                                  :disabled="flagg">
                                </el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="wpf"
                        label="委派方"
                        width="400">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.value1" :placeholder="scope.row.pleaceholder2"
                            style="width:100%;" :disabled="flagg">
                              <el-option
                                v-for="items in scope.row.options2"
                                :key="items.value"
                                :label="items.label"
                                :value="items.value">
                              </el-option>
                            </el-select>
                        </template>
                      </el-table-column>
                      
                      
                      <el-table-column label="操作">
                        <template slot-scope="scope">
                          <el-button
                            size="mini"
                            type="danger"
                            @click="remove5(scope.$index,wtableData)"
                            :disabled="flagg">删除行</el-button>
                        </template>
                      </el-table-column>
                  </el-table>
                  <div class="ttt" @click="addwbtable">+</div>
                  <!-- <el-button type="success" @click="addwbtable">添加一行</el-button> -->
                  
                </div>
              </div>
            </div>
            
            <!-- 项目情况根据权限判断 只有业务的有这个表 要控制显示隐藏 -->
            <!-- <div>
              <div class="information">项目情况</div>
              
              <div>
                <div class="bainformation">在建项目</div>
                  <div class="table">
                    <el-table
                      :data="zjdtableData"
                      :cell-style="isCenter"
                      :header-cell-style="istabtop">
                        <el-table-column
                            label="在建项目"
                            >
                            <el-table-column
                                type="index"
                                label="序号"
                                width="150">
                            </el-table-column>
                            <el-table-column
                              prop="zjxmname"
                                label="在建项目名称"
                                >
                            </el-table-column>
                            <el-table-column
                              prop="zjxmhqfs"
                                label="在建项目获取方式"
                                >
                            </el-table-column>
                          </el-table-column>
                    </el-table>
                  </div>
              </div>
              >
              <div>
                <div class="bainformation">完成项目</div>
                <div class="table">
                  <el-table
                    :data="wctableData"
                    :cell-style="isCenter"
                    :header-cell-style="istabtop">
                      <el-table-column
                          label="完成项目"
                          >
                          <el-table-column
                              type="index"
                              label="序号"
                              width="150">
                          </el-table-column>
                          <el-table-column
                            prop="wcxmname"
                              label="完成项目名称"
                              >
                          </el-table-column>
                          <el-table-column
                            prop="wcxmtime"
                              label="完成时间"
                              >
                          </el-table-column>
                        </el-table-column>
                  </el-table>
                </div>
              </div>
            </div> -->
            <!-- 附件管理 -->
            <div>
              
            </div>
          </el-main>
        </el-container>
        <!-- 表格底部footer -->
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="back()">驳回</el-button>
          <el-button  type="primary" @click="save()">保存</el-button>
          <el-button type="primary" @click="commits">提交</el-button>
          <el-button @click="dialogFormVisible = false"  type="primary">取 消</el-button>
      </div>
    </el-dialog>
    </el-main>
    
  </el-container>
</template>

<script>
import Vue from "vue";
import {
  commit,
  change,
  indexinfo,
  addapplication,
  foradd,
  querys,
  changework,
  changegs,
  saves,
  remov
} from "@/api/testajax";
// import { testGet, testPost,testPut,testDelete,testMultiAjax } from "@/api/test";

export default {
  name: "testajax",
  components: {},
  data() {
    return {
      // ajaxRes: ""
      formInline: {
        user: "",
        region: "",
        // 开始时间
        prick: "",
        //结束日期
        prick1: ""
      },
      //这里是公司设立备案表首页form表单数据
      forms: {
        name: "",
        flag: true,
        arr: [
          {
            span: 6,
            label: "所属区域集团",
            value: "",
            type: "select",
            placeholder: "请选择所属区域集团",
            optionsgd: [],
            value1: ""
          },
          {
            span: 6,
            label: "所属区域公司",
            value: "",
            type: "select",
            placeholder: "请选择所属区域公司",
            optionsgd: [],
            value1: ""
          },
          {
            span: 6,
            label: "公司名称",
            value: "",
            type: "input",
            pleaceholder: "请输入关键字"
          },
          {
            span: 6,
            label: "单据状态",
            value: "",
            type: "select",
            placeholder: "请选择单据状态",
            optionsgd: [],
            value1: ""
          }
        ]
      },
      //首页表格
      tableData: [],
      //查询开始日期与查询结束日期过滤
      pickerOptions1: {
        disabledDate: time => {
          if (this.formInline.prick1) {
            return time.getTime() > this.formInline.prick1.getTime();
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerOptions2: {
        disabledDate: time => {
          if (this.formInline.prick) {
            return (
              time.getTime() < this.formInline.prick.getTime() ||
              time.getTime() > Date.now()
            );
          } else {
            return time.getTime() > Date.now();
          }
        }
      },

      // form的label宽度
      formLabelWidth: "150px",
      //分页
      //当前选中的页 改变时触发事件
      currentPage: 1,
      //总数 后台给传过来
      pages: 1,
      //显示doloing
      dialogFormVisible: false,
      doloadcl: "doloadcl1",
      //这里是弹出的填写人表单数据
      form: {
        name: "",
        time: ""
      },
      //这里是弹出层动态表单的数据
      form1: {
        name: "",

        arr: [
          {
            span: 6,
            label: "公司名称",
            value: "",
            type: "input",
            pleaceholder: "",
            disabled: false
          },
          {
            span: 6,
            label: "注册资本(万元)",
            value: "",
            type: "input",
            pleaceholder: "",
            disabled: true
          },
          {
            span: 6,
            label: "币种",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: false
          },
          {
            span: 6,
            label: "是否境外公司",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: false
          },
          {
            span: 6,
            label: "是否外资企业",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: true
          },
          {
            span: 6,
            label: "外资企业类型",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: true
          },
          {
            span: 6,
            label: "法人代表",
            value: "",
            type: "input",
            pleaceholder: "",
            disabled: true
          },
          {
            span: 6,
            label: "执行事务合伙人",
            value: "",
            type: "input",
            pleaceholder: "",
            disabled: true
          },
          {
            span: 12,
            label: "经营/合伙期限(年)",
            value: "",
            type: "prickk",
            disabled: false
          },
          {
            span: 6,
            label: "投资方式",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: false
          },
          {
            span: 6,
            label: "所属区域集团",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: false
          },
          {
            span: 6,
            label: "所属区域公司",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: false
          },
          {
            span: 6,
            label: "所属事业部",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: false
          },
          {
            span: 6,
            label: "公司类型",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: false
          },
          {
            span: 6,
            label: "一级公司性质",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: false
          },
          {
            span: 6,
            label: "二级公司性质",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: false
          },
          {
            span: 6,
            label: "资质情况",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: false
          },
          {
            span: 24,
            label: "经营范围",
            value: "",
            type: "input",
            pleaceholder: "",
            disabled: false
          },
          {
            span: 24,
            label: "公司住所",
            value: "",
            type: "input",
            pleaceholder: "",
            disabled: false
          },
          {
            span: 24,
            label: "备注",
            value: "",
            type: "input",
            pleaceholder: "",
            disabled: false
          }
        ]
      },
      //这里是业务信息的form表单
      ywform: {
        flag: false,
        arr: [
          {
            labelwidth: "150px",
            span: 6,
            label: "统一社会信用代码：",
            value: "",
            type: "input",
            pleaceholder: "",
            icon: ""
          },
          {
            labelwidth: "130px",
            span: 6,
            label: "成立日期",
            value: "",
            type: "datetime",
            pickerOptions: {
              disabledDate: time => {
                if (this.value) {
                  return time.getTime() > this.value.getTime();
                } else {
                  return time.getTime() > Date.now();
                }
              }
            }
          },
          {
            labelwidth: "150px",
            span: 6,
            label: "印章保管人",
            value: "",
            type: "input",
            pleaceholder: "",
            icon: ""
          },
          {
            labelwidth: "150px",
            span: 6,
            label: "证照保管人",
            value: "",
            type: "input",
            pleaceholder: "",
            icon: ""
          },
          //  {
          //    span:6,
          //   label:'证照保管人：',
          //   labelwidth:'130px',
          //   value:'',
          //   type:'select',
          //   placeholder:'张乐',
          //   optionsgd: [{
          //       value: '选项1',
          //       label: '无双'
          //     }, {
          //       value: '选项2',
          //       label: '张乐'
          //     }, {
          //       value: '选项3',
          //       label: '全选'
          //     }],
          //     value1:''
          // },
          {
            labelwidth: "150px",
            span: 6,
            label: "时间:",
            value: "",
            type: "datetime",
            pleaceholder: "",
            icon: "el-icon-date",
            pickerOptions: {
              disabledDate: time => {
                if (this.value) {
                  return time.getTime() > this.value.getTime();
                } else {
                  return time.getTime() > Date.now();
                }
              }
            }
          }
        ]
      },
      //这里是财务信息表单的数据
      cwform: {
        name: "",
        arr: [
          {
            span: 8,
            label: "所属合并范围",
            value: "",
            type: "select",
            optionsgd: [],
            value1: ""
          },
          {
            span: 8,
            label: "公司类别",
            value: "",
            type: "select",
            optionsgd: [],
            value1: ""
          },
          {
            span: 8,
            label: "公司并表方 ",
            value: "",
            type: "select",
            placeholder: "是",
            optionsgd: [],
            value1: ""
          }
        ]
      },
      //  认缴明细form
      rjmxform: {
        flag: false,
        arr: [
          {
            label: "注册资本(万元)",
            value: ''
          }
        ]
      },
      //表单label宽度
      formLabelWidth: "130px",
      //认缴明细表格第一个下拉的数据保存在本地

      //注册资本input
      rjmxv: "",
      // 认缴明细表格数据
      rtableData: [
        {
          options: [],
          value: "",
          pleaceholder: "请选择",
          xz: "",
          price: "",
          time: "",
          czbl: ""
        }
      ],
      //实缴明细表格
      stableData: [
        {
          options: [],
          value: "",
          pleaceholder: "请选择",
          xz: "",
          price: "",
          time: "",
          czbl: ""
        }
      ],
      //股东信息情况表
      gtableData: [
       
      ],
      cwgbtableData: [
       
      ],
      //本公司职务第一个下拉
      bgszwt: [],
      //董监高任职情况
      dtableData: [
        {
          options: [],
          value: "",
          pleaceholder: "请选择",
          name: "",
          value1: "",
          pleaceholder1: "请选择",
          zlzw: "",
          qyjt: "",
          qygs: ""
        }
      ],
      //外部董监高任职表格
      wtableData: [
        {
          options: [],
          value: "",
          pleaceholder: "董事",
          options1: [],
          value1: "",
          pleaceholder1: "请选择",
          options2: [],
          value2: "",
          pleaceholder2: "请选择"
        }
      ],
      //项目情况
      //在建项目表格数据
      zjdtableData: [
        {
          zjxmname: "中梁XXXXXXX",
          zjxmhqfs: "正常手段"
        },
        {
          zjxmname: "中梁中梁XXXXX",
          zjxmhqfs: "正常手段是是是"
        }
      ],
      //完成项目表数据
      wctableData: [
        {
          wcxmname: "中梁XXXXXXX",
          wcxmtime: "2018-8-8"
        },
        {
          wcxmname: "中梁中梁XXXXX",
          wcxmtime: "2018-9-9"
        }
      ],
      //这个是控制增加 编辑的
      //这里是单独处理的人家明细表格第一个下拉框
      rjlist: [],
      //这里是判断法人代表
      num: "",
      flag: "",
      roule: "",
      flagg: false, //申请人判断 填写内容为false
      flagg1: false, //业务判断 财务不可编辑
      rstab:[],
      idd:'',
      soules:'',
      a:'',
      //这里是认缴明细实缴明细的股东名称的options
      partner:[],
      //这里是内部董监高的职务
      inside:[],
      //这里是外部董监高的职务
      extarnal:[],
      //这里是外部董监高的委派方
      
    };
  },
  methods: {
    //提交
    commits(){
      // console.log(this.prick);
      console.log(this.form1.arr[8].value)
      // return false
      // console.log(this.form)
      // console.log(this.form1)
      // console.log(this.ywform)
      // console.log(this.cwform)
      // console.log(this.rjmxform)
      // console.log(this.rtableData)
      // // console.log(this.rjmxform)
      // console.log(this.stableData)
      // console.log(this.dtableData)
      console.log(this.rtableData);
      let jsons = {
        companyname: this.form1.arr[0].value,
        money: this.form1.arr[1].value,
        moneytype: this.form1.arr[2].value,
        jycompany: this.form1.arr[3].value,
        wz: this.form1.arr[4].value,
        wztype: this.form1.arr[5].value,
        frperson: this.form1.arr[6].value,
        affairperson: this.form1.arr[7].value,
        partnership: this.form1.arr[8].value,
        tztype: this.form1.arr[9].value,
        group: this.form1.arr[10].value,
        company: this.form1.arr[11].value,
        department: this.form1.arr[12].value,
        companytype: this.form1.arr[13].value,
        companytype1: this.form1.arr[14].value,
        companytype2: this.form1.arr[15].value,
        qualification: this.form1.arr[16].value,
        jyfw: this.form1.arr[17].value,
        companyaddress: this.form1.arr[18].value,
        content: this.form1.arr[19].value,
        //业务form
         unifyreditcode:this.ywform.arr[0].value,
        setuptime:this.ywform.arr[1].value,
        sealperson:this.ywform.arr[2].value,
        zzperson:this.ywform.arr[3].value,
        businesslicencetime:this.ywform.arr[4].value,
        //财务信息的form
        combinerange:this.cwform.arr[0].value,
        companytypeb:this.cwform.arr[1].value,
        companybbf:this.cwform.arr[2].value,
      };
      let param = {
        // name:this.form.name,
        // time:this.form.time,
        company: JSON.stringify(jsons),
        statebtu: "3",
        fid: this.idd,
        // formlist:this.formlists,  //填写人的表单
        // ywformlist:this.ywforms,   //业务人的表单
        // cwform:this.cwforms,       //财务填写的表单
        cwtable: this.cwtables, //认缴明细的表格
        sjmxtable:this.sjmxtables,   //实缴明细的表格
        dtable: this.dtables, //外部董监高的表格信息
        wtable: this.wtables //内部董监高的表格信息
      };
      console.log(param);
      saves(param).then(res => {
        console.log(res);
        // if(re   )
        if(res.body.status==='1'){
          this.$message({
        type: "success",
        message: "提交成功"
        });
        this.tablelist();
        this.dialogFormVisible = false;

        }
      });
      
    },
    //添加
    uplod(){
      this.dialogFormVisible = true;
      for(let i=0;i<this.form1.arr.length;i++){
          this.form1.arr[i].value = ''
      }
      for(let i=0;i<this.ywform.arr.length;i++){
          this.ywform.arr[i].value = ''
      }
      for(let i=0;i<this.cwform.arr.length;i++){
          this.cwform.arr[i].value = ''
      }
      let arr5 = this.rtableData[0].options;
      this.rtableData = [];
      this.rtableData.push({options:arr5,value:'',pleaceholder:"请选择",xz:'',czbl:'',price:'',time:'',id:''})
      let arr7 = this.stableData[0].options;
      this.stableData = [];
      this.stableData.push({options:arr7,value:'',pleaceholder:"请选择",xz:'',czbl:'',price:'',time:'',id:''})
      let arr6 = this.dtableData[0].options;
      this.dtableData = [];
      this.dtableData.push({options:arr6,value:'',pleaceholder:"请选择",qygs:'',qyjt:'',value1:'',zlzw:'',name:'',id:''})
      let arr2 =  this.wtableData[0].options;
      let arr3 =  this.wtableData[0].options2;
      this.wtableData = [];
      this.wtableData.push({options:arr2,options2:arr3,pleaceholder1:"请选择",pleaceholder2:"请选择",value:'',value1:'',value2:'',name:'',id:''})

      // this.soules = '1';
      
      // this.rtableData = [];
      // this.dtableData = [];
      // this.wtableData = [];
    },
    //当第一个select改变时触发
    showw(value) {
      console.log(value);
      let param = {
        areagroupid: value
      };
      change(param).then(res => {
        if (res.data.code === "999") {
          console.log(res.data.data);
          let length = res.data.data.length;
          this.forms.arr[1].optionsgd = [];
          this.forms.arr[1].value = "";
          // this.forms.arr[1].value='';
          for (let i = 0; i < length; i++) {
            this.forms.arr[1].optionsgd.push({
              value: res.data.data[i].ID,
              label: res.data.data[i].NAME
            });
          }
        }
      });
    },
    // 刚进入页面首页东西
    flingingdx() {
      // alert(1)
      let param = {
        userNumber: "admin",
        passWord: "admin"
      };
      indexinfo(param).then(res => {
        console.log(res.data.data);
        this.forms.flag = res.data.data.flag;
        let arr = res.data.data.companysetupList;
        let arr1 = res.data.data.districtGroupList;
        let arr2 = res.data.data.documentStateList;

        for (let i = 0; i < arr1.length; i++) {
          this.forms.arr[0].optionsgd.push({
            value: arr1[i].ID,
            label: arr1[i].NAME
          });
        }
        for (let i = 0; i < arr2.length; i++) {
          this.forms.arr[3].optionsgd.push({
            value: arr2[i].FNUMBER,
            label: arr2[i].FNAME
          });
        }
        //  this.tableData = res.data.data.companysetupList;
        //  {
        //   state:'2',
        //   name:'3',
        //   type:'54',
        //   stat:'2',
        //   prick:'d',
        //   creatname:'sd',
        //   bosname:'突突突'
        // },

        // this.tableData
      });
    },
    //刚进入首页时表格数据
    tablelist() {
      let param = {
        districtGroup: this.forms.arr[0].value,
        districtCompany: this.forms.arr[1].value,
        companyName: this.forms.arr[2].value,
        billstatus: this.forms.arr[3].value,
        starttime: this.formInline.prick,
        endtime: this.formInline.prick1,
        pages: this.currentPage
      };
      querys(param).then(res => {
        console.log(res.data.data);

        let arr = res.data.data.companysetupList;
        this.total = res.data.data.size;
        this.tableData = [];
        for (let i = 0; i < arr.length; i++) {
          this.tableData.push({
            state: arr[i].FBILLSTATUS,
            name: arr[i].FAREAGROUP,
            type: arr[i].FAREACOMPANY,
            stat: arr[i].FCOMPANY,
            prick: arr[i].FBUSINESSLICENCETIME,
            creatname: arr[i].FSETUPREGCOMPETETIME,
            bosname: arr[i].PERSONNAME,
            state1: arr[i].STATE,
            id: arr[i].FID
          });
        }
      });
      //  console.log(param)
    },
    //查询
    onSubmit() {
      this.tablelist();
      // let a = [1, 2, [1, 2], 3];
      // console.log(a);
    },
    //进入首页时弹出层所有数据
    addlication() {
      // this.dialogFormVisible = true
      addapplication().then(res => {
        console.log(res);
        // this.roule = res.data.data.page;
        // console.log(this.roule);
        if (res.data.data.page != "node1") {
          this.ywform.flag = true;
        } else {
          this.ywform.flag = false;
        }
        // if(res.data.data.page=='node3'){

        // }
        
        // this.flag = res.data.data.page;
        this.form.name = res.data.data.personName;
        this.form.time = res.data.data.writetime;
        this.form1.arr[2].optionsgd = [];
        this.form1.arr[3].optionsgd = [];
        this.form1.arr[4].optionsgd = [];
        this.form1.arr[9].optionsgd = [];
        this.form1.arr[10].optionsgd = [];
        this.form1.arr[13].optionsgd = [];
        this.form1.arr[16].optionsgd = [];
        this.cwform.arr[0].optionsgd = [];
        this.cwform.arr[1].optionsgd = [];
        this.cwform.arr[2].optionsgd = [];
        this.rtableData[0].options = [];
        this.stableData[0].options = [];
        this.bgszw = [];
        this.wtableData[0].options = [];
        this.dtableData[0].options = [];
        this.wtableData[0].options1 = [];
        this.wtableData[0].options2 = [];
        this.rjlist = [];
        for (let i = 0; i < res.data.data.CurrencyList.length; i++) {
          this.form1.arr[2].optionsgd.push({
            value: res.data.data.CurrencyList[i].FNUMBER,
            label: res.data.data.CurrencyList[i].FNAME
          });
        }
        foradd(res.data.data.IsenableList, this.form1.arr[3].optionsgd);
        foradd(res.data.data.IsenableList, this.form1.arr[4].optionsgd);
        foradd(res.data.data.investtypeList, this.form1.arr[9].optionsgd);
        for (let i = 0; i < res.data.data.districtGroupList.length; i++) {
          this.form1.arr[10].optionsgd.push({
            value: res.data.data.districtGroupList[i].ID,
            label: res.data.data.districtGroupList[i].NAME
          });
        }
        foradd(res.data.data.companyTypeList, this.form1.arr[13].optionsgd);
        foradd(res.data.data.qualificationsList, this.form1.arr[16].optionsgd);
        foradd(res.data.data.sysCode, this.cwform.arr[0].optionsgd);
        foradd(res.data.data.sysCode2, this.cwform.arr[1].optionsgd);
        foradd(res.data.data.sysCode3, this.cwform.arr[2].optionsgd);
        foradd(res.data.data.fshareholdernameList, this.rtableData[0].options);
        this.rstab = this.rtableData[0].options;
        // console.log(this.rstab)
        foradd(res.data.data.fshareholdernameList, this.stableData[0].options);
        foradd(res.data.data.typeList, this.dtableData[0].options);
        // this.wdjg = res.data.data.typeList;
        foradd(res.data.data.typeList, this.wtableData[0].options);
        // this.wdjg = res.data.data.typeList;
        //  foradd(res.data.data.findForJdbc4,this.wtableData[0].options2);
        for (let i = 0; i < res.data.data.findForJdbc4.length; i++) {
          this.wtableData[0].options2.push({
            value: res.data.data.findForJdbc4[i].FID,
            label: res.data.data.findForJdbc4[i].FNAME
          });
        }
        console.log(this.wtableData[0].options2);
        //  foradd(res.data.data.typeList,this.bgszw);

        //  console.log(this.rjlist);
        //  this.rtableData[0].options = this.rjlist;
        //  this.stableData[0].options = this.rjlist;
        //  this.dtableData[0].options = this.bgszw;
        //  this.wtableData[0].options = this.bgszw;
      });
    },
    //认缴明细添加一行
    addrjtable() {
      // console.log(this.dtableData);
      this.rtableData.push({
        options: this.rtableData[0].options,
        value: "",
        pleaceholder: "请选择",
        xz: "",
        price: "",
        time: "",
        czbl: "",
        id:''
      });
    },
    //实缴明细添加
    addsjtable() {
      // console.log(1)
      this.stableData.push({
        options: this.stableData[0].options,
        value: "",
        pleaceholder: "请选择",
        xz: "",
        price: "",
        time: "",
        czbl: "",
        id:''
      });
      console.log(this.stableData);
    },
    //内部董监高添加行
    adddjgtable() {
      this.dtableData.push({
        options: this.dtableData[0].options,
        value: "",
        pleaceholder: "请选择",
        options1: [],
        value1: "",
        pleaceholder1: "请选择",
        options2: [],
        value2: "",
        pleaceholder2: "请选择",
        id:''
      });
    },
    //外部董监高添加行
    addwbtable() {
      this.wtableData.push({
        options: this.wtableData[0].options,
        value: "",
        pleaceholder: "董事",
        options1: [],
        value1: "",
        pleaceholder1: "请选择",
        options2: this.wtableData[0].options2,
        value2: "",
        pleaceholder2: "请选择",
        id:''
      });
    },
    //这个是添加和编辑的封装调用
    compamy(){
      addapplication(param).then(res => {
        console.log(res.body.data);
        for(let i=0;i<this.form1.arr.length;i++){
          this.form1.arr[i].value = '';
        }
        // this.idd = res.body.data.companyList[0].FID;
        // console.log(res.body.data.companyList[0].FID)
        this.form1.arr[0].value = res.body.data.companyList[0].FCOMPANY;
        this.form1.arr[1].value = res.body.data.companyList[0].FREGISTEREDCAPITAL;
        this.form1.arr[2].value = res.body.data.companyList[0].FMONEYTYPE;
        this.form1.arr[3].value = res.body.data.companyList[0].FISOVERSEASCOMPANY;
        this.form1.arr[4].value = res.body.data.companyList[0].FISFOREIGNENTERPRISE;
        this.form1.arr[5].value = res.body.data.companyList[0].NWZ;
        this.form1.arr[6].value = res.body.data.companyList[0].FLEGALPERSON;
        this.form1.arr[7].value = res.body.data.companyList[0].FFZZAFFAIRWITHPERSON;
        this.form1.arr[8].value = res.body.data.companyList[0].FPARTNERSHIP;
        console.log(this.form1.arr[8].value)
        this.form1.arr[9].value = res.body.data.companyList[0].FINVESTMENTMODE;
        this.form1.arr[10].value = res.body.data.companyList[0].FAREAGROUP;
        this.form1.arr[11].value = res.body.data.companyList[0].FAREACOMPANY;
        this.form1.arr[12].value = res.body.data.companyList[0].FBUSINESSDEPARTMENT;
        this.form1.arr[13].value = res.body.data.companyList[0].FCOMPANYTYPE;
        this.form1.arr[14].value = res.body.data.companyList[0].FFIRSTCOMPANYNATURE;
        this.form1.arr[15].value = res.body.data.companyList[0].FTWOCOMPANYNATURE;
        this.form1.arr[16].value = res.body.data.companyList[0].FAPTITUDESITUATION;
        this.form1.arr[17].value = res.body.data.companyList[0].FSCOPEOFOPERATION;
        this.form1.arr[18].value = res.body.data.companyList[0].FCOMPANYADDRESS;
        this.form1.arr[19].value = res.body.data.companyList[0].FREMARK;
        console.log(res.body.data.findForJdbc2)

        console.log(this.rtableData)
        console.log(this.rstab)
        this.rtableData = [];
        // this.
      if(res.body.data.findForJdbc.length==0){
          this.rtableData.push({options:this.rstab,value:'',pleaceholder:"请选择",xz:'',czbl:'',price:'',time:''})
      }else{
        for(let i=0;i<res.body.data.findForJdbc.length;i++){
          this.rtableData.push({options:this.rstab,value:res.body.data.findForJdbc[i].
          FPARTNER,pleaceholder:"请选择",xz:res.body.data.findForJdbc[i].
          FPARTNERNATURENAME,czbl:res.body.data.findForJdbc[i].FCAPITALKEY,price:res.body.data.findForJdbc[i].
          FSUBCRIBEMONEY,time:res.body.data.findForJdbc[i].FSUBCRIBETIME})
        }
      }
      console.log(this.wtableData)
      // return false
     let arr1= this.dtableData[0].options;
     this.dtableData = [];
     if(res.body.data.findForJdbc2.length==0){
          this.dtableData.push({options:arr1,value:'',pleaceholder:"请输入职务",qygs:'',qyjt:'',value1:'',zlzw:'',name:''})
      }else{
        for(let i=0;i<res.body.data.findForJdbc2.length;i++){
          this.dtableData.push({options:arr1,value:res.body.data.findForJdbc2[i].
          FPOSITION,pleaceholder:"请输入职务",pleaceholder1:"请选择",zlzw:res.body.data.findForJdbc2[i].
          FZLPOSITIONNAME,name:res.body.data.findForJdbc2[i].FPERSONNAME,qyjt:res.body.data.findForJdbc2[i].
          FAREABLOCNAME,qygs:res.body.data.findForJdbc2[i].FAREACOMPANYNAME})
        }
      }
      let arr2 =  this.wtableData[0].options;
      let arr3 =  this.wtableData[0].options2;
      this.wtableData = [];
      if(res.body.data.findForJdbc3.length==0){
          this.wtableData.push({options:arr2,options2:arr3,pleaceholder1:"请选择",pleaceholder2:"请选择",value:'',value1:'',value2:'',name:''})
      }else{
        for(let i=0;i<res.body.data.findForJdbc3.length;i++){

          this.wtableData.push({options:arr2,options2:arr3,value:res.body.data.findForJdbc3[i].
          FPOSITION,pleaceholder1:"请选择",pleaceholder2:"请选择",value1:res.body.data.findForJdbc3[i].
          FDELEGATE,name:res.body.data.findForJdbc3[i].
          FPERSONNAME})
        }
      }
      });
    },
    
    //编辑按钮操作  弹出框  并且可能传入值
    upload(index, rows) {
      // console.log(this.dtableData)
      this.dialogFormVisible = true;
      //  if(this.roule == '')
      let param = {
        companyid: this.tableData[index].id,

      };
      console.log(param)
      addapplication(param).then(res => {
        console.log(res.body.data);
        
        for(let i=0;i<this.form1.arr.length;i++){
          this.form1.arr[i].value = '';
        }
        this.idd = res.body.data.companyList[0].FID;
        console.log(res.body.data.page)
        this.roule = res.body.data.page;
            console.log(this.roule);
          if (this.roule == "node1") {
            this.flagg = false;
          }
          if (this.roule == "node2") {
            this.flagg1 = false;
            this.flagg = true;
          }
          if (this.roule == "node3") {
            this.flagg1 = true;
            this.flagg = true;
          }
        this.form1.arr[0].value = res.body.data.companyList[0].FCOMPANY;
        this.form1.arr[1].value = res.body.data.companyList[0].FREGISTEREDCAPITAL;
        this.form1.arr[2].value = res.body.data.companyList[0].FMONEYTYPE;
        this.form1.arr[3].value = res.body.data.companyList[0].FISOVERSEASCOMPANY;
        this.form1.arr[4].value = res.body.data.companyList[0].FISFOREIGNENTERPRISE;
        this.form1.arr[5].value = res.body.data.companyList[0].NWZ;
        this.form1.arr[6].value = res.body.data.companyList[0].FLEGALPERSON;
        this.form1.arr[7].value = res.body.data.companyList[0].FFZZAFFAIRWITHPERSON;
        if(res.body.data.companyList[0].FPARTNERSHIP!=null){
           let arr = res.body.data.companyList[0].FPARTNERSHIP.split('"')
          let arr111=[arr[1],arr[3]]
         this.form1.arr[8].value = arr111;
        }else{
          console.log('11111')
        }
       
        // console.log(arr111)
       
        this.form1.arr[9].value = res.body.data.companyList[0].FINVESTMENTMODE;
        this.form1.arr[10].value = res.body.data.companyList[0].FAREAGROUP;
        this.form1.arr[11].value = res.body.data.companyList[0].FAREACOMPANY;
        this.form1.arr[12].value = res.body.data.companyList[0].FBUSINESSDEPARTMENT;
        this.form1.arr[13].value = res.body.data.companyList[0].FCOMPANYTYPE;
        this.form1.arr[14].value = res.body.data.companyList[0].FFIRSTCOMPANYNATURE;
        this.form1.arr[15].value = res.body.data.companyList[0].FTWOCOMPANYNATURE;
        this.form1.arr[16].value = res.body.data.companyList[0].FAPTITUDESITUATION;
        this.form1.arr[17].value = res.body.data.companyList[0].FSCOPEOFOPERATION;
        this.form1.arr[18].value = res.body.data.companyList[0].FCOMPANYADDRESS;
        this.form1.arr[19].value = res.body.data.companyList[0].FREMARK;
        this.ywform.arr[0].value = res.body.data.findForJdbc8[0].FUNIFYREDITCODE;
        this.ywform.arr[1].value = res.body.data.findForJdbc8[0].FSETUPTIME;
        this.ywform.arr[2].value = res.body.data.findForJdbc8[0].FSEALPERSON;
        this.ywform.arr[3].value = res.body.data.findForJdbc8[0].FZZPERSON;
        this.ywform.arr[4].value = res.body.data.findForJdbc8[0].FBUSINESSLICENCETIME;
        this.cwform.arr[0].value = res.body.data.companyList[0].FCOMBINERANGE;
        this.cwform.arr[1].value = res.body.data.companyList[0].FCOMPANYTYPEB;
        this.cwform.arr[2].value = res.body.data.companyList[0].FCOMPANYBBF; 
        console.log(res.body.data.findForJdbc2)
        console.log(this.rtableData)
        console.log(this.rstab)
        this.rtableData = [];
        console.log(this.rtableData)
        // this.
      if(res.body.data.findForJdbc.length==0){
          this.rtableData.push({options:this.rstab,value:'',pleaceholder:"请选择",xz:'',czbl:'',price:'',time:'',id:''})
      }else{
        //  this.rtableData = [];
        for(let i=0;i<res.body.data.findForJdbc.length;i++){
          this.rtableData.push({options:this.rstab,value:res.body.data.findForJdbc[i].
          FPARTNER,pleaceholder:"请选择",xz:res.body.data.findForJdbc[i].
          FPARTNERNATURENAME,czbl:res.body.data.findForJdbc[i].FCAPITALKEY,price:res.body.data.findForJdbc[i].
          FSUBCRIBEMONEY,time:res.body.data.findForJdbc[i].FSUBCRIBETIME,id:res.body.data.findForJdbc[i].FID})
        }
      }
       this.stableData = [];
        console.log(this.stableData)
        // this.
      if(res.body.data.findForJdbc7.length==0){
          this.stableData.push({options:this.rstab,value:'',pleaceholder:"请选择",xz:'',czbl:'',price:'',time:'',id:''})
      }else{
        //  this.rtableData = [];
        for(let i=0;i<res.body.data.findForJdbc7.length;i++){
          this.stableData.push({options:this.rstab,value:res.body.data.findForJdbc7[i].
          FPARTNER,pleaceholder:"请选择",xz:res.body.data.findForJdbc7[i].
          FPARTNERNATURENAME,czbl:res.body.data.findForJdbc7[i].FCAPITALKEY,price:res.body.data.findForJdbc7[i].
          FPAIDINMONEY,time:res.body.data.findForJdbc7[i].FPAIDINTIME,id:res.body.data.findForJdbc7[i].FID})
        }
      }
      // console.log(this.wtableData)
      // return false
     let arr1= this.dtableData[0].options;
     this.dtableData = [];
     if(res.body.data.findForJdbc2.length==0){
      //  this.dtableData = [];
      //     let arr1= this.dtableData[0].options;
          this.dtableData.push({options:arr1,value:'',pleaceholder:"请输入职务",qygs:'',qyjt:'',value1:'',zlzw:'',name:'',id:''})
      }else{
        this.dtableData = [];
        for(let i=0;i<res.body.data.findForJdbc2.length;i++){
          this.dtableData.push({options:arr1,value:res.body.data.findForJdbc2[i].
          FPOSITION,pleaceholder:"请输入职务",pleaceholder1:"请选择",zlzw:res.body.data.findForJdbc2[i].
          FZLPOSITIONNAME,name:res.body.data.findForJdbc2[i].FPERSONNAME,qyjt:res.body.data.findForJdbc2[i].
          FAREABLOCNAME,qygs:res.body.data.findForJdbc2[i].FAREACOMPANYNAME,id:res.body.data.findForJdbc2[i].FID})
        }
      }
      let arr2 =  this.wtableData[0].options;
      let arr3 =  this.wtableData[0].options2;
      this.wtableData = [];
      if(res.body.data.findForJdbc3.length==0){
          this.wtableData.push({options:arr2,options2:arr3,pleaceholder1:"请选择",pleaceholder2:"请选择",value:'',value1:'',value2:'',name:'',id:''})
      }else{
        this.wtableData = [];
        for(let i=0;i<res.body.data.findForJdbc3.length;i++){

          this.wtableData.push({options:arr2,options2:arr3,value:res.body.data.findForJdbc3[i].
          FPOSITION,pleaceholder1:"请选择",pleaceholder2:"请选择",value1:res.body.data.findForJdbc3[i].
          FDELEGATE,name:res.body.data.findForJdbc3[i].FPERSONNAME,id:res.body.data.findForJdbc3[i].FID})
        }
      }
      //  gtableData: [
      //   {
      //     name: "阳阳",
      //     gdxz: "S",
      //     gb: "50.0%"
      //   },
      //   {
      //     name: "王颖",
      //     gdxz: "F",
      //     gb: "50.0%"
      //   }
      // ],
      this.gtableData = [];
      if(res.body.data.findForJdbc5.length!=0){
        for(let i = 0;i<res.body.data.findForJdbc5.length;i++){
          this.gtableData.push({
           name:res.body.data.findForJdbc5[i].FNAME,
           gdxz:res.body.data.findForJdbc5[i].FCOMPANYNATURE,
           gb:res.body.data.findForJdbc5[i].FSHARE,
         });
        }
         
      }
       this.cwgbtableData = [];
      if(res.body.data.findForJdbc6.length!=0){
        for(let i = 0;i<res.body.data.findForJdbc5.length;i++){
          this.cwgbtableData.push({
           name:res.body.data.findForJdbc6[i].FNAME,
           gdxz:res.body.data.findForJdbc6[i].FCOMPANYNATURE,
           gb:res.body.data.findForJdbc6[i].FSHARE,
         });
        }
         
      }
     
      });
    },
    
    remove1(index,rows){
      this.a = '1';
      this.removes(index,rows,this.a)
    },
    remove2(index,rows){
      this.a = '2';
      this.removes(index,rows,this.a)
    },
    remove3(index,rows){
      this.a = '3';
      this.removes(index,rows,this.a)
    },
    remove4(index,rows){
      this.a = '4';
      this.removes(index,rows,this.a)
    },
    remove5(index,rows){
      this.a = '5';
      this.removes(index,rows,this.a)
    },
    //删除按钮 交互刷新列表
    removes(index, rows,a) {
      console.log(a)
      //  console.log(rows[index])
      // console.log(rows.length)
      // return false;
      this.$confirm("是否确定删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          //这里删除一条数据
          // rows.pop(rows[index])
          // alert(1)
          if(rows.length>1){
            
             console.log(a);
          // return false;
          let param = {
            companyid: rows[index].id,
            state:a
          };
          console.log(param.companyid)
          // return false;
          remov(param).then(res => {
            console.log(res);
            rows.splice(index,1);
            // querys().then(res => {
            //   console.log(res.data.data);
            //   rows[index].pop();
            //   // let arr = res.data.data.companysetupList;
            //   // this.total = res.data.data.size;
            //   // this.tableData = [];
            //   // for (let i = 0; i < arr.length; i++) {
            //   //   this.tableData.push({
            //   //     state: arr[i].FBILLSTATUS,
            //   //     name: arr[i].FAREAGROUP,
            //   //     type: arr[i].FAREACOMPANY,
            //   //     stat: arr[i].FCOMPANY,
            //   //     prick: arr[i].FBUSINESSLICENCETIME,
            //   //     creatname: arr[i].FSETUPREGCOMPETETIME,
            //   //     bosname: arr[i].PERSONNAME,
            //   //     state1: arr[i].STATE,
            //   //     id: arr[i].FID
            //   //   });
            //   // }
            // });
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          }else{
            this.$message({
            type: "error",
            message: "请填写数据!"
          });
          }
         
          //更新列表
          //失败执行
          // this.$message({
          //   type: 'error',
          //   message: '删除失败!'
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //为表格设置样式
    isCenter({ row, column, rowIndex, columnIndex }) {
      return "text-align:center";
    },
    //为表头设置样式
    istabtop({ row, column, rowIndex, columnIndex }) {
      return "text-align:center;background-color:#409eff;color:#fff;";
    },
    //删除按钮 交互刷新列表
    // remove(index, rows) {
    //   this.$confirm("是否确定删除", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       console.log(index);
    //       if (rows.length > 1) {
    //         rows.pop(rows[index]);
    //         console.log(rows.length);
    //       } else {
            
    //         this.$message({
    //           type: "error",
    //           message: "请填写内容!"
    //         });
    //       }

    //       //这里与后台交互成功执行if else判断
    //       this.$message({
    //         type: "success",
    //         message: "删除成功!"
    //       });
    //       //更新列表
    //       //失败执行
    //       // this.$message({
    //       //   type: 'error',
    //       //   message: '删除失败!'
    //       // });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // },
    // testGet() {
    //   let param = { lcpcode: "参数testajax4get" };
    //   testGet(param).then((res) => {
    //     this.ajaxRes = res.body;
    //   });
    // },
    // testPost() {
    //   let param = { lcpcode: "testPost" };
    //   testPost(param).then((res) => {
    //     this.ajaxRes = res.body;
    //   });
    // },
    // testPut() {
    //   let param = { lcpcode: "testPut" };
    //   testPut(param).then((res) => {
    //     this.ajaxRes = res.body;
    //   });
    // },
    // testDelete() {
    //   let param = { lcpcode: "testDelete" };
    //   testDelete(param).then((res) => {
    //     this.ajaxRes = res.body;
    //   });
    // },
    // testMultiAjax() {
    //   testMultiAjax("1").then((res) => {
    //     this.ajaxRes = res.body;
    //   }).catch((e) => {
    //     console.error(e);
    //   });
    // }
    //分页的设置
    //  handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.tablelist();
      // console.log(this.currentPage)
      //这里交互获取数据
    },
    //驳回按钮
    back() {
      this.$confirm("是否确定驳回", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //这里与后台交互成功执行
          this.$message({
            type: "success",
            message: "驳回成功!"
          });
          //更新列表
          //失败执行
          // this.$message({
          //   type: 'error',
          //   message: '驳回失败!'
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消驳回"
          });
        });
    },
    //保存
    save() {
      // console.log(this.prick);
      console.log(this.form1.arr[8].value)
      // return false
      // console.log(this.form)
      // console.log(this.form1)
      // console.log(this.ywform)
      // console.log(this.cwform)
      // console.log(this.rjmxform)
      // console.log(this.rtableData)
      // // console.log(this.rjmxform)
      // console.log(this.stableData)
      // console.log(this.dtableData)
      console.log(this.rtableData);
      console.log(this.ywform)
      // return false;
      let jsons = {
        companyname: this.form1.arr[0].value,
        money: this.form1.arr[1].value,
        moneytype: this.form1.arr[2].value,
        jycompany: this.form1.arr[3].value,
        wz: this.form1.arr[4].value,
        wztype: this.form1.arr[5].value,
        frperson: this.form1.arr[6].value,
        affairperson: this.form1.arr[7].value,
        partnership: this.form1.arr[8].value,
        tztype: this.form1.arr[9].value,
        group: this.form1.arr[10].value,
        company: this.form1.arr[11].value,
        department: this.form1.arr[12].value,
        companytype: this.form1.arr[13].value,
        companytype1: this.form1.arr[14].value,
        companytype2: this.form1.arr[15].value,
        qualification: this.form1.arr[16].value,
        jyfw: this.form1.arr[17].value,
        companyaddress: this.form1.arr[18].value,
        content: this.form1.arr[19].value,
        //业务表单
        unifyreditcode:this.ywform.arr[0].value,
        setuptime:this.ywform.arr[1].value,
        sealperson:this.ywform.arr[2].value,
        zzperson:this.ywform.arr[3].value,
        businesslicencetime:this.ywform.arr[4].value,
        //财务信息的form
        combinerange:this.cwform.arr[0].value,
        companytypeb:this.cwform.arr[1].value,
        companybbf:this.cwform.arr[2].value,
      };
      
      console.log(this.idd)
      // return false
      let param = {
        // name:this.form.name,
        // time:this.form.time,
        company: JSON.stringify(jsons),
        statebtu: "2",
        fid: this.idd,
        // formlist:this.formlists,  //填写人的表单
        // ywformlist:this.ywforms,   //业务人的表单
        // cwform:this.cwforms,       //财务填写的表单
        cwtable: this.cwtables, //认缴明细的表格
        sjmxtable:this.sjmxtables,   //实缴明细的表格
        dtable: this.dtables, //外部董监高的表格信息
        wtable: this.wtables //内部董监高的表格信息
      };
      // console.log(this.dtables);
      console.log(param.fid);
      // return false;
      // console.log(param);
      saves(param).then(res => {
        console.log(res);
        // if(re   )
        if(res.body.status==='1'){
          this.$message({
        type: "success",
        message: "保存成功"
        });
          // this.dtableData = [];
          // let arr1= this.dtableData[0].options;
          // this.dtableData.push({options:arr1,value:'',pleaceholder:"请输入职务",qygs:'',qyjt:'',value1:'',zlzw:'',name:''})
        // this.dtableData = [];
        // this.wtableData = [];
        this.tablelist();
        this.dialogFormVisible = false;

        }
      });
      
    },
    min (val,index) {
			if(val < 0){
				this.rtableData[index].price = 0
				this.$message.error('此处不能为负数')
			}
		}
  },
  filters: {},
  computed: {
    search () {
			let num = 0;
			for(let i = 0; i<this.rtableData.length;i++){
				num += parseInt(this.rtableData[i].price || 0)
			}
			return parseInt(num)
		},
    ch(){
      // this.rjmxform.arr[0].value = 
      // let count = 0;
      // for(let i=0;i<this.rtableData.length;i++){
      //   count+= this.rtableData[i].price;
      // }

      return rjmxform.arr[0].value;
    },
    //弹出层form表单
    formlists() {
      let arr = [];
      for (let i = 0; i < this.form1.arr.length; i++) {
        arr.push(this.form1.arr[i].value);
      }
      return arr.toString();
    },
    //弹出层ywform
    ywforms() {
      let arr = [];
      for (let i = 0; i < this.ywform.arr.length; i++) {
        arr.push(this.ywform.arr[i].value);
      }
      return JSON.stringify(arr);
    },
    //弹出层财务的表单
    cwforms() {
      let arr = [];
      for (let i = 0; i < this.cwform.arr.length; i++) {
        arr.push(this.cwform.arr[i].value);
      }
      return JSON.stringify(arr);
    },
    //认缴明细表格数据
    cwtables() {
      let arr = [];
      if(this.rtableData.length!=null){
        
        for (let i = 0; i < this.rtableData.length; i++) {
        arr.push({
          name: this.rtableData[i].value,
          xz: this.rtableData[i].xz,
          price: this.rtableData[i].price,
          czbl: this.rtableData[i].czbl,
          time: this.rtableData[i].time,
          id:this.rtableData[i].id
        });
      }
      return JSON.stringify(arr);
      }
      
    },
    //实缴明细表格数据
    sjmxtables() {
      let arr = [];
      if(this.stableData.length!=null){
        for (let i = 0; i < this.stableData.length; i++) {
        arr.push({
          name: this.stableData[i].value,
          xz: this.stableData[i].xz,
          price: this.stableData[i].price,
          czbl: this.stableData[i].czbl,
          time: this.stableData[i].time,
          id:this.stableData[i].id
        });
      }
      return JSON.stringify(arr);
      }
      
    },
    //内部董监高
    dtables() {
      let arr = [];
      for (let i = 0; i < this.dtableData.length; i++) {
        arr.push({
          zw: this.dtableData[i].value,
          name: this.dtableData[i].name,
          zlzw: this.dtableData[i].zlzw,
          jt: this.dtableData[i].qyjt,
          qygs: this.dtableData[i].qygs,
          id:this.dtableData[i].id
        });
      }
      return JSON.stringify(arr);
    },
    //外部董监高
    wtables() {
      let arr = [];
      for (let i = 0; i < this.wtableData.length; i++) {
        arr.push({
          zw: this.wtableData[i].value,
          name: this.wtableData[i].name,
          wpf: this.wtableData[i].value1,
          id:this.wtableData[i].id
        });
      }
      return JSON.stringify(arr);
    },
    jtvalue() {
      return this.forms.arr[0].value;
    },
    valu() {
      return this.form1.arr[1].value;
    },
    prick() {
      if (this.form1.arr[8].value.length === 2) {
        let a = this.form1.arr[8].value;
        return a[0] + "至" + a[1];
      } else {
        return "";
      }
    },
    //是否境外公司的值
    jwgs() {
      return this.form1.arr[3].value;
    },
    //是否外资企业
    wzqy() {
      return this.form1.arr[4].value;
    },
    //外资企业类型
    complaytype(){
      return this.form1.arr[5].value;
    },
    //区域集团
    qyjt() {
      return this.form1.arr[10].value;
    },
    //区域公司
    qygs() {
      return this.form1.arr[11].value;
    },
    //公司类型
    gslxs() {
      return this.form1.arr[13].value;
    },
    //一级公司性质
    yjgsxz() {
      return this.form1.arr[14].value;
    }
  },
  props: [],
  watch: {
    'search' () {
			for(let i = 0; i<this.rtableData.length;i++){
					if(isNaN(this.rtableData[i].price / this.search * 100)){
						this.rtableData[i].czbl = ''
					}else{
						this.rtableData[i].czbl = (this.rtableData[i].price / this.search * 100).toFixed(2) + '%'
					}
        }
        this.form1.arr[1].value = this.search;
			},
    jtvalue: {
      handler(newName, oldName) {
        this.showw(newName);
      },
      deep: true
    },
    valu: {
      handler(newName, oldName) {
        this.rjmxform.arr[0].value = newName;
      }
    },
    jwgs: {
      immediate: true,
      handler(newName, oldName) {
        // this.rjmxform.arr[0].value=newName;
        if (newName == "0") {
          this.form1.arr[4].disabled = false;
          console.log(this.form1.arr[4].disabled);
          this.form1.arr[6].disabled = true;
        } else {
          this.form1.arr[4].disabled = true;
          console.log(this.form1.arr[4].disabled);
          this.form1.arr[4].value = "";
          this.form1.arr[6].disabled = false;
        }
        if(newName==''){
          this.form1.arr[6].disabled = true;
          this.form1.arr[6].value = '';
        }
      }
    },
    // 我看看你是否外资企业绑定的值在哪里你给我看
    // 我看下代码
    wzqy:{
       immediate: true,
      handler(newName, oldName) {
        // this.rjmxform.arr[0].value=newName;
        if (newName != "") {
          this.form1.arr[5].disabled = false;
          // console.log( this.form1.arr[4].disabled)
          let param = {
            superiorcode: this.form1.arr[4].value,
            superiortype: "OUTINSIDE"
          };
          changework(param).then(res => {
            console.log(res.data.data);
            if (newName == "1") {
              // this.form1.arr[5].value = "";
              this.form1.arr[5].label = "外资企业类型";

              this.form1.arr[5].optionsgd = [];
              foradd(res.data.data.typeList, this.form1.arr[5].optionsgd);
              //  if(this.form1.arr[5].value=='1'||this.form1.arr[5].value=='2'){
              //    this.form1.arr[6].disabled = true;
              //  }
              // this.form1.arr[6].disabled = false;
              // this.form1.arr[7].disabled = false;
            } else {
              // this.form1.arr[5].value = "";
              this.form1.arr[5].label = "内资企业类型";
              this.form1.arr[5].optionsgd = [];
              foradd(res.data.data.typeList, this.form1.arr[5].optionsgd);
              // this.form1.arr[6].disabled = true;
              // this.form1.arr[7].disabled = true;
            }
          });
        } else {
          this.form1.arr[5].disabled = true;
          // console.log( this.form1.arr[4].disabled)
          this.form1.arr[5].value = "";
          // this.form1.arr[6].value = "";
          // this.form1.arr[7].value = "";
          
        }
      }
    },
    complaytype:{
      handler(newName,oldName){
        if(this.form1.arr[4].value == '1'){
            if(newName=='1' || newName=='2'){
              this.form1.arr[6].disabled = false;
              this.form1.arr[7].disabled = true;
              this.form1.arr[7].value = '';
            }else{
              this.form1.arr[6].disabled = true;
              this.form1.arr[7].disabled = false;
              this.form1.arr[6].value = '';
            }
        }else{
          if(newName=='1' || newName=='2' || newName=='3' || newName=='4'){
              this.form1.arr[6].disabled = false;
              this.form1.arr[7].disabled = true;
              this.form1.arr[7].value = '';
            }else{
              this.form1.arr[7].disabled = false;
              this.form1.arr[6].disabled = true;
              this.form1.arr[6].value = '';
            }
        }
        if(newName==''){
          this.form1.arr[7].disabled = true;
          this.form1.arr[6].disabled = true;
          this.form1.arr[7].value = '';
          this.form1.arr[6].value = '';
        }
      }
    },
    qyjt: {
       immediate: true,
      handler(newName, oldName) {
        let param = {
          areagroupid: newName
        };
        if(newName==''){
          this.form1.arr[11].value = "";
          this.form1.arr[12].value = "";
        }
        change(param).then(res => {
          if (res.data.code === "999") {
            console.log(res.data.data);
            if(res.data.data){
              if(res.data.data.length!=null){
              let length = res.data.data.length;
            this.form1.arr[11].optionsgd = [];
            // this.form1.arr[11].value = "";
            this.form1.arr[12].optionsgd = [];
            // this.form1.arr[12].value = "";
            // this.forms.arr[1].value='';
            for (let i = 0; i < length; i++) {
              this.form1.arr[11].optionsgd.push({
                value: res.data.data[i].ID,
                label: res.data.data[i].NAME
              });
            }
            }
            }
            
            
          }
        });
      }
    },
    qygs: {
      //  immediate: true,
      handler(newName, oldName) {
        if(newName==''){
           this.form1.arr[12].value = "";
        }
        let param = {
          areacompanyid: newName
        };
        changegs(param).then(res => {
          if (res.data.code === "999") {
            console.log(res.data.data);
            if(res.data.data!=null){
              let length = res.data.data.length;
            this.form1.arr[12].optionsgd = [];
           
            // this.forms.arr[1].value='';
            for (let i = 0; i < length; i++) {
              this.form1.arr[12].optionsgd.push({
                value: res.data.data[i].ID,
                label: res.data.data[i].NAME
              });
            }
            }
            
          }
        });
      }
    },
    gslxs: {
       deep:true,
       immediate: true,
      handler(newName, oldName) {
        console.log(newName+'这是改变了的');
        let param = {
          superiorcode: newName,
          superiortype: "COMPANY_TYPE"
        };
        if(newName==''){
          this.form1.arr[15].value = "";
          this.form1.arr[14].value = "";
        }
        changework(param).then(res => {
          if (res.data.code === "999") {
            if(res.data.data.typeList!=null){
              console.log(res.data.data);
            let length = res.data.data.typeList.length;
            this.form1.arr[14].optionsgd = [];
            // this.form1.arr[14].value = "";
            this.form1.arr[15].optionsgd = [];
            // this.form1.arr[15].value = "";
            // this.forms.arr[1].value='';
            for (let i = 0; i < length; i++) {
              this.form1.arr[14].optionsgd.push({
                value: res.data.data.typeList[i].FNUMBER,
                label: res.data.data.typeList[i].FNAME
              });
            }
            }
            
          }
        });
      }
    },
    yjgsxz: {
      deep:true,
       immediate: true,
      handler(newName, oldName) {
        console.log(newName);
        if(newName==''){
          this.form1.arr[15].value = "";
        }
        let param = {
          superiorcode: newName,
          superiortype: "COMPANY_TYPE1",
          type: this.form1.arr[13].value
        };
        changework(param).then(res => {
          if (res.data.code === "999") {
            this.form1.arr[15].optionsgd = [];
            console.log(res.data.data.typeList);
            if (res.data.data.typeList == null) {
              this.form1.arr[15].optionsgd = [];
              // return false
            } else {
              let length = res.data.data.typeList.length;
              // this.form1.arr[15].optionsgd=[];
              // this.form1.arr[15].value='';
              this.form1.arr[15].optionsgd = [];
              
              // this.forms.arr[1].value='';
              for (let i = 0; i < length; i++) {
                this.form1.arr[15].optionsgd.push({
                  value: res.data.data.typeList[i].FNUMBER,
                  label: res.data.data.typeList[i].FNAME
                });
              }
            }
          }
        });
      }
    }
  },
  created() {},
  mounted() {
    this.flingingdx();
    this.tablelist();
    this.addlication();
    console.log(this.$store.state);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.testajax {
  height: 100%;
  width: 100%;
  padding: 0px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.contain {
  background-color: #eff3f6;
  padding: 20px;
  .form {
    background-color: #fff;
    padding: 35px 20px 20px 0;
  }
}
.containtwo {
  background-color: #eff3f6;
  padding: 0;
  margin-top: 20px;
}
.doloadcl1 {
  padding: 0;
}
.information {
  font-size: 18px;
  font-family: MicrosoftYaHei;
  font-weight: bold;
  color: rgba(64, 158, 255, 1);
  background-color: #f5f7fa;
  height: 48px;
  line-height: 48px;
  padding-left: 20px;
}
.main {
  padding-left: 0px;
  padding-right: 10px;
  height: 700px;
  padding-top: 0;
  .row {
    background: #fff;
    padding: 30px 0px 20px 0px;
    margin-bottom: 0;
  }
  .temp{
    height: 48px;
    background-color: #f5f7fa;
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 48px;
    padding-left: 20px;
  }
  .bainformation {
    height: 48px;
    background: rgba(228, 231, 237, 1);
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 48px;
    padding-left: 20px;
  }
  .row1 {
    padding-top: 20px;
    padding-bottom: 40px;
    background-color: #fff;
  }
  .ywinformation {
    padding: 20px 20px 40px 0px;
    .zdcle {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(245, 108, 108, 1);
      line-height: 37px;
      padding-left: 5px;
    }
  }
  .rjmx {
    padding-bottom: 30px;
  }
  .table {
    padding: 20px;
  }
  
}
.ttt[data-v-55bc8ae0] {
    height:  50px;
    text-align:  center;
    font-size:  26px;
    line-height:  50px;
    margin-top:  -1px;
    border:  1px solid  #ebeef5;
    cursor:  pointer;
    color:   #ccc;
}
.dialog-footer{
      background: #e9eef3;
    padding: 20px 10px 10px;
    text-align: center;
}
</style>
