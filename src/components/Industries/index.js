import { Box, Grid2, Typography } from "@mui/material";
import styles from './Industries.module.css';
import HeaderBanner from "../Banner/HeaderBanner";

const IndustriesComp = () => {

    const list = [
        {
            label: 'Hospitals',
            img: '/assets/hospitals.jpg'
        },
        {
            label: 'Glass Industry',
            img: '/assets/Glass-industry.jpg'
        },
        {
            label: 'Steel Industries',
            img: '/assets/steel-industry.jpg'
        },
        {
            label: 'Research & Development',
            img: '/assets/research-development.jpg'
        },
        {
            label: 'Rubber Industries',
            img: '/assets/rubber-industry.jpg'
        },
        {
            label: 'Plastic Industries',
            img: '/assets/Plastic-Industry.jpg'
        },
        {
            label: 'Food & Beverages',
            img: '/assets/food-beverages.jpg'
        },
        {
            label: 'Pharma Industries',
            img: '/assets/Pharma-industry.jpg'
        },
        {
            label: 'Petrochemical Industries',
            img: '/assets/petrochemical-industry.jpg'
        },
        {
            label: 'Defence Industries',
            img: '/assets/defence-industry.jpg'
        },
        {
            label: 'Metal Fabrication',
            img: '/assets/metal-fabrication.jpg'
        },
    ];

    const banners = [
        {
            image: "/assets/slider_industries.jpg",
        },
        {
            image: "/assets/slider_industries.jpg",
        },
        {
            image: "/assets/slider_industries.jpg",
        },
    ];

    return (
        <>
            <HeaderBanner banners={banners} />
            <Box className={styles.customerSection}>
                <Grid2 container
                    sx={{
                        padding: "0 16px", // Padding left and right
                        margin: "0 auto", // Center align
                        maxWidth: "1200px", // Optional: Set a max width for better layout control
                    }}
                    spacing={4}
                >
                    {/* Quality */}

                    {
                        list.map((item, index) => (
                            <Grid2
                                key={index}
                                item
                                size={{ xs: 12, sm: 6, md: 3 }}
                                textAlign="center"
                                sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                            >
                                <div className={styles.customerCard}>
                                    <img
                                        src={item.img}
                                        alt={item.label}
                                    />
                                    <Typography variant="h6" className={styles.customerCardHd}>
                                        {item.label}
                                    </Typography>
                                </div>
                            </Grid2>
                        ))
                    }
                </Grid2>
            </Box>
        </>
    )
}

export default IndustriesComp;