import Enum from 'ember-enum/enum';
import EnumRegistry from 'ember-enum/enum-registry';

const EngineState = Enum.extend({
  options: ['started', 'stopped'],

  defaultValue: 'stopped',

  toString() {
    let val = this.get('value');
    return val === 'stopped' ? val : 'PEDAL TO THE METAL';
  }
});

EnumRegistry.register('engine-state', EngineState);

export default EngineState;
