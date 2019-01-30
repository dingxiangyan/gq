/**
 * Created by howard on 2018/10/21.
 * 这里是设置ajax链接的一些配置，重点的配置在于配置微服务的授权token设定
 */
import VueResource from "vue-resource";
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
Vue.use(VueResource);
import { getToken, setToken, removeToken } from '@/utils/auth'
function getUserInfo() {
  let name = "McloudOAuth";
  let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  let res = unescape(arr[2]);
  res = decodeURI(res);
  console.log(res)
  return unescape(res);
}

//set project root url
let projectRoot = process.env.projectName;
console.log("取得配置中项目名称为" + projectRoot);
Vue.http.options.root = "/" + projectRoot;
Vue.http.options.emulateJSON = true;
// Vue.http.interceptors.push((request, next) => {
//  next((response) => {
//   console.log(response)
//   // if (response.body.status === UNAUTHORIZED_CODE) { //与后台约定登录失效的返回码
 
//   // }
//   return response;
//  });
// });
try {
  // console.log(getToken())
  if(getToken()){
    let to = getToken()
    console.log(to)
    console.log(Vue.http.headers);
    Vue.http.headers.common["sessionId"] = to;
    
  }else{
    console.log('token不存在')
    // Vue.route.push('/testajax')
  }
  // let userinfo = getUserInfo();
  // if (userinfo) {
  //   let u = JSON.parse(userinfo);
  //   // console.log(u)
  //   // Vue.http.headers.common["Authorization"] = "Bearer" + u.auth;
  // }
  console.log('12345trsa')
} catch (e) {
  console.warn("载入用户信息时候发生问题，无法创建授权连接");
  console.warn(e);
  alert('登录失效，重新登录')
  // Vue.route.push('')
  console.log(222222)
  removeToken(); 
  location.reload();
   
}
// console.log(Vue.http.headers);
