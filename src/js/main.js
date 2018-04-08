let jokesManage = angular
    .module('jokesManage', [])
    .controller('JokesManageCtrl', function ($scope, $http) {
        $scope.jokes = [];
        $scope.currJokes = [];
        $scope.amountJokes = 1;
        $scope.currCategories = [];

        $scope.loadAllCategories = function () {
            let btnArr = $(".categ_btn");

            for (let c = 0; c < btnArr.length; c++) {
                $scope.currCategories.push(btnArr[c].innerHTML.toLowerCase());
                btnArr[c].classList.add("active_btn");
            }

            $scope.currCategories = Array.from(new Set($scope.currCategories));

            $scope.sendRequest();
        };

        $scope.setCategory = function (e) {
            let currentBtn = angular.element(e.currentTarget);
            let currEl = e.target.innerHTML.toLowerCase();

            if ($.inArray(currEl, $scope.currCategories) >= 0) {
                let index = $scope.currCategories.indexOf(currEl);
                if ($scope.currCategories.length > 1) {
                    $scope.currCategories.splice(index, 1);
                    currentBtn.toggleClass("active_btn");
                }
            } else {
                $scope.currCategories.push(currEl);
                currentBtn.toggleClass("active_btn");
            }

            $scope.sendRequest();
        };

        $scope.sendRequest = function () {
            $http.get("http://api.icndb.com/jokes/random/700?escape=javascript").then(function (response) {
                $scope.jokes = [];
                $scope.currJokes = [];

                for (let i = 0; i < response.data.value.length; i++) {
                    for (let j = 0; j < $scope.currCategories.length; j++) {
                        if (response.data.value[i].joke.toLowerCase().indexOf($scope.currCategories[j]) >= 0) {
                            $scope.currJokes.push(response.data.value[i].joke);
                        }
                    }
                }

                $scope.currJokes = Array.from(new Set($scope.currJokes));

                if ($scope.amountJokes >= 1 && $scope.amountJokes <= 10) {
                    for (let x = 0; x < $scope.amountJokes; x++) {
                        if ($scope.currJokes[x]) {
                            $scope.jokes.push($scope.currJokes[x]);
                        }
                    }
                }
            });
        };

        $scope.loadAllCategories();
    });