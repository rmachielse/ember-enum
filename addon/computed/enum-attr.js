import computed from 'ember-computed';
import EnumRegistry from 'ember-enum/enum-registry';

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

export default function enumAttr({ name, options, defaultValue }) {
  let EnumType   = EnumRegistry.enumFactoryFor(name, options, defaultValue);
  let enumObject = EnumType.create();
  return computedPropertyFromEnum(enumObject);
}
