import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Edit from '@/components/EditMblog'
import Draft from '@/components/Draft'
import Comment from '@/components/Comment'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        keepAlive: true // 不需要被缓存
      }
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/draft',
      name: 'draft',
      component: Draft
    },
    {
      path: '/comment',
      name: 'comment',
      component: Comment
    }
  ]
})
