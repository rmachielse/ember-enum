import Ember from 'ember';
import computed from 'ember-computed';

const {
  String: { camelize, capitalize },
  Object: EmberObject,
  A,
  assert,
  get,
  set
} = Ember;

const { readOnly, equal } = computed;

/**
  Enum Data Type

  @class Enum
  @extends Ember.Object
  @public
*/
const Enum = EmberObject.extend({
  /**
    Indicates whether the Enum is readOnly and value cannot be changed.

    @property readOnly
    @type Boolean
    @public
  */
  readOnly: false,

  /**
    Array of whitelisted values. Must overwrite this when extending the class.

    @property options
    @type Array
    @required
    @readOnly
    @public
  */
  options: computed(function() {
    return A();
  }).readOnly(),

  /**
    Default value of the Enum.

    @property defaultValue
    @type String
    @readOnly
    @public
  */
  defaultValue: readOnly('options.firstObject'),

  /**
    String represenation of the Enum value.

    @property value
    @type String
    @public
  */
  value: computed({
    get() {
      return get(this, 'defaultValue');
    },

    set(_key, value) {
      assert(`ENUM ERROR: ${VALUE_READ_ONLY}`, !get(this, 'readOnly'));
      assertValidValue(get(this, 'options'), value);
      return value;
    }
  }),

  /**
    Returns whether or not the value is a valid member of the Enum.

    @method isValidOption
    @param {String} value String represenation of the Enum value.
    @return {Boolean} whether or not the value is a valid member of the Enum.
    @public
  */
  isValidOption(value) {
    return get(this, 'options').includes(value);
  },

  /**
    returns the string representation of the enum value. Can be overwritten to
    control what handlebars will render.

    @method toString
    @return {String} string representation of the enum value
    @public
  */
  toString() {
    return get(this, 'value');
  },

  /**
    returns the string representation of the enum value. Can be overwritten to
    control what is serialized to the server.

    @method serialize
    @public
  */
  serialize() {
    return get(this, 'value');
  }
});

/**
  asserts that the value is a member of the options.

  @method assertValidValue
  @param {Array} options array of possible values for the EnumType
  @param {String} value value to assert that it is a member of options
  @private
*/
function assertValidValue(options, value) {
  if (options.includes(value)) {
    return;
  }
  let errorMsg = `ENUM ERROR: ${INVALID_VALUE} `;
  errorMsg += get(this, 'options').join(', ');
  assert(errorMsg, false);
}

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
    @override
    @public
  */
  extend(...args) {
    let definition = args.pop() || {};
    let optionBooleanAttrs = defineOptionBooleanAttrs(get(definition, 'options'));
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
