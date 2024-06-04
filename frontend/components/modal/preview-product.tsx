"use client";

import React, { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { useDispatch, useSelector } from "react-redux";
import { onClose } from "@/redux/features/modal/productDetailSlice";
import Gallery from "../gallery";
import { ImageData } from "@/static/image";
import Image from "next/image";
import { productData } from "@/static/data";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { addToCart } from "@/redux/features/cart/cartSlice";

const PreViewModal = () => {
  const { cart } = useSelector((state: any) => state.cart);

  const { isOpen, id } = useSelector((state: any) => state.productDetailModal);
  const [count, setCount] = useState(0);
  const { allProduct } = useSelector((state: any) => state.product);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const [productDataState, setProductDataState] = useState<any>([]);

  // console.log("Product Id", id);
  const onCloseModal = () => {
    dispatch(onClose());
    setCount(0);
  };

  const handleSubmit = () => {};

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const addToCartHandler =  (id: string) => {
    const isItemExist = cart && cart.find((i: any) => i._id === id);

    if (isItemExist) {
      toast({
        variant: "destructive",
        description: "Item already in cart!",
      });
    } else {
      if (productDataState[0]?.stock < count) {
        toast({
          variant: "destructive",
          description: "Product stock limited!",
        });
      } else {
        const cartData = {
          ...productDataState[0],
          qty: count,
        };
        dispatch(addToCart(cartData));
        toast({
          description: "Item added to cart!",
        });
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart, dispatch]);

  useEffect(() => {
    const filterProduct =
      allProduct && allProduct.filter((item: any) => item?._id === id);
    setProductDataState(filterProduct);
  }, [isOpen, id]);

  console.log("Filtered product data", productDataState);

  return (
    <Modal className="max-w-[50rem]" isOpen={isOpen} onClose={onCloseModal}>
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5 pl-3">
          <Gallery images={productDataState[0]?.images} />
          <div className="flex pt-7 space-x-3">
            <Image
              src={productDataState[0]?.shop?.avatar?.url}
              alt="Product Company Logo"
              className="rounded-full w-[50px] h-[50px]"
              width={50}
              height={50}
            />
            <div>
              <h3 className="shop_name">
                {productDataState[0]?.shop?.shopName}
              </h3>
              <h5 className="pb-3 text-[15px]">
                {productData[0].shop.ratings} Ratting
              </h5>
            </div>
          </div>
          <Button className="mt-5">Send Message</Button>

          <h5 className="text-[16px] text-red-700 mt-5">
            ({productDataState[0]?.sold_out}) Sold out
          </h5>
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <h2 className="font-Roboto text-[#333] text-[20px] font-medium pb-3">
            {productDataState[0]?.name}
          </h2>
          <p className="text-sm text-gray-600">
            {productDataState[0]?.description}
          </p>

          <div className="flex w-full pt-4">
            <h4 className="font-bold text-[18px] text-[#333] font-Roboto">
              ${productDataState[0]?.discountPrice}
            </h4>
            <h3 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
              {productDataState[0]?.originalPrice
                ? "$" + productDataState[0]?.originalPrice
                : null}
            </h3>
          </div>

          <div className="flex items-center pt-5 justify-around">
            <div className="flex ">
              <Button
                variant={"outline"}
                className="hover:bg-primary rounded-none hover:text-white"
                onClick={incrementCount}
              >
                +
              </Button>
              <Button
                variant={"outline"}
                className="px-8 rounded-none hover:bg-white cursor-default"
              >
                {count}
              </Button>
              <Button
                variant={"outline"}
                className=" hover:bg-primary rounded-none hover:text-white"
                onClick={decrementCount}
              >
                -
              </Button>
            </div>

            <Button onClick={() => addToCartHandler(productDataState[0]?._id)}>Add to cart</Button>

            <div className="flex justify-center items-center bg-white w-9 h-9 text-center rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer">
              <Heart className="w-6 h-6 " />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PreViewModal;
