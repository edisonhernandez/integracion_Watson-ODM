
(function() {
    'use strict';
    angular.module('app', ['irontec.simpleChat']);
    angular.module('app').controller('Shell', Shell);
    function Shell($rootScope, $scope, $http) {

        $scope.product = 'Scotia Travel'
        var vm = this;
        vm.messages = [hola];
        vm.openChat = function () {
            $rootScope.$broadcast('initConversation',{message: $scope.product, username: $scope.username, is_init_conversation: true})
        };
        vm.startConversation = function(message, username) {
            $rootScope.$broadcast('initConversation',{message: message, username: username})
        };
        vm.sendMessage = function(message, username, is_init_conversation) {
            if(message && message !== '' && $scope.username !== '') {
                $http.post(contextPath + '/conversationCallerApi/sendMessage', {message: message}, {})
                    .then(vm.successCallbackSendMessage, vm.errorCallbackSendMessage);

                if(!is_init_conversation) {
                    vm.messages.push({
                        'username': $scope.username,
                        'content': message
                    });
                }
            }
        };

        vm.successCallbackSendMessage = function (response) {
            console.debug(response)

            angular.forEach(response.data.data.text, function(value, key) {
                console.info('message: ' + value.replace('username', $scope.username))
                vm.messages.push({
                    'username': 'Bot',
                });
            });
            $('#chat-container-master').show()
        }

        vm.errorCallbackSendMessage = function (response) {
            console.error(response)
        }

    }

})();