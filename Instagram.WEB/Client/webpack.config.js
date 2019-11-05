const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
require('@babel/polyfill');

module.exports = env => ({
    devtool: env.NODE_ENV === 'production' ? 'cheap-module-source-map' : 'source-map',
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
                test: /\.(s?[ac]ss)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                }),
                include: [
                    path.resolve('src'),
                    path.resolve('node_modules'),
                ]
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!less-loader'
                }),
                include: path.resolve('src')
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
        new ExtractTextPlugin('styles.css'),
    ],
    resolve: {
        modules: ['node_modules', 'src'],
        alias: {
            store: path.resolve(__dirname, 'src/store/'),
            common: path.resolve(__dirname, 'src/common'),
            helpers: path.resolve(__dirname, 'src/helpers'),
            api: path.resolve(__dirname, 'src/api')
        }
    }
});