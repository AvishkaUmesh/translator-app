// Admin Imports
import TranslatePage from "views/Translate";

// Icon Imports
import { MdHome } from "react-icons/md";

const routes = [
  {
    name: "Sinhala to English",
    layout: "/home",
    path: "",
    icon: <MdHome className="h-6 w-6" />,
    component: <TranslatePage />,
  },
];
export default routes;
