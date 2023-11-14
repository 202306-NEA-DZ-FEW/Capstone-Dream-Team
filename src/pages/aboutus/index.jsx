import React, { useState, useEffect } from "react";
import AboutUs from "../../components/Home/AboutUs";
import Teamcard from "@/components/aboutus/Teamcard";
import Layout from "@/layout/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Historybar from "@/components/History/Historybar";

export default function Aboutus() {
    const [imageIndex, setImageIndex] = useState(0);
    const images = [
        "https://i.ibb.co/RjNH7QB/Rectangle-122-1.png",
        "https://techjobsforgood-prod.s3.amazonaws.com/company_profile_photos/8fd56ba8-b08a-48b0-9a6f-f03c3b49d5c4-20210602-115002.png",
    ];

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
                                About this project (website){" "}
                            </h2>
                            <p className='font-normal text-base leading-6 text-gray-600 mt-6'>
                                It is the capstone project of the Re:coded
                                Bootcamp / It is the capstone project of the
                                Re:coded Bootcamp / It is the capstone project
                                of the Re:coded Bootcamp / It is the capstone
                                project of the Re:coded Bootcamp / It is the
                                capstone project of the Re:coded Bootcamp
                            </p>
                        </div>
                        <div className='w-full h-80 lg:w-6/12 '>
                            <img
                                className='lg:block hidden w-full h-full object-cover'
                                src={images[imageIndex]}
                                alt='people discussing on board'
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
                                Our Mission
                            </h2>
                            <p className='font-normal text-base leading-6 text-gray-600 mt-6 w-full lg:w-10/12 xl:w-9/12'>
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout. The point of using
                                Lorem Ipsum.In the first place we have granted
                                to God, and by this our present charter
                                confirmed for us and our heirs forever that the
                                English Church shall be free, and shall have her
                                rights entire, and her liberties inviolate; and
                                we will that it be thus observed; which is
                                apparent from
                            </p>
                            <p className='font-normal text-base leading-6 text-gray-600 w-full lg:w-10/12 xl:w-9/12 mt-10'>
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout. The point of using
                                Lorem Ipsum.In the first place we have granted
                                to God, and by this our present charter
                                confirmed for us and our heirs forever that the
                                English Church shall be free, and shall have her
                                rights entire, and her liberties inviolate; and
                                we will that it be thus observed; which is
                                apparent from
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
                                            Responsiveness
                                        </p>
                                        <p className='mt-2 font-normal text-base leading-6 text-gray-600'>
                                            It is a long established fact that a
                                            reader will be distracted by the
                                            readable content of a page when
                                            looking at its layout.
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
                                            Firebase
                                        </p>
                                        <p className='mt-2 font-normal text-base leading-6 text-gray-600'>
                                            It is a long established fact that a
                                            reader will be distracted by the
                                            readable content of a page when
                                            looking at its layout.
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
                                            Creativity
                                        </p>
                                        <p className='mt-2 font-normal text-base leading-6 text-gray-600'>
                                            It is a long established fact that a
                                            reader will be distracted by the
                                            readable content of a page when
                                            looking at its layout.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className='justify-center flex-1 max-w-6xl px-4 py-6 mx-auto lg:py-4 md:px-6'>
                    <div className='mb-10 text-center'>
                        <h1 className='text-3xl font-bold text-blue-700 capitalize dark:text-white'>
                            {" "}
                            Meet Our Wonderful Team{" "}
                        </h1>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap'>
                        <Teamcard
                            name='Mouloud'
                            profile='Designer'
                            img='https://pbs.twimg.com/profile_images/1602443868527595520/cOjnC2Zh_400x400.jpg'
                        />
                        <Teamcard
                            name='Mouloud'
                            profile='Designer'
                            img='https://pbs.twimg.com/profile_images/1602443868527595520/cOjnC2Zh_400x400.jpg'
                        />
                        <Teamcard
                            name='Mouloud'
                            profile='Designer'
                            img='https://pbs.twimg.com/profile_images/1602443868527595520/cOjnC2Zh_400x400.jpg'
                        />
                        <Teamcard
                            name='Mouloud'
                            profile='Designer'
                            img='https://pbs.twimg.com/profile_images/1602443868527595520/cOjnC2Zh_400x400.jpg'
                        />
                        <Teamcard
                            name='Mouloud'
                            profile='Designer'
                            img='https://pbs.twimg.com/profile_images/1602443868527595520/cOjnC2Zh_400x400.jpg'
                        />
                    </div>
                </section>

                <div className='w-full px-4 mb-32 lg:w-1/3 md:w-1/2 lg:mb-0'>
                    <div className='relative'>
                        {/* <div className="w-full h-80">
                            <img
                                src="https://i.postimg.cc/bNyr5cJq/pexels-anastasia-shuraeva-5704720.jpg"
                                alt=""
                                className="object-cover w-full h-full lg:rounded-2xl"
                            />
                        </div> */}
                        <Historybar />
                    </div>
                </div>
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
