
    /**
 * Render the RegisterPage
 */

 const registerPage = `
 <section class="register-photo">
        <div class="form-container" style="width: 354px;max-height: 0px;">
            <form method="post" style="padding-right: 40px;padding-left: 40px;">
                <h2 class="text-center" style="color: var(--bs-danger);">Create an account</h2>
                <div class="mb-3"><input class="form-control" type="email" name="email" placeholder="Email"></div>
                <div class="mb-3"><input class="form-control" type="password" name="password" placeholder="Password"></div>
                <div class="mb-3"><input class="form-control" type="password" name="password-repeat" placeholder="Password (repeat)"></div>
                <div class="mb-3">
                    <div class="form-check"><label class="form-check-label"><input class="form-check-input" type="checkbox">I agree to the license terms.</label></div>
                </div>
                <div class="mb-3"><button class="btn btn-primary d-block w-100" type="submit" style="color: var(--bs-white);background: var(--bs-danger);">Sign Up</button></div><a class="already" href="#">You already have an account? Login here.</a>
            </form>
        </div>
 </section>`;

 const RegisterPage = () => { 
    const main = document.querySelector("main");
    main.innerHTML = registerPage; 
  };
  
  export default RegisterPage;