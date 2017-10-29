'use strict';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ngToolsWebpack = require('@ngtools/webpack');

const isProd = process.env.NODE_ENV === 'production';

if (!isProd) {

    // In development mode, we use JiT compilation with Hot Module Replacement.
    module.exports = {
        entry: {
            'app': './src/main.ts'
        },

        output: {
            path: __dirname,
            filename: 'dist/[name].bundle.js',
            chunkFilename: 'dist/[id].chunk.js',
            publicPath: '/'
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [
                        'awesome-typescript-loader',
                        'angular-router-loader',
                        'angular2-template-loader',
                        'source-map-loader'
                    ]
                },
                {
                    test: /\.html$/,
                    use: 'raw-loader'
                },
                {
                    test: /\.scss$/,
                    include: path.join(__dirname, 'src/styles'),
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    exclude: path.join(__dirname, 'src/styles'),
                    use: [
                        'raw-loader',
                        'sass-loader'
                    ]
                }
            ],
            exprContextCritical: false
        },

        plugins: [
            // Adds script for the bundle in index.html.
            new HtmlWebpackPlugin({
                filename: 'index.html',
                inject: 'body',
                template: 'src/index.html'
            })
        ],

        resolve: {
            extensions: ['.ts', '.js']
        },

        devtool: 'source-map',

        watch: true,

        performance: { hints: false }

    };

} else {

    // In production mode, we use AoT compilation, tree shaking & minification.
    module.exports = {
        entry: {
            'app-aot': './src/main-aot.ts'
        },

        output: {
            path: __dirname,
            filename: 'dist/[name].bundle.js',
            chunkFilename: 'dist/[id].chunk.js'
        },

        module: {
            rules: [
                {
                    test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                    use: [
                        '@ngtools/webpack'
                    ]
                },
                {
                    test: /\.html$/,
                    use: 'raw-loader'
                },
                {
                    test: /\.scss$/,
                    include: path.join(__dirname, 'src/styles'),
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    exclude: path.join(__dirname, 'src/styles'),
                    use: [
                        'raw-loader',
                        'sass-loader'
                    ]
                }
            ],
            exprContextCritical: false
        },

        plugins: [
            // AngularCompilerPlugin.
            new ngToolsWebpack.AngularCompilerPlugin({
                tsConfigPath: './tsconfig-aot.json'
            }),
            // Minimizes the bundle.
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                },
                sourceMap: true
            }),
            // Adds script for the bundle in index.html.
            new HtmlWebpackPlugin({
                filename: 'index.html',
                inject: 'body',
                template: 'src/index.html'
            })
        ],

        resolve: {
            extensions: ['.ts', '.js']
        },

        devtool: 'source-map',

        performance: { hints: false }

    };

}
