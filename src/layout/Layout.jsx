import { useRouter } from "next/router";
import * as React from "react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Home/Navbar";

export default function Layout({ children }) {
    const router = useRouter();

    useEffect(() => {
        if (router.locale === "ar") {
            document.body.dir = "rtl";
        } else {
            document.body.dir = "ltr";
        }
    }, [router.locale]);

    // Put Header or Footer around the children element
    // Example
    // return (
    //     <>
    //         <Navbar />
    //         {children}
    //
    //     </>
    // );

    return (
        <>
            <Toaster
                position='buttom-right'
                toastOptions={{ duration: 7000 }}
            />
            <Navbar locale={router.locale} />
            {children}
            <Footer />
        </>
    );
}
