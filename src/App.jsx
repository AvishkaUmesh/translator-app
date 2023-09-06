import { Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "layouts/dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="home/*" element={<AdminLayout />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default App;
