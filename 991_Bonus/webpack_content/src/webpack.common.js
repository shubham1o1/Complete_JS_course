const path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    // to remove eval in output and make
    // the code more readable:
    devtool : "none",

    // First file to execute
    entry: "./src/index.js",
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: './src/template.html'
            }
        )
    ],
    module : {
        rules: [
            {
                test: /\.scss$/, 
                use: [
                    'style-loader',
                    'css-loader', 
                    'sass-loader'
                ],
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "imgs"  
                    }
                }
            }
        ]
    }
};