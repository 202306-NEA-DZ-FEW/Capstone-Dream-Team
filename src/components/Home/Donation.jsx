import { useTranslation } from "next-i18next";
export default function Donation() {
    const { t } = useTranslation("common");
    return (
        <>
            <div
                className='px-4 py-16 mx-auto my-20 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 bg-gray-100 bg-cover'
                style={{
                    backgroundImage:
                        'url("/images/home/donation/bannerhero.png")',
                }}
            >
                <div className='max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12 '>
                    <h2 className='max-w-lg mb-6  font-sans text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl md:mx-auto'>
                        <span className='relative inline-block'>
                            <span className='relative'>
                                {t("home.donation.empower")}
                            </span>
                        </span>{" "}
                        {t("home.donation.title")}
                    </h2>
                    <p className='text-base text-white md:text-lg'>
                        {t("home.donation.subtitle")}
                    </p>
                </div>
                <div className='grid max-w-md gap-8 row-gap-10 sm:mx-auto lg:max-w-full lg:grid-cols-3'>
                    <div className='flex flex-col sm:flex-row border border-[#FDCFD9] bg-white dark:bg-slate-400 p-6 rounded-lg shadow-lg'>
                        <div className='sm:mr-4'>
                            <div className='flex items-center justify-center w-16 h-16 mb-4 rounded-full '>
                                <img
                                    className='w-[200px] h-[120px]'
                                    src='images/home/donation/step1-removebg-preview.png'
                                    alt='step'
                                />
                            </div>
                        </div>
                        <div>
                            <h6 className='mb-2 font-semibold text-xl leading-5'>
                                {t("home.donation.step1title")}
                            </h6>
                            <p className='mb-3 text-sm text-gray-900'>
                                {t("home.donation.step1text")}
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row border border-[#FDCFD9] bg-white dark:bg-slate-400 p-6 rounded-lg shadow-lg'>
                        <div className='sm:mr-4'>
                            <div className='flex items-center justify-center w-16 h-16 mb-4 rounded-full '>
                                <img
                                    className='w-[240px] h-[100px]'
                                    src='images/home/donation/step2-removebg-preview.png'
                                    alt='step'
                                />
                            </div>
                        </div>
                        <div>
                            <h6 className='mb-2 font-semibold text-xl leading-5'>
                                {t("home.donation.step2title")}
                            </h6>
                            <p className='mb-3 text-sm text-gray-900'>
                                {t("home.donation.step2text")}
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row border border-[#FDCFD9] bg-white dark:bg-slate-400 p-6 rounded-lg shadow-lg'>
                        <div className='sm:mr-4'>
                            <div className='flex items-center justify-center w-16 h-16 mb-4 rounded-full '>
                                <img
                                    className='w-[220px] h-[100px]'
                                    src='images/home/donation/step3-removebg-preview.png'
                                    alt='step'
                                />
                            </div>
                        </div>
                        <div>
                            <h6 className='mb-2 font-semibold text-xl leading-5'>
                                {t("home.donation.step3title")}
                            </h6>
                            <p className='mb-3 text-sm text-gray-900'>
                                {t("home.donation.step3text")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
