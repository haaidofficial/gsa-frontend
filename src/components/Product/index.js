import React, { useEffect, useState } from 'react';
import { Box, Grid2, List, ListItem, Typography, Modal, IconButton, Tooltip, Button } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import styles from './Product.module.css';
import { APP_URL, BASE_URL, Endpoints } from '@/constants/apiEndpoints';
import axios from 'axios';
import Link from 'next/link';
import ProductList from '../ProductList';
import HeaderBanner from '../Banner/HeaderBanner';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useRouter } from 'next/router';
import MetaTags from '../MetaTags';

const banners = [
    {
        image: "/assets/slider_products.jpg",
    },
    {
        image: "/assets/slider_products.jpg",
    },
    {
        image: "/assets/slider_products.jpg",
    },
];

const productImagePath = `${BASE_URL}`;

const ProductComp = ({ product }) => {
    const [otherProducts, setOtherProducts] = useState([]);
    const [openModal, setOpenModal] = useState(false); // State to control modal visibility
    const [modalImage, setModalImage] = useState(''); // State to store the image to display in modal
    const router = useRouter();

    console.log(product, 'product');

    useEffect(() => {
        fetchProductsNavigation();
    }, []);

    const fetchProductsNavigation = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}${Endpoints.GetProductsNavigation}?skip=${0}&limit=${10}`
            );

            if (response.data) {
                setOtherProducts(response.data.products);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleImageClick = (image) => {
        setModalImage(image); // Set the image to be shown in the modal
        setOpenModal(true); // Open the modal
    };

    const handleCloseModal = () => {
        setOpenModal(false); // Close the modal
    };

    const sendProductEnquiryData = () => {
        if (product) {
            const state = product;
            localStorage.setItem('enq_product', JSON.stringify(state));
            router.push({
                pathname: '/contact',
                query: { referrer: 'enq' },
            });
        }
    };


    const metaTitle = product?.title;
    const metaDescription = product?.title;
    const metaUrl = `${APP_URL}products/${product?.pageUrl}`;

    return (
        <>
            <MetaTags title={metaTitle} description={metaDescription} url={metaUrl} />
            <HeaderBanner banners={banners} />
            <div className={styles.productSection}>
                <Grid2
                    container
                    spacing={2}
                    sx={{
                        padding: '0 16px', // Padding left and right
                        margin: '0 auto', // Center align
                        maxWidth: '1200px', // Optional: Set a max width for better layout control
                    }}
                >
                    <Grid2 item size={{ xs: 12, sm: 6, md: 5 }}>
                        <div>
                            <Typography variant="h4" gutterBottom className={styles.productTitle}>
                                {product.title}
                            </Typography>
                            <Typography
                                variant="body1"
                                component="div"
                                dangerouslySetInnerHTML={{ __html: product.description }}
                                sx={{
                                    lineHeight: '1.6em',
                                    fontSize: '16px',
                                    color: '#333',
                                }}
                                className={styles.productDescription}
                            />
                        </div>
                    </Grid2>

                    <Grid2 item size={{ xs: 12, sm: 6, md: 5 }}>
                        <div className={styles.productGridOuter}>
                            <div className={styles.productOuterCont}>
                                <div className={styles.productDescImages}>
                                    {product.images.map((image, index) => (
                                        <div key={index} style={{ position: 'relative' }}>
                                            {/* Image thumbnail */}
                                            <img
                                                src={`${productImagePath}${image}`}
                                                alt={`Product Image ${index + 1}`}
                                                className={styles.productImage}
                                            />

                                            <Tooltip title="Zoom Image" placement="top">
                                                <IconButton
                                                    onClick={() => handleImageClick(image)}
                                                    sx={{
                                                        position: 'absolute',
                                                        top: '5px',
                                                        right: '8px',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                        color: 'white',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                                        },
                                                    }}
                                                >
                                                    <ZoomInIcon className={styles.zoomIcon} />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Grid2>

                    <Grid2 item size={{ xs: 12, sm: 12, md: 2 }}>
                        <div>
                            <ProductList />
                        </div>
                    </Grid2>
                </Grid2>

                <button className={styles.enquiryButton} onClick={sendProductEnquiryData}>
                    {/* Icon inside a circular white box */}
                    <div className={styles.iconContainer}>
                        <MailOutlineIcon fontSize="small" />
                    </div>
                    Enquiry
                </button>
            </div>

            {/* Modal to display larger image */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        maxWidth: '90%', // Set a max-width for the modal content
                        maxHeight: '90%', // Set a max-height for the modal content
                        backgroundColor: 'white',
                        boxShadow: 24,
                        padding: '20px',
                        borderRadius: '8px',
                        overflow: 'auto',
                    }}

                    className={styles.modalImgWrapper}
                >
                    <img
                        src={`${productImagePath}${modalImage}`}
                        alt="Modal Image"
                        className={styles.modalImage}
                    />
                </Box>
            </Modal>
        </>
    );
};

export default ProductComp;
