import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./sample";
import Home from "./Home";

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
