import { iconSize } from "@/config/icons/icon-config";
import adminRoutes from "@/config/routes/admin-routes.config";
import clientRoutes from "@/config/routes/client-routes.config";
import useWindowSize from "@/hooks/useWindowSize";

import { ReMapOrderData } from "@/types/order-map";
import { formatDate } from "@/utils/format-date";
import {
  MapOrderStatusText,
  MapOrderStatusColor,
  MapPaymentStatusColor,
  MapPaymentStatusText,
} from "@/utils/map-data/orders";
import { formatCurrencyVND } from "@/utils/money-format";
import { sliceText } from "@/utils/slice-text";
import { Chip } from "@nextui-org/react";
import { BiSolidTimer } from "react-icons/bi";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";

interface OrderCardProps {
  orderData: ReMapOrderData;
  refLink: "customer" | "admin";
}

const OrderCard = ({ orderData, refLink }: OrderCardProps) => {
  const { width } = useWindowSize();
  return (
    <div className="rounded-lg border px-4 pt-1">
      <div className="flex items-center justify-between">
        <div className="overflow-hidden">
          <Link
            to={
              refLink === "customer"
                ? clientRoutes.profile.orderDetail(orderData._id)
                : adminRoutes.order.details(orderData._id)
            }
          >
            <div className={"flex items-center gap-2"}>
              <p className="max-sm:hidden">#{sliceText(orderData._id)}</p>
              <p className="max-sm:hidden">-</p>
              <p className={"w-full truncate font-semibold max-sm:text-sm"}>
                {orderData.branchId?.branchConfig?.branchDisplayName}
              </p>
            </div>
          </Link>
          <div className="mt-1 flex gap-x-4 text-dark/50">
            <div className={"flex items-center gap-1"}>
              <FaShoppingBag size={iconSize.small} />
              <p className="small truncate max-sm:text-[8px]">{orderData.orderItems.length} Sản phẩm</p>
            </div>
            <div className={"flex items-center gap-1"}>
              <BiSolidTimer size={iconSize.small} />
              <p className="small truncate max-sm:text-[8px]">{MapOrderStatusText[orderData.orderStatus]}</p>
            </div>
          </div>
        </div>
        <h4 className="truncate text-primary max-sm:text-sm">
          {formatCurrencyVND(
            orderData.orderPoint! !== 0
              ? orderData.orderSummary.totalPrice - orderData.orderPoint!
              : orderData.orderSummary.totalPrice,
          )}
        </h4>
      </div>
      <hr className="my-2" />
      <div className="mb-[10px] flex items-center justify-between">
        <div className={"flex items-center gap-2"}>
          <Chip
            color={MapOrderStatusColor[orderData.orderStatus]}
            variant="flat"
            size={width < 768 ? "sm" : "md"}
          >
            {MapOrderStatusText[orderData.orderStatus]}
          </Chip>
          <Chip
            size={width < 768 ? "sm" : "md"}
            color={MapPaymentStatusColor[orderData.orderGroupId.paymentStatus]}
            variant="flat"
            className="max-sm:hidden"
          >
            {MapPaymentStatusText[orderData.orderGroupId.paymentStatus]}
          </Chip>
        </div>
        <small className="truncate text-default-300 max-sm:text-sm sm:font-medium">
          {formatDate(orderData.createdAt, "fullDate")}
        </small>
      </div>
    </div>
  );
};

export default OrderCard;
