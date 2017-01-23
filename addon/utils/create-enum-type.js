import EnumRegistry from 'ember-enum/enum-registry';

/**
  Public Interface to defining an Enum Type implcitly.

  This method should only be used as a building block for an abstraction, such
  as a computed property where you want to generate dynamic types without
  explicit definition.

  Opt for defining the Enum Types when the scope of a use case is well
  understood or you need more fine grain control over the Enum Type.

  @method createEnumType
  @param {Array} options array of possible values for the Enum Type
  @param {String} defaultValue default value for the Enum Type
  @param {string} enumTypeName name of Enum Type
  @return {Class} Class definition for Enum Type
  @public
*/
function createEnumType(options, defaultValue, enumTypeName) {
  let EnumType = EnumRegistry.lookup(enumTypeName);

  if (EnumType) {
    return EnumType;
  }

  return EnumRegistry.generateEnumType(options, defaultValue, enumTypeName);
}

export default createEnumType;
