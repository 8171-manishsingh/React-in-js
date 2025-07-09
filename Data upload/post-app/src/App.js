
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";
import "./styles.css";

export default function App() {
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setpages] = useState(1);
  const getDtaformserver = async () => {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_limit=4&_page=${page}`
      );
      setposts(res.data);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    getDtaformserver();
  }, [page]);

  return (
    <div className="App">
      <h1>Post upload</h1>
      <button
        disabled={page == 1}
        onClick={() => (page > 1 ? setpages(page - 1) : setpages(page))}
      >
        prev
      </button>
      {page}
      <button
        disabled={page == page.length}
        onClick={() => (page < 25 ? setpages(page + 1) : setpages(page))}
      >
        Next
      </button>

      <hr />
      {posts.map((el, i) => (
        <Card key={el.id} id={el.id} title={el.title} body={el.body} />
      ))}
      {loading && (
        <p>
          <strong>data is Load......</strong>
        </p>
      )}
      {error && (
        <p style={{ color: "red" }}>
          <b>Error in the server</b>
        </p>
      )}

      {!loading &&
        !error &&
        posts.map((el) => (
          <Card key={el.id} id={el.id} title={el.title} body={el.body} />
        ))}
    </div>
  );
}

