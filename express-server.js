import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import database from "./dB";
import { use } from "react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 8080;

let submisions = {};

//add a middleware for src non blocking and for webpack eval()
const isDev = process.env.NODE_ENV !== "production";

app.use((req, res, next) => {
  let csp =
    "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; connect-src 'self';";
  if (isDev) {
    csp += " script-src 'self' 'unsafe-inline' 'unsafe-eval';";
  } else {
    csp += " script-src 'self';"; // safer for production
  }
  res.setHeader("Content-Security-Policy", csp);
  next();
});

app.use(express.json());

//the end point
app.post("/submit-response", (req, res) => {
  const { username, email } = req.body; //this is a object
  database.query(
    "insert into users (username, email) values (?,?)",
    [username, email],
    (error, content) => {
      if (error) {
        console.log("Somethings wrong");
        return res.status(500).json({
          message: "error saving data to the database",
        });
      } else {
        res.status(200).json({
          message: "data added",
          data: content,
        });
      }
    }
  );
});

//get
app.get("/submit-response", (req, res) => {
  res.json(submisions);
});

//listen method
app.listen(port, () => {
  console.log(`Express.js server started at ${port}`);
});

//middleware, app.use and app.static.
//automatically serves static files including html
app.use(express.static(path.join(__dirname, "public")));
