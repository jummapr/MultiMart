import React from "react";
import Hero from "./components/Hero";
import ShowCaseSection from "./components/ShowCaseSection";
import BestDeal from "./components/BestDeal";
import BrowseByCategory from "./components/BrowseByCategory";
import { Separator } from "@/components/ui/separator";
import FeaturedProducts from "./components/FeaturedProducts";
import OurFeatures from "./components/OurFeatures";

const RootPage = () => {
  return (
    <div className="w-full px-0 lg:px-28 md:px-14">
      <Hero />
      <ShowCaseSection />
      <Separator />
      <BrowseByCategory />
      <BestDeal />
      <FeaturedProducts />
      <OurFeatures />
    </div>
  );
};

export default RootPage;
