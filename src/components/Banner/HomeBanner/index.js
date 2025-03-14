import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import styles from './HomeBanner.module.css';
import Image from "next/image";
import { useCarousel } from "@/context/CarouselContext";

const HomeBanner = () => {

    const carouselObj = useCarousel();

    const banners = carouselObj?.carouselData;
    const loadMessage = carouselObj?.loadMessage;

    // Slider settings
    const settings = {
        dots: true,
        infinite: banners?.length > 1 ? true : false,
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
    //         image: "/assets/slides/IMG_1284.webp",
    //     },
    //     {
    //         title: "Efficient Delivery",
    //         image: "/assets/slides/IMG_1285.webp",
    //     },
    //     // {
    //     //     title: "Efficient Delivery",
    //     //     image: "/assets/slides/IMG_1286.webp",
    //     // },
    //     {
    //         title: "Efficient Delivery",
    //         image: "/assets/slides/IMG_1356.webp",
    //     },
    // ];





    return (
        <>
            {/* Banner section start */}
            <Box sx={{ position: "relative", overflow: "hidden" }} className={styles.headerBannerSliderSection}>

                {
                    (banners?.length === 0 && loadMessage === 'No Slides Found!') && <Box
                        sx={{
                            position: "relative",
                            // height: "290px",
                            height: "489px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}

                        className={styles.bannerImgWrapper}>
                        <Typography variant="h4" gutterBottom>
                            No Slides Found!
                        </Typography>
                    </Box>
                }

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
