require("dotenv").config({ path: __dirname + "/.env" });

const app = require("./server");

require("./database");

app.listen(app.get("port"), () => {
  console.log("Server en puerto", app.get("port"));
});
