export default function Process() {
    const images = [
        {
            url: "images/home/process/Donate.png",
            text: "Donator buy the coupon in the website ",
        },
        {
            url: "images/home/process/buy.png",
            text: "The person in need can eat without asking in available restaurants",
        },
        {
            url: "images/home/process/eat.png",
            text: "The restaurant delete the used coupon in the website ",
        },
    ];
    return (
        <div className='w-full h-full flex-col mt-6 p-6 justify-center  text-center'>
            <h1 className='font-bold mr-6 text-2xl '>Donation Process</h1>
            <div className='md:flex md:justify-center w-full h-full '>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className='flex-col justify-center p-6 gap-4'
                    >
                        <div className='flex justify-center'>
                            {" "}
                            <img
                                className='w-[200px] h-[220px]'
                                src={image.url}
                                alt='step'
                            />
                        </div>
                        <div className='flex md:w-1/2 md:h-full md:ml-10  md:text-xs md:mt-3 xl:ml-20 justify-center '>
                            <div className=' w-1/2 h-1/3 md:w-[140px] md:h-[130px] lg:w-[250px] lg:h-[130px]  bg-teal-600 bg-opacity-70 rounded-[15px] '>
                                <h1 className='text-lg pt-2 text-white font-bold '>
                                    Step {index + 1}
                                </h1>
                                <p className='text-center p-2 pt-2'>
                                    {image.text}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
