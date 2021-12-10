import { Redirect } from "../Router/Router";
import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
import { setSessionObject } from "../../utils/session";
import Navbar from "../Navbar/Navbar";
/**
 * Render the RegisterPage
 */

const registerPage = `
 <section class="register-dark">
        <form class="d-inline" method="post" style="background: var(--bs-body-bg);">
            <h2 class="text-center" style="color: var(--bs-danger);">Register</h2>
            <div class="illustration"><i class="icon ion-ios-locked-outline" style="color: var(--bs-red);"></i></div>
            <div class="mb-3">
                <label for="email"> Votre email</label>
                <input class="form-control" type="email" name="email" id="email" placeholder="Email" >
            </div>
            <div class="mb-3">
                <label for="pseudo"> Votre pseudo</label>
                <input class="form-control" type="text" name="pseudo" id="pseudo" placeholder="Pseudo">
            </div>
            <div class="mb-3">
                <label for="password"> Votre mot de passe</label>
                <input class="form-control" type="password" name="password" id="password" placeholder="Password">
            </div>
            <div class="mb-3 " >
            <label for="password-repeat"> Entrez le mot de passe à nouveau</label>
                <input class="form-control" type="password" name="password-repeat" id="password-repeat" placeholder="Password (repeat)">
            </div>
            <span id='message' style="color:red;"></span>
            <br/>
            <br/>
            <div class="mb-3">
                <div class="form-check"><label class="form-check-label" style="color: var(--bs-indigo);"><input class="form-check-input" type="checkbox" >I agree to the license terms.</label></div>
                </div>
                <div class="mb-3"><button class="btn btn-primary d-block w-100" type="submit" style="color: var(--bs-white);background: var(--bs-danger);">Sign Up</button></div><a class="already" href="/login">You already have an account? Login here.</a>
        </form>
    </section>`;

const RegisterPage = () => {
  let userSession = getSessionObject("user");
  console.log(userSession, "user");
  if (userSession) {
    return Redirect("/");
  }

  const main = document.querySelector("main");
  main.innerHTML = registerPage;

  const form = main.querySelector("form");
  form.addEventListener("submit", onSubmit);

  async function onSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("email");
    const pseudo = document.getElementById("pseudo");
    const password = document.getElementById("password");
    const password_repeat = document.getElementById("password-repeat");

    console.log(
      "credentials",
      email.value,
      pseudo.value,
      password.value,
      password_repeat.value
    );

    //check si les deux mdp sont bien équivalent
    if (password.value != password_repeat.value) {
      const message = document.getElementById("message");
      message.innerHTML = "Password doesn't match";
      password.style = "border:2px solid red;";
      password_repeat.style = "border:2px solid red;";

      throw new Error("Password doesn't match");
    }

    try {
      const options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({
          email: email.value,
          pseudo: pseudo.value,
          password: password.value,
        }), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("/api/auths/register", options); // fetch return a promise => we wait for the response

      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const user = await response.json(); // json() returns a promise => we wait for the data
      console.log("user authenticated", user);
      // save the user into the localStorage
      setSessionObject("user", user);

      // Rerender the navbar for an authenticated user
      Navbar();

      // call the HomePage via the Router
      Redirect("/");
    } catch (error) {
      console.error("RegisterPage::error: ", error);
    }
  }
};

export default RegisterPage;
