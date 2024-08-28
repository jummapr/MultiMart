"use client"

import {useDispatch, useSelector} from "react-redux";
import {useLazyGetAllSellerOrdersQuery} from "@/redux/features/order/orderApi";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";

const WithdrawMoneyPage = () => {
    const dispatch = useDispatch();
    const [deliveredOrder, setDeliveredOrder] = useState(null);

    // const { sellerOrders } = useSelector((state: any) => state.order);
    const {seller} = useSelector((state: any) => state.seller);

    const [trigger, {isSuccess, data: sellerOrdersData}] = useLazyGetAllSellerOrdersQuery();

    // console.log("Seller Orders Data", sellerOrdersData);
    // console.log("Filtered Orders", deliveredOrder);


    useEffect(() => {
        trigger(seller?.data?._id);
    }, [seller?.data?._id]);

    type Order = {
        totalPrice: number;
    };

    useEffect(() => {
        if (isSuccess) {
            const orderData = sellerOrdersData && sellerOrdersData?.data?.filter((item: any) => item.status === "Delivered");
            setDeliveredOrder(orderData);
        }
    }, [isSuccess, sellerOrdersData]);

    // @ts-ignore
    const totalEarnigWithoutTax = deliveredOrder && deliveredOrder?.reduce((acc: number, item: Order) => {
        return acc + item?.totalPrice
    }, 0);

    // @ts-ignore
    const serviceCharge = totalEarnigWithoutTax * 0.02;
    // @ts-ignore
    const availableBalance = (totalEarnigWithoutTax - serviceCharge).toFixed(2);

    // console.log("Available Balance", availableBalance);

    return (
        <div>
            <div className="w-full h-screen flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <h2>Available Balance: {availableBalance}</h2>
                    <Button>Withdraw</Button>
                </div>
            </div>
        </div>
    )

}

export default WithdrawMoneyPage;