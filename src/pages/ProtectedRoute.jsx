import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/AuthUtils";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  return isLoggedIn() ? children : null;
}
