export default function Sponsors() {
    return (
        <div>
            <div class='flex h-full my-20 py-20 items-center justify-center bg-[#BCE4EB]'>
                <div class='w-full rounded-lg bg-white px-8 py-4 shadow-md m-4'>
                    <div class='px-1 py-4'>
                        <h3 className='max-w-lg mb-6 font-sans text-2xl text-center font-bold leading-none tracking-tight text-[#192655] sm:text-3xl md:mx-auto'>
                            Our sponsors
                        </h3>
                    </div>
                    <ul class='grid grid-cols-4 gap-2 px-1'>
                        <li class='flex items-center flex-col'>
                            <img
                                src='https://randomuser.me/api/portraits/women/11.jpg'
                                alt=''
                                class='rounded-full w-16 h-16 object-cover'
                            />
                            <h5 class='font-semibold'>Alex</h5>
                        </li>
                        <li class='flex items-center flex-col'>
                            <img
                                src='https://randomuser.me/api/portraits/women/11.jpg'
                                alt=''
                                class='rounded-full w-16 h-16 object-cover'
                            />
                            <h5 class='font-semibold'>Sarah</h5>
                        </li>
                        <li class='flex items-center flex-col'>
                            <img
                                src='https://randomuser.me/api/portraits/women/11.jpg'
                                alt=''
                                class='rounded-full w-16 h-16 object-cover'
                            />
                            <h5 class='font-semibold'>Jericho</h5>
                        </li>
                        <li class='flex items-center flex-col'>
                            <img
                                src='https://randomuser.me/api/portraits/women/11.jpg'
                                alt=''
                                class='rounded-full w-16 h-16 object-cover'
                            />
                            <h5 class='font-semibold'>Dianna</h5>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
