# Ember Enum

[![Build Status](https://travis-ci.org/rmachielse/ember-enum.svg?branch=master)](https://travis-ci.org/rmachielse/ember-enum)

This addon provides a very simple abstraction to use enum attributes with ember data.

## Installation

```
ember install ember-enum
```

## Usage

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

The value from the json response is expected to be a string.
Now you can use the attribute in templates:

```handlebars
{{model.status.value}}
```

You can also use boolean methods to check if the enum has a certain value:

```handlebars
{{#if model.status.isStarted}}
  Started!
{{/if}}
```

You can use a select element as follow:

```handlebars
{{view 'select' content=model.status.options value=model.status.value}}
```

## Limitations

This project only works with ember-data 2.5 and higher.

## License

This project is released under the [MIT License](LICENSE.md).
