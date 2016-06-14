var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        path.resolve(__dirname, 'app/main.js')
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss']
    },
    module: {
        loaders: [{
            test: /\.less$/,
            exclude: /node_modules/,
            loader: 'style!css!less'
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            loader: 'style!css!sass'
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react', "stage-0"]
            }
        }]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    }
};