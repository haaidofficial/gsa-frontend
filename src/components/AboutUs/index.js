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
                            <span className={styles.companyName}>Satramdas Gases Pvt. Ltd.</span>
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
                        Established in the year 1992, Satramdas Gases Pvt. Ltd. is an ISO 9001-2000 certified company. A leading manufacturer & supplier of industrial, process and speciality gases. With over the 2 decades, Satramdas Gases Pvt. Ltd. serves indian as well as international customers as per their requirements with timely delivery of gases.
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
                        Our principal range of gases include MEDICAL OXYGEN(MO2), NITROUS OXIDE(N2O) in cylinders & in tankers and industrial gases like NITROGEN(N2) & ARGON(Ar) of different grades in cylinders of different capacities..
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