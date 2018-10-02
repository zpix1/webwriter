import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Main from '@/components/Main'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    }, {
      path: '/writer',
      name: 'Main',
      component: Main,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('writer')
  else next()
})

export default router
