import Link from "next/link";

export default function Footer() {
    return (
        <footer className='bg-teal-950 h-100 text-white p-6'>
            <div className='flex items-center flex-row'>
                <img
                    src='/images/logo.svg'
                    alt='Logo'
                    width='100'
                    height='100'
                />
                <h2 className='font-bold text-center mb-2'>Buy me a meal</h2>
                <div className=' ml-auto'>
                    <h2 className='font-bold mb-2'>
                        Subscribe to our newsletter
                    </h2>
                    <form action='#'>
                        <input
                            type='email'
                            placeholder='Email'
                            className='mb-2 h-10'
                        />
                        <button
                            className='border p-2 bg-amber-400'
                            type='submit'
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            <div className='flex justify-between'>
                <div>
                    <p>© 2021 Buy me a meal. All rights reserved.</p>
                    <p>3348 Nw 23rd Ave, Suite A, Gainesville, FL 32605</p>
                    <p>+1 352-505-9106</p>
                    <p>support@buymeameal.com</p>
                </div>
                <div>
                    <div className='font-bold mb-2 mr-40 justify-evenly items-center flex-grid gap-4 '>
                        <Link href='/home' passHref>
                            <h1 className='cursor-pointer'>Home</h1>
                        </Link>
                        <Link href='/meals' passHref>
                            <h1 className='cursor-pointer'>Meals</h1>
                        </Link>
                        <Link href='/blog' passHref>
                            <h1 className='cursor-pointer'>Blog</h1>
                        </Link>
                    </div>
                </div>
                <div>
                    <h2 className='font-bold mr-20 mb-2'>Follow us</h2>
                    <div className='flex flex-col'>
                        <p href='#'>LinkedIn</p>
                        <p href='#'>Instagram</p>
                        <p href='#'>Facebook</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
