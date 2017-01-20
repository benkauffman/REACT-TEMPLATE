var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;

var common = {

  devtool: '',

  entry: [
    'babel-polyfill',
    './src/app.js',
    './src/index.html'
  ],

  output: {
    path: path.join(__dirname, '/public'),
    filename: 'app.js'
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: "." + path.sep + "src" + path.sep + "content", to: "." + path.sep + "content" },
      { from: "." + path.sep + "src" + path.sep + "json", to: "." + path.sep + "json" },
      { from: "." + path.sep + "src" + path.sep + "lib" + path.sep + "js", to: "." + path.sep + "lib" + path.sep + "js" }
    ])
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000'
      },
      {
        test: /\.(ttf|eot|svg|otf?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader'
      },
      { test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=32000'
      },
      { test: /\.svg/,
        loader: 'svg-url-loader'
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      { test: /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      },
      {
        test: /\.json/,
        loader: 'json-loader'
      }

    ],
  }
};

var config = common;


if(TARGET === 'start') { // <-- this is webpack
  console.log('USING THE \"START\" VARIANT');
  config = merge(common, {

      devtool: 'source-map',

      entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server'
      ],

      plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('debug')
          }
        })
      ],

      devServer: {
        port: 3000,
        historyApiFallback: true
      },

  });
  console.log(JSON.stringify(config));
} else if (TARGET === 'dev') {
  console.log('USING THE \"DEV\" VARIANT');
  
} else { // <-- default to node deploy
  console.log('USING THE \"BUILD\" VARIANT');
  config = merge(common, {

    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        })

      ]

  });

  console.log(JSON.stringify(config));
}

module.exports = config;
