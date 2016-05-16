/*jshint node:true*/
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    storeConfigInMeta: false,
    sassOptions: {
      extension: 'sass'
    },
    'ember-cli-bootstrap-sassy': {
      quiet: true
    }
  });

  return app.toTree();
};
