const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var base ={
    entry:{
        //highlight:'./src/highlight.js',
        app:'./src/index.js'
    },
    output:{
        filename:'[name].[contenthash].js',
        path:path.resolve(__dirname,'dist'),
        library:{
            name:'myEditor',
            type:'umd',
            umdNamedDefine:true,
        },
        globalObject:'this',
        clean:true
    },
    performance:{
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
        hints: false,
    },
  
    optimization:{
        runtimeChunk: true,
        splitChunks:{
            chunks: 'all',
            minSize:512000,
        }
    },
    resolve: {
        alias: {
            'parchment': path.resolve(__dirname, 'node_modules/parchment/src/parchment.ts'),
            'quill$': path.resolve(__dirname, 'node_modules/quill/quill.js'),
        },
        extensions: ['.js', '.ts', '.svg']
    },
    module:{
        rules:[{
            test:/\.m?js$|\.jsx?$/,
            exclude:/node_modules/,
            use:{
                loader:'babel-loader',
                options:{
                    presets:["@babel/preset-env",["@babel/preset-react",{
                        "development":true
                    }]],
                    plugins: ['@babel/plugin-transform-runtime']
                }
            }
        },{
            test:/\.ejs$/,
            loader:'ejs-compiled-loader',
            options: {
                htmlmin: true,
                htmlminOptions: {
                    removeComments: true
                }
            }
        },{
            test:/\.ts$/,
            use:[{
                loader:'ts-loader',
                options:{
                    compilerOptions: {
                        declaration: false,
                        target: 'es5',
                        module: 'commonjs'
                    },
                    transpileOnly: true
                }
            }]
        },{
            test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
            type:"asset/source"
        },{
            test:/\.css$/i,
            use:[
                {loader:'style-loader'},
                {
                    loader:'css-loader',
                    options:{
                        modules:{
                            mode:"global"
                        }
                    }
                }
            ]
        }]
    },
    plugins:[new HtmlWebpackPlugin({
        title:'demo',
        template:path.resolve(__dirname,'template/index.ejs')
    })],
}
function env(){
    console.log('开发环境：'+process.env.NODE_ENV);
    if(process.env.NODE_ENV==='development'){
        return {
            mode:'development',
            devServer:{
                static:{
                    directory: path.join(__dirname, 'static'),
                },
                port: 9000,
                client:{
                    progress:true
                },
                hot:true,
                open:true,
                host:'0.0.0.0'
            }
        }
    }else{
        return {
            mode:"production",
            optimization: {
                runtimeChunk: true,
            },
        }
    }   
}
module.exports = merge(base,env());