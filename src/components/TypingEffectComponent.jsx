import React from "react";
import { TypeAnimation } from "react-type-animation";

const TypingEffectComponent = () => {
  return (
    <div className=" text-4xl md:text-6xl font-bold">
      <TypeAnimation
        cursor={true}
        sequence={[
          "Discover thousands of possibilities!",
          2000,
          "Dare to make changes!",
          2000,
          "Schedule time for yourself!",
          2000,
        ]}
        wrapper="div"
        repeat={Infinity}
      />
    </div>
  );
};

export default TypingEffectComponent;
