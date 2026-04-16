import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaBook, FaRefresh, FaArrowRight } from 'react-icons/fa';
import recommendationService from '../services/recommendationService';
import authService from '../services/authService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import './Recommendations.css';

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [generating, setGenerating] = useState(false);
    const user = authService.getCurrentUser();

    useEffect(() => {
        if (user) {
            fetchRecommendations();
        }
    }, [user]);

    const fetchRecommendations = async () => {
        try {
            setLoading(true);
            const data = await recommendationService.getUserRecommendations(user.userId);
            setRecommendations(data);
        } catch (err) {
            setError(err.message || 'Failed to load recommendations');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateRecommendations = async () => {
        try {
            setGenerating(true);
            const data = await recommendationService.generateRecommendations(user.userId);
            setRecommendations(data);
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to generate recommendations');
        } finally {
            setGenerating(false);
        }
    };

    const handleMarkAsViewed = async (recommendationId) => {
        try {
            await recommendationService.markAsViewed(recommendationId);
            fetchRecommendations();
        } catch (err) {
            setError(err.message || 'Failed to update recommendation');
        }
    };

    const handleDeleteRecommendation = async (recommendationId) => {
        try {
            await recommendationService.deleteRecommendation(recommendationId);
            fetchRecommendations();
        } catch (err) {
            setError(err.message || 'Failed to delete recommendation');
        }
    };

    if (loading) return <LoadingSpinner message="Loading your recommendations..." />;

    if (!user) {
        return (
            <Container className="py-5">
                <Alert variant="info">
                    Please <Link to="/login">login</Link> to view recommendations
                </Alert>
            </Container>
        );
    }

    return (
        <div className="recommendations-page">
            <Container className="py-5">
                <div className="page-header mb-5">
                    <h1 className="page-title">
                        <FaHeart /> Personalized Recommendations
                    </h1>
                    <p className="page-subtitle">
                        Discover papers tailored to your research interests
                    </p>
                </div>

                <ErrorAlert message={error} onClose={() => setError('')} />

                {/* Generate Button */}
                <div className="mb-4">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleGenerateRecommendations}
                        disabled={generating}
                    >
                        <FaRefresh /> {generating ? 'Generating...' : 'Generate New Recommendations'}
                    </Button>
                </div>

                {/* Recommendations List */}
                {recommendations.length > 0 ? (
                    <>
                        <div className="recommendations-info mb-3">
                            <p>
                                Found <strong>{recommendations.length}</strong> recommendation(s)
                            </p>
                        </div>

                        <Row>
                            {recommendations.map((rec) => (
                                <Col lg={6} key={rec.recommendationId} className="mb-4">
                                    <Card className="recommendation-card h-100">
                                        <Card.Body>
                                            {/* Relevance Score */}
                                            <div className="relevance-badge">
                                                <Badge bg="success">
                                                    {(rec.relevanceScore * 100).toFixed(0)}% Match
                                                </Badge>
                                            </div>

                                            <Card.Title className="recommendation-title">
                                                {rec.paper?.title}
                                            </Card.Title>

                                            <Card.Text className="recommendation-authors">
                                                <strong>Authors:</strong> {rec.paper?.authors}
                                            </Card.Text>

                                            {rec.paper?.abstractText && (
                                                <Card.Text className="recommendation-abstract">
                                                    {rec.paper.abstractText.substring(0, 150)}...
                                                </Card.Text>
                                            )}

                                            <div className="recommendation-meta mb-3">
                                                {rec.paper?.domain && (
                                                    <Badge bg="info" className="me-2">
                                                        {rec.paper.domain}
                                                    </Badge>
                                                )}
                                                {rec.paper?.publicationYear && (
                                                    <Badge bg="secondary">
                                                        {rec.paper.publicationYear}
                                                    </Badge>
                                                )}
                                            </div>

                                            {/* Relevance Score Bar */}
                                            <div className="score-bar mb-3">
                                                <div
                                                    className="score-fill"
                                                    style={{
                                                        width: `${rec.relevanceScore * 100}%`,
                                                    }}
                                                ></div>
                                            </div>

                                            <div className="recommendation-actions">
                                                <Link to={`/paper/${rec.paper?.paperId}`}>
                                                    <Button
                                                        variant="primary"
                                                        size="sm"
                                                        className="me-2"
                                                    >
                                                        <FaBook /> View Paper
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() =>
                                                        handleMarkAsViewed(rec.recommendationId)
                                                    }
                                                >
                                                    Mark Viewed
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDeleteRecommendation(rec.recommendationId)
                                                    }
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </>
                ) : (
                    <Card className="text-center p-5">
                        <Card.Body>
                            <FaHeart className="empty-icon" />
                            <h4>No recommendations yet</h4>
                            <p>Click "Generate New Recommendations" to get started</p>
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={handleGenerateRecommendations}
                            >
                                Generate Recommendations
                            </Button>
                        </Card.Body>
                    </Card>
                )}
            </Container>
        </div>
    );
};

export default Recommendations;