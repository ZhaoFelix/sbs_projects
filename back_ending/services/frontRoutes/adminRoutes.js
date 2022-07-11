// 管理员
const adminRouter = {
  path: '/permission',
  redirect: '/permission/page/index',
  meta: {
    title: '权限设置',
    icon: 'lollipop',
    rank: 7,
  },
  children: [
    {
      path: '/permission/page/index',
      name: 'permissionPage',
      meta: {
        title: '页面权限',
      },
    },
    {
      path: '/permission/button/index',
      name: 'permissionButton',
      meta: {
        title: '按钮权限',
        authority: ['v-admin'],
      },
    },
  ],
}

const systemRouter = {
  path: '/system',
  redirect: '/system/setting/index',
  meta: {
    title: '系统管理',
    icon: 'lollipop',
    rank: 8,
  },
  children: [
    {
      path: '/system/setting/index',
      name: 'systemSetting',
      meta: {
        title: '系统设置',
      },
    },
    {
      path: '/system/info/index',
      name: 'systemInfo',
      meta: {
        title: '系统信息',
      },
    },
  ],
}

module.exports = {
  adminRouter,
  systemRouter,
}
