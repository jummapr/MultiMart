"use client"

import { DataTable } from '@/components/ui/data-table';
import { useLazyGetAllSellerOrdersQuery } from '@/redux/features/order/orderApi';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { columns } from './columns';

const SellerRefund = () => {
    const { seller } = useSelector((state: any) => state.seller);

    const shopId = seller?.data?._id;
  
    // console.log(shopId, "Shop Id");
  
    const [triggerQuery, { data, isLoading, isSuccess }] =
      useLazyGetAllSellerOrdersQuery(shopId);
  
      
    // console.log(data?.data[0]?.cart[0].stock, "Data Table ");

    const filterRefundOrders = data && data?.data.filter((item: any) => item?.status === "Processing refund")

    const dataTable = filterRefundOrders?.map((item: any) => {
        return {
          productId: item._id,
          name: item?.user?.name,
          status: item?.status,
          stocks: item?.cart[0]?.stock,
          sold_out: item?.cart?.length,
          itemQty: item?.cart?.sold_out,
          price: item?.totalPrice,
        };
      });
  
    useEffect(() => {
      triggerQuery(shopId);
    }, [shopId]);
  
    return (
      <div className="h-full w-full flex items-center justify-center ">
        <div className="w-[70rem] pt-5 pb-10">
          {/* @ts-ignore */}
         {
          isSuccess  ? (
            <DataTable searchKey="name" columns={columns} data={dataTable} />
          ): (
            <h2>Loading..</h2>
          )
         }
        </div>
      </div>
    );
}

export default SellerRefund
