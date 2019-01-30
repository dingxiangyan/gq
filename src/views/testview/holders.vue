<template>
  <div class="holders">
    <el-container>
        <el-header height="40">
         股东信息管理
        </el-header>
        <el-main>
          <div class="btn-col"><el-button type="primary">新增</el-button></div>
          <el-form  :model="form" label-width="40%" class="demo-form-inline">
            <el-row :gutter="10">
              <el-col :xs="6" :sm="7" :md="7" :lg="7" :xl="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="是否中梁内部股东"  >
                    <el-select v-model="form.region" placeholder="请选择">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="股东名称">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="审核状态">
                    <el-select v-model="form.region" placeholder="请选择">
                      <el-option label="已审核" value="1"></el-option>
                      <el-option label="未审核" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :xs="6" :sm="5" :md="5" :lg="5" :xl="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="股东类型">
                    <el-select v-model="form.region" placeholder="请选择">
                      <el-option label="法人股东" value="1"></el-option>
                      <el-option label="自然人股东" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="6" :sm="7" :md="7" :lg="7" :xl="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="是否中梁内部股东"  >
                    <el-select v-model="form.region" placeholder="请选择">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="股东名称">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="审核状态">
                    <el-select v-model="form.region" placeholder="请选择">
                      <el-option label="已审核" value="1"></el-option>
                      <el-option label="未审核" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :xs="6" :sm="5" :md="5" :lg="5" :xl="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="审核状态">
                    <el-select v-model="form.region" placeholder="请选择">
                      <el-option label="已审核" value="1"></el-option>
                      <el-option label="未审核" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
         <!-- <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>-->
        </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "holders",
    components: {},
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      };
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    },
    filters: {},
    computed: {},
    props: [],
    watch: {},
    created() {
    },
    mounted() {

    }
  };
</script>

<style scoped>
.holders{

}
.el-header{
  background:#b3c0d1 ;
  text-align: center;
  line-height:40px;
  height:40px;
  color:#fff;
}
.el-main{
    background: #e9eef3;
    padding:15px;
  }
.btn-col{
  margin-bottom:10px;
}

</style>
