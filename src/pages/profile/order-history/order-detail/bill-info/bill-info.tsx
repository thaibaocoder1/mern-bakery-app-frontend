import { IOrderSummary } from "@/types/order";

import { IVoucher } from "@/types/voucher";
import { addCommas } from "@/utils/add-comma";
import { formatCurrencyVND } from "@/utils/money-format";
import { Divider } from "@nextui-org/react";

interface BillInfoProps {
  orderSummary: IOrderSummary;
  voucherData: IVoucher;
  orderPointUsage: number;
}

const BillInfo = ({ orderSummary, voucherData, orderPointUsage }: BillInfoProps) => {
  console.log("🚀 ~ orderSummary:", orderSummary);
  return (
    <div className="flex flex-col gap-4 rounded-2xl border p-4 shadow-custom">
      <h4>Hóa đơn</h4>
      <div className={"flex flex-col gap-2"}>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <p className="text-lg text-dark/50">Tạm tính</p>
            <p className={"text-lg font-bold"}>{orderSummary.subTotalPrice.toLocaleString()}đ</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg text-dark/50">Phí vận chuyển</p>
            <p className={"text-lg font-bold"}>{orderSummary.shippingFee.toLocaleString()}đ</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg text-dark/50">Phí giảm giá</p>
            <p className={"text-lg font-bold"}>{orderSummary.reducedFee.toLocaleString()}đ</p>
          </div>
        </div>

        {orderPointUsage !== 0 && (
          <>
            <Divider />
            <div className="flex items-center justify-between">
              <p className="text-lg text-dark/50">Điểm sử dụng</p>
              <p className={"text-lg font-bold"}>{addCommas(orderPointUsage)}</p>
            </div>
          </>
        )}
        {voucherData && (
          <>
            <Divider />
            <div className="flex items-center justify-between">
              <p className="text-lg text-dark/50">Mã giảm giá</p>
              <p className={"text-lg font-bold"}>{voucherData?.voucherCode}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg text-dark/50">Ưu đãi phí vận chuyển</p>
              <p className={"text-lg font-bold"}>
                {voucherData?.voucherConfig?.type === "shipFee"
                  ? `-${formatCurrencyVND(orderSummary.reducedFee)}`
                  : "0"}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg text-dark/50">Ưu đãi mã giảm giá</p>
              <p className={"text-lg font-bold"}>
                {voucherData?.voucherConfig?.type !== "shipFee"
                  ? `-${formatCurrencyVND(orderSummary.reducedFee)}`
                  : "0"}
              </p>
            </div>
          </>
        )}
      </div>
      <Divider />
      <div className="flex items-center justify-between">
        <p className="text-xl text-dark">Tổng thanh toán</p>
        <p className={"text-xl font-bold text-primary"}>
          {formatCurrencyVND(
            orderPointUsage !== 0
              ? orderSummary.totalPrice - orderSummary.reducedFee - orderPointUsage
              : orderSummary.totalPrice - orderSummary.reducedFee,
          )}
        </p>
      </div>
    </div>
  );
};

export default BillInfo;
