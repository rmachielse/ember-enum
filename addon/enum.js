import Ember from 'ember';

const { on, observer, computed: { equal } } = Ember;

export default Ember.Object.extend({
  options: [],

  value: null,

  _defineBooleanMethods: on('init', observer('options.[]', function() {
    this.get('options').forEach((option) => {
      this.set(`is${option.camelize().capitalize()}`, equal('value', option));
    });
  }))
});
