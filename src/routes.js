// Admin Imports
import MainDashboard from "views/dashboard";

// Icon Imports
import { MdHome } from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/home",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
];
export default routes;
