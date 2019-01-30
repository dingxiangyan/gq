/*
*这是股权结构表的数据请求
* time:20181121
 */
import Vue from "vue";

/*export function testGet(query) {
  return Vue.http.get("checklogin", { params: query });

}

export function testPost(query) {
  return Vue.http.post("checklogin", { params: query });
  // return Vue.http.get("yearlog", { params: query });
}*/
/*start*/
/*页面初始加载数据*/
export function showPost(query) {
  return Vue.http.get("shareholderinfoController.do?shareHolderStructure", { params: query });
}

//区域集团 公司联动
export function LinkagePost(query) {
  return Vue.http.get("sso_districtcompany", { params: query });
}
//区域公司 事业部联动
export function LinkagePost2(query) {
  return Vue.http.get("sso_department", { params: query });
}
//查询(这个已经和第一个合并)
export function queryPost(query) {
  return Vue.http.get("shareholderinfoController.do?getShareHolderStuctureByPage", { params: query });
}

//表格导出export
export function exportPost(query) {
  return Vue.http.get("shareholderinfoController.do?exportsList", { params: query });
}
