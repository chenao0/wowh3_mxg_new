module.exports = {
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy: {
      '/dev-api': {
        target: 'https://payment-dev.wowpaymx.com',
        logLevel: 'debug',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/dev-api': ''
        }
      }
    },
  }
}