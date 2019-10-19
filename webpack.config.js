const development = process.env.dev === "true" ? true : false;

console.log(development);

const path = require("path");

module.exports = {
    mode: development ? "development" : "production",
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