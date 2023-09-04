module.exports = {
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy: {
      '/dev-api': {
        target: 'https://xdckidpmsx-payment.wowpaymx.com',
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