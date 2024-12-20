import { iconSize } from "@/config/icons/icon-config";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const FeedbackCustomers = () => (
  <div>
    <h1 className="my-16 text-center text-8xl uppercase text-default-300 max-lg:text-7xl max-md:text-6xl max-sm:text-4xl">
      FEEDBACK TỪ KHÁCH
    </h1>
    <div className="mx-auto flex items-center justify-center gap-8">
      <FaChevronLeft size={iconSize.large} className="text-danger-50 hover:cursor-pointer max-md:size-16" />
      <div className="w-[700px] rounded-2xl shadow-2xl">
        <h3 className="pb-11 pt-7 text-center text-primary max-sm:text-2xl">dev_snake</h3>
        <p className="mx-8 text-justify text-base max-sm:text-sm">
          Sản phẩm rất tốt, chất lượng tuyệt vời, giá cả hợp lý, nhân viên phục vụ nhiệt tình, chu đáo, sẽ ủng
          hộ thêm. Vị Bánh ngon, thơm, mềm, ngọt vừa phải, không quá ngấy, không quá ngọt, không quá, và có
          nhiều hương vị khác nhau, rất phong phú.
        </p>
        <p className="mt-16 pb-8 text-center text-base text-default-300">21:00 - 20/12/2024</p>
      </div>
      <FaChevronRight
        size={iconSize.large}
        className="text-danger-50 hover:cursor-pointer max-md:size-16 max-sm:size-14"
      />
    </div>
  </div>
);

export default FeedbackCustomers;
