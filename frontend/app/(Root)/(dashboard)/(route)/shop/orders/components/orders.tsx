import { DataTable } from "@/components/ui/data-table";
import React, { useEffect } from "react";
import { columns } from "./columns";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { useSelector } from "react-redux";
import { useLazyGetAllSellerOrdersQuery } from "@/redux/features/order/orderApi";

const SellerOrders = () => {
  const { seller } = useSelector((state: any) => state.seller);

  const shopId = seller?.data?._id;

  console.log(shopId, "Shop Id");

  const [triggerQuery, { data, isLoading, isSuccess }] =
    useLazyGetAllSellerOrdersQuery(shopId);

    const dataTable = data?.data.map((item: any) => {
      return {
        productId: item._id,
        name: item?.user?.name,
        stocks: item?.cart[0]?.stock,
        sold_out: item?.cart?.length,
        itemQty: item?.cart?.sold_out,
        price: item?.totalPrice,
      };
    });
  console.log(data?.data[0]?.cart[0].stock, "Data Table ");

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
};

export default SellerOrders;
