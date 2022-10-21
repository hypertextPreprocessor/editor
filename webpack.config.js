const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var base ={
    entry:{
        app:'./src/index.js'
    },
    output:{
        filename:'[name].[contenthash].js',
        path:path.resolve(__dirname,'dist'),
        clean:true
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
            mode:"production"
        }
    }   
}
module.exports = merge(base,env());