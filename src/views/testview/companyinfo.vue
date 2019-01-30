<template>
  <div class="structure">
    <el-container>
      <el-header height="auto" class="company_header">
        <el-form ref="companyform" :model="companyform" label-width="110px">
        <!-- <el-form  ref="companyform" :rules="formrules" :model="companyform" label-width="110px"> -->
          <el-row :gutter="5">
            <el-col :span="6" class="grid-content bg-purple">
              <el-form-item label="所属区域集团">
                <el-select 
                  v-model="companyform.value1" 
                  placeholder="请选择所属区域集团" 
                  @change="changeQYJT(companyform.value1)" 
                  clearable
                >
                  <el-option
                    v-for="item in companyform.areaGroupData"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.ID"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="grid-content bg-purple">
              <el-form-item label="所属区域公司">
                <el-select 
                  v-model="companyListItem" 
                  placeholder="请选择所属区域公司" clearable
                >
                  <el-option
                    v-for="item in companyList"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.ID"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="公司名称">
                  <el-input v-model="companyform.gsmc" placeholder="请输入关键字" clearable></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="董监高人员">
                  <el-input v-model="companyform.value3" placeholder="请输入董监高人员" clearable></el-input>
                  <!-- <el-select v-model="companyform.value3" placeholder="请选择董监高人员">
                    <el-option
                      v-for="item in companyform.djgPersonNameData"
                      :key="item.FID"
                      :label="item.FPERSONNAME"
                      :value="item.FID"
                    >
                    </el-option>
                  </el-select> -->
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="5">
     <!--        <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="查询开始日期">
                  <el-date-picker
                    v-model="companyform.beginTime"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="companyform.picker1"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="查询结束日期">
                  <el-date-picker
                    v-model="companyform.endTime"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="companyform.picker2"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-col> -->
            <el-col :span="24">
              <div class="grid-content bg-purple" style="text-align:right;">
                <el-form-item>
                  <el-button type="primary" @click="onSubmit('companyform',2)">查询</el-button>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-header>
      <el-main>
        <div class="table-col">
          <el-table
             ref="companyInfoData"
            :data="companyInfoData"
            :header-cell-style="{textAlign:'center',background:'#409eff',color:'#fff'}"
             :cell-style="{textAlign:'center'}"
             border
             height="500"
            style="width: 100%">
               <!-- @row-click="handleView" -->
            <el-table-column
              type="index"
              label="序号"
              fixed
              width="60">
            </el-table-column>
            <el-table-column
              prop="XYM"
              fixed
              label="现用名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="CYM"
              width="120"
              label="曾用名">
            </el-table-column>
            <el-table-column
              prop="ZCZB"
              width="120"
              label="注册资本(万元)">
            </el-table-column>
            <el-table-column
              prop="BZ"
              width="80"
              label="币种">
            </el-table-column>
            <el-table-column
              prop="QYLX"
              width="120"
              label="企业类型">
            </el-table-column>
            <el-table-column
              prop="GSLX"
              width="120"
              label="公司类型">
            </el-table-column>
            <el-table-column
              prop="YJGSXZ"
              width="120"
              label="一级公司性质">
            </el-table-column>
            <el-table-column
              width="120"
              prop="EJGSXZ"
              label="二级公司性质">
            </el-table-column>
            <el-table-column
              prop="FRDB"
              width="100"
              label="法人代表">
            </el-table-column>
            <el-table-column
              width="120"
              prop="ZXSWHHR"
              label="执行事务合伙人">
            </el-table-column>
            <el-table-column
              width="120"
              prop="INSIDESTRING"
              label="内部董监高">
            </el-table-column>
            <el-table-column
              width="120"
              prop="OUTSIDESTRING"
              label="外部董监高">
            </el-table-column>
            <el-table-column
              prop="JYHHQX"
              width="105"
              label="经营/合伙期限">
            </el-table-column>
            <el-table-column
              width="120"
              prop="TZFS"
              label="投资方式">
            </el-table-column>
            <el-table-column
              prop="TYSHXYDM"
              width="120"
              label="社会信用代码">
            </el-table-column>
            <el-table-column
              width="120"
              prop="CLRQ"
              label="成立日期">
            </el-table-column>
            <el-table-column
              prop="SSQYJT"
              width="150"
              label="所属区域集团">
            </el-table-column>
            <el-table-column
              width="150"
              prop="SSQYGS"
              label="所属区域公司">
            </el-table-column>
            <el-table-column
              prop="SSSYB"
              width="150"
              label="所属事业部">
            </el-table-column>
            <el-table-column
              prop="ZJBGR"
              width="120"
              label="证照保管人">
            </el-table-column>
            <el-table-column
              prop="YZBGR"
              width="100"
              label="印章保管人">
            </el-table-column>
            <el-table-column
              width="120"
              prop="ZZQK"
              label="资质情况">
            </el-table-column>
            <el-table-column
              width="120"
              prop="SSHBFW"
              label="所属合并范围">
            </el-table-column>
            <el-table-column
              prop="GSLB"
              label="公司类别">
            </el-table-column>
            <el-table-column
              width="120"
              prop="GSBBF"
              label="公司并表方">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary" 
                  @click="handleView(scope.row)"
                 >查看</el-button>
                    <!-- @click.self.prevent="handleView(scope.row)" -->
              </template>
            </el-table-column>
          </el-table>
          <div class="page-col">
            <el-pagination
               @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="prev, pager, next, jumper"
                :total="pages"
                :page-size="size">
            </el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>
    <el-dialog title="公司信息详情"
      :visible.sync="dialogFormVisible"
      width="1300px"
      top="8vh"
      custom-class="doloadcl"
      v-loading="loading"
      >
      <div class="col">
        <h3 class="col-tit">基本信息</h3>
        <h5 class="col-small-tit">备案申请信息<i class="el-icon-remove-outline icon-zx"></i></h5>
        <div class="col-main">
          <el-form :model="baseData" :disabled=true label-width="110px" >
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="现用名">
                  <el-input v-model="baseData.GSMC" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="曾用名">
                  <el-input v-model="baseData.CYM" autocomplete="off">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="注册资本(万元)">
                   <el-input v-model="baseData.ZCZB" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="币种">
                  <el-input v-model="baseData.BZ" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否境外公司">
                  <el-input v-model="baseData.SFJWGS" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否外资企业" v-show='show0'>
                  <el-input v-model="baseData.SFWZQYMS" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="内资企业类型" v-show='show1'>
                  <el-input v-model="baseData.WZQYLXMS" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="外资企业类型"  v-show='show2'>
                  <el-input v-model="baseData.WZQYLXMS" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人代表" v-show='show3' >
                  <el-input v-model="baseData.FRDB" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="8">
                <el-form-item label="执行事务合伙人"  v-show='show4'>
                  <el-input v-model="baseData.ZXSWHHR" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="经营/合作年限" >
                  <el-input v-model="baseData.JYHHQX" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属区域集团" >
                  <el-input v-model="baseData.SSQYJT" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属区域公司" >
                  <el-input v-model="baseData.SSQYGS" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属事业部" >
                  <el-input v-model="baseData.SSSYB" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="公司类型" >
                  <el-input v-model="baseData.GSLX" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="一级公司性质" >
                  <el-input v-model="baseData.YJGSXZ" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="二级公司性质" >
                  <el-input v-model="baseData.EJGSXZ" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="资质情况" >
                  <el-input v-model="baseData.ZZQK" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="投资方式" >
                  <el-input v-model="baseData.TZFS" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="24">
                <el-form-item label="经营范围" >
                  <el-input v-model="baseData.JYFW" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="24">
                <el-form-item label="公司住址" >
                  <el-input v-model="baseData.GSZS" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="24">
                <el-form-item label="备注" >
                  <el-input v-model="baseData.REMARK" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="col">
        <h3 class="col-tit">备案登记信息</h3>
        <h5 class="col-small-tit">业务信息<i class="el-icon-remove-outline icon-zx"></i></h5>
        <div class="col-main">
          <el-form :model="ywData"  :label-width="formLabelWidth">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="社会信用代码" >
                  <el-input v-model="ywData.xydm" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="成立日期" >
                  <el-input v-model="ywData.clrq" autocomplete="off">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="注销时间" >
                  <el-input v-model="ywData.zxsj" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="印章保管人" >
                  <el-input v-model="ywData.yzbg" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证照保管人" >
                  <el-input v-model="ywData.zzbg" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item label="工商备案完成时间" label-width="150px">
                  <el-input v-model="ywData.zcsj" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <h5 class="col-small-tit">财务信息<i class="el-icon-remove-outline icon-zx"></i></h5>
        <div class="col-main">
          <el-form :model="cwData" label-width="120px">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="所属合并范围" >
                  <el-input v-model="cwData.hbfw" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="公司子类" >
                  <el-input v-model="cwData.gslb" autocomplete="off">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="公司并表方">
                  <el-input v-model="cwData.gsbbf" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <h5 class="col-small-tit">认缴明细<i class="el-icon-remove-outline icon-zx"></i></h5>
        <div class="col-main">
          <p class="p1">注册资本(万元)
            <span class="span1">
              <el-input v-model="baseData.ZCZB"></el-input>
            </span>
          </p>
          <el-table
            :data="rjTable"
            :header-cell-style="{textAlign:'center',background:'#3a8ee6',color:'#fff'}"
            :cell-style="{textAlign:'center'}"
            border
            style="width:100%">
            <el-table-column
              type="index"
              label="序号"
              width="60">
            </el-table-column>
            <el-table-column
              prop="gdmc"
              label="股东名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="gdgsxz"
              label="股东公司性质"
            >
            </el-table-column>
            <el-table-column
              prop="rjje"
              label="认缴金额（万元）"
              width="180">
            </el-table-column>
            <el-table-column
              prop="rjsj"
              label="认缴时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="czbl"
              label="出资比例"
            >
            </el-table-column>
          </el-table>
        </div>
        <h5 class="col-small-tit">实缴明细<i class="el-icon-remove-outline icon-zx"></i></h5>
        <div class="col-main">
          <el-table
            :data="sjTable"
            :header-cell-style="{textAlign:'center',background:'#3a8ee6',color:'#fff'}"
            :cell-style="{textAlign:'center'}"
            border
            style="width:100%">
            <el-table-column
              type="index"
              label="序号"
              width="60">
            </el-table-column>
            <el-table-column
              prop="gdmc"
              label="股东名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="gdgsxz"
              label="股东公司性质"
            >
            </el-table-column>
            <el-table-column
              prop="sjje"
              label="实缴金额（万元）"
              width="180">
            </el-table-column>
            <el-table-column
              prop="sjsj"
              label="实缴时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="czbl"
              label="出资比例"
            >
            </el-table-column>
          </el-table>
        </div>
        <h5 class="col-small-tit">股东信息情况<i class="el-icon-remove-outline icon-zx"></i></h5>
        <div class="col-main">
          <el-row>
            <el-col :span="12">
              <el-table
                :data="gdTable"
                :header-cell-style="{textAlign:'center',background:'#3a8ee6',color:'#fff'}"
                :cell-style="{textAlign:'center'}"
                style="width:100%">
                <el-table-column
                  prop="date"
                  label="工商股比"
                  >
                  <el-table-column
                    prop="name"
                    label="股东名称"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="gdgsxz"
                    label="股东公司性质"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="gb"
                    label="股比（%）"
                  >
                  </el-table-column>
                </el-table-column>
              </el-table>
            </el-col>
             <el-col :span="12">
              <el-table
                :data="gdTable2"
                :header-cell-style="{textAlign:'center',background:'#3a8ee6',color:'#fff'}"
                :cell-style="{textAlign:'center'}"
                style="width:100%">
                <el-table-column label="财务股比">
                  <el-table-column
                    prop="name2"
                    label="股东名称"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="gdgsxz2"
                    label="股东公司性质"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="gb2"
                    label="股比（%）"
                  >
                  </el-table-column>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="col">
        <h3 class="col-tit">董，监，高任职情况</h3>
        <h5 class="col-small-tit">内部董，监，高任职<i class="el-icon-remove-outline icon-zx"></i></h5>
        <div class="col-main">
          <el-table
            :data="nbTable"
            :header-cell-style="{textAlign:'center',background:'#3a8ee6',color:'#fff'}"
            :cell-style="{textAlign:'center'}"
            border
            style="width: 100%">
            <el-table-column
              prop="position"
              label="本公司职位"
              width="200">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="zlzw"
              label="中梁职位"
              width="200">
            </el-table-column>
            <el-table-column
              prop="qyjt"
              label="区域集团"
              width="300">
            </el-table-column>
            <el-table-column
              prop="qygs"
              label="区域公司"
              >
            </el-table-column>
          </el-table>
        </div>
        <h5 class="col-small-tit">外部董，监，高任职<i class="el-icon-remove-outline icon-zx"></i></h5>
          <div class="col-main">
            <el-table
              :data="wbTable"
              :header-cell-style="{textAlign:'center',background:'#3a8ee6',color:'#fff'}"
              :cell-style="{textAlign:'center'}"
              border
              style="width: 100%">
              <el-table-column
                prop="position"
                label="本公司职位"
               >
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="wpf"
                label="委派方"
               >
              </el-table-column>
            </el-table>
          </div>
      </div>
<!--       <div class="col">
        <h3 class="col-tit">项目情况</h3>
        <h5 class="col-small-tit">在建项目<i class="el-icon-remove-outline icon-zx"></i></h5>
        <div class="col-main">
          <el-table
            :data="xmTable"
            :header-cell-style="{textAlign:'center',background:'#3a8ee6',color:'#fff'}"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="zjproject"
              label="在建项目名称"
             >
            </el-table-column>
            <el-table-column
              prop="zjxmhq"
              label="在建项目获取方式"
              width="260">
            </el-table-column>
          </el-table>
        </div>
        <h5 class="col-small-tit">完成项目</h5>
        <div class="col-main">
          <el-table
            :data="completeTabale"
            :header-cell-style="{textAlign:'center',background:'#3a8ee6',color:'#fff'}"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="完成项目名称"
              >
            </el-table-column>
            <el-table-column
              prop="date"
              label="完成时间"
              >
            </el-table-column>
          </el-table>
        </div>
      </div> -->
      <div class="col">
        <h3 class="col-tit">附件管理</h3>
        <div class="col-main">
          <el-table
            :data="fileLists"
            :header-cell-style="{textAlign:'center',background:'#3a8ee6',color:'#fff'}"
            :cell-style="{textAlign:'center'}"
            border
            style="width: 100%">
            <el-table-column
              prop="FFILENAME"
              label="文件名"
            >
            </el-table-column>
            <el-table-column
              prop="FCREATETIME"
              label="时间"
            >
            </el-table-column>
            <el-table-column
              prop="FNAME"
              label="创建人"
            >
            </el-table-column>
            <el-table-column
              label="操作"
            >
             <template slot-scope="scope">
                <el-button @click="download(scope.row)" type="text" size="small">下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="col">
        <h3 class="col-tit">变更查询 <span>时间范围</span>
          <p class="p2">

            <el-form :inline="true" ref="bgForm" :model="bgForm">
              <el-form-item>
                  <el-date-picker
                  v-model="bgForm.value6"
                  unlink-panels
                  size="mini"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="onView()">查询</el-button></el-form-item>
            </el-form>
         </p>
        </h3>
        <div class="col-main">
          <el-table
            :data="tableData"
            :header-cell-style="{textAlign:'center',background:'#3a8ee6',color:'#fff'}"
            :cell-style="{textAlign:'center'}"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="DJZT"
              label="单据状态">
            </el-table-column>
            <el-table-column
              prop="GSMC"
              label="公司名称">
            </el-table-column>
            <el-table-column
              prop="CHANGETYPE"
              label="变更类型">
            </el-table-column>
            <el-table-column
              prop="FID"
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="lookChangeTable(scope.row.FID)"
                >查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <p class="close-col"><el-button type="danger" @click="dialogFormVisible = false">关闭</el-button></p>
      </div>
    </el-dialog>
    <el-dialog title="公司变更备案表"
      :visible.sync="dialogChangeTable"
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
                <el-input v-model="applicantform.company" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-main>
        <div class="changetableInfo col">
          <h3 class="col-tit">变更信息</h3>
           <!-- 变更性质跟时间 -->
          <div class="change_natureTime">
            <h5 class="col-small-tit">变更性质与时间</h5>
            <div class="col-main">
              <el-form label-width="160px">
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
                <!-- <el-row>
                  <el-col :span="6">
                    <el-form-item label="工商变更备案完成时间" label-width="160">
                      <el-input v-model="newCompany.FGSCHANGETIME" disabled ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row> -->
                <el-row>
                  <el-col :span="6" >
                    <el-form-item label="工商变更备案完成时间">
                      <el-input v-model="newCompany.FGSCHANGETIME" disabled ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20">
                    <el-form-item label="备注">
                      <el-input type="textarea" disabled v-model="newCompany.FREMARKNEW"></el-input>
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
                  <el-form label-width="170px" disabled>
                    <el-col :span="9">
                      <el-form-item label="变更前公司名称">
                        <el-input v-model="oldCompany.FCOMPANY"></el-input>
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
                <el-form label-width="170px">
                  <el-col :span="9">
                    <el-form-item label="变更前币种">
                      <el-input v-model="oldCompany.FMONEYTYPE" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9"> 
                    <el-form-item label="变更后币种">
                      <el-input v-model="newCompany.FMONEYTYPENEW" disabled></el-input>
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
                <el-form label-width="170px" disabled>
                  <el-col :span="9">
                    <el-form-item label="变更前经营/合伙期限">
                      <el-input v-model="oldCompany.FPARTNERSHIP"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="变更后经营/合伙期限">
                      <el-input v-model="newCompany.FPARTNERSHIP"></el-input>
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
              <el-form label-width="170px" disabled>
                <div class="old">
                  <el-col>
                    <el-form-item label="变更前是否境外公司">
                      <el-input v-model="oldCompany.FSFJWGS"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item label="变更前是否外资企业">
                      <el-input v-model="oldCompany.FSFWZQY"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item :label='oldNorY'>
                      <el-input v-model="oldCompany.FWZQYLX"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item label="变更前法人代表">
                      <el-input v-model="oldCompany.FLEGALPERSON"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item label="变更前执行事务合伙人">
                      <el-input v-model="oldCompany.FFZZAFFAIRWITHPERSON"></el-input>
                    </el-form-item>
                  </el-col>
                </div>
                <div class="new">
                  <el-row>
                    <el-col>
                      <el-form-item label="变更后是否境外公司">
                        <el-input v-model="newCompany.FISOVERSEASCOMPANYNEW"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item label="变更后是否外资企业">
                        <el-input v-model="newCompany.FFORGFUNENTERPSNEW"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item :label="newNorY">
                        <el-input v-model="newCompany.FOUTENTERPRISETYPENEW"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item label="变更后法人代表">
                        <el-input v-model="newCompany.FLEGALPERSONNEW"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item label="变更后执行事务合伙人">
                        <el-input 
                          v-model="newCompany.FFAIRPERSONNEW"
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
              <el-form label-width="170px" disabled>
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="变更前公司类型">
                      <el-input v-model="oldCompany.FGSLX"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="变更后公司类型">
                      <el-input v-model="newCompany.FCOMPANYTYPENEW"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row> 
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="变更前一级公司性质">
                      <el-input v-model="oldCompany.FYJGSXZ"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="变更后一级公司性质">
                      <el-input v-model="newCompany.FONECOMPANYNATURENEW"></el-input>
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
                      <el-input v-model="newCompany.FTWOCOMPANYNATURENEW"></el-input>
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
              <el-form label-width="170px" disabled>
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="变更前所属区域集团">
                      <el-input v-model="oldCompany.FSSQYJT"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="变更后所属区域集团">
                      <el-input v-model="newCompany.FAREAGROUPNEW"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="变更前所属区域公司">
                      <el-input v-model="oldCompany.FSSQYGS"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="变更后所属区域公司">
                      <el-input v-model="newCompany.AREACOMPANYNEW"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="变更前所属事业部">
                      <el-input v-model="oldCompany.FSSSYB"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="变更后所属事业部">
                      <el-input v-model="newCompany.FBIZDEPARTMENTNEW"></el-input>
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
                <el-form label-width="170px" disabled>
                  <el-col :span="9">
                    <el-form-item label="变更前印章保管人">
                      <el-input v-model="oldCompany.FSEALPERSON"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="变更后印章保管人">
                      <el-input v-model="newCompany.FSEALPERSONNEW"></el-input>
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
                <el-form label-width="170px" disabled>
                  <el-col :span="9">
                    <el-form-item label="变更前证照保管人">
                      <el-input v-model="oldCompany.FZZPERSON"></el-input>
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
              <el-form label-width="170px" disabled>
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="变更前资质情况">
                      <el-input v-model="oldCompany.FAPTITUDESITUATION"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="变更后资质情况">
                      <el-input v-model="newCompany.FAPTITUDESITUATIONNEW"></el-input>
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
                <el-form label-width="170px" disabled>
                  <el-col :span="9">
                    <el-form-item label="变更前经营范围">
                      <el-input v-model="oldCompany.FSCOPEOFOPERATION" :title="oldCompany.FSCOPEOFOPERATION"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="变更后经营范围">
                      <el-input v-model="newCompany.FSCOPEOFOPERATIONNEW" :title="newCompany.FSCOPEOFOPERATIONNEW"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-row>
            </div>
          </div>
          <!-- 注册地址 -->
          <div class="change_registeredAddress" v-if="typeSelectionChecked['13']">
            <h5 class="col-small-tit">注册地址</h5>
            <div class="col-main">
              <el-row>
                <el-form label-width="170px" disabled>
                  <el-col :span="9">
                    <el-form-item label="变更前注册地址">
                      <el-input v-model="oldCompany.FCOMPANYADDRESS" :title="oldCompany.FCOMPANYADDRESS"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="变更后注册地址">
                      <el-input v-model="newCompany.FCOMPANYADDRESSNEW" :title="newCompany.FCOMPANYADDRESSNEW"></el-input>
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
                <el-form label-width="170px" disabled>
                <el-col :span="9">
                  <el-form-item label="变更前注册资本(万元)">
                    <el-input v-model="oldCompany.FREGISTEREDCAPITAL"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                    <el-form-item label="变更后注册资本(万元)">
                      <el-input v-model="newCompany.FREGISTEREDCAPITALNEW"></el-input>
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
                    width="250">
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
                :data="subcribeChangeList"
                :header-cell-style="{textAlign:'center',background:'#409eff',color:'#fff'}"
                :cell-style="{textAlign:'center'}"
                style="width: 100%">
                <el-table-column label="变更后">
                  <el-table-column
                    type="index"
                    label="序号"
                    width="60">
                  </el-table-column>
                  <el-table-column 
                    prop="FPARTNERNAME" 
                    label="股东名称" 
                    width="250">
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
                    label="出资比例">
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 财务 --> 
          <div v-if="typeSelectionChecked['14']">
            <h3 class="col-tit">财务信息</h3>
            <!-- 合并范围 -->
            <div>
              <h5 class="col-small-tit">所属合并范围</h5>
              <div class="col-main">
                <el-form label-width="170px" disabled>
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="变更前所属合并范围">
                        <el-input v-model="oldCompany.FCOMBINERANGE"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9">
                      <el-form-item label="变更后所属合并范围">
                        <el-input v-model="newCompany.FCOMBINERANGENEW"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
            <!--公司类别 -->
            <div>
              <h5 class="col-small-tit">公司类别</h5>
              <div class="col-main">
                <el-form label-width="170px" disabled>
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="变更前公司类别">
                        <el-input v-model="oldCompany.FCOMPANYTYPEB"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9">
                      <el-form-item label="变更后公司类别">
                        <el-input v-model="newCompany.FCOMPANYTYPEBNEW" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
            <!-- 并表方 -->
            <div>
              <h5 class="col-small-tit">公司并表方</h5>
              <div class="col-main clearfix">
                <el-form label-width="170px" disabled>
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="变更前公司并表方">
                        <el-input v-model="oldCompany.FCOMPANYBBF"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9">
                      <el-form-item label="变更后公司并表方">
                        <el-input v-model="newCompany.FCOMPANYBBFNEW"></el-input>
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
                    width="250">
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
                    :data="paidinChangeList"
                    :header-cell-style="{textAlign:'center',background:'#409eff',color:'#fff'}"
                    :cell-style="{textAlign:'center'}"
                    style="width: 100%">
                    <el-table-column label="变更后">
                      <el-table-column type="index" label="序号" width="60"></el-table-column>
                      <el-table-column prop="FPARTNERNAME" label="股东名称" width="250">
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
                        label="出资比例">
                      </el-table-column>
                    </el-table-column>
                  </el-table>
            </div>
          </div>
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
                  :data="insideChangeList"
                  :header-cell-style="{textAlign:'center',background:'#409eff',color:'#fff'}"
                  :cell-style="{textAlign:'center'}"
                  style="width: 100%"
                >
                  <el-table-column
                    label="变更后"
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
                    <el-table-column prop="FZLPOSITIONNAME" label="中梁职位" >
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
              </div>
            </div>
            <!-- 外部 -->
            <div>
              <h5 class="col-small-tit">外部董,监，高任职情况</h5>
              <div class="col-main">
                <el-table
                  :data="outsideList"
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
                  :data="outsideChangeList"
                  :header-cell-style="{textAlign:'center',background:'#409eff',color:'#fff'}"
                  :cell-style="{textAlign:'center'}"
                  style="width: 100%"
                >
                  <el-table-column
                    label="变更后"
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
              </div>
            </div>
          </div>
          <!-- 附件 -->
          <div class="col" v-if="fileShow">
            <h3 class="col-tit">附件管理</h3>
            <div class="col-main">
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
                  width="250">
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
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </el-main>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import {showBase,LinkagePost,showCompanyInfoList,showtCompanyInfomationDetail,getFileList,downloadFile} from "@/api/companyinfo";
import { changegetcompany, changeCompanyType, getRegCause, getRegComp, getEnterpriseType } from "@/api/changetable";
export default {
  name: "companyinfo",
  components: {},
  data() {
    return {
      loading:false,
      doloadcl: "doloadcl1",
      companyList: [],      // 集团联动公司列表
      companyListItem: '',  // 公司列表的选中项
      typeSelectionChecked: {}, // 变更弹窗对应显隐
      newCompany: {},       // 变更后数据
      oldCompany: {},       // 变更前数据
      // 变更填写人信息
      applicantform: {
        username: "", //填写人
        writetime: "", //填写时间
        company: "", //填写公司
        companyList: []
      },
      newNorY: "变更后外资企业类型", // 变更后外资或内资
      oldNorY: "变更前外资企业类型", // 变更前内资或外资
      subcribeList: [], // 认缴明细变更前
      // 认缴明细变更后
      subcribeChangeList: [],
      // 实缴明细变更前
      paidinList: [],
      // 实缴明细变更后
      paidinChangeList: [],
      // 董,监，高任职情况 变更前
      insideList: [], // 内部
      outsideList: [], // 外部
      // 董,监，高任职情况 变更后
      insideChangeList: [], // 内部
      outsideChangeList: [], // 外部
      fileData: [], // 附件列表
      // caiwuShow: false, // 并表方显隐
      fileShow: false,  // 附件列表显隐

      /*股权结构查找表单数据*/
      companyform: {
        areaGroupData: [],
        value1: "",
        value3: "",
        gsmc: "" //公司名称
        // beginTime:'',//开始查找时间
        // endTime:'',
        // picker1:{
        //   disabledDate:(time)=>{
        //     if(this.companyform.endTime){
        //       return time.getTime() >this.searchTime.endTime.getTime()
        //     }else{
        //       return time.getTime() >Date.now();
        //     }

        //   }
        // },
        // picker2:{
        //   disabledDate:(time)=> {
        //     if(this.companyform.beginTime){
        //       return time.getTime() < this.companyform.beginTime.getTime() || time.getTime() > Date.now();
        //     }else{
        //       return time.getTime() > Date.now();
        //     }
        //   },
        // },
      },
      //表单验证
      // formrules: {
      //   gsmc:[
      //     { type:'string', message: '请输入文字', trigger: 'blur' },
      //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //   ],
      // },
      //查询所得显示数据
      /*table data*/
      companyInfoData: [],
      //分页信息
      //当前选中的页 改变时触发事件
      currentPage: 1,
      //总数 后台给传过来
      pages: 1,
      //一页30条
      size:10,
      /*详情页数据弹出层*/
      tableData: [],

      //基础信息数据
      baseData: {},
      //是否境外公司联动显示
      show0:false,
      show1:false,
      show2:false,
      show3:false,
      show4:false,
      //业务信息
      ywData: {},
      //财务信息
      cwData: {},
      //认缴明细数据
      // zczb: "",
      rjTable: [],
      //实缴明细数据
      sjTable: [],
      //股东信息情况数据
      gdTable: [],
      gdTable2: [],
      //董高监情况数据(内)
      nbTable: [],
      //董高监情况数据(内)
      wbTable: [],
      //项目情况
      // xmTable: [
      //   {
      //     id: "",
      //     zjproject: "ccccc",
      //     zjxmhq: "招标"
      //   }
      // ],
      // completeTabale: [
      //   {
      //     id: "",
      //     name: "未来海岸",
      //     date: "2010-10-11"
      //   }
      // ],
      //附件管理
      fileLists: [],
      //上传附件的fid
      initid:'',
      // url:'',
      //变更查询
      bgForm: {
        value6:''
      },
      form: {
        name: "sss",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      dialogFormVisible: false,
      dialogChangeTable: false,
      formLabelWidth: "120px",
      value6: ""
    };
  },
  computed:{
    //是否为境外公司
    jwgs(){
      return this.baseData.SFJWGS;
    },
    //是否外资企业
    wzqy(){
      return this.baseData.SFWZQYMS;
    },
  },
  watch:{
    jwgs:{
      handler(newVal,oldVal){
        // 不是境外公司
        console.log(newVal)
        if(newVal=='否'){
          this.show0=true;
          this.show3=false;
          this.show4=false;
          this.show1=false;
          this.show2=false;
        }else if(newVal=='是'){
          this.show3=true;
          this.show0=false;
          this.show1=false;
          this.show2=false;
          this.show4=false;
        }
        if(newVal==''||newVal==null){
          this.show0=true;
          this.show3=false;
          this.show4=false;
          this.show1=false;
          this.show2=false;
        }
      },
      immediate:true
    },
    wzqy:{
      handler(newVal,oldVal){
        //是外资企业show1是內2是外
       console.log(newVal)
       if(newVal!=''&&newVal!=null){
          if(newVal=='是'){
          this.show2=true;
          this.show1=false;
          console.log(this.baseData.WZQYLX)
            if(this.baseData.WZQYLX==1||this.baseData.WZQYLX==2){
              this.show3=true;
              this.show4=false;
            }else{
              this.show4=true;
              this.show3=false;
            }

         }else if(newVal=='否'){
          this.show1=true;
          this.show2=false;
           console.log(this.baseData.WZQYLX)
           if (this.baseData.WZQYLX==1||this.baseData.WZQYLX==2||this.baseData.WZQYLX==3||this.baseData.WZQYLX==4) {
              this.show3=true;
              this.show4=false;
           }else{
              this.show4=true;
              this.show3=false;
           }
         }
       }else{
        //境外公司为空
        this.show4=false;
        this.show2=false;
        this.show1=false;
       }
       
      },
      immediate:true,
      deep:true
    },
  },
  methods: {
    //下载附件
    download(row){
      // let param={
      //   fid:row.FID
      // }
      // window.open('http://192.16.8.86/dst/fileController/downloads?fid=' + row.FID)
      window.open('/dst/fileController/downloads?fid='+ row.FID)
    },
    //显示附件列表
    showFile(){
      let param={
        fid:this.initid
      }
      getFileList(param).then(res => {
        // console.log(res)
        let list=[];
        this.fileLists=[]
        if(res.body.code=='999'){
          list=res.body.data.list;
          for(let i = 0;i<list.length;i++){
            this.fileLists.push({
              FCREATETIME:this.timeStamp(list[i].FCREATETIME),
              FFILENAME:list[i].FFILENAME,
              FID:list[i].FID,
              FNAME:list[i].FNAME
            })
          }
        }
      });
    },
    //时间表转换
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
    changeQYJT(val) {
      if (val) {
        this.getQYJT(val);
        this.companyList = [];
        this.companyListItem = "";
      } else {
        this.companyList = [];
        this.companyListItem = "";
      }
    },
    getQYJT(curVal) {
      let param = {
        areagroupid: curVal
      };
      LinkagePost(param).then(res => {
        if (res.body.data) {
          this.companyList = res.body.data;
        }
      });
    },
    //初始化信息展示
    baseTop() {
      showBase().then(res => {
        console.log(res);
        //获取上方的信息
        if (res.body.code == "999") {
          //这里获取了董监高信息
          // this.companyform.djgPersonNameData = res.body.data.djgPersonNameData;
          this.companyform.areaGroupData = res.body.data.areaGroupData;
          // this.companyInfoData = res.body.data.companyInfoData;
        }
      });
      //获取表格信息展示
      this.onSubmit('companyform',1);
    },
    //分页展示
    handleCurrentChange(val) {
      //根据页数更改信息
      this.currentPage = val;
      this.onSubmit('companyform',1);
    },
    //查询
    onSubmit(formName,type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading=true;
          //获取信息
          if(type==2){
            //点击查询初始化页数
             this.currentPage = 1;
             this.pages=1
          }
          let param={
             pageNo:this.currentPage,
             areaGroup:this.companyform.value1,//区域集团编号 
             areaCompany:this.companyListItem,//区域公司编号
             areaPart:'',//所属事业部编号
             companyName:this.companyform.gsmc,//公司名称
             djgId:this.companyform.value3//董监高编号
          }
          //先对数据进行清空
          this.companyInfoData=[]

          showCompanyInfoList(param).then((res)=>{
            // console.log('根据条件信息显示')
            console.log(res)
            if(res.body.data){
              //获取总条目
                this.pages=res.body.data.count;
                // this.companyInfoData=res.body.data.getIndexInfomationData;
                let companyData=res.body.data.getIndexInfomationData;
                for(let i=0;i<companyData.length;i++){
                  this.companyInfoData.push({
                    XYM:companyData[i].XYM,
                    CYM:companyData[i].CYM,
                    ZCZB:companyData[i].ZCZB,
                    BZ:companyData[i].BZ,
                    QYLX:companyData[i].QYLX,
                    GSLX:companyData[i].GSLX,
                    YJGSXZ:companyData[i].YJGSXZ,
                    EJGSXZ:companyData[i].EJGSXZ,
                    FRDB:companyData[i].FRDB,
                    ZXSWHHR:companyData[i].ZXSWHHR,
                    JYHHQX:this.changetype(companyData[i].JYHHQX),
                    TZFS:companyData[i].TZFS,
                    TYSHXYDM:companyData[i].TYSHXYDM,
                    CLRQ:this.timeStamp(companyData[i].CLRQ),
                    SSQYJT:companyData[i].SSQYJT,
                    SSQYGS:companyData[i].SSQYGS,
                    SSSYB:companyData[i].SSSYB,
                    ZJBGR:companyData[i].ZJBGR,
                    YZBGR:companyData[i].YZBGR,
                    ZZQK:companyData[i].ZZQK,
                    SSHBFW:companyData[i].SSHBFW,
                    GSLB:companyData[i].GSLB,
                    GSBBF:companyData[i].GSBBF,
                    FID:companyData[i].FID,
                    INSIDESTRING:companyData[i].INSIDESTRING,
                    OUTSIDESTRING:companyData[i].OUTSIDESTRING
                  })
                }
                 this.loading=false;
              }
          })
        } else {
          alert("error submit!!");
          return false;
        }
      });
    },
    //经营合伙期限合适更改
    changetype(val){
      if(val){
        let a=JSON.parse(val);
        return a[0]+'\n'+a[1];
      }
    },
    //查看函数（穿透到公司详情页）
    handleView(row) {
       this.baseData.SFJWGS='';
       this.baseData.SFWZQYMS='';
       this.bgForm.value6=''
       this.dialogFormVisible = true;
       this.initid=row.FID;
        // console.log(row.FID)
        let param={
          fid:row.FID,
          startTime:'',//变更查询开始时间，
          endTime:''// 变更查询结束时间
        }
        this.showFile()
        showtCompanyInfomationDetail(param).then((res)=>{
          if (res.body.data) {
            this.tableData = res.body.data.companyChangeInfoData;
            let newdata=res.body.data;
            let companyBaseInfoData=newdata.companyBaseInfoData;
            this.baseData={};
            if(companyBaseInfoData.length>0){
              this.baseData=companyBaseInfoData[0];
              if(companyBaseInfoData[0].JYHHQX){
                this.baseData.JYHHQX=JSON.parse(companyBaseInfoData[0].JYHHQX).join('—')
              }
              
            } 
            //注册资本
           //业务信息
            this.ywData={};
            this.ywData={
              xydm:companyBaseInfoData[0].TYSHXYDM ,
              clrq:this.timeStamp(companyBaseInfoData[0].CLRQ), 
              zxsj:this.timeStamp(companyBaseInfoData[0].ZXSJ),
              yzbg: companyBaseInfoData[0].YZBGR,
              zzbg: companyBaseInfoData[0].ZZBGR,
              zcsj:this.timeStamp(companyBaseInfoData[0].XYYZZSH)

            }
            //财务信息
             this.cwData={
                hbfw: companyBaseInfoData[0].FNAME,
                gslb: companyBaseInfoData[0].GSLB,
                gsbbf: companyBaseInfoData[0].GSBBF
            }
            //认缴明细
            let rj=newdata.rjData;
            // console.log(rj)
            this.gdTable=[];
            this.rjTable=[]
            for(let i=0;i<rj.length;i++){
              this.rjTable.push(
                { gdmc:rj[i].FPARTNERNAME,
                  gdgsxz:rj[i].FPARTNERNATURENAME,
                  rjje: rj[i].FSUBCRIBEMONEY,
                  rjsj: rj[i].FSUBCRIBETIME,
                  czbl: rj[i].FCAPITALKEY
                }
              )
              //工商股比
              this.gdTable.push(
                { 
                  name:rj[i].FPARTNERNAME,
                  gdgsxz:rj[i].FPARTNERNATURENAME,
                  gb:rj[i].FCAPITALKEY
                }
              )
            }
            //实缴明细
             this.sjTable=[]
             let sj=newdata.sjData;
             this.gdTable2=[];
             // console.log(sj)
            for(let i=0;i<sj.length;i++){
              this.sjTable.push(
                { gdmc:sj[i].FPARTNERNAME,
                  gdgsxz:sj[i].FPARTNERNATURENAME,
                  sjje: sj[i].FPAIDINMONEY,
                  sjsj: sj[i].FPAIDINTIME,
                  czbl: sj[i].FCAPITALKEY
                }
              )
              //财务股比
              this.gdTable2.push(
                {
                  name2:sj[i].FPARTNERNAME,
                  gdgsxz2:sj[i].FPARTNERNATURENAME,
                  gb2:sj[i].FCAPITALKEY
                }
              )
            }
            //内部董，监，高任职
            this.nbTable=[];
            let nb=newdata.innerDjgData;
            for(let i=0;i<nb.length;i++){
              this.nbTable.push(
                { 
                  position:nb[i].FPOSITIONNAME,
                  name:nb[i].FPERSONNAME,
                  zlzw:nb[i].FZLPOSITIONNAME,
                  qyjt: nb[i].FAREABLOCNAME,
                  qygs: nb[i].FAREACOMPANYNAME
                }
              )
            }
           this.wbTable=[]
            //外部董，监，高任职
            let wb=newdata.outsideDjgData;
            // console.log(wb)
            for(let i=0;i<wb.length;i++){
              this.wbTable.push(
                { 
                  position:wb[i].FPOSITIONNAME,
                  name:wb[i].FPERSONNAME,
                  wpf:wb[i].FSHAREHOLDERNAME,
                }
              )
            }
          }
        })
    },
    //查看更详情（穿透到变更详情页）
    onView() {
      this.tableData=[];
      // console.log(this.bgForm.value6)
      let time=this.bgForm.value6;
      let startTime='';
      let endTime='';
      if(this.bgForm.value6){
        startTime=time[0];
        endTime=time[1]
      }else{
        startTime='';
        endTime='';
      }
      console.log(startTime,endTime)
      // console.log(this.structureform);
      let param={
        fid:this.initid,
        startTime:startTime,//变更查询开始时间，
        endTime:endTime// 变更查询结束时间
      }
      showtCompanyInfomationDetail(param).then((res)=>{
        console.log(res)
        if (res.body.data) {
          console.log(res.body.data.companyChangeInfoData,'查看变更查询')
          this.tableData = res.body.data.companyChangeInfoData;
        }
      })
      // alert('submit!');
    },
    // 变更查看
    lookChangeTable (fid) {
      this.dialogChangeTable = true;
      let params = {
        companyid: '',
        fid
      };
      changegetcompany(params).then(res => {
        if (res.body.code == "999") {
          let resd = res.body.data;
          console.log(resd, '666666666666666');
          this.oldCompany = resd.companyList[0];
          this.newCompany = resd.companyChangeList[0];
          this.applicantform.username = resd.username;
          this.applicantform.writetime = resd.wrtietime;
          this.applicantform.company = resd.companyList[0].FCOMPANY;
          // resd.page == 'node3' ? this.caiwuShow = true : this.caiwuShow = false;
          for (let i = 0; i < resd.companychange.length; i ++) {
            this.typeSelectionChecked[resd.companychange[i].FTYPEID] = true;
          }
          // 币种
          for (let i = 0; i < resd.currencyList.length; i++) {
            resd.companyList[0].FMONEYTYPE == resd.currencyList[i].FNUMBER ? (this.oldCompany.FMONEYTYPE = resd.currencyList[i].FNAME) : "";
            resd.companyChangeList[0].FMONEYTYPENEW == resd.currencyList[i].FNUMBER ? (this.newCompany.FMONEYTYPENEW = resd.currencyList[i].FNAME) : "";
          }
          // 合伙期限
          if (!!resd.companyList[0].FPARTNERSHIP) {
            this.oldCompany.FPARTNERSHIP = JSON.parse(resd.companyList[0].FPARTNERSHIP).join(' - ');
          }
          if (!!resd.companyChangeList[0].FPARTNERSHIP) {
            this.newCompany.FPARTNERSHIP = JSON.parse(resd.companyChangeList[0].FPARTNERSHIP).join(' - ');
          }
          // 企业类型及代表
          if (this.oldCompany.FSFWZQY == "是") {
            this.oldNorY = "变更前外资企业类型";
          } else {
            this.oldNorY = "变更前内资企业类型";
          }
          if(this.newCompany.FFORGFUNENTERPSNEW == '1') {
            this.newNorY = "变更后外资企业类型";
          } else {
            this.newNorY = "变更后内资企业类型";
          }
          // 所有的是和否
          if (!!resd.IsenableList) {
            for (let i = 0; i < resd.IsenableList.length; i ++) {
              // 是否境外公司
              resd.companyChangeList[0].FISOVERSEASCOMPANYNEW ==  resd.IsenableList[i].FNUMBER ? 
              this.newCompany.FISOVERSEASCOMPANYNEW = resd.IsenableList[i].FNAME : '';
              // 是否外资企业
              resd.companyChangeList[0].FFORGFUNENTERPSNEW == resd.IsenableList[i].FNUMBER ?
              this.newCompany.FFORGFUNENTERPSNEW = resd.IsenableList[i].FNAME : '';
            }
          }
          // 变更后内/外资企业类型
          let param = {
            superiorcode: resd.companyChangeList[0].FFORGFUNENTERPSNEW,
            superiortype: "OUTINSIDE"
          };
          getEnterpriseType(param).then(res => {
            if (!!res.body.data.typeList) {
              for (let i = 0; i < res.body.data.typeList.length; i++) {
                resd.companyChangeList[0].FOUTENTERPRISETYPENEW == res.body.data.typeList[i].FNUMBER ?
                this.newCompany.FOUTENTERPRISETYPENEW = res.body.data.typeList[i].FNAME : '';
              }
            }
          });
          // 资质情况
          for (let i = 0; i < resd.qualificationsList.length; i++) {
            if ( resd.qualificationsList[i].FNUMBER == resd.companyList[0].FAPTITUDESITUATION ) {
              this.oldCompany.FAPTITUDESITUATION = resd.qualificationsList[i].FNAME;
            }
            if ( resd.qualificationsList[i].FNUMBER == resd.companyChangeList[0].FAPTITUDESITUATIONNEW ) {
              this.newCompany.FAPTITUDESITUATIONNEW = resd.qualificationsList[i].FNAME;
            }
          }
          // 公司类型公司性质
          let param4 = {
            superiorcode: resd.companyChangeList[0].FCOMPANYTYPENEW,
            superiortype: resd.companyChangeList[0].FONECOMPANYNATURENEW,
            type: 'type'
          };
          changeCompanyType(param4).then(res => {
            if (res.body.code == "999") {
              for (let i = 0; i < res.body.data.typeList.length; i++) {
                if (
                  res.body.data.typeList[i].FNUMBER == resd.companyChangeList[0].FTWOCOMPANYNATURENEW ) {
                  this.newCompany.FTWOCOMPANYNATURENEW = res.body.data.typeList[i].FNAME;
                }
              }
            }
          });
          let param3 = {
            superiorcode: resd.companyChangeList[0].FCOMPANYTYPENEW,
            superiortype: "COMPANY_TYPE"
          };
          changeCompanyType(param3).then(res => {
            if (res.body.code == "999") {
              for (let i = 0; i < res.body.data.typeList.length; i++) {
                if (
                  res.body.data.typeList[i].FNUMBER ==
                  resd.companyChangeList[0].FONECOMPANYNATURENEW
                ) {
                  this.newCompany.FONECOMPANYNATURENEW = res.body.data.typeList[i].FNAME;
                }
              }
            }
          });
          for (let i = 0; i < resd.companytypeList.length; i++) {
            if (resd.companytypeList[i].FNUMBER == resd.companyChangeList[0].FCOMPANYTYPENEW) {
              this.newCompany.FCOMPANYTYPENEW = resd.companytypeList[i].FNAME;
            }
          }
          // 所属区域集团/公司/事业部
          let param2 = {
            areacompanyid: resd.companyChangeList[0].AREACOMPANYNEW
          };
          getRegCause(param2).then(res => {
            this.regCause = res.body.data;
            for (let i = 0; i < res.body.data.length; i++) {
              if (
                res.body.data[i].ID ==
                resd.companyChangeList[0].FBIZDEPARTMENTNEW
              ) {
                this.newCompany.FBIZDEPARTMENTNEW = res.body.data[i].NAME;
              }
            }
          });
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
                  this.newCompany.AREACOMPANYNEW = res.body.data[i].NAME;
                }
              }
            }
          });
          for (let i = 0; i < resd.districtGroupList.length; i++) {
            if (
              resd.districtGroupList[i].ID ==
              resd.companyChangeList[0].FAREAGROUPNEW
            ) {
              this.newCompany.FAREAGROUPNEW = resd.districtGroupList[i].NAME;
            }
          }
          // 认缴明细
          this.subcribeList = resd.subcribeList;
          this.subcribeChangeList = resd.subcribeChangeList;
          // 财务信息
          // 合并范围
          for (let i = 0; i < resd.mergingscopeList.length; i++) {
            if ( resd.companyList[0].FCOMBINERANGE == resd.mergingscopeList[i].FNUMBER ) {
              this.oldCompany.FCOMBINERANGE = resd.mergingscopeList[i].FNAME;
            }
            if ( resd.companyChangeList[0].FCOMBINERANGENEW == resd.mergingscopeList[i].FNUMBER ) {
              this.newCompany.FCOMBINERANGENEW = resd.mergingscopeList[i].FNAME;
            }
          }
          // 公司类别
          for (let i = 0; i < resd.companytypesList.length; i++) {
            if ( resd.companyList[0].FCOMPANYTYPEB == resd.companytypesList[i].FNUMBER ) {
              this.oldCompany.FCOMPANYTYPEB = resd.companytypesList[i].FNAME;
            }
            if ( resd.companyChangeList[0].FCOMPANYTYPEBNEW == resd.companytypesList[i].FNUMBER ) {
              this.newCompany.FCOMPANYTYPEBNEW = resd.companytypesList[i].FNAME;
            }
          }
          // 并表方
          for (let i = 0; i < resd.companybbfList.length; i++) {
            if ( resd.companyList[0].FCOMPANYBBF == resd.companybbfList[i].FNUMBER ) {
              this.oldCompany.FCOMPANYBBF = resd.companybbfList[i].FNAME;
            }
            if ( resd.companyChangeList[0].FCOMPANYBBFNEW == resd.companybbfList[i].FNUMBER ) {
              this.newCompany.FCOMPANYBBFNEW = resd.companybbfList[i].FNAME;
            }
          }

          // 实缴明细
          this.paidinChangeList = resd.paidinChangeList;
          this.paidinList = resd.paidinList;
          // 董监高
          // 内部
          this.insideList = resd.insideList;
          this.insideChangeList = resd.insideChangeList;
          // 外部
          this.outsideList = resd.outsideList;
          this.outsideChangeList = resd.outsideChangeList;
          // 附件列表
          Vue.http.get("fileController/list?fid=" + resd.filechangeid).then(res => {
            console.log(res, '88888888888')
            if (res.body.code == '999') {
              res.body.data.list.length != 0 ? this.fileShow = true : this.fileShow = false;
              this.fileData = res.body.data.list;
              for (let i = 0; i < this.fileData.length; i++) {
                this.fileData[i].FCREATETIME = this.timeStamp(
                  this.fileData[i].FCREATETIME
                );
              }
            }
          });
        }
      })
    },
    //为表格设置样式
    isCenter({ row, column, rowIndex, columnIndex }) {
      return "text-align:center";
    },
    //为表头设置样式
    istabtop({ row, column, rowIndex, columnIndex }) {
      return "text-align:center;background-color:#409eff;color:#fff;";
    },
  },
  mounted() {
    this.baseTop();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.structure {
  .el-header {
    background: #fff;
    padding: 20px;
    margin: 20px;
    padding-bottom:0px;
  }
  .el-main {
    padding: 0px;
    margin: 0 20px;
  }

  .table-col {
    min-height: 400px;
    table {
      th {
        background: #3a8ee6;
        color: #fff;
      }
    }
    .page-col {
      margin-top: 10px;
    }
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
      padding: 20px 20px 30px;
      .p1 {
        margin: 0 0 20px 0;
        .span1 {
          display: inline-block;
        }
      }
    }
    .col-tit {
      span {
        margin: 0 10px;
        font-size: 14px;
      }
    }
    .close-col {
      padding-bottom: 40px;
      text-align: right;
      padding-right: 20px;
    }
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: auto;
  }
  .el-form-item{
    margin-bottom:20px;
  }
}
.old {
  float: left;
  width: 38%;
}
.new {
  float: left;
  width: 38%;
}

</style>
