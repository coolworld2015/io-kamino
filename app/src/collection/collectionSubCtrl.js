(function () {
    'use strict';

    angular
        .module('app')
        .controller('CollectionSubCtrl', CollectionSubCtrl);

    CollectionSubCtrl.$inject = ['$scope', '$rootScope', '$state', 'CollectionService', '$ionicLoading'];

    function CollectionSubCtrl($scope, $rootScope, $state, CollectionService, $ionicLoading) {
        var vm = this;

        angular.extend(vm, {
            init: init,
			getThumbnailURI: getThumbnailURI,
			itemDetails: itemDetails, 
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
			
			vm.folder = $rootScope.folder;
            
			vm.filesAndFolders = [];
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

                    $ionicLoading.hide();
                })
				.catch(errorHandler);
        }
		
		function getThumbnailURI(item) {
		    var size = 400;
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
		
		function itemDetails(item) {
            $state.go('root.collection-sub-details', {item: item});
        }
		
        function showSearch() {
            vm.searchShowed = vm.searchShowed ? false : true;
        }

        function doRefresh() {
            vm.filesAndFolders = [];
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
                    $scope.$broadcast('scroll.refreshComplete');
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