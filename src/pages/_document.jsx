import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang='en'>
                <Head>
                    <link
                        rel='preconnect'
                        href='https://fonts.googleapis.com'
                    />
                    <link rel='preconnect' href='https://fonts.gstatic.com' />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Outfit&display=swap'
                        rel='stylesheet'
                    />

                    <link
                        rel='preconnect'
                        href='https://fonts.googleapis.com'
                    />
                    <link rel='preconnect' href='https://fonts.gstatic.com' />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Changa:wght@500&family=Elsie&family=Outfit&display=swap'
                        rel='stylesheet'
                    />
                </Head>
                <body className='font-[outfit]' dir='ltr'>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
