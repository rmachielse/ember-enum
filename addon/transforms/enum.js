import Ember from 'ember';
import Transform from 'ember-data/transform';
import createEnumType from 'ember-enum/utils/create-enum-type';

const {
  assert,
  computed,
  get,
  isArray
} = Ember;

const ENUM_OPTIONS_MUST_BE_DEFINED = `ENUM ERROR: when using the enum data type,
you must define the 'options' array in the options object passed to
ember-data's 'attr' function.`;

export default Transform.extend({
  deserialize(serialized, { options, defaultValue }) {

    assert(ENUM_OPTIONS_MUST_BE_DEFINED, isArray(options));
    let EnumTypeClass = createEnumType(serialized, options, defaultValue);
    let enumType = EnumTypeClass.create({ value: serialized || defaultValue });

    return computed({
      get() {
        return enumType;
      },

      set(key, value) {
        this.notifyPropertyChange(key);
        enumType.set('value', value);
        return enumType;
      }
    });
  },

  serialize(deserialized) {
    return get(deserialized, 'value') || deserialized.toString() || deserialized;
  }
});
