(function () {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {
	
        $stateProvider
            .state('root', {
                url: '/root',
                abstract: true,
                templateUrl: 'app/root.html'
            })

            .state('root.home', {
                url: '/home',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-home': {
                        templateUrl: 'app/home.html'
                    }
                }
            })
 
             .state('root.collection', {
                url: '/collection',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-collection': {
                        templateUrl: 'collection/collection.html',
                        controller: 'CollectionCtrl',
                        controllerAs: 'collectionCtrl'
                    }
                }
            })
			
			.state('root.collection-details', {
                url: '/collection-details',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                views: {
                    'root-collection': {
                        templateUrl: 'collection/collection-details.html',
                        controller: 'CollectionDetailsCtrl',
                        controllerAs: 'collectionDetailsCtrl'
                    }
                }
            })
			
             .state('root.collection-sub', {
                url: '/collection-sub',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-collection': {
                        templateUrl: 'collection/collection-sub.html',
                        controller: 'CollectionSubCtrl',
                        controllerAs: 'collectionSubCtrl'
                    }
                }
            })
			
            .state('root.collection-sub-details', {
                url: '/collection-sub-details',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                views: {
                    'root-collection': {
                        templateUrl: 'collection/collection-sub-details.html',
                        controller: 'CollectionSubDetailsCtrl',
                        controllerAs: 'collectionSubDetailsCtrl'
                    }
                }
            })
			
			.state('login', {
                url: '/login',
                data: {
                    requireLogin: false
                },
                templateUrl: 'login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'loginCtrl'
            });
			
        $urlRouterProvider.otherwise('login');
    }

})();