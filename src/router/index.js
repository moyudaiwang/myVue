import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from "vue-router"
Vue.use(VueRouter)
import BookMain  from '@/components/views/book/bookMain'
import BookFlowMain  from '@/components/views/book/bookFlowMain'
import ChartMain from '@/components/views/chart/chartMain'
import LifeMain  from '@/components/views/life/lifeMain'
import LifeInfo  from '@/components/views/life/lifeInfo'
import RoleMain  from '@/components/views/auth/roleMain'
import UserMain  from '@/components/views/user/userMain'
import SettingMain  from '@/components/views/setting/settingMain'
import ToolMain  from '@/components/views/setting/toolMain'
import TimeLineMain  from '@/components/views/setting/timeLineMain'
import ContactMain  from '@/components/views/setting/contactMain'
import PersonalMain  from '@/components/views/setting/personalMain'
import AboutMain  from '@/components/views/setting/aboutMain'
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
        path: '/',
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
                        path: '/auth/roleMain',
                        name: 'RoleMain',
                        component:RoleMain,
                    },
                    {
                        path: '/book/bookMain',
                        name: 'BookMain',
                        component:BookMain,
                    },
                    {
                        path: '/book/bookFlowMain',
                        name: 'BookFlowMain',
                        component:BookFlowMain,
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
                        path: '/life/lifeInfo',
                        name: 'LifeInfo',
                        component:LifeInfo,
                    },
                    {
                        path: '/setting/settingMain',
                        name: 'SettingMain',
                        component:SettingMain,
                    },
                    {
                        path: '/setting/toolMain',
                        name: 'ToolMain',
                        component:ToolMain,
                    },
                    {
                        path: '/setting/timeLineMain',
                        name: 'TimeLineMain',
                        component:TimeLineMain,
                    },
                    {
                        path: '/setting/contactMain',
                        name: 'ContactMain',
                        component:ContactMain,
                    },
                    {
                        path: '/setting/personalMain',
                        name: 'PersonalMain',
                        component:PersonalMain,
                    },
                    {
                        path: '/setting/aboutMain',
                        name: 'AboutMain',
                        component:AboutMain,
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
