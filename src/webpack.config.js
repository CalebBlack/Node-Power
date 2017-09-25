var path = require('path');

var config = {
   entry: './index.js',
   output: {
      path : path.join(__dirname, '../build/'),
      filename: 'bundle.js',
   },
   devServer: {
      inline: true,
      port: 8080
   },
   module: {
     loaders: [
       {
         test: /\.jsx?$/,
         exclude: /node_modules/,
         loader: 'babel-loader',
       query: {
         presets: ['es2015', 'react']
            }
         }
      ]
   }
}
module.exports = config;
