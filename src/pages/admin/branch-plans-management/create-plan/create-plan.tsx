import AdminHeader from "@/components/admin/admin-header";
import WrapperContainer from "@/components/admin/wrapper-container";
import iconConfig from "@/config/icons/icon-config";
import adminRoutes from "@/config/routes/admin-routes.config";
import { apiRoutes } from "@/config/routes/api-routes.config";
import useCurrentBranch from "@/hooks/useCurrentBranch";
import useStaffAxios from "@/hooks/useStaffAxios";
import { IAPIResponse } from "@/types/api-response";
import { IPlan } from "@/types/plan";
import { PlanType } from "@/types/plan-map";
import { formatDate } from "@/utils/format-date";
import { CalendarDate, getLocalTimeZone, parseDate, today } from "@internationalized/date";
import {
  Button,
  DateInput,
  Divider,
  Input,
  RangeCalendar,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePlan = () => {
  const staffAxios = useStaffAxios();
  const currentBranch = useCurrentBranch();
  const navigate = useNavigate();
  const [currentPlanType, setCurrentPlanType] = useState<string>("");
  const [planInfomation, setPlanInfomation] = useState<Partial<IPlan>>({
    planName: "",
    planDescription: "",
    planType: "",
    planActivated: {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    },
    planStatus: undefined,
  });

  const handleSetDate = (value: CalendarDate) => {
    const startDate = new Date(value.year, value.month - 1, value.day);
    const updatedNextDate = new Date(startDate);
    updatedNextDate.setDate(startDate.getDate() + 1);
    const planStatus = startDate.getDate() - new Date().getDate() > 0 ? "pending" : "open";
    setPlanInfomation((prevPlanInfomation) => ({
      ...prevPlanInfomation,
      planStatus,
      planActivated: {
        ...prevPlanInfomation.planActivated,
        startDate,
        endDate: updatedNextDate,
      },
    }));
  };
  const handleCreatePlan = () => {
    if (!currentBranch) return;
    const payload: Partial<IPlan> = {
      ...planInfomation,
      planType: currentPlanType,
      branchId: currentBranch,
    };
    if (Object.values(payload).includes("")) {
      return toast.error("Vui lòng điền đủ thông tin");
    }
    if (
      typeof payload.planActivated?.startDate === "object" ||
      typeof payload.planActivated?.endDate === "object"
    ) {
      return toast.error("Thời gian kiểu tuần là 1 tuần");
    }
    staffAxios
      .post<IAPIResponse<IPlan>>(apiRoutes.plans.create, payload)
      .then((response) => response.data)
      .then((response) => {
        if (response.status === "success") {
          toast.success(response.message);
          navigate(adminRoutes.branchPlan.root);
        }
      })
      .catch((error) => {
        toast.error("Kế hoạch với tên này đã tồn tại");
      });
  };

  return (
    <WrapperContainer>
      <AdminHeader title="Thêm kế hoạch mới" refBack={adminRoutes.branchPlan.root} showBackButton={true} />
      <div className="grid gap-x-4 max-2xl:gap-y-4 2xl:grid-cols-2">
        <div className="flex w-full flex-col gap-4 max-2xl:order-2 2xl:order-1">
          <div className="rounded-2xl border border-dark/25 p-4 shadow-custom">
            <h5 className="mb-4 w-max">Thông tin kế hoạch</h5>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Input
                  label={"Tên kế hoạch"}
                  labelPlacement={"outside"}
                  placeholder={"Nhập tên kế hoạch"}
                  variant={"bordered"}
                  size={"lg"}
                  isRequired
                  value={planInfomation.planName}
                  className="select-none"
                  onValueChange={(value) =>
                    setPlanInfomation({
                      ...planInfomation,
                      planName: value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="planDescription">Mô tả kế hoạch</label>
                <Textarea
                  id="planDescription"
                  size="lg"
                  variant={"bordered"}
                  placeholder="Nhập mô tả kế hoạch"
                  onValueChange={(value) =>
                    setPlanInfomation({
                      ...planInfomation,
                      planDescription: value,
                    })
                  }
                />
              </div>
              <Divider />
              <div className="flex items-start">
                <div className="flex w-40 flex-col gap-2">
                  <label htmlFor="planType">Kiểu kế hoạch</label>
                  <Select
                    isRequired
                    id="planType"
                    variant="flat"
                    placeholder="Kiểu kế hoạch"
                    selectedKeys={[currentPlanType]}
                    onSelectionChange={(keys) => setCurrentPlanType(Array.from(keys).join(""))}
                    disallowEmptySelection={true}
                  >
                    <SelectItem key={"day"}>{PlanType["day"]}</SelectItem>
                    <SelectItem key={"week"}>{PlanType["week"]}</SelectItem>
                  </Select>
                </div>
                {currentPlanType === "day" ? (
                  <div className="ml-8 flex w-full max-w-xs flex-col gap-2">
                    <label htmlFor="planActivated">Thời gian bắt đầu (hiện tại/kết thúc)</label>
                    <div className={"flex w-full items-center gap-2"}>
                      <DateInput
                        className="w-max"
                        aria-label="Open Date"
                        value={parseDate(
                          formatDate(planInfomation.planActivated?.startDate as string, "onlyDateReverse"),
                        )}
                        variant="bordered"
                        startContent={iconConfig.dot.base}
                        color="success"
                        hourCycle={24}
                        size="md"
                        minValue={today(getLocalTimeZone())}
                        onChange={handleSetDate}
                      />
                      <DateInput
                        className="w-max"
                        aria-label="End Date"
                        isReadOnly
                        value={parseDate(
                          formatDate(planInfomation.planActivated?.endDate as string, "onlyDateReverse"),
                        )}
                        variant="bordered"
                        startContent={iconConfig.dot.base}
                        color="danger"
                        hourCycle={24}
                        size="md"
                        onChange={handleSetDate}
                      />
                    </div>
                  </div>
                ) : (
                  currentPlanType !== "" && (
                    <div className={"ml-8 flex w-full max-w-xs flex-col gap-2"}>
                      <p>Thời gian hoạt động (tuần)</p>
                      <RangeCalendar
                        minValue={today(getLocalTimeZone())}
                        color="secondary"
                        onChange={(e) => {
                          const startDate = new Date(e.start.toString());
                          const endDate = new Date(e.end.toString());
                          const timeDifference = endDate.getDate() - startDate.getDate();
                          if (timeDifference > 7) {
                            toast.warn("Thời gian không quá 1 tuần");
                            return;
                          }
                          const planStatus =
                            startDate.getDate() - new Date().getDate() > 0 ? "pending" : "open";
                          setPlanInfomation({
                            ...planInfomation,
                            planStatus,
                            planActivated: {
                              ...planInfomation.planActivated,
                              startDate: e.start.toString(),
                              endDate: e.end.toString(),
                            },
                          });
                        }}
                      />
                    </div>
                  )
                )}
              </div>
              <Button
                size="lg"
                color="primary"
                startContent={iconConfig.add.base}
                className="w-full"
                onClick={handleCreatePlan}
              >
                Tạo kế hoạch mới
              </Button>
            </div>
          </div>
        </div>
      </div>
    </WrapperContainer>
  );
};

export default CreatePlan;
