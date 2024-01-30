const OfferDetailsSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-10 animate-pulse">
      <div className="flex flex-col gap-4 w-full md:w-2/3">
        <div className="rounded-md h-80 w-full bg-gray-300"></div>
        <div>
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2 mt-4"></div>
        </div>
        <div className="border-b-[1px] mt-4">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
        </div>
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="h-6 bg-gray-300 rounded w-full mt-2"
          ></div>
        ))}
      </div>
      <div className="bg-slate-50 w-full md:w-1/3 p-4 h-fit">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2 mt-4"></div>
        <div className="h-6 bg-gray-300 rounded w-5/6 mt-4"></div>
      </div>
    </div>
  );
};

export default OfferDetailsSkeleton;
