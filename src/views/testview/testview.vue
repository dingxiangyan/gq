<!--必要的组件说明-->
<!-- 这个页面是首页-->
<!-- author:duanhaowei. date:2018/10/19 11:44-->
 
<template>
  <div class="testview">
    <el-container >
      <el-main class="contain">
        <div class="form clearfix">
          <div class="fl">
            <span>查询开始日期</span>
          <el-date-picker
            v-model="value"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            >
            <!--  :picker-options="pickerOptions1" -->
          </el-date-picker>
          <span class="picker">查询结束日期</span>
          <el-date-picker
            v-model="value1"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            >
          </el-date-picker>
          </div>
          <el-button type="primary" class="fr" @click="search">查询</el-button>
        </div>
        <!-- 树形控件 -->
          <tree-table :data="newdata" :columns="columns" style="width:100%;margin-top:20px;" @changess="show1" :gridData="gridData" :loading="loading"/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import Vue from "vue";
  import treeTable from '@/components/TreeTable';
  import { testGet, testPost,testPut,testDelete,testMultiAjax } from "@/api/test";
  import { companysetup,companydetail } from "@/api/testview";
  export default {
    name: "testview",
    components: {treeTable},
    data() {
      return {
        loading:true,
        value:'', //第一个日期值
        value1:'',//第二个日期值 往后需要判断  第一个的值不能大于第二个
        // pickerOptions1:{
        //   disabledDate:(time)=>{
        //     if(this.value1){
        //       return time.getTime() >this.value1.getTime()
        //     }else{
        //       return time.getTime() >Date.now();
        //     }
                      
        //   }
        // },
        // pickerOptions2:{
        //   disabledDate:(time)=> {
        //     if(this.value){
        //       return time.getTime() < this.value.getTime() || time.getTime() > Date.now();
        //     }else{
        //       return time.getTime() > Date.now();
        //     }
        //   },
        // },
         //树形表格控件数据表头
        columns: [
        {
          text: '项目',
          value: 'NAME',
        },
        {
          text: '新设立公司(个)',
          value: 'SETUPCOUNT',
        },
        {
          text: '注销公司(个)',
          value: 'DELCOUNT',
        },
      ],
      //树形表格控件数据内容
      newdata:[],
        //详细信息列表
      gridData:[]
      };
    },
    methods: {
     translateDataToTree(data) {
          //假设根节点为parentId为0id为GVVGbWKDQYSV2uR7OAu1YcznrtQ=
          //没有父节点的数据
          let parents = data.filter(value => value.ID == 'undefined' || value.ID == null|| value.ID == 'GVVGbWKDQYSV2uR7OAu1YcznrtQ=')
          //有父节点的数据
          let childrens = data.filter(value => value.ID !== 'undefined' && value.ID != null||value.parentId !=='GVVGbWKDQYSV2uR7OAu1YcznrtQ=')
          //定义转换方法的具体实现
          let translator = (parents, childrens) => {
            //遍历父节点数据
            parents.forEach((parent) => {
              //遍历子节点数据
              childrens.forEach((current, index) => {
                //此时找到父节点对应的一个子节点
                if (current.PID === parent.ID) {
                  //对子节点数据进行深复制，这里只支持部分类型的数据深复制，对深复制不了解的童靴可以先去了解下深复制
                  let temp = JSON.parse(JSON.stringify(childrens))
                  //让当前子节点从temp中移除，temp作为新的子节点数据，这里是为了让递归时，子节点的遍历次数更少，如果父子关系的层级越多，越有利
                  temp.splice(index, 1)
                  //让当前子节点作为唯一的父节点，去递归查找其对应的子节点
                  translator([current], temp)
                  //把找到子节点放入父节点的children属性中
                  typeof parent.children !== 'undefined' ? parent.children.push(current) : parent.children = [current]
                }
              }
              )
            }
            )
          }
          //调用转换方法
          translator(parents, childrens)
          //返回最终的结果
          return parents
        },
        //点击查询
        search(){
          //获取开始结束日期
          // console.log(this.value)
          // console.log(this.value1)
          let param={
            startDate:this.value,
            endDate:this.value1
          };
          //接口
          this.newdata=[];
          companysetup(param).then(res => {
            console.log(res)
            if (res.body.code === "999") {
              var data=res.body.data;
              //转换数据为树状结构数据
              var num=this.translateDataToTree(data);
              // console.log(num)
              this.newdata=num;
            }
          });
        },
       // show1(){
       //    // alert(1)
       //   let param = {
       //    userNumber:'admin',
       //    passWord:'admin'
       //    };
       //    // fe43fe8e-511a-4e6d-8cce-8a866f952f4a
       //  Vue.http.post("sso_filingindex").then((res)=>{
       //    console.log(res)
       //  });
       // },
    //  show1(){
    //     let param = {
    //     userNumber:'1',
    //     passWord:'1'
    //     };
    //     testPost(param).then((res)=>{
    //       console.log(res)
    //     })
    //  },
      show1(msg){
        this.loading=true;
        //点击行传递具体id显示详细信息
        console.log(msg);
        let param={
          startDate:this.value,
          endDate:this.value1,
          fid:msg.ID
        }
        this.gridData=[];
        companydetail(param).then((res)=>{
          console.log(res);
          if(res.body.code=='999'){
            this.gridData=res.body.data;
            this.loading=false;
          }
        })
      },
       show() {
        let param = {
        //    record: {
        //   'districtGroup':'123',
        //   'districtCompany':'222',
        //   'companyName':'中梁',
        //   'billstatus':1,
        //   'starttime':'2018-10-10',
        //   'endtime':'2018-10-10' 
        // },'key': 'BWwaxpUyaQC62Z7i'
        userNumber:'1',
        passWord:'1'
        };
        testGet(param).then((res)=>{
          console.log(param)
          console.log(res)
        })
        // testGet(param).then((res) => {
        //   // this.ajaxRes = res.body;
        //   console.log(res)
          
        // })
      },
     
    },
    filters: {},
    computed: {
      
    },
    props: [],
    watch: {},
    created() {
    },
    mounted() {
      //初始化树状结构图
     this.search();
    }
  };
</script>

<style scoped lang="scss">
.picker{
  margin-left: 40px;
 
}
.el-table--fit{
  margin-top: 30px;
  width: 600px;
}
 .el-table--medium  {
  td{text-align: center!important;}
}
.contain{
  background-color: #eff3f6;
  .form{
  background-color: #fff;
  padding: 35px 20px;
  }
}
</style>
