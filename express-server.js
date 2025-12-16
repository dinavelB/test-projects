import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import database from "./dB.js";
import session from "express-session";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 8080
app.use(session(
  secret:
))

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
  const { username, email } = req.body; //destructure obj, here boy is for post request

  let values = []; //store values fro simplicity
  values.push(username, email);
  const insertQuery = "insert into users (username, email) values (?, ?)"; //query

  //query, values and then the callback
  database.query(insertQuery, values, (error, data) => {
    if (error) {
      return res.status(500).json({
        error: "there's an error in the process ",
      });
    }
    res.status(201).json({ id: data.insertId });
  });
});

//get
app.get("/submit-response", (req, res) => {
  //const { username } = req.query; //here query is for get request

  //store session
  const username = req.session.username;
  if (!username) return res.status(401).json({ error: "Not logged in" });

  database.query(
    "select * from users where username = ?",
    [username],
    (error, data) => {
      if (error) {
        return res.status(500).json({
          error: "cant get data",
        });
      }
      res.status(200).json(data[0] || null); //one index only
    }
  );
});

//filtered query
app.get("/user", (req, res) => {
  const { username } = req.query;

  let values = [];
  let sql = "select * from users";

  if (username) {
    sql += "where username = ?";
    values.push(username);
  }

  database.query(sql, values, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: "cant get data",
      });
    }

    res.status(200).json(data);
  });
});

//listen method
app.listen(port, () => {
  console.log(`Express.js server started at ${port}`);
});

//middleware, app.use and app.static.
//automatically serves static files including html
app.use(express.static(path.join(__dirname, "public")));
