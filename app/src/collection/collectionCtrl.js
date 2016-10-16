(function () {
    'use strict';

    angular
        .module('app')
        .controller('CollectionCtrl', CollectionCtrl);

    CollectionCtrl.$inject = ['$scope', '$rootScope', '$state', 'CollectionService', '$ionicLoading'];

    function CollectionCtrl($scope, $rootScope, $state, CollectionService, $ionicLoading) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            showSearch: showSearch,
 
            doRefresh: doRefresh,
            queryClear: queryClear,
            queryChanged: queryChanged
        });

        init();

        function init() {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });

            vm.items = [];
            vm.itemsFilter = [];
            vm.clear = false;
            vm.searchShowed = false;

            CollectionService.kaminoGetFiles()
                .then(function (results) {
                    vm.items = results;
                    $ionicLoading.hide();
                })
				.catch(errorHandler);
        }

        function showSearch() {
            vm.searchShowed = vm.searchShowed ? false : true;
        }

        function doRefresh() {
            vm.items = [];
            vm.itemsFilter = [];			
            vm.clear = false;
            CollectionService.kaminoGetFiles()
                .then(function (results) {
                    vm.items = results;
                    $ionicLoading.hide();
                })
				.catch(errorHandler);
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

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
            $ionicLoading.hide();
        }
    }
})();