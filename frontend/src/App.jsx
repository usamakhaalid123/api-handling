import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get("api/products?search=" + search, {
          signal: controller.signal,
        });
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Fetch aborted due to cancellation");
          return;
        }
        setError(true);
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [search]);

  // if (error) {
  //   return <h2>An error occurred while fetching the data.</h2>;
  // }

  // if (loading) {
  //   return <h2>Loading...</h2>;
  // }

  return (
    <>
      <h1>Api in react</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by product name"
      />
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>An error occurred while fetching the data.</h2>
      ) : (
        <h2>Number of products are {products.length}</h2>
      )}
    </>
  );
}

export default App;
