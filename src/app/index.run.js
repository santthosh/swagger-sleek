(function() {
  'use strict';

  angular
    .module('swaggerSleek')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
