import computed from 'ember-computed';
import EnumRegistry from 'ember-enum/enum-registry';

/**
  @function computedPropertyFromEnum
  @param {Enum} enumObject
  @return {ComputedProperty}
  @public
*/
export function computedPropertyFromEnum(enumObject) {
  return computed({
    get() {
      return enumObject;
    },

    set(key, value) {
      this.propertyWillChange(key);
      enumObject.set('value', value);
      this.propertyDidChange(key);
      return enumObject;
    }
  });
}

/**
  @function enumAttr
  @param {String} name
  @param {Array} options
  @param {String} defaultValue
  @return {ComputedProperty}
  @public
*/
export default function enumAttr(name, options, defaultValue) {
  let EnumType   = EnumRegistry.enumFactoryFor(name, options, defaultValue);
  let enumObject = EnumType.create();
  return computedPropertyFromEnum(enumObject);
}
