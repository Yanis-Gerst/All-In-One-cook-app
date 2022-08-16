import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { fetchAllUserDataFromDb } from "./Login";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import Login from "./index";

test("Login Component is render", () => {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <Login></Login>
    </MemoryRouter>
  );
  const loginHeading = screen.getByText("Login");
  expect(loginHeading).toBeTruthy();
});

test("function fetchAllUserDataFromDb always resolve", async () => {
  await expect(fetchAllUserDataFromDb()).resolves.toBeDefined();
});
