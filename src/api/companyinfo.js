// 公司信息查询
import Vue from "vue";
/*页面初始加载数据*/
// 点击主菜单公司信息显示
export function showBase(query) {
  return Vue.http.post("companysetupController.do?getIndexInfo", { params: query });
}
//根据所属区域集团获取区域公司
export function LinkagePost(query) {
  return Vue.http.get("sso_districtcompany", { params: query });
}
// 点击查询公司列表展示
export function showCompanyInfoList(query) {
  return Vue.http.get("companysetupController.do?getCompanyInfoList", { params: query });
}
// 点击显示具体信息
export function showtCompanyInfomationDetail(query) {
  return Vue.http.get("companysetupController.do?getCompanyInfomationDetail", { params: query });
}
//附件列表显示
export function getFileList(query){
  return Vue.http.get("fileController/list", { params: query });
}
//附件列表下载
export function downloadFile(query){
  return Vue.http.get("fileController/downloads", { params: query });
}