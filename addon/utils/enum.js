import attr from 'ember-data/attr';
import Enum from '../enum';

export default ({ options = [], defaultValue = null } = {}) => {
  return attr('enum', {
    options,
    defaultValue: () => {
      return Enum.create({
        options,
        value: defaultValue
      });
    }
  });
};
