import { Grid2 } from "@mui/material";
import HeaderBanner from "../Banner/HeaderBanner";
import CertificateViewer from "../CertificateViewer";
import ProductList from "../ProductList";
import styles from './AnnualReturn.module.css';

function AnnualReturnComp() {

    const banners = [
        {
            image: "/assets/slider_annual_return.jpg",
        },
        {
            image: "/assets/slider_annual_return.jpg",
        },
        {
            image: "/assets/slider_annual_return.jpg",
        },
    ];

    const pdfList = [
        {
            name: 'Annual Return for 2020-21',
            url: 'https://www.satramdas.in/ar/Annual-Return-for-2020-21.pdf',
        },
        {
            name: 'Annual Report 2021-22',
            url: 'https://www.satramdas.in/ar/Annual-Return-2021-22.pdf',
        },
        {
            name: 'Annual Report 2022-23',
            url: 'https://www.satramdas.in/ar/Annual-Return-2022-23.pdf',
        },
    ];


    return (
        <>
            <HeaderBanner banners={banners} />
            <div className={styles.mainSection}>
                <Grid2
                    container
                    spacing={2}
                    sx={{
                        padding: '0 16px', // Padding left and right
                        margin: '0 auto', // Center align
                        maxWidth: '1200px', // Optional: Set a max width for better layout control
                    }}
                >
                    <Grid2 item size={{ xs: 12, sm: 6, md: 8 }}>

                        <CertificateViewer list={pdfList} />

                    </Grid2>
                    <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
                        <ProductList />
                    </Grid2>
                </Grid2>
            </div>
        </>
    );
}

export default AnnualReturnComp;