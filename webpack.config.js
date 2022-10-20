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
    plugins:[new HtmlWebpackPlugin({
        title:'demo'
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