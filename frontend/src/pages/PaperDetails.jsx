import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Nav, Tab, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {
    FaBook,
    FaUser,
    FaCalendar,
    FaCopy,
    FaHeart,
    FaStar,
    FaBookmark,
} from 'react-icons/fa';
import paperService from '../services/paperService';
import citationService from '../services/citationService';
import feedbackService from '../services/feedbackService';
import libraryService from '../services/libraryService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { formatDate, copyToClipboard } from '../utils/helpers';
import authService from '../services/authService';
import './PaperDetails.css';

const PaperDetails = () => {
    const { paperId } = useParams();
    const [paper, setPaper] = useState(null);
    const [citations, setCitations] = useState({});
    const [feedback, setFeedback] = useState(null);
    const [averageRating, setAverageRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [rating, setRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');
    const [inLibrary, setInLibrary] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const user = authService.getCurrentUser();

    useEffect(() => {
        const fetchPaperDetails = async () => {
            try {
                setLoading(true);
                const paperData = await paperService.getPaperById(paperId);
                setPaper(paperData);

                // Fetch citations
                const apaCitation = await citationService.generateAPACitation(paperId);
                const ieeeCitation = await citationService.generateIEEECitation(paperId);
                const chicagoCitation = await citationService.generateChicagoCitation(paperId);
                const mlaCitation = await citationService.generateMLACitation(paperId);

                setCitations({
                    apa: apaCitation,
                    ieee: ieeeCitation,
                    chicago: chicagoCitation,
                    mla: mlacitation,
                });

                // Fetch average rating
                const ratingData = await feedbackService.getAverageRating(paperId);
                setAverageRating(ratingData.averageRating || 0);
            } catch (err) {
                setError(err.message || 'Failed to load paper details');
            } finally {
                setLoading(false);
            }
        };

        fetchPaperDetails();
    }, [paperId]);

    const handleSavePaper = async () => {
        try {
            if (!user) {
                setError('Please login to save papers');
                return;
            }

            await libraryService.savePaper({
                userId: user.userId,
                paperId: paperId,
            });

            setInLibrary(true);
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to save paper');
        }
    };

    const handleToggleFavorite = async () => {
        try {
            if (!user) {
                setError('Please login to favorite papers');
                return;
            }

            setIsFavorite(!isFavorite);
        } catch (err) {
            setError(err.message || 'Failed to toggle favorite');
        }
    };

    const handleSubmitFeedback = async () => {
        try {
            if (!user) {
                setError('Please login to submit feedback');
                return;
            }

            if (rating === 0) {
                setError('Please select a rating');
                return;
            }

            await feedbackService.submitFeedback({
                userId: user.userId,
                paperId: paperId,
                rating: rating,
                feedbackText: feedbackText,
            });

            setRating(0);
            setFeedbackText('');
            setError('Feedback submitted successfully!');
            setTimeout(() => setError(''), 3000);
        } catch (err) {
            setError(err.message || 'Failed to submit feedback');
        }
    };

    if (loading) return <LoadingSpinner />;

    if (!paper)
        return (
            <Container className="py-5">
                <Alert variant="danger">Paper not found</Alert>
            </Container>
        );

    return (
        <div className="paper-details-page">
            <Container className="py-5">
                <ErrorAlert message={error} onClose={() => setError('')} />

                {/* Header Section */}
                <Card className="paper-header-card mb-4">
                    <Card.Body className="p-5">
                        <h1 className="paper-title">{paper.title}</h1>

                        <div className="paper-meta mb-3">
                            <p className="paper-authors">
                                <FaUser /> {paper.authors}
                            </p>
                            {paper.publicationYear && (
                                <p className="paper-year">
                                    <FaCalendar /> {paper.publicationYear}
                                </p>
                            )}
                            {paper.domain && (
                                <Badge bg="info" className="me-2">
                                    {paper.domain}
                                </Badge>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="action-buttons mt-4">
                            <Button
                                variant="primary"
                                className="me-2"
                                onClick={handleSavePaper}
                                disabled={inLibrary}
                            >
                                <FaBookmark /> {inLibrary ? 'Saved' : 'Save to Library'}
                            </Button>
                            <Button
                                variant="outline-danger"
                                className="me-2"
                                onClick={handleToggleFavorite}
                            >
                                <FaHeart /> {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                            </Button>
                            {paper.url && (
                                <a href={paper.url} target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline-primary">
                                        <FaBook /> View Paper
                                    </Button>
                                </a>
                            )}
                        </div>
                    </Card.Body>
                </Card>

                <Row>
                    {/* Main Content */}
                    <Col lg={8}>
                        {/* Abstract */}
                        <Card className="mb-4">
                            <Card.Header className="bg-light">
                                <h5 className="mb-0">Abstract</h5>
                            </Card.Header>
                            <Card.Body>
                                <p>{paper.abstractText || 'No abstract available'}</p>
                            </Card.Body>
                        </Card>

                        {/* Keywords */}
                        {paper.keywords && (
                            <Card className="mb-4">
                                <Card.Header className="bg-light">
                                    <h5 className="mb-0">Keywords</h5>
                                </Card.Header>
                                <Card.Body>
                                    <div className="keywords-container">
                                        {paper.keywords.split(',').map((keyword, index) => (
                                            <Badge key={index} bg="secondary" className="me-2 mb-2">
                                                {keyword.trim()}
                                            </Badge>
                                        ))}
                                    </div>
                                </Card.Body>
                            </Card>
                        )}

                        {/* Citations */}
                        <Card className="mb-4">
                            <Card.Header className="bg-light">
                                <h5 className="mb-0">Citations</h5>
                            </Card.Header>
                            <Card.Body>
                                <Tab.Container defaultActiveKey="apa">
                                    <Nav variant="tabs" className="mb-3">
                                        <Nav.Item>
                                            <Nav.Link eventKey="apa">APA</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="ieee">IEEE</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="chicago">Chicago</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="mla">MLA</Nav.Link>
                                        </Nav.Item>
                                    </Nav>

                                    <Tab.Content>
                                        <Tab.Pane eventKey="apa">
                                            <div className="citation-container">
                                                <p>{citations.apa?.citation}</p>
                                                <Button
                                                    size="sm"
                                                    variant="outline-primary"
                                                    onClick={() =>
                                                        copyToClipboard(citations.apa?.citation)
                                                    }
                                                >
                                                    <FaCopy /> Copy
                                                </Button>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="ieee">
                                            <div className="citation-container">
                                                <p>{citations.ieee?.citation}</p>
                                                <Button
                                                    size="sm"
                                                    variant="outline-primary"
                                                    onClick={() =>
                                                        copyToClipboard(citations.ieee?.citation)
                                                    }
                                                >
                                                    <FaCopy /> Copy
                                                </Button>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="chicago">
                                            <div className="citation-container">
                                                <p>{citations.chicago?.citation}</p>
                                                <Button
                                                    size="sm"
                                                    variant="outline-primary"
                                                    onClick={() =>
                                                        copyToClipboard(citations.chicago?.citation)
                                                    }
                                                >
                                                    <FaCopy /> Copy
                                                </Button>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="mla">
                                            <div className="citation-container">
                                                <p>{citations.mla?.citation}</p>
                                                <Button
                                                    size="sm"
                                                    variant="outline-primary"
                                                    onClick={() =>
                                                        copyToClipboard(citations.mla?.citation)
                                                    }
                                                >
                                                    <FaCopy /> Copy
                                                </Button>
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Sidebar */}
                    <Col lg={4}>
                        {/* Stats */}
                        <Card className="mb-4">
                            <Card.Header className="bg-light">
                                <h5 className="mb-0">Statistics</h5>
                            </Card.Header>
                            <Card.Body>
                                <div className="stat-item mb-3">
                                    <label>Citations</label>
                                    <p className="stat-value">{paper.citationCount || 0}</p>
                                </div>
                                <div className="stat-item">
                                    <label>Average Rating</label>
                                    <p className="stat-value">
                                        <FaStar className="text-warning" /> {averageRating.toFixed(1)}
                                        /5
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>

                        {/* Feedback */}
                        <Card>
                            <Card.Header className="bg-light">
                                <h5 className="mb-0">Submit Feedback</h5>
                            </Card.Header>
                            <Card.Body>
                                <div className="rating-container mb-3">
                                    <label className="mb-2">Rating</label>
                                    <div className="star-rating">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FaStar
                                                key={star}
                                                className={`star ${star <= rating ? 'active' : ''}`}
                                                onClick={() => setRating(star)}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="mb-2">Your Feedback</label>
                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        value={feedbackText}
                                        onChange={(e) => setFeedbackText(e.target.value)}
                                        placeholder="Share your thoughts about this paper..."
                                    ></textarea>
                                </div>

                                <Button
                                    variant="primary"
                                    className="w-100"
                                    onClick={handleSubmitFeedback}
                                >
                                    Submit Feedback
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PaperDetails;