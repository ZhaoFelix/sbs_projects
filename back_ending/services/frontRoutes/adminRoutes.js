// 管理员
const adminRouter = {
  path: '/permission',
  redirect: '/permission/page/index',
  meta: {
    title: 'menus.permission',
    icon: 'lollipop',
    rank: 7
  },
  children: [
    {
      path: '/permission/page/index',
      name: 'permissionPage',
      meta: {
        title: 'menus.permissionPage'
      }
    },
    {
      path: '/permission/button/index',
      name: 'permissionButton',
      meta: {
        title: 'menus.permissionButton',
        authority: ['v-admin']
      }
    }
  ]
}

const systemRouter = {
  path: '/system',
  redirect: '/system/setting/index',
  meta: {
    title: '系统管理',
    icon: 'lollipop',
    rank: 8
  },
  children: [
    {
      path: '/system/setting/index',
      name: 'systemSetting',
      meta: {
        title: '系统设置'
      }
    },
    {
      path: '/system/info/index',
      name: 'systemInfo',
      meta: {
        title: '系统信息'
      }
    }
  ]
}

module.exports = {
  adminRouter,
  systemRouter
}
