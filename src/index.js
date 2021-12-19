import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./Components/Navbar/Navbar";
import { Router } from "./Components/Router/Router";
import "./assets/css/styles.css";
import "../node_modules/hover.css";

Navbar();

Router(); // The router will automatically load the root page
