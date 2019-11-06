const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require('@babel/polyfill');

module.exports = ({
    devtool: process.env.NODE_ENV === 'production' ? 'cheap-module-source-map' : 'source-map',
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
                include: path.resolve('src')
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'less-loader',
                    'sass-loader',
                ],
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        publicPath: ''
                    }
                }]
            }
        ]
    },
    plugins: [
        new WebpackNotifierPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],
    resolve: {
        modules: ['node_modules', 'src'],
        alias: {
            store: path.resolve(__dirname, 'src/store'),
            common: path.resolve(__dirname, 'src/common'),
            helpers: path.resolve(__dirname, 'src/helpers'),
            api: path.resolve(__dirname, 'src/api')
        }
    }
});