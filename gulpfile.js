const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const pug = require('gulp-pug');

gulp.task('sass', () => {
	return gulp
		.src('./app/sass/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./app/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('watch', () => {
	gulp.watch('./app/sass/**/*.scss', ['sass'], browserSync.reload);
	gulp.watch('./app/templates/**/*.pug', ['pug']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('pug', () => {
	gulp.src('./app/templates/**/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./app'))
});

gulp.task('browserSync', () => {
	browserSync.init({
		server: {
			baseDir: './app'
		},
	})
});




gulp.task('default', ['browserSync', 'pug', 'sass', 'watch']);
