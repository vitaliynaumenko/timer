//base part

let {src, dest, parallel, series, watch } = require('gulp'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    webpack = require('webpack'),
    gutil = require('gulp-util'),
    notifier = require('node-notifier'),
    imagemin = require('gulp-imagemin')

//css part
let scss = require('gulp-sass'),
    concat = require('gulp-concat')
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer');

let webpackConfig = require('./webpack.config.js');
let statsLog = { // для красивых логов в консоли
    colors: true,
    reasons: true
};

function swallowError(error) {
    console.log(error.toString());
    this.emit('end');
}


//  task style
function styles (){
    return src('./src/scss/main.scss')
        .pipe(sourcemaps.init())
        // .pipe(less().on('error', less.logError))
        .on('error', swallowError)
        .pipe(scss({
            includePaths: ['node_modules']
        }))
        .pipe(cleanCSS())
        .pipe(rename('style.min.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(dest('./css'))

}


function scripts(done) {
    console.log(done);

    function onError(error) {
        let formatedError = new gutil.PluginError('webpack', error);

        notifier.notify({ // чисто чтобы сразу узнать об ошибке
            title: `Error: ${formatedError.plugin}`,
            message: formatedError.message
        });

        done(formatedError);
    }

    function onSuccess(detailInfo) {
        console.log(detailInfo);
        done();
    }

    function onComplete(error, stats) {
        if (error) { // кажется еще не сталкивался с этой ошибкой
            onError(error);
        } else if (stats.hasErrors()) { // ошибки в самой сборке, к примеру "не удалось найти модуль по заданному пути"
            onError(stats.toString(statsLog));
        } else {
            onSuccess(stats.toString(statsLog));
        }
    }

    // run webpack
    webpack(webpackConfig, onComplete);

}

function images() {
    return src ('./src/images/*.*')
        .pipe(dest('./images/'))
}

function watchFiles(){
    watch('./src/**/*.scss', styles);
    watch('./src/**/*.js', scripts);
    // gulp.watch('./src/pug/**/*.pug', views);
     watch('./src/images/*', images);

}

exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.watch = watch;
exports.default = series( series(styles,scripts,images), parallel(watchFiles))
