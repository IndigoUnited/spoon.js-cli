'use strict';

var d         = require('dejavu'),
    fs        = require('fs'),
    doT       = require('dot'),
    Engine    = require('./Engine'),
    isProject = require('./util/isProject')
;

// keep spaces and line changes in templates
doT.templateSettings.strip = false;

var BaseModule = d.AbstractClass.declare({
    $name: 'BaseModule',

    _engine: null,
    __templateCache: {},

    initialize: function (engine) {
        // check if the engine is correct
        if (!d.instanceOf(engine, Engine)) {
            throw new Error('Module \'' + this.$name + '\' was not initialized correctly');
        }

        this._engine = engine;
    },

    $abstracts: {
        /* Example implementation:
        return {
            {
                'something': {
                    description: 'Do something and what not. Note that the module must have a "something" public method'
                    options: [
                        ['-s, --some-option', 'The option description. Note that is can have a optional arg', 'the default value for arg'],
                        ['-o, --other-option', 'This option does not have an arg'],
                    ]
                },
                'else <arg>': {
                    description: 'Do something and what not. Note that the module must have a "something" public method. All the arguments will be passed to the handler'
                }
            }
        };
        */
        getCommands: function () {}
    },

    _renderTemplate: function (filename, $args) {
        $args = $args || {};

        var tmpl = this.__getTemplate(filename);

        return tmpl($args);
    },

    __getTemplate: function (filename) {
        var tmplPath;

        // find template real path
        try {
            tmplPath = fs.realpathSync(filename);
        } catch (e) {
            throw new Error('Couldn\'t find template file "' + filename + '"');
        }

        // if template hasn't been compiled yet, compile and cache it
        if (!this.__templateCache[tmplPath]) {
            this.__templateCache[tmplPath] = doT.template(fs.readFileSync(tmplPath));
        }

        return this.__templateCache[tmplPath];
    },

    _assertProject: function (dir) {
        if (!isProject(dir)) {
            this._printError((dir || process.cwd()) + ' doesn\'t look like a spoon project.', 1);
        }
    },

    _printError: function (err, code) {
        console.error(err.error);
        if (code != null) {
            process.exit(code);
        }
    },

    _fileExists: function (path) {
        try {
            return !!fs.statSync(path);
        } catch (e) {
            return e.code !== 'ENOENT';
        }
    }
});

module.exports = BaseModule;
