const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/main.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    plugins: [
        
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development'
};