import { Link } from "react-router-dom";

export default function OfferCard({ item }) {
  return (
    <div className="flex gap-4">
      <div className="relative">
        <img
          src={item.image}
          alt="img"
          className="rounded-md h-36 md:h-44 md:w-72"
        />
        <div className="absolute top-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-bl-md">
          <div className="flex flex-col items-center">
            <span>{item.rating}</span>
            <span className="text-xs">{item.ratings} ratings</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-lg md:text-3xl font-bold opacity-50">
          {item.name}
        </h1>
        <p className="text-sm">{item.address}</p>
        <div className="mt-auto">
          <Link
            className="bg-blue-300 rounded-md text-white px-4 py-2 block max-w-max"
            to={`/offer/${item._id}`}
          >
            Check
          </Link>
        </div>
      </div>
    </div>
  );
}
