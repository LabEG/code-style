(function () {
    'use strict';

    const gulp = require('gulp');
    const semver = require('semver');
    const fs = require('fs');

    function dropException(message) {
        throw new Error(message);
    }

    const minNodeVersion = '>=9.0.0';
    if (!semver.satisfies(process.version, minNodeVersion)) {
        throw new Error(
            'Ошибка версии Node.js, минимальная версия ' + minNodeVersion +
            ', текущая версия ' + process.version
        );
    }

    process.env.NODE_ENV = 'development'; // development production

    global.APPS_NAMES = [
        'App'
    ];

    const registerTask = require('./gulptasks/00.apps');
    const appsName = global.APPS_NAMES;
    for (let i = 0; i < appsName.length; i += 1) {
        registerTask(appsName[i]);
    }

    require('./gulptasks/80.dev');

    function runTasks() {
        for (let i = 0; i < appsName.length; i += 1) {
            registerTask(appsName[i]);
        }

        global.APPS_NAMES.map(function (name) {
            gulp.start(name + '-Build');
        })
    }

    gulp.task(
        'release',
        function () {
            process.env.NODE_ENV = 'production';

            fs.readFile('src/main.ts', 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                var result = data.replace(/console\.log\("Build date: ", ".+?"\);/, `console.log("Build date: ", "${new Date().toLocaleString()}");`);

                fs.writeFile('src/main.ts', result, 'utf8', function (err) {
                    if (err) return console.log(err);
                });
            });

            runTasks();
        }
    );

    gulp.task('default', ['release']);
}());
