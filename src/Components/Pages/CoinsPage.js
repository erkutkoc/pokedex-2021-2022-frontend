import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
import { Redirect } from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { setSessionObject } from "../../utils/session";
import Swal from "sweetalert2";

/**
 * Render the Coins Page
 */

const coinsPage = `
 <section></section>
 <div class="container">
     <div class="row">
         <div id="pack1" class="col-md-4 text-center text-secondary" style="border-radius: 6px;border: 1px solid ; border-color: #6f7a85; background: rgba(255,255,255,50%); ">
             <div class="text-center" style="color: var(--bs-blue);">
                 <figure class="figure"><img class="img-fluid figure-img" style="width: auto;height: auto;" src="https://github.com/erkutkoc/pokedex-2021-2022-frontend/blob/main/src/assets/img/coins.png?raw=true">
                     <figcaption class="figure-caption">Pack 1</figcaption>
                 </figure>
                 <p>Ce pack vous donne 100 Coins</p>
             </div>
             <div style="text-align: center;"><button class="btn border rounded-0" data-bss-hover-animate="pulse" type="button" style="background: #ffde00;text-align: center;width: 330px;height: auto;">Free</button></div><strong class="text-center"></strong>
         </div>

         <div id="pack2" class="col-md-4 text-center text-secondary" style="border-radius: 6px;border: 1px solid ; border-color: #6f7a85; background: rgba(255,255,255,50%); ">
             <div class="text-center" style="color: var(--bs-blue);">
                 <figure class="figure"><img class="img-fluid figure-img" style="width: auto;height: auto;" src="https://github.com/erkutkoc/pokedex-2021-2022-frontend/blob/main/src/assets/img/coins.png?raw=true">
                     <figcaption class="figure-caption">Pack 2</figcaption>
                 </figure>
                 <p>Ce pack vous donne 1000 Coins</p>
             </div>
             <div style="text-align: center;"><button class="btn border rounded-0" data-bss-hover-animate="pulse" type="button" style="background: #ffde00;text-align: center;width: 330px;height: auto;">Free</button></div><strong class="text-center"></strong>
         </div>

         <div id="pack3" class="col-md-4 text-center text-secondary" style="border-radius: 6px;border: 1px solid ; border-color: #6f7a85; background: rgba(255,255,255,50%); ">
             <div class="text-center" style="color: var(--bs-blue);">
                 <figure class="figure"><img class="img-fluid figure-img" style="width: auto;height: auto;" src="https://github.com/erkutkoc/pokedex-2021-2022-frontend/blob/main/src/assets/img/coins.png?raw=true">
                     <figcaption class="figure-caption">Pack 3</figcaption>
                 </figure>
                 <p>Ce pack vous donne 10 000 Coins</p>
             </div>
             <div style="text-align: center;"><button class="btn border rounded-0" data-bss-hover-animate="pulse" type="button" style="background: #ffde00;text-align: center;width: 330px;height: auto;">Free</button></div><strong class="text-center"></strong>
         </div>
     </div>
 </div>`;

const CoinsPage = () => {
  let userSession = getSessionObject("user");
  console.log(userSession, "user");
  if (!userSession) {
    return Redirect("/login");
  }

  const main = document.querySelector("main");
  main.innerHTML = coinsPage;

  const pack1 = document.getElementById("pack1");
  pack1.addEventListener("click", onSubmitPack1);

  const pack2 = document.getElementById("pack2");
  pack2.addEventListener("click", onSubmitPack2);

  const pack3 = document.getElementById("pack3");
  pack3.addEventListener("click", onSubmitPack3);

  async function onSubmitPack1(e) {
    e.preventDefault();
    try {
      const id = userSession.id;
      console.log(id, "id user");

      const packCoins = 100;

      console.log("packCoins", packCoins);

      const options = {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({
          coins: packCoins,
        }), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
          Authorization: userSession.token,
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
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Coins successfuly added to your account !",
    });
  }

  async function onSubmitPack2(e) {
    e.preventDefault();
    try {
      const id = userSession.id;
      console.log(id, "id user");

      const packCoins = 1000;

      console.log("packCoins", packCoins);

      const options = {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({
          coins: packCoins,
        }), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
          Authorization: userSession.token,
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
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Coins successfuly added to your account !",
    });
  }

  async function onSubmitPack3(e) {
    e.preventDefault();
    try {
      const id = userSession.id;
      console.log(id, "id user");

      const packCoins = 10000;

      console.log("packCoins", packCoins);

      const options = {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({
          coins: packCoins,
        }), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
          Authorization: userSession.token,
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
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Coins successfuly added to your account !",
    });
  }
};

export default CoinsPage;
