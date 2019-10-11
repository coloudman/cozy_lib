const JsDocPlugin = require("jsdoc-webpack-plugin");

module.exports = {
    target: 'node',
    entry:{
        index:"./src/index.js"
    },
    output:{
        library: 'COZY_LIB',
        libraryTarget: 'umd',
        filename: 'index.js',
        path: __dirname
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
    },
    plugins: [
        new JsDocPlugin({
            conf: 'jsdoc.conf.js',
            cwd: '.',
            preserveTmpFile: false
        })
    ]
};