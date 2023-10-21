import * as React from "react";

import { useRouter } from "next/router";
import { useEffect } from "react";

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
    //         <Footer />
    //     </>
    // );

    return <>{children}</>;
}
