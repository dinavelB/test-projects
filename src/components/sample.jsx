import { useState } from "react";
import "../sample.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  //declare the data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  //get the data
  let getData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  let submitForm = async (e) => {
    e.preventDefault();

    const response = await fetch("/submit-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json(); //parse it so it can log the json object
    console.log(data);
    nav("/home");
  };

  return (
    <section className="formContainer">
      <form onSubmit={submitForm}>
        <label htmlFor="">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          name="username"
          value={formData.username}
          onChange={getData}
        />
        <label htmlFor="">Email address</label>
        <input
          type="text"
          placeholder="Enter your email address"
          name="email"
          value={formData.email}
          onChange={getData}
        />
        <button type="submit">Send</button>
      </form>
    </section>
  );
}
