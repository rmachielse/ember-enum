import Ember from 'ember';

const { isNone } = Ember;

// TODO: use Ember container to register and lookup Enum definitions
// registration should be done at initialization time.
const ENUM_TYPE_MAP = {};

const EnumRegistry = {
  /**
    @method lookup
    @param {String} name the name to register the enum
    @return {Class} EnumType registered for name
    @public
  */
  lookup(name) {
    return ENUM_TYPE_MAP[name];
  },

  /**
    @method lookupByGeneratedName
    @param {Array} options
    @param {String} defaultValue
    @return {Class} EnumType registered for generated name
    @public
  */
  lookupByGeneratedName(options, defaultValue) {
    let name = this._generateName(options, defaultValue);
    return this.lookup(name);
  },

  /**
    @method register
    @param {String} name the name to register the enum
    @param {Class} EnumType The EnumType class that you want to register under the name
    @return {Class} EnumType registered for name
    @public
  */
  register(name, EnumType) {
    if (arguments.length === 1 || isNone(name)) {
      EnumType = name;
      let { options, defaultValue } = EnumType.create().getProperties('options', 'defaultValue');
      name = this._generateName(options, defaultValue);
    }

    if (ENUM_TYPE_MAP[name]) {
      throw new Error(`Enum Type with name ${name} already exists.`);
    }

    ENUM_TYPE_MAP[name] = EnumType;
    return ENUM_TYPE_MAP[name];
  },

  /**
    returns a cache key for a generated EnumType. This is used in conjunction
    with ENUM_TYPE_MAP to ensure we are reducing unnecessary class definition
    at runtime, as it is much slower than object creation.

    @method _generateName
    @param {Array} options array of possible values for the EnumType
    @param {String} defaultValue default value for the EnumType
    @return {String} EnumType name that functions as a cache key. Cache key is
      option names joined by "-", suffixed with "-default:${defaultValue}".
    @private
  */
  _generateName(options, defaultValue) {
    let flattenedStringOptions = options.join('-');
    return `${flattenedStringOptions}-default:${defaultValue}`;
  }
};

export default EnumRegistry;
