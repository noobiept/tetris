const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const package = require("./package.json");

module.exports = {
    entry: "./source/index.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(
            __dirname,
            "release",
            `${package.name}_${package.version}`
        ),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./source/index.html",
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "./libraries/", to: "./libraries/" },
                { from: "./css/", to: "./css/" },
            ],
        }),
    ],
};
