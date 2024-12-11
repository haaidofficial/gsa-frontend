import { Box, Grid2, Typography } from "@mui/material";
import styles from './Awards.module.css';
import HeaderBanner from "../Banner/HeaderBanner";

function AwardsComp() {

    const list = [
        {
            label: 'Hospitals',
            img: '/assets/awards-1.jpg'
        },
        {
            label: 'Glass Industry',
            img: '/assets/awards-2.jpg'
        },
        {
            label: 'Steel Industries',
            img: '/assets/awards-3.jpg'
        },
        {
            label: 'Research & Development',
            img: '/assets/awards-4.jpg'
        },
        {
            label: 'Plastic Industries',
            img: '/assets/awards-6.jpg'
        },
        {
            label: 'Food & Beverages',
            img: '/assets/awards-7.jpg'
        },
        {
            label: 'Petrochemical Industries',
            img: '/assets/awards-9.jpg'
        },
    ];

    const banners = [
        {
            image: "/assets/slider_awards_banner.jpg",
        },
        {
            image: "/assets/slider_awards_banner.jpg",
        },
        {
            image: "/assets/slider_awards_banner.jpg",
        },
    ];


    return (
        <>
            <HeaderBanner banners={banners} />
            <Box className={styles.awardsSection}>
                <Grid2 container
                    sx={{
                        padding: "0 16px", // Padding left and right
                        margin: "0 auto", // Center align
                        maxWidth: "1200px", // Optional: Set a max width for better layout control
                    }}
                    spacing={4}
                >


                    {
                        list.map((item, index) => (
                            <Grid2
                                key={index}
                                item
                                size={{ xs: 12, sm: 6, md: 3 }}
                                textAlign="center"
                                sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                            >
                                <div className={`${styles.customerCard} ${styles.awardsCard}`}>
                                    <img
                                        src={item.img}
                                        alt={item.label}
                                    />
                                    <Typography variant="h6" className={styles.customerCardHd}>

                                    </Typography>
                                </div>
                            </Grid2>
                        ))
                    }

                    <Grid2
                        item
                        size={{ xs: 12, sm: 6, md: 3 }}
                        textAlign="center"
                        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                    >
                        <div className={`${styles.customerCard} ${styles.awardsCard}`}>
                            <img
                                src="assets/awards-1.jpg"
                                alt="Awards"
                            />
                            <Typography variant="h6" className={styles.customerCardHd}>

                            </Typography>
                        </div>
                    </Grid2>

                    <Grid2
                        item
                        size={{ xs: 12, sm: 6, md: 3 }}
                        textAlign="center"
                        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                    >
                        <div className={`${styles.customerCard} ${styles.awardsCard}`}>
                            <Box
                                component="img"
                                src="assets/awards-2.jpg"
                                alt="Awards"
                            />
                            <Typography variant="h6" className={styles.customerCardHd}>

                            </Typography>
                        </div>
                    </Grid2>

                    <Grid2
                        item
                        size={{ xs: 12, sm: 6, md: 3 }}
                        textAlign="center"
                        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                    >
                        <div className={`${styles.customerCard} ${styles.awardsCard}`}>
                            <Box
                                component="img"
                                src="assets/awards-3.jpg"
                                alt="Awards"
                            />
                            <Typography variant="h6" className={styles.customerCardHd}>

                            </Typography>
                        </div>
                    </Grid2>

                    <Grid2
                        item
                        size={{ xs: 12, sm: 6, md: 3 }}
                        textAlign="center"
                        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                    >
                        <div className={`${styles.customerCard} ${styles.awardsCard}`}>
                            <Box
                                component="img"
                                src="assets/awards-4.jpg"
                                alt="Awards"

                            />
                            <Typography variant="h6" className={styles.customerCardHd}>

                            </Typography>
                        </div>
                    </Grid2>
                </Grid2>
            </Box>
        </>
    );
}

export default AwardsComp;