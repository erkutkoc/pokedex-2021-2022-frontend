import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
import { Redirect } from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { setSessionObject } from "../../utils/session";
/**
 * Render the Coins Page
 */

 const coinsPage = `
 <section></section>
 <div class="container">
     <div class="row">
         <div id="pack1" class="col-md-4 text-center text-secondary" style="border-radius: 6px;border: 1px solid var(--bs-blue);">
             <div class="text-center" style="color: var(--bs-blue);">
                 <figure class="figure"><img class="img-fluid figure-img" style="width: auto;height: auto;" src="http://127.0.0.1:8887/coins.png">
                     <figcaption class="figure-caption">Pack 1</figcaption>
                 </figure>
                 <p>Ce pack vous donne 100 Coins</p>
             </div>
             <div style="text-align: center;"><button class="btn border rounded-0" data-bss-hover-animate="pulse" type="button" style="background: #ffde00;text-align: center;width: 330px;height: auto;">Free</button></div><strong class="text-center"></strong>
         </div>

         <div id="pack2" class="col-md-4 text-center text-secondary" style="border-radius: 6px;border: 1px solid var(--bs-blue);">
             <div class="text-center" style="color: var(--bs-blue);">
                 <figure class="figure"><img class="img-fluid figure-img" style="width: auto;height: auto;" src="http://127.0.0.1:8887/coins.png">
                     <figcaption class="figure-caption">Pack 2</figcaption>
                 </figure>
                 <p>Ce pack vous donne 1000 Coins</p>
             </div>
             <div style="text-align: center;"><button class="btn border rounded-0" data-bss-hover-animate="pulse" type="button" style="background: #ffde00;text-align: center;width: 330px;height: auto;">Free</button></div><strong class="text-center"></strong>
         </div>

         <div id="pack3" class="col-md-4 text-center text-secondary" style="border-radius: 6px;border: 1px solid var(--bs-blue);">
             <div class="text-center" style="color: var(--bs-blue);">
                 <figure class="figure"><img class="img-fluid figure-img" style="width: auto;height: auto;" src="http://127.0.0.1:8887/coins.png">
                     <figcaption class="figure-caption">Pack 3</figcaption>
                 </figure>
                 <p>Ce pack vous donne 10 000 Coins</p>
             </div>
             <div style="text-align: center;"><button class="btn border rounded-0" data-bss-hover-animate="pulse" type="button" style="background: #ffde00;text-align: center;width: 330px;height: auto;">Free</button></div><strong class="text-center"></strong>
         </div>
     </div>
 </div>`;

 const CoinsPage = () => { 
    const main = document.querySelector("main");
    main.innerHTML = coinsPage; 

    const pack1 = document.getElementById("pack1");
    pack1.addEventListener("click", onSubmitPack1);

    //const pack2 = document.getElementById("pack2");
    //pack2.addEventListener("click", onSubmitPack2);

    //const pack3 = document.getElementById("pack3");
    //pack3.addEventListener("click", onSubmitPack3);
  
    async function onSubmitPack1(e) {
      e.preventDefault();
      try {
          let userSession = getSessionObject("user");
          console.log(userSession, "user");

          const id = userSession.id;
          console.log(id, "id user");

          const packCoins = 200;
          
          console.log("packCoins", packCoins);

          const options = {
              method: "PUT", // *GET, POST, PUT, DELETE, etc.
              body: JSON.stringify({
              coins: packCoins,
              }), // body data type must match "Content-Type" header
              headers: {
              "Content-Type": "application/json",
              
              },
          };

          const response = await fetch("/api/coins/" + id, options); // fetch return a promise => we wait for the response

          if (!response.ok) {
              throw new Error(
              "fetch error : " + response.status + " : " + response.statusText
              );
          }
          const user = await response.json(); // json() returns a promise => we wait for the data
          console.log("user authenticated", user);

          // save the user into the localStorage with the new coins value
          userSession.coins = user.coins;
          setSessionObject("user", userSession);

          // Rerender the navbar to display the new coins value
          Navbar();

          // call the CoinsPage via the Router
          Redirect("/coins");
      } catch (error) {
          console.error("CoinsPage::error: ", error);
      }
    } 
 };
  
  export default CoinsPage;