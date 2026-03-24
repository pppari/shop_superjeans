import MainLayout from "@/components/layout/main";
import NewProduct from "@/components/NewProduct";
import PromotionCard from "@/components/PromotionCard";
import RecomendProduct from "@/components/RecomendProduct";
import RoomDirectory from "@/components/RoomDirectory";

export default function Home() {
  return (
    <MainLayout>
      <RoomDirectory />
      <PromotionCard />
      <RecomendProduct />
      <NewProduct />
    </MainLayout>
  );
}
