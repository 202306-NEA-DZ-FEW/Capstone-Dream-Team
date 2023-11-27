import { useTranslation } from "next-i18next";
export default function Restaurant() {
    const { t } = useTranslation("common");
    return (
        <div className='pt-20 bg-gradient-to-bl bg-white flex items-center max-w-screen-xl justify-center scroll-smooth '>
            <div className='container mx-auto p-4'>
                <h2 className='hover:-translate-y-3 duration-300 max-w-lg mb-10 font-sans text-2xl text-center font-bold leading-none tracking-tight text-[#192655] sm:text-3xl lg:text-4xl mx-auto'>
                    {t("home.restaurant.title")}
                </h2>
                <p className='text-base text-center text-gray-700 md:text-lg mb-16'>
                    {t("home.restaurant.subtitle")}
                </p>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    <div className='hover:-translate-y-3 duration-300 cursor-pointer hover:shadow-2xl bg-white rounded-lg border p-4'>
                        <img
                            src='images/home/restaurant/res1-removebg-preview.png'
                            alt='take pictures of meal'
                            class='w-full just h-48 rounded-md object-cover'
                        ></img>
                        <div class='py-4 text-center'>
                            <div class='font-bold text-orange-600 text-xl mb-2'>
                                {t("home.restaurant.step1")}
                            </div>
                            <p class='text-gray-700 text-base'>
                                {t("home.restaurant.step1text")}
                            </p>
                        </div>
                    </div>
                    <div class='hover:-translate-y-3 duration-300 cursor-pointer hover:shadow-2xl bg-white rounded-lg border p-4'>
                        <img
                            src='images/home/restaurant/res2-removebg-preview.png'
                            alt='accept coupon'
                            class='w-full h-48 rounded-md object-cover'
                        ></img>
                        <div class='py-4 text-center'>
                            <div class='font-bold text-orange-600 text-xl mb-2'>
                                {t("home.restaurant.step2")}
                            </div>
                            <p class='text-gray-700 text-center text-base'>
                                {t("home.restaurant.step2text")}
                            </p>
                        </div>
                    </div>
                    <div class='hover:-translate-y-3 duration-300 cursor-pointer hover:shadow-2xl bg-white rounded-lg border p-4'>
                        <img
                            src='images/home/restaurant/res3-removebg-preview.png'
                            alt='dashboard control'
                            class='w-full h-48 rounded-md object-cover'
                        ></img>
                        <div class='py-4 text-center'>
                            <div class='font-bold text-orange-600 text-xl mb-2'>
                                {t("home.restaurant.step3")}
                            </div>
                            <p class='text-gray-700 text-base'>
                                {t("home.restaurant.step3text")}
                            </p>
                        </div>
                    </div>
                    <div className='hover:-translate-y-3 duration-300 cursor-pointer hover:shadow-2xl bg-white rounded-lg border p-4'>
                        <img
                            src='images/home/restaurant/res4-removebg-preview.png'
                            alt='delete'
                            class='w-full h-48 rounded-md object-cover'
                        ></img>
                        <div class='py-4 text-center'>
                            <div class='font-bold text-orange-600 text-xl mb-2'>
                                {t("home.restaurant.step4")}
                            </div>
                            <p class='text-gray-700 text-base'>
                                {t("home.restaurant.step4text")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
