import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Tab, Nav, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
    FaBook,
    FaBookmark,
    FaTrash,
    FaEdit,
    FaHeart,
    FaFilter,
    FaSearch,
} from 'react-icons/fa';
import libraryService from '../services/libraryService';
import authService from '../services/authService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import './PersonalLibrary.css';

const PersonalLibrary = () => {
    const [library, setLibrary] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editNote, setEditNote] = useState('');
    const [editProgress, setEditProgress] = useState(0);
    const user = authService.getCurrentUser();

    useEffect(() => {
        if (user) {
            fetchLibrary();
        }
    }, [user]);

    const fetchLibrary = async () => {
        try {
            setLoading(true);
            const libraryData = await libraryService.getUserLibrary(user.userId);
            const favoritesData = await libraryService.getUserFavorites(user.userId);
            setLibrary(libraryData);
            setFavorites(favoritesData);
        } catch (err) {
            setError(err.message || 'Failed to load library');
        } finally {
            setLoading(false);
        }
    };

    const handleRemovePaper = async (libraryId) => {
        try {
            await libraryService.removePaper(libraryId);
            fetchLibrary();
        } catch (err) {
            setError(err.message || 'Failed to remove paper');
        }
    };

    const handleToggleFavorite = async (libraryId) => {
        try {
            await libraryService.toggleFavorite(libraryId);
            fetchLibrary();
        } catch (err) {
            setError(err.message || 'Failed to toggle favorite');
        }
    };

    const handleUpdateProgress = async (libraryId, progress) => {
        try {
            await libraryService.updateReadingProgress(libraryId, progress);
            fetchLibrary();
        } catch (err) {
            setError(err.message || 'Failed to update progress');
        }
    };

    const handleUpdateNote = async (libraryId) => {
        try {
            await libraryService.addNote(libraryId, editNote);
            setEditingId(null);
            setEditNote('');
            fetchLibrary();
        } catch (err) {
            setError(err.message || 'Failed to update note');
        }
    };

    const filteredLibrary = library.filter(
        (item) =>
            item.paper?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.paper?.authors.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <LoadingSpinner message="Loading your library..." />;

    if (!user) {
        return (
            <Container className="py-5">
                <Alert variant="info">
                    Please <Link to="/login">login</Link> to view your library
                </Alert>
            </Container>
        );
    }

    return (
        <div className="personal-library-page">
            <Container className="py-5">
                <div className="page-header mb-5">
                    <h1 className="page-title">
                        <FaBook /> My Library
                    </h1>
                    <p className="page-subtitle">Manage and organize your saved papers</p>
                </div>

                <ErrorAlert message={error} onClose={() => setError('')} />

                {/* Search Bar */}
                <Card className="search-card mb-4">
                    <Card.Body className="p-3">
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaSearch />
                            </span>
                            <Form.Control
                                type="text"
                                placeholder="Search by title or author..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </Card.Body>
                </Card>

                {/* Tabs */}
                <Tab.Container defaultActiveKey="all">
                    <Nav variant="tabs" className="mb-4">
                        <Nav.Item>
                            <Nav.Link eventKey="all" className="tab-link">
                                <FaBook /> All Papers ({filteredLibrary.length})
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="favorites" className="tab-link">
                                <FaHeart /> Favorites ({favorites.length})
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="reading" className="tab-link">
                                <FaFilter /> Currently Reading
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Tab.Content>
                        {/* All Papers Tab */}
                        <Tab.Pane eventKey="all">
                            {filteredLibrary.length > 0 ? (
                                <Row>
                                    {filteredLibrary.map((item) => (
                                        <Col lg={6} key={item.libraryId} className="mb-4">
                                            <Card className="library-card h-100">
                                                <Card.Body>
                                                    {/* Header with Actions */}
                                                    <div className="card-header-actions mb-3">
                                                        <div className="card-title-section">
                                                            <Card.Title className="library-title">
                                                                {item.paper?.title}
                                                            </Card.Title>
                                                        </div>
                                                        <div className="card-actions">
                                                            <Button
                                                                variant="link"
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleToggleFavorite(
                                                                        item.libraryId
                                                                    )
                                                                }
                                                                className={
                                                                    item.isFavorite
                                                                        ? 'text-danger'
                                                                        : 'text-secondary'
                                                                }
                                                            >
                                                                <FaHeart />
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    {/* Paper Info */}
                                                    <Card.Text className="library-authors">
                                                        <strong>Authors:</strong>{' '}
                                                        {item.paper?.authors}
                                                    </Card.Text>

                                                    {/* Meta Info */}
                                                    <div className="library-meta mb-3">
                                                        {item.paper?.domain && (
                                                            <Badge bg="info" className="me-2">
                                                                {item.paper.domain}
                                                            </Badge>
                                                        )}
                                                        {item.paper?.publicationYear && (
                                                            <Badge bg="secondary">
                                                                {item.paper.publicationYear}
                                                            </Badge>
                                                        )}
                                                    </div>

                                                    {/* Reading Progress */}
                                                    <div className="progress-section mb-3">
                                                        <div className="progress-header mb-2">
                                                            <label>Reading Progress</label>
                                                            <span className="progress-value">
                                                                {item.readingProgress}%
                                                            </span>
                                                        </div>
                                                        <div className="progress">
                                                            <div
                                                                className="progress-bar"
                                                                role="progressbar"
                                                                style={{
                                                                    width: `${item.readingProgress}%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                        <input
                                                            type="range"
                                                            className="progress-slider mt-2"
                                                            min="0"
                                                            max="100"
                                                            value={item.readingProgress}
                                                            onChange={(e) =>
                                                                handleUpdateProgress(
                                                                    item.libraryId,
                                                                    parseInt(e.target.value)
                                                                )
                                                            }
                                                        />
                                                    </div>

                                                    {/* Notes */}
                                                    <div className="notes-section mb-3">
                                                        {editingId === item.libraryId ? (
                                                            <div>
                                                                <textarea
                                                                    className="form-control"
                                                                    rows="3"
                                                                    value={editNote}
                                                                    onChange={(e) =>
                                                                        setEditNote(e.target.value)
                                                                    }
                                                                    placeholder="Add your notes..."
                                                                ></textarea>
                                                                <Button
                                                                    size="sm"
                                                                    variant="primary"
                                                                    className="mt-2"
                                                                    onClick={() =>
                                                                        handleUpdateNote(
                                                                            item.libraryId
                                                                        )
                                                                    }
                                                                >
                                                                    Save Note
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {item.notes ? (
                                                                    <div className="note-display">
                                                                        <p className="note-text">
                                                                            {item.notes}
                                                                        </p>
                                                                        <Button
                                                                            variant="link"
                                                                            size="sm"
                                                                            onClick={() => {
                                                                                setEditingId(
                                                                                    item.libraryId
                                                                                );
                                                                                setEditNote(
                                                                                    item.notes
                                                                                );
                                                                            }}
                                                                        >
                                                                            <FaEdit /> Edit
                                                                        </Button>
                                                                    </div>
                                                                ) : (
                                                                    <Button
                                                                        variant="link"
                                                                        size="sm"
                                                                        onClick={() =>
                                                                            setEditingId(
                                                                                item.libraryId
                                                                            )
                                                                        }
                                                                    >
                                                                        <FaEdit /> Add Note
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Added Date */}
                                                    <small className="text-muted">
                                                        Added: {new Date(item.addedAt).toLocaleDateString()}
                                                    </small>

                                                    {/* Actions */}
                                                    <div className="library-actions mt-3">
                                                        <Link
                                                            to={`/paper/${item.paper?.paperId}`}
                                                        >
                                                            <Button
                                                                variant="primary"
                                                                size="sm"
                                                                className="me-2"
                                                            >
                                                                <FaBook /> View Paper
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="outline-danger"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleRemovePaper(item.libraryId)
                                                            }
                                                        >
                                                            <FaTrash /> Remove
                                                        </Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            ) : (
                                <Card className="text-center p-5">
                                    <Card.Body>
                                        <FaBook className="empty-icon" />
                                        <h4>No papers in your library</h4>
                                        <p>Search and save papers to build your collection</p>
                                        <Link to="/search">
                                            <Button variant="primary">Search Papers</Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            )}
                        </Tab.Pane>

                        {/* Favorites Tab */}
                        <Tab.Pane eventKey="favorites">
                            {favorites.length > 0 ? (
                                <Row>
                                    {favorites.map((item) => (
                                        <Col lg={6} key={item.libraryId} className="mb-4">
                                            <Card className="library-card h-100">
                                                <Card.Body>
                                                    <Card.Title className="library-title">
                                                        {item.paper?.title}
                                                    </Card.Title>
                                                    <Card.Text className="library-authors">
                                                        {item.paper?.authors}
                                                    </Card.Text>
                                                    <div className="library-actions mt-3">
                                                        <Link
                                                            to={`/paper/${item.paper?.paperId}`}
                                                        >
                                                            <Button
                                                                variant="primary"
                                                                size="sm"
                                                                className="me-2"
                                                            >
                                                                View Paper
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="outline-danger"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleRemovePaper(item.libraryId)
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
                            ) : (
                                <Card className="text-center p-5">
                                    <Card.Body>
                                        <FaHeart className="empty-icon" />
                                        <h4>No favorite papers yet</h4>
                                        <p>Add papers to favorites to see them here</p>
                                    </Card.Body>
                                </Card>
                            )}
                        </Tab.Pane>

                        {/* Currently Reading Tab */}
                        <Tab.Pane eventKey="reading">
                            {filteredLibrary.filter((item) => item.readingProgress > 0 && item.readingProgress < 100).length > 0 ? (
                                <Row>
                                    {filteredLibrary
                                        .filter((item) => item.readingProgress > 0 && item.readingProgress < 100)
                                        .map((item) => (
                                            <Col lg={6} key={item.libraryId} className="mb-4">
                                                <Card className="library-card h-100">
                                                    <Card.Body>
                                                        <Card.Title className="library-title">
                                                            {item.paper?.title}
                                                        </Card.Title>
                                                        <div className="progress mb-3">
                                                            <div
                                                                className="progress-bar"
                                                                role="progressbar"
                                                                style={{
                                                                    width: `${item.readingProgress}%`,
                                                                }}
                                                            >
                                                                {item.readingProgress}%
                                                            </div>
                                                        </div>
                                                        <Link
                                                            to={`/paper/${item.paper?.paperId}`}
                                                        >
                                                            <Button variant="primary" size="sm">
                                                                Continue Reading
                                                            </Button>
                                                        </Link>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                </Row>
                            ) : (
                                <Card className="text-center p-5">
                                    <Card.Body>
                                        <FaBook className="empty-icon" />
                                        <h4>No papers being read</h4>
                                        <p>Start reading papers by updating their progress</p>
                                    </Card.Body>
                                </Card>
                            )}
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Container>
        </div>
    );
};

export default PersonalLibrary;