import React from "react";

const VisitsCardSkeleton = () => {
  return (
    <div className="border-[1px] flex animate-pulse">
      <div className="w-1/4 bg-gray-300 h-auto"></div>
      <div className="flex-grow flex flex-col gap-2 p-4">
        {/* Placeholder for Status */}
        <div className="bg-gray-300 w-16 h-4 rounded-md"></div>

        {/* Placeholder for Visit Name */}
        <div className="bg-gray-300 w-1/2 h-6 rounded-md"></div>

        {/* Placeholder for Salon Name */}
        <div className="bg-gray-300 w-1/3 h-6 rounded-md"></div>

        {/* Placeholder for Price */}
        <div className="bg-gray-300 w-1/4 h-6 rounded-md"></div>
      </div>
      <div className="flex-shrink-0 w-1/4 p-4 flex flex-col items-center">
        {/* Placeholder for Date and Time */}
        <div className="bg-gray-300 w-16 h-4 rounded-md"></div>
        <div className="bg-gray-300 w-24 h-16 rounded-md my-2"></div>
        <div className="bg-gray-300 w-16 h-4 rounded-md"></div>
        <div className="bg-gray-300 w-16 h-4 rounded-md"></div>
      </div>
    </div>
  );
};

export default VisitsCardSkeleton;
