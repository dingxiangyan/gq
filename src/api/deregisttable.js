/*
*这是公司注销备案表的数据请求
* time:20181121
 */
import Vue from "vue";

/*start*/
/*页面初始加载数据*/
export function showPost(query) {
  return Vue.http.post("delcompanyController/sso_delindex", { params: query });
}

//区域集团 公司联动
export function LinkagePost(query) {
  return Vue.http.get("sso_districtcompany", { params: query });
}
/*//区域公司 事业部联动
export function LinkagePost2(query) {
  return Vue.http.get("shareholderinfoController.do?getPart", { params: query });
}*/
//查询
export function queryPost(query) {
  return Vue.http.get("delcompanyController/sso_delindexcheck", { params: query });
}

//新增申请
export function addApplayPost(query) {
  return Vue.http.get("delcompanyController/sso_deladd", { params: query });
}
//验证是否具有注销权限
export function showDialog(query) {
  return Vue.http.get("delcompanyController/sso_check", { params: query });
}
//弹出层根据公司名称带出基础数据（新增）
export function showBasePost(query) {
  return Vue.http.get("delcompanyController/sso_delgetcompany", { params: query });
   // return Vue.http.get("sso_changedelcompany", { params: query });
}
//编辑选择公司（这个已删除与新增用一个）
export function editPost(query) {
   return Vue.http.get("delcompanyController/sso_changedelcompany", { params: query });
}
//弹出层保存
export function savePost(query) {
  return Vue.http.get("delcompanyController/sso_adddel", { params: query });
}
//删除表格的某一条
export function del(query) {
  return Vue.http.get("delcompanyController/sso_del", { params: query });
}
//驳回
export function reject(params) {
  return Vue.http.post("delcompanyController/sso_turn",params);
}