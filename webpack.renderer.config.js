const copyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const DashboardPlugin = require('webpack-dashboard/plugin');
const merge = require('webpack-merge');
const common = require('./webpack.base.js');

module.exports = merge(common, {
    entry: {
        "app": './src/renderer/entry.ts'
    },
    output: {
        path: __dirname + "/build/renderer",
        filename: '[name].bundle.js'
    },
    module: {
        // noParse: ['ws'] //
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                }
            },
            // work around
            // https://github.com/ashtuchkin/iconv-lite/issues/204
            {
                test: /node_modules[\/\\](iconv-lite)[\/\\].+/,
                resolve: {
                    aliasFields: ['main']
                }
            }
        ],
    },
    // externals: ['ws'], // https://github.com/socketio/socket.io-client/issues/933
    externals: {
        // "iconv-lite": "iconv-lite"
    },
    target: "electron-renderer",
    plugins: [
        new copyWebpackPlugin([
            './src/renderer/html/index.html'
        ])

        // new copyWebpackPlugin([{
        //     from: './src/renderer/html/index.html',
        //     to: "/"
        // }], {
        //     ignore: []
        // })
        // ,        new DashboardPlugin()
    ]
});