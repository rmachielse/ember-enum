import Ember from 'ember';

const {
  Object: EmberObject,
  A,
  assert,
  computed,
  get,
  set
} = Ember;

const VALUE_READ_ONLY = `This Enum is read only. You cannot change the value`;
const INVALID_VALUE = `The value of this enum can only be one of the following:`;

/**
  @class Enum
  @extends Ember.Object
  @public
*/
const Enum = EmberObject.extend({
  /**
    @property readOnly
    @type Boolean
    @public
  */
  readOnly: false,

  /**
    @property options
    @type Array
    @public
  */
  options: computed(function() {
    return A();
  }),

  /**
    @property defaultValue
    @type String
    @public
  */
  defaultValue: computed('_defaultValue', {
    get() {
      return get(this, '_defaultValue') || get(this, 'options')[0];
    },

    set(_key, value) {
      set(this, '_defaultValue', value);
      return value;
    }
  }),

  /**
    @property value
    @type String
    @public
  */
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

  /**
    @property _defaultValue
    @type String
    @private
  */
  _defaultValue: '',

  /**
    @property _value
    @type String
    @private
  */
  _value: '',

  /**
    @method toString
    @public
  */
  toString() {
    return this.get('value');
  },

  /**
    @method isValidOption
    @public
  */
  isValidOption(value) {
    return get(this, 'options').includes(value);
  },

  /**
    @method _assertValidValue
    @private
  */
  _assertValidValue(value) {
    let isValid = this.isValidOption(value);
    if (isValid) {
      return;
    }
    let errorMsg = `ENUM ERROR: ${INVALID_VALUE} `;
    errorMsg += get(this, 'options').join(', ');
    assert(errorMsg, isValid);
  }
});

export default Enum;
