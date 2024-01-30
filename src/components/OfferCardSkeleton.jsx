const OfferCardSkeleton = () => (
  <div className="flex gap-4">
    <div className="rounded-md h-36 md:h-44 md:w-72 bg-gray-300 animate-pulse"></div>
    <div className="flex flex-col gap-2">
      <p className="w-72 h-8 rounded-md bg-gray-300"></p>
      <p className="w-64 h-6 rounded-md bg-gray-300"></p>
      <button className="w-20 h-10 rounded-md bg-gray-300 mt-auto"></button>
    </div>
  </div>
);

export default OfferCardSkeleton;
