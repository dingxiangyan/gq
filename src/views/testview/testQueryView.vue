<!--必要的组件说明-->
<!-- 股权结构表-->
<!-- author:duanhaowei. date:2018/10/22 19:34-->
<template>
  <el-container class="testajax">
    <el-main class="contain">
        <el-form :model="forms" class="form">
              <el-row >
                <el-col :span="item.span" v-for="(item,index) in forms.arr" :key="index">
                  <el-form-item :label="item.label" :label-width="formLabelWidth">
                    <el-select v-model="item.value"  v-if="item.type=='select'" style="width: 100%" :placeholder="item.pleaceholder"
                    clearable >
                      <el-option
                        v-for="items in item.optionsgd"
                        :key="items.value"
                        :label="items.label"
                        :value="items.value">
                      </el-option>
                    </el-select>
                    <el-input v-model="item.value" v-if="item.type=='input'" autocomplete="off" :placeholder="item.pleaceholder" clearable></el-input>
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
                   
                    
                   
                  </el-form-item>
                </el-col>
                 <el-col :span="6">
                  <el-form-item>
                   <div style="width100%;" class="clearfix">
                     <!-- v-if="$store.getters.name==='杜炜' || $store.getters.name==='刘如彬'" -->
                     <el-button type="primary" @click="onSubmit" class="fr">查询</el-button>
                    <el-button type="warning"  @click="upload" class="fr" style="margin-right:20px;">新增</el-button>
                    
                   </div>
                  </el-form-item>
                </el-col>
              </el-row>
        </el-form>
        <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="是否中梁内部股东">
            <el-select v-model="formInline.value" placeholder="请选择">
              <el-option
                v-for="item in formInline.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="股东名称">
            <el-select v-model="formInline.value1" placeholder="请选择">
              <el-option
                v-for="item in formInline.options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态">
            <el-select v-model="formInline.value2" placeholder="请选择">
              <el-option
                v-for="item in formInline.options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="股东类型">
            <el-select v-model="formInline.value3" placeholder="请选择">
              <el-option
                v-for="item in formInline.options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="查询开始日期">
            <el-date-picker
                v-model="formInline.prick"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="查询结束日期">
            <el-date-picker
                v-model="formInline.prick1"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form> -->
    <!-- 这里是新增的弹出层 -->
    <el-dialog title="股东信息编辑" :visible.sync="dialogFormVisible" top="7vh" :close-on-click-modal=false class="doling"
    width="40%" @closed="closed('ruleForm')">
     <el-container>
       <el-main style="height:450px;padding-left:0;">
         <!-- :disabled="disab" -->
          <el-form :model="form" ref="ruleForm">  
        <el-form-item v-for="(item,index) in form.arr" :label="item.label" 
        :label-width="formLabelWidth" :key="index"
        :rules="item.rules" :prop="'arr.' + index + '.value'"
                  :ref="item.prop"
        >
        <el-select v-model="item.value"  :placeholder="item.placeholder" v-if="item.type=='select'"
        clearable
        :disabled="item.disabled"
        style="width:100%;">
          <el-option
            v-for="items in item.optionsgd"
            :key="items.value"
            :label="items.label"
            :value="items.value"
            :disabled="item.disabled"
            >
          </el-option>
        </el-select>
        <el-input v-model="item.value" v-if="item.type=='input'" autocomplete="off"
        :placeholder="item.placeholder" clearable :disabled="item.disabled"></el-input>

        </el-form-item>  
        <!-- <el-form-item label="股东类型" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="法人股东">
          <el-option
            v-for="item in form.optionsgd"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="股东名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item> -->
      </el-form>
        </el-main>
     </el-container>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" @click="back()" v-show="pages1=='node3'">驳回</el-button>
        <el-button type="success" @click="audit()" v-show="pages1=='node3'">审核</el-button>
        <el-button  type="primary" @click="save('2')" v-show="pages1=='node1'">保存</el-button>
        <el-button type="primary" @click="save('3')" v-show="pages1=='node1'">提交</el-button>
        <el-button @click="dialogFormVisible = false"  type="primary">取 消</el-button>
      </div>
     
      
    </el-dialog>
    <el-table
      :data="tableData"
      style="width: 100%;margin-top:20px;"
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
        label="审核状态">
      </el-table-column>
      <el-table-column
        prop="name"
        label="股东名称">
      </el-table-column>
      <el-table-column
        prop="type"
        label="股东类型">
      </el-table-column>
      <el-table-column
        prop="stat"
        label="是否中梁内部股东"
        width=150>
      </el-table-column>
      <el-table-column
        prop="prick"
        label="日期"
        :formatter="timeStamp"
        >
      </el-table-column>
      <el-table-column
        prop="creatname"
        label="创建人">
      </el-table-column>
      <el-table-column label="操作" width=200>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="upload(scope.$index, tableData)"
          v-if="scope.row.button=='1'">编辑</el-button>
          <el-button
          size="mini"
          @click="upload(scope.$index, tableData)"
          v-if="scope.row.button=='2'">查看</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="remove(scope.$index,tableData)"
          v-if="scope.row.del=='1'">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <!-- 设置分页 -->
    <div align="left" style="padding-left:20px;margin-top:20px;">
      <el-pagination
        @current-change="handleCurrentChange"

        :current-page.sync="currentPage"
        :page-size=30	
        layout="prev, pager, next, jumper"
        :total="pages">
      </el-pagination>
    </div>
    </el-main>
    
  </el-container>
</template>

<script>
  import Vue from "vue";
  import {indexform,addform,commiom,addform1,uploads,addform2,change,changegs,changework,changecity,saves,
  examine,rerurns,removes,repeatname} from "@/api/testQueryView";
  export default {
    name: "testQueryView",
    components: {},
    data() {
      return {
        forms:{
         name:'',
         
         arr:[
          {
             span:6,
            label:'是否中梁内部股东',
            value:'',
            type:'select',
            pleaceholder:'请选择',
            optionsgd: [],
              value1:''
          },
          {
             span:6,
            label:'股东名称',
            value:'',
            type:'input',
            pleaceholder:'请输入股东名称',
          },
           {
             span:6,
            label:'审核状态',
            value:'',
            type:'select',
            pleaceholder:'',
            optionsgd: [{
                value: '选项1',
                label: '已审核'
              }, {
                value: '选项2',
                label: '未审核'
              }, {
                value: '选项3',
                label: '全选'
              }],
              value1:''
          },
           {
             span:6,
            label:'股东类型',
            value:'',
            type:'select',
            pleaceholder:'',
            optionsgd: [{
                value: '选项1',
                label: '自然人股东'
              }, {
                value: '选项2',
                label: '法人股东'
              }, {
                value: '选项3',
                label: '全选'
              }],
              value1:''
          },
         
          
          
        ]
       },
       formLabelWidth:'130px',
       pickerOptions1:{
              disabledDate:(time)=>{
                if(this.formInline.prick1){
                  return time.getTime() >this.formInline.prick1.getTime()
                }else{
                  return time.getTime() >Date.now();
                }
                          
              }
            },
            pickerOptions2:{
              disabledDate:(time)=> {
                if(this.formInline.prick){
                  return time.getTime() < this.formInline.prick.getTime() || time.getTime() > Date.now();
                }else{
                  return time.getTime() > Date.now();
                }
              },
            },
        formInline: {
          
        prick:'',
        prick1:'',
          
        },
        tableData: [
         
        ],
        
        // 这里是新增的穿投层数据
         dialogFormVisible: false,
        form: {
         
        
        //这里新增弹出层的股东类型数据
        arr:[
          {
            label:'股东类型',
            value:'',
            type:'select',
            placeholder:'请选择',
            optionsgd: [{
                value: '选项1',
                label: '是'
              }, {
                value: '选项2',
                label: '否'
              }, {
                value: '选项3',
                label: '全选'
              }],
            disabled:false,
            prop: "stockholder",
            rules: {
              required: true,
              message: " ",
            }
          },
          {
            label:'股东名称',
            value:'',
            type:'input',
            placeholder:'请输入',
            disabled:false,
            prop: "stockholderName",
            rules: {
              required: true,
              message: " ",
            }
              
          },
          // {
          //   label:'股东名称',
          //   value:'',
          //   type:'input',
          // },
          {
            label:'社会信用代码',
            value:'',
            type:'input',
            disabled:false,
            // prop: "SocialCreditCode",
            rules: {
              required: false,
              message: " ",
            }
          },
          {
            label:'身份证号',
            value:'',
            type:'input',
            disabled:false,
            // prop: "IDnumber",
            rules: {
              required: false,
              message: " ",
            }
          },
           {
            label:'是否中梁内部股东',
            value:'',
            type:'select',
            placeholder:'请选择',
            optionsgd: [{
                value: '选项1',
                label: '是'
              }, {
                value: '选项2',
                label: '否'
              }, {
                value: '选项3',
                label: '全选'
              }],
              value1:'',
              disabled:false
          },
          {
            label:'所属区域集团',
            value:'',
            type:'select',
            placeholder:'请选择',
            optionsgd: [],
              value1:'',
              disabled:false
          },
          {
            label:'所属区域公司',
            value:'',
            type:'select',
            placeholder:'请选择',
            optionsgd: [],
              value1:'',
              disabled:false
          },
          {
            label:'所属事业部',
            value:'',
            type:'select',
            placeholder:'请选择',
            optionsgd: [],
              value1:'',
              disabled:false
          },
          {
            label:'公司类型',
            value:'',
            type:'select',
            placeholder:'请选择',
            optionsgd: [],
              value1:'',
              disabled:false
          },
          {
            label:'一级公司性质',
            value:'',
            type:'select',
            placeholder:'请选择',
            optionsgd: [],
              value1:'',
              disabled:false
          },
          {
            label:'二级公司性质',
            value:'',
            type:'select',
            placeholder:'请选择',
            optionsgd: [],
              value1:'',
              disabled:false
          },
          {
            label:'公司住所',
            value:'',
            type:'input',
            disabled:false
          },
          {
            label:'居住地',
            value:'',
            type:'input',
            disabled:false
          },
          {
            label:'省',
            value:'',
            type:'select',
            placeholder:'请选择',
            optionsgd: [],
              value1:'',
              disabled:false
          },
          {
            label:'市',
            value:'',
            type:'select',
            placeholder:'请选择',
            optionsgd: [],
              value1:'',
              disabled:false
          },
        ]
        },
        formLabelWidth: '150px',
        //分页
        //当前选中的页 改变时触发事件
       currentPage:1,
       //总数 后台给传过来
       pages:1000,
       //点击编辑时候传给后台的id 新增则为空
       idd:'',
       //股东类型下拉
       shareHolderType:[],
       //是否中梁内部股东下拉
       isInnerZL:[],
       //所属区域集团下拉

       //公司类型下拉
       companyTypeData:[],
       //省下拉
       provinceData:[],
       //按钮判断
       pages1:'',
       //判断是否disabled
       disab:false,
       //分页器的选中的页码
       values:1
      };
    },
    methods: {
      //进去首页的交互
      indexfo(){
        indexform().then((res)=>{
          if(res.body.code==='999'){
            // console.log(res)
            this.forms.arr[0].optionsgd = [];
            this.forms.arr[2].optionsgd = [];
            this.forms.arr[3].optionsgd = [];
             this.tableData=[];
            console.log(res.body.data)
            addform1(res.body.data.isInnerZL,this.forms.arr[0].optionsgd)
            addform1(res.body.data.auditingStatus,this.forms.arr[2].optionsgd)
            addform1(res.body.data.shareHolderType,this.forms.arr[3].optionsgd)
            for(let i=0;i<res.body.data.shareHolderListTop30.length;i++){
              this.tableData.push({state:res.body.data.shareHolderListTop30[i].SHZT,name:res.body.data.shareHolderListTop30[i].GDMC,
              type:res.body.data.shareHolderListTop30[i].GDLX,
              stat:res.body.data.shareHolderListTop30[i].SFNBGD,
              prick:res.body.data.shareHolderListTop30[i].FCREATETIME,
              creatname:res.body.data.shareHolderListTop30[i].CJR,
              id:res.body.data.shareHolderListTop30[i].FID,
              button:res.body.data.shareHolderListTop30[i].BUTTON,
              del:res.body.data.shareHolderListTop30[i].DEL,

              })
            }
            this.pages = res.body.data.count;
          }
          
        })
      },
      query(val){
        let value = 1;
        if(val){
          value = val;
          this.values = val;
        }else{
          value = 1;
        }
        let param = {
          pageNo:value,
          fIsInnerId:this.forms.arr[0].value,  
          fshareHolderName:this.forms.arr[1].value,
          fstatusId:this.forms.arr[2].value,
          fshareholdertypeid:this.forms.arr[3].value,
          startTime:this.formInline.prick,
          endTime:this.formInline.prick1,
        }
        console.log(param)
        commiom(param).then((res)=>{
          console.log(res)
          if(res.body.code=='999'){
            this.tableData=[];
            if(res.body.data.totalCount==0){
              this.tableData=[];
              this.$message({
                type: 'error',
                message: '查询无数据!'
              });
              this.pages = 1
            }else{
              for(let i=0;i<res.body.data.shareHolderList.length;i++){
              this.tableData.push({state:res.body.data.shareHolderList[i].SHZT,name:res.body.data.shareHolderList[i].GDMC,
              type:res.body.data.shareHolderList[i].GDLX,
              stat:res.body.data.shareHolderList[i].SFNBGD,
              prick:res.body.data.shareHolderList[i].FCREATETIME,
              creatname:res.body.data.shareHolderList[i].CJR,
              id:res.body.data.shareHolderList[i].FID,
              button:res.body.data.shareHolderList[i].BUTTON,
              del:res.body.data.shareHolderList[i].DEL,
              })
            }
            this.pages = res.body.data.totalCount;
            if(value==1){
              this.$message({
                type: 'success',
                message: '查询成功!'
              });
            }
             
            }
            
            

          }
        })
      },
      //点击查询
      onSubmit(){
        this.query();
      },
      rowclick(e) {
        this.$alert(e.address, e.name, {
          confirmButtonText: "确定"
        });
      },
      //时间格式转化
      timeStamp:function(row,column,cellValue,index){
        if(cellValue){
           var date = new Date(cellValue);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          // var D = date.getDate() + ' ';
          var D =  date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
          // var h = date.getHours() + ':';
          // var m = date.getMinutes() + ':';
          // var s = date.getSeconds();
          return Y+M+D;
        }else{
          return cellValue;
        }
        
      },
      // 编辑按钮操作  弹出框  并且可能传入值
       upload(index,rows){
         this.dialogFormVisible = true;

         if(index,rows){
           console.log(rows[index].id)
           this.idd = rows[index].id;
         }else{
           this.idd = '';
         }
         let param = {
           shareid:this.idd
         }
         for(let i=0;i<this.form.arr.length;i++){
             this.form.arr[i].value = ''
           }
         uploads(param).then((res)=>{
           console.log(res)
           this.form.arr[0].optionsgd = [];
           this.form.arr[4].optionsgd = [];
           this.form.arr[8].optionsgd = [];
           this.form.arr[13].optionsgd = [];
           this.form.arr[5].optionsgd = [];
           
           addform1(res.body.data.shareHolderType,this.form.arr[0].optionsgd);
           addform1(res.body.data.isInnerZL,this.form.arr[4].optionsgd);
           addform2(res.body.data.districtGroupList,this.form.arr[5].optionsgd);
           addform1(res.body.data.companyTypeData,this.form.arr[8].optionsgd);
           addform1(res.body.data.provinceData,this.form.arr[13].optionsgd);
           this.pages1 = res.body.data.page;
           if(this.pages1==='node1'){
            //  this.disab = false;

            let arr = [1,13,14,0,4]
            for(let i=0;i<this.form.arr.length;i++){
              if (arr.indexOf(i) != -1) {
                this.form.arr[i].disabled = false;
              }
            }
           }else{
            //  this.disab = true;
            let arr = [1,13,14,0,4]
            for(let i=0;i<this.form.arr.length;i++){
              if (arr.indexOf(i) != -1) {
                this.form.arr[i].disabled = true;
              }
            }
           }
          //  console.log(this.page1)
           if(res.body.data.shareholderinfo.length!=0){
             this.form.arr[0].value = res.body.data.shareholderinfo[0].FSHAREHOLDERTYPEID;
             this.form.arr[1].value = res.body.data.shareholderinfo[0].FSHAREHOLDERNAME;
             this.form.arr[2].value = res.body.data.shareholderinfo[0].FSOCIALCREDITCODE;
             this.form.arr[3].value = res.body.data.shareholderinfo[0].FIDNUMBER;
             this.form.arr[4].value = res.body.data.shareholderinfo[0].FISINNERID;
             this.form.arr[5].value = res.body.data.shareholderinfo[0].FREGIONALGROUP;
             this.form.arr[6].value = res.body.data.shareholderinfo[0].FREGIONALCOMPANY;
             this.form.arr[7].value = res.body.data.shareholderinfo[0].FREGIONALPART;
             this.form.arr[8].value = res.body.data.shareholderinfo[0].FCOMPANYTYPEID;
             this.form.arr[9].value = res.body.data.shareholderinfo[0].FFIRSTCOMPANYNATUREID;
             this.form.arr[10].value = res.body.data.shareholderinfo[0].FTWOCOMPANYNATUREID;
             this.form.arr[11].value = res.body.data.shareholderinfo[0].FCOMPANYADDRESS;
             this.form.arr[12].value = res.body.data.shareholderinfo[0].FDOMICILE;
             this.form.arr[13].value = res.body.data.shareholderinfo[0].FPROVINCEID;
             this.form.arr[14].value = res.body.data.shareholderinfo[0].FCITYID;
             console.log(this.form.arr[9].value)
             console.log(this.form.arr[10].value)
           }
          //  this.form.arr[0].value = 

         })
        //  console.log(this.dialogFormVisible)
        //  this.dialogFormVisible=true;
        //  alert(index)
       },
      // upload(index,rows){
        
      // },
       //删除按钮 交互刷新列表
       remove(index,rows){
          this.$confirm('是否确定删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //这里与后台交互成功执行if else判断
          let param = {
            fid:rows[index].id
          }
          // console.log(param.fid)
          removes(param).then((res)=>{
            console.log(res)
            if(res.body.data=='删除成功'){
                this.$message({
              type: 'success',
              message: '删除成功!'
              
            });
            // rows.splice(index, 1);
            this.query(this.values)
            }
            
          })
          
          //更新列表
          //失败执行
          // this.$message({
          //   type: 'error',
          //   message: '删除失败!'
          // });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
       },
        //为表格设置样式
       isCenter({row,column,rowIndex,columnIndex}){
         return 'text-align:center'
       },
       //为表头设置样式
       istabtop({row,column,rowIndex,columnIndex}){
         return 'text-align:center;background-color:#409eff;color:#fff;'
       },
       //驳回
       back(){
         this.$confirm('是否确定驳回', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //这里与后台交互成功执行
          let param = {
            shareid:this.idd
          }
          rerurns(param).then((res)=>{
            if(res.body.data==='驳回成功'){
              this.$message({
                type: 'success',
                message: '驳回成功!'
              });
              this.dialogFormVisible = false;
              this.indexfo();
            }else{
              this.$message({
                type: 'error',
                message: '驳回失败!'
              });
            }
          })
          
          //更新列表
          //失败执行
          // this.$message({
          //   type: 'error',
          //   message: '驳回失败!'
          // });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消驳回'
          });          
        });
       },
       //审核
       audit(){
         //交互
        this.$confirm("是否确定审核", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let param = {
           shareid:this.idd
         }
         examine(param).then((res)=>{
           console.log(res)
          //  return false;
          if(res.body.data==='审核通过'){
            this.$message({
            type: 'success',
            message: '审核成功'
          });
          this.dialogFormVisible = false;
          this.indexfo();
          }else{
            this.$message({
            type: 'error',
            message: '审核失败'
          });
          }
         })
         
          //审核失败的回调
          // this.$message({
          //   type: 'error',
          //   message: '审核失败'
          // }); 
          // this.$message({
          //   type: "success",
          //   message: "审核成功!"
          // });

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
            message: "已取消审核"
          });
        });

      
       },
       closed(formName) {
      console.log("关机");
      this.$refs[formName].resetFields();
    },
       //保存的方法
       saves(type){
         let paramss = {
            sharename:this.form.arr[1].value,
            shareholdertypeid:this.form.arr[0].value,
            socialcreditcode:this.form.arr[2].value,
            idnumber:this.form.arr[3].value,
          } 
          repeatname(paramss).then((res)=>{
            console.log(res)
            if(res.body.data=='0'){
              let jsons = {
            FSHAREHOLDERTYPEID:this.form.arr[0].value,
            FSHAREHOLDERNAME:this.form.arr[1].value,
            FSOCIALCREDITCODE:this.form.arr[2].value,
            FIDNUMBER:this.form.arr[3].value,
            FISINNERID:this.form.arr[4].value,
            FREGIONALGROUP:this.form.arr[5].value,
            FREGIONALCOMPANY:this.form.arr[6].value,
            FREGIONALPART:this.form.arr[7].value,
            FCOMPANYTYPEID:this.form.arr[8].value,
            FFIRSTCOMPANYNATUREID:this.form.arr[9].value,
            FTWOCOMPANYNATUREID:this.form.arr[10].value,
            FCOMPANYADDRESS:this.form.arr[11].value,
            FDOMICILE:this.form.arr[12].value,
            FPROVINCEID:this.form.arr[13].value,
            FCITYID:this.form.arr[14].value,
          }
          let param = {
            statebtu:type,
            shareid:this.idd,
            shareholderinfo:JSON.stringify(jsons)
            
          }
          console.log(param)
          // return false;
          let typetxt='';
          if(type=='2'){
            typetxt="保存"
          }else if(type=='3'){
            typetxt="提交"
          }
          saves(param).then((res)=>{
            console.log(res)
            if(res.body.code==='999'){
              this.$message({
                type: "success",
                message: typetxt+"成功!"
              });
              this.dialogFormVisible = false;
              this.indexfo();

            }else{
              this.$message({
                type: "error",
                message: typetxt+"失败!"
              });
            }
          })
            }else{
              this.$message({
                type: "error",
                message: "股东名称不可以重复"
              });
            }
          })
          
          
          // rows.splice(index, 1);
          

          //更新列表
          //失败执行
          // this.$message({
          //   type: 'error',
          //   message: '删除失败!'
          // });
       },
       //保存
       save(type){
        let typetxt='';
        if(type=='2'){
          typetxt="保存"
        }else if(type=='3'){
          typetxt="提交"
        }
         this.$confirm("是否确定"+typetxt, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if(type=='2'){

            this.saves(type)
          }else{
            if (this.$refs['ruleForm']) {
            this.$refs['ruleForm'].validate(valid => {
              if (valid) {
                this.saves(type)
              }else{
                this.$message.error('请填写必填项');
                return false;
              }
               });
          }
          }
          
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"+typetxt
          });
        });
          // this.$message({
          //   type: 'success',
          //   message: '保存成功'
          // });
       },
       //分页的设置
      //  handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      // },
      handleCurrentChange(val) {
        this.query(val);
        // alert(val)
        //这里交互获取数据
      }
    },
    filters: {},
    computed: {
          //区域集团
        qyjt() {
          return this.form.arr[5].value;
        },
        //区域公司
        qygs() {
          return this.form.arr[6].value;
        },
        //公司类型
        gslxs() {
          return this.form.arr[8].value;
        },
        //一级公司性质
        yjgsxz() {
          return this.form.arr[9].value;
        },
         //一级公司性质
        city() {
          return this.form.arr[13].value;
        },
        //股东类型
        stockholder(){
          return this.form.arr[0].value;
        },
        //是否中梁内部股东
        indoor(){
          return this.form.arr[4].value;
        },
    },
    props: [],
    watch: {
          qyjt: {
      //  immediate: true,
      handler(newName, oldName) {
        console.log('xin'+newName,22222,'jiu'+oldName)
        let param = {
          areagroupid: newName
        };
        if (oldName != "") {
          this.form.arr[6].value = "";
          this.form.arr[7].value = "";
          this.form.arr[6].optionsgd = [];
          this.form.arr[7].optionsgd = [];
        }
        change(param).then(res => {
          if (res.data.code === "999") {
            console.log(res.data.data);
            if (res.data.data) {
              if (res.data.data.length != null) {
                let length = res.data.data.length;
                this.form.arr[6].optionsgd = [];
                // this.form1.arr[11].value = "";
                this.form.arr[7].optionsgd = [];
                // this.form1.arr[12].value = "";
                // this.forms.arr[1].value='';
                for (let i = 0; i < length; i++) {
                  this.form.arr[6].optionsgd.push({
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
          this.form.arr[7].value = "";
        }

        let param = {
          areacompanyid: newName
        };
        changegs(param).then(res => {
          if (res.data.code === "999") {
            console.log(res.data.data);
            if (res.data.data != null) {
              let length = res.data.data.length;
              this.form.arr[7].optionsgd = [];

              for (let i = 0; i < length; i++) {
                this.form.arr[7].optionsgd.push({
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
          this.form.arr[10].value = "";
          this.form.arr[9].value = "";
          this.form.arr[9].optionsgd = [];
          this.form.arr[10].optionsgd = [];
        }
        changework(param).then(res => {
          if (res.data.code === "999") {
            if (res.data.data.typeList != null) {
              console.log(res.data.data);
              let length = res.data.data.typeList.length;
              this.form.arr[9].optionsgd = [];
              // this.form1.arr[14].value = "";
              this.form.arr[10].optionsgd = [];
              // this.form1.arr[15].value = "";
              // this.forms.arr[1].value='';
              for (let i = 0; i < length; i++) {
                this.form.arr[9].optionsgd.push({
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
          this.form.arr[10].value = "";
        }
        let param = {
          superiorcode: this.form.arr[8].value,
          superiortype: newName,
          type: "type"
        };
        changework(param).then(res => {
          if (res.data.code === "999") {
            this.form.arr[10].optionsgd = [];
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
              this.form.arr[10].optionsgd = [];
              for (let i = 0; i < length; i++) {
                this.form.arr[10].optionsgd.push({
                  value: res.data.data.typeList[i].FNUMBER,
                  label: res.data.data.typeList[i].FNAME
                });
              }
            }

            // }
          }
        });
      }
    },
    city: {
      //  immediate: true,
      handler(newName, oldName) {
        if (oldName != "") {
          this.form.arr[14].value = "";
        }

        let param = {
          FPROVINCEID: newName
        };
        changecity(param).then(res => {
          console.log(res)
          // return false;
          if (res.body.code === "999") {
            // console.log(res);
            if (res.body.data != null) {
              let length = res.body.data.cityList.length;
              this.form.arr[14].optionsgd = [];

              for (let i = 0; i < length; i++) {
                this.form.arr[14].optionsgd.push({
                  value: res.body.data.cityList[i].FNUMBER,
                  label: res.body.data.cityList[i].FNAME
                });
              }
            }
          }
        });
      }
    },
    stockholder:{
      immediate: true,
      handler(newName, oldName) {
        console.log(newName)
        if (oldName!= "" && oldName) {
          let arrt = [2,3,8,9,10,11,12];
            for (let i = 0; i < this.form.arr.length; i++) {
              if (arrt.indexOf(i) != -1) {
                this.form.arr[i].value = '';
                this.form.arr[i].disabled = false;
              }
            }
        }
        if(newName=='1'){
          let arrt = [2,8,9,10,11];
            for (let i = 0; i < this.form.arr.length; i++) {
              if (arrt.indexOf(i) != -1) {
                this.form.arr[i].disabled = false;
              }
            }
            let arrt1 = [3,12];
            for (let i = 0; i < this.form.arr.length; i++) {
              if (arrt1.indexOf(i) != -1) {
                this.form.arr[i].disabled = true;
              }
            }
            if(this.pages1!='node1'){
            //  this.disab = false;
            let arr = [2,8,9,10,11,3,12]
            for(let i=0;i<this.form.arr.length;i++){
              if (arr.indexOf(i) != -1) {
                this.form.arr[i].disabled = true;
              }
            }
           }
           this.$nextTick(()=>{ 
              // this.form.arr[3].rules.message = ' ';
              this.form.arr[3].rules.required = false;
              // this.form.arr[2].rules.message = '请填写社会信用代码';
              this.form.arr[2].rules.required = true;
           })
        
        }
        if(newName=='2'){
          let arrt = [2,8,9,10,11];
            for (let i = 0; i < this.form.arr.length; i++) {
              if (arrt.indexOf(i) != -1) {
                this.form.arr[i].disabled = true;
              }
            }
            let arrt1 = [3,12];
            for (let i = 0; i < this.form.arr.length; i++) {
              if (arrt1.indexOf(i) != -1) {
                this.form.arr[i].disabled = false;
              }
            }
            if(this.pages1!='node1'){
            //  this.disab = false;
            let arr = [2,8,9,10,11,3,12]
            for(let i=0;i<this.form.arr.length;i++){
              if (arr.indexOf(i) != -1) {
                this.form.arr[i].disabled = true;
              }
            }
           }
           this.$nextTick(()=>{
            //  this.form.arr[3].rules.message = '请填写身份证号';
              this.form.arr[3].rules.required = true;
              // this.form.arr[2].rules.message = ' ';
              this.form.arr[2].rules.required = false;
           })
            
        }
        // if(this.pages1!='node1'){
        //     //  this.disab = false;
        //     let arr = [2,3,8,9,10,11,12]
        //     for(let i=0;i<this.form.arr.length;i++){
        //       if (arr.indexOf(i) != -1) {
        //         this.form.arr[i].disabled = true;
        //       }
        //     }
        //    }else{
             
        //    }

      }
    },
    indoor:{
      immediate: true,
      handler(newName, oldName) {
        console.log(newName)
        if (oldName!= "" && oldName) {
          let arrt = [5,6,7];
            for (let i = 0; i < this.form.arr.length; i++) {
              if (arrt.indexOf(i) != -1) {
                this.form.arr[i].value = '';
                this.form.arr[i].disabled = false;
              }
            }
        }
        if(newName=='1'){
          let arrt = [5,6,7];
            for (let i = 0; i < this.form.arr.length; i++) {
              if (arrt.indexOf(i) != -1) {
                this.form.arr[i].disabled = false;
              }
            }
            if(this.pages1!='node1'){
            let arr = [5,6,7]
            for(let i=0;i<this.form.arr.length;i++){
              if (arr.indexOf(i) != -1) {
                this.form.arr[i].disabled = true;
              }
            }
           }
        }
        if(newName=='0'){
          let arrt = [5,6,7];
            for (let i = 0; i < this.form.arr.length; i++) {
              if (arrt.indexOf(i) != -1) {
                this.form.arr[i].disabled = true;
              }
            }
            if(this.pages1!='node1'){
            
            let arr = [5,6,7]
            for(let i=0;i<this.form.arr.length;i++){
              if (arr.indexOf(i) != -1) {
                this.form.arr[i].disabled = true;
              }
            }
           }
        }
        

      }
    }
    },
    created() {
    },
    mounted() {
     this.indexfo();
    //  console.log(this.$store.getters)
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .testQueryView {
    /*min-height: calc(100vh - 50px);*/
    width: 100%;
    /*height: 100%;*/
    /*background-color: #f0f2f5;*/
    padding: 28px;
    overflow-y: auto;
  }
  // .doling{
  //  .el-input__inner{
  //    width: 300px!important;
  //  }
  // }
  .testajax {
    height: 100%;
    width: 100%;
    padding:0px;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .contain{
  background-color: #eff3f6;
  padding:20px;
  .form{
  background-color: #fff;
  padding: 35px 20px 20px 0;
  }
  
}
.dialog-footer{
  padding: 10px;
 
}
</style>
