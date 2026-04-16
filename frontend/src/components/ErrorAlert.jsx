import React from 'react';
import { Alert } from 'react-bootstrap';
import { FaExclamationTriangle } from 'react-icons/fa';
import './ErrorAlert.css';

const ErrorAlert = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <Alert variant="danger" onClose={onClose} dismissible className="error-alert-custom">
            <FaExclamationTriangle className="me-2" />
            <strong>Error!</strong> {message}
        </Alert>
    );
};

export default ErrorAlert;