import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Pagination, Badge } from 'react-bootstrap';
import { FaSearch, FaFilter, FaBook } from 'react-icons/fa';
import paperService from '../services/paperService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { DOMAINS } from '../utils/constants';
import './PaperSearch.css';

const PaperSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [domain, setDomain] = useState('');
    const [year, setYear] = useState('');
    const [author, setAuthor] = useState('');
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setCurrentPage(0);

        try {
            if (!searchTerm.trim()) {
                setError('Please enter a search term');
                return;
            }

            let results;
            if (domain || year || author) {
                // Advanced search
                results = await paperService.advancedSearch(
                    searchTerm,
                    domain,
                    year ? parseInt(year) : null,
                    author
                );
                setPapers(results);
                setTotalPages(1);
            } else {
                // Basic search
                const response = await paperService.searchPapers(searchTerm, currentPage, 10);
                setPapers(response.content || response);
                setTotalPages(response.totalPages || 1);
            }
            setSearched(true);
        } catch (err) {
            setError(err.message || 'Search failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterByDomain = async () => {
        setError('');
        setLoading(true);

        try {
            const results = await paperService.filterByDomain(domain);
            setPapers(results);
            setTotalPages(1);
            setSearched(true);
        } catch (err) {
            setError(err.message || 'Filter failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterByYear = async () => {
        setError('');
        setLoading(true);

        try {
            const results = await paperService.filterByYear(parseInt(year));
            setPapers(results);
            setTotalPages(1);
            setSearched(true);
        } catch (err) {
            setError(err.message || 'Filter failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSearchTerm('');
        setDomain('');
        setYear('');
        setAuthor('');
        setPapers([]);
        setSearched(false);
        setError('');
        setCurrentPage(0);
    };

    const handlePageChange = async (pageNumber) => {
        setCurrentPage(pageNumber);
        setLoading(true);

        try {
            const response = await paperService.searchPapers(searchTerm, pageNumber - 1, 10);
            setPapers(response.content || response);
        } catch (err) {
            setError(err.message || 'Failed to load papers.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="paper-search-page">
            <Container className="py-5">
                <h1 className="page-title mb-4">
                    <FaSearch /> Search Research Papers
                </h1>

                <ErrorAlert message={error} onClose={() => setError('')} />

                {/* Search Form */}
                <Card className="search-card mb-4">
                    <Card.Body className="p-4">
                        <Form onSubmit={handleSearch}>
                            <Row className="mb-3">
                                <Col lg={8}>
                                    <Form.Group>
                                        <Form.Label>Search by Title or Keywords</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter keywords, title, or topic..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col lg={4} className="d-flex align-items-end">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="w-100"
                                        disabled={loading}
                                    >
                                        <FaSearch /> Search
                                    </Button>
                                </Col>
                            </Row>

                            {/* Advanced Filters */}
                            <Row className="filter-row">
                                <Col md={6} lg={3} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Domain</Form.Label>
                                        <Form.Select
                                            value={domain}
                                            onChange={(e) => setDomain(e.target.value)}
                                        >
                                            <option value="">All Domains</option>
                                            {DOMAINS.map((d) => (
                                                <option key={d} value={d}>
                                                    {d}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                <Col md={6} lg={3} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Publication Year</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="e.g., 2023"
                                            value={year}
                                            onChange={(e) => setYear(e.target.value)}
                                            min="1900"
                                            max={new Date().getFullYear()}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={6} lg={3} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Author</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Author name..."
                                            value={author}
                                            onChange={(e) => setAuthor(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={6} lg={3} className="mb-3 d-flex align-items-end">
                                    <Button
                                        variant="outline-secondary"
                                        className="w-100"
                                        onClick={handleReset}
                                    >
                                        Reset Filters
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>

                {/* Results */}
                {loading ? (
                    <LoadingSpinner message="Searching for papers..." />
                ) : searched ? (
                    <>
                        <div className="results-info mb-3">
                            <p>
                                Found <strong>{papers.length}</strong> paper(s)
                            </p>
                        </div>

                        {papers.length > 0 ? (
                            <>
                                <Row>
                                    {papers.map((paper) => (
                                        <Col lg={12} key={paper.paperId} className="mb-3">
                                            <Card className="paper-result-card">
                                                <Card.Body>
                                                    <Row>
                                                        <Col lg={10}>
                                                            <Card.Title className="paper-result-title">
                                                                {paper.title}
                                                            </Card.Title>
                                                            <Card.Text className="paper-result-authors">
                                                                <strong>Authors:</strong>{' '}
                                                                {paper.authors}
                                                            </Card.Text>
                                                            <Card.Text className="paper-result-abstract">
                                                                {paper.abstractText &&
                                                                    paper.abstractText.substring(
                                                                        0,
                                                                        200
                                                                    )}
                                                                ...
                                                            </Card.Text>
                                                            <div className="paper-result-meta">
                                                                {paper.domain && (
                                                                    <Badge bg="info" className="me-2">
                                                                        {paper.domain}
                                                                    </Badge>
                                                                )}
                                                                {paper.publicationYear && (
                                                                    <Badge bg="secondary">
                                                                        {paper.publicationYear}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        </Col>
                                                        <Col lg={2} className="d-flex align-items-center justify-content-end">
                                                            <div className="text-center">
                                                                <p className="citations-count">
                                                                    {paper.citationCount || 0}
                                                                </p>
                                                                <small className="text-muted">
                                                                    Citations
                                                                </small>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <div className="mt-3">
                                                        <a href={`/paper/${paper.paperId}`}>
                                                            <Button variant="primary" size="sm">
                                                                <FaBook /> View Details
                                                            </Button>
                                                        </a>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <Row className="mt-4">
                                        <Col className="d-flex justify-content-center">
                                            <Pagination>
                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                                    (page) => (
                                                        <Pagination.Item
                                                            key={page}
                                                            active={page === currentPage + 1}
                                                            onClick={() => handlePageChange(page)}
                                                        >
                                                            {page}
                                                        </Pagination.Item>
                                                    )
                                                )}
                                            </Pagination>
                                        </Col>
                                    </Row>
                                )}
                            </>
                        ) : (
                            <Card className="text-center p-5">
                                <Card.Body>
                                    <FaBook className="empty-icon" />
                                    <h4>No papers found</h4>
                                    <p>Try adjusting your search criteria</p>
                                </Card.Body>
                            </Card>
                        )}
                    </>
                ) : (
                    <Card className="text-center p-5">
                        <Card.Body>
                            <FaSearch className="empty-icon" />
                            <h4>Start searching for papers</h4>
                            <p>Enter keywords, title, or other search terms above</p>
                        </Card.Body>
                    </Card>
                )}
            </Container>
        </div>
    );
};

export default PaperSearch;