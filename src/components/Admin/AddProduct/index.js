import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import TextEditor from "@/components/TextEditor";
import axios from "axios";
import { BASE_URL, Endpoints } from "@/constants/apiEndpoints";
import ClearIcon from '@mui/icons-material/Clear';
import { useDrawer } from "@/context/AdminHeaderContext";
import styles from './AddProduct.module.css';
import CommonAlert from "@/components/Alerts";
import { useAuth } from "@/context/AuthContext";

const productImagePath = `${BASE_URL}`;

const AddProductComp = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        images: "",
    });

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

    const router = useRouter();
    const { open } = useDrawer();
    const { token } = useAuth();


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
        const validImages = files.filter((file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024); // Limit size to 5MB

        if (validImages.length < files.length) {
            setErrors((prev) => ({ ...prev, images: "Some files are invalid or exceed 5MB." }));
        } else {
            setErrors((prev) => ({ ...prev, images: "" }));
        }

        setImages(validImages.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))); // Add preview URL
    };
    // const handleImageChange = (e) => {
    //     const files = Array.from(e.target.files); // Convert file list to array
    //     const validImages = files.filter((file) => file.type.startsWith("image/")); // Validate file types
    //     if (validImages.length === 0) {
    //         setErrors((prev) => ({ ...prev, images: "Only image files are allowed." }));
    //     } else {
    //         setImages(validImages);
    //         setErrors((prev) => ({ ...prev, images: "" }));
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formErrors = { title: "", description: "", images: "" };
        let isValid = true;

        if (!title) {
            formErrors.title = "Title is required";
            isValid = false;
        }
        debugger
        if (!description || description.trim() === "<p></p>") {
            formErrors.description = "Description is required";
            isValid = false;
        }
        if (description.trim()?.length < 10) {
            formErrors.description = "Description must be at least 10 characters long";
            isValid = false;
        }
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

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        images.forEach((image, index) => {
            formData.append(`images`, image); // No need for unique keys, backend will handle it as an array
        });

        try {
            const response = await axios.post(
                `${BASE_URL}${Endpoints.AddProduct}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                showAlert('success', 'Product Added Successfully!')
                setTimeout(() => {
                    router.push("/admin/dashboard"); // Redirect after success
                }, 1000);
            }
        } catch (error) {
            console.error("Error adding product:", error.response?.data || error.message);
        }
    };

    const handleEditorChange = (e) => {
        setDescription(e.target.value); // Editor provides HTML value
    };

    let isImageUploadBtnDisabled = false;
    if (images.length > 3) {
        isImageUploadBtnDisabled = true
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
                    Add New Product
                </Typography>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Box sx={{ width: "100%", maxWidth: '600px' }} className={styles.formBox}>
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
                    </Box>

                    <Typography sx={{ marginTop: 2 }} variant="body1" gutterBottom>
                        Description
                    </Typography>
                    <Box
                        sx={{
                            borderRadius: "4px",
                            marginBottom: 2,
                            minHeight: 350, // Minimum height for the editor
                        }}
                    >
                        <TextEditor value={description} onChange={handleEditorChange} />
                        {errors.description && (
                            <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
                                {errors.description}
                            </Typography>
                        )}
                    </Box>

                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="body1" gutterBottom>
                            Upload Images
                        </Typography>
                        <Button
                            variant="contained"
                            component="label"
                            color="secondary"
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
                        >
                            Add Product
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

export default AddProductComp;
