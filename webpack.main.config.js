const copyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const DashboardPlugin = require('webpack-dashboard/plugin');
const merge = require('webpack-merge');
const common = require('./webpack.base.js');

module.exports = merge(common, {
    entry: {
        "index": './src/electron/ts/Main.ts'
    },
    output: {
        path: __dirname + "/build",
        filename: '[name].js'
    },
    module: {
        // noParse: ['ws'] //
    },
    // externals: ['ws'], // https://github.com/socketio/socket.io-client/issues/933
    externals: {
        ws:  'ws',
        uws: 'uws'
    },
    target: "electron-main",
    plugins: [
    ]
});