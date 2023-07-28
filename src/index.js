//import app from "./app.js";
const app = require("./app.js");

const main=()=>{
    	app.listen(app.get("port"));
        console.log(`Server run on port ${app.get("port")}`);
}

main();