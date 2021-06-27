/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
const path = require('path');
const fs = require('fs');

const isExistFile = (file) => {
    try {
        fs.statSync(file);
        return true;
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
    }
};

module.exports = (on, config) => {
    on('after:screenshot', (details) => {
        const str = details.path;
        const newPath = str.replace(/[\w\d_]+\-(before|after)\.spec\.js/, '');
        const newDir  = path.dirname(newPath);
        fs.mkdirSync(newDir, { recursive: true });
        fs.renameSync(details.path, newPath);
        return { path: newPath };
    });
    on('after:spec', (details) => {
        const newPath = details.absolute.replace('integration', 'screenshots');
        newPath.match(/[\w\d_]+\-(before|after)\.spec\.js/);
        const childNewPath = path.join(newPath, RegExp.$1);
        if (isExistFile(childNewPath)) {
            fs.rmdirSync(childNewPath);
        }
        if (isExistFile(newPath)) {
            fs.rmdirSync(newPath);
        }
    });
};
