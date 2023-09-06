// Admin Imports
import MainDashboard from "views/dashboard";

// Icon Imports
import { MdHome } from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="w-6 h-6" />,
    component: <MainDashboard />,
  },
];
export default routes;
