import Ember from 'ember';
import Enum from 'ember-enum/enum';

const {
  String: { camelize, capitalize },
  computed: { equal },
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
  var firstOption = options[0];
  var flattenedStringOptions = options.reduce((string, option, index) => {
    if (index === 0) { return string; }
    string += `-${option}`;
    return string;
  }, firstOption);
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
    var enumOptionBooleanPropertyName = `is${capitalize(camelize(option))}`;
    set(attrs, enumOptionBooleanPropertyName, equal('value', option));
    return attrs;
  }, {});
}

/**
  creates an EnumType based on options and defaultValue

  @method createEnumType
  @param {String} value current value of the EnumType
  @param {Array} options array of possible values for the EnumType
  @param {String} defaultValue default value for the EnumType
  @return {Class} Class definition for EnumType
  @private
*/
createEnumType(value, options, defaultValue) {
  const cacheKey = generateEnumTypeCacheKey(options, defaultValue);
  if (ENUM_TYPE_MAP[cacheKey]) { return ENUM_TYPE_MAP[cacheKey]; }

  const booleanAttrs = defineOptionBooleanAttrs(options);

  const EnumType = Enum.extend(Object.assign({
    defaultValue: defaultValue || options[0],
    options: computed(function() { return options; }),
    value: serialized || defaultValue || options[0]
  }, booleanAttrs);

  ENUM_TYPE_MAP[cacheKey] = EnumType;
  return EnumType;
}

export { createEnumType, ENUM_TYPE_MAP };

export default createEnumType;
