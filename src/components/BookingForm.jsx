import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BookingFormSkeleton from "./BookingFormSkeleton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isLoggedIn, getUserData } from "../utils/AuthUtils";
import { toast } from "react-toastify";
import styles from "./BookingForm.module.css";
import { apiService } from "../utils/apiService";
const FULL_HOURS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

export default function BookingForm({ service, item, hideForm }) {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const getFilteredHours = useCallback(() => {
    const now = new Date();
    const isToday = startDate.toDateString() === now.toDateString();

    if (isToday) {
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();

      return FULL_HOURS.filter((hour) => {
        const [hourPart, minutePart] = hour.split(":").map(Number);
        return (
          hourPart > currentHour ||
          (hourPart === currentHour && minutePart > currentMinutes)
        );
      });
    }

    return FULL_HOURS;
  }, [startDate]);
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [availableHours, setAvailableHours] = useState(getFilteredHours());
  const [isLoading, setIsLoading] = useState(false);
  const user = getUserData();

  const combineDateAndTime = (date, time) => {
    if (!date || !time) return null;

    const timeParts = time.split(":");
    const hour = parseInt(timeParts[0], 10);
    const minute = parseInt(timeParts[1], 10);

    const dateTime = new Date(date);
    dateTime.setHours(hour, minute, 0, 0);

    const utcDateTime = new Date(dateTime.getTime() + 60 * 60000);
    return utcDateTime.toISOString();
  };

  const saveDataToDatabase = async () => {
    try {
      if (!isLoggedIn() || !user) {
        return toast.error("Please login to book a visit! Redirecting...", {
          onClose: () => navigate("/login"),
        });
      }
      if (
        selectedEmployeeId === "" ||
        selectedHour === "" ||
        startDate === null
      ) {
        return toast.error(
          "Please fill in all fields (employee, date and time)"
        );
      }

      const dateTime = combineDateAndTime(startDate, selectedHour);
      const now = new Date();

      if (dateTime < now) {
        return toast.error(
          "You cannot book a visit in the past. Please select a future date and time."
        );
      }

      const commonData = {
        userEmail: user.email,
        salonId: item._id,
        employeeId: selectedEmployeeId,
        name: service.name,
        price: service.price,
        date: dateTime,
      };

      await apiService.bookVisit(commonData);

      hideForm();
      return toast.success("Your visit has been booked successfully.");
    } catch (error) {
      console.error("Booking error:", error);
      return toast.error(error.message || "An error occurred.");
    }
  };

  useEffect(() => {
    const checkAvailability = async () => {
      if (!startDate || !selectedEmployeeId) {
        setAvailableHours(getFilteredHours());
        return;
      }
      try {
        setIsLoading(true);
        const data = await apiService.checkAvailability({
          date: startDate,
          salonId: item._id,
          employeeId: selectedEmployeeId,
        });

        let updatedAvailableHours = getFilteredHours();

        if (data.bookedSlots && data.bookedSlots.length > 0) {
          const bookedSlots = data.bookedSlots;
          updatedAvailableHours = updatedAvailableHours.filter(
            (hour) => !bookedSlots.includes(hour)
          );
        }

        setAvailableHours(updatedAvailableHours);
      } catch (error) {
        console.error("Error checking availability:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAvailability();
  }, [selectedEmployeeId, startDate, item?._id, getFilteredHours]);

  const handleSelectEmployee = (_id) => {
    setSelectedEmployeeId(_id);
  };

  const isSunday = (date) => {
    return date.getDay() !== 0;
  };

  return (
    <div
      className={`flex flex-col gap-4 absolute top-0 right-0 transform translate-x-full h-screen shadow-lg p-12 z-50 w-full md:w-1/4 bg-white ${styles.slideIn}`}
    >
      {isLoading ? (
        <BookingFormSkeleton />
      ) : (
        <>
          <div className="flex justify-between w-full">
            <h1 className="text-2xl">{service.name}:</h1>
            <p className="text-red-500 text-2xl">Total: ${service.price}</p>
          </div>
          {/* Date */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl">Pick a date:</h1>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              filterDate={isSunday}
              minDate={new Date()}
              className="cursor-pointer"
            />
          </div>
          {/* Employees */}
          <div className="flex flex-col gap-4 justify-center w-full">
            <h1 className="text-2xl">Pick an employee:</h1>
            <div className="flex gap-4">
              {item.employees.map((employee) => (
                <div
                  className={`flex items-center gap-2 cursor-pointer`}
                  key={employee._id}
                  onClick={() => handleSelectEmployee(employee._id)}
                >
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className={`w-10 h-10 rounded-full ${
                      selectedEmployeeId === employee._id
                        ? "ring-2 ring-green-500"
                        : ""
                    }`}
                  />
                  <p className="text-xl">{employee.name}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Hours */}
          <div>
            <h1 className="text-2xl mb-4">Choose a time slot:</h1>
            <div className="flex gap-2 overflow-y-auto pb-4">
              {availableHours.length !== 0 ? (
                availableHours.map((hour) => (
                  <span
                    className={`bg-gray-300 rounded-full px-2 cursor-pointer ${
                      selectedHour === hour ? "bg-green-300" : ""
                    }`}
                    key={hour}
                    onClick={() => setSelectedHour(hour)}
                  >
                    {hour}
                  </span>
                ))
              ) : (
                <p className="text-red-500 text-lg ">
                  No visits left for today, change a date
                </p>
              )}
            </div>
          </div>
          {/* Buttons */}
          <div className="flex gap-4">
            <button
              className="bg-teal-500 px-4 py-2 rounded-md text-white"
              onClick={saveDataToDatabase}
            >
              Book
            </button>
            <button
              className="bg-red-500 px-4 py-2 rounded-md text-white"
              onClick={hideForm}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}
