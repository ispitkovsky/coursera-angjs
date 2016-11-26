(function () {
'use strict';

angular.module('MenuApp')
.component('items1', {
  templateUrl: 'src/menuapp/templates/items.template.html',
  bindings: {
    items: '<'
  }
});

})();
