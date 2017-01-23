import Ember from 'ember';
import computed from 'ember-computed';
import Enum from 'ember-enum/enum';

const {
  Error: EmberError,
  assert,
  isArray,
  isNone
} = Ember;

const ENUM_OPTIONS_MUST_BE_DEFINED = `ENUM ERROR: when using the enum data type,
you must define the 'options' array.`;

// TODO: use Ember container to register and lookup Enum definitions
// registration should be done at initialization time.
const ENUM_TYPE_MAP = {};

const EnumRegistry = {
  /**
    @method lookup
    @param {String} enumTypeName name of EnumType
    @return {Class} EnumType registered for name
    @public
  */
  lookup(name) {
    return ENUM_TYPE_MAP[name];
  },

  /**
    @method register
    @param {String} name the name to register the enum
    @param {Class} EnumType The EnumType class that you want to register under the name
    @return {Class} EnumType registered for name
    @public
  */
  register(name, EnumType) {
    if (arguments.length === 1 || isNone(name)) {
      EnumType = name;
      let { options, defaultValue } = EnumType.create().getProperties('options', 'defaultValue');
      name = this._generateName(options, defaultValue);
    }

    if (ENUM_TYPE_MAP[name]) {
      throw new EmberError(`Enum Type with name ${name} already exists.`);
    }

    ENUM_TYPE_MAP[name] = EnumType;
    return ENUM_TYPE_MAP[name];
  },

  /**
    Generates the class (EnumType) based on the options and default value passed.

    @method generateEnumType
    @param {String} value current value of the EnumType
    @param {Array} options array of possible values for the EnumType
    @param {String} defaultValue default value for the EnumType
    @return {Class} Class definition for EnumType
    @private
  */
  generateEnumType(options, defaultValue, enumTypeName) {
    enumTypeName = enumTypeName || this._generateName(options, defaultValue);
    let EnumType = this.lookup(enumTypeName);

    if (EnumType) {
      return EnumType;
    }

    return this.register(enumTypeName, _defineEnumType(options, defaultValue));
  },

  /**
    returns a cache key for a generated EnumType. This is used in conjunction
    with ENUM_TYPE_MAP to ensure we are reducing unnecessary class definition
    at runtime, as it is much slower than object creation.

    @method _generateName
    @param {Array} options array of possible values for the EnumType
    @param {String} defaultValue default value for the EnumType
    @return {String} EnumType name that functions as a cache key. Cache key is
      option names joined by "-", suffixed with "-default:${defaultValue}".
    @private
  */
  _generateName(options, defaultValue) {
    let flattenedStringOptions = options.join('-');
    return `${flattenedStringOptions}-default:${defaultValue}`;
  }
};

function _defineEnumType(options, defaultValue) {
  assert(ENUM_OPTIONS_MUST_BE_DEFINED, isArray(options));
  defaultValue = defaultValue || options[0];

  return Enum.extend({
    defaultValue: computed(function() {
      return defaultValue;
    }).readOnly(),
    options: computed(function() {
      return options;
    }).readOnly()
  });
}

export default EnumRegistry;
