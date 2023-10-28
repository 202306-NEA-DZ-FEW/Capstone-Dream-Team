import React from "react";

export default function Article() {
    return (
        <div>
            {/* Container */}
            <div className='container w-full md:max-w-3xl mx-auto pt-10'>
                <div
                    className='w-full px-4 md:px-6 text-base text-gray-800 leading-normal'
                    style={{ fontFamily: "Georgia, serif" }}
                >
                    {/* Title */}
                    <div className='font-sans'>
                        <p className='text-base md:text-sm text-green-500 font-bold'>
                            &lt;{" "}
                            <a
                                href='#'
                                className='text-base md:text-sm text-green-500 font-bold no-underline hover:underline'
                            >
                                BACK
                            </a>
                        </p>
                        <h1 className='font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl'>
                            Welcome to Minimal Blog
                        </h1>
                        <p className='text-sm md:text-base font-normal text-gray-600'>
                            Published 19 February 2019
                        </p>
                    </div>
                    <div className='py-3'>
                        <img
                            src='/images/fatoom_in_yemen.png'
                            alt='Image Description'
                            className=' block'
                        />
                    </div>
                    {/* Post Content */}
                    {/* Lead Para */}
                    <p className='py-6'>
                        👋 Welcome fellow Tailwind CSS and minimal monochrome
                        blog fan. This starter template provides a starting
                        point to create your own minimal monochrome blog using
                        Tailwind CSS and vanilla Javascript.
                    </p>
                    <p className='py-6'>
                        The basic blog page layout is available and all using
                        the default Tailwind CSS classes (although there are a
                        few hardcoded style tags). If you are going to use this
                        in your project, you will want to convert the classes
                        into components.
                    </p>

                    <h1 className='py-2 font-sans'>Heading 1</h1>
                    <h2 className='py-2 font-sans'>Heading 2</h2>
                    <h3 className='py-2 font-sans'>Heading 3</h3>
                    <h4 className='py-2 font-sans'>Heading 4</h4>
                    <h5 className='py-2 font-sans'>Heading 5</h5>
                    <h6 className='py-2 font-sans'>Heading 6</h6>

                    <p className='py-6'>
                        Sed dignissim lectus ut tincidunt vulputate. Fusce
                        tincidunt lacus purus, in mattis tortor sollicitudin
                        pretium. Phasellus at diam posuere, scelerisque nisl sit
                        amet, tincidunt urna. Cras nisi diam, pulvinar ut
                        molestie eget, eleifend ac magna. Sed at lorem
                        condimentum, dignissim lorem eu, blandit massa.
                        Phasellus eleifend turpis vel erat bibendum scelerisque.
                        Maecenas id risus dictum, rhoncus odio vitae, maximus
                        purus. Etiam efficitur dolor in dolor molestie ornare.
                        Aenean pulvinar diam nec neque tincidunt, vitae molestie
                        quam fermentum. Donec ac pretium diam. Suspendisse sed
                        odio risus. Nunc nec luctus nisi. Class aptent taciti
                        sociosqu ad litora torquent per conubia nostra, per
                        inceptos himenaeos. Duis nec nulla eget sem dictum
                        elementum.
                    </p>

                    <ol>
                        <li className='py-3'>
                            Maecenas accumsan lacus sit amet elementum porta.
                            Aliquam eu libero lectus. Fusce vehicula dictum mi.
                            In non dolor at sem ullamcorper venenatis ut sed
                            dui. Ut ut est quam. Suspendisse quam quam, commodo
                            sit amet placerat in, interdum a ipsum. Morbi sit
                            amet tellus scelerisque tortor semper posuere.
                        </li>
                        <li className='py-3'>
                            Morbi varius posuere blandit. Praesent gravida
                            bibendum neque eget commodo. Duis auctor ornare
                            mauris, eu accumsan odio viverra in. Proin sagittis
                            maximus pharetra. Nullam lorem mauris, faucibus ut
                            odio tempus, ultrices aliquet ex. Nam id quam eget
                            ipsum luctus hendrerit. Ut eros magna, eleifend ac
                            ornare vulputate, pretium nec felis.
                        </li>
                        <li className='py-3'>
                            Vestibulum ante ipsum primis in faucibus orci luctus
                            et ultrices posuere cubilia Curae; Nunc vitae
                            pretium elit. Cras leo mauris, tristique in risus
                            ac, tristique rutrum velit. Mauris accumsan tempor
                            felis vitae gravida. Cras egestas convallis
                            malesuada. Etiam ac ante id tortor vulputate
                            pretium. Maecenas vel sapien suscipit, elementum
                            odio et, consequat tellus.
                        </li>
                    </ol>
                    {/* Post Content */}
                </div>

                {/* Tags */}
                <div className='text-base md:text-sm text-gray-500 px-4 py-6'>
                    Tags:{" "}
                    <a
                        href='#'
                        className='text-base md:text-sm text-green-500 no-underline hover:underline'
                    >
                        Link
                    </a>{" "}
                    .{" "}
                    <a
                        href='#'
                        className='text-base md:text-sm text-green-500 no-underline hover:underline'
                    >
                        Link
                    </a>
                </div>

                {/* Author */}
                <div className='flex w-full items-center font-sans px-4 py-12'>
                    <img
                        className='w-10 h-10 rounded-full mr-4'
                        src='http://i.pravatar.cc/300'
                        alt='Avatar of Author'
                    />
                    <div className='flex-1 px-2'>
                        <p className='text-base font-bold text-base md:text-xl leading-none mb-2'>
                            Jo Bloggerson
                        </p>
                        <p className='text-gray-600 text-xs md:text-base'>
                            Minimal Blog Tailwind CSS template by
                        </p>
                    </div>
                    {/* Container */}
                </div>
            </div>
        </div>
    );
}
