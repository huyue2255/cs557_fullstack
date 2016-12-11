function BookstoreCtrl($scope, $http) {
    $scope.books = [
        {title: "", price: "Loading ..."}
    ];
    $http({method: 'GET', url: '/api/get'})
            .success(function (data, status, headers, config) {
                $scope.books = data;
            })
            .error(function (data, status, headers, config) {
                console.error("Error getting books.");
            });
}