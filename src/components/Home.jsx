import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null); //null is falsy, null is declared empty

  useEffect(() => {
    const getData = async () => {
      try {
        //get the
        const response = await fetch(
          `/submit-response?username=${data.username}`
        );
        const data = await response.json();
        setData(data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []); //run once only so no variable to watch
  return (
    <>
      <h1>
        Welcome to the homepage! ms. {data ? data.username : "Loading..."}
      </h1>
    </>
  );
}
