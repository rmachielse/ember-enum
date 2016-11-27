'use strict';

define('dummy/tests/app.jscs-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSCS - app.js');
  QUnit.test('should pass jscs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jscs.');
  });
});
define('dummy/tests/app.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('dummy/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;
  var run = _ember['default'].run;

  function destroyApp(application) {
    run(application, 'destroy');
  }
});
define('dummy/tests/helpers/destroy-app.jscs-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSCS - helpers/destroy-app.js');
  QUnit.test('should pass jscs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jscs.');
  });
});
define('dummy/tests/helpers/destroy-app.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('dummy/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'dummy/tests/helpers/start-app', 'dummy/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _dummyTestsHelpersStartApp, _dummyTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _dummyTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(options, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(options, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _dummyTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('dummy/tests/helpers/module-for-acceptance.jscs-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSCS - helpers/module-for-acceptance.js');
  QUnit.test('should pass jscs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jscs.');
  });
});
define('dummy/tests/helpers/module-for-acceptance.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('dummy/tests/helpers/resolver', ['exports', 'dummy/resolver', 'dummy/config/environment'], function (exports, _dummyResolver, _dummyConfigEnvironment) {

  var resolver = _dummyResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _dummyConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _dummyConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('dummy/tests/helpers/resolver.jscs-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSCS - helpers/resolver.js');
  QUnit.test('should pass jscs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jscs.');
  });
});
define('dummy/tests/helpers/resolver.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('dummy/tests/helpers/start-app', ['exports', 'ember', 'dummy/app', 'dummy/config/environment'], function (exports, _ember, _dummyApp, _dummyConfigEnvironment) {
  exports['default'] = startApp;
  var merge = _ember['default'].merge;
  var run = _ember['default'].run;

  function startApp(attrs) {
    var application = undefined;

    var attributes = merge({}, _dummyConfigEnvironment['default'].APP);
    attributes = merge(attributes, attrs);

    run(function () {
      application = _dummyApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('dummy/tests/helpers/start-app.jscs-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSCS - helpers/start-app.js');
  QUnit.test('should pass jscs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jscs.');
  });
});
define('dummy/tests/helpers/start-app.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('dummy/tests/models/invitation.jscs-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSCS - models/invitation.js');
  QUnit.test('should pass jscs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/invitation.js should pass jscs.');
  });
});
define('dummy/tests/models/invitation.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/invitation.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/invitation.js should pass jshint.');
  });
});
define('dummy/tests/resolver.jscs-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSCS - resolver.js');
  QUnit.test('should pass jscs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jscs.');
  });
});
define('dummy/tests/resolver.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('dummy/tests/router.jscs-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSCS - router.js');
  QUnit.test('should pass jscs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jscs.');
  });
});
define('dummy/tests/router.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('dummy/tests/routes/application.jscs-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSCS - routes/application.js');
  QUnit.test('should pass jscs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass jscs.');
  });
});
define('dummy/tests/routes/application.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass jshint.');
  });
});
define('dummy/tests/test-helper', ['exports', 'dummy/tests/helpers/resolver', 'ember-qunit'], function (exports, _dummyTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_dummyTestsHelpersResolver['default']);
});
define('dummy/tests/test-helper.jscs-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSCS - test-helper.js');
  QUnit.test('should pass jscs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jscs.');
  });
});
define('dummy/tests/test-helper.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('dummy/tests/unit/transforms/enum-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('transform:enum', 'Unit | Transform | enum', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var transform = this.subject();
    assert.ok(transform);
  });
});
define('dummy/tests/unit/transforms/enum-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSCS - unit/transforms/enum-test.js');
  QUnit.test('should pass jscs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/transforms/enum-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/transforms/enum-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/transforms/enum-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/transforms/enum-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/utils/enum-test', ['exports', 'dummy/utils/enum', 'qunit'], function (exports, _dummyUtilsEnum, _qunit) {

  (0, _qunit.module)('Unit | Utility | enum');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _dummyUtilsEnum['default'])();
    assert.ok(result);
  });
});
define('dummy/tests/unit/utils/enum-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSCS - unit/utils/enum-test.js');
  QUnit.test('should pass jscs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/utils/enum-test.js should pass jscs.\nenum is a reserved word (1:7) at unit/utils/enum-test.js :\n     1 |import enum from \'dummy/utils/enum\';\n---------------^\n     2 |import { module, test } from \'qunit\';\n     3 |');
  });
});
define('dummy/tests/unit/utils/enum-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/utils/enum-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/utils/enum-test.js should pass jshint.\nunit/utils/enum-test.js: line 1, col 8, Expected an identifier and instead saw \'enum\' (a reserved word).\nunit/utils/enum-test.js: line 1, col 8, \'enum\' is defined but never used.\n\n2 errors');
  });
});
/* jshint ignore:start */

require('dummy/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map
