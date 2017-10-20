import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store'

import { setToken, getToken, setProvider, clearToken } from '../util/auth'

import Login from '@/views/Login'
import Full from '@/views/Full/Full'
import Projects from '@/views/Project/Projects'
import AddProject from '@/views/Project/AddProject'
import Datasets from '@/views/Dataset/Datasets'
import AddDataset from '@/views/Dataset/AddDataset'
import Canvas from '@/views/Canvas/Canvas'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/full'
    },
    {
      path: '/full',
      name: 'Full',
      component: Full
    },
    {
      path: '/project',
      redirect: '/project/list',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: 'list',
          name: 'Projects',
          component: Projects
        },
        {
          path: 'add',
          name: 'AddProject',
          component: AddProject
        },
        {
          path: ':projectId',
          redirect: ':projectId/dataset',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'dataset',
              redirect: 'dataset/list',
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  path: 'list',
                  name: 'Datasets',
                  component: Datasets
                },
                {
                  path: 'add',
                  name: 'AddDataset',
                  component: AddDataset
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/canvas/:projectId/:datasetId',
      name: 'Canvas',
      component: Canvas
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = getToken()
  if (!token) {
    let queryToken = to.query['access-token']
    let queryProvider = to.query['provider']
    if (queryToken && queryProvider) {
      setToken(queryToken)
      setProvider(queryProvider)
      next('/full')
      return
    } else {
      clearToken()
      window.location.href = 'http://localhost:3000/login'
      return
    }
  } else {
    console.log(`route to : ${to.name}`)
  }
  next()
})
export default router
