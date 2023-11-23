import react from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SignIn from "@/components/Auth/signIn";
import SignUp from "@/components/Auth/signUp";
import ResetPassword from "@/components/Auth/resetPassword";
import { useState, useEffect } from "react";
import Layout from "@/layout/Layout";
import { useRouter } from "next/router";

function Enter() {
    const [component, setComponent] = useState("SignIn");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageUrls, setImageUrls] = useState([
        "/images/signup/Asset01.png",
        "/images/signup/Asset02.png",
        "/images/signup/Asset03.png",
        "/images/signup/Asset04.png",
        "/images/signup/Asset05.png",
    ]);

    const router = useRouter();

    useEffect(() => {
        if (router.locale === "ar") {
            const arImageUrls = [
                "/images/signup/Asset01ar.png",
                "/images/signup/Asset02ar.png",
                "/images/signup/Asset03ar.png",
                "/images/signup/Asset04ar.png",
                "/images/signup/Asset05ar.png",
            ];
            setImageUrls(arImageUrls);
        } else {
            const enImageUrls = [
                "/images/signup/Asset01.png",
                "/images/signup/Asset02.png",
                "/images/signup/Asset03.png",
                "/images/signup/Asset04.png",
                "/images/signup/Asset05.png",
            ];
            setImageUrls(enImageUrls);
        }
    }, [router.locale]);

    function componentToRender(element) {
        setComponent(element);
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        }, 3000); // Change the interval duration as needed (in milliseconds)

        return () => clearInterval(intervalId);
    }, [currentIndex]);

    return (
        <Layout>
            <div className='bg-white lg:h-screen relative '>
                <div
                    className='flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
      xl:px-5 lg:flex-row lg:h-1/2 lg:justify-center lg:items-center lg:my-40'
                >
                    <div className='flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row'>
                        <div className='w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12 '>
                            <div className='flex flex-col items-center justify-center w-full lg:h-1/2 relative lg:px-10 '>
                                {/*<img src="/images/signup/Asset1.png" class="w-full h-full rounded-2xl " />*/}
                                {imageUrls.map((imageUrl, index) => (
                                    <img
                                        key={index}
                                        src={imageUrl}
                                        alt={`Image ${index + 1}`}
                                        className={`image w-full h-1/2 rounded-2xl ${
                                            index === currentIndex
                                                ? "visible"
                                                : "hidden"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:h-1/2 lg:w-5/12'>
                            {component === "SignIn" && (
                                <SignIn updateComponent={componentToRender} />
                            )}
                            {component === "SignUp" && (
                                <SignUp updateComponent={componentToRender} />
                            )}
                            {component === "ResetPassword" && (
                                <ResetPassword
                                    updateComponent={componentToRender}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}

export default Enter;
