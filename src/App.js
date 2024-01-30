import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OfferPage from "./pages/OfferPage";
import Header from "./components/Header";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import OfferDetailsPage from "./pages/OfferDetailsPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import NotFound from "./pages/NotFoundPage";

const App = () => {
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/offer" element={<OfferPage />} />
        <Route path="/offer/:id" element={<OfferDetailsPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
