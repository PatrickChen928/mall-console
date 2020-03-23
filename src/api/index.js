import fetch from 'utils/fetch'

//登录
export const login = data => fetch('post', '/api/users/login', data);
//退出登录
export const loginOut = data => fetch('post', '/api/users/loginOut', data);

//商品列表
export const goodsList = data => fetch('get', '/api/goods/list', data);
//商品详情
export const productDet = data => fetch('get', '/api/goods/productDet', data);
//删除
export const productDel = data => fetch('post', '/api/goods/del', data);
//商品新增
export const goodsAdd = data => fetch('post', '/api/goods/add', data);
//商品编辑
export const goodsUpdate = data => fetch('post', '/api/goods/update', data);
//上下架
export const productUpDown = data => fetch('post', '/api/goods/upDown', data);
