<template>
<div>
    <button @click="show">ssss</button>
    <button>aaaaa</button>
<el-form :model="models">
        <el-form-item v-for="(item,index) in models.arr" :label="models.label" 
        
        >
        <el-select v-model="item.value" :placeholder="item.pleaceholder" v-if="item.type=='select'">
          <el-option
            v-for="items in item.optionsgd"
            :key="items.value"
            :label="items.label"
            :value="items.value">
          </el-option>
        </el-select>
        <el-input v-model="item.value" v-if="item.type=='input'" autocomplete="off"></el-input>
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
</div>
     
</template>
<script>
export default {
    props:{
        models:{
            type:Object,
            default:function(){
                return {}
            }
        }
    },
    methods:{
        show(){
            this.$emit('changess',this.models)
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
