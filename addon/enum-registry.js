import Ember from 'ember';
import computed from 'ember-computed';
import Enum from 'ember-enum/enum';

const {
  Error: EmberError,
  assert,
  isArray,
  isPresent,
  isNone
} = Ember;

// TODO: use Ember container to register and lookup Enum definitions
// registration should be done at initialization time.
let ENUM_TYPE_MAP = {};

const EnumRegistry = {
  /**
    Injected by the initializer. Used to lookup explicitly defined enum classes

    @property container
    @private
  */
  container: undefined,

  /**
   lookup the Enum Type class

    @method lookup
    @param {String} name name of Enum Type
    @return {Class} Enum Type registered for name
    @public
  */
  lookup(name) {
    return ENUM_TYPE_MAP[name];
  },

  /**
    Register the Enum Type on the Enum Type Map for use across the
    application.

    @method register
    @param {String} name the name to register the enum
    @param {Class} EnumType The EnumType class that you want to register under the name
    @return {Class} EnumType registered for name
    @public
  */
  register(name, EnumType) {
    if (isNone(name)) {
      throwEnumError(UNDEFINED_NAME);
    }

    if (isNone(EnumType)) {
      throwEnumError(UNDEFINED_TYPE);
    }

    if (ENUM_TYPE_MAP[name]) {
      throwEnumError(`Enum Type with name ${name} already exists.`);
    }

    return ENUM_TYPE_MAP[name] = EnumType;
  },

  /**
    Clear all registrations

    @method clear
    @public
  */
  clear() {
    ENUM_TYPE_MAP = {};
  },

  /**
    Public Interface looking up an Enum Type Class and generating one if it
    does not exist.

    This method should only be used as a building block for an abstraction,
    where you want to generate dynamic types without explicit definition.
    Examples may be a computed property or transform.

    Opt for defining the Enum Types and using `register` and `lookup` where
    possible.

    @method enumFactoryFor
    @param {String} name name of Enum Type you are looking up
    @param {Array} options array of possible values for the Enum Type
    @param {String} defaultValue default value for the Enum Type
    @return {Class} Class definition for Enum Type
    @public
  */
  enumFactoryFor(name, options, defaultValue) {
    let EnumType;
    let needsVerification = isPresent(name) && isPresent(options);

    if (!name) {
      name = this._generateName(options, defaultValue);
    }

    EnumType = this.lookup(name);

    if (EnumType) {
      if (needsVerification) {
        this._verifyEnumSignature(EnumType, options, defaultValue);
      }
      return EnumType;
    }
    EnumType = this._generateEnumFactory(options, defaultValue);
    return this.register(name, EnumType);
  },

  /**
    Generates the Enum Type class based on the options and default value passed.

    @method _generateEnumFactory
    @param {Array} options array of possible values for the EnumType
    @param {String} defaultValue default value for the EnumType
    @return {Class} Class definition for EnumType
    @private
  */
  _generateEnumFactory(options, defaultValue) {
    assert(ENUM_OPTIONS_MUST_BE_DEFINED, isArray(options));
    defaultValue = defaultValue || options[0];

    return Enum.extend({
      defaultValue: computed(function() {
        return defaultValue;
      }).readOnly(),
      options: computed(function() {
        return options;
      }).readOnly()
    });
  },

  /**
    @method _verifyEnumSignature
    @param {Class} Class definition for Enum Type
    @param {Array} options array of possible values for the EnumType
    @param {String} defaultValue default value for the EnumType
    @private
  */
  _verifyEnumSignature(EnumType, options, defaultValue) {
    let attrs = EnumType.create().getProperties('options', 'defaultValue');
    let enumAName = this._generateName(attrs.options, attrs.defaultValue);
    let enumBName = this._generateName(options, defaultValue);
    assert(ENUM_NAME_MISMATCH, enumAName === enumBName);
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
    assert(ENUM_OPTIONS_MUST_BE_DEFINED, isArray(options));
    let flattenedStringOptions = options.join('-');
    return `${flattenedStringOptions}-default:${defaultValue}`;
  }
};

function throwEnumError(msg) {
  throw new EmberError(`ENUM ERROR: ${msg}`);
}

const ENUM_OPTIONS_MUST_BE_DEFINED = `when using the Enum data type,
you must define the 'options' array.`;

const ENUM_NAME_MISMATCH = `You have already defined an Enum Type with the same
name that has different options or defaultValue. Please choose a different name
or allow the name to be generated.`;

const UNDEFINED_NAME = `cannot register an Enum Type with an undefined name.`;
const UNDEFINED_TYPE = `cannot register an Enum Type with only a name.`;

export default EnumRegistry;
