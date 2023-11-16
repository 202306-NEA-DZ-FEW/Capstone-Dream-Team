export default function Restaurant() {
    return (
        <div className=' my-20 py-20 bg-gradient-to-bl bg-white flex items-center max-w-screen-xl justify-center scroll-smooth '>
            <div className='container mx-auto p-4'>
                <h2 className='hover:-translate-y-3 duration-300 max-w-lg mb-10 font-sans text-2xl text-center font-bold leading-none tracking-tight text-[#192655] sm:text-3xl lg:text-4xl md:mx-auto'>
                    Join Us - Restaurants can make a Difference
                </h2>
                <p className='text-base text-center text-gray-700 md:text-lg mb-16'>
                    As a restaurant owner or manager, you play a vital role in
                    our mission. We are reaching out to you with an exciting
                    opportunity to not only make a positive impact on your
                    community but also promote your restaurant to a wider
                    audience. Here is how you can participate:
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
                                List Your Meals
                            </div>
                            <p class='text-gray-700 text-base'>
                                By joining our cause, you can easily showcase
                                your restaurant and its delectable dishes on our
                                website. We will create a dedicated page for
                                your restaurant, complete with mouthwatering
                                images and descriptions of your meals.
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
                                Accept meal donation
                            </div>
                            <p class='text-gray-700 text-center text-base'>
                                Donors who want to support our mission can
                                purchase meals from your restaurant. These meals
                                can be redeemed by those in need, ensuring that
                                you reach a broader customer base.
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
                                Dashboard Control
                            </div>
                            <p class='text-gray-700 text-base'>
                                We provide you with a secure and user-friendly
                                dashboard that allows you to verify and track
                                coupon redemptions. You will have full control
                                over the process and can monitor the impact your
                                contributions are making.{" "}
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
                                Coupon Deletion
                            </div>
                            <p class='text-gray-700 text-base'>
                                Once a coupon is used and a meal is delivered to
                                someone in need, you can easily mark it as
                                redeemed in your dashboard. This ensures that
                                the coupons are used only once, maintaining the
                                integrity of the program.{" "}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
