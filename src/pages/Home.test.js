import * as React from "react";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Home from "./Home";
import { handlers } from "../mocks/handlers";

// msw
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Add post module", () => {
  it("should render loading message", () => {
    render(<Home />);
    expect(screen.getByTestId("loading").textContent).toBe(
      "A moment please..."
    );
  });

  it("should fetch and display asynchronous posts", async () => {
    render(<Home />);
    await waitFor(() =>
      expect(screen.getByText("Content Mukbang")).toBeInTheDocument()
    );
  });
  // });

  /* ==========================================
 Using waitFor 
 =====================================*/

  it("handles server error", async () => {
    server.use(
      // override the initial "GET /url" request handler
      // to return a 500 Server Error
      rest.get("https://jsonplaceholder.typicode.com/posts", (req, res, ctx) =>
        res(ctx.status(500))
      )
    );
    render(<Home />);
    await waitFor(() =>
      expect(
        screen.getByText(/problem fetching the post data/i)
      ).toBeInTheDocument()
    );
  });

  it("Should wait for loading message to remove when posts arive: using waitFor", async () => {
    render(<Home />);

    await waitFor(() => {
      const loadingText = screen.queryByText("A moment please...");
      expect(loadingText).not.toBeInTheDocument();
    });
  });

  //   /* ==========================================
  //  Using waitForElementToBeRemoved
  //  =====================================*/

  it("Should display loading message and disappear when posts arive", async () => {
    render(<Home />);
    await waitForElementToBeRemoved(() => screen.getByTestId("loading"));
  });

  //   /* ==========================================
  //  Using findBy
  //  =====================================*/

  it("should fetch and display asynchronous posts: using findBy", async () => {
    render(<Home />);
    // screen.debug(); //text initially not present
    const postItemNode = await screen.findByText("Title");
    // screen.debug(); //text is present
    expect(postItemNode).toBeInTheDocument();
  });
});
