import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import axios from "axios";

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const updateField = (field, value) => {
  fireEvent.change(screen.getByLabelText(field), {
    target: { value: value },
  });
};

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Storage.prototype.setItem = jest.fn();
  });

  it("should allow a user to log in with correct credentials", async () => {
    axios.post.mockResolvedValue({
      data: {
        token: "fake-token",
      },
    });

    render(<LoginPage />);

    updateField("Email", "johndoe@example.com");
    updateField("Password", "password123");
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3001/api/v1/auth/login",
        {
          email: "johndoe@example.com",
          password: "password123",
        }
      );
    });

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith("token", "fake-token");
    });
  });

  it("should allow a user to register with valid details", async () => {
    axios.post.mockResolvedValue({
      data: {
        message: "Registration successful",
      },
    });

    render(<RegisterPage />);

    updateField("Name", "Jane Doe");
    updateField("Email", "janedoe@example.com");
    updateField("Password", "password123");
    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3001/api/v1/auth/register",
        {
          name: "Jane Doe",
          email: "janedoe@example.com",
          password: "password123",
        }
      );
    });
  });
});
