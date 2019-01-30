<template>
  <div class="structure">
    <el-container>
      <el-header height="auto">
        <el-form label-width="110px">
          <el-row :gutter="5">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="所属区域集团">
                  <el-select v-model="queryForm.qyjt" placeholder="请选择" clearable>
                    <el-option
                      v-for="(item, index) in queryList.districtGroupList"
                      :key="index"
                      :label="item.NAME"
                      :value="item.ID"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="所属区域公司">
                  <el-select v-model="queryForm.qygs" placeholder="请选择" clearable>
                    <el-option
                      v-for="(item, index) in qyComList"
                      :key="index"
                      :label="item.NAME"
                      :value="item.ID"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="公司名称">
                  <el-input v-model="queryForm.gsname" placeholder="请输入关键字"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="单据状态">
                  <el-select v-model="queryForm.djzt" placeholder="请选择" clearable>
                    <el-option
                      v-for="item in queryList.documentStateList"
                      :key="item.FID"
                      :label="item.FNAME"
                      :value="item.FNUMBER"
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
                <el-form-item label="变更类型">
                  <el-select v-model="queryForm.bglx" placeholder="请选择" clearable>
                    <el-option
                      v-for="item in queryList.changeTypeList"
                      :key="item.FID"
                      :label="item.FNAME"
                      :value="item.FNUMBER"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="查询开始日期">
                  <el-date-picker
                    v-model="queryForm.staTime"
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
                <el-form-item label="查询结束日期">
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
                <el-form-item label-width="80px">
                  <el-button type="primary" v-show="addFlag" @click="showDialog('xinzeng')">新增变更</el-button>
                  <el-button type="primary" @click="onQuery()">查询</el-button>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-header>
      <el-main>
        <div class="table-col">
          <el-table
            v-loading="loadingTable"
            :data="tableData"
            :header-cell-style="{textAlign:'center',background:'#409eff',color:'#fff'}"
            :cell-style="{textAlign:'center'}"
            border
            align="center"
            height="500"
            style="width: 100%">
            <el-table-column
              type="index"
              width="60"
              label="序号"
            >
            </el-table-column>
            <el-table-column
              width="60"
              label="是否完成"
              prop="tag"
            >
              <template slot-scope="scope">
                <!-- <span>{{scope.row.FGSCHANGETIME?'是':'否'}}</span>   -->
                <!-- <el-checkbox v-model="scope.row.FGSCHANGETIME?true:false"></el-checkbox> -->
                <el-checkbox checked v-show="scope.row.FCHANGETIME" disabled
                ></el-checkbox>
                <!-- <i :class="scope.row.FGSCHANGETIME?'el-icon-check':''"></i> -->
              </template>
            </el-table-column>
            <el-table-column
              prop="FBILLSTATUS"
              label="单据状态"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="FSSQYJTOLD"
              label="所属区域集团"
              width="160"
            >
            </el-table-column>
            <el-table-column
              prop="FSSQYGSOLD"
              label="所属区域公司"
              width="200"
            >
            </el-table-column>
            <el-table-column
              prop="FCOMPANYOLD"
              label="公司名称"
              width="200"
            >
            </el-table-column>
            <el-table-column
              prop="FCHANGETYPENAME"
              label="变更类型"
              width="200"
            >
            </el-table-column>
            <el-table-column
              prop="FGSCHANGETIME"
              label="工商变更备案完成时间"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="FCHANGETIME"
              label="变更登记完成时间"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="FADDED"
              label="变更人"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="BUTTON"
              fixed="right"
              label="操作"
              width="200">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="showDialog('bianji', scope.row.FID, scope.row.FCOMPANYOLD, scope.row.BUTTON)"
                  v-if="scope.row.BUTTON == '1'"
                >编辑</el-button>
                <el-button
                  size="mini"
                  @click="showDialog('chakan', scope.row.FID, scope.row.FCOMPANYOLD, scope.row.BUTTON)"
                  v-if="scope.row.BUTTON == '2'"
                >查看</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row.FID)"
                  v-if="scope.row.DEL == '1'"
                >删除</el-button>
                <el-button
                  size="mini"
                  @click="lookLiuCheng(scope.row.FLOWURL)"
                  v-if="!!scope.row.FLOWURL"
                >查看流程</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <div class="page-col">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="30"
          layout="prev, pager, next"
          :total="pages">
        </el-pagination>
      </div>
    </el-container>
  <!--查询end-->
  <!--弹出层start-->
    <el-dialog title="公司变更备案表"
               :visible.sync="dialogFormVisible"
               width="1300px"
               top="8vh"
    >
      <div class="applicant-col">
        <el-form  label-width="110px">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="填写人">
                <el-input v-model="applicantform.username" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="填写日期">
                <el-input v-model="applicantform.writetime" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="公司名称">
                <el-select 
                  v-model="applicantform.company" 
                  filterable clearable
                  placeholder="请选择" :disabled="copName"
                  remote
                  @change="conpanyNameChange(applicantform.company, '')"
                >
                  <el-option
                    v-for="item in applicantform.companyList"
                    :key="item.FID"
                    :label="item.FCOMPANY"
                    :value="item.FID"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-main>
        <!--申请人 第一个form end-->
        <!-- 变更类型需要在选择公司了以后才显示,同时如果是修改的时候,财务和业务是看不到这部分内容的。同时勾选对应的选项，展示对应的板块 -->
        <div class="col changetableType" v-if="companyNameSelection" v-show="changeTypeChecked">
          <h3 class="col-tit">变更类型</h3>
          <!--<h5 class="col-small-tit">公司名称</h5>-->
          <div class="col-main bg">
            <el-form  ref="typeSelection" :model="typeSelection" :inline="true">
              <el-checkbox-group v-model="typeSelection.selected">
              <el-form-item v-for="item in typeSelection.types" :key="item.FID">
                  <el-checkbox
                    :label="item.FNUMBER" 
                    :key="item.FID"
                    @change="changeChecked($event, item.FNUMBER)"
                  >
                    {{item.FNAME}}
                  </el-checkbox>
              </el-form-item>
              </el-checkbox-group>
            </el-form>
          </div>
        </div>
        <div class="changetableInfo col"  v-if="companyNameSelection">
          <h3 class="col-tit">变更信息</h3>
           <!-- 变更性质跟时间 -->
          <div class="change_natureTime">
            <h5 class="col-small-tit">变更性质与时间</h5>
            <div class="col-main">
              <el-form  ref="form" :model="formInline" label-width="150px">
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="是否工商变更">
                      <el-input
                        v-model="newCompany.FGSCHANGE"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="是否重大变更">
                      <el-input
                        v-model="newCompany.FZDCHANGE"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="是否财务变更">
                      <el-input
                        v-model="newCompany.FCWCHANGE"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-col>
                 
                </el-row>
                <el-row>
                  <el-col :span="12" 
                    v-if="changeTime"
                  >
                    <el-form-item label="工商变更备案完成时间" label-width="160">
                      <el-date-picker
                        v-model="newCompany.FGSCHANGETIME"
                        type="date" :disabled="isChakanTime"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- <el-row>
                  <el-col :span="12">
                    <el-form-item label="印章管理员">
                      <el-input
                        v-model="newCompany.FYZADMIN"
                        :disabled="isFYZADMIN"
                      ></el-input>
                      <el-span></el-span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" class="FYZADMIN">
                    (人员之间请以英文格式的分号做隔离)
                  </el-col>
                </el-row> -->
                <el-row>
                  <el-col :span="20">
                    <el-form-item label="备注">
                      <el-input type="textarea" maxlength="500" v-model="newCompany.FREMARKNEW" :disabled="isFREMARKNEW" resize="none"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <!-- 公司名称 -->
          <el-form :disabled="true">
            <div class="change_name" v-if="typeSelectionChecked['1']">
              <h5 class="col-small-tit">公司名称</h5>
              <div class="col-main">
                <el-row>
                  <el-form label-width="170px" :disabled="chakanDis">
                    <el-col :span="9">
                      <el-form-item label="变更前公司名称">
                        <el-input v-model="oldCompany.FCOMPANY" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="变更后公司名称">
                          <el-input v-model="newCompany.FCOMPANYNEW"></el-input>
                        </el-form-item>
                    </el-col>
                  </el-form>
                </el-row>
              </div>
            </div>
          </el-form>
          
          
          <!-- 币种 -->
          <div class="change_urrency" v-if="typeSelectionChecked['3']">
            <h5 class="col-small-tit">币种</h5>
            <div class="col-main">
              <el-row>
                <el-form label-width="170px" :disabled="chakanDis">
                  <el-col :span="9">
                    <el-form-item label="变更前币种">
                      <el-input v-model="oldCompany.FMONEYTYPE" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9"> 
                      <el-form-item label="变更后币种">
                      <el-select v-model="newCompany.FMONEYTYPENEW" placeholder="请选择" clearable>
                        <el-option 
                          v-for="item in currency"
                          :key="item.FID"
                          :label="item.FNAME"
                          :value="item.FNUMBER"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-row>
            </div>
          </div>
           <!-- 经营/合伙期限 -->
          <div class="change_unionTime" v-if="typeSelectionChecked['4']">
             <h5 class="col-small-tit">经营/合伙期限</h5>
            <div class="col-main">
              <el-row>
                <el-form label-width="170px" :disabled="chakanDis">
                  <el-col :span="9">
                    <el-form-item label="变更前经营/合伙期限">
                      <el-input v-model="oldCompany.FPARTNERSHIP" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="变更后经营/合伙期限">
                    <!-- v-model="form2" -->
                      <el-date-picker
                        v-model="fpartnerTime"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-row>
            </div>
          </div>
          <!-- 企业类型及代表 -->
          <div class="change_enterType clearfix" v-if="typeSelectionChecked['5']">
            <h5 class="col-small-tit">企业类型及代表</h5>
            <div class="col-main">
              <el-form label-width="170px" :disabled="chakanDis">
                <div class="old">
                  <el-col>
                    <el-form-item label="变更前是否境外公司">
                      <el-input v-model="oldCompany.FSFJWGS" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item label="变更前是否外资企业">
                      <el-input v-model="oldCompany.FSFWZQY" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item :label='oldNorY'>
                      <el-input v-model="oldCompany.FWZQYLX" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item label="变更前法人代表">
                      <el-input v-model="oldCompany.FLEGALPERSON"  :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item label="变更前执行事务合伙人">
                      <el-input v-model="oldCompany.FFZZAFFAIRWITHPERSON" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                </div>
                <div class="new">
                  <el-row>
                    <el-col>
                      <el-form-item label="变更后是否境外公司">
                        <el-select
                          placeholder="请选择"
                          v-model="FISOVERSEASCOMPANYNEW"
                          clearable>
                          <el-option
                            v-for="item in isFisS"
                            :key="item.FID"
                            :label="item.FNAME"
                            :value="item.FNUMBER"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item label="变更后是否外资企业">
                        <el-select 
                          placeholder="请选择"
                          v-model="FFORGFUNENTERPSNEW"
                          :disabled="isWZQY"
                          clearable>
                          <el-option
                            v-for="item in isFisS"
                            :key="item.FID"
                            :label="item.FNAME"
                            :value="item.FNUMBER"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item :label="newNorY">
                        <el-select 
                          placeholder="请选择" 
                          :disabled="isQYLX"
                          v-model="FOUTENTERPRISETYPENEW"
                          clearable>
                          <el-option
                            v-for="item in enterpriseTypeList"
                            :key="item.FID"
                            :label="item.FNAME" 
                            :value="item.FNUMBER"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item label="变更后法人代表">
                        <el-input 
                          :disabled="isLegal"
                          v-model="FLEGALPERSONNEW"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item label="变更后执行事务合伙人">
                        <el-input 
                          :disabled="isExecutive"
                          v-model="FFAIRPERSONNEW"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-form>
            </div>
          </div>
          <!--公司类型及公司性质  -->
          <div class="change_nature" v-if="typeSelectionChecked['6']">
            <h5 class="col-small-tit">公司类型及公司性质</h5>
            <div class="col-main clearfix">
              <el-form label-width="170px" :disabled="chakanDis">
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="变更前公司类型">
                      <el-input v-model="oldCompany.FGSLX" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="变更后公司类型">
                      <el-select 
                        v-model="FCOMPANYTYPENEW"
                        placeholder="请选择" clearable
                        @change="changeCompTypeOne(FCOMPANYTYPENEW)"
                      >
                        <el-option 
                            v-for="item in typeChange"
                            :key="item.FID"
                            :label="item.FNAME"
                            :value="item.FNUMBER"
                          ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row> 
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="变更前一级公司性质">
                      <el-input v-model="oldCompany.FYJGSXZ" :disabled="true" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="变更后一级公司性质">
                      <el-select v-model="FONECOMPANYNATURENEW" placeholder="请选择" clearable
                        @change="changeCompTypeTwo(FONECOMPANYNATURENEW, FCOMPANYTYPENEW)"
                      >
                        <el-option 
                            v-for="item in oneCompTypes"
                            :key="item.FID"
                            :label="item.FNAME" 
                            :value="item.FNUMBER"
                          ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="变更前二级公司性质">
                      <el-input v-model="oldCompany.FEJGSXZ" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="变更后二级公司性质">
                      <el-select v-model="FTWOCOMPANYNATURENEW" placeholder="请选择" clearable @change="changeCPTTwo(FTWOCOMPANYNATURENEW)">
                        <el-option 
                            v-for="item in twoCompTypes"
                            :key="item.FNUMBER"
                            :label="item.FNAME" 
                            :value="item.FNUMBER"
                          ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <!-- 所属区域集团/公司/事业部 -->
          <div class="change_attribution" v-if="typeSelectionChecked['7']">
            <h5 class="col-small-tit">所属区域集团/公司/事业部</h5>
            <div class="col-main">
              <el-form label-width="170px" :disabled="chakanDis">
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="变更前所属区域集团">
                      <el-input v-model="oldCompany.FSSQYJT" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="变更后所属区域集团">
                      <el-select 
                        v-model="FAREAGROUPNEW" 
                        placeholder="请选择" clearable
                        @change="changeRegGroup(FAREAGROUPNEW)"
                      >
                        <el-option 
                          v-for="item in regGroup"
                          :key="item.ID"
                          :label="item.NAME" 
                          :value="item.ID"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="变更前所属区域公司">
                      <el-input v-model="oldCompany.FSSQYGS" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="变更后所属区域公司">
                      <el-select 
                        v-model="AREACOMPANYNEW" 
                        placeholder="请选择" clearable
                        @change="changeRegCau(AREACOMPANYNEW)"
                      ><el-option 
                          v-for="item in regComp"
                          :key="item.ID"
                          :label="item.NAME" 
                          :value="item.ID"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="变更前所属事业部">
                      <el-input v-model="oldCompany.FSSSYB" :disabled="true" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="变更后所属事业部">
                      <el-select 
                        v-model="FBIZDEPARTMENTNEW" 
                        placeholder="请选择" clearable
                        @change="changeCause(FBIZDEPARTMENTNEW)"
                      >
                        <el-option
                          v-for="item in regCause"
                          :key="item.ID"
                          :label="item.NAME" 
                          :value="item.ID"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
           <!-- 印章保管人 -->
          <div class="change_sealKeeper" v-if="typeSelectionChecked['8']">
            <h5 class="col-small-tit">印章保管人</h5>
            <div class="col-main clearfix">
              <el-row>
                <el-form label-width="170px" :disabled="chakanDis">
                  <el-col :span="9">
                    <el-form-item label="变更前印章保管人">
                      <el-input v-model="oldCompany.FSEALPERSON" :disabled="true" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="变更后印章保管人">
                      <el-input v-model="newCompany.FSEALPERSONNEW" placeholder=""></el-input>
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-row>
            </div>
          </div>
           <!-- 证照保管人 -->
          <div class="change_licenseHolder" v-if="typeSelectionChecked['9']">
            <h5 class="col-small-tit">证照保管人</h5>
            <div class="col-main">
              <el-row>
                <el-form label-width="170px" :disabled="chakanDis">
                  <el-col :span="9">
                    <el-form-item label="变更前证照保管人">
                      <el-input v-model="oldCompany.FZZPERSON" :disabled="true" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="变更后证照保管人">
                      <el-input v-model="newCompany.FZZPERSONNEW" placeholder=""></el-input>
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-row>
            </div>
          </div>
          <!-- 资质情况 -->
          <div class="change_qualification" v-if="typeSelectionChecked['10']">
            <h5 class="col-small-tit">资质情况</h5>
            <div class="col-main">
              <el-form label-width="170px" :disabled="chakanDis">
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="变更前资质情况">
                      <el-input v-model="oldCompany.FAPTITUDESITUATION" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="变更后资质情况">
                      <el-select v-model="newCompany.FAPTITUDESITUATIONNEW" placeholder="请选择" clearable>
                        <el-option 
                          v-for="item in qualification"
                          :key="item.FID"
                          :label="item.FNAME" 
                          :value="item.FNUMBER"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <!-- 经营范围 -->
          <div class="change_businessScope" v-if="typeSelectionChecked['11']">
            <h5 class="col-small-tit">经营范围</h5>
            <div class="col-main clearfix">
              <el-row>
                <el-form label-width="170px" :disabled="chakanDis">
                  <el-col :span="9">
                    <el-form-item label="变更前经营范围">
                      <el-input v-model="oldCompany.FSCOPEOFOPERATION" :disabled="true" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="变更后经营范围">
                      <el-input v-model="newCompany.FSCOPEOFOPERATIONNEW" placeholder=""></el-input>
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-row>
            </div>
          </div>
          <!-- 投资方式     v-if="typeSelectionChecked['12']" -->
          <!-- <div class="change_invMethod" v-if="false">           
            <h5 class="col-small-tit">投资方式</h5>
            <div class="col-main">
              <el-row>
                <el-form  ref="newCompany" :model="newCompany" label-width="170px" :disabled="chakanDis">
                  <el-col :span="9">
                    <el-form-item label="变更前投资方式">
                      <el-input v-model="oldCompany.FTZFS" :disabled="true" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="变更后投资方式">
                      <el-select v-model="newCompany.FINVESTMENTMODENEW" placeholder="请选择" clearable>
                        <el-option 
                          v-for="item in investmentMethod"
                          :key="item.FID"
                          :label="item.FNAME" 
                          :value="item.FNUMBER"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-row>
            </div>
          </div> -->
          <!-- 注册地址 -->
          <div class="change_registeredAddress" v-if="typeSelectionChecked['13']">
            <h5 class="col-small-tit">注册地址</h5>
            <div class="col-main">
              <el-row>
                <el-form label-width="170px" :disabled="chakanDis">
                  <el-col :span="9">
                    <el-form-item label="变更前注册地址">
                      <el-input v-model="oldCompany.FCOMPANYADDRESS" :disabled="true" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="变更后注册地址">
                      <el-input v-model="newCompany.FCOMPANYADDRESSNEW" placeholder=""></el-input>
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-row>
            </div>
          </div>
          
          <!-- 注册资本 -->
          <div v-if="typeSelectionChecked['14']">
            <h5 class="col-small-tit">注册资本</h5>
            <div class="col-main">
              <el-row>
                <el-form label-width="170px" :disabled="chakanDis">
                <el-col :span="9">
                  <el-form-item label="变更前注册资本(万元)">
                    <el-input v-model="oldCompany.FREGISTEREDCAPITAL"  :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                    <el-form-item label="变更后注册资本(万元)">
                      <el-input v-model="FREGISTEREDCAPITALNEW" placeholder="" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                </el-form>
              </el-row>
            </div>
          </div>
          <!-- 认缴明细 -->
          <div v-if="typeSelectionChecked['14']">
            <h5 class="col-small-tit">认缴明细</h5>
            <div class="col-main">
              <el-table
                :data="subcribeList"
                :header-cell-style="{textAlign:'center',background:'#409eff',color:'#fff'}"
                :cell-style="{textAlign:'center'}"
                style="width: 100%">
                <el-table-column label="变更前">
                  <el-table-column
                    type="index"
                    label="序号"
                    width="60">
                  </el-table-column>
                  <el-table-column
                    prop="FPARTNERNAME"
                    label="股东名称"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    prop="FPARTNERNATURENAME"
                    label="股东公司性质"
                    width="250">
                  </el-table-column>
                  <el-table-column
                    prop="FSUBCRIBEMONEY"
                    label="认缴金额(万元)"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    prop="FSUBCRIBETIME"
                    label="认缴时间"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    prop="FCAPITALKEY"
                    label="出资比例"
                  >
                  </el-table-column>
                </el-table-column>
              </el-table>
              <p></p>
              <el-table
                :data="pledgeList"
                :header-cell-style="{textAlign:'center',background:'#409eff',color:'#fff'}"
                :cell-style="{textAlign:'center'}"
                style="width: 100%">
                <el-table-column label="变更后">
                  <el-table-column type="index" label="序号" width="60"></el-table-column>
                  <el-table-column prop="FPARTNER" label="股东名称" width="200">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.FPARTNER" clearable :disabled="chakanDis || delDisaledR" @change="getGDNatureR(scope.row, scope.$index)" filterable remote>
                        <el-option
                          v-for="items in fshareholdernameList"
                          :key="items.FID"
                          :label="items.FSHAREHOLDERNAME"
                          :value="items.FID">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="FPARTNERNATURENAME"
                    label="股东公司性质"
                    width="250">
                    <!-- <template slot-scope="scope">
                      <el-input
                        placeholder="请输入公司性质"
                        v-model="scope.row.FPARTNERNATURENAME"
                        type="text" disabled>
                      </el-input>
                    </template> -->
                  </el-table-column>
                  <el-table-column
                    prop="FSUBCRIBEMONEY"
                    label="认缴金额(万元)"
                    width="200">
                    <template slot-scope="scope">
                      <el-input
                        placeholder="请输入金额"
                        v-model="scope.row.FSUBCRIBEMONEY"
                        min="0" :disabled="chakanDis || delDisaledR"
                        type="number">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="FSUBCRIBETIME"
                    label="认缴时间"
                    width="200">
                    <template slot-scope="scope">
                      <el-date-picker
                        v-model="scope.row.FSUBCRIBETIME"
                        type="date" :disabled="chakanDis || delDisaledR"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                      ></el-date-picker>
                    </template> 
                  </el-table-column>
                  <el-table-column
                    prop="FCAPITALKEY"
                    label="出资比例"
                    width="150">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.FCAPITALKEY"
                        type="text" disabled></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    fixed="right"
                  ><template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="danger" :disabled="chakanDis || delDisaledR"
                        @click="deleteRowR(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
              <div  class="add-row addALine" v-show="!chakanDis && !delDisaledR" @click="add_aline_r"><i class="el-icon-plus" title="添加行"></i></div>
            </div>
          </div>
          <!-- 财务 --> 
          <div v-if="caiwuShow">
            <h3 class="col-tit">财务信息</h3>
            <!-- 合并范围 -->
            <div>
              <h5 class="col-small-tit">所属合并范围</h5>
              <div class="col-main">
                <el-form label-width="170px">
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="变更前所属合并范围">
                        <el-input v-model="oldCompany.FCOMBINERANGE" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9">
                      <el-form-item label="变更后所属合并范围">
                        <el-select v-model="FCOMBINERANGENEW" placeholder="请选择" clearable :disabled="caiwuDis">
                          <el-option 
                            v-for="item in mergeList"
                            :key="item.FID"
                            :label="item.FNAME" 
                            :value="item.FNUMBER"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
            <!--公司类别 -->
            <div v-show="HBDis">
              <h5 class="col-small-tit">公司类别</h5>
              <div class="col-main">
                <el-form label-width="170px">
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="变更前公司类别">
                        <el-input v-model="oldCompany.FCOMPANYTYPEB" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9">
                      <el-form-item label="变更后公司类别">
                        <el-select v-model="FCOMPANYTYPEBNEW" placeholder="请选择" clearable :disabled="caiwuDis">
                          <el-option
                            v-for="item in companytypesList"
                            :key="item.FID"
                            :label="item.FNAME" 
                            :value="item.FNUMBER"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
            <!-- 并表方 -->
            <div v-show="HBDis">
              <h5 class="col-small-tit">公司并表方</h5>
              <div class="col-main clearfix">
                <el-form label-width="170px">
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="变更前公司并表方">
                        <el-input v-model="oldCompany.FCOMPANYBBF" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9">
                      <el-form-item label="变更后公司并表方">
                        <el-select v-model="FCOMPANYBBFNEW" placeholder="请选择" clearable :disabled="caiwuDis">
                          <el-option 
                            v-for="item in companybbfList"
                            :key="item.FID"
                            :label="item.FNAME" 
                            :value="item.FNUMBER"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
          </div>
          <!-- 实缴明细 -->
          <div v-if="typeSelectionChecked['15']">
            <h5 class="col-small-tit">实缴明细</h5>
            <div class="col-main">
              <el-table
                :data="paidinList"
                :header-cell-style="{textAlign:'center',background:'#409eff',color:'#fff'}"
                :cell-style="{textAlign:'center'}"
                style="width: 100%">
                <el-table-column label="变更前">
                  <el-table-column
                    type="index"
                    label="序号"
                    width="60">
                  </el-table-column>
                  <el-table-column
                    prop="FPARTNERNAME"
                    label="股东名称"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    prop="FPARTNERNATURENAME"
                    label="股东公司性质"
                    width="250">
                  </el-table-column>
                  <el-table-column
                    prop="FPAIDINMONEY"
                    label="实缴金额(万元)"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    prop="FPAIDINTIME"
                    label="实缴时间"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    prop="FCAPITALKEY"
                    label="出资比例"
                  >
                  </el-table-column>
                </el-table-column>
              </el-table>
              <p></p>
              <el-table
                    :data="PayInList"
                    :header-cell-style="{textAlign:'center',background:'#409eff',color:'#fff'}"
                    :cell-style="{textAlign:'center'}"
                    style="width: 100%">
                    <el-table-column label="变更后">
                      <el-table-column type="index" label="序号" width="60"></el-table-column>
                      <el-table-column prop="FPARTNER" label="股东名称" width="200">
                        <template slot-scope="scope">
                          <el-select v-model="scope.row.FPARTNER" clearable :disabled="chakanDis" @change="getGDNatureS(scope.row, scope.$index)" filterable remote>
                            <el-option
                              v-for="(items, index) in SJGDselect"
                              :key="index"
                              :label="items.FPARTNERNAME"
                              :value="items.FPARTNER">
                            </el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="FPARTNERNATURENAME"
                        label="股东公司性质"
                        width="250">
                        <!-- <template slot-scope="scope">
                          <el-input
                            placeholder="请输入公司性质"
                            v-model="scope.row.FPARTNERNATURENAME" disabled
                            type="text">
                          </el-input>
                        </template> -->
                      </el-table-column>
                      <el-table-column
                        prop="FPAIDINMONEY"
                        label="实缴金额(万元)"
                        width="200">
                        <template slot-scope="scope">
                          <el-input
                            placeholder="请输入金额"
                            v-model="scope.row.FPAIDINMONEY"
                            min="0" :disabled="chakanDis"
                            type="number">
                          </el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="FPAIDINTIME"
                        label="实缴时间"
                        width="200">
                        <template slot-scope="scope">
                          <el-date-picker
                            v-model="scope.row.FPAIDINTIME"
                            type="date" :disabled="chakanDis"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                          >
                          </el-date-picker>
                        </template> 
                      </el-table-column>
                      <el-table-column
                        prop="FCAPITALKEY"
                        label="出资比例"
                        width="150">
                        <template slot-scope="scope">
                          <el-input
                            v-model="scope.row.FCAPITALKEY"
                            type="text" disabled>
                          </el-input>
                        </template>
                        
                      </el-table-column>
                      <el-table-column
                        label="操作"
                        fixed="right"
                      >
                        <template slot-scope="scope">
                          <el-button
                            size="mini" :disabled="chakanDis"
                            type="danger"
                            @click="deleteRowS(scope.$index, scope.row)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table-column>
                  </el-table>
              <div  class="add-row addALine" v-show="!chakanDis" @click="add_aline_s"><i class="el-icon-plus" title="添加行"></i></div>
            </div>
          </div>
          <!--股东信息-->
          <!-- <div class="col" v-if="typeSelectionChecked['15']"> -->
            <!-- <h3 class="col-tit">股东信息情况</h3> -->
            <!-- <div class="col-main"> -->
              <!-- 变更前 -->
              <!-- <div class="clearfix">
                <div class="table_title">变更前</div>
                <el-table
                  :data="subcribeList"
                  :header-cell-style="{textAlign:'center',background:'#409eff',color:'#fff'}"
                  :cell-style="{textAlign:'center'}"
                  style="width: 50%; float: left"
                >
                  <el-table-column label="工商股比">
                      <el-table-column
                        type="index"
                        label="序号"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="FPARTNERNAME"
                        label="股东名称"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="FPARTNERNATURENAME"
                        label="股东公司性质"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="FCAPITALKEY"
                        label="股比"
                      >
                      </el-table-column>
                  </el-table-column>
                </el-table>
                <el-table
                  :data="paidinList"
                  :header-cell-style="{textAlign:'center',background:'#409eff',color:'#fff'}"
                  :cell-style="{textAlign:'center'}"
                  style="width: 50%; float: left"
                >
                  <el-table-column label="财务股比">
                    <el-table-column
                      type="index"
                      label="序号"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="FPARTNERNAME"
                      label="股东名称"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="FPARTNERNATURENAME"
                      label="股东公司性质"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="FCAPITALKEY"
                      label="股比"
                    >
                    </el-table-column>
                  </el-table-column>
                </el-table>
              </div>
              <p></p> -->
              <!-- 变更后 -->
              <!-- <div class="clearfix">
                <div class="table_title">变更后</div>
                <el-table
                  :data="pledgeList"
                  :header-cell-style="{textAlign:'center',background:'#409eff',color:'#fff'}"
                  :cell-style="{textAlign:'center'}"
                  style="width: 50%; float: left"
                >
                  <el-table-column label="工商股比">
                      <el-table-column
                        type="index"
                        label="序号"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="nameN"
                        label="股东名称"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="xz"
                        label="股东公司性质"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="czbl"
                        label="股比"
                      >
                      </el-table-column>
                  </el-table-column>
                </el-table>
                <el-table
                  :data="PayInList"
                  :header-cell-style="{textAlign:'center',background:'#409eff',color:'#fff'}"
                  :cell-style="{textAlign:'center'}"
                  style="width: 50%; float: left"
                >
                  <el-table-column label="财务股比">
                    <el-table-column
                      type="index"
                      label="序号"
                    ></el-table-column>
                    <el-table-column
                      prop="nameN"
                      label="股东名称"
                    ></el-table-column>
                    <el-table-column
                      prop="xz"
                      label="股东公司性质"
                    ></el-table-column>
                    <el-table-column
                      prop="czbl"
                      label="股比"
                    ></el-table-column>
                  </el-table-column>
                </el-table>
              </div> -->
            <!-- </div> -->
          <!-- </div> -->
          <!-- 董,监，高任职情况 -->
          <div class="col" v-if="typeSelectionChecked['16']">
            <h3 class="col-tit">董,监，高任职情况</h3>
            <!-- 内部 -->
            <div>
              <h5 class="col-small-tit">内部董,监，高任职情况</h5>
              <div class="col-main">
                <el-table
                  :data="insideList"
                  :header-cell-style="{textAlign:'center',background:'#409eff',color:'#fff'}"
                  :cell-style="{textAlign:'center'}"
                  style="width: 100%"
                >
                  <el-table-column
                    label="变更前"
                  >
                    <el-table-column
                      prop="FPOSITIONNAME"
                      label="本公司职位"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="FPERSONNAME"
                      label="姓名"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="FZLPOSITIONNAME"
                      label="中梁职位"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="FAREABLOCNAME"
                      label="区域集团"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="FAREACOMPANYNAME"
                      label="区域公司"
                    >
                    </el-table-column>
                  </el-table-column>
                </el-table>
                <p></p>
                <el-table
                  :data="insidePosition"
                  :header-cell-style="{textAlign:'center',background:'#409eff',color:'#fff'}"
                  :cell-style="{textAlign:'center'}"
                  style="width: 100%"
                >
                  <el-table-column
                    label="变更后"
                  >
                    <el-table-column
                      prop="FPOSITION"
                      label="本公司职位"
                    >
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.FPOSITION" clearable :disabled="chakanDis">
                          <el-option
                            v-for="item in positionList"
                            :key="item.FNUMBER"
                            :label="item.FNAME"
                            :value="item.FNUMBER">
                          </el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="FPERSONNAME"
                      label="姓名"
                    >
                      <template slot-scope="scope">
                        <el-input
                          placeholder="请输入姓名"
                          type="text" :disabled="chakanDis"
                          v-model="scope.row.FPERSONNAME"
                        >
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="FZLPOSITIONNAME" label="中梁职位" >
                      <template slot-scope="scope">
                        <el-input
                          placeholder="请输入在中梁的职位"
                          type="text" :disabled="chakanDis"
                          v-model="scope.row.FZLPOSITIONNAME"
                        ></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="FAREABLOCNAME"
                      label="区域集团"
                    >
                      <template slot-scope="scope">
                        <el-input
                          placeholder="请输入所属区域集团"
                          type="text" :disabled="chakanDis"
                          v-model="scope.row.FAREABLOCNAME"
                        ></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="FAREACOMPANYNAME"
                      label="区域公司"
                    >
                      <template slot-scope="scope">
                        <el-input
                          placeholder="请输入所属区域公司"
                          type="text" :disabled="chakanDis"
                          v-model="scope.row.FAREACOMPANYNAME"
                        ></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="操作"
                    >
                      <template slot-scope="scope">
                        <el-button
                              size="mini"
                              type="danger" :disabled="chakanDis"
                              @click="deleteRowInsidePosition(scope.$index, scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>
                <div class="add-row addALine" v-show="!chakanDis" @click="add_aline_Position"><i class="el-icon-plus" title="添加行"></i></div>
              </div>
            </div>
            <!-- 外部 -->
            <div>
              <h5 class="col-small-tit">外部董,监，高任职情况</h5>
              <div class="col-main">
                <el-table
                  :data="outerList"
                  :header-cell-style="{textAlign:'center',background:'#409eff',color:'#fff'}"
                  :cell-style="{textAlign:'center'}"
                  style="width: 100%"
                >
                  <el-table-column
                    label="变更前"
                  >
                    <el-table-column
                      prop="FPOSITIONNAME"
                      label="本公司职位"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="FPERSONNAME"
                      label="姓名"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="FDELEGATENAME"
                      label="委派方"
                    >
                    </el-table-column>
                  </el-table-column>
                </el-table>
                <p></p>
                <el-table
                  :data="outerPosition"
                  :header-cell-style="{textAlign:'center',background:'#409eff',color:'#fff'}"
                  :cell-style="{textAlign:'center'}"
                  style="width: 100%"
                >
                  <el-table-column
                    label="变更后"
                  >
                    <el-table-column
                      prop="FPOSITION"
                      label="本公司职位"
                    >
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.FPOSITION" clearable :disabled="chakanDis">
                          <el-option
                            v-for="item in positionList"
                            :key="item.FNUMBER"
                            :label="item.FNAME"
                            :value="item.FNUMBER">
                          </el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="FPERSONNAME"
                      label="姓名"
                    >
                      <template slot-scope="scope">
                        <el-input
                          placeholder="请输入姓名"
                          type="text" :disabled="chakanDis"
                          v-model="scope.row.FPERSONNAME"
                        >
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="FDELEGATE"
                      label="委派方"
                    >
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.FDELEGATE" clearable :disabled="chakanDis" filterable remote>
                          <el-option
                            v-for="(item, index) in weipaifangList"
                            :key="index"
                            :label="item.FNAME"
                            :value="item.FID">
                          </el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        fixed="right"
                      >
                        <template slot-scope="scope">
                          <el-button
                            size="mini"
                            type="danger" :disabled="chakanDis"
                            @click="deleteRowOuterPosition(scope.$index, scope.row)">删除</el-button>
                        </template>
                      </el-table-column>
                  </el-table-column>
                </el-table>
                <div class="add-row addALine" v-show="!chakanDis" @click="add_aline_outerPosition"><i class="el-icon-plus" title="添加行"></i></div>
              </div>
            </div>
            <div class="col-main clearfix">

            </div>
          </div>
          <!-- 附件 -->
          <div class="col" v-if="fileShow">
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
                <el-button slot="trigger" size="small" type="primary"  v-show="isDelFile">选取文件</el-button>
              </el-upload>
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
                  <template slot-scope="scope">
                    <el-button @click="download(scope.row)" type="text" size="small">下载</el-button>
                    <el-button @click="dels(scope.row)" v-show="scope.row.FNAME == $store.state.user.name&&tijiao" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </el-main>
      <div class="btn2-col">
        <el-button type="danger" v-if="bohui" @click="rejectAN">驳回</el-button>
        <el-button type="primary" @click="save" v-if="baocun">保存</el-button>
        <el-button type="primary" @click="subM" v-if="tijiao">提交</el-button>
        <el-button type="primary" @click="quxiao">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import {
  tableget,
  tablelist,
  dt,
  filingFormInfo,
  changegetcompany,
  changeCompanyType,
  getRegComp,
  getRegCause,
  postSave,
  fileUpLoad,
  getEnterpriseType,
  delChangeList,
  reject,
  upload,
  getNature
} from "@/api/changetable";
export default {
  name: "changetable",
  data() {
    return {
      //查询
      // shuzu
      queryList: {},
      qyComList: [],
      queryForm: {
        //所属区域集团
        qyjt: '',
        //所属区域公司
        qygs: '',
        //公司名称
        gsname: '',
        //单据状态
        djzt: '',
        //变更类型
        bglx: '',
        //开始时间
        staTime: '',
        //结束时间
        endTime: '',
      },

      url: "/dst/fileController/upload", // 附件上传地址url
      loadingTable: true, // loading等待
      files: "", // 附件
      listFid: "", // 列表对应每条的fid
      fid: "",
      bohui: false, // 驳回按钮显示隐藏
      baocun: true, // 保存按钮显示隐藏
      tijiao: true, // 提交按钮显示隐藏
      copName: false, // 弹窗公司disabled状态
      changeTime: true, // 变更备案完成时间显示隐藏
      options2: [], // 外层查询所属区域公司列表下拉
      value2: "", // 外层查询所属区域公司model值
      chakanDis: false, // 控制查看,编辑,新增下拉,input框等等的disabled状态
      delDisaledR: false, // 认缴删除
      isChakanTime: false, // 变更备案完成时间disabled状态
      addFlag: false, // 新增按钮显示隐藏
      FGSCHANGETIME: "",
      isWZQY: true, // 是否外资企业disabled
      isQYLX: true, // 企业类型disabled
      newNorY: "变更后外资企业类型", // 变更后外资或内资
      oldNorY: "变更前外资企业类型", // 变更前内资或外资
      changeTypeChecked: false,
      caiwuDis: false,
      HBDis: true,
      fileShow: false,
      alertType: '',
      //查询显示数据
      tableData: [],
      // 表格分页当前页数
      currentPage: 1,
      //总数 后台给传过来
      pages: 1,
      //弹出层数据集
      // 填写人信息
      applicantform: {
        username: "", //填写人
        writetime: "", //填写时间
        company: "", //填写公司
        companyList: []
      },
      // 所选公司的id
      compID: "",
      // 变更类型显隐
      companyNameSelection: false,
      //选择变更类型
      typeSelection: {
        selected: [], //选中项
        types: []
      },
      // 控制选择变更对应显示隐藏
      typeSelectionChecked: {},
      // 财务信息显示隐藏
      caiwuShow: false,
      // 变更前公司信息
      oldCompany: {},
      // 变更后公司信息

      FISOVERSEASCOMPANYNEW: "", // 是否境外公司
      FFORGFUNENTERPSNEW: "", // 是否外资企业
      FOUTENTERPRISETYPENEW: "", // 内,外资企业类型
      FLEGALPERSONNEW: "", // 法人代表
      FFAIRPERSONNEW: "", // 执行事务合伙人

      FREGISTEREDCAPITALNEW: "",
      // 所属区域集团/公司/事业部
      FAREAGROUPNEW: "", // 所属区域集团
      AREACOMPANYNEW: "", // 所属区域公司
      FBIZDEPARTMENTNEW: "", // 所属事业部

      FCOMPANYTYPENEW: "", // 公司类型
      FONECOMPANYNATURENEW: "", // 一级公司性质
      FTWOCOMPANYNATURENEW: "", // 二级公司性质
      // 财务信息
      FCOMBINERANGENEW: "",
      FCOMPANYTYPEBNEW: "",
      FCOMPANYBBFNEW: "",

      newCompany: {
        FCOMPANYNEW: "", // 公司名称
        FREGISTEREDCAPITALNEW: "", // 注册资本
        FMONEYTYPENEW: "", // 币种
        FPARTNERSHIP: "", // 经营合伙期限

        // 企业类型及代表
        FISOVERSEASCOMPANYNEW: "", // 是否境外公司
        FFORGFUNENTERPSNEW: "", // 是否外资企业
        FOUTENTERPRISETYPENEW: "", // 内,外资企业类型
        FLEGALPERSONNEW: "", // 法人代表
        FFAIRPERSONNEW: "", // 执行事务合伙人

        // 公司类型及性质
        FCOMPANYTYPENEW: "", // 公司类型
        FONECOMPANYNATURENEW: "", // 一级公司性质
        FTWOCOMPANYNATURENEW: "", // 二级公司性质
        // 所属区域集团/公司/事业部
        FAREAGROUPNEW: "", // 所属区域集团
        AREACOMPANYNEW: "", // 所属区域公司
        FBIZDEPARTMENTNEW: "", // 所属事业部

        FSEALPERSONNEW: "", // 印章保管人
        FZZPERSONNEW: "", // 证照保管人
        FAPTITUDESITUATIONNEW: "", // 资质情况
        FSCOPEOFOPERATIONNEW: "", // 经营范围
        FINVESTMENTMODENEW: "", // 投资方式
        FCOMPANYADDRESSNEW: "", // 注册地址
        // 财务信息
        FCOMBINERANGENEW: "",
        FCOMPANYTYPEBNEW: "",
        FCOMPANYBBFNEW: "",

        // 是否工商重大财务变更
        FGSCHANGE: "否",
        FZDCHANGE: "否",
        FCWCHANGE: "否",
        FGSCHANGETIME: "",

        FREMARKNEW: "", // 备注
        isFREMARKNEW: false,
        FYZADMIN: '', // 印章管理员
        // isFYZADMIN: false, // 印章管理员disabled
      },
      // 币种
      currency: [],
      // 经营合伙期限
      fpartnerTime: [],
      // 是否下拉
      isFisS: [],
      // 一级公司性质
      oneCompTypes: [],
      // 二级公司性质
      twoCompTypes: [],
      // 区域集团
      regGroup: [],
      // 区域公司
      regComp: [],
      // 区域事业部
      regCause: [],
      // 变更类型
      typeChange: [],
      // 资质情况
      qualification: [],
      // 投资方式
      investmentMethod: [],
      // 是否外资企业
      isForeign: true,
      // 外资企业类型
      isForeignType: true,
      // 内资企业类型
      isFundedType: true,
      // 法人代表
      isLegal: true,
      // 执行事务合伙人
      isExecutive: true,
      // 外资内资企业类型
      enterpriseTypeList: [],
      // 所属合并范围
      mergeList: [],
      companytypesList: [],
      companybbfList: [],
      // 认缴明细变更前
      subcribeList: [],
      // 认缴明细变更后
      pledgeList: [],
      // 实缴明细变更前
      paidinList: [],
      // 实缴明细变更后
      PayInList: [],
      // 认缴 股东下拉
      fshareholdernameList: [],
      // 实缴 股东下拉
      SJGDselect: [],
      // 董,监，高任职情况 变更前
      insideList: [], // 内部
      outerList: [], // 外部
      // 董,监，高任职情况 变更后
      insidePosition: [], // 内部
      outerPosition: [], // 外部

      weipaifangList: [],

      positionList: [],

      formInline: {
        user: "",
        region: "",
        selected: [],
        types: []
      },
      shareholder: [], // 股东信息,变更前
      dialogFormVisible: false,

      btn: true,
      fileData: [],
      form: {
        name: "",
        time: ""
      },
      fileFid: "",
      fileList: [],
      count: 1,
      isDelFile: true,
    };
  },
  methods: {
    // 查看bpm流程
    lookLiuCheng (url) {
      window.open(url);
    },
    // 附件管理----------------------------------------------------------------------
    timeStamp(cellValue) {
      var date = new Date(cellValue); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate();
      return Y + M + D;
    },
    // 文件列表获取
    getFilelist(fid) {
      Vue.http.get("fileController/list?fid=" + fid).then(res => {
        this.fileData = res.body.data.list;
        for (let i = 0; i < this.fileData.length; i++) {
          this.fileData[i].FCREATETIME = this.timeStamp(
            this.fileData[i].FCREATETIME
          );
        }
      });
    },
    //文件列表下载
    download(row) {
      window.open("/dst/fileController/downloads?fid=" + row.FID);
    },
    // 文件列表删除
    dels(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Vue.http.get("fileController/delet?fid=" + row.FID).then(res => {
            this.getFilelist(this.fileFid);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    OnChange(file, fileList) {
      this.fileList = fileList;
    },
    OnRemove(file, fileList) {
      this.fileList = fileList;
    },
    beforeUpload(file, filelist) {
      this.files = file; //file对象
      this.fileName = file.name;
    },
    handlePreview(file) {
      // alert(file.url);
    },
    //为表格设置样式
    isCenter({ row, column, rowIndex, columnIndex }) {
      return "text-align:center";
    },
    //为表头设置样式
    istabtop({ row, column, rowIndex, columnIndex }) {
      return "text-align:center;background-color:#409eff;color:#fff;";
    },
    // 文件上传
    onSubmit1(fid, params) {
      const parmaData = new FormData();
      console.log(fid, 'fid')
      this.form = {
        fid,
        y: '1'
      };
      let file = "";
      let uid = "";
      for (let x in this.form) {
        parmaData.append(x, this.form[x]);
      }
      if (!!this.fileList) {
        for (let i = 0; i < this.fileList.length; i++) {
          file = "file" + this.count;
          this.count++;
          parmaData.append(file, this.fileList[i].raw);
          parmaData.append(uid, this.fileList[i].uid);
        }
        Vue.http
          .post("fileController/upload", parmaData, {
            headers: {
              "Content-Type": "Multipart/form-data"
            }
          }).then(res => {
            if (res.body.code == "999") {
              this.listFid = res.body.data.fid;
              params.fid = res.body.data.fid;
              // 保存提交
              postSave(params).then(res => {
                console.log(res, '保存提交');
                if (res.body.code == "999") {
                  this.dialogFormVisible = false; // 关闭弹窗,
                  this.queryBottom();             // 刷新列表
                } else {
                  this.$message.error('提交失败');
                }
              })
            }
          });
      } else {
        console.log("没有新文件");
      }
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
    // --------------------------------------------------

    //查询查询列表上方的数据
    queryTop() {
      tableget().then(res => {
        if (res.body.code == "999") {
          //变更类型changeTypeList区域类型
          this.queryList = res.body.data;
          this.addFlag = res.body.data.flag;
        }
      });
    },
    //表格分页设置
    handleCurrentChange(val) {
      console.log(val)
      this.currentPage = val;
      this.queryBottom();
    },
    //查询表格
    queryBottom() {
      let param = {
        districtGroup: this.queryForm.qyjt,
        districtCompany: this.queryForm.qygs,
        companyName: this.queryForm.gsname,
        billstatus: this.queryForm.djzt,
        changetype: this.queryForm.bglx,
        starttime: this.queryForm.staTime,
        endtime: this.queryForm.endTime,
        pages: this.currentPage
      };
      tablelist(param).then(res => {
        if (res.body.code == "999") {
          console.log(res.body, '123456')
          this.pages = Number(res.body.data.size);
          this.tableData = [];
          this.tableData = res.body.data.changeList;
          this.loadingTable = false;
        }
      });
    },
    //第一查询变更列表
    onQuery(formName) {
      //点击查询时显示数据
      this.queryBottom();
    },
    //删除查询
    handleDelete(index, fid) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //请求数据删除表中数据
          let param = {
            companyid: fid
          };
          delChangeList(param).then(res => {
            if (res.body.code == "999") {
              this.tableData.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              this.$message.error('删除失败');
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    },
    deleteRowR(index, rows) {
      this.pledgeList.splice(index, 1);
      this.sjgdGetSelect();
    },
    deleteRowS(index, rows) {
      this.PayInList.splice(index, 1);
    },
    deleteRowInsidePosition(index, rows) {
      this.insidePosition.splice(index, 1);
    },
    deleteRowOuterPosition(index, rows) {
      this.outerPosition.splice(index, 1);
    },
    // 新增变更弹出页面
    // 变更类型点击对应显示隐藏
    changeChecked(val, e) {
      if(this.typeSelection.selected.length != 0) {
        this.fileShow = true;
      } else {
        this.fileShow = false;
      }
      this.typeSelectionChecked[e] = val;
      let zhongdaArr = ["2", "3", "5", "14", "18"];
      let gongsArr = ["1", "2", "3", "4", "5", "11", "13", "14", "16", "18"];
      for (let i = 0; i < zhongdaArr.length; i++) {
        if (this.typeSelection.selected.indexOf(zhongdaArr[i]) != "-1") {
          this.newCompany.FZDCHANGE = "是";
          this.newCompany.FGSCHANGE = "是";
          break;
        } else {
          this.newCompany.FZDCHANGE = "否";
        }
      }
      for (let i = 0; i < gongsArr.length; i++) {
        if (this.typeSelection.selected.indexOf(gongsArr[i]) != "-1") {
          this.newCompany.FGSCHANGE = "是";
          break;
        } else {
          this.newCompany.FGSCHANGE = "否";
        }
      }
      if (this.typeSelection.selected.indexOf("14") != "-1") {
        this.newCompany.FCWCHANGE = "是";
      } else {
        this.newCompany.FCWCHANGE = "否";
      }
    },
    // 新增变更选择公司以后匹配对应的公司信息
    conpanyNameChange(companyid, fid) {
      this.clearMain();
      this.getAlertInfo(companyid, fid);
    },
    // 弹窗弹出初始获取数据
    getAlertInfo(companyid, fid, button) {
      let params = {
        companyid,
        fid
      };
      this.listFid = fid;
      changegetcompany(params).then(res => {
        if (res.body.code == "999") {
          let resd = res.body.data;
          console.log(resd, "初始化数据");
          if (resd) {
            this.newCompany.FGSCHANGE = "否";
            this.newCompany.FZDCHANGE = "否";
            this.newCompany.FCWCHANGE = "否";
            this.applicantform.username = resd.username;
            this.applicantform.writetime = resd.wrtietime;
            // 变更之前所有数据
            this.oldCompany = resd.companyList[0];
            if (this.alertType == "chakan") {
              this.changeTypeChecked = false;
            } else {
              if (resd.page == "node1") {
                this.changeTypeChecked = true;
              } else {
                this.changeTypeChecked = false;
              }
            }
            if (resd.page == "node1") {
              this.changeTime = false;
              this.chakanDis = false;
              // this.isFYZADMIN = false;
              // this.isDelFile = true;
            } else {
              this.chakanDis = true;
              this.changeTime = true;
              // this.isFYZADMIN = true;
              // this.isDelFile = false;
            }
            if (resd.page == 'node2') {
              this.delDisaledR = true;
            } else {
              this.delDisaledR = false;
            }

            if (resd.page == "node3") {
              button == "2" ? (this.bohui = false) : (this.bohui = true);
              resd.companychange.indexOf("14") ? (this.caiwuShow = true) : (this.caiwuShow = false);
              this.isFREMARKNEW = true;
              this.isChakanTime = true;
            } else {
              this.bohui = false;
              // this.isChakanTime = false;
              this.caiwuShow = false;
            }

            
            this.pledgeList = [];
            this.PayInList = [];
            if (companyid != "") {
              // 新增
              this.companyNameSelection = true;
              this.FBIZDEPARTMENTNEW = "";
              this.regCause = [];
              this.FTWOCOMPANYNATURENEW = "";
              this.twoCompTypes = [];
            } else {
              this.companyNameSelection = false;
            }
            this.typeSelection.types = resd.changetypeList; // 所有的变更类型
            // 暂定 对应显示隐藏
            for (let i = 0; i < resd.changetypeList.length; i++) {
              let key = resd.changetypeList[i].FNUMBER;
              let val = false;
              this.typeSelectionChecked[key] = val;
            }
            
            if (resd.companychange.length > 0) {
              this.fileShow = true;
            } else {
              this.fileShow = false;
            }
            if (fid != "") {
              // 编辑
              this.companyNameSelection = true;
              for (let i = 0; i < resd.companychange.length; i++) {
                this.typeSelection.selected.push(resd.companychange[i].FTYPEID); // 改变的变更类型
                this.typeSelectionChecked[resd.companychange[i].FTYPEID] = true;
              }
              this.newCompany = resd.companyChangeList[0];
              // 所属区域集团公司事业部
              // FAREAGROUPNEW
              // AREACOMPANYNEW
              // FBIZDEPARTMENTNEW
              for (let i = 0; i < resd.districtGroupList.length; i++) {
                if (
                  resd.districtGroupList[i].ID ==
                  resd.companyChangeList[0].FAREAGROUPNEW
                ) {
                  this.FAREAGROUPNEW = resd.districtGroupList[i].NAME;
                  this.newCompany.FAREAGROUPNEW = resd.districtGroupList[i].ID;
                }
              }
              let param1 = {
                areagroupid: resd.companyChangeList[0].FAREAGROUPNEW
              };
              getRegComp(param1).then(res => {
                if (res.body.code == "999") {
                  this.regComp = res.body.data;
                  for (let i = 0; i < res.body.data.length; i++) {
                    if (
                      res.body.data[i].ID ==
                      resd.companyChangeList[0].AREACOMPANYNEW
                    ) {
                      this.AREACOMPANYNEW = res.body.data[i].NAME;
                      this.newCompany.AREACOMPANYNEW = res.body.data[i].ID;
                    }
                  }
                }
              });
              let param2 = {
                areacompanyid: resd.companyChangeList[0].AREACOMPANYNEW
              };
              getRegCause(param2).then(res => {
                if (res.body.code == '999') {
                  this.regCause = res.body.data;
                  if(!!res.body.data) {
                    for (let i = 0; i < res.body.data.length; i++) {
                      if (
                        res.body.data[i].ID ==
                        resd.companyChangeList[0].FBIZDEPARTMENTNEW
                      ) {
                        this.FBIZDEPARTMENTNEW = res.body.data[i].NAME;
                        this.newCompany.FBIZDEPARTMENTNEW = res.body.data[i].ID;
                      }
                    }
                  }
                }
              });

              // this.newCompany.FAREAGROUPNEW = resd.companyChangeList[0].FAREAGROUPNEW;
              // this.newCompany.AREACOMPANYNEW = resd.companyChangeList[0].AREACOMPANYNEW;
              // this.FBIZDEPARTMENTNEW = resd.companyChangeList[0].FBIZDEPARTMENTNEW;


              // 公司类型公司性质
              if(!!resd.companytypeList) {
                for (let i = 0; i < resd.companytypeList.length; i++) {
                  if (resd.companytypeList[i].FNUMBER == resd.companyChangeList[0].FCOMPANYTYPENEW) {
                    this.FCOMPANYTYPENEW = resd.companytypeList[i].FNUMBER;
                    this.newCompany.FCOMPANYTYPENEW = resd.companytypeList[i].FNUMBER;
                  }
                }
              }
              let param3 = {
                superiorcode: resd.companyChangeList[0].FCOMPANYTYPENEW,
                superiortype: "COMPANY_TYPE"
              };
              changeCompanyType(param3).then(res => {
                if (res.body.code == "999") {
                  this.oneCompTypes = res.body.data.typeList;
                  for (let i = 0; i < res.body.data.typeList.length; i++) {
                    if (
                      res.body.data.typeList[i].FNUMBER ==
                      resd.companyChangeList[0].FONECOMPANYNATURENEW
                    ) {
                      this.FONECOMPANYNATURENEW = res.body.data.typeList[i].FNUMBER;
                      this.newCompany.FONECOMPANYNATURENEW = res.body.data.typeList[i].FNUMBER;
                    }
                  }
                }
              });
              let param4 = {
                superiorcode: resd.companyChangeList[0].FCOMPANYTYPENEW,
                superiortype: resd.companyChangeList[0].FONECOMPANYNATURENEW,
                type: 'type'
              };
              changeCompanyType(param4).then(res => {
                if (res.body.code == "999") {
                  this.twoCompTypes = res.body.data.typeList; // 就是变更公司类型对应的一级公司性质
                  for (let i = 0; i < res.body.data.typeList.length; i++) {
                    if (
                      res.body.data.typeList[i].FNUMBER == resd.companyChangeList[0].FTWOCOMPANYNATURENEW ) {
                      this.FTWOCOMPANYNATURENEW = res.body.data.typeList[i].FNUMBER;
                      this.newCompany.FTWOCOMPANYNATURENEW = res.body.data.typeList[i].FNUMBER;
                    }
                  }
                }
              });

              // this.newCompany.FCOMPANYTYPENEW = resd.companyChangeList[0].FCOMPANYTYPENEW;
              // this.newCompany.FONECOMPANYNATURENEW = resd.companyChangeList[0].FONECOMPANYNATURENEW;
              // this.FTWOCOMPANYNATURENEW = resd.companyChangeList[0].FTWOCOMPANYNATURENEW;
              // 公司类型及代表
              this.FISOVERSEASCOMPANYNEW =
                resd.companyChangeList[0].FISOVERSEASCOMPANYNEW;
              this.FFORGFUNENTERPSNEW =
                resd.companyChangeList[0].FFORGFUNENTERPSNEW;
              this.FOUTENTERPRISETYPENEW =
                resd.companyChangeList[0].FOUTENTERPRISETYPENEW;
              this.FLEGALPERSONNEW = resd.companyChangeList[0].FLEGALPERSONNEW;
              this.FFAIRPERSONNEW = resd.companyChangeList[0].FFAIRPERSONNEW;

              // this.newCompany.FAPTITUDESITUATIONNEW = resd.companyChangeList[0].FAPTITUDESITUATIONNEW; // 资质情况
              // this.newCompany.FINVESTMENTMODENEW = resd.companyChangeList[0].FINVESTMENTMODENEW;  // 投资方式

              this.applicantform.company = resd.companyList[0].FCOMPANY;
              if (resd.companyChangeList[0].FGSCHANGETIME) {
                this.FGSCHANGETIME = resd.companyChangeList[0].FGSCHANGETIME;
              }
              if (resd.companyChangeList[0].FPARTNERSHIP != null) {
                this.fpartnerTime = JSON.parse(
                  resd.companyChangeList[0].FPARTNERSHIP
                );
              }
              // 编辑时所属集团公司事业部回显对应下拉 -------等后台接口调完直接能用
              // if (resd.companytypesList[0].FAREAGROUPNEW) {
              //   this.getRegGroup(resd.companytypesList[0].FAREAGROUPNEW);
              // }
              // if (resd.companytypesList[0].AREACOMPANYNEW) {
              //   this.getRegCau(resd.companytypesList[0].AREACOMPANYNEW);
              // }
            }
            if (!resd.subcribeChangeList.length && resd.page == 'node1' && !(JSON.stringify(resd.companychange).indexOf(JSON.stringify({FTYPEID:'14'})) > -1)) {    // 认缴变更后为空的情况
              for (let i = 0; i < resd.subcribeList.length; i++) {
                this.pledgeList.push({
                  FPARTNERNAME: resd.subcribeList[i].FPARTNERNAME,
                  FPARTNER: resd.subcribeList[i].FPARTNER,
                  FPARTNERNATURENAME: resd.subcribeList[i].FPARTNERNATURENAME,
                  FSUBCRIBEMONEY: resd.subcribeList[i].FSUBCRIBEMONEY,
                  FCAPITALKEY: resd.subcribeList[i].FCAPITALKEY,
                  FSUBCRIBETIME: resd.subcribeList[i].FSUBCRIBETIME,
                  disabled: false,
                });
                this.shareholder.push({
                  busName: resd.subcribeList[i].FPARTNERNAME,
                  busNature: resd.subcribeList[i].FPARTNERNATURENAME,
                  busScale: resd.subcribeList[i].FCAPITALKEY
                });
              }
            } else {        // 非空的情况
              for (let i = 0; i < resd.subcribeChangeList.length; i++) {
                this.pledgeList.push({
                  FPARTNERNAME: resd.subcribeChangeList[i].FPARTNERNAME,
                  FPARTNER: resd.subcribeChangeList[i].FPARTNER,
                  FPARTNERNATURENAME: resd.subcribeChangeList[i].FPARTNERNATURENAME,
                  FSUBCRIBEMONEY: resd.subcribeChangeList[i].FSUBCRIBEMONEY,
                  FCAPITALKEY: resd.subcribeChangeList[i].FCAPITALKEY,
                  FSUBCRIBETIME: resd.subcribeChangeList[i].FSUBCRIBETIME,
                  disabled: false,
                });
                this.shareholder.push({
                  busName: resd.subcribeChangeList[i].FPARTNERNAME,
                  busNature: resd.subcribeChangeList[i].FPARTNERNATURENAME,
                  busScale: resd.subcribeChangeList[i].FCAPITALKEY
                });
              }
            }
            if (!resd.paidinChangeList.length && resd.page == 'node1' && !(JSON.stringify(resd.companychange).indexOf(JSON.stringify({FTYPEID:'15'})) > -1)) {    // 实缴变更后为空的情况
              for (let i = 0; i < resd.paidinList.length; i++) {
                this.PayInList.push({
                  FPARTNERNAME: resd.paidinList[i].FPARTNERNAME,
                  FPARTNER: resd.paidinList[i].FPARTNER,
                  FPARTNERNATURENAME: resd.paidinList[i].FPARTNERNATURENAME,
                  FPAIDINMONEY: resd.paidinList[i].FPAIDINMONEY,
                  FCAPITALKEY: resd.paidinList[i].FCAPITALKEY,
                  FPAIDINTIME: resd.paidinList[i].FPAIDINTIME
                });
                this.shareholder.push({
                  busName: resd.paidinList[i].FPARTNERNAME,
                  busNature: resd.paidinList[i].FPARTNERNATURENAME,
                  busScale: resd.paidinList[i].FCAPITALKEY
                });
              }
            } else {
              for (let i = 0; i < resd.paidinChangeList.length; i++) {
                this.PayInList.push({
                  FPARTNERNAME: resd.paidinChangeList[i].FPARTNERNAME,
                  FPARTNER: resd.paidinChangeList[i].FPARTNER,
                  FPARTNERNATURENAME: resd.paidinChangeList[i].FPARTNERNATURENAME,
                  FPAIDINMONEY: resd.paidinChangeList[i].FPAIDINMONEY,
                  FCAPITALKEY: resd.paidinChangeList[i].FCAPITALKEY,
                  FPAIDINTIME: resd.paidinChangeList[i].FPAIDINTIME,
                });
                this.shareholder.push({
                  busName: resd.paidinChangeList[i].FPARTNERNAME,
                  busNature: resd.paidinChangeList[i].FPARTNERNATURENAME,
                  busScale: resd.paidinChangeList[i].FCAPITALKEY
                });
              }
            }

            if (!resd.insideChangeList.length && resd.page == 'node1' && !(JSON.stringify(resd.companychange).indexOf(JSON.stringify({FTYPEID:'16'})) > -1)) {    // 内部董监高变更后为空
              for (let i = 0; i < resd.insideList.length; i++) {
                this.insidePosition.push({
                  FPOSITION: resd.insideList[i].FPOSITION,
                  FPOSITIONNAME: resd.insideList[i].FPOSITIONNAME,
                  FPERSONNAME: resd.insideList[i].FPERSONNAME,
                  FZLPOSITIONNAME: resd.insideList[i].FZLPOSITIONNAME,
                  FAREABLOCNAME: resd.insideList[i].FAREABLOCNAME,
                  FAREACOMPANYNAME: resd.insideList[i].FAREACOMPANYNAME
                });
              }
            } else {
              for (let i = 0; i < resd.insideChangeList.length; i++) {
                this.insidePosition.push({
                  FPOSITION: resd.insideChangeList[i].FPOSITION,
                  FPOSITIONNAME: resd.insideChangeList[i].FPOSITIONNAME,
                  FPERSONNAME: resd.insideChangeList[i].FPERSONNAME,
                  FZLPOSITIONNAME: resd.insideChangeList[i].FZLPOSITIONNAME,
                  FAREABLOCNAME: resd.insideChangeList[i].FAREABLOCNAME,
                  FAREACOMPANYNAME: resd.insideChangeList[i].FAREACOMPANYNAME
                });
              }
            }

            if (!resd.outsideChangeList.length && resd.page == 'node1' && !(JSON.stringify(resd.companychange).indexOf(JSON.stringify({FTYPEID:'16'})) > -1)) {     //外部董监高变更后为空
              for (let i = 0; i < resd.outsideList.length; i++) {
                this.outerPosition.push({
                  FPOSITION: resd.outsideList[i].FPOSITION,
                  FPERSONNAME: resd.outsideList[i].FPERSONNAME,
                  FDELEGATE: resd.outsideList[i].FDELEGATE
                });
              }
            } else {
               for (let i = 0; i < resd.outsideChangeList.length; i++) {
                this.outerPosition.push({
                  FPOSITION: resd.outsideChangeList[i].FPOSITION,
                  FPERSONNAME: resd.outsideChangeList[i].FPERSONNAME,
                  FDELEGATE: resd.outsideChangeList[i].FDELEGATE
                });
              }
            }

            if (this.oldCompany.FSFWZQY == "是") {
              this.oldNorY = "变更前外资企业类型";
            } else {
              this.oldNorY = "变更前内资企业类型";
            }

            // 币种
            for (let i = 0; i < resd.currencyList.length; i++) {
              resd.companyList[0].FMONEYTYPE == resd.currencyList[i].FNUMBER
                ? (this.oldCompany.FMONEYTYPE = resd.currencyList[i].FNAME)
                : "";
            }
            // 资质情况变更前 FAPTITUDESITUATION
            for (let i = 0; i < resd.qualificationsList.length; i++) {
              if (
                resd.qualificationsList[i].FNUMBER ==
                resd.companyList[0].FAPTITUDESITUATION
              ) {
                this.oldCompany.FAPTITUDESITUATION =
                  resd.qualificationsList[i].FNAME;
              }
            }
            // 企业类型及代表
            // 是否境外公司   是否外资企业
            // for (let i = 0; i < resd.IsenableList.length; i ++) {
            //   resd.companyList[0].FISOVERSEASCOMPANY == resd.IsenableList[i].FNUMBER ? this.oldCompany.FISOVERSEASCOMPANY = resd.IsenableList[i].FNAME : '';
            //   resd.companyList[0].FISFOREIGNENTERPRISE == resd.IsenableList[i].FNUMBER ? this.oldCompany.FISFOREIGNENTERPRISE = resd.IsenableList[i].FNAME : '';
            // }
            this.compID = resd.companyList[0].FID;
            // 经营/合伙年限
            if (resd.companyList[0].FPARTNERSHIP != null) {
              // this.oldCompany.FPARTNERSHIP = resd.companyList[0].FPARTNERSHIP.split(',').join(' - ')
              this.oldCompany.FPARTNERSHIP = JSON.parse(
                resd.companyList[0].FPARTNERSHIP
              ).join(" - ");
            }

            // 币种
            this.currency = resd.currencyList;
            // 境外公司
            this.isFisS = resd.IsenableList;
            // 变更类型
            this.typeChange = resd.companytypeList;
            // 区域集团
            this.regGroup = resd.districtGroupList;
            // 资质情况
            this.qualification = resd.qualificationsList;
            // 投资方式
            this.investmentMethod = resd.investtypeList;

            // 合并范围
            this.mergeList = resd.mergingscopeList;
            // 公司类别
            this.companytypesList = resd.companytypesList;
            // 并表方
            this.companybbfList = resd.companybbfList;

            // 合并范围变更前展示
            for (let i = 0; i < resd.mergingscopeList.length; i++) {
              if (
                resd.companyList[0].FCOMBINERANGE ==
                resd.mergingscopeList[i].FNUMBER
              ) {
                this.oldCompany.FCOMBINERANGE = resd.mergingscopeList[i].FNAME;
              }
            }
            if (resd.companyChangeList.length != 0) {
              this.FCOMBINERANGENEW =
                resd.companyChangeList[0].FCOMBINERANGENEW;
              this.FCOMPANYTYPEBNEW =
                resd.companyChangeList[0].FCOMPANYTYPEBNEW;
              this.FCOMPANYBBFNEW = resd.companyChangeList[0].FCOMPANYBBFNEW;
            }
            // 公司类别变更前展示
            for (let i = 0; i < resd.companytypesList.length; i++) {
              if (
                resd.companyList[0].FCOMPANYTYPEB ==
                resd.companytypesList[i].FNUMBER
              ) {
                this.oldCompany.FCOMPANYTYPEB = resd.companytypesList[i].FNAME;
              }
            }

            // 并表方变更前展示
            for (let i = 0; i < resd.companybbfList.length; i++) {
              if (
                resd.companyList[0].FCOMPANYBBF ==
                resd.companybbfList[i].FNUMBER
              ) {
                this.oldCompany.FCOMPANYBBF = resd.companybbfList[i].FNAME;
              }
            }

            if (resd.companyChangeList.length == 0) {
              this.FREGISTEREDCAPITALNEW =
                resd.companyList[0].FREGISTEREDCAPITAL;
            } else {
              this.FREGISTEREDCAPITALNEW =
                resd.companyChangeList[0].FREGISTEREDCAPITALNEW;
            }

            // 认缴明细变更前   subcribeList
            this.subcribeList = resd.subcribeList;
            
            // 股东下拉
            this.fshareholdernameList = resd.fshareholdernameList;
            // 实缴明细
            this.paidinList = resd.paidinList;
            this.insideList = resd.insideList;
            this.positionList = resd.typeList;
            this.outerList = resd.outsideList;
            this.weipaifangList = resd.weipaifangList;
            this.sjgdGetSelect();

            // 附件
            this.getFilelist(resd.filechangeid);
            this.fileFid = resd.filechangeid;
          }
        }
      });
    },
    sjgdGetSelect () {
      this.SJGDselect = [];
      if (this.pledgeList.length != 0)  {
        for(let i = 0; i < this.pledgeList.length; i++){
          let flag = true;
          for(let j = 0; j < this.SJGDselect.length; j++){
            if(this.pledgeList[i].FPARTNER == this.SJGDselect[j].FPARTNER){
              flag = false;
            };
            if(!this.pledgeList[i].FPARTNER){
              this.pledgeList[i].FPARTNERNAME = ''
              flag = false;
            };
          };
          if(flag){
            this.SJGDselect.push({      // 实缴股东下拉
              FPARTNER: this.pledgeList[i].FPARTNER,
              FPARTNERNAME: this.pledgeList[i].FPARTNERNAME,
            });
          };
        };
      } else {
        for ( let i = 0; i < this.subcribeList.length; i ++) {
          this.SJGDselect.push({      // 实缴股东下拉
            FPARTNER: this.subcribeList[i].FPARTNER,
            FPARTNERNAME: this.subcribeList[i].FPARTNERNAME,
          });
        }
      }
      
      // console.log(this.pledgeList, 'pledgeList');
      // console.log(this.SJGDselect, 'SJGDselect');
      // console.log(this.PayInList, 'PayInList');
    },

    getGDNatureR(rows, index) {
      for(let i = 0; i < this.fshareholdernameList.length; i ++) {
        if (rows.FPARTNER == this.fshareholdernameList[i].FID) {
          rows.FPARTNERNAME = this.fshareholdernameList[i].FSHAREHOLDERNAME;
        }
      }
      let param = {
        partnerid: rows.FPARTNER
      };
      getNature(param).then(res => {
        if (res.body.code == "999") {
          rows.FPARTNERNATURENAME = res.body.data;
        }
      });
      this.sjgdGetSelect();
    },
    getGDNatureS(rows, index) {
      let param = {
        partnerid: rows.FPARTNER
      };
      getNature(param).then(res => {
        if (res.body.code == "999") {
          rows.FPARTNERNATURENAME = res.body.data;
        }
      });
    },
    // 变更公司类型 一级公司性质
    changeCompTypeOne(superiorcode) {
      this.oneCompTypes = [];
      this.twoCompTypes = [];
      this.FONECOMPANYNATURENEW = "";
      this.newCompany.FONECOMPANYNATURENEW = "";
      this.newCompany.FTWOCOMPANYNATURENEW = "";
      this.FTWOCOMPANYNATURENEW = ""; // 二级公司性质
      if (superiorcode) {
        this.getChangeCompanyTypeOne(superiorcode);
        this.newCompany.FCOMPANYTYPENEW = superiorcode;
      }
    },
    // 变更公司类型 一级公司性质
    getChangeCompanyTypeOne(superiorcode, type) {
      let param = {
        superiorcode,
        superiortype: "COMPANY_TYPE"
      };
      changeCompanyType(param).then(res => {
        if (res.body.code == "999") {
          this.oneCompTypes = res.body.data.typeList;
        }
      });
    },
    // 变更公司类型 二级公司性质
    changeCompTypeTwo(superiorcode, type) {
      this.twoCompTypes = [];
      this.newCompany.FTWOCOMPANYNATURENEW = "";
      this.FTWOCOMPANYNATURENEW = "";
      if (superiorcode) {
        this.getChangeCompanyTypeTwo(superiorcode, type);
        this.newCompany.FONECOMPANYNATURENEW = superiorcode;
      }
    },
    // 变更公司类型 二级公司性质
    getChangeCompanyTypeTwo(superiorcode, type) {
      let param = {
        superiorcode: type,
        superiortype: superiorcode,
        type: "type"
      };
      changeCompanyType(param).then(res => {
        if (res.body.code == "999") {
          this.twoCompTypes = res.body.data.typeList; // 就是变更公司类型对应的一级公司性质
        }
      });
    },
    changeCPTTwo(superiorcode) {
      this.newCompany.FTWOCOMPANYNATURENEW = superiorcode;
    },

    // 区域集团获取区域公司
    changeRegGroup(nameId) {
      this.AREACOMPANYNEW = "";
      this.newCompany.AREACOMPANYNEW = "";
      this.newCompany.FBIZDEPARTMENTNEW = "";
      this.FBIZDEPARTMENTNEW = "";
      this.regComp = [];
      this.regCause = [];
      if (nameId) {
        this.getRegGroup(nameId);
        this.newCompany.FAREAGROUPNEW = nameId;
      }
    },
    getRegGroup(nameId) {
      let param = {
        areagroupid: nameId
      };
      getRegComp(param).then(res => {
        if (res.body.code == "999") {
          this.regComp = res.body.data;
        }
      });
    },
    // 区域公司获取事业部
    changeRegCau(nameId) {
      this.newCompany.FBIZDEPARTMENTNEW = "";
      this.FBIZDEPARTMENTNEW = "";
      this.regCause = [];
      if (nameId) {
        this.getRegCau(nameId);
        this.newCompany.AREACOMPANYNEW = nameId;
      }
    },
    getRegCau(nameId) {
      let param = {
        areacompanyid: nameId
      };
      getRegCause(param).then(res => {
        this.regCause = res.body.data;
      });
    },
    // 事业部
    changeCause(nameId) {
      this.newCompany.FBIZDEPARTMENTNEW = nameId;
    },

    getFilingFormInfo() {
      filingFormInfo().then(res => {
        this.applicantform = res.body.data;
        this.fid = this.applicantform.fid;
      });
    },
    getChangeEntType(newName) {
      let param = {
        superiorcode: newName,
        superiortype: "OUTINSIDE"
      };
      getEnterpriseType(param).then(res => {
        if (res.body.data.typeList) {
          this.enterpriseTypeList = res.body.data.typeList;
        }
      });
    },
    add_aline_r() {
      this.pledgeList.push({
        FPARTNERNAME: "",
        FPARTNER: "",
        FPARTNERNATURENAME: "",
        FSUBCRIBEMONEY: "",
        FCAPITALKEY: "0%",
        FSUBCRIBETIME: "",
        disabled: false,
      });
    },
    add_aline_s() {
      this.PayInList.push({
        FPARTNERNAME: "",
        FPARTNER: "",
        FPARTNERNATURENAME: "",
        FPAIDINMONEY: "",
        FCAPITALKEY: "0%",
        FPAIDINTIME: ""
      });
    },
    add_aline_Position() {
      this.insidePosition.push({
        FPOSITION: "",
        FPOSITIONNAME: "",
        FPERSONNAME: "",
        FZLPOSITIONNAME: "",
        FAREABLOCNAME: "",
        FAREACOMPANYNAME: ""
      });
    },
    add_aline_outerPosition() {
      this.outerPosition.push({
        FPOSITION: "",
        FPERSONNAME: "",
        FDELEGATE: ""
      });
    },
    // 保存
    save() {
      this.postSubmit("2");
      // this.submit()
    },
    // 提交
    subM() {
      if (this.changeTime && !this.newCompany.FGSCHANGETIME) {
        this.$message({
          showClose: true,
          message: "请选择工商备案完成时间",
          type: "warning"
        });
      } else {
        this.postSubmit("3");
      }
    },
    postSubmit(statebtu) {
      this.newCompany.FPARTNERSHIP = this.fpartnerTime ? this.fpartnerTime : ""; // 合伙年限
      this.newCompany.FLEGALPERSONNEW = this.FLEGALPERSONNEW ? this.FLEGALPERSONNEW : "";
      this.newCompany.FFAIRPERSONNEW = this.FFAIRPERSONNEW ? this.FFAIRPERSONNEW : "";
      this.newCompany.FCOMBINERANGENEW = this.FCOMBINERANGENEW ? this.FCOMBINERANGENEW : "";
      this.newCompany.FCOMPANYTYPEBNEW = this.FCOMPANYTYPEBNEW ? this.FCOMPANYTYPEBNEW : "";
      this.newCompany.FCOMPANYBBFNEW = this.FCOMPANYBBFNEW ? this.FCOMPANYBBFNEW : "";
      console.log(this.typeSelection.selected);
      console.log(this.typeSelection.selected.indexOf('1') > -1)
      if (statebtu == '3') {    // 只有在提交的时候才去做必填判断
        if (this.caiwuShow && !this.FCOMBINERANGENEW && !this.FCOMPANYTYPEBNEW && !this.FCOMPANYBBFNEW) {   // 财务信息为必填项
          this.$message({
            showClose: true,
            message: "请填写财务信息",
            type: "warning"
          });
        }
        else if (this.typeSelection.selected.indexOf('1') > -1 && !this.newCompany.FCOMPANYNEW) {  // 公司名称必填
          this.$message({
            showClose: true,
            message: "请填写公司名称",
            type: "warning"
          });
        }
        // else if (this.typeSelection.selected.indexOf('3') > -1 && !this.newCompany.FMONEYTYPENEW) {      // 币种必填
        //   this.$message({
        //     showClose: true,
        //     message: "请填写币种",
        //     type: "warning"
        //   });
        // } else if (this.typeSelection.selected.indexOf('4') > -1 && !this.fpartnerTime) {      // 经营/合伙期限必填
        //   this.$message({
        //     showClose: true,
        //     message: "请填写经营/合伙期限",
        //     type: "warning"
        //   });
        // }
        else {
          this.getPOST(statebtu);
        }
      } else {
        this.getPOST(statebtu);
      }
      
      
    },
    getPOST (statebtu) {      // 保存提交接口
      let params = {
        companyid: this.compID,
        fid: this.listFid,
        typeList: this.typeSelection.selected.join(","),
        companyinfochange: JSON.stringify(this.newCompany),
        cwtable: JSON.stringify(this.pledgeList),
        sjmxtable: JSON.stringify(this.PayInList),
        dtable: JSON.stringify(this.insidePosition),
        wtable: JSON.stringify(this.outerPosition),
        statebtu // 2是保存，3是提交
      };
      console.log(this.typeSelection)
      // if (!!this.newCompany.FYZADMIN) {
        if (this.typeSelection.selected.length > 0) {
          if (this.typeSelection.selected.indexOf('14') > -1) {
            // 认缴明细变更后
            if(this.pledgeList.length != 0) {
              let flagR;
              for(let i = 0; i < this.pledgeList.length; i ++) {
                if (!this.pledgeList[i].FPARTNER || !this.pledgeList[i].FSUBCRIBEMONEY || !this.pledgeList[i].FSUBCRIBETIME) {
                  flagR = false;
                  break;
                } else {
                  flagR = true;
                }
              }
              if (flagR) {
                this.$confirm("确定保存提交?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                }).then(() => {
                  this.onSubmit1(this.listFid, params); // 保存以后传入fid  上传附件
                  // this.listFid   // 上传附件之后返回的fid
                  
                }).catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消保存提交"
                  });
                });
              } else {
                this.$message({
                  showClose: true,
                  message: "请填写认缴明细",
                  type: "warning"
                });
              }
            } else {
              this.$message({
                showClose: true,
                message: "请填写认缴明细",
                type: "warning"
              });
            }
          } else {
            this.$confirm("确定保存提交?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              this.onSubmit1(this.listFid, params); // 保存以后传入fid  上传附件
            }).catch(() => {
              this.$message({
                type: "info",
                message: "已取消保存提交"
              });
            });
          }
        } else {
          this.$message({
            showClose: true,
            message: "请选择至少一项变更内容",
            type: "warning"
          });
        }
        
      // } else {
      //   this.$message({
      //     showClose: true,
      //     message: "请填写印章管理员",
      //     type: "warning"
      //   });
      // }
     
    },
    showDialog(type, fid, companyid, button) {
      this.alertType = type;
      fid ? fid : "";
      companyid ? companyid : "";
      button ? button : "";
      this.clearMain();
      this.applicantform.company = "";
      this.companyNameSelection = false;
      this.dialogFormVisible = true;
      this.fileList = [];
      this.fileShow = false;
      if (type == "bianji") {
        this.getAlertInfo("", fid, button);
        this.chakanDis = false;
        this.baocun = true;
        this.tijiao = true;
        this.copName = true;
        this.isChakanTime = false;
        this.isFREMARKNEW = false;
        this.caiwuDis = false;
        this.isDelFile = true;
      } else if (type == "chakan") {
        this.getAlertInfo("", fid, button);
        this.chakanDis = true;
        this.baocun = false;
        this.tijiao = false;
        this.copName = true;
        this.isChakanTime = true;
        this.isDelFile = false;
        this.isFREMARKNEW = true;
        this.caiwuDis = true;
        if (this.FGSCHANGETIME) {
          this.newCompany.FGSCHANGETIME = this.FGSCHANGETIME;
        }
      } else if (type == "xinzeng") {
        this.chakanDis = false;
        this.baocun = true;
        this.isFREMARKNEW = false;
        this.tijiao = true;
        this.copName = false;
        this.isDelFile = true;
        this.getFilingFormInfo();
      }
    },
    quxiao() {
      this.dialogFormVisible = false;
    },
    rejectAN() {
      this.$confirm("确定驳回?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let param = {
            fid: this.listFid
          };
          reject(param).then(res => {
            if (res.body.code == "999") {
              this.$message({
                type: "success",
                message: "驳回成功!"
              });
              this.dialogFormVisible = false;
              this.queryBottom();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消驳回"
          });
        });
    },
    // 清空内容弹框
    clearMain() {
      // 变更 基础内容 选中类型 认缴明细 实缴明细 董监高 清空
      this.newCompany = {};
      this.typeSelection.selected = [];
      this.PayInList = [];
      this.insidePosition = [];
      this.outerPosition = [];
      this.regGroup = [];
      this.regComp = [];
      this.regCause = [];
      this.fpartnerTime = [];
      this.oneCompTypes = [];
      this.twoCompTypes = [];
      this.isFisS = [];
      this.enterpriseTypeList = [];

      this.FISOVERSEASCOMPANYNEW = ""; // 是否境外公司
      this.FFORGFUNENTERPSNEW = ""; // 是否外资企业
      this.FOUTENTERPRISETYPENEW = ""; // 内,外资企业类型
      this.FLEGALPERSONNEW = ""; // 法人代表
      this.FFAIRPERSONNEW = ""; // 执行事务合伙人

      this.FREGISTEREDCAPITALNEW = "";
      // 所属区域集团/公司/事业部
      this.FAREAGROUPNEW = ""; // 所属区域集团
      this.AREACOMPANYNEW = ""; // 所属区域公司
      this.FBIZDEPARTMENTNEW = ""; // 所属事业部

      this.FCOMPANYTYPENEW = ""; // 公司类型
      this.FONECOMPANYNATURENEW = ""; // 一级公司性质
      this.FTWOCOMPANYNATURENEW = ""; // 二级公司性质
      // 财务信息
      this.FCOMBINERANGENEW = "";
      this.FCOMPANYTYPEBNEW = "";
      this.FCOMPANYBBFNEW = "";
      this.fileShow = false;
      this.typeSelectionChecked = {};
    }
  },
  computed: {
    isJW() {
      // 是否境外
      return this.FISOVERSEASCOMPANYNEW;
    },
    isWZ() {
      // 是否外资
      return this.FFORGFUNENTERPSNEW;
    },
    isLX() {
      // 内外资企业类型
      return this.FOUTENTERPRISETYPENEW;
    },
    amountSumR() {
      let sum = 0;
      for (let i = 0; i < this.pledgeList.length; i++) {
        sum += parseFloat(this.pledgeList[i].FSUBCRIBEMONEY || 0);
        console.log(this.pledgeList[i].FSUBCRIBEMONEY);
      }
      return parseFloat(sum).toFixed(4);
    },
    amountSumS() {
      let sum = 0;
      for (let i = 0; i < this.PayInList.length; i++) {
        sum += parseFloat(this.PayInList[i].FPAIDINMONEY || 0);
        console.log(this.pledgeList[i].FPAIDINMONEY);
      }
      return parseFloat(sum).toFixed(4);
    },
    HBFW () {
      return this.FCOMBINERANGENEW;
    },
    QYCom () {
      return this.queryForm.qyjt;
    },
  },
  watch: {
    QYCom: {
      handler(newName, oldName) {
        this.queryForm.qygs = '';
        this.qyComList = [];
        //第一个选择框选中显示信息
        let param = {
          areagroupid: newName
        };
        dt(param).then(res => {
          if (res.body.code === "999") {
            //获取所属区域公司信息
            this.qyComList = res.body.data;
          }
        });
      },
      deep: true
    },
    isJW: {
      // 是否境外
      handler(newName, oldName) {
        if (oldName != "") {
          this.FFORGFUNENTERPSNEW = ""; // 是否外资企业
          this.isWZQY = true; // 是否外资企业disabled
          this.isQYLX = true; // 企业类型disabled
          this.enterpriseTypeList = []; // 外资内资企业类型下拉
          this.FOUTENTERPRISETYPENEW = ""; // 内,外资企业类型
          this.isLegal = true; // 法人代表disbaled
          this.isExecutive = true; // 执行事务合伙人disabled
          this.FLEGALPERSONNEW = ""; // 法人代表
          this.FFAIRPERSONNEW = ""; // 事务合伙人
        }
        if (newName != null) {
          if (newName == "1") {
            this.isLegal = false;
          } else if (newName == "0") {
            this.isWZQY = false;
          }
          this.newCompany.FISOVERSEASCOMPANYNEW = newName;
        }
      }
    },
    isWZ: {
      handler(newName, oldName) {
        if (oldName != "") {
          this.enterpriseTypeList = []; // 外资, 内资企业类型下拉
          this.FOUTENTERPRISETYPENEW = ""; // 内外资企业类型
          this.isLegal = true; // 法人代表disbaled
          this.isExecutive = true; // 执行事务合伙人disabled
          this.FLEGALPERSONNEW = ""; // 法人代表
          this.FFAIRPERSONNEW = ""; // 事务合伙人
          this.isQYLX = true;
        }
        if (newName != null) {
          if (newName == "1") {
            this.newNorY = "变更后外资企业类型";
            this.isQYLX = false;
          } else if (newName == "0") {
            this.newNorY = "变更后内资企业类型";
            this.isQYLX = false;
          }
          this.getChangeEntType(newName);
          this.newCompany.FFORGFUNENTERPSNEW = newName;
        }
      }
    },
    isLX: {
      handler(newName, oldName) {
        if (oldName != "") {
          this.isLegal = true; // 法人代表disbaled
          this.isExecutive = true; // 执行事务合伙人disabled
          this.FLEGALPERSONNEW = ""; // 法人代表
          this.FFAIRPERSONNEW = ""; // 事务合伙人
        }
        if (newName != null) {
          if (this.newNorY == "变更后外资企业类型") {
            let frArr = ["1", "2"];
            let hhrArr = ["3", "4", "5"];
            if (frArr.indexOf(newName) > -1) {
              this.isLegal = false;
            }
            if (hhrArr.indexOf(newName) > -1) {
              this.isExecutive = false;
            }
          }
          if (this.newNorY == "变更后内资企业类型") {
            let frArr = ["1", "2", "3", "4"];
            let hhrArr = ["5", "6", "7"];
            if (frArr.indexOf(newName) > -1) {
              this.isLegal = false;
            }
            if (hhrArr.indexOf(newName) > -1) {
              this.isExecutive = false;
            }
          }
          this.newCompany.FOUTENTERPRISETYPENEW = newName;
        }
      }
    },
    amountSumR() {
      this.FREGISTEREDCAPITALNEW = this.amountSumR;
      this.newCompany.FREGISTEREDCAPITALNEW = this.amountSumR;
      for (let i = 0; i < this.pledgeList.length; i++) {
        if (isNaN(this.pledgeList[i].FSUBCRIBEMONEY / this.amountSumR * 100)) {
          this.pledgeList[i].FCAPITALKEY = "";
        } else {
          this.pledgeList[i].FCAPITALKEY = (this.pledgeList[i].FSUBCRIBEMONEY / this.amountSumR * 100).toFixed(4) + "%";
        }
      }
    },
    amountSumS() {
      for (let i = 0; i < this.PayInList.length; i++) {
        if (isNaN(this.PayInList[i].FPAIDINMONEY / this.amountSumR * 100)) {
          this.PayInList[i].FCAPITALKEY = "";
        } else {
          this.PayInList[i].FCAPITALKEY =
            (this.PayInList[i].FPAIDINMONEY / this.amountSumR * 100).toFixed(4) + "%";
        }
      }
    },
    HBFW: { // 控制财务合并范围如果选择无的时候,下面公司类别,并表方的显示隐藏
      handler(newName, oldName) {
        if(newName == '4') {
          this.HBDis = false;
          this.FCOMPANYTYPEBNEW = "";
          this.newCompany.FCOMPANYTYPEBNEW = "";
          this.FCOMPANYBBFNEW = "";
          this.newCompany.FCOMPANYBBFNEW = "";
        } else {
          this.HBDis = true;
        }
      },
    }
  },
  mounted() {
    this.queryTop();
    this.queryBottom();
  }
};
</script>

<style rel="stylesheet/scss" scoped lang="scss">
.table-col /deep/ .el-checkbox__inner {
  background-color: #409EFF !important;
  border-color: #409EFF !important;
}
.table-col  /deep/ .el-checkbox__inner::after {
  border-color: #fff !important;
}

.structure {
  
  .el-header {
    background: #fff;
    padding: 20px;
    margin: 20px;
  }
  .el-main {
    padding: 0px;
    margin: 0 20px;
    .btn-col {
      padding-bottom: 10px;
      margin-bottom: 10px;
      text-align: right;
      border-bottom: 1px solid #fff;
    }
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: auto;
  }
  .table-col {
    min-height: 400px;
    table {
      font-size: 14px;
      text-align: center;
      padding: 10px;
      background: #fff;
      border-spacing: 0;
      color: #606266;
      min-height: 360px;
      td,
      th {
        border-right: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
        padding: 5px;
        height: 36px;
      }
      th {
        background: #3a8ee6;
        color: #fff;
      }
    }
  }
  .page-col {
    // text-align: center;
    margin-top: 10px;
  }

  /*弹出层样式*/
  .applicant-col {
    padding: 20px;
  }
  .col {
    h3,
    h5 {
      margin: 0;
      font-weight: normal;
    }
    .col-tit {
      height: 48px;
      padding: 0 20px;
      background: #f5f7fa;
      color: #409eff;
      line-height: 48px;
      font-size: 18px;
      position: relative;
      .p2 {
        position: absolute;
        left: 170px;
        top: -11px;
        height: 40px;
        vertical-align: middle;
        form {
          display: inline-block;
        }
      }
    }
    .col-small-tit {
      height: 48px;
      background: #e4e7ed;
      line-height: 48px;
      padding: 0 20px;
      position: relative;
      font-size: 16px;
      .icon-zx {
        position: absolute;
        top: 14px;
        right: 20px;
        font-size: 24px;
      }
    }
    .col-main {
      padding: 20px 0 20px 20px;
      .p1 {
        margin: 0 0 20px 0;
        .span1 {
          display: inline-block;
        }
      }
      .addFile {
        //text-align: center;
        padding: 20px 20px 10px;
        border: 1px solid #dcdfe6;
        //border-top:none;
      }
      .el-select {
        width: 100%;
      }
    }
    .col-tit {
      span {
        margin: 0 10px;
        font-size: 14px;
      }
    }
  }
  .el-main {
    height: 500px;
    .addALine {
      height: 50px;
      text-align: center;
      font-size: 26px;
      line-height: 50px;
      margin-top: -1px;
      cursor: pointer;
      color: #ccc;
      border: 1px solid #ebeef5;
    }
    .addALine:hover {
      background-color: #f5f7fa;
    }
  }
  .btn2-col {
    background: #e9eef3;
    padding: 20px 10px 10px;
    text-align: center;
  }
}
.table_title {
  height: 50px;
  background: rgb(64, 158, 255);
  text-align: center;
  line-height: 50px;
  color: #fff;
  font-weight: 700;
  border: 1px solid #fff;
}
.old {
  float: left;
  width: 38%;
}
.new {
  float: left;
  width: 38%;
}

// .FYZADMIN {
//   font-size: 14px;
//   font-family: MicrosoftYaHei;
//   font-weight: 400;
//   color: rgba(245, 108, 108, 1);
//   line-height: 37px;
//   padding-left: 5px;
// }
</style>
