import { Box, Button, Grid2, Typography } from "@mui/material";
import HomeBanner from "../Banner/HomeBanner";
import styles from './HomePage.module.css';
import Link from "next/link";
import ProductList from "../ProductList";
import ClientsSlides from "../ClientSlides";


const HomePage = () => {

    return (
        <>
            <HomeBanner />
            {/* Homepage description start */}
            <Box
                sx={{
                    backgroundColor: "#fff",
                    padding: { xs: "1rem", md: "2rem" },
                }}
            >
                <Grid2
                    container
                    spacing={2}
                    sx={{
                        padding: "0 16px", // Padding left and right
                        margin: "0 auto", // Center align
                        maxWidth: "1200px", // Optional: Set a max width for better layout control
                    }}
                >
                    {/* Left Section - Welcome Text */}
                    <Grid2 item size={{ xs: 12, sm: 12, md: 8 }}>

                        <h1 className={styles.headingContainer}>
                            <span className={styles.companyName}>S R GAS AGENCY</span>
                        </h1>

                        <Typography
                            variant="body1"
                            sx={{
                                color: "#333",
                                lineHeight: 1.6,
                                marginBottom: "1rem",
                            }}
                            className={styles.homepageDesc}
                        >
                            Established in 1985, S R GAS AGENCY is a leading name in the industry, recognized for its excellence and reliability. As an ISO 9001:2015 certified company, we specialize in manufacturing and supplying a diverse range of industrial, process, and specialty gases.
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "#333",
                                lineHeight: 1.6,
                                marginBottom: "1rem",
                            }}
                            className={styles.homepageDesc}
                        >
                            With four decades of experience, we have built a strong reputation for delivering high-quality gases, tailored to meet the specific requirements of our customers, with a focus on timely delivery and adherence to the highest safety standards.
                        </Typography>

                        <Link href="/about">
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#004aad",
                                    color: "#fff",
                                    padding: "0.5rem 1.5rem",
                                    textTransform: "none",
                                    "&:hover": {
                                        backgroundColor: "#003a89",
                                    },
                                }}
                            >
                                Read More
                            </Button>
                        </Link>

                    </Grid2>

                    {/* Right Section - Products */}
                    <Grid2 item size={{ xs: 12, sm: 12, md: 4 }}>
                        <ProductList />
                    </Grid2>
                </Grid2>
            </Box >
            {/* Homepage description end */}

            {/* USP start */}
            <Box className={styles.uspSection}>
                <Grid2 container
                    sx={{
                        padding: "0 16px", // Padding left and right
                        margin: "0 auto", // Center align
                        maxWidth: "1200px", // Optional: Set a max width for better layout control
                    }}
                    justifyContent="center">
                    {/* Quality */}
                    <Grid2
                        item
                        size={{ xs: 12, sm: 12, md: 4 }}
                        textAlign="center"
                        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                        className={styles.uspFeatureCard}
                    >
                        <Box
                            component="img"
                            src="assets/icons/ico_quality.png"
                            alt="Quality Icon"
                            sx={{ width: 80, height: 80, mb: 2 }}
                        />
                        <Typography variant="h6" className={styles.uspFeature}>
                            QUALITY MATERIALS
                        </Typography>
                        <Typography variant="body2" className={styles.uspFeatureDesc}>
                            Manufacturer and Supplier of high purity gases
                        </Typography>
                    </Grid2>

                    {/* Vast Supply */}
                    <Grid2
                        item
                        size={{ xs: 12, sm: 12, md: 4 }}
                        textAlign="center"
                        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                        className={styles.uspFeatureCard}
                    >
                        <Box
                            component="img"
                            src="assets/icons/ico_supply.png"
                            alt="Vast Supply Icon"
                            sx={{ width: 80, height: 80, mb: 2 }}
                        />
                        <Typography variant="h6" className={styles.uspFeature}>
                            VAST SUPPLY
                        </Typography>
                        <Typography variant="body2" className={styles.uspFeatureDesc}>
                            Vast supply to Indian as well as International customers
                        </Typography>
                    </Grid2>

                    {/* Customer Satisfaction */}
                    <Grid2
                        item
                        size={{ xs: 12, sm: 12, md: 4 }}
                        textAlign="center"
                        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                        className={styles.uspFeatureCard}
                    >
                        <Box
                            component="img"
                            src="assets/icons/ico_customer.png"
                            alt="Customer Satisfaction Icon"
                            sx={{ width: 80, height: 80, mb: 2 }}
                        />
                        <Typography variant="h6" className={styles.uspFeature}>
                            CUSTOMER SATISFACTION
                        </Typography>
                        <Typography variant="body2" className={styles.uspFeatureDesc}>
                            Timely delivery, guaranteed satisfaction & competitive prices
                        </Typography>
                    </Grid2>
                </Grid2>
            </Box>
            {/* USP end */}


            {/* Customers section start */}
            <Box className={styles.customerSection}>
                <Typography className={styles.customerSectionHd} variant="h4" sx={{ textAlign: 'center' }}>
                    Customers We Serve
                </Typography>
                <Grid2 container
                    sx={{
                        padding: "0 16px", // Padding left and right
                        margin: "0 auto", // Center align
                        maxWidth: "1200px", // Optional: Set a max width for better layout control
                    }}
                    spacing={4}
                    justifyContent="center">
                    {/* Quality */}

                    <Grid2
                        item
                        size={{ xs: 12, sm: 6, md: 3 }}
                        textAlign="center"
                        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                    >
                        <div className={styles.customerCard}>
                            <img
                                src="assets/hospitals.jpg"
                                alt="Quality Icon"
                            />
                            <Typography variant="h6" className={styles.customerCardHd}>
                                Hospitals
                            </Typography>
                        </div>
                    </Grid2>

                    {/* Vast Supply */}
                    <Grid2
                        item
                        size={{ xs: 12, sm: 6, md: 3 }}
                        textAlign="center"
                        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                    >
                        <div className={styles.customerCard}>
                            <Box
                                component="img"
                                src="assets/Glass-industry.jpg"
                                alt="Vast Supply Icon"
                            />
                            <Typography variant="h6" className={styles.customerCardHd}>
                                Glass Industries
                            </Typography>
                        </div>
                    </Grid2>

                    {/* Customer Satisfaction */}
                    <Grid2
                        item
                        size={{ xs: 12, sm: 6, md: 3 }}
                        textAlign="center"
                        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                    >
                        <div className={styles.customerCard}>
                            <Box
                                component="img"
                                src="assets/steel-industry.jpg"
                                alt="Customer Satisfaction Icon"
                            />
                            <Typography variant="h6" className={styles.customerCardHd}>
                                Steel Industries
                            </Typography>
                        </div>
                    </Grid2>
                    {/* Customer Satisfaction */}
                    <Grid2
                        item
                        size={{ xs: 12, sm: 6, md: 3 }}
                        textAlign="center"
                        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                    >
                        <div className={styles.customerCard}>
                            <Box
                                component="img"
                                src="assets/research-development.jpg"
                                alt="Customer Satisfaction Icon"

                            />
                            <Typography variant="h6" className={styles.customerCardHd}>
                                Research & Development
                            </Typography>
                        </div>
                    </Grid2>
                </Grid2>
                <Box sx={{ textAlign: 'center' }}>
                    <Link href="/industries">
                        <Button className={styles.viewMoreBtn}>VIEW MORE</Button>
                    </Link>
                </Box>
            </Box>
            {/* Customers section end */}


            {/* Awards section start */}
            <Box className={styles.awardsSection}>
                <Typography className={styles.customerSectionHd} variant="h4" sx={{ textAlign: 'center' }}>
                    Awards/Recognition
                </Typography>
                <Grid2 container
                    sx={{
                        padding: "0 16px", // Padding left and right
                        margin: "0 auto", // Center align
                        maxWidth: "1200px", // Optional: Set a max width for better layout control
                    }}
                    spacing={4}
                    justifyContent="center">


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
                <Box sx={{ textAlign: 'center' }}>
                    <Link href="/awards">
                        <Button className={styles.viewMoreBtn}>VIEW MORE</Button>
                    </Link>
                </Box>
            </Box>
            {/* Awards section end */}

            {/* Our Customers section start */}
            <Box
                sx={{
                    padding: "0 16px", // Padding left and right
                    margin: "0 auto", // Center align
                    maxWidth: "1200px", // Optional: Set a max width for better layout control
                }}
                className={styles.ourClientsSection}
                // spacing={4}
                justifyContent="center">
                <ClientsSlides />
            </Box>
            {/* Our Customers section end */}

        </>
    )
}

export default HomePage;