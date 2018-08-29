const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('generator with typescript', function () {
    beforeEach(function () {
        // The object returned acts like a promise, so return it to wait until the process is done
        return helpers.run(path.join(__dirname, '../generators/app'))
            .withOptions({ appname: 'foo' })    // Mock options passed in
            .withPrompts({ gituser: 'sipmann', extras: ['Typescript'] }); // Mock the prompt answers
    });
        
    it('generates a project with .tsx file instead of .jsx', () => {
        assert.file(['package.json', '.babelrc', 'index.html', 'src/index.tsx']);
    });

    it('should have a ts link and deps', () => {
        assert.jsonFileContent('package.json', {
            "name": "foo", 
            "devDependencies": {
                "@types/react": /(.*)/,
                "@types/react-dom": /(.*)/,
            }
        });
        assert.noFileContent('src/index.tsx', 'app.scss');
    });
});
