import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(5); // Starting from 3 seconds

  useEffect(() => {
    // Countdown effect
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      navigate("/");
    }
  }, [counter, navigate]); // Dependencies array

  return (
    <div className="flex flex-col justify-center items-center h-screen text-2xl">
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>Redirecting in {counter} seconds...</p>
    </div>
  );
};

export default NotFound;
