import Enum from 'ember-enum/enum';
import EnumRegistry from 'ember-enum/enum-registry';

const CoolFactorEnum = Enum.extend({
  options: [
    'geek',
    'nerd',
    'anonyous',
    'cool',
    'I WANT TO BE YOU'
  ],
  defaultValue: 'nerd'
});

EnumRegistry.register('cool-factor', CoolFactorEnum);

export default CoolFactorEnum;
