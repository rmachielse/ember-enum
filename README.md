# Ember Enum

[![Build Status](https://travis-ci.org/rmachielse/ember-enum.svg?branch=master)](https://travis-ci.org/rmachielse/ember-enum)
[![Ember Observer Score](https://emberobserver.com/badges/ember-enum.svg)](https://emberobserver.com/addons/ember-enum)

This addon provides a very simple abstraction to use enum attributes with ember data.

## Installation

```
ember install ember-enum
```

## Definition

You can define an enum attribute as follows:

```javascript
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  status: attr('enum', {
    options: [
      'started',
      'stopped'
    ],
    defaultValue: 'started'
  })
});
```
### options

#### `options` *Required*

An array of strings that should represent the different allowed values of the
enum.

#### `defaultValue` *Optional*

If not specified, and `value` is also undefined, then the value will default to
the first option specified. This should also be one of the entries in the
`options` array.

#### `name` *Optional*

This is the name of your enum. `name` will be generated for you if not provided
and is currently used mostly for caching Enum Type Definitions.

**Experimental**

If you define your Enum Types elsewhere though and then register them to the
enum registry, you don't need to define anything else other than the name and
the enum type definition will be handled for you. This also allows for much more
complex logic around rendering by overwriting `toString` and other extensions.

```javascript
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Enum from 'ember-enum/enum';
import EnumRegistry from 'ember-enum/enum-registry';

const EngineStateEnum = Enum.extend({
  options: [
    'started',
    'stopped'
  ],

  defaultValue: 'stopped',

  toString() {
    return this.get('isStarted') ? 'Hear that baby purr!' : this.get('value');
  }
});

// note that this is not done for you automatically *yet*
EnumRegistry.register('engineState', EngineStateEnum);

const Car = Model.extend({
  status: attr('enum', { name: 'engineState' })
});

let car = store.createRecord({ status: 'started' });
car.toString(); // => 'Hear that baby purr!'
```

## Usage

The value from the json response is expected to be a string that matches
one of the entries specified in the `options` array.

#### Records

When mutating records, you should set using a string of one of the specified
options.

```javascript
// good
model.set('status', 'stopped');

// bad
model.set('status.value', 'stopped');
```

Internally setting the attribute to a string will be handled by a setter and
correctly notify property changes. If you mutate `enum.value`, it will not allow
Ember Data to manage dirty state.

**Boolean Properties**

Computed properties will be defined on your enum based on the options specified.
by default, it will add the prefix `is` to your option and camelize it.

```javascript
model.set('status', 'stopped');
model.get('status.isStopped'); // true
model.get('status.isStarted'); // false
```

#### Templates

Now you can use the attribute in templates:

```handlebars
{{! good }}
{{model.status}}

{{! bad }}
{{model.status.value}}
```

You can also use boolean methods to check if the enum has a certain value:

```handlebars
{{#if model.status.isStarted}}
  Started!
{{/if}}
```

If you want to compare enum values as strings, this is the one time you will opt
for the `value` property. **Otherwise it should be avoided.** We want to reserve
`toString` to render the value, so that any necessary transformations to the
value can be made as needed before rendering.

```handlebars
{{#if (eq model.status.value model2.status.value)}}
  Started!
{{/if}}
```

You can use a select element like this:

```handlebars
<select value={{model.status}} onchange={{action (mut model.status) value="target.value"}}>
  {{#each model.status.options as |option|}}
    <option value={{option}}>{{option}}</option>
  {{/each}}
</select>
```

## Limitations

This project only works with ember-data 2.5 and higher.

## License

This project is released under the [MIT License](LICENSE.md).
