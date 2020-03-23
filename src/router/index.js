import Vue from 'vue';
import Router from 'vue-router';

/* 按需加载 */
const Framework = r => require.ensure([], () => r(require('@/views/framework.vue')), 'chunkname2');
const Login = r => require.ensure([], () => r(require('@/views/login.vue')), 'chunkname2');
const GoodsManager = r => require.ensure([], () => r(require('@/views/goodsManager.vue')), 'chunkname2');
const GoodsEdit = r => require.ensure([], () => r(require('@/views/goodsEdit.vue')), 'chunkname2');

Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/', component: Framework,
    children: [
      {path: '/', component: GoodsManager, name: 'goodsManager'},
      {path: '/goodsEdit', component: GoodsEdit, name: 'goodsEdit'},
    ]
  },
  {path: '/login',component: Login}
];

var router = new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
});
export default router;
