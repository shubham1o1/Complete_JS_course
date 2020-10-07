const path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    // to remove eval in output and make
    // the code more readable:
    devtool : "none",

    // First file to execute
    entry: {
        main : "./src/index.js",
        vendor : "./src/vendor.js",
    },
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