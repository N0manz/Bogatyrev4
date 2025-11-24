import React from 'react';
import {
  Snackbar,
  Alert,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon
} from '@mui/icons-material';

const NotificationSnackbar = ({ notifications, onRemoveNotification }) => {
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'success':
        return <SuccessIcon />;
      case 'error':
        return <ErrorIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'info':
      default:
        return <InfoIcon />;
    }
  };

  const getAlertStyle = (severity) => {
    const baseStyle = {
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      alignItems: 'flex-start',
      '& .MuiAlert-message': {
        padding: '4px 0'
      }
    };

    return baseStyle;
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 80,
        right: 16,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        maxWidth: 400,
        width: 'calc(100vw - 32px)'
      }}
    >
      {notifications.map((notification, index) => (
        <Snackbar
          key={notification.id}
          open={notification.open}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{
            position: 'relative',
            transform: `translateY(${index * 80}px)`,
            transition: 'transform 0.3s ease'
          }}
        >
          <Alert
            severity={notification.severity}
            icon={getSeverityIcon(notification.severity)}
            onClose={() => onRemoveNotification(notification.id)}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => onRemoveNotification(notification.id)}
                sx={{ mt: -0.5 }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
            sx={getAlertStyle(notification.severity)}
          >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {notification.message}
            </Typography>
          </Alert>
        </Snackbar>
      ))}
    </Box>
  );
};

export default NotificationSnackbar;