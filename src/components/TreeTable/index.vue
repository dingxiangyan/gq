<template>
<div>
  <el-table :data="formatData" :row-style="showRow" v-bind="$attrs" :border="true"
      :cell-style="isCenter"
      :header-cell-style="istabtop"
      @row-dblclick="show"
      stripe
     >
    <el-table-column v-if="columns.length===0" width="150">
      <template slot-scope="scope"  >
        <span v-for="space in scope.row._level" :key="space" class="ms-tree-space"/>
        <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"/>
          <i v-else class="el-icon-minus"/>
        </span>
        {{ scope.$index }}
      </template>
    </el-table-column>
    <el-table-column v-for="(column, index) in columns" v-else :key="column.value" :label="column.text" :width="column.width"
    >
      <template slot-scope="scope">
        <!-- Todo -->
        <!-- eslint-disable-next-line vue/no-confusing-v-for-v-if -->
        <span v-for="space in scope.row._level" v-if="index === 0" :key="space" class="ms-tree-space"/>
        <span v-if="iconShow(index,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"/>
          <i v-else class="el-icon-minus"/>
        </span>
        {{ scope.row[column.value] }}
      </template>
    </el-table-column>
    <slot/>
  </el-table>
  <el-dialog title="详细信息" :visible.sync="dialogTableVisible" width="1000px"
  custom-class="doloadcl">
    <el-table :data="gridData"
    :cell-style="isCentert"
    :header-cell-style="istabtop"
    v-loading='loading'
    border height="350">
      <el-table-column label="序号" width="100" type="index"></el-table-column>
        <el-table-column label="所属区域集团" property="QYJT"></el-table-column>
        <el-table-column label="所属区域公司" property="QYGS"></el-table-column>
      <el-table-column property="GSMC" label="公司名称" width="300"></el-table-column>
    </el-table>
</el-dialog>
</div>
  
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-13:59
*/
import treeToArray from './eval'
export default {
  name: 'TreeTable',
  data(){
    return {
      doloadcl:'doload',
      dialogTableVisible:false,
      // gridData: [{
      //       company: '2016-05-02',
      //       name: '王小虎',
      //       group: '上海市普陀区金沙江路 1518 弄'
      //   }, {
      //     company: '2016-05-04',
      //     name: '王小虎',
      //     group: '上海市普陀区金沙江路 1518 弄'
      //   }, {
      //     company: '2016-05-01',
      //     name: '王小虎',
      //     group: '上海市普陀区金沙江路 1518 弄'
      //   }, {
      //     company: '2016-05-03',
      //     name: '王小虎',
      //     group: '上海市普陀区金沙江路 1518 弄'
      // }],
    }
  },
  props: {
    /* eslint-disable */
    gridData:{
      type: [Array, Object]
    },
    data: {
      type: [Array, Object],
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: false
    },
    loading:false
  },
  computed: {
    // 格式化数据源
    formatData: function() {
      let tmp
      if (!Array.isArray(this.data)) {
        tmp = [this.data]
      } else {
        tmp = this.data
      }
      const func = this.evalFunc || treeToArray
      const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
      return func.apply(null, args)
    }
  },
  methods: {
    showRow: function(row) {
      const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
      row.row._show = show
      return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
    },
    // 切换下级是否展开
    toggleExpanded: function(trIndex) {
      const record = this.formatData[trIndex]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow(index, record) {
      return (index === 0 && record.children && record.children.length > 0)
    },
    //为表格设置样式
       isCenter({row,column,rowIndex,columnIndex}){
         if(columnIndex === 0){
           return 'text-align:left'
         }else{
           return 'text-align:center'
         }
         
       },
       //为表格设置样式
       isCentert({row,column,rowIndex,columnIndex}){
           return 'text-align:center'
       },
       //为表头设置样式
       istabtop({row,column,rowIndex,columnIndex}){
         return 'text-align:center;background-color:#409eff;color:#fff;'
       },
       //点击弹出doling
       show(row){
         this.$emit('changess',row)
         this.dialogTableVisible=true;
       }
  }
}
</script>
<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  @-webkit-keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
  $color-blue: #2196F3;
  $space-width: 18px;
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: $space-width;
    height: 14px;
    &::before {
      content: ""
    }
  }
  .processContainer{
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }

  .tree-ctrl{
    position: relative;
    cursor: pointer;
    color: $color-blue;
    margin-left: -$space-width;
  }
  // .el-table--border{
  //   th:first-child {
  //     .cell{
  //       text-align: left!important;
  //     }
  //   }
  // } 
  .doload{
    padding: 0;
  }
</style>
