import useWindowSize from "@/hooks/useWindowSize";
import { ICake, ICakeVariant } from "@/types/cake";
import { IUserCart, TSelectedVariant } from "@/types/cart";
import { IOrderGroupForm, TDeliveryMethod } from "@/types/order";
import { IDecodedUrlParams } from "@/types/voucher";
import { calculateDiscountPrice, formatCurrencyVND } from "@/utils/money-format";
import { Button, DatePicker, DateValue, Divider, Image, Input, Switch, Tooltip } from "@nextui-org/react";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface OrderItemsProps {
  cartCustomer: IUserCart[];
  showBranchName: (branchId: string) => string;
  handleShowSelectedVariant: (selectedVariants: TSelectedVariant[], cakeVariants: ICakeVariant[]) => string;
  handlePrice: (
    priceDefault: number,
    selectedVariants: TSelectedVariant[],
    cakeVariants: ICakeVariant[],
    quantity: number,
  ) => string;
  orderGroup: IOrderGroupForm;
  setOrderGroup: React.Dispatch<React.SetStateAction<IOrderGroupForm>>;
  setVoucherBranchId: React.Dispatch<React.SetStateAction<string>>;
  onOpenBranchVoucherChange: () => void;
  handleChooseExpressDelivery: (branchId: string) => void;
  dateValue: DateValue;
  setDateValue: React.Dispatch<React.SetStateAction<DateValue>>;
  totalBranch: (branchId: string) => number;
}
interface IVoucherCodeBranchValue {
  [key: string]: {
    voucherCode: string;
  };
}

const OrderItems = ({
  cartCustomer,
  showBranchName,
  handleShowSelectedVariant,
  handlePrice,
  onOpenBranchVoucherChange,
  setOrderGroup,
  setVoucherBranchId,
  orderGroup,
  handleChooseExpressDelivery,
  dateValue,
  setDateValue,
  totalBranch,
}: OrderItemsProps) => {
  const [activeVoucherCode, setActiveVoucherCode] = useState<IVoucherCodeBranchValue>();
  const { width } = useWindowSize();
  const urlParams = new URLSearchParams(window.location.search);
  const voucherCodeBranch = urlParams.get("voucherCodeBranch");
  const handleReceiveInStore = (checked: boolean, branchId: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    const getVoucherCodeOfBranch = urlParams.get("voucherCodeBranch");
    if (getVoucherCodeOfBranch) {
      const decodedUrlParams: IDecodedUrlParams = JSON.parse(atob(getVoucherCodeOfBranch || ""));
      setOrderGroup((prev) => {
        const updatedOrderData = prev.orderData.map((orderData) => {
          if (orderData.branchId === branchId) {
            const newShippingFee = checked ? 0 : 20000;
            // =====================>>>> 🚀
            const newTotalPrice =
              orderData.orderSummary.totalPrice - orderData.orderSummary.shippingFee + newShippingFee <= 0
                ? 0
                : orderData.orderSummary.totalPrice - orderData.orderSummary.shippingFee + newShippingFee;
            // =====================>>>> 🚀
            return {
              ...orderData,
              orderSummary: {
                ...orderData.orderSummary,
                shippingFee: newShippingFee,
                totalPrice: newTotalPrice,
              },
              orderOptions: {
                ...orderData.orderOptions,
                deliveryMethod: checked ? ("atStore" as TDeliveryMethod) : "toHouse",
              },
            };
          }
          return orderData;
        });

        const newShippingFeeTotal = updatedOrderData.reduce(
          (acc, orderData) =>
            acc +
            (orderData.orderUrgent?.isUrgent
              ? 60000
              : orderData.orderOptions.deliveryMethod === "atStore"
                ? 0
                : 20000),
          0,
        );

        return {
          ...prev,
          orderData: updatedOrderData,
          shippingFee: newShippingFeeTotal,
        };
      });
    } else {
      setOrderGroup((prev) => {
        const updatedOrderData = prev.orderData.map((orderData) => {
          if (orderData.branchId === branchId) {
            const newShippingFee = checked ? 0 : 20000;

            const newTotalPrice =
              orderData.orderSummary.totalPrice - orderData.orderSummary.shippingFee + newShippingFee;
            return {
              ...orderData,
              orderSummary: {
                ...orderData.orderSummary,
                shippingFee: newShippingFee,
                totalPrice: newTotalPrice,
              },
              orderOptions: {
                ...orderData.orderOptions,
                deliveryMethod: checked ? ("atStore" as TDeliveryMethod) : "toHouse",
              },
            };
          }
          return orderData;
        });

        const newShippingFeeTotal = updatedOrderData.reduce(
          (acc, orderData) =>
            acc +
            (orderData.orderUrgent?.isUrgent
              ? 60000
              : orderData.orderOptions.deliveryMethod === "atStore"
                ? 0
                : 20000),
          0,
        );

        return {
          ...prev,
          orderData: updatedOrderData,
          shippingFee: newShippingFeeTotal,
        };
      });
    }
  };
  const totalDiscountBranchVoucher = (branchId: string) => {
    const orderData = orderGroup.orderData.find((orderData) => orderData.branchId === branchId);
    return orderData?.orderSummary.reducedFee || 0;
  };
  useEffect(() => {
    if (voucherCodeBranch) {
      const decodedVoucherCodeBranch = JSON.parse(atob(voucherCodeBranch || ""));
      // console.log(decodedVoucherCodeBranch, "decodedVoucherCodeBranch");
      setActiveVoucherCode(decodedVoucherCodeBranch);
    } else {
      setActiveVoucherCode({});
    }
  }, [voucherCodeBranch]);

  return (
    <div className="flex flex-col gap-4">
      {cartCustomer.map((branchCart, index) => {
        const isUrgentOrder = !!orderGroup.orderData.find(
          (orderData) => orderData.branchId === branchCart.branchId,
        )?.orderUrgent?.isUrgent;

        const decodedVoucherCodeBranch = voucherCodeBranch ? JSON.parse(atob(voucherCodeBranch || "")) : {};
        const isShipFeeVoucher = !!(
          decodedVoucherCodeBranch[branchCart.branchId] &&
          decodedVoucherCodeBranch[branchCart.branchId]?.type === "shipFee"
        );

        const isDisabled = isUrgentOrder || isShipFeeVoucher;

        return (
          <div className="flex flex-col gap-2 rounded-2xl border p-4 shadow-custom" key={index}>
            <h6 className={"text-g w-max rounded-xl bg-default/50 px-4 py-1 font-bold max-sm:text-sm"}>
              {showBranchName(branchCart.branchId)}
            </h6>
            <div className="flex flex-col gap-y-2">
              {branchCart.cartItems.map((cake, index) => {
                const selectedVariantsLength = handleShowSelectedVariant(
                  cake.selectedVariants,
                  cake.cakeInfo?.cakeVariants || [],
                );
                return (
                  <div className="grid grid-cols-12 items-center sm:gap-4" key={index}>
                    <div className={"col-span-6 flex items-center max-sm:gap-2 sm:gap-4"}>
                      <div className={"aspect-square h-24 w-24"}>
                        <Image
                          src={`http://localhost:3000/images/${cake?.cakeInfo?._id}/${cake.cakeInfo?.cakeThumbnail}`}
                          alt="Error"
                          className="max-sm:h-[80px] max-sm:w-[80px]"
                        />
                      </div>
                      <div className="w-full overflow-hidden">
                        <h5 className="w-full truncate max-sm:text-xs">{cake.cakeInfo?.cakeName}</h5>
                        <Tooltip color="primary" content={selectedVariantsLength}>
                          <p className="mt-2 truncate max-sm:text-sm">{selectedVariantsLength}</p>
                        </Tooltip>
                      </div>
                    </div>
                    <h5 className="col-span-2 text-center max-sm:text-sm">
                      {formatCurrencyVND(
                        (cake.cakeInfo as ICake).cakeDefaultPrice,
                        (cake.cakeInfo as ICake).discountPercents,
                      )}
                    </h5>
                    <h5 className="col-span-2 text-center max-sm:text-sm">x{cake.quantity}</h5>
                    <h5 className="col-span-2 text-center text-danger max-sm:text-sm">
                      {handlePrice(
                        calculateDiscountPrice(
                          (cake.cakeInfo as ICake).cakeDefaultPrice,
                          (cake.cakeInfo as ICake).discountPercents,
                        ) * cake.quantity,
                        cake.selectedVariants,
                        (cake.cakeInfo as ICake).cakeVariants,
                        cake.quantity,
                      )}
                    </h5>
                  </div>
                );
              })}
            </div>
            <Divider />
            <div className="flex gap-4 px-2 py-4 max-sm:flex-col max-sm:gap-y-2">
              <Input
                variant="bordered"
                size={width > 576 ? "lg" : "md"}
                placeholder="Nhập ghi chú ..."
                label={"Ghi chú cho cửa hàng:"}
                labelPlacement={"outside"}
                classNames={{
                  base: "w-full",
                  mainWrapper: "w-full",
                  input: "w-full",
                  label: "text-base min-w-max",
                }}
                onValueChange={(value) =>
                  setOrderGroup((prev) => ({
                    ...prev,
                    orderData: prev.orderData.map((orderData) => {
                      if (orderData.branchId === branchCart.branchId) {
                        return {
                          ...orderData,
                          orderNote: value,
                        };
                      }
                      return orderData;
                    }),
                  }))
                }
              />
              <div>
                <Divider orientation={"vertical"} />
              </div>
              <div className="flex w-full items-end gap-2">
                <Input
                  size={width > 576 ? "lg" : "md"}
                  placeholder="Bạn chưa chọn mã giảm giá nào"
                  label={"Mã giảm giá"}
                  labelPlacement={"outside"}
                  classNames={{
                    base: "w-full",
                    mainWrapper: "w-full",
                    input: "w-full",
                    label: "text-base min-w-max",
                  }}
                  value={activeVoucherCode?.[branchCart.branchId]?.voucherCode || ""}
                />
                <Button
                  color="primary"
                  size={width > 576 ? "lg" : "md"}
                  onPress={() => {
                    setVoucherBranchId(branchCart.branchId);
                    onOpenBranchVoucherChange();
                  }}
                >
                  Chọn mã
                </Button>
              </div>
            </div>
            <Divider />
            <div className="flex items-stretch justify-between p-2 max-sm:flex-col max-sm:gap-y-2">
              <div className="flex flex-col items-stretch justify-between">
                <div className="flex flex-col gap-y-2">
                  <div className="">
                    <Switch
                      defaultSelected={
                        orderGroup.orderData.find((orderData) => orderData.branchId === branchCart.branchId)
                          ?.orderUrgent?.isUrgent
                      }
                      isDisabled={
                        orderGroup.orderData.find((orderData) => orderData.branchId === branchCart.branchId)
                          ?.orderOptions.deliveryMethod === "atStore"
                      }
                      onValueChange={() => {
                        handleChooseExpressDelivery(branchCart.branchId);
                      }}
                      size={width > 576 ? "md" : "sm"}
                      color="secondary"
                    >
                      Giao hỏa tốc
                    </Switch>
                  </div>
                  {orderGroup.orderData.find((orderData) => orderData.branchId === branchCart.branchId)
                    ?.orderUrgent?.isUrgent && (
                    <>
                      <p className="mt-2 text-sm italic text-danger">
                        Lưu ý: Phí vận chuyển sẽ gấp 3 so với phí vận chuyển thông thường .
                      </p>
                      <p className="mt-2 text-sm italic text-danger">
                        Thời gian nhận: Thời gian nhận hàng 7 ngày bắt đầu tính từ thời gian đặt hàng.
                      </p>
                      <DatePicker
                        label="Thời gian mong muốn nhận"
                        value={dateValue}
                        className="mb-2"
                        onChange={(day) => {
                          setDateValue(day);
                          setOrderGroup((prev) => {
                            return {
                              ...prev,
                              orderData: prev.orderData.map((orderData) => {
                                if (orderData.branchId === branchCart.branchId) {
                                  return {
                                    ...orderData,
                                    orderUrgent: {
                                      isUrgent: true,
                                      orderExpectedTime: day.toString(),
                                    },
                                  };
                                }
                                return orderData;
                              }),
                            };
                          });
                        }}
                        color="default"
                      />
                    </>
                  )}
                </div>
                <Switch
                  color="secondary"
                  checked={
                    orderGroup.orderData.find((orderData) => orderData.branchId === branchCart.branchId)
                      ?.orderOptions.deliveryMethod === "atStore"
                  }
                  isDisabled={
                    !!orderGroup.orderData.find((orderData) => orderData.branchId === branchCart.branchId)
                      ?.orderUrgent?.isUrgent ||
                    !!(
                      voucherCodeBranch &&
                      JSON.parse(atob(voucherCodeBranch || ""))[branchCart.branchId]?.type === "shipFee"
                    )
                  }
                  size={width > 576 ? "md" : "sm"}
                  onValueChange={(e) => handleReceiveInStore(e, branchCart.branchId)}
                >
                  Nhận tại cửa hàng
                </Switch>
              </div>
              <div className="flex flex-col max-sm:gap-y-2 sm:min-w-96 sm:gap-4">
                <div className="flex w-full items-center justify-between">
                  <p className={"font-bold text-dark/50 max-sm:text-[14px]"}>TẠM TÍNH ĐƠN HÀNG:</p>
                  <p className={"text-lg font-bold"}>{formatCurrencyVND(totalBranch(branchCart.branchId))}</p>
                </div>
                <div className="flex w-full items-center justify-between">
                  <p className={"font-bold text-dark/50 max-sm:text-[14px]"}>PHÍ VẬN CHUYỂN:</p>
                  <p className={"text-lg font-bold"}>
                    {formatCurrencyVND(
                      orderGroup.orderData.find((orderData) => orderData.branchId === branchCart.branchId)
                        ?.orderSummary.shippingFee || 0,
                    )}
                  </p>
                </div>
                <div className="flex w-full items-center justify-between">
                  <p className={"font-bold text-dark/50 max-sm:text-[14px]"}>GIẢM GIÁ:</p>
                  <p
                    className={clsx("text-lg font-bold", {
                      "text-primary": totalDiscountBranchVoucher(branchCart.branchId) > 0,
                    })}
                  >
                    {totalDiscountBranchVoucher(branchCart.branchId) > 0 ? "-" : ""}
                    {formatCurrencyVND(totalDiscountBranchVoucher(branchCart.branchId))}
                  </p>
                </div>
                <div className="flex w-full items-center justify-between">
                  <h5 className="text-lg font-bold text-dark max-sm:text-[14px]">TỔNG THANH TOÁN:</h5>
                  <h4 className="text-primary">
                    {formatCurrencyVND(
                      orderGroup.orderData.find((orderData) => orderData.branchId === branchCart.branchId)
                        ?.orderSummary.totalPrice || 0,
                    )}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderItems;
