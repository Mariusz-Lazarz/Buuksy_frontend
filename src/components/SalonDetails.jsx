import React from "react";
import { HiPhone } from "react-icons/hi";

export default function SalonDetails({ employees }) {
  const weekSchedule = [
    { day: "Monday", hours: "9:00 - 18:00" },
    { day: "Tuesday", hours: "9:00 - 18:00" },
    { day: "Wednesday", hours: "9:00 - 18:00" },
    { day: "Thursday", hours: "9:00 - 18:00" },
    { day: "Friday", hours: "9:00 - 18:00" },
    { day: "Saturday", hours: "9:00 - 18:00" },
    { day: "Sunday", hours: "Closed!" },
  ];
  return (
    <>
      <h2 className="mb-8">Our Employees:</h2>
      <div className="flex flex-col gap-2">
        {employees.map((employee, index) => (
          <div className="flex items-center gap-2" key={index}>
            <img
              src={employee.image}
              alt="person"
              className="w-10 h-10 rounded-full"
            />
            <p className="text-xl">{employee.name}</p>
          </div>
        ))}
      </div>
      <h2 className="mt-8">Conntact and openning hours</h2>
      <div className="flex items-center justify-between border-b-[1px] border-t-[1px] my-4 py-4">
        <span className="flex gap-2 items-center">
          <HiPhone />
          999 999 999
        </span>
        <button className="bg-white px-4 py-2 rounded-md border">Call</button>
      </div>
      <div>
        {weekSchedule.map(({ day, hours }) => (
          <div key={day} className="flex justify-between">
            <span>{day}</span>
            <span>{hours}</span>
          </div>
        ))}
      </div>
    </>
  );
}
