const cities = [
  "Kabul",
  "Tirana",
  "El Djazaïr",
  "Pago Pago",
  "Andorra la Vella",
  "Luanda",
  "The Valley",
  "St. John's",
  "Buenos Aires",
  "Yerevan",
  "Oranjestad",
  "Canberra",
  "Wien",
  "Baku",
  "Nassau",
  "Manama",
  "Dhaka",
  "Bridgetown",
  "Minsk",
  "Bruxelles",
  "Belmopan",
  "Cotonou",
  "Porto-Novo",
  "Hamilton",
  "Thimphu",
  "La Paz",
  "Sucre",
  "Sarajevo",
  "Gaborone",
  "Brasília",
  "Road Town",
  "Bandar Seri Begawan",
  "Sofia",
  "Ouagadougou",
  "Bujumbura",
  "Praia",
  "Phnom Penh",
  "Yaoundé",
  "Ottawa",
  "Kralendijk",
  "George Town",
  "Bangui",
  "N'Djaména",
  "St. Helier",
  "St. Peter Port",
  "Santiago",
  "Beijing",
  "Hong Kong",
  "Macao",
  "Taipei",
  "Bogotá",
  "Moroni",
  "Brazzaville",
  "Rarotonga",
  "San José",
  "Abidjan",
  "Yamoussoukro",
  "Zagreb",
  "Havana",
  "Willemstad",
  "Nicosia",
  "Prague",
  "Pyongyang",
  "Kinshasa",
  "Copenhagen",
  "Djibouti",
  "Roseau",
  "Santo Domingo",
  "Quito",
  "Cairo",
  "San Salvador",
  "Malabo",
  "Asmara",
  "Tallinn",
  "Addis Ababa",
  "Tórshavn",
  "Stanley",
  "Suva",
  "Helsinki",
  "Paris",
  "Cayenne",
  "Papeete",
  "Libreville",
  "Banjul",
  "Tbilisi",
  "Berlin",
  "Accra",
  "Gibraltar",
  "Athens",
  "Godthåb",
  "St. George",
  "Basse-Terre",
  "Hagåtña",
  "Guatemala City",
  "Conakry",
  "Bissau",
  "Georgetown",
  "Port-au-Prince",
  "Vatican City",
  "Tegucigalpa",
  "Budapest",
  "Reykjavík",
  "Delhi",
  "Jakarta",
  "Tehran",
  "Baghdad",
  "Dublin",
  "Douglas",
  "Jerusalem",
  "Rome",
  "Kingston",
  "Tokyo",
  "Amman",
  "Astana",
  "Nairobi",
  "Tarawa",
  "Kuwait City",
  "Bishkek",
  "Vientiane",
  "Riga",
  "Beirut",
  "Maseru",
  "Monrovia",
  "Tripoli",
  "Vaduz",
  "Vilnius",
  "Luxembourg",
  "Antananarivo",
  "Lilongwe",
  "Kuala Lumpur",
  "Male",
  "Bamako",
  "Valletta",
  "Majuro",
  "Fort-de-France",
  "Nouakchott",
  "Port Louis",
  "Mamoudzou",
  "Mexico City",
  "Palikir",
  "Monaco",
  "Ulaanbaatar",
  "Podgorica",
  "Brades Estate",
  "Rabat",
  "Maputo",
  "Nay Pyi Taw",
  "Windhoek",
  "Nauru",
  "Kathmandu",
  "Amsterdam",
  "The Hague",
  "Nouméa",
  "Wellington",
  "Managua",
  "Niamey",
  "Abuja",
  "Alofi",
  "Saipan",
  "Oslo",
  "Muscat",
  "Islamabad",
  "Koror",
  "Panama City",
  "Port Moresby",
  "Asunción",
  "Lima",
  "Manila",
  "Warsaw",
  "Lisbon",
  "San Juan",
  "Doha",
  "Seoul",
  "Chişinău",
  "Saint-Denis",
  "Bucharest",
  "Moscow",
  "Kigali",
  "Jamestown",
  "Basseterre",
  "Castries",
  "Saint-Pierre",
  "Kingstown",
  "Apia",
  "San Marino",
  "São Tomé",
  "Riyadh",
  "Dakar",
  "Belgrade",
  "Victoria",
  "Freetown",
  "Singapore",
  "Philipsburg",
  "Bratislava",
  "Ljubljana",
  "Honiara",
  "Mogadishu",
  "Bloemfontein",
  "Cape Town",
  "Pretoria",
  "Juba",
  "Madrid",
  "Colombo",
  "Sri Jayewardenepura Kotte",
  "East Jerusalem",
  "Khartoum",
  "Paramaribo",
  "Mbabane",
  "Stockholm",
  "Bern",
  "Damascus",
  "Dushanbe",
  "Skopje",
  "Bangkok",
  "Dili",
  "Lomé",
  "Tokelau",
  "Nuku'alofa",
  "Port of Spain",
  "Tunis",
  "Ankara",
  "Ashgabat",
  "Cockburn Town",
  "Funafuti",
  "Kampala",
  "Kiev",
  "Abu Dhabi",
  "London",
  "Dodoma",
  "Washington, D.C.",
  "Charlotte Amalie",
  "Montevideo",
  "Tashkent",
  "Port Vila",
  "Caracas",
  "Hà Noi",
  "Mata Utu",
  "El Aaiún",
  "Sanaa",
  "Lusaka",
  "Harare"
];

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

window.addEventListener('load',(event) => {
  autocomplete(document.getElementById('searchBar'), cities);
});
