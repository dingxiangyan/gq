import Vue from "vue";
//（查询列表上方的数据）
export function tableget(query) {
  return Vue.http.get("sso_changeindex", {
    params: query
  });
}
//查询下方表格接口
export function tablelist(query) {
  return Vue.http.get("sso_changeindexcheck", {
    params: query
  });
}
//选择所属区域公司
export function dt(query) {
  return Vue.http.get("sso_districtcompany", {
    params: query
  });
}

// 新增按钮点击获取弹出框顶部内容
export function filingFormInfo(query) {
  return Vue.http.get("sso_changeadd", {
    params: query
  });
}


// 新增变更选择公司以后匹配对应的公司信息
export function changegetcompany(query) {
  return Vue.http.get("sso_changegetcompany", {
    params: query
  });
}

// 变更公司类型 一级二级公司性质
export function changeCompanyType(query) {
  return Vue.http.get("sso_linkage", { params: query });
}

// 所属区域集团 获取区域公司
export function getRegComp(query) {
  return Vue.http.get("sso_districtcompany", { params: query });
}

// 所属区域公司 获取区域事业部
export function getRegCause(query) {
  return Vue.http.get("sso_department", { params: query });
}

// 保存
export function postSave(query) {
  return Vue.http.post("sso_addedchangesave", query);
}

//上传附件
export function upload(params,header) {
  return Vue.http.post("fileController/upload",params,header);
}

// 通过外资或内资类型获取下面的内容
export function getEnterpriseType(query) {
  return Vue.http.get("sso_linkage", { params: query });
}

// 变更列表删除对应列
export function delChangeList(query) {
  return Vue.http.get("sso_delchange", { params: query });
}

// 变更财务驳回
export function reject(query) {
  return Vue.http.get('sso_turn2', { params: query });
}

// 股东名带出性质
export function getNature(query) {
  return Vue.http.get('sso_getpartnercompany', { params: query });
}
