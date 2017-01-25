import run from 'ember-runloop';
import computed from 'ember-computed';
import EnumRegistry from 'ember-enum/enum-registry';

// exactly the same as attr with changes made to support complex types
// https://github.com/emberjs/data/blob/v2.12.0-beta.1/addon/attr.js
// changes marked with "DATA: changed"
function hasValue(record, key) {
  return key in record._attributes ||
         key in record._inFlightAttributes ||
         key in record._data;
}

function getValue(record, key) {
  if (key in record._attributes) {
    return record._attributes[key];
  } else if (key in record._inFlightAttributes) {
    return record._inFlightAttributes[key];
  } else {
    return record._data[key];
  }
}

export default function enumDSAttr(name, options) {
  if (typeof name === 'object') { // DATA: changed type to name
    options = name;
    name = undefined;
  } else {
    options = options || {};
  }

  let EnumType = EnumRegistry.enumFactoryFor(name, options.options, options.defaultValue); // DATA: added

  let meta = {
    type: 'enum',
    enumType: name, // DATA: added
    isAttribute: true,
    options
  };

  return computed({
    get(key) {
      let internalModel = this._internalModel;
      if (hasValue(internalModel, key)) {
        return getValue(internalModel, key);
      } else {
        return EnumType.create(); // DATA: changed from defaultValue
      }
    },

    set(key, value) {
      let internalModel = this._internalModel;
      let oldEnum = getValue(internalModel, key); // DATA: changed
      let oldValue = oldEnum ? oldEnum.get('value') : undefined; // DATA: changed
      let originalValue;
      let newEnum; // DATA: changed

      if (value !== oldValue) {
        newEnum = EnumType.create({ value }); // DATA: added
        // Add the new value to the changed attributes hash; it will get deleted by
        // the 'didSetProperty' handler if it is no different from the original value
        internalModel._attributes[key] = newEnum; // DATA: changed from value

        if (key in internalModel._inFlightAttributes) {
          originalValue = internalModel._inFlightAttributes[key];
        } else {
          originalValue = internalModel._data[key];
        }

        run(() => {
          this._internalModel.send('didSetProperty', {
            name: key,
            oldValue: oldEnum, // DATA: changed from oldValue
            originalValue,
            value: newEnum // DATA: changed from value
          });

          if (oldEnum) {
            // DATA: added
            run.schedule(() => oldEnum.destroy());
          }
        });
      }

      return newEnum;
    }
  }).meta(meta);
}
