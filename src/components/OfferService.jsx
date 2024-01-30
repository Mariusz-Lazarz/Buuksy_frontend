import { useState } from "react";
import BookingForm from "./BookingForm";

export default function OfferService({ service, item }) {
  const [isVisible, setIsVisible] = useState(false);
  const showForm = () => {
    setIsVisible(true);
  };
  const hideForm = () => {
    setIsVisible(false);
  };

  
  return (
    <div className="border-b-[1px]">
      <div className="flex justify-between items-center">
        <h2 className="mb-4">{service.name}</h2>
        <div className="flex gap-2 items-center mb-4">
          <div className="flex flex-col items-center">
            <span>${service.price}</span>
            <span className="text-xs">1h</span>
          </div>
          <div>
            <button
              className="bg-teal-500 px-4 py-2 rounded-md text-white"
              onClick={showForm}
            >
              Book
            </button>
          </div>
        </div>
      </div>
      {isVisible && (
        <BookingForm
          service={service}
          item={item}
          hideForm={hideForm}
          isVisible={isVisible}
        />
      )}
    </div>
  );
}
