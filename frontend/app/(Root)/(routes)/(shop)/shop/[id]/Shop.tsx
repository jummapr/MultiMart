"use client";

import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Card, CardContent} from "@/components/ui/card";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Rating from "react-rating";
import Image from "next/image";
import {Button} from "@/components/ui/button";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {productData as ProductStaticData} from "@/static/data";
import ProductCard from "@/components/comman/ProductCard";
import {useAllSellerProductMutation, useGetShopInfoMutation} from "@/redux/features/shop/shopApi";
import {useParams} from "next/navigation";
import {onOpen} from "@/redux/features/modal/ShopUpdateModel";
import ProductMainCard from "@/components/comman/ProductMainCard";
import UserReviews from "@/app/(Root)/(routes)/(shop)/shop/components/UserReviews";

const shopData = {
    name: "Gadget Haven",
    avatar: "/placeholder.svg?height=128&width=128",
    phone: "+1 (555) 123-4567",
    totalProducts: 156,
    rating: 4.7,
    joinDate: "2021-03-15",
    products: [
        { id: 1, name: "Smartphone X", price: 599, image: "/placeholder.svg?height=200&width=200" },
        { id: 2, name: "Laptop Pro", price: 1299, image: "/placeholder.svg?height=200&width=200" },
        { id: 3, name: "Wireless Earbuds", price: 129, image: "/placeholder.svg?height=200&width=200" },
    ],
    reviews: [
        { id: 1, user: "Alice", rating: 5, comment: "Great products and service!" },
        { id: 2, user: "Bob", rating: 4, comment: "Good experience overall." },
        { id: 3, user: "Charlie", rating: 5, comment: "Excellent quality items." },
    ],
    events: [
        { id: 1, name: "Summer Sale", date: "2023-07-01", description: "Up to 50% off on selected items" },
        { id: 2, name: "New Arrivals Showcase", date: "2023-08-15", description: "Check out our latest gadgets" },
    ],
}

const Shop = () => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState("products")

    // dummy reviews data
    const reviewsData = [
        { id: 1, name: 'Alice Johnson', rating: 5, date: '2023-08-01', text: 'Great products and excellent service! Will definitely shop here again.', avatar: '/placeholder.svg?height=40&width=40' },
        { id: 2, name: 'Bob Smith', rating: 4, date: '2023-07-28', text: 'Good experience overall. Fast shipping and quality items.', avatar: '/placeholder.svg?height=40&width=40' },
        { id: 3, name: 'Carol Davis', rating: 3, date: '2023-07-25', text: 'Decent shop. Some items were out of stock, but customer service was helpful.', avatar: '/placeholder.svg?height=40&width=40' },
        { id: 4, name: 'David Brown', rating: 5, date: '2023-07-20', text: 'Exceptional quality and fast delivery. Highly recommended!', avatar: '/placeholder.svg?height=40&width=40' },
        { id: 5, name: 'Eva Wilson', rating: 4, date: '2023-07-15', text: 'Very satisfied with my purchase. Will shop here again.', avatar: '/placeholder.svg?height=40&width=40' },
    ];

    // dummy reviews variables
    const dummyaverageRating = reviewsData.reduce((acc, review) => acc + review.rating, 0) / reviewsData.length
    const dummyratingCounts = reviewsData.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1
        return acc
    }, {} as Record<number, number>)

    const params = useParams();

    const {isOpen} = useSelector((state: any) => state.shopUpdateModel);

    const dispatch = useDispatch();

    const {isSeller} = useSelector((state: any) => state.seller);
    const {shopInfo} = useSelector((state: any) => state.shop);
    const productData = useSelector((state: any) => state.shop);
    const [allSellerProduct, {
        isError: allSellerProductIsError,
        data: allSellerProductData,
        error: allSellerProductError,
        isSuccess: allSellerProductIsSuccess,
        isLoading: allSellerProductIsLoading
    }] =
        useAllSellerProductMutation();

    const [getShopInfo, {isError, data, error, isSuccess, isLoading}] =
        useGetShopInfoMutation();

    const totalReviews = productData?.allProduct.reduce((acc: number, item: any) => acc + item?.reviews?.length, 0);

    const totalRating = productData?.allProduct.reduce((acc: number, item: any) => acc + item?.reviews?.reduce((acc: number, item: any) => acc + item?.rating, 0), 0);

    const averageRating = totalRating / totalReviews || 0;

    const shopId = params.id;
    // console.log(shopId)
    // console.log(shopInfo?.avatar?.url)

    const fetchedData = async () => {
        await getShopInfo(shopId);
    };

    const getAllProduct = async () => {
        await allSellerProduct(shopId);
    };

    const onOpenModel = () => {
        dispatch(onOpen());
    };

    const allReviews = productData?.allProduct.map((i: any, index: number) => i.reviews).flat();

    useEffect(() => {
        fetchedData();
        getAllProduct()

        if (data) {
            console.log("Shop Info Data", data);
        }
    }, [isSeller]);
    return (
        <>
            <div className="flex h-full w-full px-40 flex-col md:flex-row md:overflow-hidden">
                <Card className="w-1/2 h-full mt-14 shadow-md">
                    <CardContent className="pt-12 overflow-y-auto">
                        <div className="flex flex-col items-center gap-2">
                            <Avatar className="w-28 h-28">
                                <AvatarImage src={shopInfo?.avatar?.url}/>
                            </Avatar>
                            <h3 className="font-semibold">{shopInfo?.shopName}</h3>
                        </div>
                        <p className="text-sm pt-6 text-justify">
                            {shopInfo?.description}
                        </p>
                        <div className="flex flex-col pt-5">
                            <h4 className="text-md font-semibold">Address</h4>
                            <h3>{shopInfo?.address}</h3>
                        </div>
                        <div className="flex flex-col pt-5">
                            <h4 className="text-md font-semibold">Phone Number</h4>
                            <h3>{shopInfo?.phonenumber}</h3>
                        </div>
                        <div className="flex flex-col pt-5">
                            <h4 className="text-md font-semibold">Total Product</h4>
                            <h3>{productData?.allProduct.length}</h3>
                        </div>
                        <div className="flex flex-col pt-5">
                            <h4 className="text-md font-semibold">Shop Ratings</h4>
                            <div className="flex gap-3">
                                {/* @ts-ignore */}
                                <Rating
                                    initialRating={averageRating}
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
                                <h2>{averageRating}</h2>
                            </div>
                            <div className="flex flex-col pt-5">
                                <h4 className="text-md font-semibold">Joined On</h4>
                                <h3>{shopInfo?.createdAt?.slice(0, 10)}</h3>
                            </div>

                            {isSeller && (
                                <div className="flex flex-col gap-4 py-11 px-6">
                                    <Button className="w-full" onClick={onOpenModel}>Edit Shop</Button>
                                    <Button className="w-full">Logout</Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="px-6 mt-14 w-full">
                    <Tabs defaultValue="shopProducts" className="w-[100%]">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="shopProducts" className="w-full">
                                Shop Products{" "}
                            </TabsTrigger>
                            <TabsTrigger value="shopEvents">Shop Events</TabsTrigger>
                            <TabsTrigger value="shopReviews">Shop Reviews</TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="shopProducts"
                            className="w-full grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-9 xl:grid-cols-3 xl:gap-[20px] "
                        >
                            {productData?.allProduct && productData?.allProduct.map((i: any, index: number) =>
                                <ProductMainCard data={i} key={index}/>
                            )}
                        </TabsContent>
                        <TabsContent
                            value="shopEvents"
                            className="w-full grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-9 xl:grid-cols-3 xl:gap-[20px] "
                        >
                            {ProductStaticData && ProductStaticData.map((i: any, index: number) => <ProductCard/>)}
                        </TabsContent>
                        <TabsContent
                            value="shopReviews"
                            className="w-full gap-5 pb-10"
                        >
                            <UserReviews expanded={expanded} setExpanded={setExpanded} reviewsData={reviewsData} averageRating={dummyaverageRating} ratingCounts={dummyratingCounts}/>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default Shop;
