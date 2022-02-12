const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        port: 3000,
        open: true,
        hot: true,
        devMiddleware: 
            {
                writeToDisk: true
            }
        // static: path.join(__dirname, "src/assets")
    },
});