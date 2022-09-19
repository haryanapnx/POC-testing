import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/card";
import { BASE_URL } from "../config/url";
import { titleCase } from "../utils/convertTitleCase";

function Home() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/posts`);
        setList(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setList([]);
      } finally {
        setLoading(false);
      }
    };
  
    getData();
  }, []);

  return (
    <div>
      {loading && <div data-testid="loading">A moment please...</div>}
      {error && <div data-testid="error">{`Problem fetching the post data - ${error}`}</div>}
      {list.length > 0 &&
        list.map((item, i) => (
          <Card key={i}>
            <h4>{titleCase(item.title)}</h4>
            <div>{item.body}</div>
          </Card>
        ))}
    </div>
  );
}

export default Home;
