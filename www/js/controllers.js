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
  $scope.gotoMap = function() {
    $state.go('map');
  };
  $scope.updateSearch = function() {
    MedicineService.searchMedicine($scope.input).then(function(result) {
        $state.go('app.search_results', { obj: result.data });
    });
    MedicineService.BuyMed($scope.input).then(function(result) {
        $rootScope.inStockMedicines = result;
        console.log($rootScope.inStockMedicines);
    });
    MedicineService.dummyPharma().then(function(result) {
        $rootScope.dummystore = result;
    });
  };
})
.controller('SearchResultsCtrl', function($scope,$rootScope,$state) {
  $scope.foundmedicine = $state.params.obj;
  $scope.goMedicineDetail = function() {
    $state.go('app.medicine_detail');
  };
  $scope.toggleFilter = function(){

  }
})
.controller('MedicineDetailCtrl', function($scope,MedicineService,$rootScope) {
    $scope.rate = function(number) {
      $scope.num = number;
    };
    // below function doesn't work yet. It needs to send UPDATED rating and medicine id to server/service
    MedicineService.addRating($scope.num,$rootScope.foundmedicine.m_id).then(function(result) {
      console.log($scope.num,$rootScope.foundmedicine.m_id);
    });
})
.controller('MedicineListCtrl', function($scope,MedicineService,$rootScope,$state) {
  MedicineService.allMedicine().then(function(result) {
      $rootScope.alldrugs = result;
      console.log($rootScope.alldrugs);
  });
  $scope.goMedicineDetail = function(id) {
    MedicineService.searchMedicineById(id).then(function(result) {
        $rootScope.foundmedicine = result;
        console.log($rootScope.foundmedicine);
    });
    $state.go('app.medicine_detail');
  }
})
.controller('PharmaciesListCtrl', function($scope,MedicineService,$rootScope) {
  MedicineService.allPharmacies().then(function(result) {
      $rootScope.alldrugstore = result;
      console.log($rootScope.alldrugstore);
  });
})
.controller('ContactsCtrl', function($scope) {
})
.controller('MapCtrl', function($scope, $state,$cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

  }, function(error){
    console.log("Could not get location");
  });
})
;
