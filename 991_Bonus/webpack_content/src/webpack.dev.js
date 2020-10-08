const path = require("path");
const common = require("./webpack.common");
const {merge} = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = merge(common, {
    // Output is readable and not minified
    mode:"development",

    // to remove eval in output and make
    // the code more readable:
    devtool : "none",


    output: {
        // Specify filename
        filename: "[name].bundle.js",

        // Specify output's folder.
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: './src/template.html'
            }
        )
    ],

    module:{
        rules: [
            {
                test: /\.scss$/, 
                use: [
                    'style-loader', // 3rd inject the css into dom.
                    'css-loader', //2nd turns css into common js
                    'sass-loader' // 1st turns scss into css
                ],
            }
        ]
    }
});