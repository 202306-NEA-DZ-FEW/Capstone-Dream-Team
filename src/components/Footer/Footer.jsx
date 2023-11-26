import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function Footer() {
    const { t } = useTranslation("common");

    return (
        <section className='bg-blue-950 bg-opacity-90'>
            <div className='max-w-screen-xl px-4 py-8 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8'>
                <nav className='flex flex-wrap justify-center space-x-8 -mx-5 -my-2'>
                    <div className='px-5 py-2'>
                        <Link href='/about' passHref>
                            <p className='text-base leading-6 text-white hover:text-gray-900 cursor-pointer'>
                                {t("footer.home")}
                            </p>
                        </Link>
                    </div>
                    <div className='px-5 py-2'>
                        <Link href='/blogs' passHref>
                            <p className='text-base leading-6 text-white hover:text-gray-900 cursor-pointer'>
                                {t("footer.blog")}
                            </p>
                        </Link>
                    </div>
                    <div className='px-5 py-2'>
                        <Link href='/team' passHref>
                            <p className='text-base leading-6 text-white hover:text-gray-900 cursor-pointer'>
                                {t("footer.meals")}
                            </p>
                        </Link>
                    </div>
                    <div className='px-5 py-2'>
                        <Link href='/aboutus' passHref>
                            <p className='text-base leading-6 text-white hover:text-gray-900 cursor-pointer'>
                                {t("footer.aboutUs")}
                            </p>
                        </Link>
                    </div>
                </nav>

                <div className='mt-8 text-base leading-6 text-center text-white'>
                    <div className='flex flex-col items-center justify-center'>
                        <img
                            src='/images/home/Navbar/sidebarLogoWhite.png'
                            alt='Logo'
                            className='w-16 h-16'
                        />
                        <span> {t("footer.copyright")}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
