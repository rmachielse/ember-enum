import Model from 'ember-data/model';
import enumAttr from 'ember-enum/utils/enum';

export default Model.extend({
  status: enumAttr({
    options: [
      'pending',
      'accepted',
      'rejected'
    ],
    defaultValue: 'pending'
  })
});
