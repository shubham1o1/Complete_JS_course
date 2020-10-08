const path = require("path");

module.exports = {

    // to remove eval in output and make
    // the code more readable:
    devtool : "none",

    // First file to execute
    entry: {
        main : "./src/index.js",
        vendor : "./src/vendor.js",
    },
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