import * as Vibrant from "node-vibrant";
import "../../assets/css/cartePokememon.css";
import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
import  "../../assets/js/background";
let pokemons = [];
let listePokemonAfficher = [];
var showMyCollection = false;
let lengthListe = 0;
let surplusRow = 0;

let i = 0;
const loaderHTML = `
<div class="spinner-border text-warning" role="status">
    <span class="sr-only">Loading...</span>
</div>`;
const main = document.querySelector("main");
const tabs = `<ul class="nav nav-tabs justify-content-center">
<li class="nav-item">
  <a class="nav-link" aria-current="page" name="tabs" id="all" href="#" style="color:white;background: rgba(0,0,0,30%);   ">All</a>
</li>
<li class="nav-item">
  <a class="nav-link" id="myCollection" href="#" style="color:white; background: rgba(0,0,0,30%);   ">My Collection</a>
</li>
</ul>`;
const containerHtml = `<div class="container" id="container"></div>`;
const filter = `<!--Filter-->
<div class="container">
    <div class="row align-items-end">
        <div class="col-5">
            <label for="touch"><span class = "Filtering">Filter</span></label>               
            <input type="checkbox" id="touch"> 
        
            <ul class="slide">
                <li> <a href="#" class="filterButton1" id="ASC" name="Attack">The most attack</a></li> 
                <li> <a href="#" class="filterButton1" id="ASC" name="HP">The most hp</a></li>
                <li> <a href="#" class="filterButton1" id="ASC" name="Defence" ">The most defence</a></li>
                <li> <a href="#" class="filterButton1" id="ASC" name="Speed">The fastest</a></li>
            </ul>
        </div>
        <div class="col-7 align-middler" id="searchWrapper">
                <input
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
                <li> <a class="list-group-item filterType" id="All" name="All">All</a></li> 
                <li> <a class="list-group-item filterType" id="Grass" name="Grass">Grass</a></li> 
                <li> <a class="list-group-item filterType" id="Poison" name="Poison">Poison</a></li>
                <li> <a class="list-group-item filterType" id="Fire" name="Fire" ">Fire</a></li>
                <li> <a class="list-group-item filterType" id="Flying" name="Flying">Flying</a></li>
                <li> <a class="list-group-item filterType" id="Water" name="Water">Water</a></li>
                <li> <a class="list-group-item filterType" id="Bug" name="Bug">Bug</a></li>
                <li> <a class="list-group-item filterType" id="Normal" name="Normal">Normal</a></li>
                <li> <a class="list-group-item filterType" id="Ground" name="Ground">Ground</a></li>
                <li> <a class="list-group-item filterType" id="Electric" name="Electric">Electric</a></li>
                <li> <a class="list-group-item filterType" id="Fairy" name="Fairy">Fairy</a></li>
                <li> <a class="list-group-item filterType" id="Fighting" name="Fighting">Fighting</a></li>
                <li> <a class="list-group-item filterType" id="Psychic" name="Psychic">Psychic</a></li>
                <li> <a class="list-group-item filterType" id="Steel" name="Steel">Steel</a></li>
                <li> <a class="list-group-item filterType" id="Ice" name="Ice">Ice</a></li>
                <li> <a class="list-group-item filterType" id="Rock" name="Rock">Rock</a></li>             
                <li> <a class="list-group-item filterType" id="Ghost" name="Ghost">Ghost</a></li>
                <li> <a  class="list-group-item filterType" id="Dragon" name="Dragon">Dragon</a></li>
                <li> <a  class="list-group-item filterType" id="Dark" name="Dark">Dark</a></li>
            </ul>
        </div>
    </div>
    <br/>
</div>
<!--Filter-->`;

//une carte
const pokemonCardHtml = (pokemon, hex) => {
  return `<!--Card Start-->
    <div id="card_${pokemon.type[0]}" class ="card1 col-3 mb-3" style ="background :linear-gradient(100deg, ${hex.Vibrant.hex} 0%, ${hex.DarkMuted.hex} 100%);">
        <p id="type_${pokemon.type[0]}" class="type" style="" >${pokemon.type}</p>
        <h2 class="name" style="text-align: center;font-size: 1.5em;font-weight: 700; letter-spacing: 0.02em;color:white">${pokemon.name.french}</h2>
        <figure class="figure2"style="padding: 0 25% 0 25%;"><img class="img-fluid figure-img" style="display: inline-block;  height: 128px;
        width: 128px;" src="${pokemon.hires}"> </figure>
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
                    <p class =moves style="color:white"> ${pokemon.profile.ability[0][0]} </p>
                    <p class =moves style="color:white"> ${pokemon.profile.ability[0][1]} </p>
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
  i = 0;
  main.innerHTML = "";
  main.innerHTML += tabs;
  main.innerHTML += filter;
  main.innerHTML += containerHtml;
  let container = document.querySelector("#container");

  // Gère la barre de recherche sur la liste contenant Tous les pokemons
  const searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();
    //refresh le background-color laissé sur le dernier filtreType cliquer
    //car la recherche se fait sur toute la liste et non la liste trié par type choisi
    for (let count = 0; count < filterType.length; count++) {
      filterType[count].style =
        filterType[count].style + "background-color: transparent;";
    }
    console.log(searchString);
    listePokemonAfficher = pokemons.filter((pokemon) => {
      return pokemon.name.french.toLowerCase().startsWith(searchString);
      //Rajouter cette ligne si l'on veut aussi check les noms anglais
      // || pokemon.name.english.toLowerCase().startsWith(searchString)
    });
    container.innerHTML = "";
    affichageListe();
  });

  // Gère le bouton filter en haut à gauche - Pas fonctionnelle
  const filterButton1 = document.querySelectorAll(".filterButton1");
  filterButton1.forEach((item) => {
    item.addEventListener("click", filterby.bind(event, item.name, item.id));
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
      // appel focniton pour changer le background
      affichageListe();
    });
  });

  if (showMyCollection == false) {
    console.log("all");
    async function findAllPokemons() {
      const response = await fetch("/api/pokemons", {
        method: "GET",
        cache: "no-cache",
        cache: "no-store",
      });
      if (!response.ok) {
        console.log("response ko !");
      }

      pokemons = await response.json();
      pokemons = pokemons.filter((pokemon) => pokemon.base != undefined);
      listePokemonAfficher = pokemons;
      affichageListe();
    }
    findAllPokemons();
  } else {
    console.log("my");
    console.log(showMyCollection);
    const container1 = document.querySelector("#container");
    container1.innerHTML = "";
    let userSession = getSessionObject("user");
    console.log(userSession, "user");
    async function findMyCollections() {
      const response = await fetch("/api/users/collection/" + userSession.id, {
        method: "GET",
        cache: "no-cache",
        cache: "no-store",
      });
      if (!response.ok) {
        console.log("response ko !");
      }

      pokemons = await response.json();
      pokemons = pokemons.filter((pokemon) => pokemon.base != undefined);
      listePokemonAfficher = pokemons;
      affichageListe();
    }
    findMyCollections();
  }

  //scroll bottom event detection
  window.addEventListener("scroll", () => {
    let lastKnowScrollPosition =
      window.innerHeight + Math.ceil(window.pageYOffset + 10);
    if (document.body.offsetHeight <= lastKnowScrollPosition) {
      lastKnowScrollPosition = document.body.offsetHeight - 1;
      displayRowAfterScroll(i);
    }
  });
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
};

const displayRowAfterScroll = (ligne) => {
  let size = listePokemonAfficher.length;
  let rowNumber = size / 4;
  let newLigne = ligne + 3;
  while (ligne < rowNumber && ligne < newLigne) {
    let divRow = document.createElement("div");
    divRow.className = "row justify-content-center";
    container.appendChild(divRow);
    displayRow(i * 4, divRow);
    i++;
    ligne++;
  }
};

const displayRow = async (currentRow, divRow) => {
  let cardsHtml = "";

  //console.log(listePokemonAfficher)
  for (let index = currentRow; index < currentRow + 4; index++) {
    let hex = "";
    const pokemon = listePokemonAfficher[index];
    const promise = await Vibrant.from(pokemon.hires)
      .getPalette()
      .then((palette) => (hex = palette));

    cardsHtml += pokemonCardHtml(pokemon, hex);
    divRow.innerHTML = cardsHtml;
  }
};

const displayRowSurplus = async (currentRow, divRow) => {
  let cardsHtml = "";

  //console.log(listePokemonAfficher)
  for (let index = currentRow; index < currentRow + surplusRow; index++) {
    let hex = "";
    const pokemon = listePokemonAfficher[index];
    const promise = await Vibrant.from(pokemon.hires)
      .getPalette()
      .then((palette) => (hex = palette.DarkMuted.hex));

    cardsHtml += pokemonCardHtml(pokemon, hex);
    divRow.innerHTML = cardsHtml;
  }
};

const filterby = async (filter, value) => {
  try {
    const options = {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
    };

    const response = await fetch("/api/pokemons/sort/" + filter + "/" + value); // fetch return a promise => we wait for the response

    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }

    await response.json(); // json() returns a promise => we wait for the data
  } catch (error) {
    console.error("LoginPage::error: ", error);
  }
};

const affichageListe = async () => {
  lengthListe = listePokemonAfficher.length;
  if (lengthListe == 0) return;

  let NumberRow = Math.ceil(lengthListe / 4);
  let maxRow = 4;
  if (NumberRow < 4) {
    maxRow = NumberRow;
    surplusRow = lengthListe % 4;
    console.log("Surplus:" + surplusRow);
  }
  let compteur = 0;
  while (compteur < maxRow - 1) {
    let divRow = document.createElement("div");
    divRow.className = "row justify-content-center";
    container.appendChild(divRow);
    displayRow(compteur * 4, divRow);
    compteur++;
    i++;
  }
  if (surplusRow > 0) {
    let divRow = document.createElement("div");
    divRow.className = "row justify-content-center";
    container.appendChild(divRow);
    displayRowSurplus(compteur * 4, divRow);
    compteur++;
    i++;
  } else {
    let divRow = document.createElement("div");
    divRow.className = "row justify-content-center";
    container.appendChild(divRow);
    displayRow(compteur * 4, divRow);
    compteur++;
    i++;
  }
  //reset
  surplusRow = 0;
};

export default CollectionPage;
