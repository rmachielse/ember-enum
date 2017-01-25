import EnumRegistry from 'ember-enum/enum-registry';

export default {
  name: 'ember-enum',
  initialize(registry) {
    registry.registerOptionsForType('enum', { singleton: false });
    // HACK: probably a better way to do this
    EnumRegistry.container = registry;
  }
};
