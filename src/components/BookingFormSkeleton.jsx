export default function BookingFormSkeleton() {
  return (
    <>
      {/* Service Name and Price Skeleton */}
      <div className="flex justify-between w-full">
        <div className="text-2xl bg-gray-300 rounded h-6 w-3/4"></div>
        <div className="text-2xl bg-gray-300 rounded h-6 w-1/4"></div>
      </div>

      {/* Date Picker Skeleton */}
      <div className="flex items-center gap-4">
        <div className="text-2xl bg-gray-300 rounded h-6 w-1/4"></div>
        <div className="bg-gray-300 rounded h-10 w-3/4"></div>
      </div>

      {/* Employees Skeleton */}
      <div className="flex flex-col gap-4 justify-center w-full">
        <div className="text-2xl bg-gray-300 rounded h-6 w-1/2"></div>
        <div className="flex gap-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="bg-gray-300 rounded-full h-10 w-10"></div>
              <div className="bg-gray-300 rounded h-6 w-20"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Hours Skeleton */}
      <div>
        <div className="text-2xl bg-gray-300 rounded h-6 w-1/2 mb-4"></div>
        <div className="flex gap-2 overflow-y-auto pb-4">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-300 rounded-full h-6 w-12"
            ></div>
          ))}
        </div>
      </div>

      {/* Buttons Skeleton */}
      <div className="flex gap-4">
        <div className="bg-gray-300 rounded-md h-10 w-1/2"></div>
        <div className="bg-gray-300 rounded-md h-10 w-1/2"></div>
      </div>
    </>
  );
}
