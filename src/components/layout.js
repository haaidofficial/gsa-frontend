
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
import { APP_URL } from '@/constants/apiEndpoints';
import MetaTags from './MetaTags';
import FormEnqButton from './FormEnqButton';
import WhatsappChat from './WhatsappChat';

const adminPageRoutes = [
    '/admin/dashboard',
    '/admin/add-product',
    '/admin/account-settings',
    '/admin/edit-product/[productId]',
    '/admin/enquiries',
    '/admin/manage-slides',
]


const pagesMeta = [
    { label: "Home", url: "/" },
    { label: "About Us", url: "/about" },
    { label: "Products", url: null, submenu: [] },
    { label: "Infrastructure", url: "/infrastructure" },
    { label: "Industries", url: "/industries" },
    { label: "Contact Us", url: "/contact" }
]

const siteName = 'SRG';

export default function RootLayout({ children }) {
    const metaData = {};
    // const pathname = usePathname();
    const router = useRouter();

    const currentUrl = router.pathname;
    // Find the menu item that matches the current URL
    const page = pagesMeta.find(item => item.url === currentUrl);

    // Default meta details if no match is found
    const title = page ? `${page.label} | ${siteName}` : '';
    const description = page ? `${page.label}` : '';
    const url = page ? APP_URL : '';

    const renderHeader = () => {
        if (adminPageRoutes.includes(router.pathname)) {
            return <AdminNavigationDrawer />;
        } else {
            return <Header />; // Default header for other pages
        }
    };

    const isAdminPage = adminPageRoutes.includes(router.pathname);


    const isUserViewPage = !router.pathname.startsWith('/admin');

    const showFormEnqButton = (router.pathname !== "/products/[productUrl]" && router.pathname !== "/contact" && router.pathname !== "/admin/login");

    return (
        <>
            {/* <Head>
                <meta name='titile' content={metaData?.metaTitle} />
                <title>{metaData?.metaTitle}</title>
                <meta name='keywords' content={metaData?.metaKeywords} />
                <meta name='description' content={metaData?.metaDescription} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head> */}
            <MetaTags title={title} description={description} url={url} />
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
                        {showFormEnqButton && <FormEnqButton />}
                    </>
            }

            {
                isUserViewPage && <>
                    <WhatsappChat tfn={'+917506050500'} />
                    <Footer />
                </>
            }
        </>
    );
}