angular.module('starter.services', [])

.factory('MedicineService', function($q,$http) {
  var medicines = [{
    id: 0,
    name: "panadol",
    picture: "img/panadol.jpg",
    description: "blablabla blablabla blablabla blablabla"
  },
  {
    id: 1,
    name: "paracetamol",
    picture: "img/ionic.png",
    description: "blablabla blablabla blablabla blablabla"
  },
  {
    id: 2,
    name: "vitamin D",
    picture: "img/ionic.png",
    description: "blablabla blablabla blablabla blablabla"
  }];

  return{
    all: function(){
      return medicines;
    },
    showsinglemedicine: function(id) {
      return medicines[id];
    },
    searchMedicine: function(input) {
      return $q(function(resolve, reject){
          var drug = medicines.find(function(element){
              return element.name === input.searchText
          });

          if(drug !== undefined)
          {
              resolve(drug);
          }
          else
          {
              reject();
          }
      });
    }
  };
});
