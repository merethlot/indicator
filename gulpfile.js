var gulp = require('gulp'),
    less = require('gulp-less'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    mainBowerFiles = require('main-bower-files'),
    reload   = browserSync.reload;

var config = {
    server: {
        baseDir: "dist"
    },
    host: 'localhost',
    port: 8000
};

gulp.task('buildBower', function() {
    // var jsFilter = gulpFilter('**/*.js')
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('dist/vendor'))
});

gulp.task('html', function () {
    gulp.src('app/*.html') 
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream: true}));
});

gulp.task('js', function () {
    gulp.src('app/js/**/*.js') 
        .pipe(gulp.dest('dist/js/'))
        .pipe(reload({stream: true}));
});

gulp.task('less', function(){ 
    return gulp.src('app/less/application.less') 
        .pipe(less({
          paths: ['app/less/']
        }
        ))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))        
        .pipe(cleanCSS({compatibility: '*'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
          stream: true
        }))
});

gulp.task('browserSync', function() {
  browserSync(config);
});

gulp.task('build', [
    'html',
    'js',
    'less'
]);

gulp.task('watch', function(){
    gulp.watch('app/*.html', function(event, cb) {
        gulp.start('html');
    });
    gulp.watch('app/less/**/*.less', function(event, cb) {
        gulp.start('less');
    });
    gulp.watch('app/js/**/*.js', function(event, cb) {
        gulp.start('js');
    });
  });

gulp.task('default', ['buildBower', 'build', 'browserSync', 'watch']);
