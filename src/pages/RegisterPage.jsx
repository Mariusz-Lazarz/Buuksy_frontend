import { useState } from "react";
import { apiService } from "../utils/apiService";
import RegisterForm from "../components/RegisterForm";
import Container from "../components/Container";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        formData.name === "" ||
        formData.email === "" ||
        formData.password === ""
      ) {
        return toast.error("Please check your credentials and try again!");
      }
      const response = await apiService.register(formData);

      if (response.data.message === "User registered successfully") {
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        toast.success("User registered successfully! Redirecting...", {
          onClose: () => {
            navigate("/login");
          },
        });
      }
    } catch (error) {
      toast.error("Email already exists, please try again!");
      console.error("Error during registration:", error);
    }
  };

  return (
    <Container>
      <RegisterForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLogin={false}
      />
    </Container>
  );
}
