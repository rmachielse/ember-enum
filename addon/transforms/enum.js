import Ember from 'ember';
import Transform from 'ember-data/transform';
import createEnumType from 'ember-enum/utils/create-enum-type';

const {
  computed,
  get,
} = Ember;

const ENUM_TYPE_MAP = {};

export default Transform.extend({
  deserialize(serialized, { options = [], defaultValue = null } = {}) {
    const EnumType = createEnumType(serialized, options, defaultValue);

    return computed({
      get() {
         return EnumType.create({ value: serialized, readOnly: true });
      },
      set(_key, value) {
        return EnumType.create({ value, readOnly: true });
      }
    });
  },

  serialize(deserialized) {
    get(deserialized, 'value') || deserialized.toString();
  }
});
