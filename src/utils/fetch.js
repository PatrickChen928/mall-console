import axios from 'axios';
import {Spin, Message} from 'view-design';
import Router from '@/router';
// 创建axios实例
const service = axios.create({
  timeout: 150000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  if (config.method == 'get') {
    config.params = config.params || {};
  } else {
    config.data = config.data || {};
  }
  return config
}, error => {
  Promise.reject(error)
});

// respone拦截器
service.interceptors.response.use(
  response => {
    var xhr = response, code = xhr.data.status;
    if (code == 0) {
      Spin.hide();
      return Promise.resolve(xhr.data);
    } else if (code == 1) {
      Spin.hide();
      Message.error(xhr.data.msg);
      if (xhr.data.msg === '用户未登录') {
        Router.push('/login');
      }
      return Promise.reject(xhr);
    } else {
      Spin.hide();
      Message.error(xhr.data.msg);
      return Promise.reject(xhr);
    }
  },
  error => {
    return Promise.reject(error)
  }
);

const fetch = (method,url,data)=>{
  if (method == 'post') {
    return service.post(url, { ...data})
  } else if (method == 'get') {
    return service.get(url, {
      params: data
    })
  }
}
export default fetch
