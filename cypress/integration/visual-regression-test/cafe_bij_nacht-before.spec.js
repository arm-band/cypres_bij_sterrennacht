const flag              = 'BEFORE';

const configDataOrigin  = require('../../fixtures/visual-regression-test/config.json');
const zonnebloemenClass = require('../../../zonnebloemen');
const zonnebloemen      = new zonnebloemenClass();
const parameters        = zonnebloemen.getParameters(flag);
const configData        = zonnebloemen.getConfig(configDataOrigin, parameters.flag);

describe(`${parameters.outStr} screenshot`, function () {
    const pages     = configData.pages;
    const domain    = configData.commons.url[parameters.urlKey];
    const viewports = configData.viewports;
    const ss_dir    = parameters.outStr;
    var test_id     = '';
    var ss_path     = '';
    var url         = '';

    pages.forEach(({ test_id, uri }) => {
        viewports.forEach(({ name, width, height }) => {
            context(test_id, () => {
                beforeEach(() => {
                    url = domain + uri;
                    cy.visit(url);
                });

                it('take screenshot', function () {
                    ss_path = ss_dir + '/' + test_id + '-' + name;
                    cy.wait(configData.commons.screenshot.waitMsec);
                    cy.viewport(width, height);
                    cy.scrollTo('bottom');
                    cy.screenshot(ss_path, {
                        onBeforeScreenshot($el) {
                            for (const selector of configData.commons.hideElements) {
                                const $selector = $el.find(selector);
                                if ($selector) {
                                    $selector.hide();
                                }
                            }
                        },
                        capture: Cypress.env(configData.commons.screenshot.capture),
                    });
                });
            });
        });
    });
});
