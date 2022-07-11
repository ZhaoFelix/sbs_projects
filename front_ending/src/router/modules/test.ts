const Layout = () => import("/@/layout/index.vue");

const homeRouter = {
  path: "/",
  name: "test",
  component: Layout,
  redirect: "/test1",
  meta: {
    icon: "home-filled",
    title: "首页",
    rank: 1
  },
  children: [
    {
      path: "/test1",
      name: "test1",
      component: () => import("/@/views/welcome.vue"),
      meta: {
        title: "首页"
      }
    },
     {
      path: "/test2",
      name: "test2",
      component: () => import("/@/views/welcome.vue"),
      meta: {
        title: "首页"
      }
    }
  ]
};

export default homeRouter;
