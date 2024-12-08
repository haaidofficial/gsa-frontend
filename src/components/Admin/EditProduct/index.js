import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TextField, Button, Box, Typography, IconButton, Grid2, Modal } from "@mui/material";
import TextEditor from "@/components/TextEditor"; // Assuming you have a reusable TextEditor component
import axios from "axios";
import { BASE_URL, Endpoints } from "@/constants/apiEndpoints";
import ClearIcon from "@mui/icons-material/Clear";
import styles from './EditProduct.module.css';
import CommonAlert from "@/components/Alerts";
import { useDrawer } from "@/context/AdminHeaderContext";
import { useAuth } from "@/context/AuthContext";

const productImagePath = `${BASE_URL}`;

const EditProduct = () => {
    const [product, setProduct] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]); // Contains both new and existing images
    const [removedImages, setRemovedImages] = useState([]); // To track deleted existing images
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        images: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openModal, setOpenModal] = useState(false); // State to control modal visibility
    const [modalImage, setModalImage] = useState('');

    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });

    const showAlert = (severity, message) => {
        setSnackbar({ open: true, severity, message });
    };

    const handleAlertClose = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const { open } = useDrawer();
    const { token } = useAuth();
    const router = useRouter();
    const { productId } = router.query;

    // Fetch product details by ID
    useEffect(() => {
        if (productId) {
            axios
                .get(`${BASE_URL}${Endpoints.GetProduct}/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                .then((response) => {
                    const productData = response.data;
                    setProduct(productData);
                    setTitle(productData.title);
                    setDescription(productData.description);
                    setImages(
                        productData.images.map((image) => ({
                            preview: `${BASE_URL}${image}`, // Convert server path to preview URL
                            isExisting: true, // Mark as an existing image
                            fileName: image, // Keep track of the original file name
                        }))
                    );
                })
                .catch((error) => {
                    showAlert('error', 'Failed to fetch product!');
                    console.error("Failed to fetch product:", error.response?.data || error.message);
                });
        }
    }, [productId]);


    useEffect(() => {
        if (images.length > 4) {
            setErrors((prev) => ({ ...prev, images: "Maximum upload limit reached. You can upload up to 4 images only." }));
        }
        else {
            setErrors((prev) => ({ ...prev, images: "" }));
        }
    }, [images.length]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const validImages = files.filter((file) => file.type.startsWith("image/"));
        if (validImages.length === 0) {
            setErrors((prev) => ({ ...prev, images: "Only image files are allowed." }));
        } else {
            const newImages = validImages.map((file) =>
                Object.assign(file, { preview: URL.createObjectURL(file), isExisting: false })
            );
            setImages((prevImages) => [...prevImages, ...newImages]);
            setErrors((prev) => ({ ...prev, images: "" }));
        }
    };

    const handleEditorChange = (e) => {
        setDescription(e.target.value); // Editor provides HTML value
    };

    const handleRemoveImage = (index) => {
        const imageToRemove = images[index];
        if (imageToRemove.isExisting) {
            setRemovedImages((prev) => [...prev, imageToRemove.fileName]);
        }
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formErrors = { title: "", description: "", images: "" };
        let isValid = true;

        if (!title) {
            formErrors.title = "Title is required";
            isValid = false;
        }
        if (!description || description.trim() === "<p></p>") {
            formErrors.description = "Description is required";
            isValid = false;
        }

        if (images.length > 4) {
            formErrors.images = "Maximum upload limit reached. You can upload up to 4 images only.";
            isValid = false;
        }

        setErrors(formErrors);
        if (!isValid) return;

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);

        // Add new images to the form data
        images.forEach((image) => {
            if (!image.isExisting) {
                formData.append("images", image);
            }
        });

        // Add removed images to the form data
        if (removedImages.length > 0) {
            formData.append("removedImages", JSON.stringify(removedImages));
        }

        try {
            const response = await axios.put(
                `${BASE_URL}${Endpoints.UpdateProduct}/${productId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                showAlert('success', 'Product updated successfully!');
                setTimeout(() => {
                    router.push("/admin/dashboard"); // Redirect to dashboard or product list
                }, 1000);
            }
        } catch (error) {
            showAlert('error', 'Something went wrong!');
            console.error("Error updating product:", error.response?.data || error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!product) {
        return <Typography>Loading product details...</Typography>;
    }

    const handleImageClick = (image) => {
        setModalImage(image);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    //className={`${open ? styles.addProductLeftSpace : ''}`}


    console.log(images, 'images');


    let isImageUploadBtnDisabled = false;
    if (images.length > 3) {
        isImageUploadBtnDisabled = true
    }

    return (
        <>
            <div className={`${styles.productDetailSection} ${open ? styles.leftSpaceMain : ''}`}>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Grid2
                        container
                        spacing={2}
                        sx={{
                            padding: '0 16px', // Padding left and right
                            margin: '0 auto', // Center align
                            maxWidth: '1200px', // Optional: Set a max width for better layout control
                        }}
                    >
                        <Grid2 item size={{ xs: 12, sm: 12, md: 8 }}>
                            <Box sx={{ width: "100%" }}>
                                <Typography variant="h4" gutterBottom>
                                    Edit Product
                                </Typography>


                                <TextField
                                    label="Title"
                                    variant="outlined"
                                    fullWidth
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    error={!!errors.title}
                                    helperText={errors.title}
                                    margin="normal"
                                />

                                <Typography variant="body1" gutterBottom>
                                    Description
                                </Typography>
                                <Box sx={{ marginBottom: 2, minHeight: 200 }}>
                                    <TextEditor value={description} onChange={handleEditorChange} />
                                    {errors.description && (
                                        <Typography variant="body2" color="error">
                                            {errors.description}
                                        </Typography>
                                    )}
                                </Box>

                            </Box>
                        </Grid2>
                        <Grid2 item size={{ xs: 12, sm: 12, md: 4 }}>
                            <Box>

                                {images.length > 0 && (
                                    <Box className={styles.smallImagesPreview}>
                                        {images.map((img, index) => (
                                            <Box className={styles.smallImagesPreviewCont} key={index}>
                                                <img
                                                    src={img.preview}
                                                    alt={`Preview ${index + 1}`}
                                                    style={{ width: '100%', height: '100%', objectFit: "cover", borderRadius: "4px", cursor: 'pointer' }}
                                                    onClick={() => handleImageClick(img)}
                                                />
                                                <IconButton
                                                    sx={{ position: "absolute", top: 0, right: 0 }}
                                                    onClick={() => handleRemoveImage(index)}
                                                >
                                                    <ClearIcon />
                                                </IconButton>
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                                <div className={styles.updateImageBtn}>
                                    <Typography variant="body1" gutterBottom>
                                        Update Images
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        color="secondary"
                                        disabled={isImageUploadBtnDisabled}
                                    >
                                        Upload Images
                                        <input type="file" accept="image/*" onChange={handleImageChange} hidden multiple />
                                    </Button>
                                </div>
                                {errors.images && (
                                    <Typography variant="body2" color="error">
                                        {errors.images}
                                    </Typography>
                                )}
                            </Box>
                        </Grid2>
                        <Grid2 item size={{ xs: 12, sm: 12, md: 12 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ marginTop: 3 }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Updating..." : "Update Product"}
                            </Button>
                        </Grid2>
                    </Grid2>
                </form>
            </div>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        maxWidth: '90%', // Set a max-width for the modal content
                        maxHeight: '90%', // Set a max-height for the modal content
                        backgroundColor: 'white',
                        boxShadow: 24,
                        padding: '20px',
                        borderRadius: '8px',
                        overflow: 'auto',
                    }}
                >
                    <img
                        src={`${productImagePath}${modalImage?.fileName}`}
                        alt="Modal Image"
                        className={styles.modalImage}
                    />
                </Box>
            </Modal>

            <CommonAlert
                open={snackbar.open}
                severity={snackbar.severity}
                message={snackbar.message}
                onClose={handleAlertClose}
            />
        </>
    );
};

export default EditProduct;

