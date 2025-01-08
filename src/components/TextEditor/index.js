import { useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { DefaultEditor } from "react-simple-wysiwyg";
import CloseIcon from "@mui/icons-material/Close";

export default function TextEditor({ value, onChange }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    return (
        <>
            <DefaultEditor
                value={value}
                onChange={onChange}
                style={{
                    height: "350px", // Minimum height for the editor
                    border: "1px solid #ccc", // Border around the editor
                    borderRadius: "4px", // Rounded corners
                    padding: "10px", // Internal padding for content
                    backgroundColor: "#f9f9f9", // Light background color for better readability
                    overflowY: "scroll"
                }}
            />
            {/* <Box>
                <Typography variant="body1" gutterBottom>
                    Preview
                </Typography>
                <Box
                    sx={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "16px",
                        backgroundColor: "#f9f9f9",
                        maxHeight: "300px",
                        overflowY: "auto",
                    }}
                >
                    {value ? (
                        <div
                            style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}
                            dangerouslySetInnerHTML={{ __html: value }}
                        />
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            No content to preview.
                        </Typography>
                    )}
                </Box>
            </Box> */}
            {/* Preview Button */}
            <Box sx={{ marginTop: 2, textAlign: "right" }}>
                <Button variant="contained" color="primary" onClick={handleOpenModal}>
                    Preview
                </Button>
            </Box>

            {/* Modal for Preview */}
            <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="md">
                <DialogTitle>
                    Preview
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{ position: "absolute", right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent
                    sx={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "16px",
                        backgroundColor: "#f9f9f9",
                        maxHeight: "500px",
                        overflowY: "auto",
                    }}
                >
                    {value ? (
                        <div
                            style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}
                            dangerouslySetInnerHTML={{ __html: value }}
                        />
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            No content to preview.
                        </Typography>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}