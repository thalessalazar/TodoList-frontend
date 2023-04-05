import Vue from 'vue'
import VueRouter from 'vue-router'

// Layouts
import LayoutAuth from "@/layouts/Auth.vue";
import LayoutDefault from "@/layouts/Default.vue";

// Views
import Login from "@/views/login.vue";
import Register from "@/views/register.vue";
import VerifyEmail from "@/views/VerifyEmail.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import Profile from "@/views/Profile.vue";
import Home from "@/views/Home.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import Security from "@/views/Security.vue";
import Logout from '@/views/Logout.vue';
import TodoTasks from "@/views/TodoTasks.vue";

// middlewares
import Guard from "@/service/middleware";

Vue.use(VueRouter)

const routes = [
  {
    path: "",
    component: LayoutDefault,
    beforeEnter: Guard.redirectIfNotAuthenticated,
    children: [
      { path: "", name: "index", component: Home },
      { path: "profile", name: "profile", component: Profile },
      { path: "security", name: "security", component: Security },
      { path: "todo/:id", name: "todo-tasks", component: TodoTasks }
    ]
  },
  {
    path: '/login',
    beforeEnter: Guard.redirectIfAuthenticated,
    component: LayoutAuth,
    children: [
      { path: '', name: 'login', component: Login }
    ]
  },
  {
    path: '/logout',
    component: LayoutAuth,
    children: [
      { path: '', name: 'logout', component: Logout }
    ]
  },
  {
    path: '/register',
    component: LayoutAuth,
    children: [
      {
        path: '', name: 'register', component: Register
      }
    ],
  },
  {
    path: '/verify-email',
    component: LayoutAuth,
    children: [
      {
        path: '', name: 'verifyEmail', component: VerifyEmail
      }
    ],
  },
  {
    path: '/forgot-password',
    component: LayoutAuth,
    children: [
      {
        path: '', name: 'forgotPassword', component: ForgotPassword
      }
    ],
  },
  {
    path: '/reset-password',
    component: LayoutAuth,
    children: [
      {
        path: '', name: 'resetPassword', component: ResetPassword
      }
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes,
})

export default router
