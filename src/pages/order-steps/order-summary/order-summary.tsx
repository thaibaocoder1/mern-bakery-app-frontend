import useWindowSize from "@/hooks/useWindowSize";
import { IUserCart } from "@/types/cart";
import { IOrderGroupForm } from "@/types/order";
import { formatCurrencyVND } from "@/utils/money-format";
import { Button, Divider } from "@nextui-org/react";

interface OrderSummaryProps {
  cartCustomer: IUserCart[];
  orderGroup: IOrderGroupForm;
  shipFee: number;
  pointOfCustomer: number;
  isCheckUsePoint: boolean;
  calculateOrderInfo: {
    subTotalPrice: number;
    shippingFee: number;
    reducedFeeOfBranches: number;
    totalPrice: number;
  };
  handleCreateOrder: () => void;
  totalBranch: (branchId: string) => number;
}

const OrderSummary = ({
  orderGroup,
  pointOfCustomer,
  isCheckUsePoint,
  calculateOrderInfo,
  handleCreateOrder,
}: OrderSummaryProps) => {
  const { width } = useWindowSize();
  return (
    <div className="flex grow flex-col gap-2 bg-transparent">
      <div className="flex items-center justify-between">
        <p className={"text-lg font-bold text-dark/50 max-sm:text-[14px]"}>TỔNG THÀNH TIỀN ĐƠN HÀNG:</p>
        <p className={"text-2xl font-bold max-sm:text-xl"}>{formatCurrencyVND(orderGroup.subTotalPrice)}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className={"text-lg font-bold text-dark/50 max-sm:text-[14px]"}>TỔNG PHÍ VẬN CHUYỂN:</p>
        <p className={"text-2xl font-bold max-sm:text-xl"}>{formatCurrencyVND(orderGroup.shippingFee)}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className={"text-lg font-bold text-dark/50 max-sm:text-[14px]"}>TỔNG GIẢM GIÁ CHI NHÁNH:</p>
        <p className={"text-2xl font-bold max-sm:text-xl"}>
          - {formatCurrencyVND(calculateOrderInfo.reducedFeeOfBranches)}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className={"text-lg font-bold text-dark/50 max-sm:text-[14px]"}>GIẢM GIÁ HT:</p>
        <p className={"text-2xl font-bold max-sm:text-xl"}>{formatCurrencyVND(orderGroup.reducedFee)}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className={"text-lg font-bold text-dark/50 max-sm:text-[14px]"}>GIẢM GIÁ XU ĐIỂM TIÊU DÙNG:</p>
        <p className={"text-2xl font-bold max-sm:text-xl"}>
          - {isCheckUsePoint ? formatCurrencyVND(pointOfCustomer) : "0đ"}
        </p>
      </div>
      <Divider />
      <div className="flex items-center justify-between">
        <p className={"text-2xl font-bold text-dark max-sm:text-[14px]"}>TỔNG THANH TOÁN:</p>
        <p className={"text-4xl font-bold text-primary max-sm:text-3xl"}>
          {formatCurrencyVND(orderGroup.totalPrice)}
        </p>
      </div>
      <Button size={width > 640 ? "lg" : "md"} color="primary" onPress={handleCreateOrder}>
        Đặt hàng
      </Button>
    </div>
  );
};

export default OrderSummary;
