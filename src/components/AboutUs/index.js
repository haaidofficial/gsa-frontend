import { Grid2, Typography } from "@mui/material";
import styles from './AboutUs.module.css';
import ProductList from "../ProductList";
import HeaderBanner from "../Banner/HeaderBanner";
import BrochureButton from "../Brochure";

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
                    <h1 className={styles.headingContainer}>
                        <span className={styles.companyName}>S R GAS AGENCY</span>
                    </h1>
                    <h3 className={styles.hd2Container}>Delivering Excellence Since 1985</h3>
                    <Typography
                        variant="body1"
                        sx={{
                            // color: "#333",
                            lineHeight: 1.6,
                            marginBottom: "1rem",
                        }}
                        className={styles.desc}
                    >
                        Established in 1985, <b>S R GAS AGENCY</b> has been at the forefront of the gas manufacturing and
                        supply industry, renowned for its commitment to quality, reliability, and safety. As an <b>ISO
                            9001:2015 certified company</b>, we specialize in delivering a comprehensive range of
                        industrial, process, and specialty gases to meet diverse industry needs.
                    </Typography>


                    <h3 className={styles.hd2Container}>Why Choose Us?</h3>
                    <Typography
                        variant="body1"
                        sx={{
                            // color: "#333",
                            lineHeight: 1.6,
                            marginBottom: "1rem",
                        }}
                        className={styles.desc}
                    >
                        With over <b>four decades of expertise</b>, we have built a solid reputation for:
                        <b>High-quality products</b> tailored to customer requirements.
                        <b>Timely delivery</b> to ensure uninterrupted operations.
                        <b>Uncompromising safety standards</b>, making us a trusted partner across industries.
                    </Typography>
                    {/* 
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
                    </Typography> */}

                    <h4 className={styles.offeringsHd}>Our Core Offerings</h4>

                    <Typography
                        variant="body1"
                        sx={{
                            // color: "#333",
                            lineHeight: 1.6,
                            marginBottom: "2rem",
                            fontWeight: 500
                        }}
                        className={styles.desc}
                    >
                        We provide a versatile range of gases, including:
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
                            // color: "#333",
                            lineHeight: 1.6,
                            marginBottom: "2rem",
                        }}
                        className={styles.desc}
                    >
                        Our products are available in cylinders of various capacities, designed to cater to a
                        broad spectrum of industrial and specialized applications, ensuring flexibility and
                        reliability.
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            // color: "#333",
                            lineHeight: 1.6,
                            marginBottom: "2rem",
                        }}
                        className={styles.desc}
                    >
                        At S R GAS AGENCY, quality and safety are our top priorities. Every product undergoes rigorous quality checks to meet the highest industry standards, ensuring reliable and safe usage for our customers.
                    </Typography>

                    <h4 className={styles.commonHd}>Our Mission</h4>
                    <Typography
                        variant="body1"
                        sx={{
                            lineHeight: 1.6,
                            marginBottom: "0.5rem",
                        }}
                        className={styles.desc}
                    >
                        At S R GAS AGENCY, our mission is to provide high-quality industrial, process, and specialty
                        gases that empower industries and businesses to achieve operational excellence.
                    </Typography>

                    <ul className={styles.missionStatement}>
                        <li>We aim to meet and exceed customer expectations by providing reliable, innovative, and tailored gas solutions.</li>
                        <li>Our focus is on ensuring the safety and satisfaction of our clients while adhering to the highest industry standards.</li>
                        <li>By emphasizing timely delivery and operational efficiency, we strive to empower industries and businesses across sectors.</li>
                        <li>Sustainability and responsibility guide our practices, as we work to create a better future for our customers and the environment.</li>
                        <li>For over four decades, we have been a trusted name, committed to quality and reliability in every cylinder we deliver.</li>
                    </ul>


                    <h4 className={styles.commonHd}>Our Vision</h4>
                    <Typography
                        variant="body1"
                        sx={{
                            lineHeight: 1.6,
                            marginBottom: "0.5rem",
                        }}
                        className={styles.desc}
                    >
                        To be at the forefront of the gas industry, delivering exceptional value to our customers
                        while promoting sustainability and innovation.
                    </Typography>
                    <h5 className={styles.smallHd}>We envision:</h5>
                    <ul className={styles.visionStatement}>
                        <li>Delivering cutting-edge solutions that empower industries and enhance operational efficiency.</li>
                        <li>Setting benchmarks in safety and reliability, making us the preferred choice for customers worldwide.</li>
                        <li>Driving environmental responsibility by adopting sustainable practices and technologies.</li>
                        <li>Building long-term relationships based on trust, transparency, and excellence.</li>
                        <li>At S R GAS AGENCY, we aim to shape the future of the industry by consistently exceeding expectations and contributing to global progress.</li>
                    </ul>

                    <BrochureButton />
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