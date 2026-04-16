import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { FaHome, FaSearch, FaHeart, FaBook, FaCog, FaSignOutAlt, FaUser } from 'react-icons/fa';
import authService from '../services/authService';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(authService.getCurrentUser());
    const isAuthenticated = authService.isAuthenticated();

    const handleLogout = () => {
        authService.logout();
        setUser(null);
        navigate('/login');
    };

    return (
        <BootstrapNavbar bg="dark" expand="lg" sticky="top" className="navbar-custom">
            <Container>
                <BootstrapNavbar.Brand as={Link} to="/" className="brand-text">
                    📚 ResearchHub
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className="nav-link-custom">
                            <FaHome /> Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/search" className="nav-link-custom">
                            <FaSearch /> Search
                        </Nav.Link>

                        {isAuthenticated ? (
                            <>
                                <Nav.Link as={Link} to="/recommendations" className="nav-link-custom">
                                    <FaHeart /> Recommendations
                                </Nav.Link>
                                <Nav.Link as={Link} to="/library" className="nav-link-custom">
                                    <FaBook /> My Library
                                </Nav.Link>

                                <Dropdown className="d-inline ms-3">
                                    <Dropdown.Toggle
                                        id="dropdown-user"
                                        className="nav-dropdown-toggle"
                                        variant="outline-light"
                                    >
                                        <FaUser /> {user?.sub || 'User'}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/profile">
                                            <FaCog /> Profile
                                        </Dropdown.Item>
                                        {user?.role === 'ADMIN' && (
                                            <Dropdown.Item as={Link} to="/admin">
                                                Admin Dashboard
                                            </Dropdown.Item>
                                        )}
                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={handleLogout}>
                                            <FaSignOutAlt /> Logout
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" className="nav-link-custom">
                                    Login
                                </Nav.Link>
                                <Nav.Link
                                    as={Link}
                                    to="/register"
                                    className="nav-link-custom register-btn"
                                >
                                    Register
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;