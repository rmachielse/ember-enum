import Ember from 'ember';

const {
  Object: EmberObject,
  assert,
  computed,
  get,
  set
} = Ember;

const VALUE_READ_ONLY = `This Enum is read only. You cannot change the value`,
      INVALID_VALUE = `The value of this enum can only be one of the following:`;

const Enum = EmberObject.extend({
  readOnly: false,

  _defaultValue: null,

  _value: null,

  options: computed(function() { return []; }),

  defaultValue: computed('_defaultValue', {
    get() {
      return get(this, '_defaultValue') || get(this, 'options')[0];
    }
    set(_key, value) {
      set(this, '_defaultValue', value);
      return value;
    }
  }),

  value: computed('_value', {
    get() {
      return get(this, '_value') || get(this, 'defaultValue');
    },
  
    set(_key, value) {
      assert(`ENUM ERROR: ${VALUE_READ_ONLY}`, !get(this, 'readOnly'));
      this._assertValidValue(value);
      set(this, '_value', value);
      return value;
    }
  }),

  toString() {
    return this.get('value');
  },

  isValidOption(value) {
    const options = get(this, 'options');
    return options.includes(value);
  }

  _assertValidValue(value) {
    var isValid = this.isValidOption(value);
    if (isValid) { return; }

    errorMsg = `ENUM ERROR: ${INVALID_VALUE} `;
    errorMsg += get(this, 'options').join(', ');
    assert(errorMsg, isValid);
  }
});

export default Enum;
