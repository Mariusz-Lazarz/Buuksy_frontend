import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../components/Header";
import { BrowserRouter as Router } from "react-router-dom";

// Mock the AuthUtils
jest.mock("../utils/AuthUtils", () => ({
  isLoggedIn: jest.fn(),
  getUserData: jest.fn(),
  logout: jest.fn(),
  getToken: jest.fn(),
}));

// Mock React Router's useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Header Component", () => {
  it("renders login and register links when not authenticated", () => {
    const { isLoggedIn } = require("../utils/AuthUtils");
    isLoggedIn.mockReturnValue(false);

    render(
      <Router>
        <Header />
      </Router>
    );

    expect(screen.getByText("Log in")).toBeInTheDocument();
    expect(screen.getByText("Create account")).toBeInTheDocument();
    expect(screen.queryByText("Profile")).toBeNull(); // Profile link should not be present
  });

  it("renders Profile link and user name when authenticated", () => {
    const { isLoggedIn, getUserData } = require("../utils/AuthUtils");
    isLoggedIn.mockReturnValue(true);
    getUserData.mockReturnValue({ name: "John Doe" });

    render(
      <Router>
        <Header />
      </Router>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByText("Log in")).toBeNull();
    expect(screen.queryByText("Create account")).toBeNull(); 
  });

});
