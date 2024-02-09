import { useEffect, useState } from "react";
import Container from "../components/Container";
import { useSearchParams } from "react-router-dom";
import OfferCard from "../components/OfferCard";
import OfferCardSkeleton from "../components/OfferCardSkeleton";
import { apiService } from "../utils/apiService";
import Categories from "../components/Categories";
import { toast } from "react-toastify";

export default function OfferPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const anticipatedItemCount = 5;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await apiService.fetchSalons(category);
        setItems(data);
      } catch (error) {
        toast.error("Failed to get resources, please try again");
      }
      setIsLoading(false);
    };

    fetchData();
  }, [category]);

  if (isLoading) {
    return (
      <Container>
        <Categories />{" "}
        <div className="flex flex-col gap-4">
          {Array.from({ length: anticipatedItemCount }, (_, index) => (
            <OfferCardSkeleton key={index} />
          ))}
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Categories />
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <OfferCard key={item._id} item={item} />
        ))}
      </div>
    </Container>
  );
}
