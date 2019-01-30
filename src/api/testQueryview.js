//这里是股东信息管理
import Vue from "vue";
export function foradd(arr,arr1){
  for(let i=0;i<arr.length;i++){
    arr1.push({value:arr[i].FNUMBER,label:arr[i].FNAME})
  }
}
export function addform(arr,arr1){
  arr1=[];
    for(let i=0;i<arr.length;i++){
      arr1.push({value:arr[i].FID,label:arr[i].FNAME})
    }
  }
  export function addform1(arr,arr1){
      // arr1=[];
      for(let i=0;i<arr.length;i++){
        arr1.push({value:arr[i].FNUMBER,label:arr[i].FNAME})
      }
    }
    export function addform2(arr,arr1){
      // arr1=[];
      for(let i=0;i<arr.length;i++){
        arr1.push({value:arr[i].ID,label:arr[i].NAME})
      }
    }
//首页的交互
export function indexform(query) {
  return Vue.http.get("shareholderinfoController.do?getShareHolderInfo", { params: query });
}
//首页的交互
export function commiom(query) {
    return Vue.http.get("shareholderinfoController.do?shareholderlist", { params: query });
  }
//点击编辑按钮
export function uploads(query) {
  return Vue.http.get("shareholderinfoController.do?shareHolderDetail", { params: query });
}
//这里区域集团获取区域公司
export function change(query) {
  return Vue.http.get("sso_districtcompany", { params: query });
}
// 区域公司联动事业部
export function changegs(query) {
  return Vue.http.get("sso_department", { params: query });
}
//公司类型联动一级公司性质and一级联动二级传参不同
export function changework(query) {
  return Vue.http.get("sso_linkage", { params: query });
}
//省联动市
export function changecity(query) {
  return Vue.http.get("shareholderinfoController.do?getCityList", { params: query });
}
//保存提交
export function saves(query) {
  return Vue.http.get("shareholderinfoController.do?saveShareHolderInfo", { params: query });
}
//审核
export function examine(query) {
  return Vue.http.get("shareholderinfoController.do?checkShareHolderInfo", { params: query });
}
//驳回
export function rerurns(query) {
  return Vue.http.get("shareholderinfoController.do?returnShareHolderInfo", { params: query });
}
//删除
export function removes(query) {
  return Vue.http.get("shareholderinfoController.do?deleteShareHolderById", { params: query });
}
//判断股东名称是否重复
export function repeatname(query) {
  return Vue.http.get("shareholderinfoController.do?checksharename", { params: query });
}