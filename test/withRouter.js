const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('generator with router', function () {
    beforeEach(function () {
        // The object returned acts like a promise, so return it to wait until the process is done
        return helpers.run(path.join(__dirname, '../generators/app'))
            .withOptions({ appname: 'foo' })    // Mock options passed in
            .withPrompts({ gituser: 'sipmann', extras: ['React Router'] }); // Mock the prompt answers
    });
        
    it('generates a project with the basic files', () => {
        assert.file(['package.json', '.babelrc', 'index.html', 'src/index.jsx']);
    });

    it('should have a react router link and deps', () => {
        assert.jsonFileContent('package.json', {"name": "foo"});
        assert.fileContent('src/index.jsx', '<Router>');
    });
});
