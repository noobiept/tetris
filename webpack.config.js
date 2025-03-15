import CircularDependencyPlugin from "circular-dependency-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

import packageInfo from "./package.json" with { type: "json" };

const __dirname = import.meta.dirname;

export default (env, argv) => {
    const isProduction = argv.mode === "production";

    return {
        entry: "./source/index.tsx",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
            ],
        },
        devtool: isProduction ? false : "source-map", // enable sourcemaps only for development
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },
        output: {
            filename: "bundle.js",
            path: path.resolve(
                __dirname,
                "release",
                `${packageInfo.name}_${packageInfo.version}`
            ),
            clean: true,
        },
        devServer: {
            port: 8000,
            historyApiFallback: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./source/index.html",
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: "./libraries/", to: "./libraries/" },
                    { from: "./assets/", to: "./assets/" },
                    { from: "./public/", to: "./" },
                ],
            }),
            new CircularDependencyPlugin({
                // exclude detection of files based on a RegExp
                exclude: /a\.js|node_modules/,
                // include specific files based on a RegExp
                include: /source/,
                // add errors to webpack instead of warnings
                failOnError: true,
                // allow import cycles that include an asyncronous import,
                // e.g. via import(/* webpackMode: "weak" */ './file.js')
                allowAsyncCycles: false,
                // set the current working directory for displaying module paths
                cwd: process.cwd(),
            }),
        ],
    };
};
