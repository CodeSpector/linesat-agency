import React from 'react';
import clsx from 'clsx';
import { blue, amber, cyan, green, red, orange } from '@material-ui/core/colors';
import {CheckCircle, Warning, ErrorOutline, InfoOutlined, CloseOutlined} from '@material-ui/icons';
import { SnackbarContent, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles1= makeStyles({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor:"rgba(0,0,0,67%)",
    },
    info: {
      backgroundColor:blue[600],
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant:{
      opacity: 0.9,
      marginRight:8,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
});
  
const variantIcon = {
    success: CheckCircle,
    warning: Warning,
    error: ErrorOutline,
    info: InfoOutlined,
};

export default function SnackWrapper(props){
    const classes= useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon['info'];
  
    return (
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <CloseOutlined className={classes.icon} />
          </IconButton>
        ]}
        {...other}
      />
    );
}