let gulp = require('gulp'),
    fs = require("fs"),
    browserify = require("browserify"),
    tsify = require("tsify"),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    babelify = require('babelify');

let app = {
    //entry extension can be .jsx, .js, .ts, or .tsx
    entry: './source/scripts/main.tsx',
    publish_filename: 'publish.js',
    publish_directory: './dist/scripts',
    tsconfig: './tsconfig.json'
};

gulp.task('app.build', function () {

    let b = browserify({
            entries: [app.entry]
        });

    b.plugin(tsify, getJsonFile(app.tsconfig).compilerOptions);
    b.transform(babelify,
        {
            presets: ['env', 'react']
        }
    );
    
    console.log('Building...');
    return b.bundle()
        .pipe(source(app.publish_filename))
        .pipe(buffer())
        .pipe(gulp.dest(app.publish_directory));
});

function getJsonFile(path) {
    return JSON.parse(fs.readFileSync(path));
}