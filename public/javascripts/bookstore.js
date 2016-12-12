function BookstoreCtrl($scope, $http) {
    $scope.books = [
        {title: "", price: "Loading ..."}
    ];
    $http({method: 'GET', url: '/api/get'})
            .then(function (response) {
                $scope.books = response.data;
                return response
            })
            .catch(function (response) {
                console.error("Error getting books.");
            });
}