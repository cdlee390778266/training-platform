import Vue from 'vue'
import Router from 'vue-router'
import Utils from '../js/utils.js'

const Home  = () => import(/* webpackChunkName: "common" */ '../components/home')
const Register  = () => import(/* webpackChunkName: "common" */ '../components/register.vue')
const GetPwd  = () => import(/* webpackChunkName: "common" */ '../components/getPwd.vue')
const ActiveAccount  = () => import(/* webpackChunkName: "common" */ '../components/activeAccount.vue')

const Wrapper  = () => import('../components/common/wrapper.vue')
const Competition  = () => import(/* webpackChunkName: "Competition" */ '../components/competition.vue')
const CompetitionDeail  = () => import(/* webpackChunkName: "Competition" */ '../components/competitionDetail.vue')
const News  = () => import(/* webpackChunkName: "Competition" */ '../components/news.vue')
const StockSelection  = () => import(/* webpackChunkName: "wrapper" */ '../components/stockselection.vue')
const Live  = () => import(/* webpackChunkName: "iframe" */ '../components/live.vue')
const Base  = () => import(/* webpackChunkName: "iframe" */ '../components/base.vue')
const Curriculum  = () => import(/* webpackChunkName: "Curriculum" */ '../components/curriculum.vue')
const CurriculumDetail  = () => import(/* webpackChunkName: "Curriculum" */ '../components/curriculumDetail.vue')

const AdminWrapper  = () => import('../components/admin/adminWrapper.vue')
const MsgCenter  = () => import('../components/msgCenter.vue')
const AdminHome  = () => import(/* webpackChunkName: "admin" */ '../components/admin/adminHome.vue')
const Reply  = () => import(/* webpackChunkName: "admin" */ '../components/admin/reply.vue')
const UserInfo  = () => import(/* webpackChunkName: "admin" */ '../components/admin/userInfo.vue')
const Setting  = () => import(/* webpackChunkName: "admin" */ '../components/admin/setting.vue')

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
      path: '/getpwd',
      name: 'getpwd',
      component: GetPwd,
      meta: { title: '找回密码'}
    },
    {
      path: '/activeaccount',
      name: 'activeaccount',
      component: ActiveAccount,
      meta: { title: '激活账号'}
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
          path: '/news',
          name: 'news',
          component: News,
          meta: { title: '新闻'}
        },
        {
          path: '/competition/detail/:type',
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
          path: '/base',
          name: 'base',
          component: Base,
          meta: { title: '知识库'}
        },
        {
          path: '/curriculum',
          name: 'curriculum',
          component: Curriculum,
          meta: { title: '教学课程'}
        },
        {
          path: '/curriculum/detail/:type',
          name: 'curriculumDetail',
          component: CurriculumDetail,
          meta: { title: '课程详情'}
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
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

var canGoArr = ['register', 'getpwd', 'activeaccount'];

router.beforeEach((to, from, next) => {
  if(Utils.CONFIG.loginData.token || canGoArr.includes(to.name)) {
    /* 路由发生变化修改页面title */
    document.title = to.meta.title || '高校金融实训平台'
    next()
  }else {
    if(to.name == 'home') {
      next();
    }
    Utils.showTip('error', 'error', '-1050');
  }
})

export default router;
