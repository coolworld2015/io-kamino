(function () {
    'use strict';

    angular
        .module('app', ['ionic']);

    angular
        .module('app')
        .run(runIonic);

    runIonic.$inject = ['$ionicPlatform'];

    function runIonic($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    }
	
    angular
        .module('app')
        .run(runHandler);

    runHandler.$inject = ['$rootScope', '$state'];

    function runHandler($rootScope, $state) {
        $rootScope.$on('$stateChangeStart', function (event, toState) { //TODO Change $stateChangeStart
            var requireLogin = toState.data.requireLogin;
            if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
                event.preventDefault();
                $state.go('login');
            }
        });
    }
	
    angular
        .module('app')
        .run(init);

    init.$inject = ['$rootScope'];

    function init() {
    }
})();
