import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const ModalDialog = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
  showCloseButton = true
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      aria-labelledby="modal-title"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '12px',
          backgroundImage: 'none'
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px 16px',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          sx={{ fontWeight: 600 }}
        >
          {title}
        </Typography>
        
        {showCloseButton && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent sx={{ padding: '20px 24px' }}>
        {children}
      </DialogContent>

      {actions && (
        <DialogActions
          sx={{
            padding: '16px 24px 20px',
            borderTop: '1px solid',
            borderColor: 'divider',
            gap: 1
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ModalDialog;