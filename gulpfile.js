var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    browsersync = require('browser-sync');

gulp.task('sassToCss', function(){
    return gulp.src('src/sass/assignment.sass')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("src/css/"));
});

gulp.task('watch', ['sassToCss', 'browserSync'], function(){
   gulp.watch('src/sass/assignment.sass', ['sassToCss', browsersync.reload]);
    gulp.watch('src/index.html', browsersync.reload);
});

gulp.task('browserSync', function(){
    browsersync({
        server: {
            baseDir: 'src'
        },
        notify: false
    })
});

