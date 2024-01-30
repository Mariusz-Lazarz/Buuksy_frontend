import { HiUserCircle, HiOutlineLogout } from "react-icons/hi";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import Container from "./Container";
import { isLoggedIn, getUserData, logout, getToken } from "../utils/AuthUtils";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function Header() {
  const [authenticated, setAuthenticated] = useState(isLoggedIn());
  const location = useLocation();
  const user = getUserData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out, Redirecting...", {
      onClose: () => {
        navigate("/login");
      },
    });
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
    } else {
      setAuthenticated(isLoggedIn());
    }
  }, [location.pathname]);
  return (
    <header
      className={`w-full sticky top-0 z-50 py-2 px-4 bg-gray-950 text-white`}
    >
      <Container>
        <nav className="flex justify-between items-center">
          <div>
            <Link to="/">
              <h1 className={`font-bold text-3xl ${styles.customFont}`}>
                Buuksy
              </h1>
            </Link>
          </div>
          {authenticated && user ? (
            <div className="flex items-center gap-2">
              <Link to="/profile" className="flex gap-2">
                <span>{user.name}</span>
                <HiUserCircle size={28} className="hover:opacity-75" />
              </Link>
              <button
                className="hover:opacity-75  text-sm px-2 rounded-md py-[2px]"
                onClick={handleLogout}
              >
                <HiOutlineLogout size={28} />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="flex gap-2">
                <HiUserCircle size={28} />
                <span>Log in</span>
              </Link>
              /<Link to="/register">Create account</Link>
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}
