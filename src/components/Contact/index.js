import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, TextField, Button, Grid2, CircularProgress } from '@mui/material';
import FactoryIcon from '@mui/icons-material/Factory';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PhoneIcon from '@mui/icons-material/Phone';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import styles from './Contact.module.css';
import { BASE_URL, Endpoints, APP_URL } from '@/constants/apiEndpoints';
import axios from 'axios';
import CommonAlert from '../Alerts';
import { useRouter } from 'next/router';

const ContactUsComp = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNo: '',
        message: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const [errors, setErrors] = useState({});

    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });


    const enqProduct = useRef(null);

    useEffect(() => {
        // Retrieve state from localStorage
        productEnquiry();
    }, []);


    const productEnquiry = () => {
        const storedState = localStorage.getItem('enq_product');
        if (storedState) {
            enqProduct.current = JSON.parse(storedState);
        }
    }

    const removeEnquiry = () => {
        const storedState = localStorage.getItem('enq_product');
        if (storedState) {
            localStorage.removeItem('enq_product');
        }
        enqProduct.current = null;
    }

    const showAlert = (severity, message) => {
        setSnackbar({ open: true, severity, message });
    };

    const handleAlertClose = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };


    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateMessage = (message) => {
        if (!message.trim()) {
            return "Message is required.";
        }

        // Restrict message length
        if (message.length > 500) {
            return "Message must not exceed 500 characters.";
        }

        // Regex to detect HTML tags
        const htmlTagRegex = /<[^>]*>/g;
        if (htmlTagRegex.test(message)) {
            return "HTML tags are not allowed in the message.";
        }

        // Regex for allowed characters
        const safeCharactersRegex = /^[\w\s.,!?'-]+$/;
        if (!safeCharactersRegex.test(message)) {
            return "Message contains invalid characters.";
        }

        return null; // No errors
    };

    const validateForm = () => {

        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required.';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format.';
        }

        if (!formData.contactNo.trim()) {
            newErrors.contactNo = 'Contact number is required.';
        } else if (!/^\d{10}$/.test(formData.contactNo)) {
            newErrors.contactNo = 'Invalid contact number';
        }

        const messageError = validateMessage(formData.message);
        if (messageError) {
            newErrors.message = messageError;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {

            const referrerUrl = router.query?.referrer;
            const payload = JSON.parse(JSON.stringify(formData));
            if (referrerUrl === 'enq') {
                payload.referrer = `${APP_URL}products/${enqProduct.current?.pageUrl}`;

                createProductEnquiry(payload);
            }
            else {
                payload.referrer = `${APP_URL}contact`;
                createNormalEnquiry(payload);
                // createProductEnquiry(payload);
                // removeEnquiry();
            }

            try {
                setIsLoading(true);
                const response = await axios.post(`${BASE_URL}${Endpoints.ContactForm}`, payload, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    if (response.data?.message === "Your message has been sent successfully!") {
                        clearForm();
                    }

                    showAlert('success', 'Your message has been sent!');
                } else {
                    showAlert('error', 'There was an error sending your message.');
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
                showAlert('error', 'There was an error sending your message.');
                setIsLoading(false);
            }

        } else {
            console.log('Form validation failed.');
        }
    };

    function clearForm() {
        setFormData({
            name: '',
            email: '',
            contactNo: '',
            message: '',
        });
    }

    async function createProductEnquiry(formData) {
        if (enqProduct.current) {
            const productId = enqProduct.current?._id;

            if (productId) {
                const payload = {
                    ...formData,
                    productId
                }

                try {
                    const res = await axios.post(`${BASE_URL}${Endpoints.CreateEnquiry}`, payload, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (res.data) {
                        if (res.data?.message === "Enquiry submitted successfully") {
                            // removeEnquiry();
                        }
                    }

                } catch (error) {
                    console.error('Create Enquiry Error:', error);
                }
            }
        }

    }


    async function createNormalEnquiry(payload) {
        if (payload) {

            try {
                const res = await axios.post(`${BASE_URL}${Endpoints.CreateNormalEnquiry}`, payload, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (res.data) {
                    if (res.data?.message === "Enquiry submitted successfully") {
                        // removeEnquiry();
                    }
                }

            } catch (error) {
                console.error('Create Enquiry Error:', error);
            }
        }

    }

    return (
        <>
            <div className={styles.contactUsSection}>
                <Grid2
                    container
                    spacing={2}
                    sx={{
                        margin: '0 auto',
                        maxWidth: '1200px',
                    }}
                >
                    {/* Left Section */}
                    <Grid2 item size={{ xs: 12, sm: 6, md: 6 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className={styles.formLeft}>

                            <Box sx={{ borderBottom: '1px solid #ccc', paddingBottom: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <ApartmentIcon className={styles.contactInfoIcon} color="primary" />
                                    <Typography className={styles.infoHead} variant="h6">
                                        Office
                                    </Typography>
                                </Box>
                                <Typography className={styles.infoTxt} sx={{ marginTop: 1, color: '#666' }}>
                                    S. NO. 17, PIMPRIPADA, NR RAVI AUTO ENGINEERING M P ROAD, THANE, MAHARASHTRA - 400612, INDIA.
                                </Typography>
                            </Box>
                            <Box sx={{ borderBottom: '1px solid #ccc', paddingBottom: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <FactoryIcon className={styles.contactInfoIcon} color="primary" />
                                    <Typography className={styles.infoHead} variant="h6">
                                        FACTORY
                                    </Typography>
                                </Box>
                                <Typography className={styles.infoTxt} sx={{ marginTop: 1, color: '#666' }}>
                                    SURVEY NO 140/1/2 NEAR POWER HOUSE. VILLAGE GOTEGHAR UTTARSHIV DISTRICT THANE 400612
                                </Typography>
                            </Box>

                            <Box sx={{ borderBottom: '1px solid #ccc', paddingBottom: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <PhoneIcon className={styles.contactInfoIcon} color="primary" />
                                    <Typography className={styles.infoHead} variant="h6">
                                        CALL US
                                    </Typography>
                                </Box>
                                <Typography sx={{ marginTop: 1, color: '#666' }} className={styles.infoTxt}>
                                    <a href="tel:+918850849983" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        8850849983
                                    </a>{' '}
                                    {/* /{' '}
                                    <a href="tel:+912248262440" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        +91-22-48262440
                                    </a>{' '}
                                    /{' '}
                                    <a href="tel:+912248262441" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        +91-22-48262441
                                    </a> */}
                                </Typography>
                            </Box>

                            {/* <Box sx={{ borderBottom: '1px solid #ccc', paddingBottom: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <SmartphoneIcon className={styles.contactInfoIcon} color="primary" />
                                    <Typography className={styles.infoHead} variant="h6">
                                        MOBILE
                                    </Typography>
                                </Box>
                                <Typography sx={{ marginTop: 1, color: '#666' }} className={styles.infoTxt}>
                                    <a href="tel:+919869261022" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        +91-98692 61022
                                    </a>{' '}
                                    /{' '}
                                    <a href="tel:+919869261023" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        +91-98692 61023
                                    </a>{' '}
                                    /{' '}
                                    <a href="tel:+919768021021" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        +91-97680 21021
                                    </a>
                                </Typography>
                            </Box> */}

                            <Box sx={{ borderBottom: '1px solid #ccc', paddingBottom: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <EmailIcon className={styles.contactInfoIcon} color="primary" />
                                    <Typography className={styles.infoHead} variant="h6">
                                        EMAIL
                                    </Typography>
                                </Box>
                                <Typography sx={{ marginTop: 1, color: '#666' }}>
                                    <a href="mailto:srgasagency500@gmail.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        srgasagency500@gmail.com
                                    </a>
                                    ,{' '}
                                    <a href="mailto:sale.srgasagency@gmail.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        sale.srgasagency@gmail.com
                                    </a>
                                </Typography>
                            </Box>

                            {/* <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <LanguageIcon className={styles.contactInfoIcon} color="primary" />
                                    <Typography className={styles.infoHead} variant="h6">
                                        WEBSITE
                                    </Typography>
                                </Box>
                                <Typography sx={{ marginTop: 1, color: '#666' }}>
                                    <a href="" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>

                                    </a>
                                </Typography>
                            </Box> */}
                        </Box>
                    </Grid2>

                    {/* Right Section */}
                    <Grid2 item size={{ xs: 12, sm: 6, md: 6 }}>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                backgroundColor: 'white',
                                padding: '20px',
                                borderRadius: '8px',
                                backgroundColor: 'transparent'
                            }}
                        >
                            <TextField
                                label="Name"
                                name="name"
                                variant="outlined"
                                fullWidth
                                value={formData.name}
                                onChange={handleInputChange}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                            <TextField
                                label="Contact No."
                                name="contactNo"
                                variant="outlined"
                                fullWidth
                                value={formData.contactNo}
                                onChange={handleInputChange}
                                error={!!errors.contactNo}
                                helperText={errors.contactNo}
                                inputProps={{ maxLength: 10 }}
                            />
                            <TextField
                                label="Email"
                                name="email"
                                variant="outlined"
                                fullWidth
                                value={formData.email}
                                onChange={handleInputChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                            <TextField
                                label="Message"
                                name="message"
                                variant="outlined"
                                multiline
                                rows={4}
                                fullWidth
                                value={formData.message}
                                onChange={handleInputChange}
                                error={!!errors.message}
                                helperText={errors.message}
                                sx={{
                                    '& .MuiInputBase-root': {
                                        alignItems: 'flex-start',
                                    },
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isLoading === true}
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    backgroundColor: '#00b3b3',
                                    padding: '8px 0',
                                    fontSize: '16px',
                                    '&:hover': { backgroundColor: '#008a8a' },
                                }}
                            >
                                Submit

                                {
                                    isLoading && <span style={{ display: 'inline-block', marginLeft: '15px', marginTop: '8px' }}>
                                        <CircularProgress size="25px" />
                                    </span>
                                }

                            </Button>
                        </Box>
                    </Grid2>

                    <Grid2 item size={{ xs: 12, sm: 12, md: 12 }}>
                        <div className={styles.map}>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7536.6890528532895!2d72.85957714863488!3d19.18014874300788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b70bd59b1689%3A0x69a5d04f26f19d5c!2sMalad%2C%20Pimpripada%2C%20Malad%20East%2C%20Mumbai%2C%20Maharashtra%20400097!5e0!3m2!1sen!2sin!4v1736280014863!5m2!1sen!2sin" width="100%" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
                        </div>
                    </Grid2>
                </Grid2>
            </div>
            <CommonAlert
                open={snackbar.open}
                severity={snackbar.severity}
                message={snackbar.message}
                onClose={handleAlertClose}
            />
        </>
    );
};

export default ContactUsComp;
