/**
 * Render the LoginPage
 */

 const loginPage = `
 <section class="login-dark">
        <form class="d-inline" method="post" style="background: var(--bs-body-bg);color: var(--bs-indigo);">
            <h2 class="visually-hidden">Login Form</h2>
            <div class="illustration"><i class="icon ion-ios-locked-outline" style="color: var(--bs-red);"></i></div>
            <div class="mb-3"><input class="form-control" type="email" name="email" placeholder="Email" style="color: var(--bs-gray-100);"></div>
            <div class="mb-3"><input class="form-control" type="password" name="password" placeholder="Password"></div>
            <div class="mb-3"><button class="btn btn-primary d-block w-100" type="submit" style="background: var(--bs-red);">Log In</button></div><a class="forgot" href="#" style="color: var(--bs-danger);">Forgot your email or password?</a>
        </form>
    </section>`;

 const LoginPage = () => { 
    const main = document.querySelector("main");
    main.innerHTML = loginPage; 
  };
  
  export default LoginPage;