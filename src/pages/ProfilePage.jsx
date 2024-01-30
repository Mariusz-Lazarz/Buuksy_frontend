import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Container from "../components/Container";
import VisitsCard from "../components/VisitsCard";
import { getUserData, getToken } from "../utils/AuthUtils";
import VisitsCardSkeleton from "../components/VisitsCardSkeleton";

export default function ProfilePage() {
  const [visits, setVisits] = useState([]);
  const user = useMemo(() => getUserData(), []);
  const [isLoading, setIsLoading] = useState(true);

  const anticipatedItemCount = 4;

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      const fetchVisits = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3001/api/v1/visits/user",
            {
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            }
          );
          setVisits(response.data.visits);
        } catch (error) {
          console.error("Error fetching visits data:", error);
        }
        setIsLoading(false);
      };

      fetchVisits();
    }
  }, [user]);

  if (isLoading) {
    return (
      <Container>
        <div className="flex justify-between">
          <h1 className="text-3xl">{user ? `Hi ${user.name}` : "Welcome"}</h1>
        </div>
        <h2 className="text-xl my-10">Your visits</h2>
        <div className="mt-10">
          {Array.from({ length: anticipatedItemCount }, (_, index) => (
            <VisitsCardSkeleton key={index} />
          ))}
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex justify-between">
        <h1 className="text-3xl">{user ? `Hi ${user.name}` : "Welcome"}</h1>
      </div>
      <h2 className="text-xl my-10">Your visits</h2>
      <div className="mt-10">
        {visits.map((visit, index) => (
          <VisitsCard key={index} visit={visit} />
        ))}
      </div>
    </Container>
  );
}
