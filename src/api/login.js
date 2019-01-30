import Vue from 'vue'
import { removeToken } from "@/utils/auth";
export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  console.log(data)
    // 在这之前 写交互判断
  return new Promise((r,j)=>{
    let res = {};
    res.data.token = "testtoken";
    
    r(res);
  }).catch((err)=>{
    console.log(222)
  })

}

export function logout(a) {
  return new Promise((r,j)=>{
    console.log(11111111)
     Vue.http.get('logout').then((res)=>{
          console.log(res.status)
          r(res);
        })
        console.log(2222222222222)
    
  })
}

export function getUserInfo(token) {
  return new Promise((r,j)=>{
    Vue.http.post('sso_getuser').then((response)=>{  
      console.log(response)
      if(response.data.status==='1'){
        let res = {};
        res.data = {};
        res.data.token = token;
        res.data.roles = ['a1','admin'];
        res.data.name = response.data.data.userName;
        res.data.avatar = 'http://www.avatar.com/avatar';
        res.data.introduction = response.data.data.userid;
        res.data.usernumber= response.data.data.userNumber;
        console.log(res)
        r(res);
      }else{
        // alert('用户无权操作')
        console.log('触发')
        removeToken();
        location.reload();
      }
        
    })
    
    // console.log(res)
    // let res = {};
    // res.data = {};
    // res.data.token = token;
    // res.data.roles = ['a1','admin'];
    // res.data.name = 'name1';
    // res.data.avatar = 'http://www.avatar.com/avatar';
    // res.data.introduction = 'introductionintroduction';
    // r(res);
  })
}

