import Transform from 'ember-data/transform';
import Enum from 'ember-enum/enum';

export default Transform.extend({
  deserialize(serialized, attributeMeta) {
    return Enum.create({
      value: serialized || attributeMeta.defaultValue,
      options: attributeMeta.options
    });
  },

  serialize(deserialized) {
    if (deserialized) {
      return deserialized.get('value');
    }
  }
});
