import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ProductDetailInfo = () => {
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
          <p className="py-2 whitespace-pre-line text-[16px] leading-8 pb-10">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis
            nisi nobis, veritatis vero aperiam molestiae explicabo minima
            praesentium dicta, at amet. Odit iste mollitia corrupti laborum
            accusantium quo velit, adipisci neque temporibus expedita officiis!
            Ad deleniti perspiciatis vitae hic beatae. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Obcaecati, eligendi quisquam!
            Sint labore voluptas voluptatum maxime velit minima atque quibusdam?
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </p>
          <p className="py-2 whitespace-pre-line text-[16px] leading-8 pb-10">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis
            nisi nobis, veritatis vero aperiam molestiae explicabo minima
            praesentium dicta, at amet. Odit iste mollitia corrupti laborum
            accusantium quo velit, adipisci neque temporibus expedita officiis!
            Ad deleniti perspiciatis vitae hic beatae. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Obcaecati, eligendi quisquam!
            Sint labore voluptas voluptatum maxime velit minima atque quibusdam?
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </p>
          <p className="py-2 whitespace-pre-line text-[16px] leading-8 pb-10">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis
            nisi nobis, veritatis vero aperiam molestiae explicabo minima
            praesentium dicta, at amet. Odit iste mollitia corrupti laborum
            accusantium quo velit, adipisci neque temporibus expedita officiis!
            Ad deleniti perspiciatis vitae hic beatae. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Obcaecati, eligendi quisquam!
            Sint labore voluptas voluptatum maxime velit minima atque quibusdam?
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </p>
        </TabsContent>
        <TabsContent value="productreviews">
          <div className="flex justify-center items-center">No reviews yet</div>
        </TabsContent>
        <TabsContent value="sellerinformation">
          <div className="w-full flex items-center justify-between">
            <div className="lg:w-[55%]">
              <div className="flex pt-7 space-x-3">
                <Image
                  src={
                    "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png"
                  }
                  alt="Product Company Logo"
                  className="rounded-full w-[50px] h-[50px]"
                  width={50}
                  height={50}
                />
                <div>
                  <h3 className="shop_name">Amazon LTD</h3>
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
                    <p>29 July, 2023</p>
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
