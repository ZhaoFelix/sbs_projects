import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

const homeRouter = {
  path: "/",
  name: "test",
  component: Layout,
  redirect: "/test1",
  meta: {
    icon: "home-filled",
    title: $t("menus.hshome"),
    rank: 1
  },
  children: [
    {
      path: "/test1",
      name: "test1",
      component: () => import("/@/views/welcome.vue"),
      meta: {
        title: $t("menus.hshome")
      }
    },
     {
      path: "/test2",
      name: "test2",
      component: () => import("/@/views/welcome.vue"),
      meta: {
        title: $t("menus.hshome")
      }
    }
  ]
};

export default homeRouter;
