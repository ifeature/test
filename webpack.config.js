'use strict';

const path = require('path');

const webpackDevConfig = require('./webpack/webpack.config.dev');
const webpackProdConfig = require('./webpack/webpack.config.prod');

const ENV_PRODUCTION = 'production';
const ENV_DEVELOPMENT = 'development';

const NODE_ENV = process.env.NODE_ENV || ENV_DEVELOPMENT;

function applyConfig(env) {
    switch (env) {
        case ENV_DEVELOPMENT:
            return webpackDevConfig;
        case ENV_PRODUCTION:
            return webpackProdConfig;
        default:
            return webpackDevConfig;
    }
}

const config = applyConfig(NODE_ENV);

config.context = path.resolve(__dirname, './src');
config.output.path = path.resolve(__dirname, 'dist');

if (NODE_ENV === ENV_DEVELOPMENT) {
    config.devServer.contentBase = path.join(__dirname, 'dist');
}

module.exports = config;