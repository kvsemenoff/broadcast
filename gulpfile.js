//файлы css-файлов
var css_files = new Array(
	'libs/bootstrap/bootstrap-grid-3.3.1.min.css',
	'libs/fancybox/jquery.fancybox.css', 
	'libs/owl.carousel/assets/owl.carousel.css',
	'css/reset.css',
	'css/fonts.css',
	'css/style.css',
	'block/h2/h2.css',
	'block/button/button.css',
	'block/inputtext/style.css',
	'css/style-db.css',
	'css/style-dc.css',
	'css/style-dd.css',
	'css/style-de.css',
	'css/style-df.css',
	'css/style-dg.css',
	'css/style-dh.css',
	'css/style-di.css',
	'css/style-dj.css'
);

//Название общего фала для всех стилей
var css_style_name = 'style.min.css';

//файлы js-скриптов
var js_files = new Array(
	'libs/jquery/jquery-1.11.1.min.js',
	'libs/owl.carousel/owl.carousel.js',
	'libs/fancybox/jquery.fancybox.pack.js',
	'js/jquery.mousewheel.js',
	'js/jquery.maskedinput.min.js',
	'js/common.js',
	'js/outerstyles.js'
);
//Название общего файла для всех js-скриптов
var js_scripts_name = 'scripts.min.js';
	
//Заугразка библиотек
var gulp = require('gulp'),
	sass         = require('gulp-sass'), 
	autoprefixer = require('gulp-autoprefixer');
	concat = require('gulp-concat'),
	cleanCSS = require('gulp-clean-css'),
	minifyJS = require('gulp-minify'),
	uglify = require('gulp-uglify'),
	rename = require("gulp-rename"),
	fileinclude = require('gulp-file-include'),
	imagemin     = require('gulp-imagemin'),
	 browserSync = require('browser-sync').create();

//Компиляция SCSS в CSS
gulp.task('sass', function(){ 
	return gulp.src('css/*.scss') 
		.pipe(sass()) 
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('css')) 
});

//Объединение и минификация всех собственных 
gulp.task('default', ['concatCSS','compressJS', 'imagemin', 'imageMenu', 'includeFiles', 'fonts',  'htaccessFiles', 'fileinclude'], function() {
   return gulp.src('css/*.scss') 
		.pipe(sass()) 
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('css')) 
});

//Объединение и минификация всех стилей подключаемых библиотек и общих стилей
gulp.task('concatCSS', function() {
  return gulp.src(css_files)
    .pipe(concat(css_style_name)) 
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('product/css/'));
});

//Объединение и сжатие всех js-скриптов
gulp.task('compressJS', function(){
    return gulp.src(js_files)
        .pipe(concat(js_scripts_name))
        .pipe(uglify())
        .pipe(gulp.dest('product/js/'));
});

//Оптимизаця картинок
gulp.task('imagemin', function() {
    return gulp.src('img/**.*')
           .pipe(imagemin({
                progressive: true
           }))
           .pipe(gulp.dest('product/img/'))
});

gulp.task('imageMenu', function() {
    return gulp.src('img/menu/**.*')
           .pipe(imagemin({
                progressive: true
           }))
           .pipe(gulp.dest('product/img/menu/'))
});

//Перенос всех файлов папки include, если это нужно
gulp.task('includeFiles', function() {
	return gulp.src('includes/**.*')
		
		.pipe(gulp.dest('product/includes')); 
});

//Перенос всех шрифтов
gulp.task('fonts', function() {
	return gulp.src('fonts/*/**.*')
		
		.pipe(gulp.dest('product/fonts')); 
});

//Перенос файлов в корне
gulp.task('rootFiles', function() {
	return gulp.src('*.*')
		
		.pipe(gulp.dest('product/')); 
});
//Перенос .htaccess
gulp.task('htaccessFiles', function() {
	return gulp.src('.htaccess')
		
		.pipe(gulp.dest('product/')); 
});

  
gulp.task('fileinclude', function() {
  gulp.src('*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
}))
    .pipe(gulp.dest(''));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: ""
        }
    });
});

gulp.task('watch', ['browser-sync','sass', 'fileinclude'], function() {
	gulp.watch('css/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch('*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('includes/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта

	gulp.watch('js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});




