let gulp = require('gulp'),
    fs = require("fs"),
    browserify = require("browserify"),
    tsify = require("tsify"),
    babelify = require('babelify');

let app = {
    //entry extension can be .jsx, .js, .ts, or .tsx
    entry: './source/scripts/main.tsx',
    publish: './dist/scripts/publish.js',
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
        .pipe(fs.createWriteStream(app.publish));
});

function getJsonFile(path) {
    return JSON.parse(fs.readFileSync(path));
}