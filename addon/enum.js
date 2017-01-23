import Ember from 'ember';

const {
  String: { camelize, capitalize },
  computed: { equal },
  Object: EmberObject,
  A,
  assert,
  computed,
  get,
  set
} = Ember;

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
    @required
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
    @default null
    @private
  */
  _defaultValue: null,

  /**
    @property _value
    @type String
    @default null
    @private
  */
  _value: null,

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

/**
  Defines attributes that offer a nice DSL for boolean checking of an EnumType
  value. A sorts of on-the-fly mixin gnerator

  @method defineOptionBooleanAttrs
  @param {Array} options array of possible values for the EnumType
  @return {Object} Object with computed properties to mixin when extending the
    Enum class.
  @private
*/
function defineOptionBooleanAttrs(options = []) {
  return options.reduce((attrs, option) => {
    let enumOptionBooleanPropertyName = `is${capitalize(camelize(option))}`;
    set(attrs, enumOptionBooleanPropertyName, equal('value', option));
    return attrs;
  }, {});
}

Enum.reopenClass({
  /**
    alters the extend method to define the boolean computed properties based on
    the options. This requires any mixins to be used first and the normal class
    definition passed last.
    @method extend
    @public
  */
  extend(...args) {
    let definition = args.pop() || {};
    let optionBooleanAttrs = defineOptionBooleanAttrs(definition.options);
    definition = Object.assign({}, optionBooleanAttrs, definition);
    args.push(definition);
    return this._super(...args);
  }
});

const VALUE_READ_ONLY = `This Enum is read only. You cannot change the value`;

const INVALID_VALUE   = `The value of this enum can only be one of the following:`;

const ERROR_MESSAGES  = {
  INVALID_VALUE,
  VALUE_READ_ONLY
};

export { ERROR_MESSAGES };
export default Enum;
