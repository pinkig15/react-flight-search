var path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");


var APP_DIR = path.resolve(__dirname, "src");
var BUILD_DIR = path.resolve(__dirname, "dist");

var config = {
  mode: "development",
    entry: [
        APP_DIR + '/index.js',
        APP_DIR + '/styles/scss/index.scss'
    ],
    output: {
        path: BUILD_DIR,
        filename: "app.bundle.js",
        publicPath: '/dist/'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: "babel-loader"
            },
            {
              test: /\.scss$/,
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                  {
                      loader: 'css-loader',
                      options: {
                          url: false,
                          minimize: true,
                          sourceMap: true
                      }
                  }, 
                  {
                      loader: 'sass-loader',
                      options: {
                          sourceMap: true
                      }
                  }
                ]
              })  
            }
          ]
      },
      resolve: {
        extensions: ['.js', '.jsx', '.json', 'scss']
      },
      plugins: [
        new ExtractTextPlugin("app.bundle.css")
      ],
      devServer: {
        historyApiFallback: true,
        open: true
      }
};
module.exports = config;