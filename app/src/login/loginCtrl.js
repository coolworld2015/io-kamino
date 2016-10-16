(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$ionicLoading', '$rootScope', '$http', '$q', '$state'];

    function LoginCtrl($ionicLoading, $rootScope, $http, $q, $state) {
        var vm = this;

        angular.extend(vm, {
            init: init,
			change: change,
            toLogin: toLogin,
            checkUser: checkUser,
            _check: check,
            _errorHandler: errorHandler
        });

        init();

        function init() {
			//vm.name = 'sergey.sydorenko@wdc.com';
			//vm.pass = 'Test1234';				
			
			vm.name = 'kamino.web.team@gmail.com';
			vm.pass = 'Kamino1234';
            $rootScope.currentUser = undefined;
            $rootScope.raisedError = false;
        }
		
		function toLogin() {
            if (vm.form.$invalid) {
                return;
            }
			console.log(vm.name + ' - ' + vm.pass);
			
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
			
			var item = {
				client_id: 'gpQeYeZGke7da9ag6bYpyJIZcaXIJxF2',
				connection: 'Username-Password-Authentication',
				device: '123456789',
				grant_type: 'password',
				password: vm.pass,
				scope: 'openid offline_access',
				username: vm.name
			};
							
			var url = 'https://wdc-qa1.auth0.com/oauth/ro';
				return $http.post(url, item)
					.then(function (result) {
						$rootScope.access_token = result.data.access_token;
						$rootScope.id_token = result.data.id_token;
							
							return $http.get('https://wdc-qa1.auth0.com/userinfo',
								{
									headers: {'Authorization': 'Bearer ' + $rootScope.access_token}
								})
								.then(function (result) {
									$rootScope.user_id = result.data.user_id;

									return $http.get('https://qa1-device.remotewd1.com/device/v1/user/' + $rootScope.user_id, 
										{
											headers: {'Authorization': 'Bearer ' + $rootScope.id_token}
										})
										.then(function (result) {
											$rootScope.deviceId = result.data.data[0].deviceId;
											$rootScope.currentUser = {
												name: vm.name,
												pass: vm.pass
											};
											$state.go('root.collection');
											$ionicLoading.hide();
										})
										.catch(errorHandler);

								})
								.catch(errorHandler);
																			
					})
					.catch(errorHandler);
		}
			
        function change() {
            vm.error = false;
        }        
		
		function toLogin1() {
            if (vm.form.$invalid) {
                return;
            }
            checkUser(vm.name, vm.pass);
        }

        function checkUser(name, pass) {
            if ($rootScope.mode == 'ON-LINE (Heroku)') {
                getUsersOn(name, pass);
            } else {
                vm.users = UsersLocalStorage.getUsers();
                check(vm.users, name, pass);
            }
        }

        function getUsersOn(name, pass) {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
            UsersService.findByName(name)
                .then(function (data) {
                    $rootScope.loading = false;
                    var user = data.data;

                    if (user && (user.name == name && user.pass == pass)) {
                        $rootScope.currentUser = {
                            name: name,
                            pass: pass
                        };

                        var id = (Math.random() * 1000000).toFixed();
                        var description  = navigator.userAgent;
                        var item = {
                            id: id,
                            name: vm.name,
                            description: description
                        };

                        AuditService.addItem(item)
                            .then(function () {
								vm.error = false;
                                $state.go('root.home');
                            })
                            .catch(errorHandler);

                    } else {
                        vm.error = true;
                    }
 
                    $ionicLoading.hide();
                })
                .catch(errorHandler);
        }

        function check(users, name, pass) {
            if (users) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].name == name && users[i].pass == pass) {
                        $rootScope.currentUser = {
                            name: name,
                            pass: pass
                        };
                        $state.go('root.home');
                    } else {
                        vm.error = true;
                    }
                }
            }
        }

        function errorHandler() {
            $rootScope.raisedError = true;
            $ionicLoading.hide();
        }
    }
})();
