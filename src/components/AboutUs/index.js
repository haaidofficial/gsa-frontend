import { Grid2, Typography } from "@mui/material";
import styles from './AboutUs.module.css';
import ProductList from "../ProductList";
import HeaderBanner from "../Banner/HeaderBanner";

const AboutUsComp = () => {

    const banners = [
        {
            image: "/assets/slider_about.jpg",
        },
        {
            image: "/assets/slider_about.jpg",
        },
        {
            image: "/assets/slider_about.jpg",
        },
    ];


    const offerings = [
        "Oxygen (O₂)",
        "Nitrogen (N₂)",
        "Argon (Ar)",
        "Helium (He)",
        "Hydrogen (H₂)",
        "Carbon Dioxide (CO₂)",
    ];


    return (
        <>
            <HeaderBanner banners={banners} />
            <Grid2
                container
                spacing={2}
                sx={{
                    padding: "40px 16px 0 16px",
                    margin: "0 auto", // Center align
                    maxWidth: "1200px", // Optional: Set a max width for better layout control
                }}
                className={styles.aboutUsMain}
            >
                {/* Left Section - Welcome Text */}
                <Grid2 item size={{ xs: 12, sm: 12, md: 8 }}>
                    <Typography
                        variant="h4"
                    >
                        <div className={styles.headingContainer}>
                            <span className={styles.companyName}>S R GAS AGENCY</span>
                        </div>
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: "#333",
                            lineHeight: 1.6,
                            marginBottom: "1rem",
                        }}
                        className={styles.desc}
                    >
                        Established in 1985, S R GAS AGENCY is a leading name in the industry, recognized for its excellence and reliability. As an <b>ISO 9001:2015 certified</b> company, we specialize in manufacturing and supplying a diverse range of industrial, process, and specialty gases.
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: "#333",
                            lineHeight: 1.6,
                            marginBottom: "1rem",
                        }}
                        className={styles.desc}
                    >
                        With four decades of experience, we have built a strong reputation for delivering high-quality gases, tailored to meet the specific requirements of our customers, with a focus on timely delivery and adherence to the highest safety standards.
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: "#333",
                            lineHeight: 1.6,
                            marginBottom: "2rem",
                        }}
                        className={styles.desc}
                    >
                        We provide gases of good quality with highest international safety standards. The company also follows Good Manufacturing Practices.
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: "#333",
                            lineHeight: 1.6,
                            marginBottom: "2rem",
                            fontWeight: 600
                        }}
                        className={styles.desc}
                    >
                        Our Core Offerings
                        We provide a comprehensive range of gases, including:
                    </Typography>

                    {/* our offerings 1st design start */}
                    <Grid2 container className={styles.offerings}>
                        <Grid2 item size={{ xs: 12, sm: 12, md: 6 }}>
                            <ol className={styles.olcards}>
                                <li style={{ "--cardColor": "#fc374e" }}>
                                    <div className={styles.content}>
                                        <div className={styles.title}>Oxygen (O₂)</div>
                                    </div>
                                </li>
                                <li style={{ "--cardColor": "#36aeb3" }}>
                                    <div className={styles.content}>
                                        <div className={styles.title}>Nitrogen (N₂)</div>
                                    </div>
                                </li>
                                <li style={{ "--cardColor": "#162d59" }}>
                                    <div className={styles.content}>
                                        <div className={styles.title}>Argon (Ar)</div>
                                    </div>
                                </li>
                            </ol>
                        </Grid2>
                        <Grid2 item size={{ xs: 12, sm: 12, md: 6 }}>
                            <ol className={styles.olcards} style={{ counterReset: "cardCount 3" }} >
                                <li style={{ "--cardColor": "#AEB7B3" }}>
                                    <div className={styles.content}>
                                        <div className={styles.title}>Helium (He)</div>
                                    </div>
                                </li>
                                <li style={{ "--cardColor": "#EFCB68" }}>
                                    <div className={styles.content}>
                                        <div className={styles.title}>Hydrogen (H₂)</div>
                                    </div>
                                </li>
                                <li style={{ "--cardColor": "#f15f0e" }}>
                                    <div className={styles.content}>
                                        <div className={styles.title}>Carbon Dioxide (CO₂)</div>
                                    </div>
                                </li>
                            </ol>
                        </Grid2>
                    </Grid2>
                    {/* our offerings 1st design end */}

                    {/* our offerings 2nd design start */}
                    {/* <div className={styles.offerings}>
                        <ol className={styles.elegantList}>
                            {offerings.map((item, index) => (
                                <li key={index} className={styles.offeringsListItem}>
                                    {item}
                                </li>
                            ))}
                        </ol>
                    </div> */}
                    {/* our offerings 2nd design end */}
                    <Typography
                        variant="body1"
                        sx={{
                            color: "#333",
                            lineHeight: 1.6,
                            marginBottom: "2rem",
                        }}
                        className={styles.desc}
                    >
                        Our gases are available in cylinders of various capacities, catering to diverse industrial applications and ensuring flexibility for our clients.
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: "#333",
                            lineHeight: 1.6,
                            marginBottom: "2rem",
                        }}
                        className={styles.desc}
                    >
                        At S R GAS AGENCY, quality and safety are our top priorities. Every product undergoes rigorous quality checks to meet the highest industry standards, ensuring reliable and safe usage for our customers.
                    </Typography>

                </Grid2>

                {/* Right Section - Products */}
                <Grid2 item size={{ xs: 12, sm: 12, md: 4 }}>
                    <ProductList />
                </Grid2>
            </Grid2>
        </>
    )
}

export default AboutUsComp;