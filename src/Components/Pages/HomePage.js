/**
 * Render the HomePage
 */

import { Redirect } from "../Router/Router";

const HomePage = () => { 
  const pageDiv = document.querySelector("main");
  pageDiv.innerHTML = "Welcome to Pokedex";
  Redirect("/collections");
};

export default HomePage;
