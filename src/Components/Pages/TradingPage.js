import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
import { Redirect } from "../Router/Router";
import Swal from "sweetalert2";
/**
 * Render the trading page
 */

let tradesList = [];
let showCreateTrades = false;
let showAll = true;
const main = document.querySelector("main");
const tabs = `<ul class="nav nav-tabs justify-content-center">
  <li class="nav-item">
    <a class="nav-link" aria-current="page" name="tabs" id="all" href="#" style="background: rgba(0,0,0,30%); color: white">All</a>
  </li>
 
  <li class="nav-item">
    <a class="nav-link" id="create" href="#" style="background: rgba(0,0,0,30%); color: white" ">Create</a>
  </li>
  </ul>`;
const formAddTrade = `
<div class="container-fluid h-100  text-dark" >

<hr />

<div class="row" style="background:rgb(245, 245, 245, 0.4);">
<button type="button" id="addTrade" style="background-color:yellow; text-align:center; width: 400px ; margin-left:auto; margin-right: auto;" class="btn">Add trade</button>

<p>Propositions</p>

  <div class="col col-9">
    <div class="form-group">
      <div class="container" id="propositionsContainer">
        <div class="input-group mb-3">
          <div class="input-group-append"></div>
          <div id="propositions"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="col col-3">
    <div class="table-wrapper-scroll-y my-custom-scrollbar">
      <table class="table table-bordered table-striped mb-0" id="">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Photo</th>
          </tr>
        </thead>
        <tbody id="propositionsTable">
          <tr>
            <th colspan="2">propositions list empty</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
<hr />

<div class="row" style="background:rgb(245, 245, 245, 0.4);">
<p>Requests</p>
<input type="text" id="requestsFilter" placeholder="Write pokemon name...">
  <div class="col col-6">
    <div class="form-group">
      <div class="container" id="requestsContainer">
        <div class="table-wrapper-scroll-y my-custom-scrollbar">
          <table class="table table-bordered table-striped mb-0">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Photo</th>
              </tr>
            </thead>
            <tbody id="requestList">
            <th colspan="2">please search pokemon</th></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="col col-6">
    <div class="form-group">
      <div class="table-wrapper-scroll-y my-custom-scrollbar">
        <table class="table table-bordered table-striped mb-0" >
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Photo</th>
            </tr>
          </thead>
          <tbody id="requestsTable">
            <tr>
              <th colspan="2">requests list empty</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</div>


`;
const containerHtml = `<div class="container" id="container"></div>`;

//une carte
const tradesCardHtml = async (trade) => {
  let user = getSessionObject("user");

  let tradeObjreq = await getTradePlusPokeObject(trade.id, "requests");
  let tradeObjprop = await getTradePlusPokeObject(trade.id, "propositions");

  let tdhtmlrequest = "";
  let tdhtmlproposition = "";
  tradeObjreq[1].forEach((element) => {
    tdhtmlrequest += `<td><img style="width: 75px; border:solid ; border-width : 0.3px ; border-radius : 10px" src="${element.hires}"></td>`;
  });
  tradeObjprop[1].forEach((element) => {
    tdhtmlproposition += `<td ><img style="width: 75px; border:solid ; border-width : 0.3px ; border-radius : 10px" src="${element.hires}"></td>`;
  });
  let userIn = await getUserNameByid(trade.id_trader);
  let pseudo = userIn.pseudo;
  let buttonAccept = "";
  if (user && user.id != trade.id_trader) {
    buttonAccept = ` <button type="button" id="${trade.id}" class="btn btn-primary acceptButton">Accept Trade</button> `;
  } else if (user && user.id == trade.id_trader) {
    buttonAccept = ` <button type="button" id="${trade.id}" class="btn btn-danger cancelButton">Cancel Trade</button> `;
  }
  if (trade.status != "Accept" && trade.status != "Cancel") {
    return `<!--Card Start-->
         <div>
         <table>
            <thead>
                <tr>
                    <th style="text-align:center"> Offer by : ${pseudo} Status : ${trade.status}</th>
                </tr>
            </thead>
            <tbody >
                <tr>
                  <td>
                    ${buttonAccept}
                  </td>
                </tr>
                <tr >
                <td>Proposition</td>  
                  ${tdhtmlproposition}
                </tr>
                <tr>
                <td>Requested</td>  
                  ${tdhtmlrequest}
                </tr>
                
            
            </tbody>
           </table>   
              
              
              
            </p>
          </div>

  <!--Card End-->`;
  } else {
    return "";
  }
};
async function findMyCollections() {
  let user = getSessionObject("user");

  const response = await fetch("/api/users/collection/" + user.id, {
    method: "GET",
    cache: "no-cache",
    cache: "no-store",
  });
  if (!response.ok) {
    console.error("response ko !");
  }
  let pokemons = await response.json();
  return pokemons.filter((pokemon) => pokemon.base != undefined);
}
async function findCollectionsIDontOwn() {
  let user = getSessionObject("user");

  const response = await fetch(
    "/api/users/collection/" + user.id + "/dontown",
    {
      method: "GET",
      cache: "no-cache",
      cache: "no-store",
    }
  );
  if (!response.ok) {
    console.error("response ko !");
  }
  let pokemons = await response.json();
  return pokemons.filter((pokemon) => pokemon.base != undefined);
}

const loadingAndDisplay = (array) => {
  let requestsHtml = document.getElementById("requestList");
  requestsHtml.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    if (i < array.length) {
      const element = array[i];
      let tableRow = `
    <tr id="${element.id}" class="requestsPokemonList">
      <th id="${element.id}" >${element.name.english}</th>
      <th id="${element.id}" ><img style="width:50px"  src="${element.hires}"></th>
    </tr>
  `;

      requestsHtml.innerHTML += tableRow;
    }
  }
};
const TradingPage = async () => {
  window.onscroll = null;
  let user = getSessionObject("user");

  if (!user) {
    return Redirect("/login");
  }
  main.innerHTML = "";
  main.innerHTML += tabs;

  main.innerHTML += containerHtml;
  const container = document.querySelector("#container");

  const filterButton1 = document.querySelectorAll(".filterButton1");
  filterButton1.forEach((item) => {
    item.addEventListener("click", filterby.bind(event, item.name, item.id));
  });

  if (showCreateTrades == true) {
    main.innerHTML += formAddTrade;
    let propositions = [];
    let requests = [];
    let myCollections = await findMyCollections();
    let listPropositionPokemonAAfficher = myCollections;
    let collectionsUserDontOwn = await findCollectionsIDontOwn();
    let collectionsUserDontOwnDisplay = collectionsUserDontOwn;
    //Propositions
    let myCollectionsPokemons = "";
    let list = document.createElement("div");
    list.className = "propositions";
    list.style = "background:rgb(245, 245, 245, 0.7);";
    listPropositionPokemonAAfficher.forEach((element) => {
      myCollectionsPokemons += `<div id="${element.id}" class="imageMyCollections" style="border : 0.5px solid; border-color:green"><p class="text-center text-success">${element.name.english}</p><img style="width:100px"  src="${element.hires}" ></div>`;
    });
    list.innerHTML += myCollectionsPokemons;
    const container = document.getElementById("propositionsContainer");
    container.appendChild(list);
    container.innerHTML += `<p>Choose the cards you wish to offer in exchange</p>`;
    customSlick(".propositions");

    const propositionsList =
      document.getElementsByClassName("imageMyCollections");
    for (const propositionsPokemon of propositionsList) {
      propositionsPokemon.addEventListener("click", function () {
        propositions[propositions.length] = propositionsPokemon.id;
        propositionsPokemon.style.display = "none";
        let table = document.getElementById("propositionsTable");
        if (
          table.children[0].children[0].textContent == "propositions list empty"
        ) {
          table.innerHTML = "";
        }
        let pokemonName = propositionsPokemon.children[0].textContent;
        let pokemonSrc = propositionsPokemon.children[1].src;
        let tableRow = `
            <tr>
              <th>${pokemonName}</th>
              <th><img style="width:50px" src="${pokemonSrc}"></th>
            </tr>`;
        table.innerHTML += tableRow;
        //supprime de la collection actuel
        let index = listPropositionPokemonAAfficher.findIndex(
          (a) => a.id == propositionsPokemon.id
        );
        if (index < 0) return;
        listPropositionPokemonAAfficher.splice(index, 1);
      });
    }

    let inputRequest = document.getElementById("requestsFilter");
    inputRequest.addEventListener("keyup", (e) => {
      collectionsUserDontOwnDisplay = collectionsUserDontOwn;
      collectionsUserDontOwnDisplay = collectionsUserDontOwnDisplay.filter(
        (element) =>
          e.target.value.length != 0 &&
          element.name.english
            .toLowerCase()
            .startsWith(e.target.value.toLowerCase())
      );
      loadingAndDisplay(collectionsUserDontOwnDisplay);
      //ici
      const requestsPokemonList = document.getElementsByClassName(
        "requestsPokemonList"
      );

      for (const requestPokemon of requestsPokemonList) {
        requestPokemon.addEventListener("click", function () {
          requests[requests.length] = requestPokemon.id;
          requestPokemon.style.display = "none";
          let table = document.getElementById("requestsTable");
          if (
            table.children[0].children[0].textContent ==
            "propositions list empty"
          ) {
            table.innerHTML = "";
          }
          let pokemonName = requestPokemon.children[0].textContent;
          let tableRow = `
        <tr >
          <th>${pokemonName}</th>
          <th><img style="width:50px" src="${requestPokemon.children[1].children[0].src}"/></th>
        </tr>`;
          table.innerHTML += tableRow;
          //supprime de la collection actuel
          let index = collectionsUserDontOwn.findIndex(
            (a) => a.id == requestPokemon.id
          );
          if (index < 0) return;
          collectionsUserDontOwn.splice(index, 1);
        });
      }
    });
    let trade = document.getElementById("addTrade");
    trade.addEventListener("click", () => {
      fetch("/api/trades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
        body: JSON.stringify({
          idTrader: user.id,
          requests: requests,
          propositions: propositions,
        }),
      })
        .then((response) => {
          showAll = true;
          showCreateTrades = false;
          return Redirect("/trading");
        })
        .then((result) => {})
        .catch((error) => console.error("error", error));
    });
  } else if (showAll == true) {
    async function findAllTrades() {
      const response = await fetch("/api/trades", {
        method: "GET",
      });
      if (!response.ok) {
        console.error("reponse KO");
      }
      tradesList = await response.json();
      let divRow = document.createElement("div");
      divRow.className = "row";
      divRow.style =
        "background:rgb(245, 245, 245, 0.7); border: solid; border-radius : 10px; border-width:0.3px";
      container.appendChild(divRow);
      displayRow(divRow);
    }
    findAllTrades();
  }
  // get all nav-link items
  let tabsTag = document.getElementsByClassName("nav-link");
  // filter all nav-link item by id
  let tabsTagFiltered = [].filter.call(tabsTag, (e) => e.id != "");
  // tabsTagFiltered[0] = nav link id = All
  tabsTagFiltered[0].addEventListener("click", () => {
    tabsTagFiltered[0].className = "nav-link active";
    tabsTagFiltered[1].className = "nav-link";

    showAll = true;
    showCreateTrades = false;
  });
  // tabsTagFiltered[1] = nav link id = myTrade
  tabsTagFiltered[1].addEventListener("click", () => {
    tabsTagFiltered[0].className = "nav-link";
    tabsTagFiltered[1].className = "nav-link active";
    showAll = false;
    showCreateTrades = true;
  });
};
// slick library working with jQuery
const customSlick = (className) => {
  $(className).slick({
    dots: false,
    infinite: false,
    speed: 200,
    slidesToShow: 15,
    slidesToScroll: 10,
    lazyLoad: "ondemand",
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  });
};
const displayRow = async (divRow) => {
  let user = getSessionObject("user");

  let cardsHtml = "";
  for (let i = 0; i < tradesList.length; i++) {
    let trade = tradesList[i];

    cardsHtml += await tradesCardHtml(trade);
    divRow.innerHTML = cardsHtml;
    let acceptbutton = document.getElementsByClassName("acceptButton");
    for (let index = 0; index < acceptbutton.length; index++) {
      const element = acceptbutton[index];
      element.addEventListener(
        "click",
        acceptOffer.bind(event, element.id, user.id)
      );
    }
    let cancelbutton = document.getElementsByClassName("cancelButton");
    for (let index = 0; index < cancelbutton.length; index++) {
      const element = cancelbutton[index];
      element.addEventListener("click", cancelOffer.bind(event, element.id));
    }
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
const getTradePlusPokeObject = async (id, reqOrProp) => {
  try {
    const options = {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
    };

    const response = await fetch("/api/trades/" + id + "/" + reqOrProp); // fetch return a promise => we wait for the response

    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }

    let returnedId;
    returnedId = await response.json(); // json() returns a promise => we wait for the data
    return returnedId;
  } catch (error) {
    console.error("LoginPage::error: ", error);
  }
};
const getUserNameByid = async (id) => {
  try {
    const options = {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
    };

    const response = await fetch("/api/users/" + id); // fetch return a promise => we wait for the response

    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }

    let returnedId;
    returnedId = await response.json(); // json() returns a promise => we wait for the data
    return returnedId;
  } catch (error) {
    console.error("LoginPage::error: ", error);
  }
};
const acceptOffer = async (idTrade, idAcceptor) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify({ id: idTrade, id_acceptor: idAcceptor }),
    };

    const response = await fetch("/api/trades/accept", options); // fetch return a promise => we wait for the response

    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }

    // json() returns a promise => we wait for the data
    return Redirect("/trading");
  } catch (error) {
    Swal.fire({
      title: "Cannot accept this offer",
      timerProgressBar: true,
    });
  }
};
const cancelOffer = async (idTrade) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
    };

    const response = await fetch("/api/trades/cancel/" + idTrade, options); // fetch return a promise => we wait for the response

    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }

    // json() returns a promise => we wait for the data
    return Redirect("/trading");
  } catch (error) {
    Swal.fire({
      title: "Cannot cancel this offer",
      timerProgressBar: true,
    });
  }
};
export default TradingPage;
