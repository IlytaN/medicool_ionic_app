angular.module('starter.services', [])

.factory('MedicineService', function($q,$http,ApiEndpoint) {
  var medicines_t = [];
  var pharmacies_t = [];
  var buy_med_t = [];
  return{
    searchMedicine: function(input) {
      return $q(function(resolve, reject){
        $http.post(ApiEndpoint.url+"search_medicine", {searchText: input.searchText, searchCity: input.searchCity}).then(function(response){
          if(response.status == 200)
              {
                console.log(response.data);
                resolve(response);
              }
              else
              {
                reject();
              }
        },function(err){
            reject();
        });
      });
    },
    searchMedicineById: function(id) {
      return $q(function(resolve, reject){
        $http.post(ApiEndpoint.url+"search_medicine_by_id", {searchId: id}).then(function(response){
          if(response.status == 200)
              {
                console.log(response.data);
                resolve(response);
              }
              else
              {
                reject();
              }
        },function(err){
            reject();
        });
      });
    },
    BuyMed: function(input) {
      return $q(function(resolve, reject){
          var buy_medicine = buy_med_t.find(function(element){
              return element.med_name === input.searchText
          });

          if(buy_medicine !== undefined)
          {
              resolve(buy_medicine);
          }
          else
          {
              reject();
          }
      });
  },
  allMedicine: function(){
    return $q(function(resolve, reject){
      $http.get(ApiEndpoint.url+"showmedicines").then(function(response){
        if(response.status == 200)
            {
              console.log(response.data);
              resolve(response);
            }
            else
            {
              reject();
            }
      },function(err){
          reject();
      });
    });
  },
  addRating: function(num,id){
    return $q(function(resolve, reject){
      resolve();
      // send a POST request to server to add rating number
    });
  },
  allPharmacies: function(){
    return $q(function(resolve, reject){
      resolve(pharmacies_t);
    });
  },
  dummyPharma: function(){
    return $q(function(resolve, reject){
        if(pharmacies_t !== undefined)
        {
            resolve(pharmacies_t[0]);
        }
        else
        {
            reject();
        }
    });
  }
  };
});
