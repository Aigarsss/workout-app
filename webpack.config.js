const path = require("path");
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: '',
        clean: true
        // assetModuleFilename: 'static/[hash][ext][query]'
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
        alias: {
            "@App": path.resolve(__dirname, 'src')
        }
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
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            // {
            //     test: /\.(svg|png|jp?g|gif)$/i,
            //     type: 'asset/resource'
            // },
            {
                test: /\.s[ca]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[name]-[local]-[hash:base64:3]'
                            },
                        }
                    }, 
                    { 
                        loader: "sass-loader",
                        options: {
                            additionalData: `
                                @import "_vars";
                                @import "_mixins";
                        `,
                            sassOptions: {
                                includePaths: ['src/scss/global']
                            }
                    }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [autoprefixer()]
                            }
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        devMiddleware: 
            {
                writeToDisk: true
            }
        // static: path.join(__dirname, "src/assets")
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
            // favicon: path.resolve(__dirname, "src", "assets", "favicon.svg")
        }),
        new CopyPlugin({
            patterns: [
                { 
                    from: path.resolve(__dirname, 'src', 'assets'), 
                    to: 'assets'
                }
            ],
        }),
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true,
        }),
    ]
}