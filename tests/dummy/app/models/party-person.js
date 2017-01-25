import computed from 'ember-computed';
import Model from 'ember-data/model';
import enumDSAttr  from 'ember-enum/computed/enum-ds-attr';
import 'dummy/enums/cool-factor';

export default Model.extend({
  invitationStatus: enumDSAttr({
    options: [
      'accepted',
      'rejected',
      'pending'
    ],
    defaultValue: 'pending'
  }),

  programmerType: enumDSAttr({
    options: [
      'ninja',
      'rockstar',
      'brogrammer',
      'brosephinagrammer'
    ]
  }),

  coolFactor: enumDSAttr('cool-factor'),

  amICool: computed('status', function() {
    return this.get('status.isAccepted');
  })
});
