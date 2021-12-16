import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
import { Redirect } from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { setSessionObject } from "../../utils/session";
/**
 * Render the trading page
 */

let tradesList = [];
var showMyTrades = false;

const main = document.querySelector("main");
const tabs = `<ul class="nav nav-tabs justify-content-center">
  <li class="nav-item">
    <a class="nav-link" aria-current="page" name="tabs" id="all" href="#">All</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="myTrade" href="#">My Trades</a>
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
const tradesCardHtml = (trade) => {
  //console.log(trade)
  return `<!--Card Start-->
         <div>
            <p> 
              id_trader = ${trade.id_trader} 
              requestId = ${trade.requests} 
              
            </p>
          </div>

  <!--Card End-->`;
};
const TradingPage = async () => {
  let userSession = getSessionObject("user");
  if (!userSession) {
    return Redirect("/login");
  }
  main.innerHTML = "";
  main.innerHTML += tabs;
  main.innerHTML += filter;
  main.innerHTML += containerHtml;
  const container = document.querySelector("#container");

  const filterButton1 = document.querySelectorAll(".filterButton1");
  filterButton1.forEach((item) => {
    item.addEventListener("click", filterby.bind(event, item.name, item.id));
  });

  if (showMyTrades == false) {
    console.log("all");
    async function findAllTrades() {
      const response = await fetch("/api/trades", {
        method: "GET",
      });
      if (!response.ok) {
        console.log("response ko !");
      }

      tradesList = await response.json();
 
      let divRow = document.createElement("div");
      divRow.className = "row";
      container.appendChild(divRow);
      displayRow(divRow);
    }
    findAllTrades();
  } else {
    console.log("my");
    console.log(showMyTrades);
    const container1 = document.querySelector("#container");
    container1.innerHTML = "";
    let userSession = getSessionObject("user");
    console.log(userSession, "user");
    async function findMyTrades() {
      const response = await fetch("/api/trades/" + userSession.id, {
        method: "GET",
      });
      if (!response.ok) {
        console.log("response ko !");
      }

      tradesList = await response.json();
      console.log("test" + tradesList);
      
      let divRow = document.createElement("div");
      divRow.className = "row";
      container.appendChild(divRow);
      displayRow(divRow);
    }
    findMyTrades();
  }

  // get all nav-link items
  let tabsTag = document.getElementsByClassName("nav-link");
  // filter all nav-link item by id
  let tabsTagFiltered = [].filter.call(tabsTag, (e) => e.id != "");
  // tabsTagFiltered[0] = nav link id = All
  tabsTagFiltered[0].addEventListener("click", () => {
    tabsTagFiltered[0].className = "nav-link active";
    tabsTagFiltered[1].className = "nav-link";
    showMyTrades = false;
  });
  // tabsTagFiltered[1] = nav link id = myTrade
  tabsTagFiltered[1].addEventListener("click", () => {
    tabsTagFiltered[0].className = "nav-link";
    tabsTagFiltered[1].className = "nav-link active";
    showMyTrades = true;
  });
};

const displayRow = async (divRow) => {
  //console.log("displayRow")
  let cardsHtml = "";
    for(let i = 0; i < tradesList.length; i++){
        let trade = tradesList[i];

        cardsHtml += tradesCardHtml(trade);
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

export default TradingPage;
