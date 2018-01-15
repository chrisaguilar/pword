import { join } from 'path';

import * as webpack from 'webpack';

// tslint:disable:no-require-imports completed-docs no-var-requires
const TsConfigPathsPlugin: any = require('tsconfig-paths-webpack-plugin');
const webpackNodeExternals: any = require('webpack-node-externals');
const UglifyJsPlugin: any = require('uglifyjs-webpack-plugin')
// tslint:enable:no-require-imports completed-docs no-var-requires

/**
 * webpack configuration file
 */
const config: webpack.Configuration = {
    entry: join(__dirname, 'src/pword.ts'),
    output: {
        filename: 'index.js',
        path: __dirname
    },
    module: {
        rules: [{
                include: join(__dirname, 'src'),
                test: /\.ts$/,
                use: ['ts-loader']
            },
            {
                include: join(__dirname),
                test: /\.json$/,
                use: ['json-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts'],
        plugins: [new TsConfigPathsPlugin()]
    },
    externals: [webpackNodeExternals()],
    target: 'node',
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                ecma: 6
            }
        }),
        new webpack.BannerPlugin({
            banner: '#!/usr/bin/env node',
            raw: true
        })
    ]
};

// tslint:disable-next-line:no-default-export
export default config;
