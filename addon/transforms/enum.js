import Ember from 'ember';
import Transform from 'ember-data/transform';
import { ERROR_MESSAGES } from 'ember-enum/enum';
import createEnumType from 'ember-enum/utils/create-enum-type';

const {
  computed,
  get,
  warn
} = Ember;

const SERVER_RETURNED_INVALID_VALUE = `ENUM WARN: Server returned an invalid value for the enum.
${ERROR_MESSAGES.INVALID_VALUE}`;

function warnIncorrectValue(options) {
  let errorMsg = SERVER_RETURNED_INVALID_VALUE;
  errorMsg += options.join(', ');
  warn(errorMsg, false, {
    id: 'Ember-Enum.warn-incorrect-server-value',
    url: 'https://github.com/rmachielse/ember-enum'
  });
}

export default Transform.extend({
  deserialize(serialized, { name, options, defaultValue }) {
    let EnumType   = createEnumType(serialized, options, defaultValue, name);
    let enumObject = EnumType.create();
    let value      = serialized;

    if (!enumObject.isValidOption(value)) {
      warnIncorrectValue(serialized, options);
      value = defaultValue || options[0];
    }

    enumObject.set('value', value);

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
  },

  serialize(deserialized) {
    if (deserialized) {
      return get(deserialized, 'value');
    }
  }
});
