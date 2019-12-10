const copyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const DashboardPlugin = require('webpack-dashboard/plugin');
const merge = require('webpack-merge');
const common = require('./webpack.base.js');

module.exports = merge(common, {
    entry: {
        "browser": './src/browser/entry.ts',
    },
    output: {
        path: __dirname + "/build/browser",
        filename: '[name].bundle.js'
    },
    target: "web",
    plugins: [
        new copyWebpackPlugin([
            './src/browser/html/browser.html'
        ])
        // ,        new DashboardPlugin()
    ]
});