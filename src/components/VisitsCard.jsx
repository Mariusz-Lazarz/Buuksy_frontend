export default function VisitsCard({ visit }) {
  const isVisitEnded = (visitDateIso) => {
    const visitDate = new Date(visitDateIso);
    const currentDate = new Date();
    return visitDate < currentDate;
  };

  const visitEnded = isVisitEnded(visit.date);
  const visitDate = new Date(visit.date);
  const month = visitDate.toLocaleDateString("en-US", { month: "short" });
  const day = visitDate.getDate();
  const year = visitDate.getFullYear();
  const time = visitDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return (
    <div className="border-[1px] flex">
      <div className="w-1/4">
        <img src={visit.salonImage} alt={visit.name} className="h-full"/>
      </div>
      <div className="flex-grow flex flex-col gap-2 items-center justify-center pr-4 border-r border-gray-300 p-4">
        {visitEnded ? (
          <p className="bg-gray-300 w-fit rounded-md text-xs px-2">ENDED</p>
        ) : (
          <p className="bg-yellow-300 w-fit rounded-md text-xs px-2">PENDING</p>
        )}
        <p className="font-bold">{visit.name}</p>
        <p>{visit.salonName}</p>
        <p className="text-red-500 font-bold">${visit.price}</p>
      </div>
      <div className="flex-shrink-0 pl-4 flex flex-col justify-center items-center w-1/4">
        <p className="text-sm">{month}</p>
        <p className="text-4xl">{day}</p>
        <p className="text-sm">{year}</p>
        <p className="text-sm">{time}</p>
      </div>
    </div>
  );
}
