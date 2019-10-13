const JsDocPlugin = require("jsdoc-webpack-plugin"),
path = require("path"),
DeclarationBundlerPlugin = require('declaration-bundler-webpack-plugin');

module.exports = {
    //mode:"production",
    mode: "development",
    target: 'node',
    entry:{
        index:"./src/index.ts"
    },
    output:{
        library: 'COZY_LIB',
        libraryTarget: 'umd',
        filename: 'index.js',
        path: path.resolve(__dirname, "dist")
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ]
    },
    resolve: {
      extensions: ['.ts', '.js', '.json']
    },
    plugins: [
    ],
    externals: [

    ]
};