const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
    target: 'web',
    devtool: 'cheap-inline-source-map',
    entry: {
        adminPage: './modules/AdminPage',
        homePage: './modules/homePage',
        vendor: './vendor'
    },
    output: {
        filename: '[name].bundle.js',
        publicPath: '/',
        devtoolLineToLine: true
    },
    watchOptions: {
        aggregateTimeout: 100,
        ignored: /node_modules/
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProgressPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].bundle.js'
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            chunks: ['vendor', 'homePage']
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'admin.html',
            chunks: ['vendor', 'adminPage']
        }),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        })
    ],
    devServer: {
        compress: true,
        hot: true,
        inline: true,
        host: 'localhost',
        port: 9090
    }
};

module.exports = config;