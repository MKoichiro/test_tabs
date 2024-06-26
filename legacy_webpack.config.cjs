const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.tsx?$/,
        exclude: /_ignore\.\w+$/,   // blah_ignore.extensionsをbundleから除外
        options: {
          configFile: 'tsconfig.json'
        }
      },
      { // easymdeでのみ使用
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  devServer: {
    host: '0.0.0.0',
    static: {
      directory: `${__dirname}/dist`,
    },
    open: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx']
  },
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html'
    }),
  ],
}