const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

beforeEach(function () {
    // The object returned acts like a promise, so return it to wait until the process is done
    return helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({ appname: 'foo' })    // Mock options passed in
        .withPrompts({ gituser: 'sipmann' }); // Mock the prompt answers
})

describe('generator-tests', function () {
    it('generates a project with require.js', function () {
        assert.file(['package.json', '.babelrc', 'index.html', 'src/index.jsx']);
    });
});