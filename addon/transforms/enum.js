import Ember from 'ember';
import Transform from 'ember-data/transform';
import { ERROR_MESSAGES } from 'ember-enum/enum';
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

const SERVER_RETURNED_INVALID_VALUE = `ENUM WARN: Server returned an invalid
value for the enum. ${ERROR_MESSAGES.INVALID_VALUE}`;

function warnIncorrectValue(options) {
  errorMsg = SERVER_RETURNED_INVALID_VALUE;
  errorMsg += options.join(', ');
  Ember.warn(errorMsg, false, {
    id: 'Ember-Enum.warn-incorrect-server-value',
    url: 'https://github.com/rmachielse/ember-enum'
  });
}

export default Transform.extend({
  deserialize(serialized, { options, defaultValue }) {

    assert(ENUM_OPTIONS_MUST_BE_DEFINED, isArray(options));
    let EnumType   = createEnumType(serialized, options, defaultValue);
    let enumObject = EnumType.create();
    let value      = serialized;

    if (!enumObject.isValidOption(value)) {
      warnIncorrectValue(serialized, options);
      value = defaultValue || options[0];
    }

    enumObject.set('value', value);

    return computed({
      get() {
        return enumType;
      },

      set(key, value) {
        enumType.set('value', value);
        this.notifyPropertyChange(key);
        return enumType;
      }
    });
  },

  serialize(deserialized) {
    return get(deserialized, 'value') || deserialized.toString() || deserialized;
  }
});
