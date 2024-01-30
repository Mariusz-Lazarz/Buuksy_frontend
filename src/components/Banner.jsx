import React from "react";
import TypingEffectComponent from "./TypingEffectComponent";
import { Link } from "react-router-dom";
import Categories from "./Categories";
import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <>
      <div
        className={`${styles.background} flex flex-col justify-between items-center text-center p-6 h-screen text-white`}
        data-testid="banner"
      >
        <div className="flex-grow flex flex-col justify-center items-center gap-4">
          <TypingEffectComponent />
          <h2 className="text-2xl font-bold mt-4">
            Discover the best salons in your area
          </h2>
          <Link
            to="/offer"
            className="bg-white text-black hover:bg-opacity-25 transition-all p-2 rounded-md"
          >
            DISCOVER
          </Link>
        </div>
        <Categories />
      </div>
    </>
  );
};

export default Banner;
