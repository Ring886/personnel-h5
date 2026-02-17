// No imports needed due to auto-import (vue-router)
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/add',
    name: 'AddEmployee',
    component: () => import('@/views/EmployeeForm.vue'),
    meta: {
      title: '新增员工',
    },
  },
  {
    path: '/edit/:id',
    name: 'EditEmployee',
    component: () => import('@/views/EmployeeForm.vue'),
    meta: {
      title: '编辑员工',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '404',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  document.title = (to.meta.title as string) || '人员管理系统';
  next();
});

export default router;
