// Admin Imports
import TranslatePage from "views/Translate";

// Icon Imports
import { MdHome } from "react-icons/md";
import DictionaryPage from "views/dictionary";

const routes = [
  {
    name: "Sinhala to English",
    layout: "/home",
    path: "",
    icon: <MdHome className="h-6 w-6" />,
    component: <TranslatePage />,
  },
  {
    name: "Dictionary",
    layout: "/home",
    path: "dictionary",
    icon: <MdHome className="h-6 w-6" />,
    component: <DictionaryPage />,
  },
];
export default routes;
