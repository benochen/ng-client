(function () {

    angular
        .module('ClientApp')
        .factory('ClientUsersService', ['$resource', ClientUsersService]);

    function ClientUsersService($resource) {
        var self = this;

        self.UserResource = $resource('api/users/:userId', {userId: '@id'},
            {
                'update': {
                    method: 'PUT'
                },
                'patch': {
                    method: 'PATCH'
                },
                'query': {
                    isArray: false
                }
            });

        self.UserResetResource = $resource('api/users/:userId/resetPassword', {userId: '@id'},
            {
                'query': {
                    isArray: false
                }
            });

        var getUsers = function (params) {
            return self.UserResource.query(params).$promise;
        };

        var getUser = function (id) {
            return self.UserResource.query({userId: id}).$promise;
        };

        var createUser = function (params, success, error) {
            new self.UserResource(params).$save(success, error);
        };

        var updateUser = function (params, success, error) {
            self.UserResource.update(params, success, error);
        };

        var deleteUser = function (id, success, error) {
            self.UserResource.delete({userId: id}, success, error);
        };

        var patchUser = function (id, params, success, error) {
            self.UserResource.patch({userId: id}, params, success, error);
        }

        var resetUserPassword = function (id, success, error) {
            return self.UserResetResource.query({userId: id}, success, error).$promise;
        };

        return {
            getUsers: getUsers,
            getUser: getUser,
            createUser: createUser,
            deleteUser: deleteUser,
            updateUser: updateUser,
            patchUser: patchUser,
            resetUserPassword: resetUserPassword
        };
    }

})
();
