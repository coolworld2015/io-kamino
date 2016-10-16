(function () {
    'use strict';

    angular
        .module('app')
        .factory('CollectionService', CollectionService);

    CollectionService.$inject = ['$rootScope', '$http', '$q'];

    function CollectionService($rootScope, $http, $q) {
        //var webUrl = $rootScope.myConfig.webUrl;
        var webUrl = 'http://ui-collection.herokuapp.com/';

        return {
			items: [],
			kaminoGetFiles: kaminoGetFiles,
			errorHandler: errorHandler,
			getAllItems: getAllItems,
            getItems: getItems,
            addItem: addItem,
            editItem: editItem,
            deleteItem: deleteItem,
            findItem: findItem,
            _sort: sort
        };
		
		function kaminoGetFiles() {
			var deviceURI0 = 'https://qa1-proxy1.wdtest2.com:9443/9ebfcfef-ed18-4c24-8499-44723bfa8560'; //sergey.sydorenko@wdc.com
			var deviceURI1 = 'https://qa1-proxy1.wdtest2.com:9443/1cfbaa2e-e2ea-463a-aaea-840a49a3ea8f'; //kamino.web.team@gmail.com
			var deviceURI = 'https://qa1-proxy1.wdtest2.com:9443/' + $rootScope.deviceId;
			
			$rootScope.deviceURI = deviceURI;
			
			var getFilesURI1 = '/sdk/v2/filesSearch/parents?ids=csGk6-3tumUe0_CdA9yC7DVJXyJy-lYzSR4Vd5j8&limit=1000'; //kamino.web.team@gmail.com
			var getFilesURI2 = '/sdk/v2/filesSearch/parents?ids=cIXlzl1WJ7G5JTGE3-OYPfDeqAbe4c-R-ebtjyLP&limit=1000'; //sirisha.codambakkam@wdc.com

			var getFilesURI = '/sdk/v2/filesSearch/parents?ids=QQMou0b-hYhQVewOA4GmT3QO_tdV0YV7_WzJRw_0&limit=1000';
			var getFilesURI = '/sdk/v2/filesSearch/parents?ids=root&limit=1000';

			if ($rootScope.rootID) {
				getFilesURI = '/sdk/v2/filesSearch/parents?ids=' + $rootScope.rootID + '&limit=1000';
				console.log($rootScope.parentID)
				//$rootScope.rootID = $rootScope.parentID;
			}
			
			return $http.get(deviceURI + getFilesURI, 
				{
					headers: {'Authorization': 'Bearer ' + $rootScope.id_token}
				})
				.then(function (result) {
					//console.log(result.data.files.sort(sort));
					if (result.data.files) {
						result.data.files.sort(sort);
					}
					return result.data.files;
				})
				.catch(errorHandler);
		}
		
		function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
            //$ionicLoading.hide();
        }
		
        function getAllItems() {
            var url = webUrl + 'api/items/getAll';
            return $http.get(url)
                .then(function (result) {
                    result.data.sort(sort);
                    return result;
                });
        }
		
        function getItems() {
            var url = webUrl + 'api/items/get';
            return $http.get(url)
                .then(function (result) {
                    result.data.sort(sort);
                    return result;
                });
        }
		
        function addItem(item) {
            var url = webUrl + 'api/items/add';
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function editItem(item) {
            var url = webUrl + 'api/items/update';
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function deleteItem(id) {
            var url = webUrl + 'api/items/delete';
            var item = {
                "id": id
            };
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function findItem(id) {
            var url = webUrl + 'api/items/find';
            var item = {
                "id": id
            };
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function sort(a, b) {
            var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            return 0;
        }
    }
})();
