// 其他用户
const otherRouter = {
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
        authority: ['v-test']
      }
    },
    {
      path: '/permission/page/test',
      name: 'permissionPage1',
      meta: {
        title: '测试路由'
      }
    }
  ]
}

module.exports = {
  otherRouter
}
