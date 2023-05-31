import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "../views/Login.vue"
import MediaHome from "../views/MediaHome.vue"
const routes: Array<RouteRecordRaw> = [
  {
    path:"/",
    name:"home",
    component:()=>import('../views/Login.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path:"/insuranceHome",
    name:"insuranceHome",
    component:()=>import('../views/InsuranceHome.vue'),
    redirect:"insuranceHome/insuranceList",
    children:[
      {
        path:"insuranceList",
        name:"insuranceList",
        component:()=>import('../InsuranceViews/insuranceList.vue')
      },
      {
        path:"reimbursementList",
        name:"reimbursementList",
        component:()=>import('../InsuranceViews/reimbursementList.vue')
      },
      {
        path:"insuranceStatistic",
        name:'insuranceStatistic',
        component:()=>import('../InsuranceViews/statistic.vue')
      }
    ]
  },
  {
    path: '/mediaHome',
    name: 'mediaHome',
    redirect:'mediaHome/MedicalSystem',//重定向
    component: () => import('../views/MediaHome.vue'),
    children: [
      {
        path: 'doctors',
        name: 'doctors',
        component: () => import("../MediaViews/Doctors.vue"),
      },
      {
        path: 'statistic',
        name: 'statistic',
        component: () => import("../MediaViews/Statistic.vue"),
      },
      {
        path: 'pendingPatients',
        name: 'pendPatients',
        component: () => import("../MediaViews/PendingPatients.vue"),
      },
      {
        path: 'medicalRecord',
        name: 'medicalRecord',
        component: () => import("../MediaViews/MedicalRecord.vue"),
      },
      {
        path: 'patients',
        name: 'patients',
        component: () => import("../MediaViews/Patients.vue"),
      },
      {
        path: 'addMedicalRecord',
        name: 'addMedicalRecord',
        component: () => import("../MediaViews/AddMedicalRecord.vue"),
      },
      {
        path: 'MedicalSystem',
        name: 'MedicalSystem',
        component: () => import("../MediaViews/MediaSystem.vue"),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
