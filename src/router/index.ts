import { createRouter, createWebHistory } from 'vue-router'

import AuthLayout from '@layouts/AuthLayout.vue';
import UserLayout from '@layouts/UserLayout.vue';
import Profile from '@views/Profile.vue';
import Login from '@views/Login.vue';
import Register from '@views/Register.vue';
import TechStack from '@views/TechStack.vue';

const routes = [
  {
    'path': '/',
    'component': UserLayout,
    'children': [
      {
        'path': '',
        'component': Profile
      },
      {
        'path': 'tech-stack',
        'component': TechStack
      }
    ]
  },
  {
    'path' : '/auth',
    'component': AuthLayout,
    'children': [
      {
        'path' : 'login',
        'component': Login
      },
      {
        'path' : 'register',
        'component': Register
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
