
const routes = [
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/services', component: () => import('pages/services/List.vue') },
      { path: '/specialist', component: () => import('pages/specialist/List.vue') },
      { path: '/customers', component: () => import('pages/customers/List.vue') },
      // categories
      { path: '/categories', component: () => import('pages/category/index.js') }
    ]
  },
  {
    path: '*',
    redirect: '/login'
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
