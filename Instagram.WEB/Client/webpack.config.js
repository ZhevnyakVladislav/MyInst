const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '../dist'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(sass|scss)$/,
                use: ['css-loader', 'sass-loader']
            }, {
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
    ]
}