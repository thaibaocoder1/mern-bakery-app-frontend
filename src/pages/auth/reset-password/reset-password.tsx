import imageAn from "@/assets/images/OnlyNameColorful.png";
import logoAnbakery from "@/assets/images/WithSloganColorful.png";
import { apiRoutes } from "@/config/routes/api-routes.config";
import clientRoutes from "@/config/routes/client-routes.config";
import useCustomerAxios from "@/hooks/useCustomerAxios";
import { IAPIResponse } from "@/types/api-response";
import validateEmail from "@/utils/validate-email";
import { Button, Image, Input } from "@nextui-org/react";
import clsx from "clsx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ResetPassword = () => {
  const navigate = useNavigate();
  const axiosCustomer = useCustomerAxios();
  const [email, setEmail] = useState<string>("");
  const [otpCode, setOtpCode] = useState<string>("");
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const handleSendEmail = () => {
    if (!validateEmail(email)) {
      return toast.error("Email không hợp lệ");
    }
    setIsSendingEmail(true);
    axiosCustomer
      .post<IAPIResponse>(apiRoutes.auth.requestRecover, { email })
      .then((response) => response.data)
      .then((data) => {
        if (data.status === "success") {
          toast.success("Gửi email thành công");
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsSendingEmail(false));
  };
  const handleResetPassword = () => {
    if (!validateEmail(email)) {
      return toast.error("Email không hợp lệ");
    }
    if (!otpCode) return toast.error("Vui cung cấp  mã OTP");
    axiosCustomer
      .post<IAPIResponse>(apiRoutes.auth.recover, { email, otpCode })
      .then(({ data }) => {
        if (data.status === "success") {
          toast.success("Đặt lại mật khẩu thành công");
          navigate("/sign-in");
        }
      })
      .catch((error: IAPIResponse) => {
        if (error.message === "Wrong OTP or OTP is invalid") {
          return toast.error("Mã OTP không hợp lệ");
        }
        return toast.error("Có lỗi xảy ra");
      });
  };

  return (
    <section className="flex h-screen w-screen">
      <div className="relative flex h-full flex-col items-center justify-center rounded-r-xl max-sm:w-full max-sm:px-2 sm:min-w-[480px] sm:px-8 sm:shadow-xl">
        <div className={"pointer-events-none absolute z-0 h-full select-none"}>
          <div className={"mt-12 flex w-full justify-center max-md:mt-10 max-md:opacity-40"}>
            <Link to={"/"}>
              <Image src={imageAn} className="max-md:max-w-44" />
            </Link>
          </div>
        </div>
        <div className="z-10 flex w-full flex-col items-center justify-center gap-4">
          <div className="flex w-full flex-col gap-4 max-[1450px]:px-4">
            <h2 className="truncate max-sm:text-2xl">Quên mật khẩu? </h2>

            <Input
              onValueChange={(value) => setEmail(value)}
              className="w-full"
              label="Email tài khoản"
              labelPlacement={"outside"}
              variant={"bordered"}
              size={"lg"}
              placeholder="Nhập email"
              isRequired
            />
            <div className="flex items-end gap-x-4">
              <Input
                variant={"bordered"}
                size={"lg"}
                label={"Mã OTP"}
                labelPlacement={"outside"}
                placeholder="Nhập OTP"
                onValueChange={(value) => setOtpCode(value)}
              />
              <Button
                color={isSendingEmail ? "default" : "secondary"}
                size={"lg"}
                className={clsx("basis-36", {
                  "hover:cursor-wait": isSendingEmail,
                })}
                fullWidth={true}
                isDisabled={isSendingEmail || !validateEmail(email)}
                onClick={handleSendEmail}
              >
                Lấy mã
              </Button>
            </div>
            <div className="flex flex-col gap-y-2">
              <Button color="primary" className="w-full" size="lg" onClick={handleResetPassword}>
                Đặt lại mật khẩu
              </Button>
              <Button
                color="primary"
                variant="light"
                className="w-full"
                size="lg"
                onClick={() => navigate(clientRoutes.auth.signIn)}
              >
                Quay lại
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="items-top flex grow-[1] justify-center">
        <Image src={logoAnbakery} className="max-[1450px]:px-8 max-lg:hidden" />
      </div>
    </section>
  );
};

export default ResetPassword;
