import * as React from 'react';
import { Box, Typography, Grid2 } from '@mui/material';
import styles from './Footer.module.css';
import Link from 'next/link';
import axios from 'axios';
import { BASE_URL, Endpoints } from '@/constants/apiEndpoints';

const Footer = () => {

    const [otherProducts, setOtherProducts] = React.useState([]);

    React.useEffect(() => {
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

    return (
        <Box
            className={styles.footer}
        >
            <Grid2
                container
                spacing={2}
                sx={{
                    padding: '40px 16px 0 16px',
                    margin: '0 auto', // Center align
                    maxWidth: '1200px', // Optional: Set a max width for better layout control
                }}
                className={styles.footerLinks}
            >
                {/* MENU Section */}
                <Grid2 item size={{ xs: 12, sm: 6, md: 2 }}>
                    <Box className={styles.pageLinks}>
                        <Typography className={styles.footerLinkHd} variant="h6" component="h2" sx={{ mb: 2 }}>
                            MENU
                        </Typography>
                        <div>
                            <Link href="/" sx={{ display: 'block', mb: 1 }}>
                                Home
                            </Link>
                        </div>
                        <div>
                            <Link href="/about" sx={{ display: 'block', mb: 1 }}>
                                About
                            </Link>
                        </div>
                        <div>
                            <Link href="/industries" sx={{ display: 'block', mb: 1 }}>
                                Industries
                            </Link>
                        </div>
                        <div>
                            <Link href="/annual-return" sx={{ display: 'block', mb: 1 }}>
                                Annual Return
                            </Link>
                        </div>
                        <div>
                            <Link href="/contact" sx={{ display: 'block' }}>
                                Contact
                            </Link>
                        </div>
                    </Box>
                </Grid2>

                {/* PRODUCTS Section */}
                {
                    (otherProducts?.length > 0) &&
                    <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
                        <Box className={styles.productsLinks}>
                            <Typography className={styles.footerLinkHd} variant="h6" component="h2" sx={{ mb: 2 }}>
                                PRODUCTS
                            </Typography>

                            {
                                otherProducts?.map((item, index) => (
                                    <div>
                                        <Link href={`/products/${item.pageUrl}`} key={index}>
                                            {item.title}
                                        </Link>
                                    </div>
                                ))
                            }
                        </Box>
                    </Grid2>
                }


                {/* COMPANY INFO Section */}
                <Grid2 item size={{ xs: 12, sm: 12, md: 6 }}>
                    <Box className={styles.infoLinks}>
                        <Grid2 container>
                            <Grid2 item size={{ xs: 12, sm: 12, md: 6 }}>
                                <div>
                                    <Typography sx={{ display: 'inline-block' }}>Call Us: </Typography>{' '}
                                    <Link href="tel:+912248262439" sx={{ display: 'block', mt: 2 }}>
                                        +91-22 48262439
                                    </Link>
                                </div>
                                <div>
                                    <Typography sx={{ display: 'inline-block' }}> Mobile:  </Typography>{' '}
                                    <Link href="tel:+919869261022" sx={{ display: 'block', mt: 2 }}>
                                        +91 9869261022
                                    </Link>
                                </div>
                                <div>
                                    <Typography sx={{ display: 'inline-block' }}> Email:  </Typography>{' '}
                                    <Link href="mailto:oxygenip@gmail.com">
                                        oxygenip@gmail.com
                                    </Link>
                                </div>
                            </Grid2>
                            <Grid2 item size={{ xs: 12, sm: 12, md: 6 }}>
                                <Box textAlign={'center'}>
                                    <img
                                        src="/assets/footer-logo.png"
                                        alt="SDGPL Logo"
                                        className={styles.footerLogo}
                                    />
                                </Box>
                                <Typography sx={{ mt: 2, textAlign: 'left' }} className={styles.footerInfoHd}>
                                    Plot No. RS6, TTC Industrial Area, Off Thane-Belapur Road, Rabale Navi
                                    Mumbai - 400701
                                </Typography>
                            </Grid2>
                        </Grid2>

                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default Footer;