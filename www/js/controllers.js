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
    MedicineService.BuyMed($scope.input).then(function(result) {
        $rootScope.inStockMedicines = result;
        console.log($rootScope.inStockMedicines);
    });
    MedicineService.dummyPharma().then(function(result) {
        $rootScope.dummystore = result;
        console.log($rootScope.dummystore);
    });
    $state.go('app.search_results');
  };
})
.controller('SearchResultsCtrl', function($scope,$rootScope,$state) {
  $scope.goMedicineDetail = function() {
    $state.go('app.medicine_detail');
  }
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
