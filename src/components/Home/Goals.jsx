export default function Goals() {
    const images = [
        "images/home/Goals/No Poverty.jpg",
        "images/home/Goals/zeroHunger.jpg",
        "images/home/Goals/goodHealth.jpg",
    ];

    return (
        <div className='w-full h-full flex-col mt-6 p-6 justify-center  text-center'>
            <h1 className='font-bold mr-6 text-2xl '> Goals </h1>
            <div className='md:flex w-full h-full md:justify-center md:gap-10 '>
                {images.map((image, index) => (
                    <div key={index} className='flex justify-center'>
                        {" "}
                        <img
                            className='w-[200px] h-[220px]'
                            src={image}
                            alt='step'
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
