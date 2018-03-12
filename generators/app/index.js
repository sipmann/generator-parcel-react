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
        }])
        .then(answers => {
            this.appname = answers.name;
            this.gituser = answers.gituser;
        });
    }

    install() {
        this.npmInstall(['react', 'react-dom']);
        this.npmInstall(['parcel-bundler', 'babel-preset-env', 'babel-preset-react'], { 'dev': true });
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('index.html'),
            { appname: this.appname }
        );
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            { appname: this.appname, gituser: this.gituser }
        );
        this.fs.copyTpl(
            this.templatePath('index.jsx'),
            this.destinationPath('src/index.jsx')
        );
        this.fs.write('.babelrc', '{\n'+
            '   "presets": ["env", "react"]\n'+
            '}');
    }
};