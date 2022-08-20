import { render, fireEvent, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { fetchAllUserDataFromDb } from "./Login";
import { MemoryRouter } from "react-router-dom";
import * as userContext from "../../App";
import React from "react";
import Login from "./index";

//Mock useNaviguate

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

const mockUseUserContext = jest.spyOn(userContext, "useUserContext");

// Utils Function

function wait(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
}

function getInputElement() {
  const inputMailElement = screen.getByLabelText(
    "Your e-mail"
  ) as HTMLInputElement;
  const passwordInputElement = screen.getByLabelText(
    "Your Password"
  ) as HTMLInputElement;
  return [inputMailElement, passwordInputElement];
}

//Mock Local Storage

var localStorageMock = (function () {
  var store: any = {};
  return {
    getItem: function (key: string) {
      return store[key];
    },
    setItem: function (key: any, value: any) {
      store[JSON.parse(key)] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key: string) {
      delete store[key];
    },
    display() {
      return store;
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

test("Login Component is render", () => {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <Login></Login>
    </MemoryRouter>
  );
  const loginHeading = screen.getByText("Login");
  expect(loginHeading).toBeTruthy();
});

//Set up

beforeEach(() => {
  localStorageMock.clear();
});

test("function fetchAllUserDataFromDb always resolve", async () => {
  await expect(fetchAllUserDataFromDb()).resolves.toBeDefined();
});

describe("Error State work normally Login", () => {
  it("It's show Error when is input are empty", async () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Login></Login>
      </MemoryRouter>
    );

    const loginBtn = screen.getByText("Log In") as HTMLButtonElement;
    fireEvent.click(loginBtn);
    const errorLogin = await waitFor(() => {
      return screen.getByText("Adresse Mail ou mot de passe incorrecte");
    });
    expect(errorLogin).toBeInTheDocument();
  });

  it("display Error when we right wrong Data", async () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Login></Login>
      </MemoryRouter>
    );

    const [inputMailElement, passwordInputElement] = getInputElement();

    const loginBtn = screen.getByText("Log In") as HTMLButtonElement;

    fireEvent.change(inputMailElement, {
      target: { value: "dragon@gmail.com" },
    });
    fireEvent.change(passwordInputElement, {
      target: { value: "passwordOfDeOuf" },
    });

    fireEvent.click(loginBtn);
    const errorLogin = await waitFor(() => {
      return screen.getByText("Adresse Mail ou mot de passe incorrecte");
    });

    expect(errorLogin).toBeInTheDocument();
  });
});

describe("Remeber Me Feature", () => {
  it("Work when we log In", async () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Login></Login>
      </MemoryRouter>
    );
    mockUseUserContext.mockReturnValue({
      setData: () => null as any,
      data: {} as any,
      isConnected: false,
    });

    const logInBtn = screen.getByText("Log In") as HTMLButtonElement;
    const rememberBtn = screen.getByLabelText("Remeber Me") as HTMLInputElement;
    const [inputMailElement, passwordInputElement] = getInputElement();
    fireEvent.change(inputMailElement, {
      target: { value: "yanis@gmail.com" },
    });
    fireEvent.change(passwordInputElement, { target: { value: "yanis" } });
    fireEvent.click(rememberBtn);

    expect(rememberBtn).toBeChecked();

    fireEvent.click(logInBtn);

    await wait(500);
    //Wait for Update pour pouvoir le voir in the localStorage

    expect(localStorageMock.getItem("yanis")).toBeDefined();
  });

  it("Don't store wrong user", async () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Login></Login>
      </MemoryRouter>
    );

    const logInBtn = screen.getByText("Log In") as HTMLButtonElement;
    const rememberBtn = screen.getByLabelText("Remeber Me") as HTMLInputElement;
    const [inputMailElement, passwordInputElement] = getInputElement();
    fireEvent.change(inputMailElement, {
      target: { value: "userthatnotexist@gmail.com" },
    });
    fireEvent.change(passwordInputElement, {
      target: { value: "whatapassword" },
    });
    fireEvent.click(rememberBtn);

    expect(rememberBtn).toBeChecked();

    fireEvent.click(logInBtn);

    await waitFor(() => {
      return expect(
        screen.getByText("Adresse Mail ou mot de passe incorrecte")
      ).toBeInTheDocument();
    });

    expect(localStorageMock.display()).toEqual({});
  });
});
