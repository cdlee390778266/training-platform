import Vue from 'vue'
import Router from 'vue-router'

const Home  = () => import('../components/home')

const Wrapper  = () => import('../components/common/wrapper.vue')
const Competition  = () => import('../components/competition.vue')
const OptionsMarket  = () => import('../components/optionsmarket.vue')
const StockMarket  = () => import('../components/stockmarket.vue')
const StockSelection  = () => import('../components/stockselection.vue')
const Live  = () => import('../components/live.vue')

const AdminWrapper  = () => import('../components/admin/adminWrapper.vue')
const User  = () => import('../components/admin/user.vue')
const Setting  = () => import('../components/admin/setting.vue')

const Register  = () => import('../components/register.vue')

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { title: '注册'}
    },
    {
      path: '/wrapper',
      name: 'wrapper',
      component: Wrapper,
      children: [
        {
          path: '/competition',
          name: 'competition',
          component: Competition,
          meta: { title: '投资竞赛'}
        },
        {
          path: '/optionsmarket',
          name: 'optionsmarket',
          component: OptionsMarket,
          meta: { title: '期权行情'}
        },
        {
          path: '/stockmarket',
          name: 'stockmarket',
          component: StockMarket,
          meta: { title: '股票行情'}
        },
        {
          path: '/stockselection',
          name: 'stockselection',
          component: StockSelection,
          meta: { title: '策略选股'}
        },
        {
          path: '/live',
          name: 'live',
          component: Live,
          meta: { title: '云直播'}
        },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminWrapper,
      children: [
        {
          path: 'user',
          name: 'user',
          component: User,
          meta: { title: '个人中心'}
        },
        {
          path: 'setting',
          name: 'setting',
          component: Setting,
          meta: { title: '个人设置'}
        },
        {
          path: '**',
          redirect: '/admin/user'
        },
      ]
    },
    {
      path: '**',
      redirect: '/home'
    }
    // {
    //   path: '/quotation',
    //   name: 'quotation',
    //   component: Quotation,
    //   meta: { title: '行情导出'},
    //   beforeEnter: (to, from, next) => {
    //     if(Utils.getUser().name) next()
    //   }
    // },
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  document.title = to.meta.title || '高校金融实训平台'
  next()
})

export default router;
