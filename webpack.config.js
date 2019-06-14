const path =require('path')
const {CleanWebpackPlugin}=require('clean-webpack-plugin')
const MiniCssExtractPlugin =require('mini-css-extract-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
var webpack = require('webpack')

module.exports = {
    mode:'development',
    entry:"./src/index.js",
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:"js/[chunkhash:7].js",
        chunkFilename:"js/[name].js"
    },
    resolve:{
        extensions: [".js", ".json", ".vue", ".css"],
        alias:{"@":'./src',
               'vue':'vue/dist/vue.js' 
              },
    },
    stats:{
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    },
    module:{
        rules:[
                {
                    loader:'babel-loader',
                    test:/\.js$/,
                    exclude:/node_modules/,

                },
                {
                        test:/\.css$/,
                        exclude:[path.resolve(__dirname,'/node_modules')],
                        use:[{
                            loader:MiniCssExtractPlugin.loader,
                        },
                        'css-loader']
                },
                {
                    test:/\.vue$/,
                    exclude:path.resolve(__dirname,'dist'),
                    loader:'vue-loader'
                }
            ]
            },
    target: "web",
    optimization:{
        minimize:true, //开发环境默认关闭，生产环境默认开启  是否压缩代码
        minimizer:[new UglifyJsPlugin()], //压缩配置项 
        splitChunks:{  //分包
            minSize: 30000, //大小限制
            minChunks: 1, //引用次数
            name:false,
            cacheGroups:{//是否开启缓存
                
                vendor:{
                    test:/[\\/]node_modules[\\/]/,
                    name:'common',
                    chunks:'all',
                    
                }
            }
        }
    },
    plugins:[
                //清除打包后dist文件夹内容的插件
                new CleanWebpackPlugin(),
                //分离css插件
                new MiniCssExtractPlugin({
                filename:'css/[name]-[contenthash:7].css',
                }),
                //生成html插件
                new HtmlWebpackPlugin({
                    filename:'bundle.html',
                    inject:true,
                    template:path.resolve(__dirname,'src/index.html')
                }),
                //vueloader
                new VueLoaderPlugin(),
                //压缩插件
                // new UglifyJsPlugin(),
                new LodashModuleReplacementPlugin(), 
                new webpack.optimize.OccurrenceOrderPlugin(), 
            ],
    devtool:'source-map'
}