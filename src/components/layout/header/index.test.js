import React from 'react';
import { render, screen } from "@testing-library/react";
import Header from "./index";

describe("HeaderComponent", () => {
  test("HeaderComponent should render Example Project", () => {
    render(<Header />);
    expect(screen.getByText("Example Project")).toBeInTheDocument();

    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();

  });
});
