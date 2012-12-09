var d          = require('dejavu'),
    automaton  = require('automaton'),
    BaseModule = require('../BaseModule')
;

var Controller = d.Class.declare({
    $name: 'Controller',
    $extends: BaseModule,

    create: function (name, options) {
        this._assertProject();

        console.log(('Creating controller: ' + name).info);

        // create spoon controller by running the autofile
        // use the generator autofile or the local one if not available
        var autofile = process.cwd() + '/tasks/generators/controller_create.autofile.js';
        if (!this._fileExists(autofile)) {
            autofile = '../../plugins/spoon/controller_create.autofile';
        }

        autofile = require(autofile);
        options.name = name;
        automaton.run(autofile, options, function (err) {
            process.exit(err ? 1 : 0);
        });
    },

    getCommands: function () {
        return {
            'create <name>': {
                description: 'Create a new controller',
                options: [
                    ['-f, --force', 'Force the creation of the controller, even if the controller already exists.', false, this._parseBoolean],
                    ['-l, --location', 'Where the controller will be created. Defaults to the Application module.', process.cwd() + '/src/Application']
                ]
            }
        };
    }
});

module.exports = Controller;