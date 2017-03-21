import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.use(Router)

const routes=[
  {
    path:'/',
    name:'Hello',
    component:Hello,
    meta: {requiresAuth:true}

  },
  {
    path:'/login',
    name:'Login',
    component:Login
  }
];
const router=new Router({
  mode:'history',
  routes

})

router.beforeEach((to,from,next)=>{
  console.log(to)
  // next();
   if(to.meta.requiresAuth) {
     const userInfo = JSON.parse(window.localStorage.getItem('user'))

     if (userInfo) {
       next()
     } else {
       next('/login')
     }
   }else{
    next()
   }

})
export default router
