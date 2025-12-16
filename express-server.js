import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

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
  const { username, email } = req.body;

  submisions = { username, email };
  res.json({ message: "Form data received" });
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
