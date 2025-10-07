

import MainLayout from "@/components/layout/main";
import PromotionCard from "@/components/PromotionCard";
import RecomendProduct from "@/components/RecomendProduct";
import RoomDirectory from "@/components/RoomDirectory";

export default function Home() {

  return (
    <MainLayout>
      <RoomDirectory />
      <PromotionCard />
      <RecomendProduct />
    </MainLayout>

  );
}
