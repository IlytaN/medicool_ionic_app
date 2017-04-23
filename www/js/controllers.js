angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})
.controller('HomeCtrl', function($scope, MedicineService, $state, $rootScope, $ionicPopup) {
  $scope.input = {
    searchText: "",
    searchCity: ""
  };
  $scope.gotoMap = function() {
    $state.go('map', { placeLat: 65.0094995, placeLong: 25.469466199999943 });
  };
  $scope.updateSearch = function() {
    if ($scope.input.searchText === "") {
      var alertPopup = $ionicPopup.alert({
        title: 'Search status',
        template: 'Please type medicine name'
      });
    } else if ($scope.input.searchCity === "") {
      var alertPopup = $ionicPopup.alert({
        title: 'Search status',
        template: 'Please choose city'
      });
    } else {
      MedicineService.searchMedicine($scope.input).then(function(result) {
          $state.go('app.search_results', { obj: result.data });
      }).catch(function(){
        var alertPopup = $ionicPopup.alert({
          title: 'Search status',
          template: 'No result found'
        });
      });
    };

    MedicineService.BuyMed($scope.input).then(function(result) {
        $rootScope.inStockMedicines = result;
        console.log($rootScope.inStockMedicines);
    });
  };
})
.controller('SearchResultsCtrl', function($scope,MedicineService,$state,$ionicPopup) {
  $scope.foundmedicine = $state.params.obj;
  $scope.goMedicineDetail = function(id) {
    MedicineService.searchMedicineById(id).then(function(result) {
      $scope.searchedmedicine = result.data;
      $state.go('app.medicine_detail', { obj: result.data });
    });
  };
  $scope.gotoMap = function() {
    $state.go('map', { placeLat: 65.0094995, placeLong: 25.469466199999943 });
  };
  $scope.toggleFilter = function(){

  }
})
.controller('MedicineDetailCtrl', function($scope,MedicineService,$state) {
    $scope.foundmedicine = $state.params.obj;
    console.log($state.params.obj);
    // $scope.rate = function(number) {
    //   $scope.num = number;
    // };
    // // below function doesn't work yet. It needs to send UPDATED rating and medicine id to server/service
    // MedicineService.addRating($scope.num,$rootScope.foundmedicine.m_id).then(function(result) {
    //   console.log($scope.num,$rootScope.foundmedicine.m_id);
    // });
})
.controller('MedicineListCtrl', function($scope,MedicineService,$rootScope,$state) {
  MedicineService.allMedicine().then(function(result) {
      $scope.alldrugs = result.data;
      console.log($scope.alldrugs);
  });
  $scope.goMedicineDetail = function(id) {
    MedicineService.searchMedicineById(id).then(function(result) {
        $scope.foundmedicine = result.data;
        $state.go('app.medicine_detail', { obj: result.data });
    });
  }
})
.controller('PharmaciesListCtrl', function($scope,MedicineService) {
  MedicineService.allPharmacies().then(function(result) {
      $scope.alldrugstore = result.data;
  });
})
.controller('ContactsCtrl', function($scope) {
})
.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $ionicLoading, $ionicPlatform, $ionicHistory) {
  var center_pos, new_center_pos, markers;
  var client_width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  $ionicPlatform.ready(function() {
    $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
    });

    var posOptions = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
    };
    $cordovaGeolocation.getCurrentPosition(posOptions)
      .then(function (position) {
          var lat  = position.coords.latitude;
          var long = position.coords.longitude;
          var myLatLng = new google.maps.LatLng(lat, long);
          var mapOptions = {
              center: myLatLng,
              zoom: 13,
              mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          var map = new google.maps.Map(document.getElementById("map"), mapOptions);

          $scope.map = map;
          $ionicLoading.hide();

          //wait the map initialize first
          google.maps.event.addListenerOnce($scope.map, 'idle', function(){
          var marker = new google.maps.Marker({
              map: $scope.map,
              animation: google.maps.Animation.DROP,
              position: myLatLng
          });
          var infoWindow = new google.maps.InfoWindow({
              content: "You are here!"
          });
          infoWindow.open($scope.map, marker);
          google.maps.event.addListener(marker, 'click', function () {
              infoWindow.open($scope.map, marker);
          });
          showPlace($state.params.placeLat, $state.params.placeLong);
        });
          getMoveData();
          google.maps.event.addListener(map,'dragend',getMoveData)
      }, function(err) {
          $ionicLoading.hide();
          console.log(err);
      });

        // this function will find the new lat, lng, and set as the new center
    function getMoveData(){
        center_pos = $scope.map.getCenter();
        new_center_pos = center_pos.toString();
        new_center_pos = new_center_pos.replace('(', '');
        new_center_pos = new_center_pos.replace(')', '');

        latlngArray = new Array();
        latlngArray = new_center_pos.split(",")

         for (a in latlngArray) {
          latlngArray[a] = parseFloat(latlngArray[a]);
        }
        newLat = latlngArray[0];
        newLng = latlngArray[1];

        $scope.map.setCenter({lat: newLat, lng: newLng});
        showMap();
    }
    //after getting new center, show the data
    function showMap(){
      var radius_to_find = client_width - 50;
      // remember clear the previous markers first be4 request new center
      clearMarkers();
      var request = {
          location: center_pos,
          radius: client_width,
          types: ['pharmacy']
        };
      var service = new google.maps.places.PlacesService($scope.map);
          service.nearbySearch(request, callback);
    }

    function showPlace(placelat, placelong) {
      if (placelat !== null && placelong !== null ) {
        var placeLatLng = new google.maps.LatLng(placelat, placelong);
        var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: placeLatLng
        });
        var infoWindow = new google.maps.InfoWindow({
            content: "Chosen pharmacy"
        });
        infoWindow.open($scope.map, marker);
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open($scope.map, marker);
        });
      };
    };

    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          createMarker(results[i]);
        }
      }
    }
    markers = [];

    function createMarker(place){
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      var marker = new google.maps.Marker({
        map: $scope.map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });
      markers.push(marker);

      infowindow = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }

    function clearMarkers() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }
  });

  $scope.GoBack = function(){
   $ionicHistory.nextViewOptions({
          disableBack: true
      });
      $state.go('');
  }
})
;
