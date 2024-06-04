"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getId, onOpen } from "@/redux/features/modal/productDetailSlice";
import Link from "next/link";
import { addToWishlist, removeFromWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { useToast } from "../ui/use-toast";

const ProductMainCard = ({ data }: any) => {
  const { wishlist } = useSelector((state: any) => state.wishlist);
  const [isRemoveFromWishlist, setIsRemoveFromWishlist] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const onModalOpen = () => {
    dispatch(onOpen());
    dispatch(getId(data?._id));
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
        ...data,
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

  const removeFromCartHandler = (wishlistData: any) => {
    console.log("Remove from wishlist", wishlistData);
    setIsRemoveFromWishlist(true);
    dispatch(removeFromWishlist(wishlistData));
    localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
  };



  const isItemExist =
    wishlist && wishlist.find((i: any) => i._id === data?._id);

  useEffect(() => {
    console.log("Is Remove From wishlist", wishlist, isRemoveFromWishlist);
    if (isRemoveFromWishlist) {
      localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
      setIsRemoveFromWishlist(false);
      // console.log("Remove From Cart", isRemoveFromCart);
    }
  }, [isRemoveFromWishlist]);

  return (
    <div>
      <Card className="w-[16rem] border-none rounded-lg">
        <CardHeader className="w-full h-[14rem] relative bg-[#F5F5F5]">
          <Image
            src={data?.images[0]?.url}
            alt="Shoes"
            width={250}
            height={250}
          />
          <div className="absolute top-2 right-2">
            {isItemExist ? (
              <div className="flex justify-center items-center w-8 h-8 text-center cursor-pointer">
                <Image
                  src={"/icons/Heart.png"}
                  onClick={() => removeFromCartHandler(data)}
                  alt="Heart"
                  width={20}
                  height={20}
                />
              </div>
            ) : (
              <div className="flex justify-center items-center bg-white w-8 h-8 text-center rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer">
                <Heart className="w-5 h-5 " onClick={() => addToWishlistHandler(data?._id)} />
              </div>
            )}
          </div>
          <div className="absolute top-12 right-2">
            <div className="flex justify-center items-center bg-white w-8 h-8 text-center rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer">
              <Eye className="w-5 h-5" onClick={onModalOpen} />
            </div>
            <div className="flex mt-2 justify-center items-center bg-white w-8 h-8 text-center rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer">
              <ShoppingCart className="w-5 h-5" onClick={onModalOpen} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pl-0 pt-2 px-1">
          <Link href={`/product/${data?._id}`} className="cursor-pointer">
            <h2 className="text-base font-semibold">{data?.name}</h2>
          </Link>

          <div className="flex justify-between pt-2 gap-3">
            <div className="flex flex-row gap-2">
              <p className="text-base font-medium text-primary">$120</p>
              <p className="text-base font-medium line-through text-gray-400">
                $160
              </p>
            </div>
            <div>
              <p className="text-base font-medium pr-2">28 sold</p>
            </div>
          </div>
          <div className="flex justify-between pt-2 gap-3">
            <div></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductMainCard;
