import Link from "next/link";
export default function Joinus() {
    return (
        <div className='flex-col max-w-screen-xl max-h-full my-10 p-6 m-4 mb-8  '>
            <div className='flex max-h-screen '>
                <div
                    className=' flex flex-col bg-white shadow-xl px-4 py-6 ml-6 h-full mx-2 md:w-3/5 bg-cover hover:-translate-y-4 hover:shadow-xl  ease-out duration-700'
                    style={{ backgroundImage: 'url("/images/bg-cover.png")' }}
                >
                    <h1 className='text-center max-w-lg mb-6  font-sans text-3xl font-bold leading-none tracking-tight text-[#192655] sm:text-4xl md:mx-auto'>
                        Working Together to End Hunger
                    </h1>
                    <p className='p-2 text-sm md:text-base'>
                        Your small act of kindness can make a big difference.
                        Together, we can change lives and create a brighter
                        future. Donate today and be the change you wish to see
                        in the world.
                    </p>
                    <div className='flex w-full justify-center gap-4 mb-2 mt-2 '>
                        <Link
                            href='/signIn'
                            class='bg-white hover:bg-orange-600 hover:text-white mt-8 py-3 px-8 text-lg rounded-full font-bold uppercase text-orange-400 border border-orange-400 tracking-widest'
                        >
                            join Us
                        </Link>
                        <Link
                            href='/signUp'
                            class='bg-orange-400 hover:bg-orange-600 mt-8 py-3 px-8 text-lg rounded-full font-bold uppercase text-white tracking-widest'
                        >
                            Donate
                        </Link>
                    </div>
                </div>
                <div className=' hover:-translate-y-4 hover:shadow-xl rounded-full ease-out duration-700 flex w-full self-end md:w-1/5 md:h-1/2 md:ml-16 '>
                    <img src='images/home/joinUs/sha.png' alt='hands' />
                </div>
            </div>
        </div>
    );
}
