module.exports = {
  publicPath: './',
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'element-plus': 'ElementPlus',
      axios: 'axios'
    }
  }
}
