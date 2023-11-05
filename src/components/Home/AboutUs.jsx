export default function AboutUs() {
    return (
        <>
            {" "}
            <div
                className='flex items-center justify-center h-screen w-full bg-cover '
                style={{
                    backgroundImage: 'url("/images/home/aboutus/aboutus.png")',
                }}
            >
                <div className=' w-1/2 rounded-xl border-2 border-orange-400 shadow-xl p-10 '>
                    <h1 className=' max-w-lg mb-6 font-sans text-2xl text-center font-bold leading-none tracking-tight text-[#192655] sm:text-3xl md:mx-auto'>
                        {" "}
                        About Us
                    </h1>
                    <p className=' p-2'>
                        We are a dedicated group of students from Recoded. Our
                        mission is to make a positive impact by providing meals
                        to those in need. Buy me a meal is our capstone project,
                        driven by our passion to create a user-friendly platform
                        for connecting generous individuals with those who could
                        use a meal. Join us on this mission to ensure that no
                        one goes to bed hungry. Together, we can make a
                        difference, one meal at a time
                    </p>
                </div>
            </div>
        </>
    );
}
