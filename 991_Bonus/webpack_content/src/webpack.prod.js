const path = require("path");
const common = require("./webpack.common");
const {merge} = require('webpack-merge');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); 
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = merge(common, {
    // Output is not readable and minified
    mode:"production",

    output: {
        // Specify filename
        filename: "[name].[contentHash].bundle.js",

        // Specify output's folder.
        path: path.resolve(__dirname, "dist")
    },

    optimization: {
        minimizer : [
            new OptimizeCssAssetsPlugin(), 
            new TerserPlugin(),
            new HtmlWebpackPlugin(
                {
                    template: './src/template.html',
                    minify: {
                        removeAttributeQuotes: true,
                        collapseWhitespace: true,
                        removeComments: true
                    }
                }
            )
        ]
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