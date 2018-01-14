module.exports = {
    entry: ['./src/index.ts', './src/styles/index.sass'],
    output: {
        filename: 'app.bundle.js',
        path: __dirname + '/dist'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: '#eval-source-map',

    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.vue', '.js', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    module: {
        rules: [
            // Vue
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                    }
                    // other vue-loader options go here
                }
            },

            // Sass
            {
                test: /\.sass$/,
                // Chain 3 loaders to get from Sass to styles on the DOM (read them bottom-to-top)
                // See https://github.com/webpack-contrib/sass-loader for more info
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader' // compiles Sass to CSS
                ]
            },

            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        'vue': 'Vue'
    },
};
