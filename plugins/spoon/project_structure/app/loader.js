/*global requirejs*/

requirejs.config({
    baseUrl: '/dev/src',
    paths: {
        'mout': '../bower_components/mout/src',
        'events-emitter': '../bower_components/events-emitter/src',
        'address': '../bower_components/address/src',
        'text': '../bower_components/requirejs-text/text',
        'json': '../bower_components/requirejs-plugins/src/json',
        'has': '../bower_components/has/has',
{{paths}}
    },
    shim: {
{{shim}}
    },
    map: {
        '*': {
            // Spoon
            'spoon': '../bower_components/spoonjs/src/index',

            // Spoon aliases
            'spoon/Controller': '../bower_components/spoonjs/src/core/Controller',
            'spoon/View': '../bower_components/spoonjs/src/core/View',
            'spoon/Joint': '../bower_components/spoonjs/src/core/Joint',

            // Spoon services
            'services/broadcaster': '../bower_components/spoonjs/src/core/Broadcaster/BroadcasterFactory',
            'services/address': '../bower_components/spoonjs/src/core/Address/AddressFactory',
            'services/state': '../bower_components/spoonjs/src/core/StateRegistry/StateRegistryFactory'
        }
    },
    packages: [
        // CSS plugin
        {
            name: 'css',
            location: '../bower_components/require-css',
            main: 'css'
        },
        // App config (defaults to dev but changes during build)
        {
            name: 'app-config',
            location: '../app/config',
            main: 'config_dev'
        }
    ]
});
