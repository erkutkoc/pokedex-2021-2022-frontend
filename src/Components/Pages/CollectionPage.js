import "../../assets/css/cartePokememon.css";
import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
import {changerBack} from "../../assets/js/background";
import Swal from "sweetalert2";
var pokemons = [];
var listePokemonAfficher = [];
var showMyCollection = false;
let lengthListe = 0;

let nombresPokemonAffiche = 0;
let currentFilter = [];
const main = document.querySelector("main");
let tabs = `<ul class="nav nav-tabs justify-content-center">
<li class="nav-item">
  <a class="nav-link" aria-current="page" name="tabs" id="all" href="#" style="color:white;background: rgba(0,0,0,30%);   ">All</a>
</li><li class="nav-item">
<a class="nav-link" id="myCollection" href="#" style="color:white; background: rgba(0,0,0,30%);   ">My Collection</a>
</li></ul>
`;
const containerHtml = `<div class="container" id="container"></div>`;
const filter = `<!--Filter-->
<div class="container">
    <div class="row align-items-end">
        <div class="col-1">
            <label for="touch"><span class = "Filtering">Filter</span></label>               
            <input type="checkbox" id="touch"> 
        
            <ul class="slide">
               <li> <a  class="filterButton1 hvr-grow" id="Reset" name="">Reset</a></li>
                <li> <a  class="filterButton1 hvr-grow" id="Attack" name="ASC">Filter By attack</a></li> 
                <li> <a  class="filterButton1 hvr-grow" id="HP" name="ASC">Filter By hp</a></li>
                <li> <a  class="filterButton1 hvr-grow" id="Defense" name="ASC" ">Filter By defence</a></li>
                <li> <a  class="filterButton1 hvr-grow" id="Speed" name="ASC">Filter By Speed</a></li>
            </ul>
        </div>
        <div class="col-11 align-middler " id="searchWrapper">
                <input
                class="form-control col-12"
                    type="text"
                    name="searchBar"
                    id="searchBar"
                    placeholder="search for a pokemon"
                />
        </div>
    </div>
    <br/>
    <div class="row">
        <div class="">
            <ul class="list-group list-group-horizontal" style="overflow-x: scroll; background: rgba(0,0,0,30%); ">
                <li> <a class="list-group-item filterType hvr-wobble-vertical" id="All" name="All">All</a></li> 
                <li> <a class="list-group-item filterType hvr-forward" id="Grass" name="Grass">Grass</a></li> 
                <li> <a class="list-group-item filterType hvr-backward" id="Poison" name="Poison">Poison</a></li>
                <li> <a class="list-group-item filterType hvr-forward" id="Fire" name="Fire" ">Fire</a></li>
                <li> <a class="list-group-item filterType hvr-backward" id="Flying" name="Flying">Flying</a></li>
                <li> <a class="list-group-item filterType hvr-forward" id="Water" name="Water">Water</a></li>
                <li> <a class="list-group-item filterType hvr-backward" id="Bug" name="Bug">Bug</a></li>
                <li> <a class="list-group-item filterType hvr-forward" id="Normal" name="Normal">Normal</a></li>
                <li> <a class="list-group-item filterType hvr-backward" id="Ground" name="Ground">Ground</a></li>
                <li> <a class="list-group-item filterType hvr-forward" id="Electric" name="Electric">Electric</a></li>
                <li> <a class="list-group-item filterType hvr-backward" id="Fairy" name="Fairy">Fairy</a></li>
                <li> <a class="list-group-item filterType hvr-forward" id="Fighting" name="Fighting">Fighting</a></li>
                <li> <a class="list-group-item filterType hvr-backward" id="Psychic" name="Psychic">Psychic</a></li>
                <li> <a class="list-group-item filterType hvr-forward" id="Steel" name="Steel">Steel</a></li>
                <li> <a class="list-group-item filterType hvr-backward" id="Ice" name="Ice">Ice</a></li>
                <li> <a class="list-group-item filterType hvr-forward" id="Rock" name="Rock">Rock</a></li>             
                <li> <a class="list-group-item filterType hvr-backward" id="Ghost" name="Ghost">Ghost</a></li>
                <li> <a  class="list-group-item filterType hvr-forward" id="Dragon" name="Dragon">Dragon</a></li>
                <li> <a  class="list-group-item filterType hvr-backward" id="Dark" name="Dark">Dark</a></li>
            </ul>
        </div>
    </div>
</div>
<!--Filter-->`;
const pokemonCardHtml = (pokemon, hex) => {
  let abilityOne = "";
  let abilityTwo = "";
  if (pokemon.profile.ability[1]) {
    abilityTwo = pokemon.profile.ability[1][0];
  }
  if (pokemon.profile.ability[0]) {
    abilityOne = pokemon.profile.ability[0][0];
  }
  return `<!--Card Start-->
    <div id="card_${pokemon.type[0]}" class ="card1 col-3 mb-3"  style ="background :${hex};">
        <p id="type_${pokemon.type[0]}" class="type" >${pokemon.type}</p>
        <h2 id="cardTitle" class="name" >${pokemon.name.english}</h2>
        <figure class="figure2" style="padding: 0 25% 0 25%;"><img class="img-fluid figure-img" src="${pokemon.hires}"> </figure>
            <div class="cardText">
                <div class="StatsContainer" style="display: flex; justify-content: space-between;  background: rgba(255,255,255,30%); font-size:15px; border-radius: 10px;">
                    <div class="statList"  >
                        <p class ="stats">attaque : ${pokemon.base.Attack} </p>
                        <p class ="stats">defense : ${pokemon.base.Defense}</p>
                        <p class ="stats">vitalite : ${pokemon.base.HP}</p>  
                    </div>
                    <div class="statList" >
                        <p class ="stats">attaque SP. : ${pokemon.base.SpAttack}</p>
                        <p class ="stats">defense SP. : ${pokemon.base.SpDefense}</p>
                        <p class ="stats">vitesse : ${pokemon.base.Speed}</p>
                    </div>
                </div>
                <div class="movesContainer" style="display: flex;justify-content: space-between;">
                    <p class =moves style="color:white"> ${abilityOne} </p>
                    <p class =moves style="color:white"> ${abilityTwo} </p>
                </div>
                <div class="pokemonDescription" style="background: rgba(204,204,204,40%);; font-size: 10px; ">
                    <p class =description> 
                    ${pokemon.description} 
                    </p>
                </div>
            </div>
    </div>
<!--Card End-->`;
};
const CollectionPage = async () => {
  let userSession = getSessionObject("user");
  main.innerHTML = "";
  if (userSession) {
    main.innerHTML += tabs;
  }
  main.innerHTML += filter;
  main.innerHTML += containerHtml;
  let container = document.querySelector("#container");
  // Gère la barre de recherche sur la liste contenant Tous les pokemons
  const searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();
    for (let count = 0; count < filterType.length; count++) {
      filterType[count].style =
        filterType[count].style + "background-color: transparent;";
    }
    listePokemonAfficher = pokemons.filter((pokemon) => {
      return pokemon.name.english.toLowerCase().startsWith(searchString);
    });
    container.innerHTML = "";
    affichageListe();
  });
  // Gère le bouton filter en haut à gauche - Pas fonctionnelle
  const filterButton1 = document.querySelectorAll(".filterButton1");
  filterButton1.forEach((item) => {
    item.addEventListener("click", filterby.bind(event, item.id, item.name));
  });
  // Gère tous les boutons Type ex( Water, Grass,...)
  const filterType = document.querySelectorAll(".filterType");
  filterType.forEach((item) => {
    item.addEventListener("click", function (e) {
      let nomType = e.target.id;
      if (nomType == "All") {
        listePokemonAfficher = pokemons;
      } else {
        listePokemonAfficher = pokemons.filter(
          (pokemon) => pokemon.type[0] == nomType || pokemon.type[1] == nomType
        );
      }
      container.innerHTML = "";
      //refresh le background-color laissé sur le dernier filtreType cliquer
      for (let count = 0; count < filterType.length; count++) {
        filterType[count].style =
          filterType[count].style + "background-color: transparent;";
      }
      e.target.style = "background-color: red;";
      changerBack(nomType);
      // appel fonction pour changer le background
      affichageListe();
    });
  });
  if (showMyCollection == false) {
    async function findAllPokemons() {
      const response = await fetch("/api/pokemons", {
        method: "GET",
        cache: "no-cache",
        cache: "no-store",
      });
      if (!response.ok) {
        console.error("response ko !");
      }
      pokemons = await response.json();
      pokemons = pokemons.filter((pokemon) => pokemon.base != undefined);
      listePokemonAfficher = pokemons;
      affichageListe();
    }
    findAllPokemons();
  } else {
    const container1 = document.querySelector("#container");
    container1.innerHTML = "";
    async function findMyCollections() {
      const response = await fetch("/api/users/collection/" + userSession.id, {
        method: "GET",
        cache: "no-cache",
        cache: "no-store",
      });
      if (!response.ok) {
        console.error("response ko !");
      }

      pokemons = await response.json();
      pokemons = pokemons.filter((pokemon) => pokemon.base != undefined);
      listePokemonAfficher = pokemons;
      affichageListe();
    }
    findMyCollections();
  }
  window.onscroll = () => {
    let lastKnowScrollPosition =
      window.innerHeight + Math.ceil(window.pageYOffset + 10);
    if (document.body.offsetHeight <= lastKnowScrollPosition) {
      lastKnowScrollPosition = document.body.offsetHeight - 1;
      displayRowAfterScroll();
    }
  };
  if (userSession) {
    // get all nav-link items
    let tabsTag = document.getElementsByClassName("nav-link");
    // filter all nav-link item by id
    let tabsTagFiltered = [].filter.call(tabsTag, (e) => e.id != "");
    // tabsTagFiltered[0] = nav link id = All
    tabsTagFiltered[0].addEventListener("click", () => {
      tabsTagFiltered[0].className = "nav-link active";
      tabsTagFiltered[1].className = "nav-link";
      showMyCollection = false;
    });
    // tabsTagFiltered[1] = nav link id = myCollection
    tabsTagFiltered[1].addEventListener("click", () => {
      tabsTagFiltered[0].className = "nav-link";
      tabsTagFiltered[1].className = "nav-link active";
      showMyCollection = true;
    });
  }
};
const displayRowAfterScroll = () => {
  lengthListe = listePokemonAfficher.length - nombresPokemonAffiche;
  if (lengthListe <= 0) return;
  let maxRow = 4;
  let compteur = 0;
  while (compteur < maxRow) {
    let divRow = document.createElement("div");
    divRow.className = "row justify-content-center";
    container.appendChild(divRow);
    displayRow(nombresPokemonAffiche, divRow);
    compteur++;
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom",
      showConfirmButton: false,
      timer: 500,
      icon: "info",
      width: "6em",
      background: "rgba(0, 0,0, 0.5)",
      timerProgressBar: true,
      didOpen: (toast) => {
        Swal.showLoading();
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "info",
    });
  }
};
const displayRow = (currentRow, divRow) => {
  let cardsHtml = "";
  let pokemon;
  for (let index = currentRow; index < currentRow + 4; index++) {
    if (index < listePokemonAfficher.length) {
      let hex = "";
      pokemon = listePokemonAfficher[index];
      nombresPokemonAffiche++;
      if (pokemon.type[0].toLowerCase() == "grass") {
        hex = "#5FC314";
      } else if (pokemon.type[0].toLowerCase() == "poison") {
        hex = "#c41b5a";
      } else if (pokemon.type[0].toLowerCase() == "fire") {
        hex = "#801100";
      } else if (pokemon.type[0].toLowerCase() == "flying") {
        hex = "#DBf4e0";
      } else if (pokemon.type[0].toLowerCase() == "water") {
        hex = "#2384eb";
      } else if (pokemon.type[0].toLowerCase() == "bug") {
        hex = "#499801";
      } else if (pokemon.type[0].toLowerCase() == "normal") {
        hex = "#aaaaaa";
      } else if (pokemon.type[0].toLowerCase() == "ground") {
        hex = "#d47b4a";
      } else if (pokemon.type[0].toLowerCase() == "electric") {
        hex = "#FEDA00";
      } else if (pokemon.type[0].toLowerCase() == "fairy") {
        hex = "#FC98D3";
      } else if (pokemon.type[0].toLowerCase() == "fighting") {
        hex = "#b41c24";
      } else if (pokemon.type[0].toLowerCase() == "psychic") {
        hex = "#E54ED0";
      } else if (pokemon.type[0].toLowerCase() == "steel") {
        hex = "#d1e1f6";
      } else if (pokemon.type[0].toLowerCase() == "ice") {
        hex = "#3F7EB3";
      } else if (pokemon.type[0].toLowerCase() == "rock") {
        hex = "#1e0707";
      } else if (pokemon.type[0].toLowerCase() == "ghost") {
        hex = "#3d5496";
      } else if (pokemon.type[0].toLowerCase() == "dragon") {
        hex = "#d52318";
      } else if (pokemon.type[0].toLowerCase() == "dark") {
        hex = "#23395d";
      }
      cardsHtml += pokemonCardHtml(pokemon, hex);
      divRow.innerHTML = cardsHtml;
    }
  }
};

function getAllSorted(filter, value) {
  let timerInterval;
  Swal.fire({
    title: "Sorting ",
    timer: 850,
    timerProgressBar: true,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
      timerInterval = setInterval(() => {}, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  });
  if (filter == "Reset") {
    currentFilter[0] = "";
    currentFilter[1] = "";
    return listePokemonAfficher.sort(function (a, b) {
      return a.id - b.id;
    });
  }
  if (filter == "HP") {
    if (currentFilter[0] == "HP") {
      if (currentFilter[1] == "ASC") {
        value = "DESC";
        currentFilter[1] = value;
      } else if (currentFilter[1] == "DESC") {
        value = "ASC";
        currentFilter[1] = value;
      }
    }
    if (value == "ASC") {
      currentFilter[0] = "HP";
      currentFilter[1] = "ASC";
      return listePokemonAfficher.sort(function (a, b) {
        return a.base.HP - b.base.HP;
      });
    } else {
      return listePokemonAfficher.sort(function (a, b) {
        return b.base.HP - a.base.HP;
      });
    }
  }
  if (filter == "Attack") {
    if (currentFilter[0] == "Attack") {
      if (currentFilter[1] == "ASC") {
        value = "DESC";
        currentFilter[1] = value;
      } else if (currentFilter[1] == "DESC") {
        value = "ASC";
        currentFilter[1] = value;
      }
    }
    if (value == "ASC") {
      currentFilter[0] = "Attack";
      currentFilter[1] = "ASC";
      return listePokemonAfficher.sort(function (a, b) {
        return a.base.Attack - b.base.Attack;
      });
    } else {
      return listePokemonAfficher.sort(function (a, b) {
        return b.base.Attack - a.base.Attack;
      });
    }
  }
  if (filter == "Defense") {
    if (currentFilter[0] == "Defense") {
      if (currentFilter[1] == "ASC") {
        value = "DESC";
        currentFilter[1] = value;
      } else if (currentFilter[1] == "DESC") {
        value = "ASC";
        currentFilter[1] = value;
      }
    }
    if (value == "ASC") {
      currentFilter[0] = "Defense";
      currentFilter[1] = "ASC";
      return listePokemonAfficher.sort(function (a, b) {
        return a.base.Defense - b.base.Defense;
      });
    } else {
      return listePokemonAfficher.sort(function (a, b) {
        return b.base.Defense - a.base.Defense;
      });
    }
  }
  if (filter == "Speed") {
    if (currentFilter[0] == "Speed") {
      if (currentFilter[1] == "ASC") {
        value = "DESC";
        currentFilter[1] = value;
      } else if (currentFilter[1] == "DESC") {
        value = "ASC";
        currentFilter[1] = value;
      }
    }
    if (value == "ASC") {
      currentFilter[0] = "Speed";
      currentFilter[1] = "ASC";
      return listePokemonAfficher.sort(function (a, b) {
        return a.base.Speed - b.base.Speed;
      });
    } else {
      return listePokemonAfficher.sort(function (a, b) {
        return b.base.Speed - a.base.Speed;
      });
    }
  }
}
const filterby = async (filter, value) => {
  listePokemonAfficher = getAllSorted(filter, value);
  container.innerHTML = "";
  affichageListe();
};
const affichageListe = async () => {
  nombresPokemonAffiche = 0;
  lengthListe = listePokemonAfficher.length;
  if (lengthListe == 0) return;

  let maxRow = 4;
  let compteur = 0;
  while (compteur < maxRow) {
    let divRow = document.createElement("div");
    divRow.className = "row justify-content-center";
    container.appendChild(divRow);
    displayRow(compteur * 4, divRow);
    compteur++;
  }
};
export default CollectionPage;
