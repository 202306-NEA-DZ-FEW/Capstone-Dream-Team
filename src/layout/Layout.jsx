import * as React from "react";

import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
    // Put Header or Footer around the children element
    // Example
    // return (
    //     <>
    //         <Navbar />
    //         {children}
    //         <Footer />
    //     </>
    // );

    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
