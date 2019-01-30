//公司设立备案表
import Vue from "vue";
export function foradd(arr,arr1){
  arr1.length=0;
  for(let i=0;i<arr.length;i++){
    arr1.push({value:arr[i].FNUMBER,label:arr[i].FNAME})
  }
}
export function foradd1(arr){
  let arr1=[];
  for(let i=0;i<arr.length;i++){
    arr1.push({value:arr[i].FNUMBER,label:arr[i].FNAME})
  }
  return arr1;
}
export function foradd2(arr){
  let arr1=[];
  for(let i=0;i<arr.length;i++){
    arr1.push({value:arr[i].ID,label:arr[i].NAME})
  }
  return arr1;
}

export function foradd3(arr){
  let arr1=[];
  for(let i=0;i<arr.length;i++){
    arr1.push({value:arr[i].FID,label:arr[i].FNAME})
  }
  return arr1;
}
export function foradd4(arr){
  let arr1=[];
  for(let i=0;i<arr.length;i++){
    arr1.push({value:arr[i].FID,label:arr[i].FSHAREHOLDERNAME})
  }
  return arr1;
}
//查询
export function commit(query) {
  return Vue.http.get("sso_filingindexCheck", { params: query });
}
//新增设立申请
export function addapplication(query) {
  return Vue.http.get("sso_updateclickcompanysetup", { params: query });
}
//这里是第一个select改变
export function change(query) {
    return Vue.http.get("sso_districtcompany", { params: query });
  
  }
//刚进入首页获取与form信息
export function indexinfo(query) {
  return Vue.http.post("sso_filingindex", { params: query });
}
//刚进入首页获取下面表格数据
export function querys(query) {
  return Vue.http.get("sso_filingindexCheck", { params: query });
}
//是否外资企业改变是触发
export function changework(query) {
  return Vue.http.get("sso_linkage", { params: query });
}
// 区域公司联动事业部
export function changegs(query) {
  return Vue.http.get("sso_department", { params: query });
}
// 保存
export function saves(query) {
  return Vue.http.get("sso_savecompanysetup", { params: query });
}
// 删除一个表格的数据
export function remov(query) {
  return Vue.http.get("sso_delcompanysetup", { params: query });
}
//根据股东id获取股东公司性质
export function parnet(query) {
  return Vue.http.get("sso_getpartnercompany", { params: query });
}
//驳回
export function back(query) {
  return Vue.http.get("sso_turn1", { params: query });
}
//股东名称
export function Shareholder(query) {
  return Vue.http.get("getShareholder", { params: query });
}

//上传附件
export function upload(params,header) {
  return Vue.http.post("fileController/upload",params,header);
}
/*
实际开发中会遇到的多重ajax调用问题，在这里写好之后，页面部分代码非常清晰
 */
export function testMultiAjax(query) {
  return Vue.http.get("yearlog/1", { params: query }).then((res) => {
    let r1 = res.body;
    return Vue.http.post("yearlog/delay1", { params: query });
  }).then((res) => {
    let r1 = res.body;
    return Vue.http.get("yearlog/delay2", { params: query });
  }).then((res) => {
    let r1 = res.body;
    return Vue.http.get("yearlog/delay3", { params: query });
  });
}
//判断设立公司名称是否重复
export function repeats(query) {
  return Vue.http.get("checkcompany", { params: query });
}