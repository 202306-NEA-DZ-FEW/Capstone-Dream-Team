import { ThemeProvider } from "next-themes";
import React from "react";
import { useState } from "react";

import Dashboard from "@/components/Dashboard";

import Sidemenu from "../../components/Sidemenu";

export default function AdminDashboard() {
    const [component, setComponent] = useState(<Dashboard />);

    function handleClick(selectedComponent) {
        setComponent(selectedComponent);
    }

    return (
        <ThemeProvider enableSystem={true} attribute='class'>
            <div className='flex'>
                <Sidemenu handleClick={handleClick}></Sidemenu>
                <div className='flex justify-items-center items-center p-8 text-2xl font-bold'>
                    {component}
                </div>
            </div>
        </ThemeProvider>
    );
}
