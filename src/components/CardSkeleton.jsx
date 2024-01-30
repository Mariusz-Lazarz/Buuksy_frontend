import React from "react";

export default function CardSkeleton() {
  return (
    <div className="w-full h-auto relative">
      {/* Loading rating */}
      <div className="animate-pulse absolute top-0 right-0 bg-gray-300 rounded-md w-20 h-14"></div>

      {/* Loading image */}
      <div className="animate-pulse">
        <div className="bg-gray-300 w-full h-48 rounded-md"></div>
      </div>

      {/* Loading name and address */}
      <div className="animate-pulse">
        <p className="text-lg font-bold bg-gray-300 w-3/4 h-6 my-2 rounded"></p>
        <p className="text-xs bg-gray-300 w-1/2 h-4 rounded"></p>
      </div>
    </div>
  );
}
