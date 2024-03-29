import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Top from "../components/Top";
import { Analytics } from '@vercel/analytics/react';

export default function Root() {
    return (
        <div className="w-full h-screen flex flex-col text-gray-300 bg-black sm:flex-row-reverse">
            <div className="flex flex-col w-full flex-grow">
                <Top/>
                <div className="w-full flex-grow overflow-y-scroll bg-black px-3 pb-[300px]">
                    <Outlet/>
                </div>
            </div>
            <div className="h-fit sm:h-full w-full sticky bottom-0 sm:static sm:w-fit bg-gray-900">
                <Navbar/>
            </div>
            <Analytics />
        </div>
    )
}
