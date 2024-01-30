import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import OfferDetails from "../components/OfferDetails";
import OfferDetailsSkeleton from "../components/OfferDetailsSkeleton";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function OfferDetailsPage() {
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/salons/${id}`
        );
        setItem(response.data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }

    fetchData();
  }, [id]);

  return (
    <Container>
      {isLoading ? <OfferDetailsSkeleton /> : <OfferDetails item={item} />}
    </Container>
  );
}
