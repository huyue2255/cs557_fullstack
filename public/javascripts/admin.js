var admin = angular.module('admin', ['ngRoute']);
var AddEditRoute = {
    controller: 'AddEditCtrl',
    template:   '\
		<hr />\
		<article>\
                    <form>\
                        <span>Title</spna><br />\
                        <input type="text" ng-model="book.title"/><br />\
                        <span>Price</spna><br />\
                        <input type="text" ng-model="book.price"/>\
                        <br /><br />\
                        <button ng-click="save()">save</button>\
                    </form>\
		</article>\
                '
};
admin.factory('API', function ($http) {
    var request = function (method, url) {
        return function (callback, data) {
            $http({method: method, url: url, data: data})
                .success(callback)
                .error(function (data, status, headers, config) {
                    console.error("Error requesting '" + url + "'.");
                });
        };
    };
    return {
        get: request('GET', '/api/get'),
        add: request('POST', '/api/add'),
        edit: request('POST', '/api/edit'),
        remove: request('POST', '/api/delete')
    };
});
admin.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'ListCtrl',
                template: '<article ng-repeat="book in books">' +
                        '<hr /><strong>{{book.title}}</strong><br />' +
                        '(<a href="#/edit/{{book.id}}">edit</a>)' +
                        '(<a href="#/delete/{{book.id}}">remove</a>)' +
                        '<br /></article>'
            })
            .when('/add', AddEditRoute)
            .when('/edit/:id', AddEditRoute)
            .when('/delete/:id', {
                controller: 'RemoveCtrl',
                template: ' '
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);
admin.controller('ListCtrl', function ($scope, API) {
    API.get(function (books) {
        $scope.books = books;
    });
});
admin.controller('AddEditCtrl', function ($scope, API, $location, $routeParams) {
    var editMode = $routeParams.id ? true : false;
    if (editMode) {
        API.get(function (books) {
            books.forEach(function (book) {
                if (book.id == $routeParams.id) {
                    console.log(book);
                    $scope.book = book;
                }
            });
        });
    }
    $scope.save = function () {
        API[editMode ? 'edit' : 'add'](function () {
            $location.path('/');
        }, $scope.book);
    };
});
admin.controller(
        'RemoveCtrl',
        function ($scope, $location, $routeParams, API) {
            API.remove(function () {
                $location.path('/');
            }, $routeParams);
        }
);