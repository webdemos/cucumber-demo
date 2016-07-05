// var config = {
//     host: 'localhost',
//     port: 9001,
//     server: {
//         baseDir: './'
//     },
//     ui: {
//         port: 9002
//     },
//     startPath: './app/'
// };
//
// var bs = require('browser-sync').create('My Server');
//
// bs.init(config);
//
// bs.watch('./app/**/*.*', function (event, file) {
//     if (event === 'change') {
//         console.log('reload');
//         console.log(file);
//         bs.reload('./app/*');
//     }
// });


var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: './app/index.js',
    devtool: "#inline-source-map",
    cache: false,
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
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 9001,
            server: {
                baseDir: './'
            },
            ui: {
                port: 9002
            },
            startPath: './app/'
        }, {
            reload: true
        })
    ]
};