// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('AddBookingController',
  ['$scope', 'Booking', '$stateParams', '$state',
  function($scope, Booking, $stateParams, $state) {
    $scope.car = $stateParams.car;
    $scope.today = new Date();
    $scope.booking = {
      dateStart: new Date(),
      dateEnd: new Date(),
      price: $scope.car.price,
      carId: $scope.car.id
    };
    $scope.daysBetween = function(first, second) {
        var one = new Date(first.getFullYear(), first.getMonth(), first.getDate()); // jshint ignore:line
        var two = new Date(second.getFullYear(), second.getMonth(), second.getDate());  // jshint ignore:line
        var millisecondsPerDay = 1000 * 60 * 60 * 24;
        var millisBetween = two.getTime() - one.getTime();
        var days = millisBetween / millisecondsPerDay;
        return Math.floor(days);
    };

    $scope.addBooking = function() {
      Booking
        .create($scope.booking)
        .$promise
        .then(function(res) {
          console.log(res);
          alert('Booking completed, Have a nice drive.'); // jshint ignore:line
          $state.go('all-cars');
        })
        .catch(function(err) {
          if(err.status === 401) {
            alert(err.statusText + ': You need to be Login'); // jshint ignore:line
          } else if(err.status === 403){
            alert('ERROR ' + err. status + ': ' + err.data.error.message);  // jshint ignore:line
          }
          $state.go('add-booking',{car: $scope.car});
        });
    };
  }]);
