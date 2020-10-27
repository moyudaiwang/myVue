import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from "vue-router"
Vue.use(VueRouter)
import BookMain  from '@/components/views/book/bookMain'
import ChartMain from '@/components/views/chart/chartMain'
import LifeMain  from '@/components/views/life/lifeMain'
import RoleMain  from '@/components/views/role/roleMain'
import UserMain  from '@/components/views/user/userMain'
import SettingMain  from '@/components/views/setting/settingMain'
import TimeLineMain  from '@/components/views/setting/timeLineMain'
import Login from '@/components/views/login'
import Index from '@/components/views/Index'
import NotFound from '@/components/views/404'
import LoginSuccess from '@/components/views/loginSuccess'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        // 重定向，用来指向一打开网页就跳转到哪个路由
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        // 首页
        path: '/index',
        name: 'Index',
        component: Index,
        children:[// 开始嵌套路由，这下面的所有路由都是Main路由的子路由
                    {
                        path: '/user/userMain',
                        name: 'UserMain',
                        component:UserMain,
                    },
                    {
                        path: '/role/roleMain',
                        name: 'RoleMain',
                        component:RoleMain,
                    },
                    {
                        path: '/book/bookMain',
                        name: 'BookMain',
                        component:BookMain,
                    },
                    {
                        path: '/chart/chartMain',
                        name: 'ChartMain',
                        component:ChartMain,
                    },
                    {
                        path: '/life/lifeMain',
                        name: 'LifeMain',
                        component:LifeMain,
                    },
                    {
                        path: '/setting/settingMain',
                        name: 'SettingMain',
                        component:SettingMain,
                    },
                    {
                        path: '/setting/timeLineMain',
                        name: 'TimeLineMain',
                        component:TimeLineMain,
                    },
                    {
                        path:'/*', // 注意，这里不是嵌套路由了，这是为了设置404页面，一定要放在最后面，这样当服务器找不到页面的时候就会全部跳转到404
                        name:'404',
                        component: NotFound
                    }
        ]
    },
    {
        path:'/*', // 注意，这里不是嵌套路由了，这是为了设置404页面，一定要放在最后面，这样当服务器找不到页面的时候就会全部跳转到404
        name:'404',
        component: NotFound
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
