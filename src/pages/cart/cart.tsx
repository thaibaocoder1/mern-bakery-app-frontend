import iconConfig from "@/config/icons/icon-config";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import BranchCart from "./branch-cart";
import clientRoutes from "@/config/routes/client-routes.config";
import { useCookies } from "react-cookie";
import useWindowSize from "@/hooks/useWindowSize";
import useCart from "@/hooks/useCart";
import Loading from "@/components/admin/loading";

const Cart = () => {
  const navigate = useNavigate();
  const { isLoading } = useCart();
  const [cookie, setCookie] = useCookies(["accessToken"]);
  const { width } = useWindowSize();

  return (
    <div className="mx-auto max-w-7xl overflow-auto pt-8 max-lg:px-2">
      <div className="flex items-center justify-between">
        <h1 className="text-default-300 max-[500px]:text-2xl">GIỎ HÀNG CỦA BẠN</h1>
        <Button
          startContent={iconConfig.back.base}
          color="secondary"
          size={width <= 500 ? "sm" : "md"}
          onClick={() => navigate(clientRoutes.cakes.root)}
        >
          Quay lại
        </Button>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <BranchCart />
      )}
    </div>
  );
};

export default Cart;
