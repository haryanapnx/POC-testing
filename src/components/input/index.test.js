import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Input from "./index";

describe("Input", () => {

  test("Snapshot", () => {
    const { container } = render(<Input />);

    expect(container).toMatchSnapshot();
  });

  test("renders correctly with default type text", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();
  });

  test("renders placeholder", () => {
    render(<Input placeholder="type text here" />);
    const input = screen.getByPlaceholderText("type text here");

    expect(input).toBeInTheDocument();
  });

  test("input disabled", () => {
    render(<Input disabled placeholder="type text here" />);

    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  test("input readOnly", () => {
    render(<Input readOnly placeholder="type text here" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("readOnly");

    const value = "this is value";

    userEvent.type(input, value);
    expect(input).not.toHaveValue(value);
  });

  test("input required", () => {
    render(<Input required={true} placeholder="type text here" />);

    const input = screen.getByRole("textbox");
    expect(input).toBeRequired();
  });

  test("input value", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} placeholder="type text here" />);

    const input = screen.getByRole("textbox");
    const value = "this is value";

    userEvent.type(input, value);
    expect(handleChange).toHaveBeenCalledTimes(value.length);
    expect(input).toHaveValue(value);
  });

});
