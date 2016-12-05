module.exports = {

    //entry point (input)
    entry: './app/app.jsx',

    //where the output file is
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },

    //tells us which file extensions to include
    resolve: {
        root: __dirname,
        alias: {
            //define aliases here
        },
        extensions: ['', '.js', 'jsx']
    },

    module: {

        //loaders is an array of loader objects
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                },

                //apply this loader to all files in test that are not in the exclude folder

                test: /\.jsx?$/, //this is a regular expression
                exclude: /(node_modules|bower_components)/
            }
        ]
    }
};
