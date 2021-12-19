import { Redirect } from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { setSessionObject } from "../../utils/session";
import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
import Swal from "sweetalert2";

const LoginPage = () => {
  let userSession = getSessionObject("user");
  if (userSession) {
    return Redirect("/");
  }
  const main = document.querySelector("main");
  showLoginForm();
  main.innerHTML = "";

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
      // call the HomePage via the Router
      Redirect("/");
    } catch (error) {
      console.error("LoginPage::error: ", error);
    }
  }
};

export default LoginPage;
