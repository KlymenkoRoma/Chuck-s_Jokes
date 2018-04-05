let jokesManage = angular
    .module('jokesManage', [])
    .controller('JokesManageCtrl', function ($scope, $http) {
        $scope.jokes = [];
        $scope.amountJokes = 1;

        $scope.sendRequest = function () {
            if ($scope.amountJokes >= 1 && $scope.amountJokes <= 10) {
                $http.get("http://api.icndb.com/jokes/random/" + $scope.amountJokes).then(function (response) {
                    $scope.jokes = [];
                    for (let i = 0; i < response.data.value.length; i++) {
                        $scope.jokes.push(response.data.value[i].joke);
                    }
                });
            }
        };

        $scope.sendRequest();
    });

let slideout = new Slideout({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('menu'),
    'padding': 256,
    'tolerance': 70
});

document.querySelector('.toggle-button').addEventListener('click', function() {
    slideout.toggle();
});