export default function Donation() {
    return (
        <>
            <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 bg-gray-100'>
                <div className='max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12 '>
                    <h2 className='max-w-lg mb-6  font-sans text-3xl font-bold leading-none tracking-tight text-[#192655] sm:text-4xl md:mx-auto'>
                        <span className='relative inline-block'>
                            <span className='relative'>Empower</span>
                        </span>{" "}
                        Change - Become a Donor
                    </h2>
                    <p className='text-base text-gray-700 md:text-lg'>
                        At BUY ME A MEAL website,your generosity has the power
                        to change lives. Here is how you can contribute:
                    </p>
                </div>
                <div className='grid max-w-md gap-8 row-gap-10 sm:mx-auto lg:max-w-full lg:grid-cols-3'>
                    <div className='flex flex-col sm:flex-row border border-[#FDCFD9] bg-white dark:bg-slate-400 p-6 rounded-lg shadow-lg'>
                        <div className='sm:mr-4'>
                            <div className='flex items-center justify-center w-16 h-16 mb-4 rounded-full '>
                                <img
                                    className='w-[200px] h-[120px]'
                                    src='images/home/donation/Donate.png'
                                    alt='step'
                                />
                            </div>
                        </div>
                        <div>
                            <h6 className='mb-2 font-semibold text-xl leading-5'>
                                Purchase Donation Coupons
                            </h6>
                            <p className='mb-3 text-sm text-gray-900'>
                                With just a few clicks, you can acquire special
                                donation coupons through our user-friendly
                                platform. These coupons serve as the catalyst
                                for nourishing those who hunger for a meal.
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row border border-[#FDCFD9] bg-white dark:bg-slate-400 p-6 rounded-lg shadow-lg'>
                        <div className='sm:mr-4'>
                            <div className='flex items-center justify-center w-16 h-16 mb-4 rounded-full '>
                                <img
                                    className='w-[240px] h-[100px]'
                                    src='images/home/donation/donation2.png'
                                    alt='step'
                                />
                            </div>
                        </div>
                        <div>
                            <h6 className='mb-2 font-semibold text-xl leading-5'>
                                Make a Meaningful Impact
                            </h6>
                            <p className='mb-3 text-sm text-gray-900'>
                                Your contributions directly translate into meals
                                for those in need. Your support helps us create
                                a tangible and positive difference in the
                                community.
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row border border-[#FDCFD9] bg-white dark:bg-slate-400 p-6 rounded-lg shadow-lg'>
                        <div className='sm:mr-4'>
                            <div className='flex items-center justify-center w-16 h-16 mb-4 rounded-full '>
                                <img
                                    className='w-[220px] h-[100px]'
                                    src='images/home/donation/donation3.png'
                                    alt='step'
                                />
                            </div>
                        </div>
                        <div>
                            <h6 className='mb-2 font-semibold text-xl leading-5'>
                                Join a Community of Givers
                            </h6>
                            <p className='mb-3 text-sm text-gray-900'>
                                By becoming a donor, you join a community of
                                like-minded individuals committed to making the
                                world a better place, one meal at a time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
