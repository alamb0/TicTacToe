import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Game", () => {
  render(<App />);
  const headerText = screen.getByText("Tic Tac Toe");
  expect(headerText).toBeInTheDocument();
});
