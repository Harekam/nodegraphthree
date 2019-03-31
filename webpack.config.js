const path = require('path');
const webpack = require('webpack'),
    glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
let htmlOptions = {
    template: './index.html',
    minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true
    }
};
module.exports = {
    entry: {
        'main': './src/js/index.js'
    },
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    devServer: {
        contentBase: './'
    },
    stats: {
        colors: true
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ["@babel/preset-env"],
                "plugins": [
                    ["inline-json-import", {}]
                ]
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin(htmlOptions),
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};