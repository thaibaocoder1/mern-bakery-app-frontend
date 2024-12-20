import iconConfig from "@/config/icons/icon-config";
import useWindowSize from "@/hooks/useWindowSize";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

interface ClientHeaderProps {
  title: string;
  refBack?: string;
  showBackButton?: boolean;
}

const ClientHeader = ({ title, refBack = "", showBackButton = false }: ClientHeaderProps) => {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  return (
    <div className="flex items-center justify-between">
      <h1 className="uppercase text-default-300 max-lg:text-3xl max-sm:text-2xl">{title}</h1>
      {showBackButton && (
        <Button
          color="secondary"
          size={width < 765 ? "sm" : "lg"}
          startContent={iconConfig.back.base}
          onClick={() => navigate(refBack)}
        >
          Quay lại
        </Button>
      )}
    </div>
  );
};

export default ClientHeader;
