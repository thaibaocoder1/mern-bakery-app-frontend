import Banner from "@/assets/images/HeroBanner.png";
import CakeCard from "@/components/cakes/cake-card";
import LoadingClient from "@/components/common/loading-client";
import { apiRoutes } from "@/config/routes/api-routes.config";
import useAxios from "@/hooks/useAxios";
import { IAPIResponse } from "@/types/api-response";
import { IBranch } from "@/types/branch";
import { ICake } from "@/types/cake";
import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import BranchInfoSection from "./branch-info-section";
import FeedbackCustomers from "./feedback-customers";

const HomePage = () => {
  const axiosClient = useAxios();
  const [listCakes, setListCakes] = useState<ICake[]>([]);
  const [listBranches, setListBranches] = useState<IBranch[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mostViewedCakes, setMostViewedCakes] = useState<ICake[]>([]);
  const [bestSellingCakes, setBestSellingCakes] = useState<ICake[]>([]);
  useEffect(() => {
    Promise.all([
      axiosClient.get<IAPIResponse<ICake[]>>(apiRoutes.cakes.getAll + "?noPagination=true"),
      axiosClient.get<IAPIResponse<IBranch[]>>(apiRoutes.branches.getAll + "?noPagination=true"),
    ])
      .then(([cakesResponse, branchesResponse]) => {
        const filteredData = cakesResponse.data.results.filter((item) => !item.isDeleted && !item.isHide);
        setListCakes(
          filteredData
            .sort((a, b) => {
              const dateA = new Date(a.updatedAt).getTime();
              const dateB = new Date(b.updatedAt).getTime();
              return dateB - dateA;
            })
            .slice(0, 4),
        );
        setBestSellingCakes(filteredData.filter((cake) => cake.soldCount >= 5));
        setMostViewedCakes(filteredData.filter((cake) => cake.views >= 35).slice(0, 4));
        setListBranches(branchesResponse.data.results);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingClient />;

  return (
    <section>
      <div className="mx-auto flex w-full justify-center">
        <Image src={Banner} alt="error" className="h-full w-full object-fill max-lg:h-96 max-md:h-80" />
      </div>
      <div className="mx-auto max-w-7xl">
        <div>
          <h1 className="my-16 text-center text-8xl uppercase text-default-300 max-lg:text-7xl max-md:text-6xl">
            sản phẩm mới
          </h1>

          <div className="split-column grid gap-x-4 gap-y-6 max-lg:px-6">
            {listCakes.map((cake) => (
              <Fragment key={cake._id}>
                <CakeCard cakeData={cake} />
              </Fragment>
            ))}
          </div>
        </div>
        <div>
          <h1 className="my-16 text-center text-8xl uppercase text-default-300 max-lg:text-7xl max-md:text-6xl">
            Top bán chạy
          </h1>

          <div className="split-column grid gap-x-4 gap-y-6 max-lg:px-6">
            {bestSellingCakes.map((cake) => (
              <Fragment key={cake._id}>
                <CakeCard cakeData={cake} />
              </Fragment>
            ))}
          </div>
        </div>
        <div>
          <h1 className="my-16 text-center text-8xl uppercase text-default-300 max-lg:text-7xl max-md:text-6xl">
            Top lượt xem
          </h1>

          <div className="split-column grid gap-x-4 gap-y-6 max-lg:px-6">
            {mostViewedCakes.map((cake) => (
              <Fragment key={cake._id}>
                <CakeCard cakeData={cake} />
              </Fragment>
            ))}
          </div>
        </div>
        <FeedbackCustomers />
        <BranchInfoSection listBranches={listBranches} />
      </div>
    </section>
  );
};

export default HomePage;
