import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-custom mt-5">
            <Container>
                <Row className="py-5">
                    <Col md={3} className="mb-4">
                        <h5 className="footer-title">ResearchHub</h5>
                        <p className="footer-text">
                            Your comprehensive platform for discovering and managing research papers.
                        </p>
                    </Col>

                    <Col md={3} className="mb-4">
                        <h5 className="footer-title">Quick Links</h5>
                        <ul className="footer-links">
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/search">Search Papers</a>
                            </li>
                            <li>
                                <a href="/about">About Us</a>
                            </li>
                        </ul>
                    </Col>

                    <Col md={3} className="mb-4">
                        <h5 className="footer-title">Resources</h5>
                        <ul className="footer-links">
                            <li>
                                <a href="/documentation">Documentation</a>
                            </li>
                            <li>
                                <a href="/support">Support</a>
                            </li>
                            <li>
                                <a href="/faq">FAQ</a>
                            </li>
                        </ul>
                    </Col>

                    <Col md={3} className="mb-4">
                        <h5 className="footer-title">Follow Us</h5>
                        <div className="social-links">
                            <a href="#facebook" className="social-icon">
                                <FaFacebook />
                            </a>
                            <a href="#twitter" className="social-icon">
                                <FaTwitter />
                            </a>
                            <a href="#linkedin" className="social-icon">
                                <FaLinkedin />
                            </a>
                            <a href="#github" className="social-icon">
                                <FaGithub />
                            </a>
                        </div>
                    </Col>
                </Row>

                <hr className="footer-divider" />

                <Row className="py-3">
                    <Col md={6}>
                        <p className="footer-text">
                            &copy; {currentYear} ResearchHub. All rights reserved.
                        </p>
                    </Col>
                    <Col md={6} className="text-end">
                        <p className="footer-text">
                            <a href="/privacy">Privacy Policy</a> | 
                            <a href="/terms"> Terms of Service</a>
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;