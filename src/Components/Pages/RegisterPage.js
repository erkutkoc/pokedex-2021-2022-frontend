import { Redirect } from "../Router/Router";
import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
import { setSessionObject } from "../../utils/session";
import Navbar from "../Navbar/Navbar";
import Swal from "sweetalert2";

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
  window.onscroll = null;
  let userSession = getSessionObject("user");
  if (userSession) {
    return Redirect("/");
  }

  const main = document.querySelector("main");
  main.innerHTML = "";
  showRegisterForm("", "");

  async function showRegisterForm(placeHolderEmail, placeHolderPseudo) {
    const { value: formValues } = await Swal.fire({
      title: "Register",
      html:
        `<input id="email" name="email" class="swal2-input" placeholder = "Email" value = "${placeHolderEmail}">` +
        `<input id="pseudo" name="email" class="swal2-input" placeholder = "Pseudo" value = "${placeHolderPseudo}" >` +
        `<input id="password" type = "password" name="email" class="swal2-input" placeholder = "Password">` +
        `<input  name="password-repeat" type="password"  id="password-repeat" placeholder="Password (repeat)" class="swal2-input" placeholder = "Mot De Passe">`,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        let email = document.getElementById("email").value;
        let pseudo = document.getElementById("pseudo").value;
        let password = document.getElementById("password").value;
        let password_reapeat = document.getElementById("password-repeat").value;
        return onSubmit(email, pseudo, password, password_reapeat);
      },
      allowEnterKey: true,
    });
  }
  async function onSubmit(mail, pseudop, passwordp, password_reapeatp) {
    const email = mail;
    const pseudo = pseudop;
    const password = passwordp;
    const password_repeat = password_reapeatp;

    //check si les deux mdp sont bien équivalent
    if (password != password_repeat) {
      Swal.fire({
        icon: "error",
        title: "password aren't the same",
        confirmButtonText: "Try again",
      }).then(() => {
        showRegisterForm(email, pseudo);
      });

      throw new Error("Password doesn't match");
    }
    try {
      const options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({
          email: email,
          pseudo: pseudo,
          password: password,
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
      // save the user into the localStorage
      setSessionObject("user", user);

      // Rerender the navbar for an authenticated user
      Navbar();

      // call the HomePage via the Router
      Redirect("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error on account creation",
        confirmButtonText: "Try again",
      }).then(() => {
        showRegisterForm("", "");
      });
      console.error("RegisterPage::error: ", error);
    }
  }
};

export default RegisterPage;
