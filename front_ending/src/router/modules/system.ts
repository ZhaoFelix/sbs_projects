const Layout = () => import("/@/layout/index.vue");

const systemRouter = {
  path: "/system",
  component: Layout,
  redirect: "/system/user",
  meta: {
    icon: "user-filled",
    title: "管理员",
    rank: 1
  },
  children: [
    {
      path: "/system/role",
      name: "role",
      component: () => import("/@/views/system/user/index.vue"),
      meta: {
        title: "管理员列表"
      }
    },
    {
      path: "/system/type",
      name: "type",
      component: () => import("/@/views/system/type/index.vue"),
      meta: {
        title:"角色列表"
      }
    }
  ]
};

export default systemRouter;
