import attr from 'ember-data/attr';

export default function enumAttr({ options = [], defaultValue = null }) {
  return attr('enum', { options, defaultValue });
}
