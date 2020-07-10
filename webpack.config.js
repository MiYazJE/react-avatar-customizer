const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'examples/public/index.html'),
    filename: './index.html',
});
module.exports = {
    entry: path.join(__dirname, 'examples/src/index.js'),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                    },
                ],
            },
        ],
    },
    plugins: [htmlWebpackPlugin],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        inline: false,
        port: 3000,
    },
};
