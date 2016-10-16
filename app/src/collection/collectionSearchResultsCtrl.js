(function () {
    'use strict';

    angular
        .module('app')
        .controller('CollectionSearchResultsCtrl', CollectionSearchResultsCtrl);

    CollectionSearchResultsCtrl.$inject = ['$scope', '$rootScope', '$state', 'items',
        '$ionicLoading', '$ionicPopup', '$ionicListDelegate'];

    function CollectionSearchResultsCtrl($scope, $rootScope, $state, items, $ionicLoading, $ionicPopup, $ionicListDelegate) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            queryChanged: queryChanged,
            queryClear: queryClear,
            collectionDetails: collectionDetails
        });

        init();

        function init() {
            vm.items = items;
            vm.itemsFilter = items;
            vm.clear = false;
        }

        function queryChanged() {
            if (vm.query != '') {
                vm.clear = true;
            }
        }

        function queryClear() {
            vm.query = '';
            vm.clear = false;
        }

        function collectionDetails(item) {
            $state.go('root.collection-details', {item: item});
        }
    }
})();