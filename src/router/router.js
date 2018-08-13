import Vue from 'vue'
import Router from 'vue-router'

const Home  = () => import('../components/home')

const Wrapper  = () => import('../components/common/wrapper.vue')
const Competition  = () => import('../components/competition.vue')
const CompetitionDeail  = () => import('../components/competitionDetail.vue')
const StockSelection  = () => import('../components/stockselection.vue')
const Live  = () => import('../components/live.vue')
const Curriculum  = () => import('../components/curriculum.vue')
const CurriculumDetail  = () => import('../components/curriculumDetail.vue')

const AdminWrapper  = () => import('../components/admin/adminWrapper.vue')
const MsgCenter  = () => import('../components/msgCenter.vue')
const AdminHome  = () => import('../components/admin/adminHome.vue')
const Reply  = () => import('../components/admin/reply.vue')
const UserInfo  = () => import('../components/admin/userInfo.vue')
const Setting  = () => import('../components/admin/setting.vue')

const Register  = () => import('../components/register.vue')

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
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
          path: '/competition/detail/:type/:id',
          name: 'competitionDetail',
          component: CompetitionDeail,
          meta: { title: '投资竞赛'}
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
          meta: { title: '财经直播'}
        },
        {
          path: '/curriculum',
          name: 'curriculum',
          component: Curriculum,
          meta: { title: '教学课程'}
        },
        {
          path: '/curriculum/detail/:type/:id',
          name: 'curriculumDetail',
          component: CurriculumDetail,
          meta: { title: '教学课程'}
        },
        {
          path: '/msgCenter',
          name: 'msgCenter',
          component: MsgCenter,
          meta: { title: '消息中心'}
        },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminWrapper,
      children: [
        {
          path: 'reply/:id',
          name: 'reply',
          component: Reply,
          meta: { title: '教师点评'}
        },
        {
          path: 'userinfo',
          name: 'userinfo',
          component: UserInfo,
          meta: { title: '个人信息'}
        },
        {
          path: 'setting',
          name: 'setting',
          component: Setting,
          meta: { title: '个人设置'}
        }
      ]
    },
    {
      path: '/admin/home',
      name: 'adminHome',
      component: AdminHome,
      meta: { title: '个人中心'}
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
