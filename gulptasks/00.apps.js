// Include gulp
const gulp = require('gulp');

// main
const spawn = require('child_process').spawn;
const killTree = require('tree-kill');

// css, less
const csscomb = require('gulp-csscomb');
const csslint = require('gulp-csslint');

// ts
const gulpTslint = require("gulp-tslint");
const tslint = require("tslint");

function registerTask(appName) {

    const appNameLC = appName.toLowerCase();

    /**
     * Code Style
     */

    gulp.task(
        appName + '-CS-LESS',
        function () {
            const pathToCSSAll = 'src/app/' + appNameLC + '/**/*.{css,less}';
            return gulp.src(pathToCSSAll)
                .pipe(csslint())
                .pipe(csscomb())
                .pipe(gulp.dest('src/app/' + appNameLC + '/'));
        }
    );

    gulp.task(
        appName + '-CS-TS',
        function () {
            const pathToJSAll = 'src/app/' + appNameLC + '/**/*.{ts,tsx}';
            return gulp.src(pathToJSAll)
                .pipe(gulpTslint({
                    formatter: "msbuild",
                    configuration: "tslint.json"
                }))
                .pipe(gulpTslint.report(
                    {
                        emitError: false,
                        summarizeFailureOutput: true
                    })
                );
        }
    );

    gulp.task(
        appName + '-CS-All',
        [
            appName + '-CS-LESS',
            appName + '-CS-TS'
        ]
    );

    /**
     * Minification
     */

    gulp.task(
        appName + '-Watch',
        function () {
            const port = appNameLC.split('').reduce((summ, char) => summ += char.charCodeAt(0), 4200);
            const child = spawn('sh', ['ng', 'serve', '--configuration=streamdev', '--host=0.0.0.0', '--live-reload=false', '--port=' + port], {stdio: 'inherit'});
            process.on('SIGINT', () => killTree(child.pid));
        }
    );

    gulp.task(
        appName + '-Build',
        function () {
            spawn('sh', ['ng', 'build', '--prod'], {stdio: 'inherit'});
        }
    );

}

module.exports = registerTask;