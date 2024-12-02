import { Box, IconButton, Typography } from "@mui/material";
import Slider from "react-slick";
import styles from './ClientSlides.module.css';
import Image from "next/image";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const CustomPrevArrow = ({ onClick }) => (
    <IconButton
        onClick={onClick}
        className={`${styles.slickNavIcon} ${styles.slickNavBtnPrev}`}
    >
        <ArrowBackIosIcon className={styles.slickNavIconPrev} />
    </IconButton>
);

const CustomNextArrow = ({ onClick }) => (
    <IconButton
        onClick={onClick}
        className={`${styles.slickNavIcon} ${styles.slickNavBtnNext}`}
    >
        <ArrowForwardIosIcon />
    </IconButton>
);


const ClientsSlides = () => {
    const slides = [
        { label: 'J J Hospital', path: '/assets/clients/jj-hospital.jpg' },
        { label: 'Reliance Industries Ltd.', path: '/assets/clients/reliance.jpg' },
        { label: 'Pidilite', path: '/assets/clients/pidilite.jpg' },
        { label: 'Neo Wheels', path: '/assets/clients/neowheels.jpg' },
        { label: 'Indian Petrochemicals Corporation Limited', path: '/assets/clients/ipcl.jpg' },
        { label: 'Municipal Corporation of Greater Mumbai', path: '/assets/clients/bmc-logo.jpg' },
        { label: 'Grauer & Weil (India) Limited', path: '/assets/clients/grauer-weil.jpg' },
        { label: 'Bombay Hospital & Medical Research Centre', path: '/assets/clients/bombay-hospital-logo.jpg' },
        { label: 'ESIC Hospital', path: '/assets/clients/esci-hos-logo.jpg' },
        { label: 'Navi Mumbai Municipal Corporation', path: '/assets/clients/nmmc-logo.jpg' },
        { label: 'MGM HOSPITAL', path: '/assets/clients/mgm-hospital.jpg' },
    ];

    // const settings = {
    //     dots: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 6,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 3000,
    //     prevArrow: <CustomPrevArrow />,
    //     nextArrow: <CustomNextArrow />,
    //     responsive: [
    //         {
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 4,
    //             },
    //         },
    //         {
    //             breakpoint: 768,
    //             settings: {
    //                 slidesToShow: 2,
    //             },
    //         },
    //         {
    //             breakpoint: 480,
    //             settings: {
    //                 slidesToShow: 1,
    //             },
    //         },
    //     ],
    // };
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6, // Default for large screens
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 1024, // Screen width 1024px and below
                settings: {
                    slidesToShow: 4, // Show 4 slides
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3, // Show 2 slides at 768px
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2, // Show 1 slide at 480px
                },
            },
            {
                breakpoint: 340,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };



    return (
        <>
            <Box className={styles.ourClientsSection}>
                <Typography className={styles.customerSectionHd} variant="h4" sx={{ textAlign: 'center' }}>
                    Valuable Customers
                </Typography>
                <div className={styles.ourClientsSlider}>
                    <Slider {...settings}>
                        {slides.map((slide, index) => (
                            <Box
                                key={index}
                                sx={{
                                    position: "relative",
                                    height: "150px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <div className={styles.imageHolder}>
                                    <Image
                                        className={styles.slideImg}
                                        src={slide.path}
                                        alt="banner slider"
                                        layout="fill"
                                        objectFit="contain" // Options: "cover", "contain", "fill", etc.
                                    />
                                </div>
                                <div className={styles.bannerHeading}>
                                    <Typography
                                        className={styles.slideHeadingTxt}
                                    >
                                        {slide.label}
                                    </Typography>
                                </div>
                            </Box>
                        ))}
                    </Slider>
                </div>
            </Box>
        </>
    )
}

export default ClientsSlides;