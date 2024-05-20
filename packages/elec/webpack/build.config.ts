import path from 'path'
import webpack from 'webpack'
// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server'

const config: webpack.Configuration = {
    mode: 'production',
    entry: './src/main.ts',
    watch: false,
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, '..', 'src'),
            '@yitouzi': path.resolve(__dirname, '..', '..'),
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'esbuild-loader',
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        clean: true,
        path: path.resolve(__dirname, '..', 'distjs'),
        filename: 'main.js',
    },
    target: 'electron-main',
}

export default config
