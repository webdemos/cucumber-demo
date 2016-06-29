module.exports = {
    entry: './app/index.js',
    devtool: "#inline-source-map",
    output: {
        path: 'app',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.feature$/,
                loader: 'raw'
            }
        ]
    }
};