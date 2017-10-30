var gulp = require('gulp');
var babel = require('gulp-babel');
var del = require('del');

var taskConfig = {

	component: {
        file: 'ReactObservableStore.js',
		name: 'ReactObservableStore',
		src: 'src',
		lib: 'lib',
		pkgName: 'react-observable-store'
	}

};

gulp.task('clean', function () {
    return del([taskConfig.component.lib]);
});

gulp.task('build', function () {
    return gulp.src([ taskConfig.component.src + '/**/*.js', '!**/__tests__/**/*' ])
        .pipe(babel({ plugins: [require('babel-plugin-transform-object-assign')] }))
        .pipe(gulp.dest(taskConfig.component.lib));
});

gulp.task('watch', ['build'], function () {
    return gulp.watch([taskConfig.component.src + '/**/*.js'], ['build']);
});
