import Vue from 'vue'
import VueRouter from 'vue-router'

import ArticleMain from '@/views/article/articleMain'

import HomeMain from '@/views/home/homeMain'
import BookMain from '@/views/book/bookMain'
import BookFlowMain from '@/views/book/bookFlowMain'
import ChartMain from '@/views/chart/chartMain'
import LifeMain from '@/views/life/lifeMain'
import LifeInfo from '@/views/life/lifeInfo'
import AccountInfoMain from '@/views/auth/accountInfoMain'
import RoleInfoMain from '@/views/auth/roleInfoMain'
import MenuInfoMain from '@/views/auth/menuInfoMain'
import UserInfoMain from '@/views/user/userInfoMain'
import SettingMain from '@/views/setting/settingMain'
import ToolMain from '@/views/setting/toolMain'
import TimeLineMain from '@/views/setting/timeLineMain'
import ContactMain from '@/views/setting/contactMain'
import PersonalMain from '@/views/setting/personalMain'
import AboutMain from '@/views/setting/aboutMain'
import LogMain from '@/views/monitor/logMain'
import MapMain from '@/views/map/mapMain'
import HlmMain from '@/views/map/graph/hlmMain'
import Login from '@/views/login'
import Home from '@/views/home'
import Index from '@/views/index'
import NotFound from '@/views/404'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  { path: '/', name: 'login', component: Login}, // 重定向，用来指向一打开网页就跳转到哪个路由
  { path: '/home', name: 'Home', component: Home, // 首页
    children: [ // 开始嵌套路由，这下面的所有路由都是Main路由的子路由
      { path: '/home/homeMain', name: 'HomeMain', component: HomeMain},
      { path: '/article/articleMain', name: 'ArticleMain', component: ArticleMain},
        { path: '/index', name: 'Index', component: Index, // 数据管理
          children: [
            { path: '/user/userInfoMain', name: 'UserInfoMain', component: UserInfoMain},
            { path: '/auth/accountInfoMain', name: 'AccountInfoMain', component: AccountInfoMain},
            { path: '/auth/roleInfoMain', name: 'RoleInfoMain', component: RoleInfoMain},
            { path: '/auth/menuInfoMain', name: 'MenuInfoMain', component: MenuInfoMain},
            { path: '/book/bookMain', name: 'BookMain', component: BookMain},
            { path: '/book/bookFlowMain', name: 'BookFlowMain', component: BookFlowMain},
            { path: '/chart/chartMain', name: 'ChartMain', component: ChartMain},
            { path: '/life/lifeMain', name: 'LifeMain', component: LifeMain},
            { path: '/life/lifeInfo', name: 'LifeInfo', component: LifeInfo},
            { path: '/setting/settingMain', name: 'SettingMain', component: SettingMain},
            { path: '/setting/toolMain', name: 'ToolMain', component: ToolMain},
            { path: '/setting/timeLineMain', name: 'TimeLineMain', component: TimeLineMain},
            { path: '/setting/contactMain', name: 'ContactMain', component: ContactMain},
            { path: '/setting/personalMain', name: 'PersonalMain', component: PersonalMain},
            { path: '/setting/aboutMain', name: 'AboutMain', component: AboutMain},
            { path: '/monitor/logMain', name: 'LogMain', component: LogMain},
            { path: '/map/graph/hlmMain', name: 'HlmMain', component: HlmMain},
            { path: '/map/mapMain', name: 'MapMain', component: MapMain},
            { path: '/*', name: '404', component: NotFound} // 注意，这里不是嵌套路由了，这是为了设置404页面，一定要放在最后面，这样当服务器找不到页面的时候就会全部跳转到404
          ]
        },

    ]
  },
  { path: '/*', name: '404', component: NotFound} // 注意，这里不是嵌套路由了，这是为了设置404页面，一定要放在最后面，这样当服务器找不到页面的时候就会全部跳转到404
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
