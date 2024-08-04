import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { useGetAllUserOrdersQuery } from "@/redux/features/order/orderApi";
import { useSelector } from "react-redux";

const TrackOrder = () => {
  const { user } = useSelector((state: any) => state.loadUser);

  const {
    data: orders,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetAllUserOrdersQuery(user?._id);

  const dataTable = orders?.data.map((item: any) => {
    return {
      id: item._id,
      name: item?.user?.name,
      status: item?.status,
      itemQty: item?.cart?.length,
      total: item?.totalPrice,
    };
  });

  return (
    <div className="h-full w-full flex items-center justify-center ">
      <div className="w-[70rem] pt-20 pb-10">
        {/* @ts-ignore */}
        {isSuccess ? (
          <DataTable  searchKey="name" columns={columns} data={dataTable} />
        ) : (
          <h2>Loading</h2>
          // <UserOrderLoading />
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
