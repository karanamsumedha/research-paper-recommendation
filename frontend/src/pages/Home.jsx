import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaHeart, FaBook, FaQuoteLeft, FaSync } from 'react-icons/fa';
import paperService from '../services/paperService';
import LoadingSpinner from '../components/LoadingSpinner';
import './Home.css';

const Home = () => {
    const [recentPapers, setRecentPapers] = useState([]);
    const [topCitedPapers, setTopCitedPapers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPapers = async () => {
            try {
                setLoading(true);
                const recent = await paperService.getRecentPapers(6);
                const topCited = await paperService.getTopCitedPapers(6);
                setRecentPapers(recent);
                setTopCitedPapers(topCited);
            } catch (error) {
                console.error('Error fetching papers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPapers();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <Container>
                    <Row className="align-items-center min-vh-100">
                        <Col lg={8} className="mx-auto text-center">
                            <h1 className="hero-title">Welcome to ResearchHub</h1>
                            <p className="hero-subtitle">
                                Discover, recommend, and manage research papers all in one place
                            </p>
                            <Link to="/search">
                                <Button size="lg" className="hero-button">
                                    <FaSearch /> Start Searching
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Features Section */}
            <section className="features-section py-5">
                <Container>
                    <h2 className="section-title text-center mb-5">Why Choose ResearchHub?</h2>
                    <Row>
                        <Col md={6} lg={3} className="mb-4">
                            <Card className="feature-card">
                                <Card.Body className="text-center">
                                    <FaSearch className="feature-icon" />
                                    <Card.Title>Advanced Search</Card.Title>
                                    <Card.Text>
                                        Search and filter papers by domain, author, and year
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} lg={3} className="mb-4">
                            <Card className="feature-card">
                                <Card.Body className="text-center">
                                    <FaHeart className="feature-icon" />
                                    <Card.Title>Smart Recommendations</Card.Title>
                                    <Card.Text>
                                        Get personalized paper recommendations based on your interests
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} lg={3} className="mb-4">
                            <Card className="feature-card">
                                <Card.Body className="text-center">
                                    <FaBook className="feature-icon" />
                                    <Card.Title>Personal Library</Card.Title>
                                    <Card.Text>
                                        Save and organize your favorite papers in your personal library
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} lg={3} className="mb-4">
                            <Card className="feature-card">
                                <Card.Body className="text-center">
                                    <FaQuoteLeft className="feature-icon" />
                                    <Card.Title>Citation Generation</Card.Title>
                                    <Card.Text>
                                        Generate citations in APA, IEEE, Chicago, and MLA formats
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Recent Papers Section */}
            <section className="papers-section py-5 bg-light">
                <Container>
                    <h2 className="section-title mb-5">Recent Papers</h2>
                    <Row>
                        {recentPapers.slice(0, 3).map((paper) => (
                            <Col md={6} lg={4} key={paper.paperId} className="mb-4">
                                <Card className="paper-card h-100">
                                    <Card.Body>
                                        <Card.Title className="paper-title">
                                            {paper.title}
                                        </Card.Title>
                                        <Card.Text className="paper-authors">
                                            {paper.authors}
                                        </Card.Text>
                                        <Card.Text className="paper-year">
                                            {paper.publicationYear}
                                        </Card.Text>
                                        <Link to={`/paper/${paper.paperId}`}>
                                            <Button variant="primary" size="sm">
                                                View Details
                                            </Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Row className="mt-4">
                        <Col className="text-center">
                            <Link to="/search">
                                <Button variant="outline-primary">View All Papers</Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Top Cited Papers Section */}
            <section className="papers-section py-5">
                <Container>
                    <h2 className="section-title mb-5">Top Cited Papers</h2>
                    <Row>
                        {topCitedPapers.slice(0, 3).map((paper) => (
                            <Col md={6} lg={4} key={paper.paperId} className="mb-4">
                                <Card className="paper-card h-100">
                                    <Card.Body>
                                        <Card.Title className="paper-title">
                                            {paper.title}
                                        </Card.Title>
                                        <Card.Text className="paper-authors">
                                            {paper.authors}
                                        </Card.Text>
                                        <Card.Text className="paper-citations">
                                            Citations: {paper.citationCount}
                                        </Card.Text>
                                        <Link to={`/paper/${paper.paperId}`}>
                                            <Button variant="primary" size="sm">
                                                View Details
                                            </Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* CTA Section */}
            <section className="cta-section py-5 text-center">
                <Container>
                    <h2 className="cta-title mb-4">Ready to get started?</h2>
                    <p className="cta-subtitle mb-4">
                        Join thousands of researchers using ResearchHub to discover and manage papers
                    </p>
                    <Link to="/register">
                        <Button size="lg" className="cta-button">
                            Sign Up Now
                        </Button>
                    </Link>
                </Container>
            </section>
        </div>
    );
};

export default Home;