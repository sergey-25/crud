import React from 'react';
import {IconButton} from "@mui/material";

function ActionButton({color, children, onClick }) {
    return (
        <IconButton
            color={color}
            onClick={onClick}>
            {children}
        </IconButton>
    );
}

export default ActionButton;