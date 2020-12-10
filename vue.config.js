// vue.config.js

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-bible/' : '/', //發佈對應路徑
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '讀經小幫手';
        return args;
      });
  }
};
