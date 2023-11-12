import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
export default function Aboutus() {
    return (
        // <div className="h-68">
        //   <Card className="relative w-full ">
        //     <div className="absolute z-50 top-4 left-20 bottom-4 overflow-hidden">
        //       <img
        //         src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
        //         alt="card-image"
        //         className="w-60 h-60 rounded-xl object-cover"
        //       />
        //     </div>
        //     <div className="border border-red-500 pl-9 relative z-10">
        //       <Typography variant="h6" color="gray" className="mb-4 uppercase">
        //         startups
        //       </Typography>
        //       <Typography variant="h4" color="blue-gray" className="mb-2">
        //         Lyft launching cross-platform service this week
        //       </Typography>
        //       <Typography color="gray" className="mb-8 font-normal">
        //         Like so many organizations these days, Autodesk is a company in
        //         transition. It was until recently a traditional boxed software company
        //         selling licenses. Yet its own business model disruption is only part
        //         of the story
        //       </Typography>
        //       <a href="#" className="inline-block">
        //         <Button variant="text" className="flex items-center gap-2">
        //           Learn More
        //           <svg
        //             xmlns="http://www.w3.org/2000/svg"
        //             fill="none"
        //             viewBox="0 0 24 24"
        //             stroke="currentColor"
        //             strokeWidth={2}
        //             className="h-4 w-4"
        //           >
        //             <path
        //               strokeLinecap="round"
        //               strokeLinejoin="round"
        //               d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
        //             />
        //           </svg>
        //         </Button>
        //       </a>
        //     </div>
        //   </Card>
        // </div>
        <>
            <div class='p-8 mt-20 pb-4 bg-red-500 flex flex-col '>
                {/** the text */}
                <div class='w-full rounded-2xl p-8 text-white bg-gradient-to-br from-[#5f99f9] to-[#8868dc] pb-10 relative'>
                    <h1 class=' ml-80 text-xl mb-4'>Hi George</h1>
                    <p class=' ml-80 '>
                        You can contact us whenever you need help or just
                        curoius about something.
                    </p>
                </div>

                {/** the image */}
                <div class='flex w-60 rounded-xl -mt-60 ml-10 z-10  overflow-hidden'>
                    <img
                        src='https://pbs.twimg.com/profile_images/1602443868527595520/cOjnC2Zh_400x400.jpg'
                        class='w-full h-full'
                    />
                </div>
            </div>

            <div className=' p-5 relative'>
                <div className='w-full  left-0 top-[92px] absolute flex-col left-1/2 -translate-x-1/2  rounded-3xl shadow bg-white border-4 border-red-500'>
                    {/** name & description */}

                    {/** name */}
                    <p className='flex text-black text-xl font-bold justify-center items-center font-roboto whitespace-nowrap pt-60 md:pt-6'>
                        mouloud
                    </p>

                    {/**description*/}
                    <div className="  flex text-neutral-400 text-lg font-semibold font-['Roboto'] justify-center item-center pb-2 pt-2 pr-2 pl-2 md:pt-4 md:pr-20 md:pl-80">
                        You can contact us whenever you need help or just
                        curoius about something.You can contact us whenever you
                        need help or just curoius about something.You can
                        contact us whenever you need help or just curoius about
                        something.
                    </div>
                </div>

                {/** Image */}
                <img
                    className='max-w-60 max-h-60 ml-10 z-10 top-10 absolute rounded-xl'
                    src='https://pbs.twimg.com/profile_images/1602443868527595520/cOjnC2Zh_400x400.jpg'
                />
            </div>
        </>
    );
}

{
    /* <CardHeader shadow={false} floated={false} className="m-0 w-2/5 shrink-0 rounded-r-none">
          <div className="">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </div>
        </CardHeader> */
}
