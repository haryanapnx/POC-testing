// src/mocks/handlers.js
import { rest } from "msw";
import { BASE_URL } from "../config/url";

export const handlers = [
  // Handles a POST /posts request
  rest.post(`${BASE_URL}/posts`, (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(201),
      ctx.json({
        userId: 1,
        id: 1,
        title: "Title",
        body: "Content Mukbang",
      })
    );
  }),

  // Handles a GET /posts request
  rest.get(`${BASE_URL}/posts`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: "Title",
          body: "Content Mukbang",
        },
      ])
    );
  }),
];
