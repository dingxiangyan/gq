<template>
   <div class="structure">
     <el-container>
       <el-header height="auto">
         <el-form  ref="structureform" :rules="formrules" :model="structureform" label-width="110px">
           <el-row :gutter="5">
             <el-col :span="6">
               <div class="grid-content bg-purple">
                 <el-form-item label="所属区域集团" prop="qyjt">
                   <el-select v-model="structureform.qyjt.value" placeholder="请选择所属区域集团" clearable @change="selectLinkage(structureform.qyjt.value)">
                     <el-option
                       v-for="(item,index) in structureform.qyjt.options"
                       :key="index"
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
                 <el-form-item label="所属区域公司">
                   <el-select v-model="structureform.qygs.value" placeholder="请选择所属区域公司" clearable @change="selectLinkage2(structureform.qygs.value)">
                     <el-option
                       v-for="(item,index) in structureform.qygs.options"
                       :key="index"
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
                 <el-form-item label="所属事业部">
                   <el-select v-model="structureform.ssyb.value" placeholder="请选择所属事业部" clearable>
                     <el-option
                       v-for="(item,index) in structureform.ssyb.options"
                       :key="index"
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
                   <el-input v-model="structureform.gsmc" placeholder="请输入关键字" clearable></el-input>
                 </el-form-item>
               </div>
             </el-col>
           </el-row>
           <el-row :gutter="5">
             <!-- <el-col :span="6"> -->
               <!-- <div class="grid-content bg-purple"> -->
                 <!-- <el-form-item label="查询开始日期"> -->
                   <!--<span class="demonstration">默认</span>-->
                   <!--:picker-options="structureform.searchTime.pickerOptions1"-->
                   <!-- <el-date-picker -->
                     <!-- v-model="structureform.searchTime.beginTime" -->
                     <!-- type="date" -->
                     <!-- placeholder="选择日期" -->
                     <!-- value-format="yyyy-MM-dd" -->
                   <!-- > -->
                   <!-- </el-date-picker> -->
                 <!-- </el-form-item> -->
               <!-- </div> -->
             <!-- </el-col> -->
             <el-col :span="6">
               <div class="grid-content bg-purple">
                 <el-form-item label="查询截止日期">
                   <!--<span class="demonstration">默认</span>-->
                   <el-date-picker
                     v-model="structureform.searchTime.endTime"
                     type="date"
                     placeholder="选择日期"
                     value-format="yyyy-MM-dd"
                     clearable
                   >
                   </el-date-picker>
                 </el-form-item>
               </div>
             </el-col>
             <el-col :span="18">
               <div class="grid-content bg-purple">
                 <el-form-item class="check_content">
                   <el-button type="primary" @click="getinfo(2)" >查询</el-button>
                   <el-button type="success" @click="exportExcel" v-show='showexport'>导出</el-button>
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
              height='500'
             style="width: 100%">
             <el-table-column
               type="index"
               label="序号"
               fixed
               width="60">
             </el-table-column>
             <el-table-column
               prop="qyjt"
               fixed
               label="区域集团"
               width="120">
             </el-table-column>
             <el-table-column
               prop="qygs"
               width="120"
               fixed
               label="区域公司">
             </el-table-column>
             <el-table-column
               prop="gsmc"
               width="100"
               fixed
               label="公司名称">
             </el-table-column>
             <el-table-column
               prop="gdmc"
               width="120"
               label="股东名称">
             </el-table-column>
             <el-table-column
               prop="gdgsxz"
               width="120"
               label="股东公司性质">
             </el-table-column>
             <el-table-column
               prop="ssfw"
               width="120"
              label="所属合并范围">
           </el-table-column>
             <el-table-column
               prop="gslb"
               width="120"
               label="公司类别">
             </el-table-column>
             <el-table-column
               prop="qshbf"
               width="120"
               label="公司并表方">
             </el-table-column>
             <el-table-column
               prop="tzfs"
               width="120"
               label="投资方式">
             </el-table-column>
             <el-table-column
                prop="data"
                width="110"
                :formatter="timeStamp"
               label="成立日期">
              </el-table-column>
             <el-table-column
               prop="zczb"
               label="注册资本">
             </el-table-column>
              <el-table-column
               prop="rjje"
               label="认缴金额">
             </el-table-column>
             <el-table-column
               prop="czbl"
               label="出资比例">
             </el-table-column>
             <el-table-column
               prop="sjje"
               label="实缴金额">
             </el-table-column>
             <el-table-column
               prop="czbl2"
               label="出资比例">
             </el-table-column>
             <el-table-column
               width="150"
               prop="gslx"
               label="公司类型">
             </el-table-column>
             <el-table-column
               prop="yjxz"
               width="120"
               label="一级公司性质">
             </el-table-column>
             <el-table-column
               width="120"
               prop="ejxz"
               label="二级公司性质">
             </el-table-column>
           </el-table>
           <div class="page-col">
             <el-pagination
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :current-page.sync="currentPage"
               :page-size="size"
               layout="prev, pager, next, jumper"
               :total="pageTotal">
             </el-pagination>
           </div>
         </div>
       </el-main>
     </el-container>
   </div>
</template>

<script>
  import FileSaver from 'file-saver';
  import XLSX from 'xlsx';
  import { showPost, LinkagePost,LinkagePost2,queryPost,exportPost } from "@/api/structuretable";
  export default {
    name: "structuretable",
    components: {},
    data() {
      return {
        showexport:false,
        /*股权结构查找表单数据*/
        structureform: {
           qyjt:{
               value:'',
               options:[
                 {label:'', value:''},
                ],
            },//所属区域集团
           qygs:{
                value:'',
                options:[
                  {label:'', value:''},
              ],
            },//所属区域公司
           ssyb:{
               value:'',
               options:[
                 {label:'', value:''},
               ],
           },//所属事业部
           gsmc:'',//公司名称
           searchTime:{
            //  beginTime:'',//开始查找时间
           endTime:'',
             // pickerOptions1:{
             //   disabledDate:(time)=>{
             //     if(this.structureform.searchTime.endTime){
             //       return time.getTime() >this.structureform.searchTime.endTime.getTime()
             //     }else{
             //       return time.getTime() >Date.now();
             //     }

             //   }
             // },
             // pickerOptions2:{
             //   disabledDate:(time)=> {
             //     if(this.structureform.searchTime.beginTime){
             //       return time.getTime() < this.structureform.searchTime.beginTime.getTime() || time.getTime() > Date.now();
             //     }else{
             //       return time.getTime() > Date.now();
             //     }
             //   },
             // },
            },
         },
        formrules: {
          gsmc:[
            { type:'string', message: '请输入文字', trigger: 'blur' },
            {  max: 20, message: '不超过20字符', trigger: 'blur' }
          ],
        },//表单验证
        /*table data*/
        tableData:[],
        currentPage:1,//当前页
        pageTotal:0,//总条数
        size:10,//每页显示条数
        export:{
          areaGroup:'',
          areaCompany:'',
          areaPart:'',
          companyName:'',
          startTime:'',
          endTime:''
        }
      };
    },
    methods: {
      //获取页面数据方法
      getinfo(type){
        let target=this.structureform;
        //当点击查询时初始化页数
        if(type==2){
           this.currentPage=1;
        }
        let param={
          pageNo:this.currentPage,
          areaGroup:target.qyjt.value,
          areaCompany:target.qygs.value,
          areaPart:target.ssyb.value,
          companyName:target.gsmc,
          startTime:target.searchTime.beginTime,
          endTime:target.searchTime.endTime
        };
        showPost(param).then((res)=>{
          console.log(res);
          let options=[];
          let tables=[];
          if(res.data.code==="999"){
            let arr2=res.data.data.getShareHolderStructureData;
            let arr1=res.data.data.areaGroupData;
            for(var i=0;i<arr1.length;i++){
              options.push({label:arr1[i].NAME,value:arr1[i].ID});
            }
            //初始化表格后台只返回前30条
            this.structureform.qyjt.options=options;//初始所属区域集团
            let total=res.data.data.totalCount;
            if(arr2){
              for(var j=0;j<arr2.length;j++){
                tables.push({
                  qyjt:arr2[j].QYJT,
                  qygs:arr2[j].QYGS,
                  gsmc:arr2[j].GSMC,
                  ssfw:arr2[j].SSHBFW,
                  gslb:arr2[j].GSLB,
                  qshbf:arr2[j].GSBBF,
                  tzfs:arr2[j].TZFS,
                  data:arr2[j].CLRQ,
                  gdmc:arr2[j].GDMC,
                  gdgsxz:arr2[j].GDXZ,
                  zczb:arr2[j].ZCZB,
                  rjje:arr2[j].RJ,
                  czbl:arr2[j].RJBL,
                  sjje:arr2[j].SJ,
                  czbl2:arr2[j].SJBL,
                  gslx:arr2[j].FGSLX,
                  yjxz:arr2[j].YJGSXZ,
                  ejxz:arr2[j].FEJGSXZ,
                })
              }
              this.tableData=tables;//返回tabbel数据
              this.pageTotal=total;
              console.log( total);
              // console.log(  this.tableData);
            }else{
              this.tableData=[];
            }    
          }
        });

      },
       //获取当前时间
      getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
      },
      //导出
      exportExcel () {
        // /* generate workbook object from table */
        // var wb = XLSX.utils.table_to_book(document.querySelector('.table-col'))
        // /* get binary string as output */
        // var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        // var name='股权结构表'+this.getNowFormatDate()+'.xlsx'
        // try {
        //     FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), name)
        // } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        // return wbout
        // this.export.pageNo=this.currentPage;
        this.export.areaGroup=this.structureform.qyjt.value;
        this.export.areaCompany=this.structureform.qygs.value;
        this.export.areaPart=this.structureform.ssyb.value;
        this.export.companyName=this.structureform.gsmc;
        this.export.startTime=this.structureform.searchTime.beginTime;
        this.export.endTime=this.structureform.searchTime.endTime;
        // console.log(this.export)
        // exportPost(this.export).then((res)=>{
        //   console.log(res,'weywqguiogioq3rhgfioWIOWGIOU')
        // })
        window.open('/dst/shareholderinfoController.do?exportsList&areaGroup='+encodeURIComponent(this.export.areaGroup)+'&areaCompany='+encodeURIComponent(this.export.areaCompany)+'&areaPart='+ this.export.areaPart+'&companyName='+ this.export.companyName+'&startTime='+ this.export.startTime+'&endTime='+ this.export.endTime)
      },
      slice(val){
        var first=val.substr(0,1);
        if(first=="+"){
          // return val='%2B'+val;
          // return escape(val).replace(/\+/g,"%2B");
           return escape(val).replace(/\+/,"%2B");
        }else{
          return val;
        }
      },
      //翻页
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
       this.currentPage=val;
       this.getinfo(1)
      },
      //时间格式转化
      timeStamp:function(row,column,cellValue,index){
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
      //转换出资比例%
      formatBaifenhao: function (row, column, cellValue, index) {
       /* return row.cellValue == 1 ? '男' : row.sex == 0 ? '女' : '未知';*/
        return cellValue*100+"%";
      },
      //联动公司
      selectLinkage:function(val) {
        //console.log(val);
        this.structureform.qygs.value='';
        this.structureform.ssyb.value='';
        let param={'areagroupid':val};
        LinkagePost(param).then((res)=>{
          let options=[];
          if(res.data.code==="999"){
            let arr1=res.body.data;
            if(arr1){
              for(var i=0;i<arr1.length;i++){
                options.push({label:arr1[i].NAME,value:arr1[i].ID});
              }
              this.structureform.qygs.options=options;//所属区域公司
            }else{
              this.structureform.qygs.options=[];
            }
          }
        })
      },
      //联动事业部
      selectLinkage2:function(val) {
        console.log(val)
        this.structureform.ssyb.value='';
        let param={'areacompanyid':val};
        //this.loading=true;
        LinkagePost2(param).then((res)=>{
          console.log(res);
          let options=[];
          if(res.data.code==="999"){
            //this.loading=false;
             let arr1=res.body.data;
             if(arr1){
               for(var i=0;i<arr1.length;i++){
                 options.push({label:arr1[i].NAME,value:arr1[i].ID});
               }
               this.structureform.ssyb.options=options;//所属区域公司
             }else{
                this.structureform.ssyb.options=[];
             }
           }else{
            console.log("请求错误")
          }
        })
      }
    },
    mounted() {
     // // 初始加载显示数据
     if(this.$store.state.user.usernumber=="duwei"||this.$store.state.user.usernumber=="liurubin"){
      this.showexport=true
     }else{
      this.showexport=false;
     }
     this.getinfo(1)

    }

  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .structure{
      //background:#EFF3F6 ;
      .el-header{
          background: #fff;
          padding:20px;
          margin:20px;
          padding-bottom:0;
        }
      .el-main{
        padding:0px;
        margin:0 20px ;
      }
      .table-col{
         min-height: 400px;
        .page-col{
          margin-top:10px;
        }
      }
      .el-date-editor.el-input, .el-date-editor.el-input__inner{width: 100%}
      .el-select {width: 100% !important;}
      .el-form-item__content {text-align: right}
      .check_content{text-align:right;}
  }
</style>
