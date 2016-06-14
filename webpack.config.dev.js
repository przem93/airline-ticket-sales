var path = require('path');
var webpack = require('webpack');
// var jQuery = require('jquery');

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname, 'app/main.js')
    ],
    // resolve: {
    //     extensions: ['', '.js', '.jsx', '.scss'],
    //     alias: {
    //         jquery: "jquery/dist/jquery"
    //     }
    // },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    // externals: { 'jquery': 'jQuery' },
    module: {
        loaders: [{
            test: /\.less$/,
            exclude: /node_modules/,
            loader: 'style!css!less'
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            loaders: ["style", "css", "sass"]
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
        }, {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            exclude: /node_modules/,
            loader: 'url-loader?limit=100000'
        }, {
            test: require.resolve("jquery"),
            loader: "imports?jQuery=jquery"
        }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, "./app/styles")]
    }
};