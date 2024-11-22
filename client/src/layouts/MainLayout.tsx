import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div>
      <Sidebar />
      <div>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
