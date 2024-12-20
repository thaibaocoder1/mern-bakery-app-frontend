import { Button, Select, SelectItem } from "@nextui-org/react";
import { FaLanguage } from "react-icons/fa";
import { Link } from "react-router-dom";
import { iconSize } from "@/config/icons/icon-config";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="mt-16 w-full overflow-hidden border-t-1 px-4 py-8">
      <div className={`mx-auto flex max-w-7xl justify-between`}>
        <div>
          <Select
            aria-label="Chọn ngôn ngữ"
            placeholder="Chọn ngôn ngữ"
            color="default"
            className="max-w-48"
            startContent={<FaLanguage size={iconSize.medium} />}
          >
            <SelectItem key={1}>Việt Nam</SelectItem>
          </Select>
          <div className="mt-4 flex gap-2 overflow-hidden max-lg:flex-col max-md:flex-col">
            <p className="truncate font-semibold max-sm:text-sm">
              © AnBakery - Developed from The Graduation Project
            </p>
            <p className="max-lg:hidden">/</p>
            <div className="flex w-full items-center gap-4 overflow-hidden">
              <Link to="/cakes" className="truncate text-base hover:text-primary max-sm:text-sm">
                Menu bánh
              </Link>
              <Link to="/policy" className="truncate text-base hover:text-primary max-sm:text-sm">
                Chính sách
              </Link>
              <Link to="/vouchers" className="truncate text-base hover:text-primary max-sm:text-sm">
                Khuyến mãi
              </Link>
              <Link to="/branch-list" className="truncate text-base hover:text-primary max-sm:text-sm">
                Danh sách cửa hàng
              </Link>
            </div>
          </div>
        </div>
        <div className="flex gap-x-2">
          <Button isIconOnly={true} radius={"lg"} className={"hover:bg-primary hover:text-white"}>
            <FaFacebookF size={iconSize.base} />
          </Button>
          <Button isIconOnly={true} radius={"lg"} className={"hover:bg-primary hover:text-white"}>
            <FaInstagram size={iconSize.base} />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
