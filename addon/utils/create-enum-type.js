import Ember from 'ember';
import Enum from 'ember-enum/enum';
import EnumRegistry from 'ember-enum/enum-registry';

const {
  assert,
  computed,
  isArray
} = Ember;

const ENUM_OPTIONS_MUST_BE_DEFINED = `ENUM ERROR: when using the enum data type,
you must define the 'options' array in the options object passed to
ember-data's 'attr' function.`;

/**
  Generates the class (EnumType) based on the options and default value passed.

  @method _defineEnumType
  @param {String} value current value of the EnumType
  @param {Array} options array of possible values for the EnumType
  @param {String} defaultValue default value for the EnumType
  @return {Class} Class definition for EnumType
  @private
*/
function _defineEnumType(value, options, defaultValue, enumTypeName) {
  assert(ENUM_OPTIONS_MUST_BE_DEFINED, isArray(options));

  let EnumType = Enum.extend({
    defaultValue: defaultValue || options[0],
    options: computed(function() {
      return options;
    }),
    value: value || defaultValue || options[0]
  });
  return EnumRegistry.register(enumTypeName, EnumType);
}

/**
  Decides on and uses the correct lookup to use on the Enum Registry.

  @method _lookupEnumType
  @param {Array} options array of possible values for the EnumType
  @param {String} defaultValue default value for the EnumType
  @param {string} enumTypeName name of EnumType
  @return {Class} Class definition for EnumType
  @private
*/
function _lookupEnumType(options, defaultValue, enumTypeName) {
  if (enumTypeName) {
    return EnumRegistry.lookup(enumTypeName);
  } else {
    return EnumRegistry.lookupByGeneratedName(options, defaultValue);
  }
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
  @param {string} enumTypeName name of EnumType
  @return {Class} Class definition for EnumType
  @public
*/
function createEnumType(value, options, defaultValue, enumTypeName) {
  let EnumType = _lookupEnumType(options, defaultValue, enumTypeName);

  if (EnumType) {
    return EnumType;
  }

  return _defineEnumType(value, options, defaultValue, enumTypeName);
}

export { createEnumType };

export default createEnumType;
