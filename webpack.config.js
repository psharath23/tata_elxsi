const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path")
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
      },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /\*.ejs$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                exclude: /\*.ejs$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
      },
    devtool: 'inline-source-map',
    plugins: [new HtmlWebpackPlugin({
        title: 'SILA',
        template: 'index.html',
    })]
};