import { apiRoutes } from "@/config/routes/api-routes.config";
import useStaffAxios from "@/hooks/useStaffAxios";
import { IOrdersAnalytics, TDailyAnalytics } from "@/types/analytics";
import { IAPIResponse } from "@/types/api-response";
import { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { Select, SelectItem } from "@nextui-org/react";
import useCurrentBranch from "@/hooks/useCurrentBranch";
import useRole from "@/hooks/useRole";

interface HeatmapOrdersProps {}

const HeatmapOrders = (props: HeatmapOrdersProps) => {
  const staffAxios = useStaffAxios();
  const currentBranch = useCurrentBranch();
  const currentStaffRole = useRole();
  const chartRef = useRef<ApexCharts | null>(null);

  const [orderInMonthChartData, setOrderInMonthChartData] = useState<TDailyAnalytics[]>([]);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);

  const getChartData = () => {
    staffAxios
      .get<IAPIResponse<IOrdersAnalytics<TDailyAnalytics>>>(apiRoutes.analytics.orders.dailyOrdersInMonth, {
        params: {
          month: currentMonth,
          branchId: currentStaffRole !== 2 ? currentBranch : undefined,
        },
      })
      .then((response) => response.data)
      .then((response) => {
        setOrderInMonthChartData(response.results.allStatusData);
      });
  };

  const renderOrdersInMonthChart = () => {
    if (!orderInMonthChartData) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const maxValue = Math.max(...orderInMonthChartData.map((item) => item.value));
    const rangeStep = Math.ceil(maxValue / 4);
    const dynamicRanges = [
      { from: 0, to: 0, color: "#efeff0", name: `0` },
      { from: 1, to: rangeStep, color: "#ffe4e8", name: `1 - ${rangeStep}` },
      {
        from: rangeStep + 1,
        to: rangeStep * 2,
        color: "#fca5b5",
        name: `${rangeStep + 1} - ${rangeStep * 2}`,
      },
      {
        from: rangeStep * 2 + 1,
        to: rangeStep * 3,
        color: "#f34069",
        name: `${rangeStep * 2 + 1} - ${rangeStep * 3}`,
      },
      {
        from: rangeStep * 3 + 1,
        to: maxValue,
        color: "#bd1347",
        name: `>= ${rangeStep * 3 + 1}`,
      },
    ];

    const totalDays = orderInMonthChartData.length;

    const weeks = Math.ceil(totalDays / 7);
    const heatmapData = Array.from({ length: weeks }, (_, weekIndex) => {
      const weekStart = weekIndex * 7 + 1;
      const weekEnd = Math.min(weekStart + 6, totalDays);
      return {
        name: `Số đơn hàng: `,
        data: orderInMonthChartData
          .filter((item) => Number(item.day) >= weekStart && Number(item.day) <= weekEnd)
          .map((item) => ({
            x: `Ngày ${item.day}`,
            y: item.value,
          })),
      };
    });

    const options = {
      chart: {
        height: 400,
        type: "heatmap",
        toolbar: {
          show: false,
        },
        animations: {
          enabled: false,
        },
      },
      series: heatmapData.reverse(),
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          distributed: true,
          colorScale: {
            ranges: dynamicRanges,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
    };
    const chart = new ApexCharts(document.querySelector(`#ordersInMonth`), options);
    chart.render();
    chartRef.current = chart;
  };

  useEffect(() => {
    getChartData();
  }, [currentMonth]);

  useEffect(() => {
    renderOrdersInMonthChart();
  }, [orderInMonthChartData]);

  return (
    <div className={"col-span-8 flex flex-col gap-4 rounded-xl p-4 shadow-custom"}>
      <div className={"flex w-full items-center justify-between gap-8"}>
        <h4 className={"min-w-max"}>Thống kê lượng đơn hàng trong tháng</h4>
        <Select
          label={"Tháng: "}
          labelPlacement={"outside-left"}
          classNames={{
            base: "w-max items-center",
            label: "min-w-max text-base",
            mainWrapper: "w-48",
          }}
          disallowEmptySelection={true}
          selectedKeys={[currentMonth.toString()]}
          onSelectionChange={(e) => setCurrentMonth(Number(Array.from(e).toString()))}
        >
          {Array.from({ length: 12 }).map((_r, index) => (
            <SelectItem key={index + 1} textValue={`Tháng ${index + 1}`}>
              Tháng {index + 1}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div id="ordersInMonth"></div>
    </div>
  );
};

export default HeatmapOrders;
