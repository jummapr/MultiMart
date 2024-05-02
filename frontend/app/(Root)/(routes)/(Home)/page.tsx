import React from "react";
import Hero from "./components/Hero";
import ShowCaseSection from "./components/ShowCaseSection";
import BestDeal from "./components/BestDeal";
import BrowseByCategory from "./components/BrowseByCategory";
import { Separator } from "@/components/ui/separator";
import FeaturedProducts from "./components/FeaturedProducts";
import OurFeatures from "./components/OurFeatures";
import { Button } from "@/components/ui/button";

const RootPage = () => {
  return (
    <div className="w-full px-0 lg:px-28 md:px-14">
      <Hero />
      <BrowseByCategory />
      <ShowCaseSection />
      <Separator />
      <div className="w-full py-12">
        <BestDeal />
      </div>
      <FeaturedProducts />
      <OurFeatures />
    </div>
  );
};

export default RootPage;
