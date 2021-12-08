import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
import { Redirect } from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { setSessionObject } from "../../utils/session";
/**
 * Render the shop page
 */

 const TradingPage = () => { 
  let userSession = getSessionObject("user");
  console.log(userSession, "user");
  if (!userSession) {
      return Redirect("/login");
  }
    const pageDiv = document.querySelector("main");
    pageDiv.innerHTML = "Deal with the content of your TradingPage";
  };
  
  export default TradingPage;
  