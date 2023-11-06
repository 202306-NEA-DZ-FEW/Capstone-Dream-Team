export default function Restaurant() {
    return (
        <div class=' mt-20 bg-gradient-to-bl from-[#FCDBB4] to-violet-50 flex items-center justify-center '>
            <div class='container mx-auto p-4'>
                <h2 className='max-w-lg mb-6 font-sans text-2xl text-center font-bold leading-none tracking-tight text-[#192655] sm:text-3xl md:mx-auto'>
                    Join Us - Restaurants can make a Difference
                </h2>
                <p className='text-base text-center text-gray-700 md:text-lg mb-6'>
                    As a restaurant owner or manager, you play a vital role in
                    our mission. We are reaching out to you with an exciting
                    opportunity to not only make a positive impact on your
                    community but also promote your restaurant to a wider
                    audience. Here is how you can participate:
                </p>
                <div class='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                    <div class='bg-white rounded-lg border p-4'>
                        <img
                            src='images/home/restaurant/pics of food.jpg'
                            alt='Placeholder Image'
                            class='w-full h-48 rounded-md object-cover'
                        ></img>
                        <div class='px-1 py-4'>
                            <div class='font-bold text-xl mb-2'>
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
                    <div class='bg-white rounded-lg border p-4'>
                        <img
                            src='images/home/restaurant/accept.jpg'
                            alt='Placeholder Image'
                            class='w-full h-48 rounded-md object-cover'
                        ></img>
                        <div class='px-1 py-4'>
                            <div class='font-bold text-xl mb-2'>
                                Accept Coupons
                            </div>
                            <p class='text-gray-700 text-base'>
                                Donors who want to support our mission can
                                purchase meal coupons from your restaurant.
                                These coupons can be redeemed by those in need,
                                ensuring that you reach a broader customer base.
                            </p>
                        </div>
                    </div>
                    <div class='bg-white rounded-lg border p-4'>
                        <img
                            src='images/home/restaurant/controle.jpg'
                            alt='Placeholder Image'
                            class='w-full h-48 rounded-md object-cover'
                        ></img>
                        <div class='px-1 py-4'>
                            <div class='font-bold text-xl mb-2'>
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
                    <div class='bg-white rounded-lg border p-4'>
                        <img
                            src='images/home/restaurant/delete.jpg'
                            alt='Placeholder Image'
                            class='w-full h-48 rounded-md object-cover'
                        ></img>
                        <div class='px-1 py-4'>
                            <div class='font-bold text-xl mb-2'>
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
