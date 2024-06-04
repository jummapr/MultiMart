import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ProductDetailInfo = ({ data }: any) => {
  const date = new Date(data?.shop?.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div>
      <Tabs defaultValue="productdetail" className=" w-[90%]">
        <TabsList className="w-full justify-between">
          <TabsTrigger value="productdetail">Product Detail</TabsTrigger>
          <TabsTrigger value="productreviews">Product Reviews</TabsTrigger>
          <TabsTrigger value="sellerinformation">
            Seller Information
          </TabsTrigger>
        </TabsList>
        <TabsContent value="productdetail">
          <p>{data?.description}</p>
        </TabsContent>
        <TabsContent value="productreviews">
          <div className="flex justify-center items-center">No reviews yet</div>
        </TabsContent>
        <TabsContent value="sellerinformation">
          <div className="w-full flex items-center justify-between">
            <div className="lg:w-[55%]">
              <div className="flex pt-7 space-x-3">
                <Image
                  src={data?.shop?.avatar?.url}
                  alt="Product Company Logo"
                  className="rounded-full w-[50px] h-[50px]"
                  width={50}
                  height={50}
                />
                <div>
                  <h3 className="shop_name">{data?.shop?.shopName}</h3>
                  <h5 className="pb-3 text-[15px]">4.5 Ratting</h5>
                </div>
              </div>
              <p className="pt-3 font-medium text-base">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tempore totam accusamus architecto quis laboriosam dolorum sit
                magni aut inventore quisquam. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Aliquam pariatur, nemo expedita
                porro quia nam dolorum cumque tempore quasi ad!
              </p>
            </div>
            <div className="flex flex-col items-start justify-start gap-3">
              <div className="flex flex-row items-center gap-2">
                <h3 className="font-semibold">Joined On:</h3>
                <p>{formattedDate}</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <h3 className="font-semibold">Total Products:</h3>
                <p>1200</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <h3 className="font-semibold">Total Reviews:</h3>
                <p>1200</p>
              </div>
              <Button>Visit shop</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetailInfo;
