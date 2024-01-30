import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const { category } = useParams();

  const categories = [
    "Massage",
    "Hairdresser",
    "Barber shop",
    "Nails",
    "Eyebrows and eyelashes",
  ];

  const handleCategoryClick = (categoryName) => {
    const formattedCategory = categoryName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/offer?category=${formattedCategory}`);
  };

  return (
    <div className="flex justify-around flex-wrap space-x-4 pb-20">
      {categories.map((categoryName, index) => (
        <button
          key={index}
          onClick={() => handleCategoryClick(categoryName)}
          className={`font-bold pb-1 border-b-2 border-transparent hover:border-white transition duration-300 ${
            category === categoryName.toLowerCase().replace(/\s+/g, "-")
              ? "text-red-500"
              : ""
          }`}
        >
          {categoryName}
        </button>
      ))}
    </div>
  );
};

export default Categories;
