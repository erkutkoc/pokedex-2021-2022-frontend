import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
const Navbar = () => {
  const navbarWrapper = document.querySelector("#navbarWrapper");
  let navbar;
  // Get the user object from the localStorage
  let user = getSessionObject("user");
  if (!user) {
    navbar = `
    <nav class="navbar navbar-light navbar-expand-lg navigation-clean-button" style="color: var(--bs-yellow);background: var(--bs-red);border-bottom: 6px solid #000000 ;">
      <div class="container">
      <a class="navbar-brand hvr-float-shadow hvr-icon-pulse-shrink" href="#" data-uri="/collection" style="color: rgb(255,222,0);font-size: 27px;text-shadow: 0px 2px 7px rgb(0,0,0), 5px 0px rgb(0,0,0);/*font-family: Acme, sans-serif;*/margin-top: -12px;letter-spacing: 2px;">PokeDecks<img src="https://github.com/erkutkoc/pokedex-2021-2022-frontend/blob/main/src/assets/img/Pok%C3%A9_Ball_icon.svg.png?raw=true" class ="hvr-icon "style="width: 28px;text-align: left;">
      </a>
      <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1">
        <span class="visually-hidden">Toggle navigation</span><span class="visually-hidden">Toggle navigation</span>
        <span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span>
      </button>
          <div class="collapse navbar-collapse" id="navcol-1">
              <ul class="navbar-nav me-auto">
                  <li class="nav-item hvr-float-shadow"><a class="nav-link" data-bss-hover-animate="flash" href="#" data-uri="/collection" style="color: var(--bs-gray-200);font-weight: bold;">Collection</a></li>
              </ul><span class="navbar-text actions "> <a class="login hvr-float-shadow" href="#" data-uri="/login" style="color: var(--bs-gray-100);">Log In</a></span><span class="navbar-text actions"> <a class="btn btn-light action-button" role="button" href="#" data-uri="/register" style="background: #edff24;color: var(--bs-red);">Sign Up</a></span>
          </div>
      </div>
    </nav>
  `;
  } else {
    navbar = `
    <nav class="navbar navbar-light navbar-expand-lg navigation-clean-button" style="color: var(--bs-yellow);background: var(--bs-red);border-bottom: 6px solid #000000 ;">
      <div class="container">      <a class="navbar-brand hvr-float-shadow hvr-icon-pulse-shrink" href="#" data-uri="/collection" style="color: rgb(255,222,0);font-size: 27px;text-shadow: 0px 2px 7px rgb(0,0,0), 5px 0px rgb(0,0,0);/*font-family: Acme, sans-serif;*/margin-top: -12px;letter-spacing: 2px;">PokeDecks<img src="https://github.com/erkutkoc/pokedex-2021-2022-frontend/blob/main/src/assets/img/Pok%C3%A9_Ball_icon.svg.png?raw=true" class ="hvr-icon "style="width: 28px;text-align: left;"></button>
          <div class="collapse navbar-collapse" id="navcol-1">
              <ul class="navbar-nav me-auto">
                  <li class="nav-item"><a class="nav-link active hvr-float-shadow" data-bss-hover-animate="flash" href="#" data-uri="/collection" style="color: var(--bs-gray-200);font-weight: bold;">Collection</a></li>
                  <li class="nav-item"><a class="nav-link hvr-float-shadow" href="#" data-uri="/trading" style="color: var(--bs-gray-100);font-weight: bold;">Trading</a></li>
                  <li class="nav-item"><a class="nav-link hvr-float-shadow" href="#" data-uri="/shop" style="color: var(--bs-gray-100);font-weight: bold;">Shop</a></li>
                  <li class="nav-item"><a class="nav-link hvr-float-shadow" href="#" data-uri="/logout" style="color: var(--bs-gray-100);font-weight: bold;">Logout</a></li>
                  <li class="nav-item"><a class="nav-link hvr-float-shadow" href="#" data-uri="/profil" style="color: var(--bs-gray-100);font-weight: bold;">Profil</a></li>
                  <li class="nav-item"><a class="nav-link hvr-float-shadow" href="#" style="color: var(--bs-gray-100);">${user.pseudo}</a></li>   
                  <li class="nav-item"><a class="nav-link hvr-float-shadow hvr-icon-spin" href="#" data-uri="/coins" style="color: #edff24;">Coins: ${user.coins}<img src="https://github.com/erkutkoc/pokedex-2021-2022-frontend/blob/main/src/assets/img/coins.png?raw=true" class ="hvr-icon "style="width: 28px;text-align: left;"></a></li>
                  
          </div>
      </div>
    </nav>
    
  `;
  }
  navbarWrapper.innerHTML = navbar;
};

export default Navbar;
