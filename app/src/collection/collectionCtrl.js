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
			getThumbnailURI: getThumbnailURI,
			
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
					if (results) {
						vm.folders = results.filter(function(el){
							return el.mimeType == 'application/x.wd.dir'
						});
						
						vm.filesOnly = results.filter(function(el){
							return el.mimeType != 'application/x.wd.dir'
						});
						
						vm.filesAndFolders = [].concat(vm.folders, vm.filesOnly);
					}
 
					
                    //vm.items = results;
					console.log(vm);	
                    $ionicLoading.hide();
                })
				.catch(errorHandler);
        }
		
		function getThumbnailURI(item, size = 400) {
			if (item) {
				var fileId = item.id;
				var uri;
				
				if (item.mimeType == 'application/x.wd.dir') {
					uri = './folder.png';
					return uri;
				}
				
				if (!item.extension || item.extension == '.txt' || item.extension == ".pptx") {
					uri = './no-img.png';
					return uri;
				}				
								
				uri = $rootScope.deviceURI + 
					'/sdk/v2/files/' + fileId + 
					'/content?width=' + size + 
					'&height=' + size + 
					'&access_token=' + $rootScope.id_token;
				return uri;
			}
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