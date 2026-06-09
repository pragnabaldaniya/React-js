
import { Outlet } from "react-router";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useState } from "react";

export default function Dashboard() {

    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            <div className="flex-1 overflow-auto">
                <Outlet />
            </div>
        </div>
    );
}