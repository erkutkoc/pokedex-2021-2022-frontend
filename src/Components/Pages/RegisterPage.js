import { Redirect } from "../Router/Router";
import { setSessionObject } from "../../utils/session";
import Navbar from "../Navbar/Navbar";

    /**
 * Render the RegisterPage
 */

 const registerPage = `
 <section>
        <div id="multple-step-form-n" class="container overflow-hidden" style="margin-top: 0px;margin-bottom: 10px;padding-bottom: 300px;padding-top: 57px;">
            <div id="progress-bar-button" class="multisteps-form">
                <div id="stepp" class="row">
                    <div class="col-12 col-lg-8 ml-auto mr-auto mb-4">
                        <div class="multisteps-form__progress"><a class="btn multisteps-form__progress-btn js-active" role="button" title="User Info">User Info</a><a class="btn multisteps-form__progress-btn" role="button" title="Personalization">Personalization</a><a class="btn multisteps-form__progress-btn" role="button" title="Some other information">Some information</a></div>
                    </div>
                </div>
            </div>
            <div id="multistep-start-row" class="row">
                <div id="multistep-start-column" class="col-12 col-lg-8 m-auto">
                    <form id="main-form" class="multisteps-form__form">
                        <div id="single-form-next" class="multisteps-form__panel shadow p-4 rounded bg-white js-active" data-animation="scaleIn">
                            <h3 class="text-center multisteps-form__title">User Info</h3>
                            <div id="form-content" class="multisteps-form__content">
                                <div id="input-grp-double" class="form-row mt-4">
                                    <div class="col-12 col-sm-6"><input class="form-control multisteps-form__input" type="text" placeholder="Pseudo" name="pseudo"></div>
                                </div>
                                <div id="input-grp-double-3" class="form-row mt-4">
                                    <div class="col-12 col-sm-6"><input class="form-control multisteps-form__input" type="text" placeholder="Mail" name="mail"></div>
                                </div>
                                <div id="input-grp-single" class="form-row mt-4">
                                    <div class="col-12"><input class="form-control" type="password" placeholder="Password" name="password"></div>
                                </div>
                                <div id="next-button" class="button-row d-flex mt-4"><button class="btn btn btn-primary ml-auto js-btn-next" type="button" title="Next">Next</button></div>
                            </div>
                        </div>
                        <div id="single-form-next-prev" class="multisteps-form__panel shadow p-4 rounded bg-white" data-animation="scaleIn">
                            <h3 class="text-center multisteps-form__title">Personalization</h3>
                            <div id="form-content-1" class="multisteps-form__content">
                                <div id="input-grp-double-1" class="form-row mt-4">
                                    <div class="col-12 col-sm-6">
                                        <div class="form-check"><input class="form-check-input" type="radio" id="formCheck-3"><label class="form-check-label" for="formCheck-3">Homme</label></div>
                                    </div>
                                </div>
                                <div id="input-grp-single-1" class="form-row mt-4">
                                    <div class="col-12"><input class="form-control multisteps-form__input" type="text" placeholder="Favorite  Pokemon"></div>
                                </div>
                            </div>
                        </div>
                        <div id="single-form-next-prev-1" class="multisteps-form__panel shadow p-4 rounded bg-white" data-animation="scaleIn">
                            <h3 class="text-center multisteps-form__title">Some other information</h3>
                            <div id="form-content-2" class="multisteps-form__content">
                                <div id="input-grp-double-2" class="form-row mt-4">
                                    <div class="col-12 col-sm-6"><input class="form-control multisteps-form__input" type="text" placeholder="Country"></div>
                                    <div class="col-12 col-sm-6 mt-4 mt-sm-0"><input class="form-control multisteps-form__input" type="text" placeholder="City"></div>
                                </div>
                                <div id="next-prev-buttons-1" class="button-row d-flex mt-4"><button class="btn btn btn-primary js-btn-prev" type="button" title="Prev">Prev</button><button class="btn btn btn-primary ml-auto js-btn-next" type="button" title="Next">Next</button></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>`;

 const RegisterPage = () => { 
    
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
        console.log("credentials", email.value, pseudo.value, password.value, password_repeat.value);

        try {
            const options = {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                body: JSON.stringify({
                email: email.value,
                pseudo : pseudo,
                password: password.value,
                }), // body data type must match "Content-Type" header
                headers: {
                "Content-Type": "application/json",
                },
            };
            const response = await fetch("/api/auths/register", options); // fetch return a promise => we wait for the response

            if (!response.ok) {
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
            console.error("RegisterPage::error: ", error);
        }
    }
 };
  
  export default RegisterPage;