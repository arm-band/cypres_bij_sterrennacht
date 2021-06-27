const opener = require('opener');
const dir    = {
    baseDir: './cypress/screenshots/visual-regression-test/',
    startPath: 'report/index.html',
};

opener(`${dir.baseDir}${dir.startPath}`);
