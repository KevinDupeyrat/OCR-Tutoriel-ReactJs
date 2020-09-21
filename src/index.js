import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

/*  
    Grappe de base de l'application
    Le composent Parent principale appelé <App /> et
    rataché au DOM avec l'élément 'root'.
*/

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
