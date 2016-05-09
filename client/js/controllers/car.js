// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('AllCarsController', ['$scope', 'Car', '$state',
  function($scope, Car, $state) {
    $scope.cars = Car.find({});
    $scope.book = function(car) {
      $state.go('add-booking', {car: car});
    };
  }])
  .controller('AddCarController', ['$scope', 'Car', '$state',
      function($scope, Car, $state) {
    $scope.car = {};
    $scope.addCar = function() {
      Car
        .create($scope.car)
        .$promise
        .then(function(res) {
          alert('Car ' + $scope.car.model + ' created !'); // jshint ignore:line
          $state.go('all-cars');
        })
        .catch(function(err) {
          if(err.status === 401) {
            alert(err.statusText + ': You need to be administrator'); // jshint ignore:line
          } else {
            alert(err. status + ': ' + err.statusText); // jshint ignore:line
          }
          $state.go('add-car');
        });
    };
  }]);
