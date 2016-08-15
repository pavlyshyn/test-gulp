var gulp = require('gulp'),
        bower = require('gulp-bower'),
        sass = require('gulp-sass'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        inject = require('gulp-inject'),
        watch = require('gulp-watch');


var package = require('./package.json');

var config = {
    sassPath: './resources/sass',
    bowerDir: './bower_components'
};


gulp.task('bower', function () {
    return bower()
            .pipe(gulp.dest(config.bowerDir));
});


gulp.task('icons', function () {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
            .pipe(gulp.dest('./public/fonts'));
});

gulp.task('styles', function () {
    return gulp.src('./resources/sass/main.scss')
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(concat('css/main.css?'+package.version))
            .pipe(gulp.dest('./public'));
});


gulp.task('scripts', function () {
    return gulp.src([
        config.bowerDir + '/jquery/dist/jquery.js',
        config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.js',
        './resources/js/*.js',
        './resources/js/**/*.js'
    ])
            .pipe(concat('js/main.js?'+package.version))
            .pipe(uglify())
            .pipe(gulp.dest('./public'));
});


gulp.task('html', ['styles'], function () {
    var injectFiles = gulp.src([
        'public/css/main.css?'+package.version,
        'public/js/main.js?'+package.version
    ]);


    var injectOptions = {
        addRootSlash: true,
        ignorePath: ['resources', 'public']
    };

    return gulp.src('public/index.html')
            .pipe(inject(injectFiles, injectOptions))
            .pipe(gulp.dest('public'));

});


gulp.task('watch', function () {
    gulp.watch('./resources/js/*', ['scripts', 'html']);
    gulp.watch('./resources/sass/*', ['styles', 'html']);
});


gulp.task('default', ['bower', 'icons', 'scripts', 'styles', 'html']);