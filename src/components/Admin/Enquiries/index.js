import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Pagination,
    CircularProgress,
    Alert,
    Paper,
    Button,
    Modal,
    IconButton,
} from '@mui/material';
import { BASE_URL, Endpoints } from '@/constants/apiEndpoints';
import styles from './Enquiries.module.css';
import { useDrawer } from '@/context/AdminHeaderContext';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import CommonAlert from '@/components/Alerts';

const formatDate = (enquiryDate) => {
    const formattedDateTime = new Date(enquiryDate).toLocaleString('en-IN', {
        year: 'numeric',
        month: 'long', // Full month name
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true, // 12-hour format (AM/PM)
    });

    return formattedDateTime;
};

const EnquiriesComp = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });
    const { open } = useDrawer();
    const { token } = useAuth();

    const fetchEnquiries = async (page = 1) => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`${BASE_URL}${Endpoints.GetEnquiries}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { page, limit: 10 },
            });

            setEnquiries(response.data.enquiries);
            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            console.error('Error fetching enquiries:', err);
            showAlert('error', 'Failed to fetch enquiries. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const showAlert = (severity, message) => {
        setSnackbar({ open: true, severity, message });
    };

    const handleAlertClose = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    useEffect(() => {
        fetchEnquiries(currentPage);
    }, [currentPage]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Set initial state
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleOpenModal = (message) => {
        setSelectedMessage(message);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    const deleteEnquiry = async (enquiryId) => {
        try {
            // Make a DELETE request to the backend API
            const response = await axios.delete(`${BASE_URL}${Endpoints.DeleteEnquiry}/${enquiryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data) {
                if (response.data?.message === "Enquiry deleted successfully") {
                    showAlert('success', 'Enquiry deleted successfully')
                    fetchEnquiries(currentPage);
                }
            }
        } catch (error) {
            // Handle any errors
            if (error.response) {
                console.error('Error:', error.response.data.error);
                showAlert('error', 'Failed to delete the enquiry. Please try again.');
            } else {
                console.error('Error:', error.message);
                showAlert('error', 'Failed to delete the enquiry. Please try again.');
            }
            throw error; // You can rethrow or handle it accordingly
        }
    };

    const readMoreMsgLength = isMobile ? 60 : 160;


    return (
        <>
            <div className={`${styles.enquiriesTable} ${open ? styles.enquiriesLeftSpace : ''}`}>
                <div style={{ width: '100%' }}>
                    <Box sx={{ padding: 4 }}>
                        <Typography variant="h4" gutterBottom>
                            Enquiries
                        </Typography>

                        {loading && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                                <CircularProgress />
                            </Box>
                        )}

                        {error && (
                            <Alert severity="error" sx={{ mb: 4 }}>
                                {error}
                            </Alert>
                        )}

                        {!loading && enquiries.length > 0 && (
                            <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    <strong>Product</strong>
                                                </TableCell>
                                                <TableCell>
                                                    <strong>Name</strong>
                                                </TableCell>
                                                <TableCell>
                                                    <strong>Email</strong>
                                                </TableCell>
                                                <TableCell>
                                                    <strong>Contact</strong>
                                                </TableCell>
                                                <TableCell>
                                                    <strong>Message</strong>
                                                </TableCell>
                                                <TableCell>
                                                    <strong>Submitted At</strong>
                                                </TableCell>
                                                <TableCell>
                                                    <strong>Action</strong>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {enquiries.map((enquiry) => (
                                                <TableRow key={enquiry._id}>
                                                    <TableCell>
                                                        {
                                                            enquiry?.productId?._id ?
                                                                <Link href={`/admin/edit-product/${enquiry?.productId?._id}`}>
                                                                    <Typography variant="body2" color="primary">
                                                                        {enquiry.productId?.title || 'N/A'}
                                                                    </Typography>
                                                                </Link>
                                                                :
                                                                <Typography variant="body2" color="primary">
                                                                    {enquiry.productId?.title || 'N/A'}
                                                                </Typography>
                                                        }

                                                    </TableCell>
                                                    <TableCell>{enquiry.name}</TableCell>
                                                    <TableCell>
                                                        <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
                                                    </TableCell>
                                                    <TableCell>
                                                        <a href={`tel:+91${enquiry.contactNo}`}>{enquiry.contactNo}</a>
                                                    </TableCell>
                                                    <TableCell>
                                                        {enquiry.message.length > readMoreMsgLength ? (
                                                            <>
                                                                {enquiry.message.substring(0, readMoreMsgLength)}...{' '}
                                                                <Button
                                                                    size="small"
                                                                    color="primary"
                                                                    onClick={() => handleOpenModal(enquiry.message)}
                                                                >
                                                                    Read More
                                                                </Button>
                                                            </>
                                                        ) : (
                                                            enquiry.message
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{formatDate(enquiry?.createdAt)}</TableCell>
                                                    <TableCell>
                                                        <IconButton onClick={() => deleteEnquiry(enquiry._id)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        )}

                        {!loading && totalPages > 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="primary"
                                    size="large"
                                />
                            </Box>
                        )}

                        {!loading && enquiries.length === 0 && !error && (
                            <Typography variant="h6" align="center" color="text.secondary">
                                No enquiries found.
                            </Typography>
                        )}
                    </Box>
                </div>
            </div>

            {/* Modal for full message */}
            <Modal open={openModal} onClose={handleCloseModal}>
                <Paper sx={{ maxWidth: 600, margin: 'auto', padding: 4, marginTop: '10%' }} className={styles.messageModal}>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        Full Message
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {selectedMessage}
                    </Typography>
                    <Box sx={{ textAlign: 'right', marginTop: 2 }}>
                        <Button onClick={handleCloseModal} variant="contained" color="primary">
                            Close
                        </Button>
                    </Box>
                </Paper>
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

export default EnquiriesComp;

