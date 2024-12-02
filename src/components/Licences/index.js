import { Grid2 } from "@mui/material";
import HeaderBanner from "../Banner/HeaderBanner";
import ProductList from "../ProductList";
import CertificateViewer from "../CertificateViewer";
import styles from './Licences.module.css';

function LicencesComp() {

    const banners = [
        {
            image: "/assets/slider_licences.jpg",
        },
        {
            image: "/assets/slider_licences.jpg",
        },
        {
            image: "/assets/slider_licences.jpg",
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

export default LicencesComp;