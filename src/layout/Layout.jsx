import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";
import * as React from "react";
import { useEffect } from "react";

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
            <ThemeProvider enableSystem={true} attribute='class'>
                <Navbar locale={router.locale} />
                {children}
            </ThemeProvider>
        </>
    );
}
