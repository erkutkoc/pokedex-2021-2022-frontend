import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
import { setSessionObject } from "../../utils/session";
import { Redirect } from "../Router/Router";
import Navbar from "../Navbar/Navbar";

/**
 * Render the profil page
 */

const ProfilPage = async () => {
  window.onscroll = null;
  let userSession = getSessionObject("user");
  if (!userSession) {
    return Redirect("/login");
  }
  const userId = userSession.id;
  const pageDiv = document.querySelector("main");

  try {
    const options = {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        Authorization: userSession.token,
      },
    };
    const response = await fetch("/api/users/" + userId, options); // fetch return a promise => we wait for the response

    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const user = await response.json(); // json() returns a promise => we wait for the data

    userSession.email = user.email;
    userSession.pseudo = user.pseudo;

    // save the user into the localStorage
    setSessionObject("user", userSession);

    // Rerender the navbar for an authenticated user
    Navbar();
  } catch (error) {
    console.error("ProfilPage::error: ", error);
  }

  let profilPage = `
    <div class="col">
      <div class="row">
        <div class="col mb-3">
          <div class="card">
            <div class="card-body">
              <div class="e-profile">
                <div class="row">
                  
                  <div class="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                    <div class="text-center text-sm-left mb-2 mb-sm-0">
                      <h4 class="pt-sm-2 pb-1 mb-0 text-nowrap">${userSession.pseudo}</h4>
                      <div class="mt-2">
                      </div>
                    </div>
                  </div>
                </div>
                <ul class="nav nav-tabs">
                  <li class="nav-item"><a href="#" class="active nav-link">Settings</a></li>
                </ul>
                <div class="tab-content pt-3">
                  <div class="tab-pane active">
                    <form class="form" novalidate="">
                      <div class="row">
                        <div class="col">
                          <div class="row">
                            <div class="col">
                              <div class="form-group">
                                <label for="pseudo">Pseudo</label>
                                <input class="form-control" type="text" id="pseudo" name="pseudo" placeholder="${userSession.pseudo}" disabled>
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col">
                              <div class="form-group">
                                <label for="email">Email</label>
                                <input class="form-control" id="email" name="email" type="text" placeholder="${userSession.email}" disabled>
                              </div>
                            </div>
                          </div>
                          <br/>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 col-sm-6 mb-3">
                          <div class="mb-2"><b>Change Password</b></div>
                          <div class="row">
                            <div class="col">
                              <div class="form-group">
                                <label for="currentPassword">Current Password</label>
                                <input class="form-control" id="currentPassword" name="currentPassword" type="password" placeholder="••••••">
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col">
                              <div class="form-group">
                                <label for="newPassword">New Password</label>
                                <input class="form-control" id="newPassword" name="newPassword" type="password" placeholder="••••••">
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col">
                              <div class="form-group">
                                <label for="newPasswordCheck">Confirm <span class="d-none d-xl-inline">Password</span></label>
                                <input class="form-control" id="newPasswordCheck" name="newPasswordCheck" type="password" placeholder="••••••"></div>
                            </div>
                            <span id='message' style="color:red;"></span>
                            <br/>
                            <br/>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col d-flex justify-content-end">
                          <button class="btn btn-primary" type="submit">Save Changes</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div> 
          </div>
        </div>`;

  pageDiv.innerHTML = profilPage;

  const form = document.querySelector("form");
  form.addEventListener("submit", onSubmitChange);

  async function onSubmitChange(e) {
    e.preventDefault();
    const currentPassword = document.getElementById("currentPassword");
    const newPassword = document.getElementById("newPassword");
    const newPasswordCheck = document.getElementById("newPasswordCheck");

    //check si les deux mdp sont bien équivalent
    if (newPassword.value != newPasswordCheck.value) {
      const message = document.getElementById("message");
      message.innerHTML = "Password doesn't match";
      newPassword.style = "border:2px solid red;";
      newPasswordCheck.style = "border:2px solid red;";

      throw new Error("Password doesn't match");
    }

    try {
      const options = {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({
          currentPassword: currentPassword.value,
          newPassword: newPassword.value,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: userSession.token,
        },
      };

      const response = await fetch("/api/users/" + userId, options); // fetch return a promise => we wait for the response

      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const user = await response.json(); // json() returns a promise => we wait for the data

      userSession.email = user.email;
      userSession.pseudo = user.pseudo;

      // save the user into the localStorage
      setSessionObject("user", userSession);

      // Rerender the navbar for an authenticated user
      Navbar();

      // call the ProfilPage via the Router
      Redirect("/profil");
    } catch (error) {
      console.error("profilPage::error: ", error);
    }
  }
};

export default ProfilPage;
