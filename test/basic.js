const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('generator without everything', function () {
    beforeEach(function () {
        // The object returned acts like a promise, so return it to wait until the process is done
        return helpers.run(path.join(__dirname, '../generators/app'))
            .withOptions({ appname: 'foo' })    // Mock options passed in
            .withPrompts({ gituser: 'sipmann', extras: [''] }); // Mock the prompt answers
    });

    it('generates a project with react router', () => {
        assert.file(['package.json', '.babelrc', 'index.html', 'src/index.jsx']);
        assert.jsonFileContent('package.json', {"name": "foo"});
        assert.noFileContent('src/index.jsx', '../css/app.scss');
        assert.noFileContent('src/index.jsx', '<Router>');
    });
});
