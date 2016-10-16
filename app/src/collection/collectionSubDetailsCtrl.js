(function () {
    'use strict';

    angular
        .module('app')
        .controller('CollectionSubDetailsCtrl', CollectionSubDetailsCtrl);

    CollectionSubDetailsCtrl.$inject = ['$rootScope', '$stateParams', '$filter', '$state'];

    function CollectionSubDetailsCtrl($rootScope, $stateParams, $filter, $state) {
        var vm = this;

        angular.extend(vm, {
            init: init,
			getThumbnailURI: getThumbnailURI
        });

        angular.extend(vm, $stateParams.item);

        init();

        function init() {
			console.log(vm);	
			if (!vm.mimeType || vm.mimeType == 'application/x.wd.dir') {
				$rootScope.rootID = vm.id;
				$rootScope.parentID = vm.parentID;
				$state.go('root.collection-sub');
			}
			vm.size = $filter('number')(vm.size/1024, 2) + ' Kb';
         }
		
		function getThumbnailURI(item, size = 400) {
			var fileId = vm.id;
			var uri;

			uri = $rootScope.deviceURI + 
				'/sdk/v2/files/' + fileId + 
				'/content?width=' + size + 
				'&height=' + size + 
				'&access_token=' + $rootScope.id_token;
			//console.log(uri);	
			return uri;
		}
    }

})();
