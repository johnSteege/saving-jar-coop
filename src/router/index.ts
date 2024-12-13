import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/LandingPage.vue"),
    },
    {
      path: "/new-jar",
      name: "new-jar",
      component: () => import("../views/NewJarPage.vue"),
    },
    {
      path: "/edit-transaction/:txid",
      name: "edit-transaction",
      component: () => import("../views/EditTransactionView.vue"),
      props: true,
    },
    {
      path: "/new-transaction",
      name: "new-transaction",
      component: () => import("../views/EditTransactionView.vue"),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
});

export default router;
