import React, { useEffect, useRef, useState } from "react";
import { TextField, Button, Box, Typography, IconButton, Grid2, Card, CardMedia, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import TextEditor from "@/components/TextEditor";
import axios from "axios";
import { BASE_URL, Endpoints } from "@/constants/apiEndpoints";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDrawer } from "@/context/AdminHeaderContext";
import styles from './ManageSlides.module.css';
import CommonAlert from "@/components/Alerts";
import { useAuth } from "@/context/AuthContext";

const productImagePath = `${BASE_URL}`;

const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

const ManageSlidesComp = () => {
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({
        images: "",
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });

    const [carouselData, setCarouselData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadMessage, setLoadMessage] = useState('');

    const carouselId = useRef('');

    const showAlert = (severity, message) => {
        setSnackbar({ open: true, severity, message });
    };

    const handleAlertClose = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const router = useRouter();
    const { open } = useDrawer();
    const { token } = useAuth();
    useEffect(() => {
        fetchCarousels();
    }, []);

    useEffect(() => {
        if (images.length > 4) {
            setErrors((prev) => ({ ...prev, images: "Maximum upload limit reached. You can upload up to 4 images only." }));
        }
        else {
            setErrors((prev) => ({ ...prev, images: "" }));
        }
    }, [images.length]);

    const fetchCarousels = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}${Endpoints.GetCarousels}`);

            if (response.status === 200) {
                if (response.data?.success && response.data?.slides) {
                    if (response.data?.slides?.length > 0) {
                        setCarouselData(response.data?.slides);
                    }
                    else {
                        setLoadMessage('No Slides Found!')
                    }
                    carouselId.current = response.data?.id;
                }
                else {
                    setLoadMessage('No Slides Found!')
                }
            }
            else {
                setLoadMessage('No Slides Found!')
            }

        } catch (error) {
            console.error("Error fetching carousel data:", error.response?.data || error.message);
            setLoadMessage('No Slides Found!')
        }
        finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const validImages = files.filter((file) => file.type.startsWith("image/") && validImageTypes.includes(file.type) && file.size <= 5 * 1024 * 1024); // Limit size to 5MB

        if (validImages.length < files.length) {
            setErrors((prev) => ({ ...prev, images: "Only jpg, jpeg, png, webp files are allowed or file exceed 5MB." }));
        } else {
            setErrors((prev) => ({ ...prev, images: "" }));
        }

        setImages(validImages.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))); // Add preview URL
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formErrors = { images: "" };
        let isValid = true;
        if (images.length === 0) {
            formErrors.images = "At least one image is required";
            isValid = false;
        }

        if (images.length > 4) {
            formErrors.images = "Maximum upload limit reached. You can upload up to 4 images only.";
            isValid = false;
        }

        setErrors(formErrors);

        if (!isValid) {
            return;
        }

        setLoading(true);

        const formData = new FormData();
        images.forEach((image, index) => {
            formData.append(`images`, image); // No need for unique keys, backend will handle it as an array
        });

        try {
            const response = await axios.post(
                `${BASE_URL}${Endpoints.AddCarousel}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                if (response?.data?.message === "Carousel updated successfully") {
                    if (response?.data?.carousel?.images) {
                        setCarouselData(response?.data?.carousel?.images);
                    }
                    setImages([]);
                    showAlert('success', 'Product Added Successfully!')
                }
            }
        } catch (error) {
            console.error("Error adding product:", error.response?.data || error.message);
        }
        finally {
            setLoading(false);
        }
    };

    const handleDelete = async (imagePath) => {
        try {
            setLoading(true);
            const id = carouselId.current;
            const response = await axios.delete(`${BASE_URL}${Endpoints.DeleteCarousel}${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                data: { removedImages: [imagePath] }, // Send image path in request body
            });

            if (response.status === 200) {
                setCarouselData((prev) => prev.filter((image) => image !== imagePath));
                setSnackbar({ open: true, severity: "success", message: "Image deleted successfully!" });
            }
        } catch (error) {
            console.error("Error deleting image:", error.response?.data || error.message);
            setSnackbar({ open: true, severity: "error", message: "Failed to delete image." });
        }
        finally {
            setLoading(false);
        }
    };

    let isImageUploadBtnDisabled = false;
    let isSaveBtnDisabled = false;
    if (images.length > 10) {
        isImageUploadBtnDisabled = true
    }

    if (images.length < 1) {
        isSaveBtnDisabled = true;
    }

    return (
        <>
            <Box sx={{
                width: "100%", maxWidth: '1200px', margin: "auto", padding: 3,
                "@media (max-width: 1024px)": {
                    maxWidth: '900px'
                },
                "@media (max-width: 992px)": {
                    maxWidth: '850px'
                },
                "@media (max-width: 768px)": {
                    maxWidth: '650px'
                },
                "@media (max-width: 480px)": {
                    maxWidth: '410px',
                    marginLeft: '50px'
                },
                "@media (max-width: 376px)": {
                    maxWidth: '380px'
                },
            }} className={`${open ? styles.addProductLeftSpace : ''}`}>
                <Typography variant="h4" gutterBottom>
                    Manage Slides
                </Typography>

                {/* Carousel Display */}
                <Box sx={{ marginTop: 4, minHeight: '300px', maxHeight: '700px', overflowY: 'scroll' }}>
                    {
                        loading ? (
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                                <CircularProgress />
                            </Box>
                        ) :
                            (<Grid2
                                container
                                spacing={2}
                            >
                                {carouselData.map((carousel, index) => (
                                    <Grid2 item key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                                        <Card sx={{ position: "relative" }}>
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={`${BASE_URL}${carousel}`}
                                                alt={`Carousel ${index + 1}`}
                                            />
                                            <IconButton
                                                sx={{
                                                    position: "absolute",
                                                    top: 5,
                                                    right: 5,
                                                    background: "rgba(255, 255, 255, 0.7)",
                                                }}
                                                onClick={() => handleDelete(carousel)}
                                                disabled={loading}
                                            >
                                                {loading ? <CircularProgress size={24} /> : <DeleteIcon color="error" />}
                                            </IconButton>
                                        </Card>
                                    </Grid2>
                                ))}
                            </Grid2>)
                    }
                    {loadMessage && <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                        {loadMessage}
                    </Box>}

                </Box>

                <form onSubmit={handleSubmit} encType="multipart/form-data">


                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="body1" gutterBottom>
                            Upload Images
                        </Typography>
                        <Button
                            variant="contained"
                            component="label"
                            color="primary"
                            sx={{ textTransform: "none" }}
                            disabled={isImageUploadBtnDisabled}
                        >
                            Upload Images
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                hidden
                                multiple // Allows multiple files to be selected
                            />
                        </Button>
                        {images.length > 0 && (
                            <Typography
                                variant="body2"
                                sx={{ marginTop: 1, color: "text.secondary" }}
                            >
                                Selected files: {images.map((img) => img.name).join(", ")}
                            </Typography>
                        )}
                        {errors.images && (
                            <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
                                {errors.images}
                            </Typography>
                        )}
                    </Box>
                    {/*  */}

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 2 }}>
                        {images.map((img, index) => (
                            <Box key={index} sx={{ width: 100, height: 100, position: "relative" }}>
                                <img
                                    src={img.preview}
                                    alt={`Preview ${index + 1}`}
                                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }}
                                />
                                <IconButton
                                    sx={{ position: "absolute", top: 0, right: 0 }}
                                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                                >
                                    <ClearIcon />
                                </IconButton>
                            </Box>
                        ))}
                    </Box>
                    {/*  */}

                    <Box sx={{ width: "100%", textAlign: 'center' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            fullWidth
                            sx={{ marginTop: 3, maxWidth: '600px', padding: '10px 0' }}
                            disabled={isSaveBtnDisabled}
                        >
                            Save Slides
                        </Button>
                    </Box>
                </form>
            </Box>

            <CommonAlert
                open={snackbar.open}
                severity={snackbar.severity}
                message={snackbar.message}
                onClose={handleAlertClose}
            />
        </>
    );
};

export default ManageSlidesComp;
