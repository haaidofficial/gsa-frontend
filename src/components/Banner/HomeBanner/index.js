import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import styles from './HomeBanner.module.css';

const HomeBanner = () => {
    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    // Banner Data
    // const banners = [
    //     {
    //         title: "Safe Transport",
    //         image: "/assets/slider-1.jpg", // Replace with your image path
    //     },
    //     {
    //         title: "Efficient Delivery",
    //         image: "/assets/slider-1.jpg",
    //     },
    //     {
    //         title: "Efficient Delivery",
    //         image: "/assets/slider-1.jpg",
    //     },
    // ];

    const banners = [
        {
            title: "Safe Transport",
            image: "/assets/slides/header-banner-1-1.webp",
        },
        {
            title: "Efficient Delivery",
            image: "/assets/slides/header-banner-1-2.webp",
        },
        {
            title: "Efficient Delivery",
            image: "/assets/slides/IMG_0306.webp",
        },
        {
            title: "Efficient Delivery",
            image: "/assets/slides/IMG_0307.webp",
        },
        {
            title: "Efficient Delivery",
            image: "/assets/slides/IMG_0783.jpg",
        },
        {
            title: "Efficient Delivery",
            image: "/assets/slides/IMG_8820.jpg",
        },
    ];

    return (
        <>
            {/* Banner section start */}
            <Box sx={{ position: "relative", overflow: "hidden" }} className={styles.headerBannerSliderSection}>
                <Slider {...settings}>
                    {banners.map((banner, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: "relative",
                                height: "480px", // Adjust height as needed
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundImage: `url(${banner.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                            className={styles.slideImageContainer}
                        >
                            {/* <div className={styles.bannerHeading}>
                            <Typography
                                variant="h3"
                                className={styles.bannerHeadingTxt}
                            >
                                {banner.title}
                            </Typography>
                        </div> */}
                        </Box>
                    ))}
                </Slider>
            </Box>
            {/* Banner section end */}
        </>
    );
};

export default HomeBanner;
