'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$http', '$scope', 'Phone',
  function ($http, $scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';

    $scope.confirmReservation = function () {
      var request = {
        method: 'POST',
        withCredentials: true,
        url: 'http://localhost:9100/ecommerce/sales',
        headers: {
          'Command-Type': 'ecommerce.sales.CreateReservation',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: {
          'customerId': 'c1',
          'reservationId': 'r2'
        }
      };
      $http(request)
        .success(function (data, status, headers, config) {
          console.log('Success! ' + data);
        })
        .error(function (data, status, headers, config) {
          console.log('Error! ' + data);
        });
    }
  }
]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function ($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function (phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function (imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }
]);
