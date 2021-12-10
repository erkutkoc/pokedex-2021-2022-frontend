import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
import { Redirect } from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { setSessionObject } from "../../utils/session";
import Swal from "sweetalert2";
import * as Vibrant from "node-vibrant";

//var ColorThief = require('color-thief');

/**
 * Render the Shop Page
 */

const shopPage = `
 <section></section>
 <div class="container">
     <div class="row">
         <div class="col-md-4 text-center text-secondary" style="border-radius: 6px;border: 1px solid var(--bs-blue);">
             <div class="text-center" style="color: var(--bs-blue);">
                 <figure class="figure"><img class="img-fluid figure-img" style="width: auto;height: auto;" src="http://127.0.0.1:8887/pokeball.png">
                     <figcaption class="figure-caption">Booster 1</figcaption>
                 </figure>
                 <p>Description du booster, 5 cartes...</p>
             </div>
             <div  id="pack1"; style="text-align: center;"><button class="btn border rounded-0" data-bss-hover-animate="pulse" type="submit" value="booster1" name="-1000" style="background: #ffde00;text-align: center;width: 330px;height: auto;">1000 coins</button></div><strong class="text-center"></strong>
         </div>
 </div>`;

const ShopPage = () => {
  let userSession = getSessionObject("user");
  if (!userSession) {
    return Redirect("/login");
  }

  const main = document.querySelector("main");
  main.innerHTML = shopPage;

  const pack1 = document.getElementById("pack1");
  pack1.addEventListener(
    "click",
    onSubmitPack1.bind(event, pack1.children[0].name)
  );

  async function onSubmitPack1(cost) {
    const id = userSession.id;

    const packcoins = cost;
    const options2 = {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify({
        coins: packcoins,
      }), // body data type must match "Content-Type" header
      headers: {
        "Content-Type": "application/json",
        Authorization: userSession.token,
      },
    };

    const achat = await fetch("/api/coins/" + id, options2); // fetch return a promise => we wait for the achat

    if (!achat.ok) {
      throw new Error(
        "fetch error : " + achat.status + " : " + achat.statusText
      );
    } else {
      const user = await achat.json(); // json() returns a promise => we wait for the data
      console.log("user authenticated", user);
      // save the user into the localStorage with the new coins value
      userSession.coins = user.coins;
      setSessionObject("user", userSession);

      const options = {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          Authorization: userSession.token,
        },
      };

      const response = await fetch("/api/pokemons/random/5/" + id, options); // fetch return a promise => we wait for the response

      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }

      let openedBooster = await response.json(); // json() returns a promise => we wait for the data

      let openedBoosterHtml = `<container>`;
      let divRow = `<div class="row">`;
      let carte = "";
      openedBoosterHtml += divRow;
      let row = 0;
      for (let element of openedBooster) {
        let hex = "";
        const promise = await Vibrant.from(element.hires)
          .getPalette()
          .then((palette) => (hex = palette.DarkMuted.hex));
   
        carte += `
          <!--carte-->
                    <div class ="card col-md-4"  style=" display: inline-block;width: 30%;border-radius: 15px; margin: 10px; background-color: ${hex}">
                                <p class="type" style=" position: relative;color: black;text-transform: uppercase;width: fit-content;background: #ffef3b;border-style: solid;left:0.5em;top:0.5em;border-color: #fcad03;border-radius: 10px" >${element.type}</p>
                                <h2 class="name" style="text-align: center;font-size: 1.5em;font-weight: 700; letter-spacing: 0.02em;color:white;">${element.name.french}</h2>
                                <figure class="figure"style="padding: 0 25% 0 25%;"><img class="img-fluid figure-img" style="max-height: 150px;margin: auto;display: inline-block;" src="${element.hires}"> </figure>
                                    <div class="cardText">
                                        <div class="StatsContainer" style="display: flex;justify-content: space-between;  background-color: #f2d785">
                                            <div class="statList" style="margin:auto">
                                                <p class ="stats" style="font-size: 12px">attaque \n : ${element.base.Attack} </p>
                                                <p class ="stats" style="font-size: 12px">defense \n : ${element.base.Defense}</p>
                                                <p class ="stats" style="font-size: 12px">vitalite \n : ${element.base.HP} </p> 
                                            </div>
                                            <div class="statList" style="margin:auto">
                                                <p class ="stats" style="font-size: 12px">attaque SP. \n : ${element.base.SpAttack} </p>
                                                <p class ="stats" style="font-size: 12px">defense SP. \n : ${element.base.SpDefense} </p>
                                                <p class ="stats" style="font-size: 12px">vitesse \n : ${element.base.Speed}</p>
                                            </div>
                                        </div>
                                        <div class="movesContainer" style="display: flex;justify-content: space-between;">
                                            <p class =moves> Move 1 </p>
                                            <p class =moves> Move 2 </p>
                                        </div>
                                        <div class="pokemonDescription" style="background-color: #fff1c7; font-size: 10px">
                                            <p class =description> 
                                            ${element.description}
                                            </p>
                                        </div>
                                    </div>
                            </div> <!--fin carte-->`;
      }
      openedBoosterHtml += carte;
      openedBoosterHtml += "</div></container>";
      Swal.fire({
        title: "Voici votre Booster ! ",
        html: openedBoosterHtml,
        width: 1000,
      });

      Navbar();
    }
    //---
  }
};

export default ShopPage;
