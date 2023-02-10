import Layout from '@/layout'
import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
 
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 动态路由
const tableRule = {
  path: '/home/table',
  name: 'table',
  component: () => import('@/views/table/index.vue')
}
const imageRule = {
  path: '/home/image',
  name: 'image',
  component: () => import('@/views/image')
}
const userRule = {
  path: '/home/users',
  name: 'users',
  component: () => import('@/views/users')
}

/**
 * eslint报错
 * error Unnecessarily quoted property 'xxx' found quote-props
 * 表示 key没必要加引号 'table': tableRule => table: tableRule
 */
// 路由规则和字符串的映射关系
const ruleMapping = {
  table: tableRule,
  users: userRule,
  image: imageRule
}

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    // name: 'login', // 这里如果有name 控制台会提醒
    component: () => import('@/views/login')
  },
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: '',
        // name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/home/chart',
        component: () => import('@/views/chart')
      },
      {
        path: '/home/cesium',
        component: () => import('@/views/404')
      }
    ]
  },
  
]

const router = new VueRouter({
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/') {
    // console.log('toLogin')
    next()
  } else {
    const token = localStorage.getItem('token')
    console.log(1111)
    if (!token) {
      next('/login')
    } else {
      next()
    }
  }
})

export function initDynamicRoutes () {
  // console.log(router.options.routes, 'router.options.routes')
  // 根据二级权限 对路由规则进行动态的添加
  const currentRoutes = router.options.routes
  console.log('currentRoutes',currentRoutes)
  // currentRoutes[2].children.push()
  const rightList = store.state.rightList
  
  console.log('rightList',rightList)
  rightList.forEach(item => { // 如果是没有子路由的话 就直接添加进去 如果有子路由的话就进入二级权限遍历
    // console.log(item, 'item-1')
    if (item.path) {
      const temp = ruleMapping[item.path]
      // 路由规则中添加元数据meta
      temp.meta = item.rights
      currentRoutes[2].children.push(temp)
    }

    item.children.forEach(item => {
      // item 二级权限
      // console.log(item, 'item-2')
      const temp = ruleMapping[item.path]
      // 路由规则中添加元数据meta
      temp.meta = item.rights
      currentRoutes[2].children.push(temp)
    })
  })
  // console.log(currentRoutes)
  router.addRoutes(currentRoutes)
}

export default router
