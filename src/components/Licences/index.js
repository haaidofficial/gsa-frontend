import { Box, Grid2 } from "@mui/material";
import HeaderBanner from "../Banner/HeaderBanner";
import ProductList from "../ProductList";
import CertificateViewer from "../CertificateViewer";
import styles from './Licences.module.css';
import Image from "next/image";
import HomeBanner from "../Banner/HomeBanner";

function LicencesComp() {

    const banners = [
        {
            image: "/assets/slides/IMG_1281-old.webp",
        },
        {
            image: "/assets/slides/IMG_1281-old.webp",
        },
        {
            image: "/assets/slides/IMG_1281-old.webp",
        },
        {
            image: "/assets/slides/IMG_1281-old.webp",
        },
    ];

    const pdfList = [
        {
            name: 'Food and drug administration',
            url: 'https://www.satramdas.in/pdf/FDA-Lic.pdf',
        },
    ];




    return (
        <>
            <HeaderBanner banners={banners} />
            {/* <HomeBanner /> */}
            <div className={styles.mainSection}>
                {/* <Grid2
                    container
                    spacing={2}
                    sx={{
                        padding: '0 16px', // Padding left and right
                        margin: '0 auto', // Center align
                        maxWidth: '1200px', // Optional: Set a max width for better layout control
                    }}
                > */}
                {/* <Grid2 item size={{ xs: 12, sm: 12, md: 12 }}> */}

                {/* <CertificateViewer list={pdfList} /> */}
                <Grid2
                    container
                >
                    <Grid2 item size={{ xs: 12, sm: 12, md: 6 }}>
                        <div className={styles.gridView}>
                            {/* first frame */}
                            <div className={styles.gridViewFrame}>
                                <div className={styles.gridViewFrameItem}>
                                    <img
                                        src={'/assets/infra/IMG_1356-1.webp'}
                                        alt="Banner 4"
                                        // layout="fill"
                                        // objectFit="cover"
                                        // quality={100}
                                        className={styles.gridFrameImage}
                                    />
                                </div>
                                <div className={`${styles.gridViewFrameItem} ${styles.thinFrameItem}`}>
                                    <img
                                        src={'/assets/infra/IMG_1358-2.webp'}
                                        alt="Banner 4"
                                        // layout="fill"
                                        // objectFit="cover"
                                        // quality={100}
                                        className={`${styles.gridFrameImage} ${styles.imgSquare}`}
                                    />
                                </div>
                            </div>
                            {/* second frame */}
                            <div className={styles.gridViewFrame}>
                                <div className={`${styles.gridViewFrameItem} ${styles.floatingFrameItem}`}>
                                    <img
                                        src={'/assets/infra/IMG_0783-4.webp'}
                                        alt="Banner 4"
                                        // layout="fill"
                                        // objectFit="cover"
                                        // quality={100}
                                        // className={styles.gridFrameImage}
                                        className={`${styles.gridFrameImage} ${styles.imgSquare}`}
                                    />
                                </div>
                                <div className={`${styles.gridViewFrameItem} ${styles.floatingFrameItem}`}>
                                    <img
                                        src={'/assets/infra/IMG_1363-3.webp'}
                                        alt="Banner 4"
                                        // layout="fill"
                                        // objectFit="cover"
                                        // quality={100}
                                        className={styles.gridFrameImage}
                                    />
                                </div>
                            </div>
                        </div>

                    </Grid2>
                    <Grid2 item size={{ xs: 12, sm: 12, md: 6 }}>
                        <div className={styles.gridView}>

                            {/* third frame */}
                            <div className={styles.gridViewFrame}>
                                <div className={`${styles.gridViewFrameItem} ${styles.floatingFrameItem}`}>
                                    <img
                                        src={'/assets/infra/IMG_1355-5.webp'}
                                        alt="Banner 4"
                                        // layout="fill"
                                        // objectFit="cover"
                                        // quality={100}
                                        className={styles.gridFrameImage}
                                    />
                                </div>
                                <div className={`${styles.gridViewFrameItem} ${styles.floatingFrameItem}`}>
                                    <img
                                        src={'/assets/infra/IMG_1281-8.webp'}
                                        alt="Banner 4"
                                        // layout="fill"
                                        // objectFit="cover"
                                        // quality={100}
                                        className={`${styles.gridFrameImage} ${styles.imgSquare}`}
                                    />
                                </div>
                            </div>
                            {/* four frame */}
                            <div className={styles.gridViewFrame}>
                                <div className={`${styles.gridViewFrameItem} ${styles.floatingFrameItem}`}>
                                    <img
                                        src={'/assets/infra/IMG_1364-7.webp'}
                                        alt="Banner 4"
                                        // layout="fill"
                                        // objectFit="cover"
                                        // quality={100}
                                        className={`${styles.gridFrameImage} ${styles.imgSquare}`}
                                    />
                                </div>
                                <div className={`${styles.gridViewFrameItem} ${styles.floatingFrameItem}`}>
                                    <img
                                        src={'/assets/infra/IMG_0307-6.webp'}
                                        alt="Banner 4"
                                        // layout="fill"
                                        // objectFit="cover"
                                        // quality={100}
                                        className={styles.gridFrameImage}
                                    />
                                </div>
                            </div>
                        </div>

                    </Grid2>
                    {/* ---------------- third row ------------ */}

                    <Grid2 item size={{ xs: 12, sm: 12, md: 3 }}>
                        <div className={styles.gridView}>
                            {/* third frame */}
                            <div className={styles.gridViewFrame}>
                                <div className={styles.gridViewFrameItem}>
                                    <img
                                        src={'/assets/infra/IMG_8156.jpg'}
                                        alt="Banner 4"
                                        // layout="fill"
                                        // objectFit="cover"
                                        // quality={100}
                                        className={styles.gridFrameImage}
                                    />
                                </div>
                            </div>
                        </div>

                    </Grid2>
                    <Grid2 item size={{ xs: 12, sm: 12, md: 3 }}>
                        <div className={styles.gridView}>
                            {/* third frame */}
                            <div className={styles.gridViewFrame}>
                                <div className={styles.gridViewFrameItem}>
                                    <img
                                        src={'/assets/infra/IMG_8157.jpg'}
                                        alt="Banner 4"
                                        // layout="fill"
                                        // objectFit="cover"
                                        // quality={100}
                                        className={`${styles.gridFrameImage} ${styles.imgSquare}`}
                                    />
                                </div>
                            </div>
                        </div>

                    </Grid2>
                    <Grid2 item size={{ xs: 12, sm: 12, md: 3 }}>
                        <div className={styles.gridView}>
                            {/* third frame */}
                            <div className={styles.gridViewFrame}>
                                <div className={styles.gridViewFrameItem}>
                                    <img
                                        src={'/assets/infra/IMG_8158.jpg'}
                                        alt="Banner 4"
                                        // layout="fill"
                                        // objectFit="cover"
                                        // quality={100}
                                        className={styles.gridFrameImage}
                                    />
                                </div>
                            </div>
                        </div>

                    </Grid2>
                </Grid2>


                {/* </Grid2> */}
                {/* <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
                        <ProductList />
                    </Grid2> */}
                {/* </Grid2> */}
            </div>
        </>
    );
}

export default LicencesComp;