import computed from 'ember-computed';
import createEnumType from 'ember-enum/utils/create-enum-type';

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
  let EnumType   = createEnumType(options, defaultValue, name);
  let enumObject = EnumType.create();
  return computedPropertyFromEnum(enumObject);
}
