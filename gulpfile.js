var gulp = require('gulp'),
        bower = require('gulp-bower'),
        sass = require('gulp-sass'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        inject = require('gulp-inject'),
        watch = require('gulp-watch'),
        template = require('gulp-template-compile'),
        rimraf = require('gulp-rimraf'),
        clean = require('gulp-clean'),
        requirejsOptimize = require('gulp-requirejs-optimize');

var package = require('./package.json'),
        resourcesDir = 'resources',
        publicDir = 'public';

var config = {
    sassPath: 'sass',
    bowerDir: './bower_components',
    resourcesDir: './resources/',
    publicDir: './public/'
};


gulp.task('bower', function () {
    return bower()
            .pipe(gulp.dest(config.bowerDir));
});


gulp.task('icons', function () {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
            .pipe(gulp.dest(config.publicDir + 'fonts'));
});

gulp.task('styles', ['clean'], function () {
    return gulp.src(config.resourcesDir + 'sass/main.scss')
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(concat('css/main-' + package.version + '.min.css'))
            .pipe(gulp.dest('./public'));
});


gulp.task('scripts', ['clean'], function () {
    return gulp.src([
        config.bowerDir + '/jquery/dist/jquery.js',
        config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.js',
        config.resourcesDir + 'js/*.js',
        config.resourcesDir + 'js/**/*.js'
    ])
            .pipe(concat('js/main-' + package.version + '.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(publicDir));
});

gulp.task('clean', function () {
    return gulp.src([
        config.publicDir + 'css/*.css',
        config.publicDir + 'js/*.js',
        //clear fonts
        config.publicDir + 'fonts/*.otf',
        config.publicDir + 'fonts/*.eot',
        config.publicDir + 'fonts/*.ttf',
        config.publicDir + 'fonts/*.woff',
        config.publicDir + 'fonts/*.woff2',
        config.publicDir + 'fonts/*.svg'
    ], {read: false}).pipe(clean());
});

gulp.task('html', ['scripts', 'styles'], function () {
    var injectFiles = gulp.src([
        config.publicDir + 'css/main-' + package.version + '.min.css',
        config.publicDir + 'js/main-' + package.version + '.min.js'
    ], {read: false});


    var injectOptions = {
        addRootSlash: true,
        ignorePath: ['resources', 'public']
    };

    return gulp.src('public/index.html')
            .pipe(inject(injectFiles, injectOptions))
            .pipe(gulp.dest('public'));

});


gulp.task('watch', function () {
    gulp.watch(config.resourcesDir + 'js/*', ['scripts', 'html']);
    gulp.watch(config.resourcesDir + 'sass/*', ['styles', 'html']);
});


gulp.task('default', ['bower', 'icons', 'clean', 'scripts', 'styles', 'html']);