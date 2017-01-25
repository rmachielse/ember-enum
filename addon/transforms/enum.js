import Ember from 'ember';
import Transform from 'ember-data/transform';
import EnumRegistry from 'ember-enum/enum-registry';
import { ERROR_MESSAGES } from 'ember-enum/enum';

const { warn, get } = Ember;

function warnIncorrectValue(value, options) {
  let errorMsg = `ENUM WARN: Server returned an invalid
  value for the enum: ${value}. ${ERROR_MESSAGES.INVALID_VALUE}`;
  errorMsg += options.join(', ');
  warn(errorMsg, false, {
    id: 'Ember-Enum.warn-incorrect-server-value',
    url: 'https://github.com/rmachielse/ember-enum'
  });
}

/**
  @public
*/
export default Transform.extend({
  /**
    @method deserialize
    @param serialized
    @return {ComputedProperty} computed property should return an Enum Type instance
    @override
    @public
  */
  deserialize(serialized, { name, options, defaultValue }) {
    let EnumType   = EnumRegistry.enumFactoryFor(name, options, defaultValue);
    let enumObject = EnumType.create();
    let value      = serialized;

    options = get(enumObject, 'options');
    defaultValue = get(enumObject, 'defaultValue');

    if (!enumObject.isValidOption(value)) {
      warnIncorrectValue(serialized, options);
      value = defaultValue || options[0];
    }

    enumObject.set('value', value);

    return enumObject;
  },

  /**
    @method serialize
    @param deserialized
    @override
    @public
  */
  serialize(deserialized) {
    if (deserialized) {
      return deserialized.serialize();
    }
  }
});
