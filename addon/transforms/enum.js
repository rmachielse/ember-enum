import Transform from 'ember-data/transform';
import Enum from 'ember-enum/enum';
import Ember from 'ember';

const { typeOf } = Ember;

export default Transform.extend({
  deserialize(serialized, { options = [], defaultValue = null } = {}) {
    return Enum.create({
      value: serialized || defaultValue,
      options
    });
  },

  serialize(deserialized) {
    if (typeOf(deserialized) === 'instance') {
      return deserialized.get('value');
    } else {
      return deserialized;
    }
  }
});
