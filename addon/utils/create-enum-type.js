import Ember from 'ember';
import Enum from 'ember-enum/enum';

const {
  String: { camelize, capitalize },
  computed: { equal },
  computed,
  set
} = Ember;

const ENUM_TYPE_MAP = {};

/**
  returns a cache key for a generated EnumType. This is used in conjunction
  with ENUM_TYPE_MAP to ensure we are reducing unnecessary class definition
  at runtime, as it is much slower than object creation.

  @method generateEnumTypeCacheKey
  @param {Array} options array of possible values for the EnumType
  @param {String} defaultValue default value for the EnumType
  @return {String} Cache Key for generating Enum Types. Cache key is essentially
    option names separated by "-" and then "default:" with the default value.
  @private
*/
function generateEnumTypeCacheKey(options, defaultValue) {
  let flattenedStringOptions = options.join('-');
  return `${flattenedStringOptions}-default:${defaultValue}`;
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
function defineOptionBooleanAttrs(options) {
  return options.reduce((attrs, option) => {
    let enumOptionBooleanPropertyName = `is${capitalize(camelize(option))}`;
    set(attrs, enumOptionBooleanPropertyName, equal('value', option));
    return attrs;
  }, {});
}

/**
  Generates the class (EnumType) based on the options and default value passed.

  @method _defineEnumType
  @param {String} value current value of the EnumType
  @param {Array} options array of possible values for the EnumType
  @param {String} defaultValue default value for the EnumType
  @return {Class} Class definition for EnumType
  @private
*/
function _defineEnumType(value, options, defaultValue) {
  let booleanAttrs = defineOptionBooleanAttrs(options);

  return Enum.extend(Object.assign({
    defaultValue: defaultValue || options[0],
    options: computed(function() {
      return options;
    }),
    value: value || defaultValue || options[0]
  }, booleanAttrs));
}

/**
  Public Interface to defining an EnumType that is cached internally.

  This method should only be used as a building block for an abstraction, such
  as a DS.Transform where you cannot easily cache the EnumType definition. Opt
  for defining EnumTypes yourself where possible.

  @method createEnumType
  @param {String} value current value of the EnumType
  @param {Array} options array of possible values for the EnumType
  @param {String} defaultValue default value for the EnumType
  @return {Class} Class definition for EnumType
  @public
*/
function createEnumType(value, options, defaultValue) {
  let cacheKey = generateEnumTypeCacheKey(options, defaultValue);
  if (!ENUM_TYPE_MAP[cacheKey]) {
    ENUM_TYPE_MAP[cacheKey] = _defineEnumType(value, options, defaultValue);
  }
  return ENUM_TYPE_MAP[cacheKey];
}

export { createEnumType, ENUM_TYPE_MAP };

export default createEnumType;
