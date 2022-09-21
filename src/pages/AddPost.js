import React, { useState } from "react";
import MyButton from "../components/button";
import Input from "../components/input";
import { BASE_URL } from "../config/url";
import axios from "axios";

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
      const response = await axios.post(
        `${BASE_URL}/posts`,
        { title, body, userId },
        { headers: { "Content-type": "application/json; charset=UTF-8" } }
      );
      setData(response.data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        style={{
          padding: "2rem",
          border: ".5px solid #ccc",
          margin: "4rem 2rem",
        }}
        onSubmit={handleSubmit}
        data-testid="my-form"
      >
        <h4>Add Post</h4>
        <Input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          name="title"
          data-testid="title"
          label="Title"
        />
        <Input
          onChange={(e) => setBody(e.target.value)}
          value={body}
          required
          name="body"
          data-testid="body"
          label="Body"
        />
        <Input
          onChange={(e) => setUserId(e.target.value)}
          value={userId}
          type="number"
          required
          name="userId"
          data-testid="userId"
          label="User ID"
        />
        <MyButton data-testid="add" type="submit" disabled={loading}>
          {loading ? "loading..." : "ADD"}
        </MyButton>
        {data && (
          <div data-testid="result-data">
            <h4>Data berhasil disimpan</h4>
            <pre style={{ border: "dashed 1px orange", padding: ".5rem" }}>
              {JSON.stringify(data, undefined, 2)}
            </pre>
          </div>
        )}
      </form>
    </>
  );
}

export default AddPost;
