import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="h-screen flex-1 flex flex-col bg-gray-950 text-gray-100">
      <Navbar />
      <main className="flex-1 overflow-y-auto px-3 py-4 lg:px-30 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
