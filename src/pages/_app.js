// pages/_app.js
import { useRouter } from "next/router";
import RootLayout from "@/components/layout"; // Adjust the path if needed
import { AuthProvider } from "@/context/AuthContext"; // Import the AuthProvider
import "../styles/globals.css";

const adminPageRoutes = [
    '/admin/dashboard',
    '/admin/add-product',
    '/admin/account-settings',
    '/admin/edit-product/[productId]',
    '/admin/enquiries'
];

export default function App({ Component, pageProps }) {
    const router = useRouter();
    
    const isAdminPage = adminPageRoutes.includes(router.pathname);
    const is404Page = router.pathname === "/404";

    return (
        <>
            {is404Page ? (
                // Render only the 404 component without layout
                <Component {...pageProps} />
            ) : (
                <RootLayout>
                    {isAdminPage ? (
                        <AuthProvider>
                            <Component {...pageProps} />
                        </AuthProvider>
                    ) : (
                        <Component {...pageProps} />
                    )}
                </RootLayout>
            )}
        </>
    );
}
