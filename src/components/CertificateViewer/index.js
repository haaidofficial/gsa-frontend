import React, { useState } from 'react';
import { Box, Button, Modal, List, ListItem, Link } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import styles from './CertificateViewer.module.css';

function CertificateViewer({ list }) {
    const [open, setOpen] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState(null);

    const handleOpen = (pdf) => {
        setSelectedPdf(pdf);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedPdf(null);
        setOpen(false);
    };

    return (
        <Box>
            <List>
                {list.map((pdf, index) => (
                    <ListItem key={index} sx={{ mb: 1 }}>
                        <Link
                            component="button"
                            variant="body1"
                            onClick={() => handleOpen(pdf.url)}
                            underline="hover"
                        >
                            <div className={styles.pdfLink}>
                                <ChevronRightIcon /> {pdf.name}
                            </div>
                        </Link>
                    </ListItem>
                ))}
            </List>

            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        height: '80%',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 0.5,
                        overflow: 'hidden',
                    }}
                >
                    {selectedPdf && (
                        <iframe
                            src={selectedPdf}
                            title="PDF Viewer"
                            width="100%"
                            height="100%"
                            style={{ border: 'none' }}
                        />
                    )}
                    <Button
                        onClick={handleClose}
                        sx={{ mt: 2, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                        variant="contained"
                        color="primary"
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}

export default CertificateViewer;
