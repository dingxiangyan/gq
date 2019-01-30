import Vue from "vue";
//（查询列表上方的数据）
export function companysetup(query) {
  return Vue.http.get("companysetupController.do?getSetUpAndInvalidCompany",{params:query});
}
export function companydetail(query){
  return Vue.http.get("companysetupController/setUpAndInvalidCompanyDetail",{params:query});
}
