import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 8080;

//middleware, app.use and app.static.
//automatically serves static files
const client = app.use(express.static(path.join(__dirname, "public")));

//listen method
app.listen(port, () => {
  console.log(`Express.js server started at ${port}`);
});
