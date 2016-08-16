require.config({
    deps: [
        'main'
    ],
    paths: {
        backbone: 'bower_components/backbone/backbone',
        jquery: 'bower_components/jquery/dist/jquery',
        underscore: 'bower_components/underscore/underscore',
        marionette: 'bower_components/marionette/lib/backbone.marionette',
        app: 'app'
    },
    shim: {
        Backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'backbone'
        },
        Marionette: {
            deps: ['backbone', 'underscore'],
            exports: 'marionette'
        },
        underscore: {
            exports: '_'
        }
    }
});