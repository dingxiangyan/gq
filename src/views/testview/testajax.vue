<!--必要的组件说明-->
<!-- 这里是公司设立备案表页面-->
<!-- author:duanhaowei. date:2018/10/24 9:10-->

<template>
  <el-container class="testajax">
    <el-main class="contain">
      <el-form :model="forms" class="form">
              <el-row >
                <el-col :span="item.span" v-for="(item,index) in forms.arr">
                  <el-form-item :label="item.label" :label-width="formLabelWidth">
                    <el-select v-model="item.value"  v-if="item.type=='select'" :placeholder="item.placeholder" clearable
                    style="width:100%;">
                      <el-option
                        v-for="items in item.optionsgd"
                        :key="items.value"
                        :label="items.label"
                        :value="items.value">
                      </el-option>
                    </el-select>
                    <el-input v-model="item.value" v-if="item.type=='input'" autocomplete="off" :placeholder="item.pleaceholder"
                    style="width:100%;"></el-input>
                    </el-form-item> 
                </el-col >
                <el-col :span="6">
                  <el-form-item label="查询开始日期" :label-width="formLabelWidth">
                    <el-date-picker
                      v-model="formInline.prick"
                      type="date"
                      placeholder="选择日期"
                      style="width:100%;"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="查询结束日期" :label-width="formLabelWidth">
                    <el-date-picker
                      v-model="formInline.prick1"
                      type="date"
                      placeholder="选择日期"
                      style="width:100%;"
                      
                     
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item>
                  
                  
                   </div>
                  </el-form-item>
                </el-col>
                 <el-col :span="6">
                  <el-form-item>
                   <div style="width100%;" class="clearfix">
                     <el-button type="primary" @click="onSubmit" class="fr">查询</el-button>
                    <el-button type="primary"  class="fr" style="margin-right:20px;" v-show="forms.flag"
                    @click="upload">新增设立申请</el-button>
                    
                   </div>
                  </el-form-item>
                </el-col>
              </el-row>
        </el-form>
    <el-main class="containtwo">
      <el-table
          :data="tableData"
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
          <!-- <el-table-column
            prop="date"
            label="序号">
          </el-table-column> -->
          <el-table-column
            prop="state"
            label="单据状态"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="所属区域集团">
          </el-table-column>
          <el-table-column
            prop="type"
            label="所属区域公司">
          </el-table-column>
          <el-table-column
            prop="stat"
            label="公司名称"
            >
          </el-table-column>
          <el-table-column
            prop="prick"
            label="工商设立备案完成时间"
            width=170>
          </el-table-column>
          <el-table-column
            prop="creatname"
            label="业务登记完成时间"
            width=150>
          </el-table-column>
          <el-table-column
            prop="bosname"
            label="发起人"
          >
          </el-table-column>
          <el-table-column label="操作" width=200>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="upload(scope.$index, tableData)"
              >{{scope.row.button}}</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="removes(scope.$index,tableData)"
              v-show="scope.row.del=='1'">删除</el-button>
              <el-button
              size="mini"
              @click="goOut(scope.row.flowurl)"
              v-if="!!scope.row.flowurl">查看流程</el-button>
          </template>
        </el-table-column>
    </el-table>
    <!-- 设置分页 -->
    <div align="left" style="padding-left:20px;margin-top:20px;">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        layout="prev, pager, next, jumper"
        :total="pages"
        :page-size=30>
      </el-pagination>
    </div>
    </el-main>
        
    <!-- 这里是点击编辑弹出部分 -->
    <el-dialog title="公司设立备案表" :visible.sync="dialogFormVisible" width="95%" top="8vh" :close-on-click-modal=false
      custom-class="doloadcl"
      @closed="closed('ruleForm')"
      @open ="opened()"
      
      
      >
        <el-container  v-loading="loading" >
          <el-main  class="main" ref="dialog">
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
            <el-form :model="form1"  ref="ruleForm" class="demo-ruleForm">
              <div class="bainformation">备案申请信息</div>
              <el-row class="row1">
                <el-col :span="item.span" v-for="(item,index) in form1.arr" >
                  <el-form-item :label="item.label" :label-width="formLabelWidth" :rules="item.rules" :prop="'arr.' + index + '.value'"
                  :ref="item.prop">
                    <el-select v-model="item.value"  v-if="item.type=='select'" :placeholder="item.placeholder"
                    :disabled="item.disabled" style="width:100%;" clearable :show-message="item.showMessage">
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
                    <el-input v-model="item.value" v-if="item.type=='textarea'" type="textarea" clearable
                    style="width:100%;" :disabled="item.disabled" :placeholder="item.pleaceholder" autosize>

                    </el-input>
                    </el-form-item> 
                </el-col >
                 <!-- <el-col :span="8" class="zdcle1">
                     (人员之间请以英文格式的分号做隔离)
                    </el-col> -->
              </el-row>
            </el-form>
            
            <!-- 备案登记信息 -->
            <div>
              <!-- <div class="information">备案登记信息</div> -->
              <!-- 这里是业务信息，要根据权限判断显示隐藏 -->
              <!-- v-show="flag!='node'" -->
              <div v-show="this.roule=='node2' || this.roule=='node3'">  
                <div class="bainformation">业务信息</div>
                <el-form :model="ywform" class="ywinformation" :disabled="ywform.flag"  ref="business">
                  <el-row>
                    <el-col :span="item.span" v-for="(item,index) in ywform.arr">
                      <el-form-item :label="item.label" :label-width="item.labelwidth" :rules="item.rules" :prop="'arr.' + index + '.value'">
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
                     工商备案完成时间
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <!-- 这里是财务信息 只有权限判断为财务才可以看到 -->
              <el-form :model="cwform" v-show="roule=='node3'" :disabled="flag5" ref="Finance">
                <div class="bainformation">财务信息</div>
                <el-row class="row">
                  <el-col :span=6 v-for="(item,index) in cwform.arr" v-if="item.show">
                    <el-form-item :label="item.label" :label-width="formLabelWidth" :rules="item.rules" :prop="'arr.' + index + '.value'">
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
                  <div class="bainformation">认缴明细(股权明细)
                    <span class="error">(注：认缴明细为必填项)</span>
                  </div>
                    <el-form :model="rjmxform" :disabled="flagg">
                      <el-row class="row">
                        <el-col :span=6 v-for="(item,index) in rjmxform.arr" >
                          <el-form-item :label="item.label" :label-width="formLabelWidth">
                            <el-input v-model="search"  autocomplete="off" :disabled="true"
                      ></el-input> 
                          </el-form-item> 
                        </el-col >
                      </el-row>
                    </el-form>
                    <!-- 认缴明细表格 -->
                    <div class="table">
                        <el-form :model="rtableform" ref="rtableform" :rules="rtableRules">
                          <el-table
                        :data="rtableform.rtableData"
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
                            width="250">
                            <template slot-scope="scope">
                                <el-form-item :prop="`rtableData.${scope.$index}.value`" :rules="rtableRules.name">
                                  <el-select v-model="scope.row.value" :placeholder="scope.row.pleaceholder" :disabled="flagg"
                                    filterable
                                    remote
                                    clearable 
                                    @remote-method="remoteMethod"
                                      style="width:100%;"
                                      :rules = "scope.row.roule"
                                    @change=" partners(scope.row,scope.$index)">
                                      <el-option
                                        v-for="items in scope.row.options"
                                        :key="items.value"
                                        :label="items.label"
                                        :value="items.value">
                                      </el-option>
                                  </el-select>
                                </el-form-item>
                                
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="xz"
                            label="股东公司性质"
                            width="250">
                          </el-table-column>
                          <el-table-column
                            prop="price"
                            label="认缴金额(万元)"
                            width="150"
                            >
                            <template slot-scope="scope">
                              <el-form-item :prop="`rtableData.${scope.$index}.price`" :rules="rtableRules.price">
                                <el-input
                                  placeholder="请输入金额"
                                  v-model.number="scope.row.price"
                                  min="0"
                                  type="number"
                                  
                              
                                  @blur="min(scope.row.price,scope.$index)"
                                  :disabled="flagg">
                              </el-input>
                              </el-form-item> 
                              
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="time"
                            label="认缴时间"
                            width="200"
                            >
                            <template slot-scope="scope">
                              <el-form-item :prop="`rtableData.${scope.$index}.time`" :rules="rtableRules.time">
                                 <el-date-picker
                                v-model="scope.row.time"
                                type="date"
                                placeholder="选择日期"
                                style="width:100%;"
                                value-format="yyyy-MM-dd"
                                :disabled="flagg">
                              </el-date-picker>
                              </el-form-item>
                             
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="czbl"
                            label="出资比例(%)"
                            
                            >
                            <template slot-scope="scope">
                              <el-form-item>
                                 <el-input
                                  placeholder=""
                                  v-model="scope.row.czbl"
                                   :disabled="true">
                                </el-input>
                              </el-form-item>
                             
                            </template>
                          </el-table-column>
                          <el-table-column label="操作" >
                            <template slot-scope="scope">
                              <el-form-item>
                                <el-button
                                size="mini"
                                type="danger"
                                @click="remove1(scope.$index,rtableform.rtableData)"
                                :disabled="flagg">删除行</el-button>
                              </el-form-item>
                              
                            </template>
                          </el-table-column>
                      </el-table>
                        </el-form>
                      
                      
                      
                      <div class="ttt" @click="addrjtable" v-show="this.flagg==false">+</div>
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
                                <el-select v-model="scope.row.value" :placeholder="scope.row.pleaceholder"
                                filterable
                                remote
                                @remote-method="remoteMethod"
                                :disabled="flag4" @change=" partners(scope.row,scope.$index)">
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
                            label="实缴金额(万元)"
                            width="150"
                            >
                            <template slot-scope="scope">
                              <el-input
                                  placeholder="请输入金额"
                                  v-model.number="scope.row.price"
                                  type="number"
                                  min="0"
                                  :disabled="flag4"
                                  @blur="min(scope.row.price,scope.$index)">
                                </el-input>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="time"
                            label="实缴时间"
                            width="200"
                            >
                            <template slot-scope="scope">
                              <el-date-picker
                                v-model="scope.row.time"
                                type="date"
                                placeholder="选择日期"
                                style="width:100%;"
                                value-format="yyyy-MM-dd"
                                :disabled="flag4">
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
                                    
                                  :disabled="true">
                                </el-input>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="capital"
                            label="是否验资"
                            width="100">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.capital" :placeholder="scope.row.pleaceholder"
                                :disabled="flag4">
                                  <el-option
                                    v-for="items in scope.row.optionsc"
                                    :key="items.value"
                                    :label="items.label"
                                    :value="items.value">
                                  </el-option>
                                </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column label="操作" width=200>
                            <template slot-scope="scope">
                              <el-button
                                size="mini"
                                type="danger"
                                @click="remove1(scope.$index,stableData)"
                                :disabled="flag4">删除行</el-button>
                            </template>
                          </el-table-column>
                      </el-table>
                      <div class="ttt" @click="addsjtable" v-show="this.flag4==false">+</div>
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
                        width="130">
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
                        width="220">
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
                            @click="remove1(scope.$index,dtableData)"
                            :disabled="flagg">删除行</el-button>
                        </template>
                      </el-table-column>
                  </el-table>
                  <div class="ttt" @click="adddjgtable" v-show="this.flagg==false">+</div>
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
                            filterable
                                 remote
                                 @remote-method="remoteMethod"
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
                            @click="remove1(scope.$index,wtableData)"
                            :disabled="flagg">删除行</el-button>
                        </template>
                      </el-table-column>
                  </el-table>
                  <div class="ttt" @click="addwbtable" v-show="this.flagg==false">+</div> 
                  <!-- <el-button type="success" @click="addwbtable">添加一行</el-button> -->
                  
                </div>
              </div>
            </div>
            
           
            <!-- 附件管理 -->
             <div class="col">
            <h3 class="col-tit">附件管理</h3>
            <div class="col-main">
              <el-upload
                ref="upload"
                :action="url"
                :auto-upload="false"
                :on-change="OnChange"
                :on-remove="OnRemove"
                :on-preview="handlePreview"
                accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                :before-remove="beforeRemove">
                <el-button slot="trigger" size="small" type="primary" v-show="this.btn==true">选取文件</el-button>
              </el-upload>
              <!-- <el-upload
                class="upload-demo"
                :action="url"
                :on-preview="handlePreview"
                :before-upload="beforeUpload"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-change="OnChange"
                :on-error="onss"
                multiple
                ref="upload"
                :auto-upload="false"
                accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                :on-exceed="handleExceed">
               <el-button slot="trigger" size="small" type="primary">选取文件</el-button> -->
                <!-- <el-button type="primary" @click="submitUpload()">确定</el-button> -->
                <!-- <span slot="tip" class="el-upload__tip">文件不要超过500kb</span> -->
              <!-- </el-upload> -->
            </div>
          </div>
          <el-table
            :data="fileData"
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
              <!-- <a :href="row.FURL" :download="row.FFILENAME"> -->
              <template slot-scope="scope">
                <el-button @click="download(scope.row)" type="text" size="small">下载</el-button>
                <el-button @click="dels(scope.row)" type="text" size="small" v-show="scope.row.FNAME==$store.state.user.name && uploadremove =='1'">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          </el-main>
        </el-container>
        <!-- 表格底部footer -->
        <div slot="footer" class="dialog-footer" v-show="btn">
          <el-button type="danger" @click="back()" v-show="roule=='node3'">驳回</el-button>
          <el-button  type="primary" @click="save()">保存</el-button>
          <el-button type="primary" @click="commits('ruleForm')">提交</el-button>
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
  foradd1,
  foradd2,
  foradd3,
  foradd4,
  querys,
  changework,
  changegs,
  saves,
  remov,
  parnet,
  back,
  Shareholder,
  upload,
  repeats
} from "@/api/testajax";
// import { testGet, testPost,testPut,testDelete,testMultiAjax } from "@/api/test";

export default {
  name: "testajax",
  components: {},
  data() {
    return {
      //附件管理数据
      downid: null,
      delid: null,
      initid: null,
      fileData: [],
      url: "/dst/fileController/upload",
      //附件管理数据
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
        rules: {
          //  公司名称
          Corporatename: [
            { required: true, message: "请输入公司名称", trigger: "blur" }
          ],
          //注册资本
          registeredcapital: [{ required: true, message: "请输入认缴资本" }],
          //币种
          currency: [
            { required: true, message: "请选择币种", trigger: "change" }
          ],
          //是否境外公司
          Offshorecompanies: [
            { required: true, message: "请选择是否境外公司", trigger: "change" }
          ],
          //是否外资企业
          // Foreignenterprise: [
          //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          // ],
          //外资企业类型
          // enterprises: [
          //   { required: true, message: '请选择活动资源', trigger: 'change' }
          // ],
          //法人代表
          // Corporaterepresentative: [
          //   { required: true, message: '请填写活动形式', trigger: 'blur' }
          // ],
          //执行事务合伙人
          // Businesspartner: [
          //   { required: true, message: '请填写活动形式', trigger: 'blur' }
          // ],
          //经营/合伙期限(年)
          Operatingperiod: [
            {
              type: "date",
              required: true,
              message: "请填写年限",
              trigger: "blur"
            }
          ],
          //投资方式
          Investmentmode: [
            { required: true, message: "请填写投资方式", trigger: "change" }
          ],
          //所属区域集团
          regionalgroup: [
            { required: true, message: "请填写所属区域集团", trigger: "change" }
          ],
          //所属区域公司
          Regionalcompany: [
            { required: true, message: "请填写所属区域公司", trigger: "change" }
          ],
          //所属事业部
          // Businessunit: [
          //   { required: true, message: '请填写所属事业部', trigger: 'change' }
          // ],
          //公司类型
          Companytype: [
            { required: true, message: "请填写公司类型", trigger: "change" }
          ],

          //一级公司性质
          firstcompany: [
            { required: true, message: "请填写一级公司性质", trigger: "change" }
          ],
          //二级公司性质
          // twocompany: [
          //   { required: true, message: '请填写二级公司性质', trigger: 'change' }
          // ],
          //资质情况
          Qualificationstatus: [
            { required: true, message: "请填写资质情况", trigger: "change" }
          ],
          //经营范围
          Businessscope: [
            { required: true, message: "请填写经营范围", trigger: "blur" }
          ],
          //公司住所
          domicile: [
            { required: true, message: "请填写公司住所", trigger: "blur" }
          ]
          //备注
          // Remarks: [
          //   { required: true, message: '请填写备注', trigger: 'blur' }
          // ],
        },
        arr: [
          {
            span: 6,
            label: "公司名称",
            value: "",
            type: "input",
            pleaceholder: "",
            disabled: false,
            prop: "Corporatename",
            rules: {
              required: true,
              message: "请输入公司名称",
              trigger: "blur"
            }
          },
          {
            span: 6,
            label: "注册资本(万元)",
            value: "",
            type: "input",
            pleaceholder: "",
            disabled: true,
            prop: "registeredcapital",
            rules: { required: true, message: "请输入认缴资本" }
          },
          {
            span: 6,
            label: "币种",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: false,
            prop: "currency",
            rules: { required: true, message: "请选择币种", trigger: "change" }
          },
          {
            span: 6,
            label: "是否境外公司",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: false,
            prop: "Offshorecompanies",
            rules: {
              required: true,
              message: "请选择是否境外公司",
              trigger: "change"
            }
          },
          {
            span: 6,
            label: "是否外资企业",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: true,
            prop: "Foreignenterprise"
          },
          {
            span: 6,
            label: "外资企业类型",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: true,
            prop: "enterprises"
          },
          {
            span: 6,
            label: "法人代表",
            value: "",
            type: "input",
            pleaceholder: "",
            disabled: true,
            prop: "Corporaterepresentative",
            rules: { required: false, message: " ", trigger: "blur" },
            showMessage: true
          },
          {
            span: 6,
            label: "执行事务合伙人",
            value: "",
            type: "input",
            pleaceholder: "",
            disabled: true,
            prop: "Businesspartner",
            rules: { required: true, message: " ", trigger: "blur" }
          },
          {
            span: 12,
            label: "经营/合伙期限",
            value: "",
            type: "prickk",
            disabled: false,
            prop: "Operatingperiod",
            rules: { required: true, message: "请填写年限", trigger: "blur" }
          },
          {
            span: 6,
            label: "投资方式",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: false,
            prop: "Investmentmode",
            rules: {
              required: true,
              message: "请填写投资方式",
              trigger: "change"
            }
          },
          {
            span: 6,
            label: "所属区域集团",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: false,
            prop: "regionalgroup",
            rules: {
              required: true,
              message: "请填写所属区域集团",
              trigger: "change"
            }
          },
          {
            span: 6,
            label: "所属区域公司",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: false,
            prop: "Regionalcompany"
            // rules: {
            //   required: true,
            //   message: "请填写所属区域公司",
            //   trigger: "change"
            // }
          },
          {
            span: 6,
            label: "所属事业部",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: false,
            prop: "Businessunit"
          },
          {
            span: 6,
            label: "公司类型",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: false,
            prop: "Companytype",
            rules: {
              required: true,
              message: "请填写公司类型",
              trigger: "change"
            }
          },
          {
            span: 6,
            label: "一级公司性质",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: false,
            prop: "firstcompany",
            rules: {
              required: true,
              message: "请填写一级公司性质",
              trigger: "change"
            }
          },
          {
            span: 6,
            label: "二级公司性质",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: false,
            prop: "twocompany",
            rules: {
              required: true,
              message: "请填写二级公司性质"
            }
          },
          // {
          //   span: 6,
          //   label: "资质情况",
          //   value: "",
          //   type: "select",
          //   placeholder: "请选择",
          //   optionsgd: [],
          //   value1: "",
          //   disabled: false,
          //   prop: "Qualificationstatus",
          //   rules: {
          //     required: true,
          //     message: "请填写资质情况",
          //     trigger: "change"
          //   }
          // },
          {
            span: 24,
            label: "经营范围",
            value: "",
            type: "textarea",
            pleaceholder: "",
            disabled: false,
            prop: "Businessscope",
            rules: [
              {
                required: true,
                message: "请填写经营范围",
                trigger: "blur"
              },
              { max: 500, message: "长度在500个字符以内" }
            ]
          },
          {
            span: 24,
            label: "公司住所",
            value: "",
            type: "input",
            pleaceholder: "",
            disabled: false,
            prop: "domicile"
          },
          {
            span: 24,
            label: "备注",
            value: "",
            type: "input",
            pleaceholder: "",
            disabled: false,
            prop: "Remarks"
          },
          // {
          //   span: 12,
          //   label: "印章管理员",
          //   value: "",
          //   type: "input",
          //   pleaceholder: "",
          //   disabled: false,
          //   // prop: "Corporatename",
          //   rules: {
          //     required: true,
          //     message: "请输入印章管理员",
          //     trigger: "blur"
          //   }
          // }
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
            icon: "",
            rules: {
              required: true,
              message: "请输入统一社会信用代码",
              trigger: "blur"
            }
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
            },
            rules: { required: true, message: "请输入成立日期" }
          },
          {
            labelwidth: "150px",
            span: 6,
            label: "印章保管人",
            value: "",
            type: "input",
            pleaceholder: "",
            icon: "",
            rules: {
              required: true,
              message: "请输入印章保管人",
              trigger: "blur"
            }
          },
          {
            labelwidth: "150px",
            span: 6,
            label: "证照保管人",
            value: "",
            type: "input",
            pleaceholder: "",
            icon: "",
            rules: {
              required: true,
              message: "请输入证照保管人",
              trigger: "blur"
            }
          },
          {
            labelwidth: "150px",
            span: 6,
            label: "资质情况",
            value: "",
            type: "select",
            placeholder: "请选择",
            optionsgd: [],
            value1: "",
            disabled: false,
            prop: "Qualificationstatus",
            rules: {
              required: true,
              message: "请填写资质情况",
              trigger: "change"
            }
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
            labelwidth: "130px",
            span: 6,
            label: "时间",
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
            },
            rules: { required: true, message: "请输入时间", trigger: "blur" }
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
            value1: "",
            show: true,
            rules: {
              required: true,
              message: "请选择合并范围",
              trigger: "blur"
            }
          },
          {
            span: 8,
            label: "公司类别",
            value: "",
            type: "select",
            optionsgd: [],
            value1: "",
            show: true,
            rules: {
              required: true,
              message: "请选择公司类别",
              trigger: "blur"
            }
          },
          {
            span: 8,
            label: "公司并表方 ",
            value: "",
            type: "select",
            placeholder: "是",
            optionsgd: [],
            value1: "",
            show: true,
            rules: {
              required: true,
              message: "请选择公司并表方",
              trigger: "blur"
            }
          }
        ]
      },
      fileList: [],
      //  认缴明细form
      rjmxform: {
        flag: false,
        arr: [
          {
            label: "注册资本(万元)",
            value: ""
          }
        ]
      },
      //表单label宽度
      formLabelWidth: "130px",
      //认缴明细表格第一个下拉的数据保存在本地

      //注册资本input
      rjmxv: "",
      // 认缴明细表格数据
      rtableform: {
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
        ]
      },
      //认缴明细的校验
      rtableRules: {
        //股东名称
        name: [{ required: true, message: "请输入股东名称" }],
        //银行所在市
        price: [
          { required: true, message: "请输入认缴金额" },
          { type: "number", message: "金额必须为数字值" }
        ],
        //认缴时间
        time: [{ required: true, message: "请输入认缴时间" }]
      },
      //实缴明细表格
      stableData: [
        {
          options: [],
          value: "",
          pleaceholder: "请选择",
          xz: "",
          price: "",
          time: "",
          czbl: "",
          capital: "",
          optionsc: []
        }
      ],
      //股东信息情况表
      gtableData: [],
      cwgbtableData: [],
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
      //这个是控制增加 编辑的
      //这里是单独处理的人家明细表格第一个下拉框
      rjlist: [],
      //这里是判断法人代表
      num: "",
      flag: "",
      roule: "",
      flagg: false, //申请人判断 填写内容为false
      flagg1: false, //业务判断 财务不可编辑
      rstab: [],
      idd: "",
      soules: "",
      a: "",
      //这里是认缴明细实缴明细的股东名称的options
      partner: [],
      //这里是内部董监高的职务
      inside: [],
      //这里是外部董监高的职务
      extarnal: [],
      //这里是外部董监高的委派方
      button: "",
      del: "",
      a: "",
      //主表的下拉数据
      fom2option: [],
      fom3option: [],
      fom4option: [],
      fom9option: [],
      fom10option: [],
      fom13option: [],
      fom16option: [],
      //财务的下拉数据
      Finance1: [],
      Finance2: [],
      Finance3: [],
      //认缴明细
      Subscription: [],
      //实缴明细
      advance: [],
      //实缴明细是否验资
      capital: [],
      //董监高
      prison: [],
      //外部董监高
      upprison: [],
      upprison1: [],
      flag1: false,
      flagq: false,
      flag3: false,
      flag4: false,
      flag5: false,
      btn: true,
      loading: false,
      count: 1,
      //判断附件删除时是查看编辑
      uploadremove: "1"
    };
  },
  methods: {
    //查看bpm流程
    goOut(val){
      console.log(val);
      window.open(val);
    },
    //附件管理

    timeStamp(cellValue) {
      if (cellValue) {
        var date = new Date(cellValue); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + "-";
        var M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        // var D = date.getDate() + ' ';
        var D = date.getDate();
        // var h = date.getHours() + ':';
        // var m = date.getMinutes() + ':';
        // var s = date.getSeconds();
        return Y + M + D;
      } else {
        return cellValue;
      }
    },
    // 文件列表获取
    Filelist() {
      this.initid = this.idd;
      // console.log(fid)
      Vue.http.get("fileController/list?fid=" + this.initid).then(res => {
        console.log(res);
        this.fileData = res.data.data.list;
        for (let i = 0; i < this.fileData.length; i++) {
          this.fileData[i].FCREATETIME = this.timeStamp(
            this.fileData[i].FCREATETIME
          );
        }
        this.loading = false;
      });
    },
    // jj(response){
    //   let blob = new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
    //   let downloadElement = this.$refs.a;
    //   console.log(downloadElement)
    //   let href = window.URL.createObjectURL(blob); //创建下载的链接
    //   downloadElement.href = href;
    //   downloadElement.download = 'xxx.xlsx'; //下载后文件名
    //   document.body.appendChild(downloadElement);
    //   downloadElement.click(); //点击下载
    //   document.body.removeChild(downloadElement); //下载完成移除元素
    //   window.URL.revokeObjectURL(href); //释放掉blob对象
    // },
    //文件列表下载
    download(row) {
      console.log(row);
      this.downid = row.FID;
      // this.fid = row.FID
      window.open("/dst/fileController/downloads?fid=" + this.downid);
      // Vue.http.get("fileController/downloads?fid="+this.downid)
      // .then((res) => {
      //   console.log(res)
      //   window.open(res.body.data.fwqlj)
      //   // this.jj()
      // })
    },
    // 文件列表删除
    dels(row) {
      // alert(1111)
      console.log(row);
      // rows.splice(index, 1);
      this.delid = row.FID;
      Vue.http.get("fileController/delet?fid=" + this.delid).then(res => {
        console.log(res);
        this.Filelist();
      });
    },
    handleClick(scope) {
      console.log(scope);
    },
    // submitUpload() {
    //   this.$refs.upload.submit();
    // },
    OnChange(file, fileList) {
      this.fileList = fileList;
    },
    OnRemove(file, fileList) {
      this.fileList = fileList;
      console.log(fileList);
    },
    beforeUpload(file, filelist) {
      // console.log(file)
      this.files = file; //file对象
      this.fileName = file.name;
      // return false;
    },
    //文件转为二进制流
    dataURItoBlob(dataURI) {
      var byteString = atob(dataURI.split(",")[1]);
      var mimeString = dataURI
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    },
    handlePreview(file) {
      alert(file.url);
    },
    onSubmit1(num) {
      // console.log(this.idd);
      let json = {
        fcompany:this.form1.arr[0].value,
        fid:this.idd
      }
      repeats(json).then((res)=>{
        console.log(res)
        if(res.body.data=='0'){
          const parmaData = new FormData();
      this.form = {
        fid: this.idd,
        y: "1"
      };
      let file = "";
      let uid = "";
      for (let x in this.form) {
        parmaData.append(x, this.form[x]);
      }
      // console.log(parmaData.get('a'))
      // console.log(this.fileList, "123454322345");
      // return false;
      if (this.fileList != null) {
        for (let i = 0; i < this.fileList.length; i++) {
          file = "file" + this.count;
          this.count++;
          parmaData.append(file, this.fileList[i].raw);
          parmaData.append(uid, this.fileList[i].uid);
        }
        console.log(parmaData.get(file));
        Vue.http
          .post("fileController/upload", parmaData, {
            headers: {
              "Content-Type": "Multipart/form-data"
            }
          })
          .then(res => {
            console.log(res);
            if (res.body.info == "成功") {
              this.idd = res.body.data.fid;
              if (num == "1") {
                this.savessg();
              } else {
                this.commitssg();
              }
            } else {
              this.$message({
                type: "error",
                message: "保存文件失败"
              });
            }
          });
      } else {
        console.log("没有新文件");
      }
        }else{
          this.$message({
                type: "error",
                message: "公司名称不能重复"
              });
        }
      })
      
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    onss(err, file, fileList) {
      return (this.fileList = [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]);
    },

    //附件管理
    //load打開回調
    opened() {
      this.loading = true;
    },
    //股东搜索
    remoteMethod(query) {
      console.log(query);

      return false;
      if (query !== "") {
        let params = {
          str: query
        };
        Shareholder(params).then(res => {
          console.log(res);
        });
      } else {
        console.log("不存在");
      }
    },
    //当dialog关闭时
    closed(formName) {
      console.log("关机");
      this.$refs[formName].resetFields();
    },
    partners(rows, index) {
      let params = {
        partnerid: rows.value
      };
      parnet(params).then(res => {
        rows.xz = res.body.data;
      });
    },
    //保存的方法
    savessg() {
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
        jyfw: this.form1.arr[16].value,
        companyaddress: this.form1.arr[17].value,
        content: this.form1.arr[18].value,
        fyzadmin: '',
        //业务表单
        unifyreditcode: this.ywform.arr[0].value,
        setuptime: this.ywform.arr[1].value,
        sealperson: this.ywform.arr[2].value,
        zzperson: this.ywform.arr[3].value,
        qualification: this.ywform.arr[4].value,
        businesslicencetime: this.ywform.arr[5].value,
        //财务信息的form
        combinerange: this.cwform.arr[0].value,
        companytypeb: this.cwform.arr[1].value,
        companybbf: this.cwform.arr[2].value
      };
      let param = {
        company: JSON.stringify(jsons),
        statebtu: "2",
        fid: this.idd,
        ywformlist: this.ywforms, //业务人的表单
        cwform: this.cwforms, //财务填写的表单
        cwtable: this.cwtables, //认缴明细的表格
        sjmxtable: this.sjmxtables, //实缴明细的表格
        dtable: this.dtables, //外部董监高的表格信息
        wtable: this.wtables //内部董监高的表格信息
      };

      console.log(param.company);

      saves(param).then(res => {
        console.log(res);

        if (res.body.status === "1") {
          console.log(this.idd);

          if (this.fileList.length != 0) {
            this.$message({
              type: "success",
              message: "保存成功"
            });
            this.tablelist();
            this.dialogFormVisible = false;
          } else {
            this.$message({
              type: "success",
              message: "保存成功"
            });
            this.tablelist();
            this.dialogFormVisible = false;
          }
        } else {
          this.$message({
            type: "error",
            message: "保存失败"
          });
        }
      });
    },
    //提交的方法
    commitssg() {
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
        // qualification: this.form1.arr[16].value,
        jyfw: this.form1.arr[16].value,
        companyaddress: this.form1.arr[17].value,
        content: this.form1.arr[18].value,
        fyzadmin: '',
        //业务form
        unifyreditcode: this.ywform.arr[0].value,
        setuptime: this.ywform.arr[1].value,
        sealperson: this.ywform.arr[2].value,
        zzperson: this.ywform.arr[3].value,
        qualification: this.ywform.arr[4].value,
        businesslicencetime: this.ywform.arr[5].value,
        //财务信息的form
        combinerange: this.cwform.arr[0].value,
        companytypeb: this.cwform.arr[1].value,
        companybbf: this.cwform.arr[2].value
      };
      let param = {
        company: JSON.stringify(jsons),
        statebtu: "3",
        fid: this.idd,

        cwtable: this.cwtables, //认缴明细的表格
        sjmxtable: this.sjmxtables, //实缴明细的表格
        dtable: this.dtables, //外部董监高的表格信息
        wtable: this.wtables //内部董监高的表格信息
      };
      console.log(param);
      // if(this.roule=='node1'){
      // console.log(formName);
      // console.log(this.$refs[formName]);
      // return false;
      saves(param).then(res => {
        console.log(res);
        // this.idd = res.body.data;

        if (res.body.status === "1") {
          console.log(this.fileList);

          if (this.fileList.length != 0) {
            // this.onSubmit1();
            this.$message({
              type: "success",
              message: "提交成功"
            });
            this.tablelist();
            this.dialogFormVisible = false;
          } else {
            this.$message({
              type: "success",
              message: "提交成功"
            });
            this.tablelist();
            this.dialogFormVisible = false;
          }

          // this.onSubmit1();
          // this.$message({
          //   type: "success",
          //   message: "提交成功"
          // });
          // this.tablelist();
          // this.dialogFormVisible = false;
        } else {
          this.$message({
            type: "error",
            message: "提交失败"
          });
          return false;
        }
      });
    },
    //点击保存执行
    save() {
      //  this.$refs[formName].validate((valid) => {
      //     if (valid) {
      // alert('成功')
      console.log(this.form1.arr[8].value);
      this.$confirm("是否确定保存", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.onSubmit1("1");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存"
          });
        });
      // console.log(this.rtableData);

      // } else {
      //   console.log('error submit!!');
      //   return false;
      // }
      // });
      // return false;
      // console.log(this.prick);
    },
    //提交
    commits(formName) {
      this.$confirm("是否确定提交", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let msg = "";
          if (this.roule == "node1") {
            formName = "ruleForm";
            msg = "请填写申请信息";
          }
          if (this.roule == "node2") {
            formName = "business";
            msg = "请填写业务信息";
          }
          if (this.roule == "node3") {
            formName = "Finance";
            msg = "请填写财务信息";
          }
          // return false;

          if (this.$refs[formName]) {
            this.$refs[formName].validate(valid => {
              if (valid) {
                return new Promise((resolve, reject) => {
                  // console.log(this.$refs['rtableform'])
                  // return false;
                  console.log(this.rtableform.rtableData.length);
                  if (this.rtableform.rtableData.length == 0) {
                    this.$message({
                      type: "error",
                      message: "认缴明细不能为空"
                    });
                  } else {
                    this.$refs["rtableform"].validate(valid => {
                      if (valid) {
                        this.onSubmit1("2");
                      } else {
                        this.$message.error("请填写认缴明细");
                      }
                    });
                  }
                });

                // rtableform
                // console.log(this.rtableData)
                // for(let i=0;i<)
                // return false;
              } else {
                this.$message.error(msg);
                return false;
              }
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交"
          });
        });

      // }
      //  if(this.roule=='node2'){
      //    saves(param).then(res => {
      //     console.log(res);
      //     if(res.body.status==='1'){
      //       this.$message({
      //     type: "success",
      //     message: "提交成功"
      //     });
      //     this.tablelist();
      //     this.dialogFormVisible = false;
      //     }
      //   });
      //  }
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
          if (res.data.data != null) {
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
        }
      });
    },
    // 刚进入页面首页东西
    flingingdx() {
      let param = {
        userNumber: "admin",
        passWord: "admin"
      };
      indexinfo(param).then(res => {
        console.log(res.data.data.flag);
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
        this.pages = res.data.data.size;
        this.tableData = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].BUTTON == "1") {
            this.tableData.push({
              state: arr[i].FBILLSTATUS,
              name: arr[i].FAREAGROUP,
              type: arr[i].FAREACOMPANY,
              stat: arr[i].FCOMPANY,
              prick: arr[i].FBUSINESSLICENCETIME,
              creatname: arr[i].FSETUPREGCOMPETETIME,
              bosname: arr[i].PERSONNAME,
              state1: arr[i].STATE,
              id: arr[i].FID,
              button: "编辑",
              del: arr[i].DEL,
              button1: arr[i].BUTTON,
              flowurl:arr[i].FLOWURL
            });
          } else {
            this.tableData.push({
              state: arr[i].FBILLSTATUS,
              name: arr[i].FAREAGROUP,
              type: arr[i].FAREACOMPANY,
              stat: arr[i].FCOMPANY,
              prick: arr[i].FBUSINESSLICENCETIME,
              creatname: arr[i].FSETUPREGCOMPETETIME,
              bosname: arr[i].PERSONNAME,
              state1: arr[i].STATE,
              id: arr[i].FID,
              button: "查看",
              del: arr[i].DEL,
              button1: arr[i].BUTTON,
              flowurl:arr[i].FLOWURL
            });
          }
        }
      });
      //  console.log(param)
    },
    //查询
    onSubmit() {
      this.currentPage = 1;
      this.tablelist();
    },
    //进入首页时弹出层所有数据
    addlication() {
      // this.dialogFormVisible = true
      console.log("1");
    },
    //认缴明细添加一行
    addrjtable() {
      // console.log(this.dtableData);
      this.rtableform.rtableData.push({
        options: this.Subscription,
        value: "",
        pleaceholder: "请输入关键字",
        xz: "",
        price: "",
        time: "",
        czbl: "",
        id: ""
      });
    },
    //实缴明细添加
    addsjtable() {
      // console.log(this.rtableData);
      let arr = [];
      for (let i = 0; i < this.rtableform.rtableData.length; i++) {
        arr.push({
          value: this.rtableform.rtableData[i].value,
          label: ""
        });
      }
      // console.log(this.rtableData[0].options);
      for (let i = 0; i < this.rtableform.rtableData[0].options.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (arr[j].value == this.rtableform.rtableData[0].options[i].value) {
            arr[j].label = this.rtableform.rtableData[0].options[i].label;
          }
        }
      }
      this.stableData.push({
        options: arr,
        value: "",
        pleaceholder: "请输入关键字",
        xz: "",
        price: "",
        time: "",
        czbl: "",
        id: "",
        capital: "",
        optionsc: this.capital
      });
      console.log(this.stableData);
    },
    //内部董监高添加行
    adddjgtable() {
      this.dtableData.push({
        options: this.prison,
        value: "",
        pleaceholder: "请选择",
        options1: [],
        value1: "",
        pleaceholder1: "请选择",
        options2: [],
        value2: "",
        pleaceholder2: "请选择",
        id: ""
      });
    },
    //外部董监高添加行
    addwbtable() {
      this.wtableData.push({
        options: this.upprison,
        value: "",
        pleaceholder: "",
        options1: [],
        value1: "",
        pleaceholder1: "请选择",
        options2: this.upprison1,
        value2: "",
        pleaceholder2: "请输入关键字",
        id: ""
      });
    },
    //编辑按钮操作  弹出框  并且可能传入值
    upload(index, rows) {
      // console.log(formName)
      // console.log(this.$refs[formName])
      // return false

      if ((index, rows)) {
        this.uploadremove = rows[index].button1;
        console.log(this.uploadremove);

        this.dialogFormVisible = true;
        //  return false;
        let param = {
          companyid: rows[index].id
        };
        console.log(param);
        addapplication(param).then(res => {
          console.log(res);
          this.fom2option = foradd1(res.data.data.CurrencyList);
          this.fom3option = foradd1(res.data.data.IsenableList);
          this.fom4option = foradd1(res.data.data.IsenableList);
          this.fom9option = foradd1(res.data.data.investtypeList);
          this.fom10option = foradd2(res.data.data.districtGroupList);
          this.fom13option = foradd1(res.data.data.companyTypeList);
          this.fom16option = foradd1(res.data.data.qualificationsList);
          this.Finance1 = foradd1(res.data.data.sysCode);
          this.Finance2 = foradd1(res.data.data.sysCode2);
          this.Finance3 = foradd1(res.data.data.sysCode3);
          this.Subscription = foradd4(res.data.data.fshareholdernameList);
          // console.log(this.Subscription)
          this.advance = foradd4(res.data.data.fshareholdernameList);
          this.prison = foradd1(res.data.data.typeList);
          this.upprison = foradd1(res.data.data.typeList);
          this.upprison1 = foradd3(res.data.data.findForJdbc4);

          this.capital = foradd1(res.data.data.IsenableList);
          // console.log( this.capital)
          // return false;
          this.form1.arr[2].optionsgd = this.fom2option;
          this.form1.arr[3].optionsgd = this.fom3option;
          this.form1.arr[4].optionsgd = this.fom4option;
          this.form1.arr[9].optionsgd = this.fom9option;
          this.form1.arr[10].optionsgd = this.fom10option;
          this.form1.arr[13].optionsgd = this.fom13option;
          this.form1.arr[16].optionsgd = this.fom16option;
          this.ywform.arr[4].optionsgd = this.fom16option;
          this.cwform.arr[0].optionsgd = this.Finance1;
          this.cwform.arr[1].optionsgd = this.Finance2;
          this.cwform.arr[2].optionsgd = this.Finance3;
          this.rtableform.rtableData = [];
          this.stableData = [];
          this.dtableData = [];
          this.wtableData = [];
          for (let i = 0; i < this.ywform.arr.length; i++) {
            this.ywform.arr[i].value = "";
          }
          for (let i = 0; i < this.cwform.arr.length; i++) {
            this.cwform.arr[i].value = "";
          }

          this.form.name = res.data.data.personName;
          this.form.time = res.data.data.writetime;
          // this.form1.arr[10].optionsgd = [];
          this.bgszw = [];
          this.idd = res.body.data.companyList[0].FID;
          console.log(res.body.data.page);
          this.roule = res.body.data.page;
          console.log(this.roule);
          for (let i = 0; i < this.form1.arr.length; i++) {
            this.form1.arr[i].value = "";
          }
          if (res.data.data.page == "node2") {
            this.ywform.flag = false;
          } else {
            this.ywform.flag = true;
          }

          if (this.roule == "node1") {
            this.flagg = false;
            //  console.log(this.$refs[formName])
            this.$refs["ruleForm"].resetFields();
            // this.$nextTick(() => {
            //   this.$refs["rtableform"].resetFields();
            // })
            // 后面加19
            let arrt = [2, 9, 0, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 3];
            for (let i = 0; i < this.form1.arr.length; i++) {
              if (arrt.indexOf(i) != -1) {
                this.form1.arr[i].disabled = false;
              }
            }
          }
          if (this.roule == "node2") {
            this.flagg1 = false;
            this.flagg = true;
            this.form1.arr[0].disabled = false;
            // 后面加19
            let arrt = [2, 9, 3];
            for (let i = 0; i < this.form1.arr.length; i++) {
              if (arrt.indexOf(i) != -1) {
                this.form1.arr[i].disabled = true;
              }
            }
            let arrt1 = [0, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18];
            for (let i = 0; i < this.form1.arr.length; i++) {
              if (arrt1.indexOf(i) != -1) {
                this.form1.arr[i].disabled = false;
              }
            }

            this.$refs["business"].resetFields();
          }
          if (this.roule == "node3") {
            this.flagg1 = true;
            this.flagg = true;
            // 后面加19
            let arrt = [2, 9, 0, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 3];
            for (let i = 0; i < this.form1.arr.length; i++) {
              if (arrt.indexOf(i) != -1) {
                this.form1.arr[i].disabled = true;
              }
            }
            this.$refs["Finance"].resetFields();
          }
          if (rows[index].button1 == "2") {
            this.flagg = true;
            this.ywform.flag = true;
            this.flag5 = true;
            this.flag4 = true;
            this.btn = false;
            let arrt = [2, 9, 0, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 3];
            for (let i = 0; i < this.form1.arr.length; i++) {
              if (arrt.indexOf(i) != -1) {
                this.form1.arr[i].disabled = true;
              }
            }
          } else {
            this.btn = true;
            this.flag4 = false;
            this.flag5 = false;
          }
          // console.log(rows[index].button1)
          // return false
          this.form1.arr[0].value = res.body.data.companyList[0].FCOMPANY;
          this.form1.arr[1].value =
            res.body.data.companyList[0].FREGISTEREDCAPITAL;
          this.form1.arr[2].value = res.body.data.companyList[0].FMONEYTYPE;
          this.form1.arr[3].value =
            res.body.data.companyList[0].FISOVERSEASCOMPANY;
          this.form1.arr[4].value =
            res.body.data.companyList[0].FISFOREIGNENTERPRISE;
          this.form1.arr[5].value = res.body.data.companyList[0].NWZ;
          this.form1.arr[6].value = res.body.data.companyList[0].FLEGALPERSON;
          this.form1.arr[7].value =
            res.body.data.companyList[0].FFZZAFFAIRWITHPERSON;
          if (res.body.data.companyList[0].FPARTNERSHIP != null) {
            let arr = res.body.data.companyList[0].FPARTNERSHIP.split('"');
            let arr111 = [arr[1], arr[3]];
            this.form1.arr[8].value = arr111;
          } else {
            console.log("11111");
          }

          // console.log(arr111)

          this.form1.arr[9].value =
            res.body.data.companyList[0].FINVESTMENTMODE;
          this.form1.arr[10].value = res.body.data.companyList[0].FAREAGROUP;
          this.form1.arr[11].value = res.body.data.companyList[0].FAREACOMPANY;
          this.form1.arr[12].value =
            res.body.data.companyList[0].FBUSINESSDEPARTMENT;
          this.form1.arr[13].value = res.body.data.companyList[0].FCOMPANYTYPE;
          this.form1.arr[14].value =
            res.body.data.companyList[0].FFIRSTCOMPANYNATURE;
          this.form1.arr[15].value =
            res.body.data.companyList[0].FTWOCOMPANYNATURE;
          // this.form1.arr[16].value =
          //   res.body.data.companyList[0].FAPTITUDESITUATION;
          this.form1.arr[16].value =
            res.body.data.companyList[0].FSCOPEOFOPERATION;
          this.form1.arr[17].value =
            res.body.data.companyList[0].FCOMPANYADDRESS;
          this.form1.arr[18].value = res.body.data.companyList[0].FREMARK;
          // this.form1.arr[19].value = res.body.data.companyList[0].FYZADMIN;
          this.ywform.arr[0].value =
            res.body.data.findForJdbc8[0].FUNIFYREDITCODE;
          this.ywform.arr[1].value = res.body.data.findForJdbc8[0].FSETUPTIME;
          this.ywform.arr[2].value = res.body.data.findForJdbc8[0].FSEALPERSON;
          this.ywform.arr[3].value = res.body.data.findForJdbc8[0].FZZPERSON;
          this.ywform.arr[4].value =
            res.body.data.companyList[0].FAPTITUDESITUATION;
          this.ywform.arr[5].value =
            res.body.data.findForJdbc8[0].FBUSINESSLICENCETIME;
          this.cwform.arr[0].value = res.body.data.companyList[0].FCOMBINERANGE;
          this.cwform.arr[1].value = res.body.data.companyList[0].FCOMPANYTYPEB;
          this.cwform.arr[2].value = res.body.data.companyList[0].FCOMPANYBBF;
          console.log(this.form1.arr[3].value);
          console.log(this.form1.arr[4].value);
          console.log(this.form1.arr[5].value);
          console.log(this.form1.arr[6].value);
          console.log(this.form1.arr[7].value);
          this.rtableform.rtableData = [];

          if (res.body.data.findForJdbc.length == 0) {
          } else {
            for (let i = 0; i < res.body.data.findForJdbc.length; i++) {
              this.rtableform.rtableData.push({
                options: this.Subscription,
                value: res.body.data.findForJdbc[i].FPARTNER,
                pleaceholder: "请输入关键字",
                xz: res.body.data.findForJdbc[i].FPARTNERNATURENAME,
                czbl: res.body.data.findForJdbc[i].FCAPITALKEY,
                price: parseFloat(res.body.data.findForJdbc[i].FSUBCRIBEMONEY),
                time: res.body.data.findForJdbc[i].FSUBCRIBETIME,
                id: res.body.data.findForJdbc[i].FID
              });
            }
          }
          this.stableData = [];

          if (res.body.data.findForJdbc7.length == 0) {
          } else {
            for (let i = 0; i < res.body.data.findForJdbc7.length; i++) {
              this.stableData.push({
                options: this.Subscription,
                value: res.body.data.findForJdbc7[i].FPARTNER,
                pleaceholder: "请输入关键字",
                xz: res.body.data.findForJdbc7[i].FPARTNERNATURENAME,
                czbl: res.body.data.findForJdbc7[i].FCAPITALKEY,
                price: parseFloat(res.body.data.findForJdbc7[i].FPAIDINMONEY),
                time: res.body.data.findForJdbc7[i].FPAIDINTIME,
                id: res.body.data.findForJdbc7[i].FID,
                capital: res.body.data.findForJdbc7[i].FCAPITAL,
                optionsc: this.capital
              });
            }
          }

          this.dtableData = [];
          if (res.body.data.findForJdbc2.length == 0) {
          } else {
            this.dtableData = [];
            for (let i = 0; i < res.body.data.findForJdbc2.length; i++) {
              this.dtableData.push({
                options: this.prison,
                value: res.body.data.findForJdbc2[i].FPOSITION,
                pleaceholder: "请输入职务",
                pleaceholder1: "请选择",
                zlzw: res.body.data.findForJdbc2[i].FZLPOSITIONNAME,
                name: res.body.data.findForJdbc2[i].FPERSONNAME,
                qyjt: res.body.data.findForJdbc2[i].FAREABLOCNAME,
                qygs: res.body.data.findForJdbc2[i].FAREACOMPANYNAME,
                id: res.body.data.findForJdbc2[i].FID
              });
            }
          }

          this.wtableData = [];
          if (res.body.data.findForJdbc3.length == 0) {
          } else {
            this.wtableData = [];
            for (let i = 0; i < res.body.data.findForJdbc3.length; i++) {
              this.wtableData.push({
                options: this.upprison,
                options2: this.upprison1,
                value: res.body.data.findForJdbc3[i].FPOSITION,
                pleaceholder1: "请选择",
                pleaceholder2: "请输入关键字",
                value1: res.body.data.findForJdbc3[i].FDELEGATE,
                name: res.body.data.findForJdbc3[i].FPERSONNAME,
                id: res.body.data.findForJdbc3[i].FID
              });
            }
          }

          this.gtableData = [];
          if (res.body.data.findForJdbc5.length != 0) {
            for (let i = 0; i < res.body.data.findForJdbc5.length; i++) {
              this.gtableData.push({
                name: res.body.data.findForJdbc5[i].FNAME,
                gdxz: res.body.data.findForJdbc5[i].FCOMPANYNATURE,
                gb: res.body.data.findForJdbc5[i].FSHARE
              });
            }
          }
          this.cwgbtableData = [];
          if (res.body.data.findForJdbc6.length != null) {
            console.log(res.body.data.findForJdbc6);
            for (let i = 0; i < res.body.data.findForJdbc6.length; i++) {
              this.cwgbtableData.push({
                name: res.body.data.findForJdbc6[i].FNAME,
                gdxz: res.body.data.findForJdbc6[i].FCOMPANYNATURE,
                gb: res.body.data.findForJdbc6[i].FSHARE
              });
            }
          }
          // console.log(this.$refs['dialog'].$el.scrollTop)
          this.$refs["dialog"].$el.scrollTop = 0;
          this.$refs.upload.clearFiles();
          this.fileData = [];
          this.Filelist();
          this.fileList = [];

          // console.log(this.$refs['dialog'].$el.scrollTop)
          this.loading = false;
        });
      } else {
        this.dialogFormVisible = true;
        this.uploadremove = "1";
        console.log(this.loading);
        console.log("没有硝烟");
        for (let i = 0; i < this.form1.arr.length; i++) {
          this.form1.arr[i].value = "";
        }
        this.btn = true;
        // this.fileList = [];
        // console.log(this.fileList)
        addapplication().then(res => {
          console.log(res);

          if (res.data.data.page != "node1") {
            this.ywform.flag = true;
          } else {
            this.ywform.flag = false;
          }
          this.idd = "";
          console.log(res.body.data.page);
          this.roule = res.body.data.page;
          console.log(this.roule);
          if (this.roule == "node1") {
            this.flagg = false;
            // 后面加19
            let arrt = [2, 9, 0, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 3];
            for (let i = 0; i < this.form1.arr.length; i++) {
              if (arrt.indexOf(i) != -1) {
                this.form1.arr[i].disabled = false;
              }
            }
          }
          if (this.roule == "node2") {
            this.flagg1 = false;
            this.flagg = true;
          }
          if (this.roule == "node3") {
            this.flagg1 = true;
            this.flagg = true;
          }

          this.fom2option = foradd1(res.data.data.CurrencyList);
          this.form1.arr[2].value = this.fom2option[2].value;
          this.fom3option = foradd1(res.data.data.IsenableList);
          this.form1.arr[3].value = this.fom3option[1].value;
          this.fom4option = foradd1(res.data.data.IsenableList);
          this.fom9option = foradd1(res.data.data.investtypeList);
          this.fom10option = foradd2(res.data.data.districtGroupList);
          this.fom13option = foradd1(res.data.data.companyTypeList);
          this.fom16option = foradd1(res.data.data.qualificationsList);
          this.Finance1 = foradd1(res.data.data.sysCode);
          this.Finance2 = foradd1(res.data.data.sysCode2);
          this.Finance3 = foradd1(res.data.data.sysCode3);
          this.Subscription = foradd4(res.data.data.fshareholdernameList);
          this.advance = foradd4(res.data.data.fshareholdernameList);
          this.prison = foradd1(res.data.data.typeList);
          this.upprison = foradd1(res.data.data.typeList);
          this.upprison1 = foradd3(res.data.data.findForJdbc4);
          this.form1.arr[2].optionsgd = this.fom2option;
          this.form1.arr[3].optionsgd = this.fom3option;
          this.form1.arr[4].optionsgd = this.fom4option;
          this.form1.arr[9].optionsgd = this.fom9option;
          this.form1.arr[10].optionsgd = this.fom10option;
          this.form1.arr[13].optionsgd = this.fom13option;
          this.form1.arr[16].optionsgd = this.fom16option;
          this.cwform.arr[0].optionsgd = this.Finance1;
          this.cwform.arr[1].optionsgd = this.Finance2;
          this.cwform.arr[2].optionsgd = this.Finance3;
          this.rtableform.rtableData = [];
          this.stableData = [];
          this.dtableData = [];
          this.wtableData = [];

          this.form.name = res.data.data.personName;
          this.form.time = res.data.data.writetime;
          // this.form1.arr[10].optionsgd = [];
          this.bgszw = [];
          this.$refs["dialog"].$el.scrollTop = 0;
          console.log(this.$refs.upload);
          this.$refs.upload.clearFiles();
          this.fileData = [];
          this.loading = false;
        });

        // this.$refs.upload.clearFiles();
        //  this.fileList = [];
        // console.log(this.fileList)
      }
    },

    remove1(index, rows) {
      this.$confirm("是否确定删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          rows.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });

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
    //删除按钮 交互刷新列表
    removes(index, rows) {
      this.$confirm("是否确定删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let param = {
            companyid: rows[index].id
          };
          console.log(param.companyid);
          // return false;
          remov(param).then(res => {
            console.log(res);

            this.tablelist();
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });

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

    //分页的设置
    //  handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.tablelist();
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
          let params = {
            id: this.idd
          };
          back(params).then(res => {
            console.log(res);
            if (res.body.code === "999") {
              this.$message({
                type: "success",
                message: "驳回成功!"
              });
              this.tablelist();
              this.dialogFormVisible = false;
            } else {
              this.$message({
                type: "info",
                message: "驳回失败!请重试"
              });
            }
          });
          // return false

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

    min(val, index) {
      if (val < 0) {
        this.rtableform.rtableData[index].price = 0;
        this.$message.error("此处不能为负数");
      }
    }
  },
  filters: {},
  computed: {
    //监听法人代表的disabled,控制它用不用校验
    Corporate() {
      return this.form1.arr[6].disabled;
    },
    //监听执行事务合伙人的disabled,控制它用不用校验
    Partner() {
      return this.form1.arr[7].disabled;
    },
    //财务表单第一个select（控制后两个隐藏显示）
    sele() {
      return this.cwform.arr[0].value;
    },
    search1() {
      let num = 0;
      for (let i = 0; i < this.stableData.length; i++) {
        num += parseFloat(this.stableData[i].price) || 0;
      }
      return parseFloat(num).toFixed(4);
    },

    search() {
      let num = 0;
      for (let i = 0; i < this.rtableform.rtableData.length; i++) {
        num += parseFloat(this.rtableform.rtableData[i].price) || 0;
      }
      return parseFloat(num).toFixed(4);
    },
    ch() {
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
      if (this.rtableform.rtableData.length != null) {
        for (let i = 0; i < this.rtableform.rtableData.length; i++) {
          arr.push({
            name: this.rtableform.rtableData[i].value,
            xz: this.rtableform.rtableData[i].xz,
            price: this.rtableform.rtableData[i].price,
            czbl: this.rtableform.rtableData[i].czbl,
            time: this.rtableform.rtableData[i].time,
            id: this.rtableform.rtableData[i].id
          });
        }
        return JSON.stringify(arr);
      }
    },
    //实缴明细表格数据
    sjmxtables() {
      let arr = [];
      if (this.stableData.length != null) {
        for (let i = 0; i < this.stableData.length; i++) {
          arr.push({
            name: this.stableData[i].value,
            xz: this.stableData[i].xz,
            price: this.stableData[i].price,
            czbl: this.stableData[i].czbl,
            time: this.stableData[i].time,
            id: this.stableData[i].id,
            capital: this.stableData[i].capital
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
          id: this.dtableData[i].id
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
          id: this.wtableData[i].id
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
        return a[0] + "-" + a[1];
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
    complaytype() {
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
    //监听法人代表的disabled
    Corporate: {
      // immediate: true,
      handler(newName, oldName) {
        console.log(newName);
        // if(oldName!=''){
        //   console.log(this.$refs.ruleForm)
        // }
        if (newName == true) {
          // Corporaterepresentative
          console.log(this.$refs["Corporaterepresentative"]);

          // setTimeout(function () {
          //   that.$refs['Corporaterepresentative'].clearValidate();
          // },300)
          // this.$nextTick(() => {
          //   // this.$refs.form.resetFields();
          // this.$refs['Corporaterepresentative'].resetFields();
          // });
          // this.clearValidate('Corporaterepresentative')
          // this.$refs['Corporaterepresentative'].clearValidate();
          //  this.$refs.ruleForm.clearValidate('this.form1.arr[6].value')
          // this.form1.arr[6].rules.message = "";
          this.form1.arr[6].rules.required = false;
          // this.form1.arr[6].showMessage = false;
          // console.log(this.$refs.ruleForm)
        } else {
          console.log(this.$refs["Corporaterepresentative"]);
          this.form1.arr[6].rules.required = true;
          // this.form1.arr[6].rules.message = "请填写法人代表";
          // console.log(this.form1.arr[6].rules.message);
        }
      }
    },
    //监听执行事务合伙人的disabled
    Partner: {
      immediate: true,
      handler(newName, oldName) {
        console.log(newName);
        if (newName == true) {
          this.form1.arr[7].rules.required = false;
          // this.form1.arr[7].rules.message = '';
        } else {
          this.form1.arr[7].rules.required = true;
          // this.form1.arr[7].rules.message = '请填写执行事务合伙人';
        }
      }
    },
    // 这里是财务的信息实时填入到财务股比中
    stableData: {
      handler(newName, oldName) {
        console.log(newName);
        this.cwgbtableData = [];
        for (let i = 0; i < newName.length; i++) {
          if (newName[i].value != "") {
            let obj = {};
            obj = newName[i].options.find(item => {
              //这里的userList就是上面遍历的数据源
              return item.value === newName[i].value; //筛选出匹配数据
            });
            console.log(obj.label);
            this.cwgbtableData.push({
              name: obj.label,
              gdxz: newName[i].xz,
              gb: newName[i].czbl
            });
          }
        }
      },
      deep: true
    },
    sele: {
      handler(newName, oldName) {
        if (newName == "4") {
          this.cwform.arr[1].show = false;
          this.cwform.arr[2].show = false;
          this.cwform.arr[1].value = "";
          this.cwform.arr[2].value = "";
        } else {
          this.cwform.arr[1].show = true;
          this.cwform.arr[2].show = true;
        }
      },
      deep: true
    },
    search() {
      for (let i = 0; i < this.rtableform.rtableData.length; i++) {
        if (isNaN(this.rtableform.rtableData[i].price / this.search * 100)) {
          this.rtableform.rtableData[i].czbl = "";
        } else {
          this.rtableform.rtableData[i].czbl =
            (this.rtableform.rtableData[i].price / this.search * 100).toFixed(
              4
            ) + "%";
        }
      }
      this.form1.arr[1].value = this.search;
    },
    search1() {
      for (let i = 0; i < this.stableData.length; i++) {
        if (isNaN(this.stableData[i].price / this.search * 100)) {
          this.stableData[i].czbl = "";
        } else {
          this.stableData[i].czbl =
            (this.stableData[i].price / this.search * 100).toFixed(4) + "%";
        }
      }
      // this.form1.arr[1].value = this.search;
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
      // immediate: true,
      handler(newName, oldName) {
        console.log(this.form1.arr[6].value);
        if (oldName != "") {
          this.form1.arr[6].value = "";
          this.form1.arr[4].value = "";
        }
        console.log("境外公司", newName);
        if (newName == "" || newName == null) {
          this.form1.arr[6].disabled = true;
          this.form1.arr[7].disabled = true;
          this.form1.arr[4].disabled = true;
          this.form1.arr[5].disabled = true;
          // this.form1.arr[6].value = null;
        }
        if (newName == "1") {
          this.form1.arr[6].disabled = false;
          this.form1.arr[4].disabled = true;
        }
        if (newName == "0") {
          this.form1.arr[6].disabled = true;
          // this.form1.arr[6].value = null;

          this.form1.arr[4].disabled = false;
        }
        if (this.roule != "node1") {
          this.form1.arr[6].disabled = true;
          this.form1.arr[4].disabled = true;
        }
        if (this.uploadremove == "2") {
          this.form1.arr[6].disabled = true;
          this.form1.arr[4].disabled = true;
        }
      }
    },
    // 我看看你是否外资企业绑定的值在哪里你给我看
    // 我看下代码
    wzqy: {
      //  immediate: true,
      handler(newName, oldName) {
        // this.rjmxform.arr[0].value=newName;
        if (newName != "" && newName != null) {
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
            } else {
              // this.form1.arr[5].value = "";
              this.form1.arr[5].label = "内资企业类型";
              this.form1.arr[5].optionsgd = [];
              foradd(res.data.data.typeList, this.form1.arr[5].optionsgd);
            }
          });
        } else {
          this.form1.arr[5].disabled = true;
          // console.log( this.form1.arr[4].disabled)
          this.form1.arr[5].value = "";
        }
        if (this.roule != "node1") {
          this.form1.arr[5].disabled = true;
        }
        if (this.uploadremove == "2") {
          this.form1.arr[5].disabled = true;
        }
      }
    },
    complaytype: {
      handler(newName, oldName) {
        if (this.form1.arr[4].value == "1") {
          if (newName == "1" || newName == "2") {
            this.form1.arr[6].disabled = false;
            this.form1.arr[7].disabled = true;
            this.form1.arr[7].value = "";
          } else {
            this.form1.arr[6].disabled = true;
            this.form1.arr[7].disabled = false;
            this.form1.arr[6].value = "";
          }
        } else {
          if (
            newName == "1" ||
            newName == "2" ||
            newName == "3" ||
            newName == "4"
          ) {
            this.form1.arr[6].disabled = false;
            this.form1.arr[7].disabled = true;
            this.form1.arr[7].value = "";
          } else {
            this.form1.arr[7].disabled = false;
            this.form1.arr[6].disabled = true;
            this.form1.arr[6].value = "";
          }
        }
        if (newName == "") {
          this.form1.arr[7].disabled = true;
          this.form1.arr[6].disabled = true;
          this.form1.arr[7].value = "";
          this.form1.arr[6].value = "";
        }
        if (this.roule != "node1") {
          this.form1.arr[6].disabled = true;
          this.form1.arr[7].disabled = true;
        }
        if (this.uploadremove == "2") {
          this.form1.arr[6].disabled = true;
          this.form1.arr[7].disabled = true;
        }
      }
    },
    qyjt: {
      //  immediate: true,
      handler(newName, oldName) {
        let param = {
          areagroupid: newName
        };
        if (oldName != "") {
          this.form1.arr[11].value = "";
          this.form1.arr[12].value = "";
          this.form1.arr[11].optionsgd = [];
          this.form1.arr[12].optionsgd = [];
        }
        change(param).then(res => {
          if (res.data.code === "999") {
            console.log(res.data.data);
            if (res.data.data) {
              if (res.data.data.length != null) {
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
        if (oldName != "") {
          this.form1.arr[12].value = "";
        }

        let param = {
          areacompanyid: newName
        };
        changegs(param).then(res => {
          if (res.data.code === "999") {
            console.log(res.data.data);
            if (res.data.data != null) {
              let length = res.data.data.length;
              this.form1.arr[12].optionsgd = [];

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
      deep: true,
      //  immediate: true,
      handler(newName, oldName) {
        console.log(newName + "这是改变了的");
        let param = {
          superiorcode: newName,
          superiortype: "COMPANY_TYPE"
        };
        if (oldName != "") {
          this.form1.arr[15].value = "";
          this.form1.arr[14].value = "";
          this.form1.arr[14].optionsgd = [];
          this.form1.arr[15].optionsgd = [];
        }
        changework(param).then(res => {
          if (res.data.code === "999") {
            if (res.data.data.typeList != null) {
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
      deep: true,
      //  immediate: true,
      handler(newName, oldName) {
        console.log(newName);
        if (oldName != "") {
          this.form1.arr[15].value = "";
        }
        let param = {
          superiorcode: this.form1.arr[13].value,
          superiortype: newName,
          type: "type"
        };
        changework(param).then(res => {
          if (res.data.code === "999") {
            this.form1.arr[15].optionsgd = [];
            console.log(res);

            // if (res.data.data.typeList == null) {
            //   this.form1.arr[15].optionsgd = [];
            //   for(let i=0;i<this.form1.arr[14].optionsgd.length;i++){
            //     if(this.form1.arr[14].value==this.form1.arr[14].optionsgd[i].value){
            //       this.form1.arr[15].optionsgd.push({value:this.form1.arr[14].optionsgd[i].value,
            //       label:this.form1.arr[14].optionsgd[i].label})
            //     }
            //   }
            //   this.form1.arr[15].value = this.form1.arr[14].value;
            //   console.log(this.form1.arr[14].optionsgd)
            //   console.log(this.form1.arr[14].value)
            // } else
            // {
            if (res.data.data.typeList != null) {
              let length = res.body.data.typeList.length;
              this.form1.arr[15].optionsgd = [];
              for (let i = 0; i < length; i++) {
                this.form1.arr[15].optionsgd.push({
                  value: res.data.data.typeList[i].FNUMBER,
                  label: res.data.data.typeList[i].FNAME
                });
              }
            }

            // }
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
    console.log(this.$store.state.user.name);
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
  .temp {
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
    .zdcle1 {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(245, 108, 108, 1);
      line-height: 37px;
      padding-left: 5px;
    }
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
.ttt {
  height: 50px;
  text-align: center;
  font-size: 26px;
  line-height: 50px;
  margin-top: -1px;
  cursor: pointer;
  color: #ccc;
  border: 1px solid #ebeef5;
}
.ttt:hover {
  background-color: #f5f7fa;
}
.dialog-footer {
  background: #e9eef3;
  padding: 20px 10px 10px;
  text-align: center;
}
.error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  // padding-top: 4px;
  // position: absolute;
  // top: 100%;
  // left: 0;
}
</style>
