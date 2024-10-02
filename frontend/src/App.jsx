import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get("api/products");
        console.log(response.data);
        setProducts(response.data)
        setLoading(false);
      } catch (error) {
        setError(true)
        setLoading(false);
      }
    })();
  }, []);

  // if (error) {
  //   return <h2>An error occurred while fetching the data.</h2>;
  // }

  // if (loading) {
  //   return <h2>Loading...</h2>;
  // }

  return (
    <>
      <h1>Api in react</h1>
      {loading? <h2>Loading...</h2> : error ? <h2>An error occurred while fetching the data.</h2> :  <h2>Number of products are {products.length}</h2>
    }
    </>
  );
}

export default App;
