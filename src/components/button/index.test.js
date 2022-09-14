import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import MyButton from "./index";

describe("Button", () => {
  test("renders correctly", () => {
    render(<MyButton>Button</MyButton>);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });

  test("Snapshot", () => {
    const { container } = render(<MyButton>Button</MyButton>);

    expect(container).toMatchSnapshot();
  });

  test("onClick props", () => {
    const onClick = jest.fn();
    render(<MyButton onClick={onClick}>Button</MyButton>);

    fireEvent.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("disabled state", () => {
    const onClick = jest.fn();
    render(
      <MyButton id="my-button" disabled={true} onClick={onClick}>
        Button
      </MyButton>
    );

    expect(screen.getByRole("button")).toBeDisabled();

    fireEvent.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
