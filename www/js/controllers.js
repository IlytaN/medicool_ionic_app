angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})
.controller('HomeCtrl', function($scope,MedicineService,$state,$rootScope) {
  $scope.input = {
    searchText: "",
    searchCity: ""
  };
  $scope.updateSearch = function() {
    MedicineService.searchMedicine($scope.input).then(function(result) {
        $rootScope.foundmedicine = result;
        console.log($rootScope.foundmedicine);
    });
    $state.go('app.search_results');
  };
})
.controller('SearchResultsCtrl', function($scope,$rootScope) {
})
.controller('MedicineDetailCtrl', function($scope) {
})
.controller('MedicineListCtrl', function($scope) {
})
.controller('PharmaciesListCtrl', function($scope) {
})
.controller('ContactsCtrl', function($scope) {
})
;
