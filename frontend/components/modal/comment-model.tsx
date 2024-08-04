import React from "react";
import Modal from "../ui/modal";
import { useDispatch, useSelector } from "react-redux";
import { onClose } from "@/redux/features/modal/commentModel";
import CommentInput from "@/app/(Root)/(routes)/(account)/orders/[orderId]/components/CommentInput";

const CommentModel = () => {
  const { isOpen, productId } = useSelector((state: any) => state.commentModel);
  const { userOrders } = useSelector((state: any) => state.order);

  console.log("User Orders", userOrders);

  console.log("Product Id",productId)
//   665adaa7be9a44f1857c5f01
  const data =
    userOrders && userOrders?.cart?.find((item: any) => item?._id === productId);

    console.log("Data",data)

  const dispatch = useDispatch();

  const onCloseModal = () => {
    dispatch(onClose());
  };
  return (
    <Modal
      className="max-w-[30rem]"
      isOpen={isOpen}
      onClose={onCloseModal}
      title="Give a review"
    >
        <h2>Comment Model</h2>
        <CommentInput />
    </Modal>
  );
};

export default CommentModel;
