import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from "./Game";

test("X wins", async () => {
  const user = userEvent.setup();
  render(<Game />);

  await waitFor(async () => {
    // X goes
    await user.click(screen.getByTestId("square-0"));
    // O goes
    await user.click(screen.getByTestId("square-1"));
    // X goes
    await user.click(screen.getByTestId("square-4"));
    // O goes
    await user.click(screen.getByTestId("square-5"));
    // X goes
    await user.click(screen.getByTestId("square-8"));
  });

  const winText = screen.getByText(/X Wins!/);
  expect(winText).toBeInTheDocument();
});

test("O wins", async () => {
  const user = userEvent.setup();
  render(<Game />);

  await waitFor(async () => {
    // X goes
    await user.click(screen.getByTestId("square-0"));
    // O goes
    await user.click(screen.getByTestId("square-2"));
    // X goes
    await user.click(screen.getByTestId("square-1"));
    // O goes
    await user.click(screen.getByTestId("square-4"));
    // X goes
    await user.click(screen.getByTestId("square-3"));
    // O goes
    await user.click(screen.getByTestId("square-6"));
  });

  const winText = screen.getByText(/O Wins!/);
  expect(winText).toBeInTheDocument();
});

test("Cat's Game", async () => {
  const user = userEvent.setup();
  render(<Game />);

  await waitFor(async () => {
    // X goes
    await user.click(screen.getByTestId("square-0"));
    // O goes
    await user.click(screen.getByTestId("square-1"));
    // X goes
    await user.click(screen.getByTestId("square-3"));
    // O goes
    await user.click(screen.getByTestId("square-4"));
    // X goes
    await user.click(screen.getByTestId("square-7"));
    // O goes
    await user.click(screen.getByTestId("square-6"));
    // X goes
    await user.click(screen.getByTestId("square-2"));
    // O goes
    await user.click(screen.getByTestId("square-5"));
    // X goes
    await user.click(screen.getByTestId("square-8"));
  });

  const winText = screen.getByText(/cat's game/i);
  expect(winText).toBeInTheDocument();
});

test("reset", async () => {
  const user = userEvent.setup();
  render(<Game />);

  await waitFor(async () => {
    // X goes
    await user.click(screen.getByTestId("square-0"));
    // O goes
    await user.click(screen.getByTestId("square-1"));
    // X goes
    await user.click(screen.getByTestId("square-4"));
    // O goes
    await user.click(screen.getByTestId("square-5"));
    // X goes
    await user.click(screen.getByTestId("square-8"));

    const winText = screen.getByText(/X Wins!/);
    expect(winText).toBeInTheDocument();

    const xTokens = screen.getAllByTitle("X");
    expect(xTokens).toHaveLength(3);

    const oTokens = screen.getAllByTitle("O");
    expect(oTokens).toHaveLength(2);

    await user.click(screen.getByText(/play again/i));
  });

  const winText = screen.queryByText(/X Wins!/);
  expect(winText).not.toBeInTheDocument();

  const xTokens = screen.queryAllByTitle("X");
  expect(xTokens).toHaveLength(0);

  const oTokens = screen.queryAllByTitle("O");
  expect(oTokens).toHaveLength(0);
});
