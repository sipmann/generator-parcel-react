const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('generator with redux', function () {
    /*it('generates a project with redux dependency', () => {
        assert.file(['package.json', '.babelrc', 'index.html', 'src/index.tsx']);
    });*/

    it('should have a redux deps', () => {
        return helpers.run(path.join(__dirname, '../generators/app'))
            .withOptions({ appname: 'foo-redux' })    // Mock options passed in
            .withPrompts({ gituser: 'sipmann', extras: ['Redux'] })
            .then(function() {
                assert.jsonFileContent('package.json', {
                    "name": "foo",
                    "devDependencies": {
                        "react-redux": /(.*)/
                    }
                });
            });
    });
});
