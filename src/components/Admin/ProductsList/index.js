import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button, Box, IconButton, Tooltip, Modal } from "@mui/material";
import axios from "axios";
import { BASE_URL, Endpoints } from "@/constants/apiEndpoints";
import Image from "next/image";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { useRouter } from "next/router";
import styles from './ProductsList.module.css';
import { useDrawer } from "@/context/AdminHeaderContext";
import CommonAlert from "@/components/Alerts";
import { useAuth } from "@/context/AuthContext";

const productImagePath = `${BASE_URL}`;

const ProductList = () => {
    const [products, setProducts] = useState([]); // Products state
    const [page, setPage] = useState(0); // Pagination page state
    const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
    const [totalProducts, setTotalProducts] = useState(0); // Total products for pagination
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false); // State to control modal visibility
    const [modalImage, setModalImage] = useState('');
    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });

    const { token } = useAuth();

    const showAlert = (severity, message) => {
        setSnackbar({ open: true, severity, message });
    };

    const handleAlertClose = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };
    const { open } = useDrawer();

    // Fetch products from the server with pagination
    const fetchProducts = async (page, rowsPerPage) => {
        try {
            const response = await axios.get(
                `${BASE_URL}${Endpoints.GetProducts}?page=${page + 1}&limit=${rowsPerPage}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );

            if (response.data.products) {
                setProducts(response.data.products);
            }

            if (response.data.total) {
                setTotalProducts(response.data.total);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            showAlert('error', 'Error fetching products!');
        }
    };

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        fetchProducts(newPage, rowsPerPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        fetchProducts(0, event.target.value);
    };

    // Handle delete product
    const handleDeleteProduct = async (productId) => {
        try {
            const response = await axios.post(`${BASE_URL}${Endpoints.DeleteProduct}`, {
                productId
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.message === "Product deleted successfully") {
                showAlert('success', 'Product deleted successfully')
            }

            fetchProducts(page, rowsPerPage); // Re-fetch the products after deletion
        } catch (error) {
            console.error("Error deleting product:", error);
            showAlert('error', 'Error deleting product!');
        }
    };

    // Handle edit product (redirect to the edit page or show a modal)
    const handleEditProduct = (productId) => {
        router.push(`/admin/edit-product/${productId}`);
    };

    // Format date to a human-readable format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Fetch the products on component mount and when page or rowsPerPage changes
    useEffect(() => {
        fetchProducts(page, rowsPerPage);
    }, [page, rowsPerPage]);

    const handleImageClick = (image) => {
        setModalImage(image);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    return (
        <>
            <div className={`${styles.productTable} ${open ? styles.productTableLeftSpace : ''}`}>
                <div style={{ width: "100%" }}>
                    <TableContainer sx={{ border: "1px solid #ddd", borderRadius: "8px" }}>
                        <Table sx={{ borderCollapse: "collapse" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            border: "1px solid #ddd",
                                            fontWeight: "bold",
                                            backgroundColor: "#f5f5f5", // Light grey background
                                        }}
                                    >
                                        S.No.
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            border: "1px solid #ddd",
                                            fontWeight: "bold",
                                            backgroundColor: "#f5f5f5", // Light grey background
                                        }}
                                    >
                                        Title
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            border: "1px solid #ddd",
                                            fontWeight: "bold",
                                            backgroundColor: "#f5f5f5", // Light grey background
                                        }}
                                    >
                                        Description
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            border: "1px solid #ddd",
                                            fontWeight: "bold",
                                            backgroundColor: "#f5f5f5", // Light grey background
                                        }}
                                    >
                                        Images
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            border: "1px solid #ddd",
                                            fontWeight: "bold",
                                            backgroundColor: "#f5f5f5", // Light grey background
                                        }}
                                    >
                                        Created Date
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            border: "1px solid #ddd",
                                            fontWeight: "bold",
                                            backgroundColor: "#f5f5f5", // Light grey background
                                        }}
                                    >
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {products.map((product, index) => (
                                    <TableRow key={product._id}>
                                        <TableCell sx={{ border: "1px solid #ddd" }}>
                                            {page * rowsPerPage + index + 1} {/* S.No. Calculation */}
                                        </TableCell>
                                        <TableCell sx={{ border: "1px solid #ddd" }}>{product.title}</TableCell>
                                        <TableCell sx={{ border: "1px solid #ddd" }}>
                                            <div className={styles.productDescription} dangerouslySetInnerHTML={{ __html: product.description }} />
                                        </TableCell>
                                        <TableCell sx={{ border: "1px solid #ddd" }}>
                                            <div className={styles.productImages} >
                                                {product.images.map((image, index) => (
                                                    <div key={index} style={{ position: 'relative' }}>
                                                        <Image
                                                            key={index}
                                                            src={`${productImagePath}${image}`}
                                                            alt={`product-image-${index}`}
                                                            width={100}
                                                            height={100}
                                                            style={{
                                                                width: "100px",
                                                                height: "100px",
                                                                borderRadius: "8px",
                                                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                                                objectFit: "cover",
                                                            }}
                                                        />
                                                        <Tooltip title="Zoom Image" placement="top">
                                                            <IconButton
                                                                onClick={() => handleImageClick(image)}
                                                                sx={{
                                                                    position: 'absolute',
                                                                    top: '0px',
                                                                    right: '8px',
                                                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                                    color: 'white',
                                                                    '&:hover': {
                                                                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                                                    },
                                                                }}
                                                            >
                                                                <ZoomInIcon className={styles.zoomIcon} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell sx={{ border: "1px solid #ddd" }}>
                                            {formatDate(product.createdAt)} {/* Format the created date */}
                                        </TableCell>
                                        <TableCell sx={{ border: "1px solid #ddd" }}>
                                            <Tooltip title="Edit" placement="right-start">
                                                <IconButton>
                                                    <EditIcon
                                                        onClick={() => handleEditProduct(product._id)}
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete" placement="right-start">
                                                <IconButton>
                                                    <DeleteIcon
                                                        onClick={() => handleDeleteProduct(product._id)}
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={totalProducts}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
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

                    className={styles.modalImgWrapper}
                >
                    <img
                        src={`${productImagePath}${modalImage}`}
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

export default ProductList;