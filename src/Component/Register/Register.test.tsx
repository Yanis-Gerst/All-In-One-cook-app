import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register";
import { IUser } from "../../Interface/userData";

let mockDatabase: any[] = [];

jest.mock("./utils", () => {
  const originalModule = jest.requireActual("./utils");

  return {
    __esModule: true,
    ...originalModule,
    setNewAccountInDb: (userConfig: IUser) => {
      mockDatabase.push(userConfig);
    },
  };
});

beforeEach(() => {
  mockDatabase = [];
});

const waitForNeverToHappen = async (expectCb: () => void) => {
  await expect(waitFor(expectCb)).rejects.toEqual(expect.anything());
};

describe("test Mail Input", () => {
  it("handle wrong mail format", async () => {
    render(
      <MemoryRouter>
        <Register></Register>
      </MemoryRouter>
    );
    const mailInput = screen.getByLabelText("Your e-mail") as HTMLInputElement;

    fireEvent.change(mailInput, { target: { value: "benoitgmail.com" } });
    fireEvent.focusOut(mailInput);

    const mailError = await waitFor(() => {
      return screen.getByText("Pas le bon format d'adresse Mail");
    });

    expect(mailError).toBeInTheDocument();
  });

  it("doesn't show error for right email format", async () => {
    render(
      <MemoryRouter>
        <Register></Register>
      </MemoryRouter>
    );
    const mailInput = screen.getByLabelText("Your e-mail") as HTMLInputElement;

    fireEvent.change(mailInput, { target: { value: "goodEmail@gmail.com" } });
    fireEvent.focusOut(mailInput);

    await waitForNeverToHappen(() =>
      expect(
        screen.getByText("Pas le bon format d'adresse Mail")
      ).toBeInTheDocument()
    );
  });
});

describe("Password Input", () => {
  it("Handle wrong double checking password", async () => {
    render(
      <MemoryRouter>
        <Register></Register>
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText("Your password");
    const passwordConfirmInput = screen.getByLabelText("Confirm your password");

    fireEvent.change(passwordInput, { target: { value: "thepassword" } });
    fireEvent.change(passwordConfirmInput, { target: { value: "thpassword" } });
    fireEvent.focusOut(passwordConfirmInput);

    const passwordError = await waitFor(() =>
      screen.findByText("Le Mdp c'est pas le même enfaite")
    );

    expect(passwordError).toBeInTheDocument();
  });

  it("don't show Error when passwords are the same", async () => {
    render(
      <MemoryRouter>
        <Register></Register>
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText("Your password");
    const passwordConfirmInput = screen.getByLabelText("Confirm your password");

    fireEvent.change(passwordInput, { target: { value: "thepassword" } });
    fireEvent.change(passwordConfirmInput, {
      target: { value: "thepassword" },
    });
    fireEvent.focusOut(passwordConfirmInput);

    await waitForNeverToHappen(() =>
      expect(screen.getByText("Le Mdp c'est pas le même enfaite"))
    );
  });
});

describe("MailInput and PasswordInput", () => {
  it("Don't show Error when everthing is right", async () => {
    render(
      <MemoryRouter>
        <Register></Register>
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText(
      "Your password"
    ) as HTMLInputElement;
    const passwordConfirmInput = screen.getByLabelText("Confirm your password");
    const mailInput = screen.getByLabelText("Your e-mail") as HTMLInputElement;
    const submitBtn = screen.getByText("Créer votre compte");
    fireEvent.change(passwordInput, { target: { value: "thepassword" } });
    fireEvent.change(passwordConfirmInput, {
      target: { value: "thepassword" },
    });
    fireEvent.focusOut(passwordConfirmInput);

    fireEvent.change(mailInput, { target: { value: "goodEmail@gmail.com" } });
    fireEvent.focusOut(mailInput);

    fireEvent.click(submitBtn);
    await waitForNeverToHappen(() =>
      expect(screen.getByText("Le Mdp c'est pas le même enfaite"))
    );

    await waitForNeverToHappen(() =>
      expect(
        screen.getByText("Pas le bon format d'adresse Mail")
      ).toBeInTheDocument()
    );

    //Recieve the new User in db
    expect(mockDatabase).toHaveLength(1);
    //Reset des inputs
    expect(mailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
  });
});
