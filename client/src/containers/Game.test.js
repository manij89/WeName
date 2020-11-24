import React from "react";
import "@testing-library/jest-dom";
import { screen, cleanup } from "@testing-library/react";
import { createMemoryHistory } from "history";
import App from "../App";
import customRender from "../utils/customRender";

jest.mock("axios");

describe.only("Render Game component correctly", () => {
  afterEach(() => {
    cleanup();
  });
  test("should have correct buttons", async () => {
    const history = createMemoryHistory();
    history.push("/game");

    customRender(<App />, { history });

    const game = screen.getByText(/What type of name are you looking for/i);
    expect(game).toBeInTheDocument();

    const girls = screen.getByTestId(/girls/i);
    expect(girls).toBeInTheDocument();

    const boys = screen.getByTestId(/boys/i);
    expect(boys).toBeInTheDocument();

    const neutral = screen.getByTestId(/neutral/i);
    expect(neutral).toBeInTheDocument();
  });
});
