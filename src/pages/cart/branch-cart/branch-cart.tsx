import { Button, ButtonGroup, Image, Tooltip, useDisclosure } from "@nextui-org/react";

import ModalConfirm from "@/components/admin/modal-confirm";
import iconConfig from "@/config/icons/icon-config";
import { apiRoutes } from "@/config/routes/api-routes.config";
import clientRoutes from "@/config/routes/client-routes.config";
import useAxios from "@/hooks/useAxios";
import useCart from "@/hooks/useCart";
import useCustomerAxios from "@/hooks/useCustomerAxios";
import useWindowSize from "@/hooks/useWindowSize";
import { IAPIResponse } from "@/types/api-response";
import { IBranch } from "@/types/branch";
import { ICake } from "@/types/cake";
import { TSelectedVariant } from "@/types/cart";
import { calculateDiscountPrice, formatCurrencyVND } from "@/utils/money-format";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ModalConfirmDeleteItemCart from "./modal-confirm-delete-item-cart";
const BranchCart = () => {
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure();
  const {
    isOpen: isOpenResetCart,
    onOpen: onOpenResetCart,
    onClose: onCloseResetCart,
    onOpenChange: onOpenChangeResetCart,
  } = useDisclosure();
  const { width } = useWindowSize();
  const [listBranches, setListBranches] = useState<IBranch[]>([]);
  const {
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    isLoading,
    handlePrice,
    totalPayment,
    deleteCakeFromBranchCart,
    handleShowSelectedVariant,
    cartCustomer,
    refetchCart,
  } = useCart();
  const [infoToDelete, setInfoToDelete] = useState<{
    branchId: string;
    cakeId: string;
    selectedVariants: TSelectedVariant[];
    cartId: string;
  }>();
  const axiosCustomer = useCustomerAxios();
  const axiosClient = useAxios();
  const navigate = useNavigate();
  useEffect(() => {
    axiosClient
      .get<IAPIResponse<IBranch[]>>(apiRoutes.branches.getAll)
      .then((response) => response.data)
      .then((response) => {
        if (response.status === "success") {
          setListBranches(response.results);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const showBranchName = (branchId: string) => {
    const branch = listBranches.find((branch) => branch._id === branchId);
    return branch?.branchConfig.branchDisplayName;
  };
  const handleConfirmItemCart = (
    branchId: string,
    cakeId: string,
    selectedVariants: TSelectedVariant[],
    quantity: number,
    cartId: string,
    isDelete = false,
  ) => {
    if (quantity === 1 || isDelete) {
      setInfoToDelete({ branchId, cakeId, selectedVariants, cartId });
      return onOpenDelete();
    } else {
      handleDecreaseQuantity(branchId, cakeId, selectedVariants, quantity, cartId);
    }
  };
  const handleDeleteConfirm = () => {
    onOpenChangeDelete();
    if (infoToDelete) {
      deleteCakeFromBranchCart(
        infoToDelete.branchId,
        infoToDelete.cakeId,
        infoToDelete.selectedVariants,
        infoToDelete.cartId,
      );
    }
  };
  const handleResetCart = () => {
    axiosCustomer
      .delete(apiRoutes.cart.resetCart)
      .then((response) => response.data)
      .then((response) => {
        if (response.status === "success") {
          toast.success("Đã làm mới giỏ hàng");
          refetchCart();
          onOpenChangeResetCart();
        }
      })
      .catch((error) => console.log(error));
  };
  if (cartCustomer.length === 0 && !isLoading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <p className="italic text-default-400">Giỏ hàng của bạn đang trống</p>
      </div>
    );
  }

  console.log("cartCustomer", cartCustomer);
  return (
    <>
      <ModalConfirmDeleteItemCart
        isOpen={isOpenDelete}
        onOpen={onOpenDelete}
        onOpenChange={onOpenChangeDelete}
        onConfirmDelete={() => handleDeleteConfirm()}
      />
      <ModalConfirm
        message="Bạn có chắc chắn muốn làm mới giỏ hàng?"
        isOpen={isOpenResetCart}
        onClose={onCloseResetCart}
        onConfirm={handleResetCart}
      />
      <div className="rounded-2xl max-sm:mt-2 sm:mt-8 sm:border sm:px-4 sm:py-4">
        {cartCustomer.map((branchCart, index) => (
          <div key={index}>
            <div className="flex items-center justify-between rounded-lg bg-default-100 p-2">
              <h5 className="max-[500px]: text-[16px]">{showBranchName(branchCart.branchId)}</h5>
            </div>
            <div>
              {branchCart.cartItems.map((cake, index) => {
                const selectedVariantsLength = handleShowSelectedVariant(
                  cake.selectedVariants,
                  (cake.cakeInfo as ICake).cakeVariants,
                );

                return (
                  <div
                    className="mt-4 flex items-center justify-between gap-x-2 sm:grid sm:grid-cols-6"
                    key={index}
                  >
                    <div className="col-span-3 flex gap-x-4">
                      <div className="flex sm:gap-x-1 sm:justify-self-center">
                        <Image
                          src={`http://localhost:3000/images/${cake?.cakeInfo?._id}/${cake.cakeInfo?.cakeThumbnail}`}
                          alt="Error"
                          className="h-[142px] w-[147px] max-[500px]:h-[80px] max-[500px]:w-[80px]"
                        />
                      </div>
                      <div>
                        <div className="col-span-2 h-full flex-col justify-center gap-4 max-[500px]:items-center min-[500px]:flex">
                          <h5 className="max-[500px]:font-light max-[390px]:text-[16px]">
                            {cake.cakeInfo?.cakeName}
                          </h5>
                          {selectedVariantsLength && (
                            <Tooltip color="primary" content={selectedVariantsLength}>
                              <p className="truncate max-[500px]:text-sm max-[500px]:font-light max-[500px]:text-primary">
                                {selectedVariantsLength}
                              </p>
                            </Tooltip>
                          )}
                          <h5 className="text-primary max-[500px]:block min-[500px]:hidden">
                            {handlePrice(
                              calculateDiscountPrice(
                                cake?.cakeInfo?.cakeDefaultPrice ?? 0,
                                cake?.cakeInfo?.discountPercents ?? 0,
                              ) * cake.quantity,
                              cake.selectedVariants,
                              cake?.cakeInfo?.cakeVariants ?? [],
                              cake.quantity,
                            )}
                          </h5>
                          <Button
                            color="danger"
                            variant="flat"
                            size="sm"
                            className={"w-max max-[500px]:hidden min-[500px]:block"}
                            onClick={() =>
                              handleConfirmItemCart(
                                branchCart.branchId,
                                cake.cakeId as string,
                                cake.selectedVariants,
                                cake.quantity,
                                cake._id as string,
                                true,
                              )
                            }
                          >
                            Xóa
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-end gap-y-2">
                      <Button
                        color="danger"
                        variant="flat"
                        size="sm"
                        className="min-[500px]:hidden"
                        isIconOnly
                        onClick={() =>
                          handleConfirmItemCart(
                            branchCart.branchId,
                            cake.cakeId as string,
                            cake.selectedVariants,
                            cake.quantity,
                            cake._id as string,
                            true,
                          )
                        }
                      >
                        {iconConfig.delete.small}
                      </Button>

                      <ButtonGroup size={width <= 500 ? "sm" : "md"}>
                        <Button
                          isIconOnly
                          onClick={() =>
                            handleConfirmItemCart(
                              branchCart.branchId,
                              cake.cakeId as string,
                              cake.selectedVariants,
                              cake.quantity,
                              cake._id as string,
                            )
                          }
                        >
                          {iconConfig.minus.small}
                        </Button>
                        <Button isIconOnly variant={"flat"}>
                          {cake.quantity}
                        </Button>
                        <Button
                          isIconOnly
                          onClick={() =>
                            handleIncreaseQuantity(
                              branchCart.branchId,
                              cake.cakeId as string,
                              cake.selectedVariants,
                              cake.quantity + 1,
                              cake._id as string,
                            )
                          }
                        >
                          {iconConfig.add.small}
                        </Button>
                      </ButtonGroup>
                    </div>
                    <h5 className="hidden justify-self-center text-primary sm:block">
                      {formatCurrencyVND(
                        cake?.cakeInfo?.cakeDefaultPrice ?? 0,
                        cake?.cakeInfo?.discountPercents ?? 0,
                      )}
                    </h5>
                    <h5 className="justify-self-center text-primary max-[500px]:hidden min-[500px]:block">
                      {handlePrice(
                        calculateDiscountPrice(
                          cake?.cakeInfo?.cakeDefaultPrice ?? 0,
                          cake?.cakeInfo?.discountPercents ?? 0,
                        ) * cake.quantity,
                        cake.selectedVariants,
                        cake?.cakeInfo?.cakeVariants ?? [],
                        cake.quantity,
                      )}
                    </h5>
                  </div>
                );
              })}
              <div className="my-4 flex flex-col gap-y-4">
                <hr />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-x-4 rounded-2xl sm:mt-6 sm:border sm:p-4">
        <Button
          startContent={iconConfig.reset.small}
          size={width <= 500 ? "sm" : "md"}
          color="danger"
          onPress={onOpenResetCart}
          isIconOnly={width <= 500}
        >
          {width <= 500 ? "" : "Xóa tất cả"}
        </Button>
        <div className="flex max-sm:gap-x-4 sm:gap-4">
          <div className="col-span-2 flex items-center justify-between gap-2">
            <h6 className="max-[500px]:text-sm">Tổng thanh toán</h6>
            <h4 className="text-primary max-[500px]:text-xl max-[500px]:font-bold">
              {formatCurrencyVND(totalPayment())}
            </h4>
          </div>
          <Button
            size={width <= 500 ? "sm" : "md"}
            radius={width <= 500 ? "sm" : "md"}
            color="primary"
            onClick={() => navigate(clientRoutes.orderSteps.root)}
          >
            Thanh toán
          </Button>
        </div>
      </div>
    </>
  );
};

export default BranchCart;
