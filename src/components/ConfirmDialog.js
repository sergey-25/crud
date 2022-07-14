import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, Button} from "@mui/material";
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
function ConfirmDialog({ confirmDialog, setConfirmDialog }) {
    return (
        <Dialog open={confirmDialog.isOpen} >
            <DialogTitle >
                <IconButton>
                    <NotListedLocationIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent >
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions >
                <Button
                  color="error"
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}>Ні</Button>
                <Button
                     color="primary"
                    onClick={confirmDialog.onConfirm}>Так</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;