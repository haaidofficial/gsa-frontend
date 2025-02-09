export const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const APP_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const Endpoints = {
    SignUp: '/api/auth/signup',
    Login: '/api/auth/login',
    AddProduct: '/api/products/add-product',
    GetProducts: '/api/products',
    DeleteProduct: '/api/products/delete-product',
    GetProduct: '/api/products/get-product',
    UpdateProduct: '/api/products/update-product',
    GetProductByPageUrl: '/api/products/page',
    GetProductsNavigation: '/api/products/navigation',
    ContactForm: '/api/email/contact-form',
    GetAccountDetails: '/api/auth/account-details',
    UpdateAccountDetails: '/api/auth/update-account',
    CreateEnquiry: '/api/enquiries/create-enquiry',
    CreateNormalEnquiry: '/api/enquiries/create-normal-enquiry',
    GetEnquiries: '/api/enquiries/get-enquiries',
    DeleteEnquiry: '/api/enquiries/delete-enquiry',
    // carousel
    AddCarousel: '/api/carousel/add-carousel',
    DeleteCarousel: '/api/carousel/delete-carousel/',
    GetCarousels: '/api/carousel/get-carousels',

}