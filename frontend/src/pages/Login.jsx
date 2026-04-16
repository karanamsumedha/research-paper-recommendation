import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import authService from '../services/authService';
import './Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (!formData.username || !formData.password) {
                setError('Please fill in all fields');
                return;
            }

            const response = await authService.login(formData.username, formData.password);
            if (response.success) {
                navigate('/');
            }
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <Container>
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col md={6} lg={5}>
                        <Card className="auth-card">
                            <Card.Body className="p-5">
                                <h2 className="auth-title text-center mb-4">Welcome Back</h2>

                                {error && <Alert variant="danger">{error}</Alert>}

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Username or Email</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaEnvelope />
                                            </span>
                                            <Form.Control
                                                type="text"
                                                name="username"
                                                placeholder="Enter username or email"
                                                value={formData.username}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Password</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaLock />
                                            </span>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                placeholder="Enter your password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </Form.Group>

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="w-100 auth-button"
                                        disabled={loading}
                                    >
                                        {loading ? 'Logging in...' : 'Login'}
                                    </Button>
                                </Form>

                                <div className="text-center mt-4">
                                    <p>
                                        Don't have an account?{' '}
                                        <Link to="/register" className="auth-link">
                                            Register here
                                        </Link>
                                    </p>
                                </div>

                                <div className="text-center mt-3">
                                    <small>
                                        <a href="#forgot" className="auth-link">
                                            Forgot your password?
                                        </a>
                                    </small>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;