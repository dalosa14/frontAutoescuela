import {createRouter,createWebHistory} from 'vue-router'
import store from './vuex'
const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters['user/isAuthenticated']) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters['user/isAuthenticated']) {
    next()
    return
  }
  next('/login')
}
const routes = [
  {
    path: "/my-testsPacks",
    alias:'/',
    name: "testsPacks",
    component: ()=>import('../views/viewTestspacks.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/testsPack/:id",
    
    name: "testsPack",
    component: ()=>import('../views/testsPack.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/test/:id",
    
    name: "test",
    component: ()=>import('../views/test.vue'),
    beforeEnter: ifAuthenticated,
  },
  
  {
    path: "/buy-testsPacks",
    name: "buy",
    component: ()=>import('../views/buyTestpacks.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/login",
    name: "login",
    component: ()=>import('../views/login.vue'),
  },
  {
    path: "/register",
    name: "register",
    component: ()=>import('../views/register.vue'),
  },

  ]
  
  

  const router = createRouter({
    history: createWebHistory(),
    routes, 
  })
  
  export default router