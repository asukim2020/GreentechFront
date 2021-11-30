import { createRouter, createWebHashHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import ListView from '../views/ListView.vue'
import AnalyzeView from '../views/AnalyzeView.vue'
import GraphView from '../views/GraphView.vue'
import FileListView from '../views/FileListView.vue'
import DynamicGraphView from '../views/DynamicGraphView.vue'

const routes = [
   {
      path: '/',
      redirect: '/login'
   },
   {
      path: '/login',
      name: 'login',
      component: LoginView
   },
   {
      path: '/list/:id',
      name: 'list',
      component: ListView
   },
   {
      path: '/analyze/:id',
      name: 'analyze',
      component: AnalyzeView
   },
   {
      path: '/graph/:id',
      name: 'graph',
      component: GraphView
   },
   {
      path: '/file/:id',
      name: 'file',
      component: FileListView
   },
   {
      path: '/dynamic/:url',
      name: 'dynamic',
      component: DynamicGraphView,
      props: true
   }
]

const router = createRouter({
   history: createWebHashHistory(),
   routes,
   scrollBehavior (to, from, savedPosition) {
      return savedPosition || { top: 0 }
   }
})

export default router