"use client";

import Gallery from "@/components/gallery";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ImageData } from "@/static/image";
import React, { useEffect, useState } from "react";
import QuintetteButton from "./QuintetteButton";
import { Heart, StarOff } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import ProductDetailInfo from "./components/ProductDetailInfo";
import Rating from "react-rating";
import { Star } from "lucide-react";
import ProductCard from "@/components/comman/ProductCard";
import { useProductDetailQuery } from "@/redux/features/product/productApi";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { addToWishlist } from "@/redux/features/wishlist/wishlistSlice";

const ProductDetail = () => {
  const { cart } = useSelector((state: any) => state.cart);
  const { wishlist } = useSelector((state: any) => state.wishlist);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const [count, setCount] = useState(1);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const params = useParams();
  const {
    data: productDetail,
    isLoading,
    isFetching,
  } = useProductDetailQuery(params.id);

  const handleSubmitMessage = () => {
    console.log("Messaging....");
  };

  const addToCartHandler = (id: string) => {
    const isItemExist = cart && cart.find((i: any) => i._id === id);

    if (isItemExist) {
      toast({
        variant: "destructive",
        description: "Item already in cart!",
      });
    } else {
      if (productDetail?.data?.stock < count) {
        toast({
          variant: "destructive",
          description: "Product stock limited!",
        });
      } else {
        const cartData = {
          ...productDetail?.data,
          qty: count,
        };
        dispatch(addToCart(cartData));
        toast({
          description: "Item added to cart!",
        });
      }
    }
  };

  const addToWishlistHandler = (id: string) => {
    const isItemExist = wishlist && wishlist.find((i: any) => i._id === id);

    if (isItemExist) {
      toast({
        variant: "destructive",
        description: "Item already in wishlist!",
      });
    } else {
      const wishlist = {
        ...productDetail?.data,
      };
      dispatch(addToWishlist(wishlist));
      toast({
        description: "Item added to wishlist!",
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
  }, [wishlist, dispatch]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart, dispatch]);

  return (
    <div className="flex flex-col h-full w-full py-10 px-6 md:px-12 lg:px-40 xl:py-16 lg:py-16 md:py-16">
      <div className="grid h-full w-full grid-cols-1 gap-8 sm:gap-0 md:grid-cols-2 sm:grid-cols-2  lg:grid-cols-2 ">
        <div className="w-[24rem] sm:w-[16rem] md:w-[20rem] lg:w-[20rem] xl:w-[30rem] ">
          <Gallery images={productDetail?.data?.images} />
        </div>
        <div className="">
          <div>
            <h2 className="font-semibold text-3xl">
              {productDetail?.data?.name}
            </h2>

            <div className="pt-3 w-full flex flow-row items-center gap-6">
              {/* @ts-ignore */}
              <Rating
                initialRating={4}
                readonly
                emptySymbol={
                  <Image
                    src={"/icons/Vector.png"}
                    alt="rattingStarIcons"
                    width={16}
                    height={16}
                  />
                }
                fullSymbol={
                  <Image
                    src={"/icons/fieldstar.png"}
                    alt="rattingStarIcons"
                    width={16}
                    height={16}
                  />
                }
              />
              <h4 className="text-gray-500">(150 Reviews)</h4>
              <h4 className="text-green-400">In stock</h4>
            </div>
          </div>
          <div className="pt-5 flex">
            <h4 className="font-bold text-[18px] text-[#333] font-Roboto">
              ${productDetail?.data?.discountPrice}
            </h4>
            <h3 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
              ${productDetail?.data?.originalPrice}
            </h3>
          </div>
          <div className="pt-6">
            <p className="text-sm font-medium">
              {productDetail?.data?.description}
            </p>
          </div>
          <Separator className="my-9" />
          <div className="flex gap-8 items-center ">
            <div className="flex items-center justify-start">
              <Button
                variant={"outline"}
                className="hover:bg-primary rounded-none hover:text-white"
                onClick={incrementCount}
              >
                +
              </Button>
              <Button
                variant={"outline"}
                className="px-4 rounded-none hover:bg-white cursor-default"
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
            <Button onClick={() => addToCartHandler(productDetail?.data?._id)}>
              Add to cart
              <ShoppingCart size={23} />
            </Button>
            <div className="flex justify-center items-center bg-white w-8 h-8 text-center rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer">
              <Heart className="w-5 h-5 " onClick={() => addToWishlistHandler(productDetail?.data?._id)}/>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-9">
            <Link href={`/shop/${productDetail?.data?.shop?._id}`}>
              <div className="flex pt-7 space-x-3">
                <Image
                  src={productDetail?.data?.shop?.avatar?.url}
                  alt="Product Company Logo"
                  className="rounded-full w-[50px] h-[50px]"
                  width={50}
                  height={50}
                />
                <div>
                  <h3 className="shop_name">
                    {productDetail?.data?.shop?.shopName}
                  </h3>
                  <h5 className="pb-3 text-[15px]">4.5 Ratting</h5>
                </div>
              </div>
            </Link>
            <Button className="mt-5" onClick={handleSubmitMessage}>
              Send Message
            </Button>
          </div>
        </div>
      </div>
      <div className="pt-24 w-full">
        <ProductDetailInfo data={productDetail?.data} />
      </div>
      <div className="w-full pt-5">
        <div className="pb-16 flex gap-6 items-center">
          <div className="w-[20px] h-[40px] bg-primary rounded-sm" />
          <h2 className="font-semibold text-xl text-primary text-pretty">
            Related Item
          </h2>
        </div>

        <div className="flex items-center gap-8 ">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
