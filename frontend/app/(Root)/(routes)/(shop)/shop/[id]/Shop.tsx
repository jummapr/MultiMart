"use client";

import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";
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
import {Star, Phone, Package, Calendar} from 'lucide-react';
import {Badge} from "@/components/ui/badge"
import ProductMainCard from "@/components/comman/ProductMainCard";
import ShopReviews from "@/app/(Root)/(routes)/(shop)/shop/components/ShopReviews";

const shopData = {
    name: "Gadget Haven",
    avatar: "/placeholder.svg?height=128&width=128",
    phone: "+1 (555) 123-4567",
    totalProducts: 156,
    rating: 4.7,
    joinDate: "2021-03-15",
    products: [
        {id: 1, name: "Smartphone X", price: 599, image: "/placeholder.svg?height=200&width=200"},
        {id: 2, name: "Laptop Pro", price: 1299, image: "/placeholder.svg?height=200&width=200"},
        {id: 3, name: "Wireless Earbuds", price: 129, image: "/placeholder.svg?height=200&width=200"},
    ],
    reviews: [
        {id: 1, user: "Alice", rating: 5, comment: "Great products and service!"},
        {id: 2, user: "Bob", rating: 4, comment: "Good experience overall."},
        {id: 3, user: "Charlie", rating: 5, comment: "Excellent quality items."},
    ],
    events: [
        {id: 1, name: "Summer Sale", date: "2023-07-01", description: "Up to 50% off on selected items"},
        {id: 2, name: "New Arrivals Showcase", date: "2023-08-15", description: "Check out our latest gadgets"},
    ],
}

const Shop = () => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState("products")

    // dummy reviews data
    const reviewsData = [
        {
            id: 1,
            name: 'Alice Johnson',
            rating: 5,
            date: '2023-08-01',
            text: 'Great products and excellent service! Will definitely shop here again.',
            avatar: '/placeholder.svg?height=40&width=40'
        },
        {
            id: 2,
            name: 'Bob Smith',
            rating: 4,
            date: '2023-07-28',
            text: 'Good experience overall. Fast shipping and quality items.',
            avatar: '/placeholder.svg?height=40&width=40'
        },
        {
            id: 3,
            name: 'Carol Davis',
            rating: 3,
            date: '2023-07-25',
            text: 'Decent shop. Some items were out of stock, but customer service was helpful.',
            avatar: '/placeholder.svg?height=40&width=40'
        },
        {
            id: 4,
            name: 'David Brown',
            rating: 5,
            date: '2023-07-20',
            text: 'Exceptional quality and fast delivery. Highly recommended!',
            avatar: '/placeholder.svg?height=40&width=40'
        },
        {
            id: 5,
            name: 'Eva Wilson',
            rating: 4,
            date: '2023-07-15',
            text: 'Very satisfied with my purchase. Will shop here again.',
            avatar: '/placeholder.svg?height=40&width=40'
        },
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

    // for showing the reviews on rewview tab.
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
            <div className="container mx-auto px-4 py-8">
                <Card className="mb-8">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <Avatar className="w-32 h-32">
                                <AvatarImage src={shopInfo?.avatar?.url} alt={shopData.name}/>
                                <AvatarFallback>{shopInfo?.shopName?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow text-center md:text-left">
                                <h1 className="text-3xl font-bold mb-2">{shopInfo?.shopName}</h1>
                                <div className="flex items-center justify-center md:justify-start mb-2">
                                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1"/>
                                    <span className="font-semibold">{averageRating}</span>
                                </div>
                                <div
                                    className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <Phone className="w-4 h-4 mr-1"/>
                                        {shopInfo?.phoneNumber}
                                    </div>
                                    <div className="flex items-center">
                                        <Package className="w-4 h-4 mr-1"/>
                                        {productData?.allProduct.length} products
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1"/>
                                        Joined on {new Date(shopInfo?.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Tabs defaultValue="products" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="products">Products</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                        <TabsTrigger value="events">Events</TabsTrigger>
                    </TabsList>
                    <TabsContent value="products">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                            {productData?.allProduct.map((product: any, index: number) =>
                                <ProductMainCard data={product} key={index}/>
                            )
                            }
                        </div>
                    </TabsContent>
                    <TabsContent value="reviews">
                        <div className="space-y-6 mt-6">
                            <ShopReviews reviewsData={reviewsData} expanded={expanded} setExpanded={setExpanded}
                                         averageRating={dummyaverageRating} ratingCounts={dummyratingCounts}/>
                        </div>
                    </TabsContent>
                    <TabsContent value="events">
                        <div className="space-y-6 mt-6">
                            {shopData.events.map((event) => (
                                <Card key={event.id}>
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold text-lg">{event.name}</h3>
                                            <Badge
                                                variant="secondary">{new Date(event.date).toLocaleDateString()}</Badge>
                                        </div>
                                        <p className="text-gray-600">{event.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
};

export default Shop;
