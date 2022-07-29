//main module
import gulp from 'gulp';

//import path
import { path } from './gulp/config/path.js';

//passing values to a global variable
global.app = {
    path: path,
    gulp: gulp,
    plugins: plugins
};

//import tasks
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { plugins } from './gulp/config/plugins.js';

//watcher of changes
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
};

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

//main tasks
const mainTasks = gulp.series(fonts,copy, html, scss, js, images);

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

//default execution
gulp.task('default', dev);
