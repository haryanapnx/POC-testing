import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { setupServer } from "msw/node";
import { handlers } from "../mocks/handlers";
import AddPost from "./AddPost";

// integration tests typically only mock HTTP requests via MSW
const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("Add post module", () => {
  it("initial state", () => {
    render(<AddPost />);

    const titleField = screen.getByTestId("title");
    expect(titleField).toHaveValue("");
    const bodyField = screen.getByTestId("body");
    expect(bodyField).toHaveValue("");
    const userId = screen.getByTestId("userId");
    expect(userId).toHaveValue(0);

    // it renders enabled submit button
    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent("ADD");
  });

  it("allows the add post to successfully", async () => {
    render(<AddPost />);

    const titleField = screen.getByTestId("title");
    const bodyField = screen.getByTestId("body");
    const userField = screen.getByTestId("userId");
    const button = screen.getByTestId("add");

    // fill out and submit form
    fireEvent.change(titleField, { target: { value: "Title" } });
    fireEvent.change(bodyField, { target: { value: "Content" } });
    fireEvent.change(userField, { target: { value: 1 } });
    fireEvent.click(button);
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("loading...");
  });
});
