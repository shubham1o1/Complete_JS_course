const path = require("path");
const common = require("./webpack.common");
const {merge} = require('webpack-merge');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    // Output is readable and not minified
    mode:"production",

    // to remove eval in output and make
    // the code more readable:
    devtool : "none",



    output: {
        // Specify filename
        filename: "[name].[contentHash].bundle.js",

        // Specify output's folder.
        path: path.resolve(__dirname, "dist")
    },

    plugins: [
        new MiniCssExtractPlugin({ filename : "[name].[contentHash].css" }),
        new CleanWebpackPlugin(),
    ],
    module:{
        rules: [
            {
                test: /\.scss$/, 
                use: [
                    MiniCssExtractPlugin.loader, //new 3rd: Extract Separate CSS file. 
                    // 'style-loader', // 3rd inject the css into dom.
                    'css-loader', //2nd turns css into common js
                    'sass-loader' // 1st turns scss into css
                ],
            }
        ]
    }
});