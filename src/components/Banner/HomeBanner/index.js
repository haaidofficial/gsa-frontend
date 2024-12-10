import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import styles from './HomeBanner.module.css';
import Image from "next/image";

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
            image: "/assets/slides/IMG_1281.webp",
        },
        {
            title: "Efficient Delivery",
            image: "/assets/slides/IMG_1282.webp",
        },
        {
            title: "Efficient Delivery",
            image: "/assets/slides/IMG_1283.webp",
        },
        {
            title: "Efficient Delivery",
            image: "/assets/slides/IMG_1284.webp",
        },
        {
            title: "Efficient Delivery",
            image: "/assets/slides/IMG_1285.webp",
        },
        {
            title: "Efficient Delivery",
            image: "/assets/slides/IMG_1286.webp",
        },
    ];

    return (
        <>
            {/* Banner section start */}
            <Box sx={{ position: "relative", overflow: "hidden" }} className={styles.headerBannerSliderSection}>
                <Slider {...settings}>
                    {banners.map((banner, index) => (
                        <div key={index}>
                            <Image
                                src={banner.image}
                                alt="Banner"
                                width={1366}
                                height={489}
                                className={styles.slideImageContainer}
                            />
                        </div>
                    ))}
                </Slider>
            </Box>
            {/* Banner section end */}
        </>
    );
};

export default HomeBanner;
