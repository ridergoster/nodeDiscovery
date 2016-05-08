// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('AllCarsController', ['$scope', 'Car', function($scope,
      Car) {
    $scope.cars = Car.find({});
  }]);
