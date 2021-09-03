const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SRC = path.resolve(__dirname, 'app');
const DEST = path.resolve(__dirname, 'src/main/resources/META-INF/resources/dist');

module.exports = {

  entry: {
    app: SRC + '/app.jsx',
  },
  target: 'web',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
		port: process.env.PORT || 3000,
    proxy: {
      '/webhooks/rest/webhook': {
          target: 'http://localhost:5005',
          secure: false
      }
    }
	},
  resolve: {
    extensions: ['.js','.jsx','.css'],
    modules: [
      'node_modules'
    ] 
  },
  output: {
    path: DEST,
    filename: 'app.js'
  },
 module: {
    rules: [
      {
        test: /\.jsx?$/,
        use : {
				loader: 'babel-loader'					
			},
        include: SRC
      },
      {
		test: /\.css$/, 
		use : ["style-loader", "css-loader"]
     
		},
      {	
		test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, use : {loader: 'url?limit=10000&amp;mimetype=application/font-woff'}
		},
      {
		test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use : {loader: 'url?limit=10000&amp;mimetype=application/octet-stream'}
		},
      {
		test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use : {loader: 'file'}
		},
      {
		test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use : {loader: 'url?limit=10000&amp;mimetype=image/svg+xml'}
		}
    ]
  },
  devtool : 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './app/index.html', 
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.ProvidePlugin({
      'React': 'react'
    })
  ]
}