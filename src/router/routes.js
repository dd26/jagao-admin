
const routes = [
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  },
  { path: '/recuperate', component: () => import('pages/recuperate-password/Form.vue') },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/services', component: () => import('pages/services/List.vue') },
      { path: '/specialist', component: () => import('pages/specialist/List.vue') },
      { path: '/customers', component: () => import('pages/customers/List.vue') },
      { path: '/coupons', component: () => import('pages/coupons/List.vue') },
      { path: '/categories', component: () => import('pages/category/index.js') },
      { path: '/users', component: () => import('pages/users/List.vue') }
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
