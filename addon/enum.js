import Ember from 'ember';

const { Object: EmberObject, String: { camelize, capitalize }, on, observer, computed: { equal } } = Ember;

export default EmberObject.extend({
  options: [],

  value: null,

  _defineBooleanMethods: on('init', observer('options.[]', function() {
    this.get('options').forEach((option) => {
      this.set(`is${capitalize(camelize(option))}`, equal('value', option));
    });
  })),

  toString() {
    return this.get('value');
  }
});
