import bannerFAQs from "@/assets/images/FAQ Banner.png";
import { Accordion, AccordionItem, Image } from "@nextui-org/react";
import axios from "axios";
import { useEffect } from "react";
const FaQs = () => {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  useEffect(() => {
    axios
      .get("/vietnam_provinces_data.json")
      .then((res) => res.data)
      .then((data) => console.log(data.results));
  }, []);
  return (
    <section>
      <Image src={bannerFAQs} />
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 mt-20 text-center">
          <h1>CÂU HỎI THƯỜNG GẶP ?</h1>
          <h6 className="mt-4">
            Chào mừng đến trang FAQ của chúng tôi, chúng tôi sẽ giải thích những câu hỏi thường hỏi thường
            xuyên về các loại bánh trong shop anbakery của chúng tôi.
          </h6>
        </div>{" "}
        <Accordion>
          <AccordionItem key="1" aria-label="Accordion 1" title="Làm thế nào để đặt bánh?">
            Để đặt bánh, bạn có thể truy cập trang web của chúng tôi và chọn sản phẩm bạn muốn mua. Sau đó,
            bạn có thể chọn số lượng và thời gian giao hàng. Sau khi hoàn tất, bạn có thể chọn phương thức
            thanh toán và hoàn tất đơn hàng.
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Tôi cần đặt bánh trước bao lâu?">
            Để đặt bánh, bạn cần đặt trước ít nhất 24 giờ nếu bánh đó có yêu cầu riêng của bạn còn lại có thể
            đặt bất cứ lúc nòa bạn muốn.
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="Accordion 3"
            title="Chính sách hoàn trả và hủy đơn hàng như thế nào?"
          >
            Để hủy đơn hàng, bạn cần liên hệ với chúng tôi qua số điện thoại hoặc email để thông báo trước 24
            giờ. Chúng tôi sẽ hoàn trả tiền cho bạn sau khi xác nhận hủy đơn hàng.
          </AccordionItem>
          <AccordionItem
            key="4"
            aria-label="Accordion 3"
            title="Bánh của shop có sử dụng chất bảo quản không?"
          >
            Tất cả các sản phẩm của chúng tôi đều không sử dụng chất bảo quản, chúng tôi cam kết sử dụng
            nguyên liệu tươi và chất lượng.
          </AccordionItem>
          <AccordionItem
            key="5"
            aria-label="Accordion 3"
            title="Có chương trình khuyến mãi hoặc giảm giá nào không?"
          >
            Chúng tôi thường xuyên có các chương trình khuyến mãi và giảm giá cho khách hàng thân thiết, bạn
            có thể theo dõi trang web của chúng tôi để cập nhật thông tin mới nhất.
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FaQs;
