const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.css$/,
                loader: "css-loader"
            },
            {
                test: /\.s[ca]ss$/i,
                use: [{
                    loader: "style-loader"
                  }, {
                    loader: "css-loader",
                    options: {
                        modules: true,
                        importLoaders: 1,
                        modules: {
                            localIdentName: '[name]-[local]-[hash:base64:3]'
                        },
                    }
                  }, {
                    loader: "sass-loader"
                  }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        })
    ]
}