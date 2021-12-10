import { Redirect } from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { setSessionObject } from "../../utils/session";
import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
/**
 * Render the LoginPage
 */

const loginPage = `
 <section class="login-dark">
        <form class="d-inline" method="post" style="background: var(--bs-body-bg);">
            <h2 class="text-center" style="color: var(--bs-danger);">Login</h2>
            <div class="illustration"><i class="icon ion-ios-locked-outline" style="color: var(--bs-red);"></i></div>
            <div class="mb-3">
                <label for="email"> Votre email</label>
                <input class="form-control" type="email" name="email" id="email" placeholder="Email" >
            </div>
            <div class="mb-3">
                <label for="password"> Votre mot de passe</label>
                <input class="form-control" type="password" name="password" id="password" placeholder="Password">
            </div>
            <span id='message' style="color:red;"></span>
            <br/>
            <br/>
            <div class="mb-3"><button class="btn btn-primary d-block w-100" type="submit" style="background: var(--bs-red);">Log In</button></div><a class="forgot" href="#" style="color: var(--bs-danger);">Forgot your email or password?</a>
        </form>
    </section>`;

const LoginPage = () => {
  let userSession = getSessionObject("user");
  console.log(userSession, "user");
  if (userSession) {
    return Redirect("/");
  }

  const main = document.querySelector("main");
  main.innerHTML = loginPage;

  const form = main.querySelector("form");
  form.addEventListener("submit", onSubmit);

  async function onSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    console.log("credentials", email.value, password.value);

    try {
      const options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/auths/login", options); // fetch return a promise => we wait for the response

      if (!response.ok) {
        const message = document.getElementById("message");
        message.innerHTML = "Email or password doesn't match";
        email.style = "border:2px solid red;";
        password.style = "border:2px solid red;";
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
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
      console.error("LoginPage::error: ", error);
    }
  }
};

export default LoginPage;
