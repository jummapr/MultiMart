import React from "react";
import Modal from "../ui/modal";
import { useDispatch, useSelector } from "react-redux";
import { onClose } from "@/redux/features/modal/commentModel";

const CommentModel = () => {
  const { isOpen } = useSelector((state: any) => state.commentModel);

  const dispatch = useDispatch();

  const onCloseModal = () => {
    dispatch(onClose());
  };
  return (
    <Modal
      className="max-w-[30rem]"
      isOpen={isOpen}
      onClose={onCloseModal}
    >
        <h2>Comment Model</h2>
    </Modal>
  );
};

export default CommentModel;
