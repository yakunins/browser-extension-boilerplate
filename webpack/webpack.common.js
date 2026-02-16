const webpack = require("webpack");
const path = require("path");
const packageJson = require("../package.json");

const srcDir = path.join(__dirname, "..", "src");

const config = {
    plugins: [
        new webpack.DefinePlugin({
            __APP_VERSION__: JSON.stringify(packageJson.version),
            __APP_AUTHOR__: JSON.stringify(packageJson.author),
            __APP_YEAR__: JSON.stringify(packageJson.year || new Date().getFullYear().toString()),
        }),
    ],
    entry: {
        background: path.join(srcDir, "background.ts"),
        content: path.join(srcDir, "content.ts"),
        newtab: path.join(srcDir, "newtab.tsx"),
        popup: path.join(srcDir, "popup.tsx"),
        options: path.join(srcDir, "options.tsx"),
    },
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks(chunk) {
                return chunk.name !== "background" && chunk.name !== "content";
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
};

module.exports = config;
