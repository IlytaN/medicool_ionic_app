// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova']).constant('ApiEndpoint', {
  url: 'https://medicoolserver.herokuapp.com/'
  //Use this link for real server: https://medicoolserver.herokuapp.com/
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('hometry', {
    url: '/hometry',
    templateUrl: 'templates/hometry.html',
    controller: 'HomeCtrl'
  })
  .state('map', {
    url: '/map',
    params: {
      placeLat: null,
      placeLong: null
    },
    templateUrl: 'templates/map.html',
    controller: 'MapCtrl'
  })
  .state('app.search_results', {
      url: '/search_results',
      params: {
        obj1: null,
        obj2: null
      },
      views: {
        'menuContent': {
          templateUrl: 'templates/search_results.html',
          controller: 'SearchResultsCtrl'
        }
      }
    })
  .state('app.medicine_detail', {
      url: '/medicine_detail',
      params: {
        obj: null
      },
      views: {
        'menuContent': {
          templateUrl: 'templates/medicine_detail.html',
          controller: 'MedicineDetailCtrl'
        }
      }
    })
  .state('app.medicine_list', {
      url: '/medicine_list',
      params: {
        obj: null
      },
      views: {
        'menuContent': {
          templateUrl: 'templates/medicine_list.html',
          controller: 'MedicineListCtrl'
        }
      }
    })
    .state('app.pharmacies_list', {
      url: '/pharmacies_list',
      views: {
        'menuContent': {
          templateUrl: 'templates/pharmacies_list.html',
          controller: 'PharmaciesListCtrl'
        }
      }
    })

  .state('app.contacts', {
    url: '/contacts',
    views: {
      'menuContent': {
        templateUrl: 'templates/contacts.html',
        controller: 'ContactsCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/hometry');
});
