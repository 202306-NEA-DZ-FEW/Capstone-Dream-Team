import React, { useState, useEffect } from "react";
import Teamcard from "@/components/aboutus/Teamcard";
import Layout from "@/layout/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
export default function Aboutus() {
    const [imageIndex, setImageIndex] = useState(0);
    const images = [
        "images/aboutus/recoded.png",
        "images/aboutus/materials.png",
        "images/aboutus/buymeameal.png",
    ];
    const { t } = useTranslation("common");
    useEffect(() => {
        const intervalId = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <Layout>
                <div className='2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4'>
                    <div className='flex lg:flex-row flex-col lg:gap-8 sm:gap-10 gap-12'>
                        <div className='w-full lg:w-6/12'>
                            <h2 className='w-full font-bold text-blue-700 lg:text-4xl text-3xl lg:leading-10 leading-9'>
                                {t("aboutus.Our project")}{" "}
                            </h2>
                            <p className='font-normal text-base leading-6 text-gray-600 mt-6'>
                                {t("aboutus.p1")}
                            </p>
                        </div>
                        <div className='w-full h-80 lg:w-6/12 '>
                            <img
                                className='lg:block hidden w-full h-full object-cover'
                                src={images[imageIndex]}
                                alt='capstone images'
                            />
                            <img
                                className='lg:hidden sm:block hidden w-full h-full object-cover'
                                src={images[imageIndex]}
                                alt='people discussing on board'
                            />
                            <img
                                className='sm:hidden block w-full h-full object-cover'
                                src={images[imageIndex]}
                                alt='people discussing on board'
                            />
                        </div>
                    </div>

                    <div className='flex lg:flex-row flex-col md:gap-14 gap-16 justify-between lg:mt-20 mt-16'>
                        <div className='w-full lg:w-6/12'>
                            <h2 className='font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-blue-700'>
                                {t("aboutus.Our Goal")}
                            </h2>
                            <p className='font-normal text-base leading-6 text-gray-600 mt-6 w-full lg:w-10/12 xl:w-9/12'>
                                {t("aboutus.p2")}
                            </p>
                            <p className='font-normal text-base leading-6 text-gray-600 w-full lg:w-10/12 xl:w-9/12 mt-10'>
                                {t("aboutus.p3")}
                            </p>
                        </div>
                        <div className='w-full lg:w-6/12'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:gap-12 gap-10'>
                                {/* <!-- Team Card --> */}
                                <div className='flex p-4 shadow-sm rounded-md border border-orange-100 bg-orange-50'>
                                    <div className='mr-6'>
                                        <img
                                            width='40'
                                            height='100'
                                            src='/images/aboutus/responsive.svg'
                                            alt='logo'
                                        />
                                    </div>
                                    <div className=''>
                                        <p className='font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-blue-700'>
                                            {t("aboutus.Responsiveness")}
                                        </p>
                                        <p className='mt-2 font-normal text-base leading-6 text-gray-600'>
                                            {t("aboutus.Responsiveness")}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex p-4 shadow-sm rounded-md border border-orange-100 bg-orange-50'>
                                    <div className='mr-6'>
                                        <img
                                            width='36'
                                            height='36'
                                            src='/images/aboutus/firebase.svg'
                                            alt='logo'
                                        />
                                    </div>
                                    <div className=''>
                                        <p className='font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-blue-700'>
                                            {t("aboutus.Firebase")}
                                        </p>
                                        <p className='mt-2 font-normal text-base leading-6 text-gray-600'>
                                            {t("aboutus.p fir")}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex p-4 shadow-sm rounded-md border border-orange-100 bg-orange-50'>
                                    <div className='mr-6'>
                                        <img
                                            width='36'
                                            height='100'
                                            src='/images/aboutus/lamp.svg'
                                            alt='logo'
                                        />
                                    </div>
                                    <div className=''>
                                        <p className='font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-blue-700'>
                                            {t("aboutus.Creativity")}
                                        </p>
                                        <p className='mt-2 font-normal text-base leading-6 text-gray-600'>
                                            {t("aboutus.p creat")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className='justify-center flex-1 max-w-6xl px-4 py-6 mx-auto lg:max-w-full lg:py-4 md:px-3'>
                    <div className='mb-10 text-center'>
                        <h1 className='text-3xl font-bold text-blue-700 capitalize dark:text-white'>
                            {" "}
                            {t("aboutus.Team")}{" "}
                        </h1>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap'>
                        <Teamcard
                            linkedin='https://www.linkedin.com/in/mouloud-mecheter-4a3701166/'
                            github='https://github.com/mouloud247'
                            name='Mouloud Mecheter'
                            profile='Front-end Developer'
                            img='https://media.licdn.com/dms/image/D4D03AQFEVj3F6unZOw/profile-displayphoto-shrink_800_800/0/1690826886119?e=1705536000&v=beta&t=t9ks0eD59TE23xi1Ihl4WYSfFMnaa40_RyhAU9ENf7o'
                        />
                        <Teamcard
                            linkedin='https://www.linkedin.com/in/walid-t-belharazem/'
                            github='https://github.com/walidbelharazem'
                            name='Walid Belharazem'
                            profile='Front-end Developer'
                            img='https://media.licdn.com/dms/image/D4D03AQG8mC0NMyT_ZQ/profile-displayphoto-shrink_800_800/0/1694126020760?e=1705536000&v=beta&t=hWISFdPhy0va94t9_QKetPg-y4blsxSfGGrQGzo2eEk'
                        />
                        <Teamcard
                            linkedin='https://www.linkedin.com/in/fatima-merzouk/'
                            github='https://github.com/merzoukfatima'
                            name='Fatima Merzouk'
                            profile='Front-end Developer'
                            img='https://media.licdn.com/dms/image/D4E03AQEReqL3lIqZqA/profile-displayphoto-shrink_800_800/0/1690643982079?e=1705536000&v=beta&t=NQmJVhxKnIbsTAPcIqlfQ6Y80WZh2u0OkaWoNDn5m98'
                        />
                        <Teamcard
                            linkedin='https://www.linkedin.com/in/bouchra-ikram-aboura-1750b5169/'
                            github='https://github.com/ikoworld'
                            name='Bouchra Aboura'
                            profile='Front-end Developer'
                            img='images/aboutus/bouchra.png'
                        />
                        <Teamcard
                            linkedin='https://www.linkedin.com/in/mounib-zaidi/'
                            github='https://github.com/mounibzaidi'
                            name='Mounib Zaidi'
                            profile='Front-end Developer'
                            img='images/aboutus/mounib.jpeg'
                        />
                    </div>
                </section>
            </Layout>
        </>
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
