import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    TextField,
    Button,
    Grid2,
    Typography,
    IconButton,
    InputAdornment,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { BASE_URL, Endpoints } from "@/constants/apiEndpoints";
import styles from './AccountSettings.module.css';
import CommonAlert from "@/components/Alerts";
import { useAuth } from "@/context/AuthContext";

const AccountSettingsComp = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        newPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateInputs = () => {
        const errors = {};
        if (!user.name.trim()) errors.name = "Name is required.";
        if (!user.email.trim()) errors.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email))
            errors.email = "Enter a valid email address.";
        if (user.newPassword && user.newPassword.length < 6)
            errors.newPassword = "Password must be at least 6 characters long.";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleDialogOpen = (e) => {
        e.preventDefault();
        if (!validateInputs()) return;
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleConfirmUpdate = async () => {
        setOpenDialog(false);
        const dataToSend = {
            name: user.name,
            email: user.email,
        };
        if (user.newPassword) {
            dataToSend.newPassword = user.newPassword;
        }

        setLoading(true);
        try {
            const response = await axios.put(`${BASE_URL}${Endpoints.UpdateAccountDetails}`, dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            showAlert('success', 'Account updated successfully.')
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || "Error updating account. Please try again.";
            showAlert('error', 'Error updating account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        axios.get(`${BASE_URL}${Endpoints.GetAccountDetails}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            setUser({
                name: response.data.user.name,
                email: response.data.user.email,
                newPassword: "",
            });
        }).catch((err) => {
            console.error(err);
            showAlert('error', 'Failed to fetch account details. Please reload the page.');
        });
    }, []);

    return (
        <>
            <div>
                <Grid2
                    container
                    spacing={2}
                    sx={{
                        padding: "0 16px",
                        margin: "0 auto",
                        maxWidth: "600px",
                        "@media (max-width: 721px)": {
                            maxWidth: '550px',
                        },
                        "@media (max-width: 651px)": {
                            maxWidth: '500px',
                        },
                        "@media (max-width: 600px)": {
                            maxWidth: '450px'
                        },
                        "@media (max-width: 500px)": {
                            maxWidth: '400px'
                        },
                        "@media (max-width: 426px)": {
                            maxWidth: '320px',
                        },
                        "@media (max-width: 376px)": {
                            maxWidth: '320px',
                            marginLeft: '50px'
                        },
                        "@media (max-width: 355px)": {
                            maxWidth: '300px',
                        },
                    }}
                >
                    <Grid2 item size={{ xs: 12, sm: 12, md: 12 }}>
                        <Typography variant="h4" gutterBottom className={styles.heading}>
                            Account Settings
                        </Typography>
                    </Grid2>
                    <Grid2 item size={{ xs: 12, sm: 12, md: 12 }}>
                        <form onSubmit={handleDialogOpen}>
                            <Grid2 container spacing={2}>
                                <Grid2 item size={{ xs: 12, sm: 12, md: 12 }}>
                                    <TextField
                                        label="Name"
                                        name="name"
                                        value={user.name}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.name}
                                        helperText={errors.name}
                                    />
                                </Grid2>
                                <Grid2 item size={{ xs: 12, sm: 12, md: 12 }}>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        type="email"
                                        error={!!errors.email}
                                        helperText={errors.email}
                                    />
                                </Grid2>
                                <Grid2 item size={{ xs: 12, sm: 12, md: 12 }}>
                                    <TextField
                                        label="New Password"
                                        name="newPassword"
                                        value={user.newPassword}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        type={showPassword ? "text" : "password"}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        error={!!errors.newPassword}
                                        helperText={errors.newPassword}
                                    />
                                </Grid2>
                                <Grid2 item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        fullWidth
                                        size="large"
                                        disabled={loading}
                                        startIcon={loading && <CircularProgress size={20} />}
                                    >
                                        {loading ? "Updating..." : "Update"}
                                    </Button>
                                </Grid2>
                            </Grid2>
                        </form>
                    </Grid2>
                </Grid2>

                {/* Confirmation Dialog */}
                <Dialog
                    open={openDialog}
                    onClose={handleDialogClose}
                    aria-labelledby="confirm-dialog-title"
                    aria-describedby="confirm-dialog-description"
                >
                    <DialogTitle id="confirm-dialog-title">Confirm Update</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="confirm-dialog-description">
                            Are you sure you want to update your account details?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmUpdate} color="primary" autoFocus>
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
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

export default AccountSettingsComp;
