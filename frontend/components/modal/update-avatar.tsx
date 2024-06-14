import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import { onClose } from "@/redux/features/modal/authModel";
import Modal from "../ui/modal";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUpdateUserAvatarMutation } from "@/redux/features/auth/authApi";

const UpdateAvatar = () => {
  const { isOpen } = useSelector((state: any) => state.authModel);
  const [avatar, setAvatar] = useState(null);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const [updateUserAvatar, { isError, data, error, isSuccess, isLoading }] =
    useUpdateUserAvatarMutation();

  const onCloseModal = () => {
    dispatch(onClose());
  };

  const handleUpdateAvatar = async () => {
    const formData: any = new FormData();
    formData.append("file", avatar);
    
    await updateUserAvatar(formData);
    onCloseModal();
  };

  const onImageChange = (e: any) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  return (
    <Modal className="max-w-[20rem]" isOpen={isOpen} onClose={onCloseModal}>
      <div className="flex flex-col items-center justify-center">
        <div className="pb-5">
        {
            avatar && (
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={URL?.createObjectURL(avatar)}
                  alt="avatar"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )
        }
        </div>

        <Input type="file" onChange={onImageChange} />

        <div className="w-full flex items-center justify-center pt-4">
            <Button className="w-full" variant={"secondary"} onClick={handleUpdateAvatar}>Update</Button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateAvatar;
