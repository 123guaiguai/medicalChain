const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
// const config = {
//   chainWebpack: config => {
//     const fileRule = config.module.rule('file')
//     fileRule.uses.clear()
//     fileRule
//       .test(/\.pdf|ico|png|jpg$/)
//       .use('file-loader')
//       .loader('file-loader')
//       .options({
//         limit: 10000,
//       })
//   },
//   publicPath: './'
// }
// module.exports={...config,...module.exports}


