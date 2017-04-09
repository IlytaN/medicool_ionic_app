angular.module('starter.services', [])

.factory('MedicineService', function($q,$http) {
  var medicines_t = [{
    m_id: 0,
    m_general_desc: "for headache",
    m_generic_name: "panadol",
    m_photo: "img/panadol.jpg",
    m_imprint: "ajbkbsdfj",
    m_strength: 3,
    m_color: "white",
    m_shape: "round",
    m_availablity: "everywhere",
    m_drug_class: "fancy",
    m_pregnancy_cat: "avoid",
    m_csa_schedule: "2 times a day",
    m_manufactures: "USmedicine",
    m_description: "blablabla blablabla blablabla blablabla",
    m_rating: 8,
    m_comments_count: 23
  },
  {
    m_id: 1,
    m_general_desc: "for stomach",
    m_generic_name: "paracetamol",
    m_photo: "img/panadol.jpg",
    m_imprint: "ajbkbsdfj",
    m_strength: 5,
    m_color: "white",
    m_shape: "round",
    m_availablity: "everywhere",
    m_drug_class: "fancy",
    m_pregnancy_cat: "avoid",
    m_csa_schedule: "1 time a day",
    m_manufactures: "Finlandmedicine",
    m_description: "blablabla blablabla blablabla blablabla",
    m_rating: 9,
    m_comments_count: 10
  },
  {
    m_id: 2,
    m_general_desc: "for headache",
    m_generic_name: "vitamin D",
    m_photo: "img/ionic.png",
    m_imprint: "ajbkbsdfj",
    m_strength: 7,
    m_color: "white",
    m_shape: "round",
    m_availablity: "everywhere",
    m_drug_class: "fancy",
    m_pregnancy_cat: "avoid",
    m_csa_schedule: "3 times a day",
    m_manufactures: "UKmedicine",
    m_description: "blablabla blablabla blablabla blablabla",
    m_rating: 9,
    m_comments_count: 21
  }];
  var comments_t = [{
    c_id: 0,
    m_id: 0,
    c_title: "wonderful",
    m_stars_count: 5,
    c_author: "Michael Schofield",
    c_date: "23-4-2016",
    c_description: "Perfect medicine !!!"
  }];
  var pharmacies_t = [{
    p_id: 0,
    p_name: "RIP",
    p_logo: "img/ionic.png",
    p_city: "Moscow",
    p_address: "Moscow city center",
    p_link: "https://www.google.fi/",
    p_phone_number: "039423423"
  },
  {
    p_id: 1,
    p_name: "RIP2",
    p_logo: "img/ionic.png",
    p_city: "Hell",
    p_address: "Hell city center",
    p_link: "wwww.RIP2.hell",
    p_phone_number: "0393523423"
  },
  {
    p_id: 2,
    p_name: "RIP3",
    p_logo: "img/ionic.png",
    p_city: "Moscow",
    p_address: "Hell city center",
    p_link: "wwww.RIP3.hell",
    p_phone_number: "03945423423"
  }];
  var buy_med_t = [{
    med_id: 3,
    p_id: 2,
    med_name: "panadol",
    med_manufacturer: "USmedicine",
    med_q: 2,
    med_price: 24,
    med_link: "dfsdfsf"
  },
  {
    med_id: 2,
    p_id: 2,
    med_name: "panadol",
    med_manufacturer: "UKmedicine",
    med_q: 2,
    med_price: 22,
    med_link: "dfsdfsf"
  },
  {
    med_id: 1,
    p_id: 2,
    med_name: "panadol",
    med_manufacturer: "Finlandmedicine",
    med_q: 2,
    med_price: 25,
    med_link: "dfsdfsf"
  }];
  return{
    searchMedicine: function(input) {
      return $q(function(resolve, reject){
          var drug = medicines_t.find(function(element){
              return element.m_generic_name === input.searchText
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
    },
    searchMedicineById: function(id) {
      return $q(function(resolve, reject){
          var drug = medicines_t.find(function(element){
              return element.m_id === id
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
      resolve(medicines_t);
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
