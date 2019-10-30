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
                }
            ]
        }])
        .then(answers => {
            this.appname = answers.name;
            this.gituser = answers.gituser;
            
            this.reactRouter = false;
            this.nodeSass = false;

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
                });
            }
        });
    }

    install() {
        this.npmInstall(['react', 'react-dom']);
        //TODO refactor to a better (prettier) way
        if (this.reactRouter) {
            this.npmInstall(['react-router-dom']);
        }
        if (this.nodeSass) {
            this.npmInstall(['node-sass'], { 'dev': true });
        }
        if (this.typescript) {
            //this.npmInstall(['@types/react','@types/react-dom'], { 'dev': true });
        }
        if (this.redux) {
            this.npmInstall(['redux', 'react-redux', 'redux-thunk']);
        }
        this.npmInstall(['parcel-bundler', 'babel-preset-env', 'babel-preset-react', ' babel-plugin-transform-object-rest-spread'], { 'dev': true });
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

        this.fs.write('.babelrc', '{\n'+
            '    "plugins": ["transform-object-rest-spread"],\n'+
            '    "presets": ["env", "react"]\n'+
            '}');
    }
};
