import HomePage from "./HomePage";
import * as Vibrant from "node-vibrant";
import "../../assets/css/cartePokememon.css";
import { Redirect } from "../Router/Router";
import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
let pokemons = [];
var showMyCollection = false;

let i = 0;
const loaderHTML = `
<div class="spinner-border text-warning" role="status">
    <span class="sr-only">Loading...</span>
</div>`;
const main = document.querySelector("main");
const tabs = `<ul class="nav nav-tabs justify-content-center">
<li class="nav-item">
  <a class="nav-link" aria-current="page" name="tabs" id="all" href="#">All</a>
</li>
<li class="nav-item">
  <a class="nav-link" id="myCollection" href="#">My Collection</a>
</li>
</ul>`;
const containerHtml = `<div class="container" id="container"></div>`;
const filter = `<!--Filter-->
<div class="container">
    <div class="row">
        <div class="col-sm">
            <label for="touch"><span class = "Filtering">Filter</span></label>               
            <input type="checkbox" id="touch"> 
        
            <ul class="slide">
                <li> <a href="#" class="filterButton1" id="ASC" name="Attack">The most attack</a></li> 
                <li> <a href="#" class="filterButton1" id="ASC" name="HP">The most hp</a></li>
                <li> <a href="#" class="filterButton1" id="ASC" name="Defence" ">The most defence</a></li>
                <li> <a href="#" class="filterButton1" id="ASC" name="Speed">The fastest</a></li>
            </ul
        </div>
    </div>
</div>
<!--Filter-->`;

//une carte
const pokemonCardHtml = (pokemon, hex) => {
  return `<!--Card Start-->
    <div id="card_${pokemon.type[0]}" class ="card1 col-sm mb-3" style ="background :linear-gradient(100deg, ${hex.Vibrant.hex} 0%, ${hex.DarkMuted.hex} 100%);">
        <p id="type_${pokemon.type[0]}" class="type" style="" >${pokemon.type}</p>
        <h2 class="name" style="text-align: center;font-size: 1.5em;font-weight: 700; letter-spacing: 0.02em;color:white">${pokemon.name.french}</h2>
        <figure class="figure2"style="padding: 0 25% 0 25%;"><img class="img-fluid figure-img" style="display: inline-block;  height: 128px;
        width: 128px;" src="${pokemon.hires}"> </figure>
            <div class="cardText">
                <div class="StatsContainer" style="display: flex; flex justify-content: space-between;  background: rgba(255,255,255,30%); font-size:15px; border-radius: 10px;">
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
  const container = document.querySelector("#container");

  const filterButton1 = document.querySelectorAll(".filterButton1");
  filterButton1.forEach((item) => {
    item.addEventListener("click", filterby.bind(event, item.name, item.id));
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
      //fetch pokemon

      pokemons = await response.json();
      pokemons = pokemons.filter((pokemon) => pokemon.base != undefined);
      //console.log(pokemons)
      //i = ligne
      //console.log(i)
      while (i < 4) {
        let divRow = document.createElement("div");
        divRow.className = "row";
        container.appendChild(divRow);
        displayRow(i * 4, divRow);
        i++;
      }
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
      //fetch pokemon

      pokemons = await response.json();
      pokemons = pokemons.filter((pokemon) => pokemon.base != undefined);
      //console.log(pokemons)
      //i = ligne
      //console.log(i)
      while (i < 4) {
        let divRow = document.createElement("div");
        divRow.className = "row";
        container.appendChild(divRow);
        displayRow(i * 4, divRow);
        i++;
      }
    }
    findMyCollections();
  }

  //scroll bottom event detection
  window.addEventListener("scroll", () => {
    let lastKnowScrollPosition =
      window.innerHeight + Math.ceil(window.pageYOffset);
    //console.log("o : "+document.body.offsetHeight)
    //console.log("l : "+lastKnowScrollPosition)
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
  //console.log("displayRowAfterScroll")
  let size = pokemons.length;
  let rowNumber = size / 4;
  //i = ligne
  let newLigne = ligne + 3;
  while (ligne < rowNumber && ligne < newLigne) {
    let divRow = document.createElement("div");
    divRow.className = "row";
    container.appendChild(divRow);
    displayRow(i * 4, divRow);
    i++;
    ligne++;
  }
};

const displayRow = async (currentRow, divRow) => {
  //console.log("displayRow")
  let cardsHtml = "";

  for (let index = currentRow; index < currentRow + 4; index++) {
    //console.log("current row : " + currentRow)
    //console.log("index : " +index)
    let hex = "";
    const pokemon = pokemons[index];
    const promise = await Vibrant.from(pokemon.hires)
      .getPalette()
      .then((palette) => (hex = palette));

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

export default CollectionPage;
