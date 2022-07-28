import fileinclude from 'gulp-file-include';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import htmllint  from 'gulp-htmllint';
import fancyLog from 'fancy-log';
import colors from 'ansi-colors';

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(fileinclude())
        .pipe(webpHtmlNosvg())
        .pipe(htmllint({}, htmllintReporter))
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream())
};

function htmllintReporter(filepath, issues) {
	if (issues.length > 0) {
		issues.forEach(function (issue) {
			fancyLog(colors.cyan('[gulp-htmllint] ') + colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + colors.red('(' + issue.code + ') ' + issue.msg));
		});

		process.exitCode = 1;
	}
}
