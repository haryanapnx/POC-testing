import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import MyButton from "../components/button";
import Input from "../components/input";
import Wrapper from "../components/layout/wrapper/Wrapper";
import { BASE_URL } from "../config/url";

function AddPost() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        body: JSON.stringify({
          title: "foo",
          body: "bar",
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      const actualData = await response.json();
      setData(actualData);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      {data && <Navigate to="/" replace={true} />}
      <form
        style={{
          padding: "2rem",
          border: ".5px solid #ccc",
          margin: "4rem 2rem",
        }}
        onSubmit={handleSubmit}
      >
        <h4>Add Post</h4>
        <Input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          name="title"
          label="Title"
        />
        <Input
          onChange={(e) => setBody(e.target.value)}
          value={body}
          required
          name="body"
          label="Body"
        />
        <Input
          onChange={(e) => setUserId(e.target.value)}
          value={userId}
          type="number"
          required
          name="userId"
          label="User ID"
        />
        {loading ? (
          <center>loading...</center>
        ) : (
          <MyButton type="submit">+ ADD</MyButton>
        )}
      </form>
    </Wrapper>
  );
}

export default AddPost;
