import React, { useState, useEffect } from "react";
import Card from "../components/card";
import Wrapper from "../components/layout/wrapper/Wrapper";
import { BASE_URL } from "../config/url";
import { titleCase } from "../utils/convertTitleCase";


function Home() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts`);
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      const actualData = await response.json();
      setList(actualData);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      {loading && <div>A moment please...</div>}
      {list.length > 0 &&
        list.map((item, i) => (
          <Card key={i}>
            <h4>{titleCase(item.title)}</h4>
            <div>{item.body}</div>
          </Card>
        ))}
    </Wrapper>
  );
}

export default Home;
