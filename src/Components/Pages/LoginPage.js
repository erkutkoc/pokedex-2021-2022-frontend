import { Redirect } from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { setSessionObject } from "../../utils/session";
import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
import Swal from "sweetalert2";

/**
 * Render the LoginPage
 */

// const loginPage = `
//  <section class="login-dark">
//         <form class="d-inline" method="post" style="background: var(--bs-body-bg);">
//             <h2 class="text-center" style="color: var(--bs-danger);">Login</h2>
//             <div class="illustration"><i class="icon ion-ios-locked-outline" style="color: var(--bs-red);"></i></div>
//             <div class="mb-3">
//                 <label for="email"> Votre email</label>
//                 <input class="form-control" type="email" name="email" id="email" placeholder="Email" >
//             </div>
//             <div class="mb-3">
//                 <label for="password"> Votre mot de passe</label>
//                 <input class="form-control" type="password" name="password" id="password" placeholder="Password">
//             </div>
//             <span id='message' style="color:red;"></span>
//             <br/>
//             <br/>
//             <div class="mb-3"><button class="btn btn-primary d-block w-100" type="submit" style="background: var(--bs-red);">Log In</button></div><a class="forgot" href="#" style="color: var(--bs-danger);">Forgot your email or password?</a>
//         </form>
//     </section>`;

const LoginPage = () => {
  let userSession = getSessionObject("user");
  if (userSession) {
    return Redirect("/");
  }
  const main = document.querySelector("main");
  showLoginForm();
  main.innerHTML = "";

  //const form = main.querySelector("form");
  //form.addEventListener("submit", onSubmit);
  async function showLoginForm() {
    const { value: formValues } = await Swal.fire({
      title: "Login",
      html:
        '<input id="email" name="email" class="swal2-input" placeholder = "Email">' +
        '<input id="password" type = "password" name="password" class="swal2-input" placeholder = "Mot De Passe">',
      showLoaderOnConfirm: true,
      allowEnterKey: true,

      preConfirm: () => {
        return onSubmit(
          document.getElementById("email").value,
          document.getElementById("password").value
        );
      },
      allowEnterKey: true,
    });
  }
  // document.getElementById("email").value,
  // document.getElementById("password").value,

  async function onSubmit(mail, mdp) {
    const email = mail;
    const password = mdp;

    try {
      const options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({
          email: email,
          password: password,
        }), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/auths/login", options); // fetch return a promise => we wait for the response

      if (!response.ok) {
        const message = document.getElementById("message");
        //HTML = "Email or password doesn't match";
        Swal.fire({
          icon: "error",
          title: "Email or password doesn't match",
          confirmButtonText: "Try again",
        }).then(() => {
          showLoginForm();
        });

        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const user = await response.json(); // json() returns a promise => we wait for the data
      // save the user into the localStorage
      setSessionObject("user", user);
      // Rerender the navbar for an authenticated user
      Navbar();
      // call the HomePage via the Router
      Redirect("/");
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
        title: "Loged in successfully",
      });
    } catch (error) {
      console.error("LoginPage::error: ", error);
    }
  }
};

export default LoginPage;
