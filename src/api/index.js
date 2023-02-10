import axios from 'axios';
import {Message} from 'element-ui';
import router from '../router';
const apis = {
  production: '/api', // 线上 (生成环境)
  development: '/api', // 本地 (开发环境)
}


// 映射
const actionMapping = {
  get: 'view',
  post: 'add',
  put: 'edit',
  delete: 'delete'
}


var request = axios.create({
  baseURL: process.env.VUE_APP_MODE === 'production' ? apis.production : apis.development,
  timeout:5000
})
//拦截请求
request.interceptors.request.use((config)=>{
  let token =  localStorage.getItem('token');
  // console.log('token',token)
  config.headers.Authorization = token;
  console.log(config.url)
  if (config.url !== '/token') {
    // 不是登录的请求 也不是获取权限的请求 则在请求头中加入token  不知道如何使用Mock来验证请求头中的token 故此处注释
    // req.headers.Authorization = sessionStorage.getItem('token')
    const action = actionMapping[config.method]
    // 判断非权限范围内的请求
    // console.log(router)
    const currentRight = router.currentRoute.meta
    // console.log(currentRight)
    if (currentRight && currentRight.indexOf(action) === -1) {
      // 没有权限
      console.log('没有权限')
      Message.error('没有权限')
      return Promise.reject(new Error('没有权限'))
    }
  }
  return config
})
//拦截响应
request.interceptors.response.use((response)=>{
  // if(response)
  // console.log(response);
  if(response.headers.authorization){
    localStorage.setItem('token', response.headers.authorization)
  }

  return response
},function (error){
  //对响应的错误做点什么
  // console.log(error);
  if(error.response.status == 401){
    router.push('/login')
  }
  // console.log(error.response)

  return Promise.reject(error);
}
)

export function login(params){
  return request({
      url:'/token',//请求路由
      method:'post',//请求方式
      data:params//传递数据
  })
}

// export function getRoles(params){
//   return request({
//       url:'/token/roles',//请求路由
//       method:'post',//请求方式
//       data:params//传递数据
//   })
// }

// export function verifyToken(params){
//   return request({
//       url:'/token/verify',//请求路由
//       method:'post',//请求方式
//       data:params//传递数据
//   })
// }

// export function getContent(params){
//   return request({
//       url:'/content',//请求路由
//       method:'get',//请求方式
//       data:params//传递数据
//   })
// }

// export function getTableData(params){
//   return request({
//       url:'/content',//请求路由
//       method:'get',//请求方式
//       data:params//传递数据
//   })
// }

// export function deleteTableData(params){
//   return request({
//       url:'/content',//请求路由
//       method:'delete',//请求方式
//       data:params//传递数据
//   })
// }

export function getUsers(params){
  return request({
      url:'/user/getUsers',//请求路由
      method:'get',//请求方式
      data:params//传递数据
  })
}

export function addUsers(params){
  return request({
      url:'/user/addUsers',//请求路由
      method:'post',//请求方式
      data:params//传递数据
  })
}

export function editUsers(params){
  return request({
      url:'/user/editUsers',//请求路由
      method:'put',//请求方式
      data:params//传递数据
  })
}

export function deleteUsers(params){
  return request({
      url:'/user/deleteUsers',//请求路由
      method:'delete',//请求方式
      data:params//传递数据
  })
}