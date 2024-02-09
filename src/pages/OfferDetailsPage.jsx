import { useEffect, useState } from "react";
import Container from "../components/Container";
import OfferDetails from "../components/OfferDetails";
import OfferDetailsSkeleton from "../components/OfferDetailsSkeleton";
import { apiService } from "../utils/apiService";
import { useParams } from "react-router-dom";

export default function OfferDetailsPage() {
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await apiService.fetchSalonById(id);
        setItem(data);
      } catch (error) {
        console.error("Error fetching salon details:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  return (
    <Container>
      {isLoading ? <OfferDetailsSkeleton /> : <OfferDetails item={item} />}
    </Container>
  );
}
