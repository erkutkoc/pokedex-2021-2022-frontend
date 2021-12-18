import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
import { Redirect } from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { setSessionObject } from "../../utils/session";
/**
 * Render the trading page
 */

let tradesList = [];
let showMyTrades = false;
let showCreateTrades = false;
let showAll = true;
let user = getSessionObject("user");
const main = document.querySelector("main");
const tabs = `<ul class="nav nav-tabs justify-content-center">
  <li class="nav-item">
    <a class="nav-link" aria-current="page" name="tabs" id="all" href="#">All</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="myTrade" href="#">My Trades</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="create" href="#">Create</a>
  </li>
  </ul>`;
const formAddTrade = `
<div class="container-fluid h-100 bg-light text-dark">
    <hr />
    <form action="">
        <div class="row justify-content-center align-items-center h-100">
            <div class="col col-9">
                <div class="form-group">
                    <div class="container" id="propositionsContainer">
                        <p>Propositions</p>
                        <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Write pokemon name..."
                            aria-label="Write pokemon name..." aria-describedby="basic-addon2" />
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button">
                                Reset
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div class="col col-3">
                <div class="table-wrapper-scroll-y my-custom-scrollbar">
                    <table class="table table-bordered table-striped mb-0">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Photo</th>
                            </tr>
                        </thead>
                        <tbody id="requestList">
                            <tr>
                                <td>Mark</td>
                                <td>Otto</td>
                            </tr>
                            <tr>
                                <td>Mark</td>
                                <td>Otto</td>
                            </tr>
                            <tr>
                                <td>Jacob</td>
                                <td>Thornton</td>
                            </tr>
                            <tr>
                                <td>Larry</td>
                                <td>the Bird</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
            <div class="row justify-content-center align-items-center h-100"></div>
            <div class="col col-9">
                <div class="form-group">
                    <div class="container" id="RequestsContainer">
                        <p>Requests</p>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Write pokemon name..."
                                aria-label="Write pokemon name..." aria-describedby="basic-addon2" />
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button">
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col col-3">
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
            <table class="table table-bordered table-striped mb-0">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Photo</th>
                    </tr>
                </thead>
                <tbody id="requestList">
                    <tr>
                        <td>Mark</td>
                        <td>Otto</td>
                    </tr>
                    <tr>
                        <td>Mark</td>
                        <td>Otto</td>
                    </tr>
                    <tr>
                        <td>Jacob</td>
                        <td>Thornton</td>
                    </tr>
                    <tr>
                        <td>Larry</td>
                        <td>the Bird</td>
                    </tr>
                </tbody>
            </table>

        </div>
            </div>
        </div>
    </form>
</div>
`;
const containerHtml = `<div class="container" id="container"></div>`;
const filter = `<!--Filter-->
  <div class="container" >
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
async function findMyCollections() {
  const response = await fetch("/api/users/collection/" + user.id, {
    method: "GET",
    cache: "no-cache",
    cache: "no-store",
  });
  if (!response.ok) {
    console.log("response ko !");
  }
  let pokemons = await response.json();
  return pokemons.filter((pokemon) => pokemon.base != undefined);
}
async function findCollectionsIDontOwn() {
  const response = await fetch("/api/users/collection/" + user.id + "/dontown", {
    method: "GET",
    cache: "no-cache",
    cache: "no-store",
  });
  if (!response.ok) {
    console.log("response ko !");
  }
  let pokemons = await response.json();
  return pokemons.filter((pokemon) => pokemon.base != undefined);
}
const showMyCollections = async () => {
  let myCollections = await findMyCollections();
  let list = document.createElement("div");
  list.className = "propositions";
  myCollections.forEach((element) => {
    list.innerHTML += `<div id="${element.id}"><p id="${element.id}">${element.name.french}</p><img id="${element.id}" style="width:100px" loading="lazy" data-lazy="${element.hires}" class="img-thumbnail"><p></p></div>`;
  });
  const container = document.getElementById("propositionsContainer");
  container.appendChild(list);
  container.innerHTML += `<p>Choose the cards you wish to offer in exchange</p>`;
  console.log(main);
  customSlick(".propositions");
};
const showRequestsCollections = async() => {
  let requests = await findCollectionsIDontOwn();
  let list = document.createElement("div");
  list.className = "requests";
  requests.forEach((element) => {
    list.innerHTML += `<div id="${element.id}"><p>${element.name.french}</p><img style="width:100px" loading="lazy" data-lazy="${element.hires}" class="img-thumbnail"><p></p></div>`;
  });
  const container = document.getElementById("RequestsContainer");
  container.appendChild(list);
  console.log(main);
  customSlick(".requests");
};
const TradingPage = async () => {
  if (!user) {
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

  if (showCreateTrades == true) {
    main.innerHTML += formAddTrade;
    showMyCollections();
    //showRequestsCollections();
  } else if (showAll == true) {
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
    const container1 = document.querySelector("#container");
    container1.innerHTML = "";
    async function findMyTrades() {
      const response = await fetch("/api/trades/" + user.id, {
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
    tabsTagFiltered[2].className = "nav-link";
    showAll = true;
    showMyTrades = false;
    showCreateTrades = false;
  });
  // tabsTagFiltered[1] = nav link id = myTrade
  tabsTagFiltered[1].addEventListener("click", () => {
    tabsTagFiltered[0].className = "nav-link";
    tabsTagFiltered[1].className = "nav-link active";
    tabsTagFiltered[2].className = "nav-link";
    showAll = false;
    showMyTrades = true;
    showCreateTrades = false;
  });
  tabsTagFiltered[2].addEventListener("click", () => {
    tabsTagFiltered[0].className = "nav-link";
    tabsTagFiltered[1].className = "nav-link";
    tabsTagFiltered[2].className = "nav-link active";
    showAll = false;
    showMyTrades = false;
    showCreateTrades = true;
  });
};
const customSlick = (className) => {
  $(className).slick({
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 15,
    slidesToScroll: 10,
    lazyLoad: 'ondemand',
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
  //console.log("displayRow")
  let cardsHtml = "";
  for (let i = 0; i < tradesList.length; i++) {
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
