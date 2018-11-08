let gulp = require('gulp'),
    fs = require("fs"),
    browserify = require("browserify"),
    tsify = require("tsify"),
    buffer = require('vinyl-buffer'),
    babelify = require('babelify'),
    exec = require('child_process').exec;

let app = {
    //entry extension can be .jsx, .js, .ts, or .tsx
    entry: './path/to/entry.jsx',
    publish_filename: 'any_file_name.js',
    publish_directory: './path/to/publish/directory',
    tsconfig: './path/to/tsconfig.json'
};

gulp.task('react.build', function () {

    let b = browserify({
            entries: [app.entry]
        });

    b.plugin(tsify, getJsonFile(app.tsconfig).compilerOptions);
    b.transform(babelify,
        {
            presets: ['env', 'react']
        });

    return b.bundle()
        .pipe(source(app.publish_filename))
        .pipe(buffer())
        .pipe(gulp.dest(app.publish_directory));
});

function getJsonFile(path) {
    return JSON.parse(fs.readFileSync(path));
}

gulp.task('git.addremote', function(cb) {
    
    let nickname = getCLIArgument('nickname');
    let link = getCLIArgument('link');

    if(isNullUndefinedOrEmpty(nickname) || isNullUndefinedOrEmpty(link)){
        console.log(`nickname: ${nickname} | link: ${link}`);
        console.log(`${process.argv}`);
        return cb('required arguments --nickname and --link are missing');
    }
        

    let command = `
        git checkout master &&
        git remote add ${nickname} ${link} &&
        git fetch ${nickname} &&
        git pull ${nickname} master --allow-unrelated-histories &&
        git branch -u ${nickname}/master master &&
        git push
    `;

    runCommand(command, cb);
})

gulp.task('git.addignore', function(cb) {
    let command = `
        echo node_modules/>> .gitignore && 
        git reset && 
        git add .gitignore && 
        git commit -m "added git ignore and ignoring node_modules folder"
    `;
    runCommand(command, cb);

})

function runCommand(command, callback){
    command = command.replace(/\r?\n|\r/g, " ");
    exec(command, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        callback(err);
    });
}

function getCLIArgument(name) {
    var i = process.argv.indexOf(`--${name}`);
    return (i>-1) ? process.argv[i+1] : null;
}

function isNullUndefinedOrEmpty(value){
    return value === null || value === undefined || value === '';
}