import HomePage from "./HomePage";
import * as Vibrant from "node-vibrant";
import "../../assets/css/cartePokememon.css"
import { Redirect } from "../Router/Router";

let pokemons = [];

let needMoreData = false;
let i = 0;
const loaderHTML = `
<div class="spinner-border text-warning" role="status">
    <span class="sr-only">Loading...</span>
</div>`;
const main = document.querySelector("main");
const button = `<input class="btn btn-primary" type="button" value="Input">`;
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
const pokemonCardHtml = (pokemon,hex) => {
    return `<!--Card Start-->
    <div id="card_${pokemon.type[0]}" class ="card1 col-sm ">
        <p id="type_${pokemon.type[0]}" class="type"  >${pokemon.type}</p>
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
}
const CollectionPage = () => {
    main.innerHTML = button;
    main.innerHTML += filter;
    main.innerHTML = containerHtml;
    const container = document.querySelector("#container");

    const filterButton1 = document.querySelectorAll(".filterButton1");
    filterButton1.forEach(item => {
        item.addEventListener("click", filterby.bind(event, item.name, item.id))
    })
  
    async function findAllPokemons() {
        const response = await fetch("/api/pokemons", {
            method: "GET",
            cache : "no-cache",
            cache : "no-store"

        })
        if (!response.ok) {
            console.log("response ko !")
        }
        //fetch pokemon

        pokemons = await response.json();
        pokemons = pokemons.filter(pokemon => pokemon.base != undefined);
        console.log(pokemons)
        //i = ligne
        while (i < 4) {
            let divRow = document.createElement("div");
            divRow.className = "row";
            container.appendChild(divRow)
            displayRow(i * 4, divRow);
            i++;
        }

    };
    findAllPokemons();

    //scroll bottom event detection
    window.addEventListener('scroll', () => {
        let lastKnowScrollPosition = (window.innerHeight + Math.ceil(window.pageYOffset));
        //console.log("o : "+document.body.offsetHeight)
        //console.log("l : "+lastKnowScrollPosition)
        if (document.body.offsetHeight <= lastKnowScrollPosition ) {
            lastKnowScrollPosition = document.body.offsetHeight -1;
            displayRowAfterScroll (i)
        }

    });
};

const displayRowAfterScroll = (ligne) =>{
    
    console.log("displayRowAfterScroll")
    let size = pokemons.length;
    let rowNumber = size / 4;
    //i = ligne
    let newLigne = ligne+3;
    while (ligne < rowNumber && ligne < newLigne) {
        let divRow = document.createElement("div");
        divRow.className = "row";
        container.appendChild(divRow)
        displayRow(i * 4, divRow);
        i++;
        ligne++;
    }
}

const displayRow = async (currentRow, divRow) => {
    console.log("displayRow")
    let cardsHtml = "";

    
    for (let index = currentRow; index < currentRow + 4; index++) {
        console.log("current row : " + currentRow)
        console.log("index : " +index)
        let hex = "";
        const pokemon = pokemons[index];
        const promise = await Vibrant.from(pokemon.hires)
        .getPalette()
        .then((palette) => (hex = palette.DarkMuted.hex));

        cardsHtml += pokemonCardHtml(pokemon,hex);
        divRow.innerHTML = cardsHtml;
    }
}


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
