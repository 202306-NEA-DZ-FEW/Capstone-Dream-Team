export default function VideoSection() {
    return (
        <div className='flex-col mt-10 p-6 m-4 mb-8  '>
            <div className='flex h-full '>
                <div className='bg-[#E2FDF5] px-4 ml-6 mx-2 md:w-3/5 md: '>
                    <h1 className='p-2 text-xl'>
                        Working Together to End Hunger
                    </h1>
                    <p className='p-2 text-sm md:text-base'>
                        Primum igitur, quid aut officiis debitis aut ad eam non
                        quo quaerimus, non recusandae itaque negat opus esse
                        expetendam et quale sit voluptatem et dolore suo
                        sanciret militaris imperii disciplinam exercitumque in
                        voluptate ponit, quod omnium philosophorum sententia
                        tale debet esse, ut summo bono, dolorem
                    </p>
                </div>
                <div className='flex w-full self-end md:w-1/5 md:h-1/2 md:ml-16 '>
                    <img src='images/home/videosection/sha.png' alt='hands' />
                </div>
            </div>

            <div className='inline-block sm:items-end sm:w- sm:h-[320px] md:flex md:justify-center md:items-end md:w-[360px] md:h-[300px] lg:w-[500px] lg:h-[300px] '>
                <iframe
                    className='rounded-xl'
                    width='500'
                    height='250'
                    src='https://www.youtube.com/embed/UM5mjnFqWRY'
                    title='donate food help #sorts #foodvlog'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}
