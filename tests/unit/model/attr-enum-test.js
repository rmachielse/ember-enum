import Enum from 'ember-enum/enum';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('party-person', 'Unit | Attr | enum', {
  needs: ['transform:enum']
});

test('enum attr with options', function(assert) {
  let record = this.subject();
  let programmerEnum = record.get('programmerType');

  assert.ok(programmerEnum instanceof Enum, 'is an instance of Enum');
  assert.equal(programmerEnum.get('value'), 'ninja', 'defaults to first option');
});

test('enum attr passing in a value', function(assert) {
  let record = this.subject({ invitationStatus: 'rejected' });
  let statusEnum = record.get('invitationStatus');

  assert.ok(statusEnum instanceof Enum, 'is an instance of Enum');
  assert.equal(record.get('invitationStatus.value'), 'rejected', 'can pass in value to create');
});

test('setting the enum attr value preserves the Enum Data Type', function(assert) {
  let record = this.subject();

  assert.equal(record.get('programmerType.value'), 'ninja', 'defaults to first option');

  record.set('programmerType', 'brogrammer');
  let programmerEnum = record.get('programmerType');

  assert.ok(programmerEnum instanceof Enum, 'is an instance of Enum');
  assert.equal(programmerEnum.get('value'), 'brogrammer', 'setting the Enum to a string preserves the Enum Data Type');
});

test('enum attr with options and defaultValue', function(assert) {
  let record = this.subject();
  let statusEnum = record.get('invitationStatus');

  assert.ok(statusEnum instanceof Enum, 'is an instance of Enum');
  assert.equal(record.get('invitationStatus.value'), 'pending', 'defaults to defaultValue');
});

test('enum attr with a registered name', function(assert) {
  let record = this.subject();
  let coolFactorEnum = record.get('coolFactor');

  assert.ok(coolFactorEnum instanceof Enum, 'is an instance of Enum');
  assert.equal(record.get('coolFactor.value'), 'nerd');
});
