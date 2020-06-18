const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('appname', { type: String, required: false });
        this.appname = this.options.appname;
    }

    prompting() {
        return this.prompt([{
            type   : 'input',
            name   : 'name',
            message: 'Your project name',
            default: this.options.appname
        }, {
            type: 'input',
            name: 'gituser',
            message: 'Your github user',
            store: true
        }, {
            type: 'checkbox',
            name: 'extras',
            message: 'Choose your extras',
            store: true,
            choices: [
                {
                    name: 'React Router'
                },
                {
                    name: 'Node sass'
                },
                {
                    name: 'Typescript'
                },
                {
                    name: 'Redux'
                },
                {
                    name: 'Jest'
                }
            ]
        }])
        .then(answers => {
            this.appname = answers.name;
            this.gituser = answers.gituser;
            
            this.reactRouter = false;
            this.nodeSass = false;
            this.jest = false;

            if (answers.extras) {
                answers.extras.forEach(el => {
                    if (el === 'React Router')
                        this.reactRouter = true;
                    else if (el === 'Node sass')
                        this.nodeSass = true;
                    else if (el === 'Typescript')
                        this.typescript = true;
                    else if (el === 'Redux')
                        this.redux = true;
                    else if (el === 'Jest')
                        this.jest = true;
                });
            }
        });
    }

    install() {
        let typescriptPackages = [];
        this.npmInstall(['react', 'react-dom']);

        //TODO refactor to a better (prettier) way
        if (this.reactRouter) {
            typescriptPackages.push('@types/react-router-dom');
            this.npmInstall(['react-router-dom']);
        }
        if (this.nodeSass) {
            this.npmInstall(['node-sass'], { 'save-dev': true });
        }
        if (this.jest) {
            typescriptPackages.push(...['@types/jest', 'ts-jest']);
            this.npmInstall(['jest', '@testing-library/react', '@testing-library/jest-dom'], { 'save-dev': true });
        }
        if (this.typescript) {
            this.npmInstall(['typescript', '@types/react','@types/react-dom', '@babel/preset-typescript', ...typescriptPackages], { 'save-dev': true });
        }
        if (this.redux) {
            this.npmInstall(['redux', 'react-redux', 'redux-thunk']);
        }
        this.npmInstall(['parcel-bundler', '@babel/preset-env', '@babel/preset-react', '@babel/plugin-proposal-object-rest-spread'], { 'save-dev': true });
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('index.html'),
            { appname: this.appname, typescript: this.typescript }
        );

        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            { appname: this.appname, gituser: this.gituser }
        );

        this.fs.copyTpl(
            this.templatePath('gitignore'),
            this.destinationPath('.gitignore'),
            { appname: this.appname, gituser: this.gituser }
        );

        let indexName = 'index.jsx';
        let storeName = 'store.jsx';
        if (this.typescript) {
            indexName = 'index.tsx';
            storeName = 'store.tsx';
            this.fs.copyTpl(
                this.templatePath('tsconfig.json'),
                this.destinationPath('tsconfig.json'), {}
            );
        }

        this.fs.copyTpl(
            this.templatePath(indexName),
            this.destinationPath(`src/${indexName}`),
            {reactRouter: this.reactRouter, nodeSass: this.nodeSass, redux: this.redux}
        );

        if (this.nodeSass)
            this.fs.copyTpl(
                this.templatePath('app.scss'),
                this.destinationPath('css/app.scss'),
                {reactRouter: this.reactRouter, nodeSass: this.nodeSass, redux: this.redux}
            );
        
        if (this.redux)
            this.fs.copyTpl(
                this.templatePath(storeName),
                this.destinationPath(`src/${storeName}`),
                {}
            );

        if (this.jest) {
            const testPkgJson = {
                scripts: {
                    test: 'jest',
                    "test:watch": "jest --watch"
                }
            };
            this.fs.extendJSON(this.destinationPath('package.json'), testPkgJson);

            this.fs.copyTpl(
                this.templatePath('index.test.tsx'),
                this.destinationPath('src/index.test.tsx')
            );

            this.fs.copyTpl(
                this.templatePath('jest.config.js'),
                this.destinationPath('jest.config.js')
            );
        }

        this.fs.write('.babelrc', '{\n'+
            '    "plugins": ["@babel/plugin-proposal-object-rest-spread"],\n'+
            '    "presets": ["@babel/env", "@babel/react", "@babel/preset-typescript"]\n'+
            '}');
    }
};
