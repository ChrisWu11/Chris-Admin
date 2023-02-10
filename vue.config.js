// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const CompressionPlugin = require("compression-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");
// const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// const SentryCliPlugin = require("@sentry/webpack-plugin")
// require('worker-loader');

const productionGzipExtensions = /\.(js|css|json|txt|ico|svg)(\?.*)?$/i;

module.exports = {
  productionSourceMap: true,
  devServer: {
    //   // proxy: 'http://localhost:6000',
    //   // proxy: '8.134.98.137:6000',
    proxy: {
      "/api": {
        target: "http://localhost:6000",
        changOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  lintOnSave: false,
  publicPath: "./",

  // configureWebpack: (config) => {
    // config.module.rules.push({
    //   test: /\.worker.js$/,
    //   use: {
    //     loader: 'worker-loader',
    //     options: { inline: true, name: 'workerName.[hash].js' }
    //   }
    // })
  
  //   // 代码压缩
  //   config.plugins.push(
  //     new UglifyJsPlugin({
  //       uglifyOptions: {
  //         //生产环境自动删除console
  //         compress: {
  //           drop_debugger: true,
  //           drop_console: true,
  //           pure_funcs: ["console.log"],
  //         },
  //       },
  //       sourceMap: false,
  //       parallel: true,
  //     }),
  //     new BundleAnalyzerPlugin({
  //       analyzerMode: "static", //可选值有server static disabled
  //       generateStatsFile: false,
  //       statsOptions: { source: false },
  //       openAnalyzer: false,
  //     }),
  //     // new SentryCliPlugin({
  //     //   include: "./dist", // 打包后的文件夹
  //     //   release: "test@0.1.0", // 引用配置的版本号，版本号需要一致
  //     //   configFile: "sentry.properties",
  //     //   ignoreFile: '.gitignore',  // 指定忽略文件配置
  //     //   ignore: ['node_modules', 'webpack.config.js'], 
  //     //   // configFile: './.sentryclirc',   // 指定sentry上传配置
  //     //   urlPrefix: './'   // 保持与publicpath相符
  //     // }),

  //   ),
  //     // 公共代码抽离
  //     (config.optimization = {
  //       minimize: process.env.NODE_ENV === "production",
  //       minimizer: [
  //         new TerserPlugin({
  //           test: /\.js(\?.*)?$/i, // 匹配参与压缩的文件
  //           parallel: true, // 使用多进程并发运行
  //           terserOptions: {
  //             // Terser 压缩配置
  //             output: { comments: false },
  //           },
  //           extractComments: false, // 将注释剥离到单独的文件中
  //         }),
  //         // 压缩CSS
  //         new OptimizeCssAssetsWebpackPlugin(),
  //       ],
  //       splitChunks: {
  //         cacheGroups: {
  //           vendor: {
  //             chunks: "all",
  //             test: /node_modules/,
  //             name: "vendor",
  //             minChunks: 1,
  //             maxInitialRequests: 5,
  //             minSize: 0,
  //             priority: 100,
  //           },
  //           common: {
  //             chunks: "all",
  //             test: /[\\/]src[\\/]js[\\/]/,
  //             name: "common",
  //             minChunks: 2,
  //             maxInitialRequests: 5,
  //             minSize: 0,
  //             priority: 60,
  //           },
  //           styles: {
  //             name: "styles",
  //             test: /\.(sa|sc|c)ss$/,
  //             chunks: "all",
  //             enforce: true,
  //           },
  //           runtimeChunk: {
  //             name: "manifest",
  //           },
  //         },
  //       },
  //     });
  // },

  chainWebpack(config) {
    // config.module.rule('worker').test(/\.worker\.js$/).use('worker-loader').loader('worker-loader').options({
    //   inline: 'fallback'
    // }).end();
    // config.module.rule('js').exclude.add(/\.worker\.js$/);
    // config.output.globalObject("this");

  //   config.externals({
  //     echarts: "echarts",
  //     // vue: "Vue",
  //     // vuex: "Vuex",
  //     // "vue-router": "VueRouter",
  //     axios: "axios",
  //     // "element-ui": "ELEMENT",
  //   });
  //   if (process.env.VUE_APP_MODE === "production") {
  //     // 压缩
  //     config.plugin("compressionPlugin").use(
  //       new CompressionPlugin({ //此插件不能使用太高的版本，否则报错：TypeError: Cannot read property 'tapPromise' of undefined
  //         // filename: "[path][base].gz", // 这种方式是默认的，多个文件压缩就有多个.gz文件，建议使用下方的写法
  //         filename: '[path].gz[query]', //  使得多个.gz文件合并成一个文件，这种方式压缩后的文件少，建议使用
  //         algorithm: 'gzip', // 官方默认压缩算法也是gzip
  //         test: /\.js$|\.css$|\.html$|\.ttf$|\.eot$|\.woff$/, // 使用正则给匹配到的文件做压缩，这里是给html、css、js以及字体（.ttf和.woff和.eot）做压缩
  //         threshold: 10240, //以字节为单位压缩超过此大小的文件，使用默认值10240吧
  //         minRatio: 0.8, // 最小压缩比率，官方默认0.8
  //         //是否删除原有静态资源文件，即只保留压缩后的.gz文件，建议这个置为false，还保留源文件。以防：
  //         // 假如出现访问.gz文件访问不到的时候，还可以访问源文件双重保障
  //         deleteOriginalAssets: false
  //     })
  //     );
  //   }
  },
};
