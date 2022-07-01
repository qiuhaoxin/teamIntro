import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },{
      path:'/login',
      name:'登录',
      component:()=>import('@/views/Login/index')
    },{
      path:'/main',
      name:'数据处理',
      component:()=>import('@/views/Main/index')
    }
  ]
})

export default router
