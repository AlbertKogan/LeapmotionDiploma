var path = require('path'),
    webpack = require('webpack');

var BASE_PATH = __dirname,
    STATIC_PATH = path.join(BASE_PATH, 'static');

module.exports = {
    context: STATIC_PATH,
    resolve: {
        alias: {
            jquery: path.join(STATIC_PATH, 'js/lib/jquery.js')
        }
    },
    entry: {
        app:'./js/main.js',
        vendor: ['jquery', 'leapjs']
    },
    output: {
        path: path.join(STATIC_PATH, 'js/build'),
        filename: 'output.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
};