import React, { useState } from "react";
import axios from "axios";
import RegisterForm from "../components/RegisterForm";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/auth/login",
        formData
      );
      const { token, user } = response.data;
      const expiryTime = new Date().getTime() + 3600 * 1000;

      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiry", expiryTime.toString());
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful! Redirecting...", {
        onClose: () => {
          navigate("/");
        },
      });
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <Container>
      <RegisterForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLogin={true}
      />
    </Container>
  );
}
