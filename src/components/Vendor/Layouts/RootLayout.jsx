import { Outlet } from "react-router-dom";
import Sidebar from "../SideBar";

function RootLayout() {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1">
      <Outlet/>
      </div>
    </div>
  );
}

export default RootLayout;
