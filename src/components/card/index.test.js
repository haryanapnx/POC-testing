import * as React from "react";
import { render, screen } from "@testing-library/react";

import MyCard from "./index";

describe("Card", () => {
  test("renders correctly", () => {
    render(<MyCard>content</MyCard>);
    const card = screen.getByText("content");

    expect(card).toHaveTextContent("content");
  });

  test("Snapshot", () => {
    const { container } = render(<MyCard>content</MyCard>);

    expect(container).toMatchSnapshot();
  });
});
