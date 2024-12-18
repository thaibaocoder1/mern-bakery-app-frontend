import PlanManagement from "@/pages/admin/branch-plans-management";
import CreatePlan from "@/pages/admin/branch-plans-management/create-plan";
import DetailsPlan from "@/pages/admin/branch-plans-management/details-plan/details-plan";
import UpdatePlan from "@/pages/admin/branch-plans-management/update-plan";
import { default as DetailsPlanSystemManagement } from "@/pages/admin/plans-management/details-plan";
import { default as PlanSystemManagement } from "@/pages/admin/plans-management";
import { RouteObject } from "react-router-dom";

const adminPlanRoutes: RouteObject[] = [
  {
    path: "plans-management",
    element: <PlanSystemManagement />,
  },
  {
    path: "branch-plans-management",
    element: <PlanManagement />,
  },
  {
    path: "branch-plans-management/:id",
    element: <DetailsPlan />,
  },
  {
    path: "plans-management/:id",
    element: <DetailsPlanSystemManagement />,
  },
  {
    path: "branch-plans-management/create",
    element: <CreatePlan />,
  },
  {
    path: "branch-plans-management/:id/edit",
    element: <UpdatePlan />,
  },
];
export default adminPlanRoutes;
