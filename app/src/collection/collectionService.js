(function () {
    'use strict';

    angular
        .module('app')
        .factory('CollectionService', CollectionService);

    CollectionService.$inject = ['$rootScope', '$http', '$q'];

    function CollectionService($rootScope, $http, $q) {
        return {
			items: [],
			kaminoGetFilesRoot: kaminoGetFilesRoot,
			kaminoGetFiles: kaminoGetFiles,
			errorHandler: errorHandler,
            _sort: sort
        };
		
		function kaminoGetFilesRoot() {
			var deviceURI = 'https://qa1-proxy1.wdtest2.com:9443/' + $rootScope.deviceId;

			$rootScope.deviceURI = deviceURI;
			var getFilesURI = '/sdk/v2/filesSearch/parents?ids=root&limit=1000';

			return $http.get(deviceURI + getFilesURI, 
				{
					headers: {'Authorization': 'Bearer ' + $rootScope.id_token}
				})
				.then(function (result) {
					var items;
					if (result.data.files) {
						result.data.files.sort(sort);
						
						items = result.data.files.filter(function(el){
							return el.mimeType != 'application/octet-stream'
						});
					}
					return items;
				})
				.catch(errorHandler);
		}
		
		function kaminoGetFiles() {
			var deviceURI = 'https://qa1-proxy1.wdtest2.com:9443/' + $rootScope.deviceId;
	
			$rootScope.deviceURI = deviceURI;

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
					var items;
					if (result.data.files) {
						result.data.files.sort(sort);
						
						items = result.data.files.filter(function(el){
							return el.mimeType != 'application/octet-stream'
						});
					}
					return items;
				})
				.catch(errorHandler);
		}
		
		function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
            //$ionicLoading.hide();
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
