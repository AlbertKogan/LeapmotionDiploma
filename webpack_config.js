var path = require('path'),
    webpack = require('webpack');

var BASE_PATH = __dirname,
    STATIC_PATH = path.join(BASE_PATH, 'static');

module.exports = {
    context: STATIC_PATH,
    resolve: {
        alias: {
            jquery: path.join(STATIC_PATH, 'js/lib/jquery.js'),
            three: path.join(STATIC_PATH, 'js/lib/three.min.js'),
            threeMeshPhong: path.join(STATIC_PATH, 'js/lib/mesh_phong_material.js'),
            canvasRenderer: path.join(STATIC_PATH, 'js/lib/canvas_renderer.js'),
            projector: path.join(STATIC_PATH, 'js/lib/projector.js')
        }
    },
    entry: {
        app:'./js/main.js',
        vendor: ['jquery', 'leapjs'],
        compileThree: ['three', 'threeMeshPhong', 'canvasRenderer', 'projector']
    },
    output: {
        path: path.join(STATIC_PATH, 'js/build'),
        filename: 'output.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new webpack.optimize.CommonsChunkPlugin('compileThree', 'three.compile.js'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            THREE: 'three'
        })
    ]
};