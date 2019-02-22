const config = require('./user.config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': config.getPath('frontend/polyfills.ts'),
        'app': config.getPath('frontend/main.ts')
    },
    output:{
        path: config.getPath('frontend/assets/js'),
        publicPath: '/',
        filename: "[name].js"
    },
    resolve: {
        extensions: ['.ts', '.js', '.css']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: config.getPath('config/tsconfig.json')
                        }
                    },
                    'angular2-template-loader'
                ]
            },
            {
                // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
                // Removing this will cause deprecation warnings to appear.
                test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                parser: { system: true },  // enable SystemJS
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.css$/,
                exclude: config.getPath('frontend/app'),
                use: ['css-loader']
            },
            {
                test: /\.css$/,
                include: config.getPath('frontend/app'),
                use: ['raw-loader']
            }
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /\@angular(\\|\/)core(\\|\/)/,
            config.getPath('frontend/'),
            {}
        ),
        new HtmlWebpackPlugin({
            template: config.getPath('frontend/index.html')
        }),
    ]
};
