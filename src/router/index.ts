import { createRouter, createWebHistory } from 'vue-router'

import AuthLayout from '@layouts/AuthLayout.vue';
import UserLayout from '@layouts/UserLayout.vue';
import Profile from '@views/Profile.vue';
import Login from '@views/Login.vue';
import Register from '@views/Register.vue';
import TechStack from '@views/TechStack.vue';
import NotFound from '@views/NotFound.vue'
import { useUserStore } from '@stores/useUserStore'

const routes = [
  {
    'path': '/',
    'component': UserLayout,
    'children': [
      {
        'path': '',
        'name' : 'Profile',
        'component': Profile
      },
      {
        'path': 'tech-stack',
        'name' : 'Tech Stack',
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
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
    const userStore = useUserStore()

    const isAuthRoute = to.path.startsWith('/auth')

    if (!userStore.token && !isAuthRoute) {
        return '/auth/login'
    }
})

export default router
