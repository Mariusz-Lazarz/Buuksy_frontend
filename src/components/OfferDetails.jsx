import OfferService from "./OfferService";
import SalonDetails from "./SalonDetails";

export default function OfferDetails({ item }) {

  return (
    <div className="flex flex-col md:flex-row gap-10">
      <div className="flex flex-col gap-4 w-full md:w-2/3">
        <div className="relative">
          <img src={item.image} alt="img" className="rounded-md h-72 w-full" />
          <div className="absolute top-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-bl-md">
            <div className="flex flex-col items-center">
              <span>{item.rating}</span>
              <span className="text-xs">{item.ratings} ratings</span>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-4xl">{item.name}</h1>
          <p>{item.address}</p>
        </div>
        <div className="border-b-[1px]">
          <h1 className="text-4xl mb-4">Services</h1>
        </div>
        {item.services.map((service, index) => (
          <OfferService
            key={index}
            service={service}
            item={item}
          />
        ))}
      </div>
      <div className="bg-slate-50 w-full md:w-1/3 p-4 h-fit">
        <SalonDetails employees={item.employees} />
      </div>

    </div>
  );
}
