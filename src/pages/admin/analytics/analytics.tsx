import AdminHeader from "@/components/admin/admin-header";
import WrapperContainer from "@/components/admin/wrapper-container";
import { apiRoutes } from "@/config/routes/api-routes.config";
import useCurrentBranch from "@/hooks/useCurrentBranch";
import useRole from "@/hooks/useRole";
import useStaffAxios from "@/hooks/useStaffAxios";
import { IAnalytics, TBranchOrders, TMonthAnalytics, TMonthRevenueAnalytics } from "@/types/analytics";
import { IAPIResponse } from "@/types/api-response";
import { ColorCode } from "@/utils/map-data/color";
import ApexCharts from "apexcharts";
import { useEffect, useState } from "react";
import AnalyticBlock from "./analytic-block";
import HeatmapOrders from "./heatmap-orders";

interface AnalyticsProps {}

const Analytics = (props: AnalyticsProps) => {
  const staffAxios = useStaffAxios();

  const currentBranch = useCurrentBranch();
  const currentStaffRole = useRole();

  const [orderInYearData, setOrderInYearData] = useState<TMonthAnalytics[]>();
  const [revenueInYearData, setRevenueInYearData] = useState<TMonthRevenueAnalytics[]>();
  const [customerInYearData, setCustomerInYearData] = useState<TMonthAnalytics[]>();
  const [listBranchOrders, setListBranchOrders] = useState<TBranchOrders[]>([]);

  const [orderChartData, setOrderChartData] = useState<number[]>([]);
  const [revenueChartData, setRevenueChartData] = useState<number[]>([]);
  const [customerChartData, setCustomerChartData] = useState<number[]>([]);

  const getAnalyticsData = () => {
    return staffAxios
      .get<IAPIResponse<IAnalytics>>(apiRoutes.analytics.root, {
        params: {
          branchId: currentStaffRole !== 2 ? currentBranch : undefined,
        },
      })
      .then((response) => response.data)
      .then((response) => {
        setOrderInYearData(response.results.orderInYear);
        setRevenueInYearData(response.results.revenueInYear);
        setCustomerInYearData(response.results.customerInYear);
        setListBranchOrders(response.results.branchOrders);

        setOrderChartData(response.results.orderInYear.map((_v) => _v.value));
        setRevenueChartData(response.results.revenueInYear.map((_v) => _v.revenues));
        setCustomerChartData(response.results.customerInYear.map((_v) => _v.value));
      });
  };

  const renderCharts = (
    elementName: string,
    colorCode: string,
    {
      chartName,
      chartData,
    }: {
      chartName: string;
      chartData: number[];
    },
  ) => {
    const options = {
      chart: {
        height: 75,
        width: "100%",
        type: "line",
        toolbar: {
          show: false,
        },
      },
      series: [
        {
          name: chartName,
          data: chartData,
        },
      ],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 3,
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },

        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
      },

      legend: {
        show: true,
        position: "top",
      },
      colors: [colorCode],
    };
    const chart = new ApexCharts(document.querySelector(`#${elementName}`), options);

    chart.render();
  };

  useEffect(() => {
    getAnalyticsData();
  }, []);

  const getColorCode = (mainNum: number, subNum: number) => {
    return mainNum > subNum ? ColorCode["success"] : ColorCode["danger"];
  };

  useEffect(() => {
    if (!orderInYearData || !revenueInYearData || !customerInYearData) {
      return;
    }

    renderCharts(
      "totalOrdersChart",
      getColorCode(orderChartData[orderChartData.length - 1], orderChartData[orderChartData.length - 2]),
      {
        chartName: "Đơn hàng",
        chartData: orderChartData,
      },
    );

    renderCharts(
      "totalRevenuesChart",
      getColorCode(revenueChartData[orderChartData.length - 1], revenueChartData[orderChartData.length - 2]),
      {
        chartName: "Doanh thu",
        chartData: revenueChartData,
      },
    );

    renderCharts(
      "totalCustomersChart",
      getColorCode(
        customerChartData[orderChartData.length - 1],
        customerChartData[orderChartData.length - 2],
      ),
      {
        chartName: "Khách hàng",
        chartData: customerChartData,
      },
    );
  }, [orderInYearData, revenueInYearData, customerInYearData]);

  return (
    <WrapperContainer>
      <AdminHeader title="THỐNG KÊ HOẠT ĐỘNG HỆ THỐNG" refBack="" />
      <div className={"flex flex-col gap-8"}>
        <div className={"x grid grid-cols-3 items-center gap-4"}>
          <AnalyticBlock
            title={"Đơn hàng"}
            mainNum={orderChartData[orderChartData.length - 1]}
            subNum={orderChartData[orderChartData.length - 2]}
            diffNum={orderChartData[orderChartData.length - 1] - orderChartData[orderChartData.length - 2]}
            chartId={"totalOrdersChart"}
          />
          <AnalyticBlock
            title={"Doanh thu"}
            mainNum={revenueChartData[revenueChartData.length - 1]}
            subNum={revenueChartData[revenueChartData.length - 2]}
            diffNum={
              revenueChartData[revenueChartData.length - 1] - revenueChartData[revenueChartData.length - 2]
            }
            chartId={"totalRevenuesChart"}
            isFormatCurrency={true}
          />

          {currentStaffRole === 2 && (
            <AnalyticBlock
              title={"Khách hàng"}
              mainNum={customerChartData[customerChartData.length - 1]}
              subNum={customerChartData[customerChartData.length - 2]}
              diffNum={
                customerChartData[customerChartData.length - 1] -
                customerChartData[customerChartData.length - 2]
              }
              chartId={"totalCustomersChart"}
            />
          )}
        </div>
        <div className={"grid grid-cols-12 gap-4"}>
          <HeatmapOrders />
          {currentStaffRole === 2 && (
            <div className={"col-span-4 flex flex-col gap-4 rounded-xl p-4 shadow-custom"}>
              <h4>Đơn hàng của các chi nhánh</h4>
              <div id="branchOrdersInMonth" className={"flex flex-col gap-2"}>
                {listBranchOrders.map((branchOrder, index) => (
                  <div className={"flex items-center justify-between rounded-lg border-1 px-4 py-2"}>
                    <div className={"flex items-center gap-1"}>
                      <p className={"font-semibold"}>{index + 1}.</p>
                      <p className={"font-semibold"}>{branchOrder.branch.branchConfig.branchDisplayName}</p>
                    </div>
                    <p className={"font-semibold text-primary"}>{branchOrder.orders} đơn</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </WrapperContainer>
  );
};

export default Analytics;
