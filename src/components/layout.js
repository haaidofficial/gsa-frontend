
// import { Inter } from 'next/font/google';
// import Header from './components/Header';
// import HeroBanner from './components/HeroBanner';
// import Footer from './components/Footer';
// import { seoData } from './helper/herobanner/seo';
// import { usePathname } from 'next/navigation';


import Head from 'next/head';
import Header from '@/components/Header';
import AdminNavigationDrawer from './Admin/Header';
import { usePathname, useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import Footer from './Footer';
import { DrawerProvider } from '@/context/AdminHeaderContext';

const adminPageRoutes = [
    '/admin/dashboard',
    '/admin/add-product',
    '/admin/account-settings',
    '/admin/edit-product/[productId]'
]

export default function RootLayout({ children }) {
    const metaData = {};
    // const pathname = usePathname();
    const router = useRouter();

    const renderHeader = () => {
        if (adminPageRoutes.includes(router.pathname)) {
            return <AdminNavigationDrawer />;
        } else {
            return <Header />; // Default header for other pages
        }
    };

    const isAdminPage = adminPageRoutes.includes(router.pathname);

    return (
        <>
            <Head>
                <meta name='titile' content={metaData?.metaTitle} />
                <title>{metaData?.metaTitle}</title>
                <meta name='keywords' content={metaData?.metaKeywords} />
                <meta name='description' content={metaData?.metaDescription} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            {/* <Header /> */}
            {
                isAdminPage ?
                    <DrawerProvider>
                        {renderHeader()}
                        {children}
                    </DrawerProvider>
                    :
                    <>
                        {renderHeader()}
                        {children}

                    </>
            }

            {
                !isAdminPage && <Footer />
            }
        </>
    );
}