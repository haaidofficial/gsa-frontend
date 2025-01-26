import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import styles from './HeaderBanner.module.css';
import Image from "next/image";

// const banners = [
//     {
//         title: "Safe Transport",
//         image: "/assets/slides/IMG_1281.webp",
//     },
//     {
//         title: "Efficient Delivery",
//         image: "/assets/slides/IMG_1282.webp",
//     },
//     {
//         title: "Efficient Delivery",
//         image: "/assets/slides/IMG_1283.webp",
//     },
//     {
//         title: "Efficient Delivery",
//         image: "/assets/slides/IMG_1284.webp",
//     },
//     {
//         title: "Efficient Delivery",
//         image: "/assets/slides/IMG_1285.webp",
//     },
//     {
//         title: "Efficient Delivery",
//         image: "/assets/slides/IMG_1286.webp",
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
    {
        title: "Efficient Delivery",
        image: "/assets/slides/IMG_1356.webp",
    },
];
const HeaderBanner = () => {
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

    return (
        <>
            {/* Banner section start */}
            <Box sx={{ position: "relative", overflow: "hidden" }}>
                <Slider {...settings}>
                    {banners.map((banner, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: "relative",
                                height: "290px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}

                            className={styles.bannerImgWrapper}
                        >
                            <div className={styles.bannerImgHolder}>
                                <Image
                                    src={banner.image}
                                    alt="banner slider"
                                    layout="fill"
                                    objectFit="fill" // Options: "cover", "contain", "fill", etc.
                                />
                            </div>
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

export default HeaderBanner;
