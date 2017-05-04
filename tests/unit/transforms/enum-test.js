import Enum from 'ember-enum/enum';
import EnumRegistry from 'ember-enum/enum-registry';
import EngineState from 'dummy/enums/engine-state';
import { moduleFor, test } from 'ember-qunit';

const options = ['stopped', 'started'];

moduleFor('transform:enum', 'Unit | Transform | enum');

test('#deserialize with options returns a computed property that returns an Enum', function(assert) {
  let transform = this.subject();
  let enumAttr = transform.deserialize(undefined, { options });
  let enumWithValue = transform.deserialize('started', { options });

  assert.ok(enumAttr instanceof Enum, 'computed property returns an Enum');
  assert.equal(enumAttr.get('value'), 'stopped', 'defaultValue is first option');

  assert.ok(enumWithValue instanceof Enum, 'computed property returns an Enum');
  assert.equal(enumWithValue.get('value'), 'started', 'defaultValue is first option');
});

test('#deserialize with options and defaultValue returns a computed property that returns an Enum', function(assert) {
  let transform = this.subject();
  let defaultValue = 'started';
  let enumAttr = transform.deserialize(undefined, { options, defaultValue });

  assert.ok(enumAttr instanceof Enum, 'computed property returns an Enum');
  assert.equal(enumAttr.get('value'), 'started', 'value is equal to defaultValue');
});

test('#deserialize with name', function(assert) {
  let transform = this.subject();
  let name = 'engine-state';
  EnumRegistry.clear();
  EnumRegistry.register(name, EngineState);

  let enumAttr = transform.deserialize(undefined, { name });

  assert.ok(enumAttr instanceof EngineState, 'computed property returns an Enum');
  assert.equal(enumAttr.get('value'), 'stopped', 'defaultValue is equal to defaultValue');
  EnumRegistry.clear();
});

test('#serialize returns the value of the enum', function(assert) {
  let transform = this.subject();
  let enumObject = EngineState.create();

  assert.equal(transform.serialize(enumObject), enumObject.get('value'));
});
