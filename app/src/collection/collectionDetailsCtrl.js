(function () {
    'use strict';

    angular
        .module('app')
        .controller('CollectionDetailsCtrl', CollectionDetailsCtrl);

    CollectionDetailsCtrl.$inject = ['$stateParams'];

    function CollectionDetailsCtrl($stateParams) {
        var vm = this;

        angular.extend(vm, {
            init: init
        });

        angular.extend(vm, $stateParams.item);

        init();

        function init() {
        }
    }

})();
